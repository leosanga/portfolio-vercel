import { mkdirSync, writeFileSync } from "node:fs";

const [endpoint, baseUrl, outputDirectory] = process.argv.slice(2);

if (!endpoint || !baseUrl || !outputDirectory) {
  throw new Error("Usage: node portfolio-v2-browser-qa.mjs <endpoint> <url> <output-directory>");
}

const viewports = [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [834, 1112],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 800],
  [320, 568],
];

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const targets = await fetch(`${endpoint}/json`).then((response) => response.json());
const page = targets.find((candidate) => candidate.type === "page");

if (!page) throw new Error("No Chrome page target was available.");

mkdirSync(outputDirectory, { recursive: true });

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const consoleErrors = [];
const requestUrls = new Set();
let messageId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  if (message.method === "Runtime.exceptionThrown") {
    consoleErrors.push(message.params.exceptionDetails.text);
  }

  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
    consoleErrors.push(message.params.entry.text);
  }

  if (message.method === "Network.requestWillBeSent") {
    requestUrls.add(message.params.request.url);
  }

  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }
  return result.result.value;
};

const waitFor = async (expression, timeout = 3000) => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeout) {
    if (await evaluate(expression)) return;
    await wait(100);
  }

  throw new Error(`Timed out waiting for: ${expression}`);
};

const emulateViewport = (width, height) =>
  Promise.all([
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      screenWidth: width,
      screenHeight: height,
      deviceScaleFactor: 1,
      mobile: width <= 767,
    }),
    send("Emulation.setTouchEmulationEnabled", {
      enabled: width <= 767,
      maxTouchPoints: width <= 767 ? 5 : 1,
    }),
  ]);

const navigate = async (suffix) => {
  await send("Page.navigate", { url: `${baseUrl}?qa=${suffix}` });
  await wait(800);
};

const pageMetricsExpression = `JSON.stringify({
  innerWidth,
  innerHeight,
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  theme: document.documentElement.dataset.pv2Theme || null,
  colorScheme: getComputedStyle(document.querySelector('.portfolio-v2')).colorScheme,
  bodyBackground: getComputedStyle(document.body).backgroundColor,
  h1: document.querySelector('h1')?.textContent?.trim(),
  h1FontSize: getComputedStyle(document.querySelector('h1')).fontSize,
  capabilityColumns: getComputedStyle(document.querySelector('.pv2-capabilities__grid')).gridTemplateColumns.split(' ').length,
  menuVisible: getComputedStyle(document.querySelector('.pv2-nav__menu-trigger')).display !== 'none',
  dock: (() => {
    const rect = document.querySelector('.pv2-utility-dock__rail').getBoundingClientRect();
    return { left: rect.left, right: rect.right, width: rect.width };
  })(),
  portraitSource: document.querySelector('.pv2-portrait-frame img')?.currentSrc,
  socialImage: document.querySelector('meta[property="og:image"]')?.content,
  socialWidth: document.querySelector('meta[property="og:image:width"]')?.content,
  socialHeight: document.querySelector('meta[property="og:image:height"]')?.content,
  socialAlt: document.querySelector('meta[property="og:image:alt"]')?.content,
  robots: document.querySelector('meta[name="robots"]')?.content,
  heroCallDockOverlap: (() => {
    const call = document.querySelector('.pv2-hero__action .pv2-primary-call').getBoundingClientRect();
    const dock = document.querySelector('.pv2-utility-dock__rail').getBoundingClientRect();
    return call.left < dock.right && call.right > dock.left && call.top < dock.bottom && call.bottom > dock.top;
  })()
})`;

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Log.enable");

await emulateViewport(390, 844);
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-color-scheme", value: "dark" }],
});
await navigate("default-theme-setup");
await evaluate(`localStorage.removeItem('leo-portfolio-theme'); location.reload(); true`);
await wait(800);
const defaultThemeAgainstDarkSystem = JSON.parse(await evaluate(pageMetricsExpression));

const viewportResults = [];
await send("Emulation.setEmulatedMedia", { features: [] });

for (const [width, height] of viewports) {
  await emulateViewport(width, height);
  await navigate(`${width}x${height}`);
  await evaluate(`window.scrollTo(0, 0); true`);
  await wait(100);
  const metrics = JSON.parse(await evaluate(pageMetricsExpression));
  viewportResults.push({ width, height, ...metrics });

  if ([1440, 390, 320].includes(width)) {
    const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
    writeFileSync(
      `${outputDirectory}/portfolio-v2-${width}x${height}.png`,
      Buffer.from(screenshot.data, "base64"),
    );
  }
}

await emulateViewport(390, 844);
await navigate("theme-persistence");
await evaluate(`localStorage.removeItem('leo-portfolio-theme'); location.reload(); true`);
await waitFor(
  `(() => {
    const control = document.querySelector('.pv2-utility-dock__control:last-child');
    return control && control.getAttribute('aria-label') !== 'Change color theme';
  })()`,
);
const themeBeforeToggle = await evaluate(`document.documentElement.dataset.pv2Theme`);
await evaluate(`document.querySelector('.pv2-utility-dock__control:last-child').click(); true`);
await wait(250);
const themeAfterToggle = await evaluate(`document.documentElement.dataset.pv2Theme`);
await send("Page.reload", { ignoreCache: true });
await wait(700);
const themeAfterReload = await evaluate(`document.documentElement.dataset.pv2Theme`);
await evaluate(`localStorage.removeItem('leo-portfolio-theme'); true`);

await navigate("mobile-menu");
const mobileMenuBefore = await evaluate(
  `document.querySelector('.pv2-nav__menu-trigger').getAttribute('aria-expanded')`,
);
await evaluate(
  `document.querySelector('.pv2-nav__menu-trigger').focus(); document.querySelector('.pv2-nav__menu-trigger').click(); true`,
);
await wait(200);
const mobileMenuOpen = await evaluate(
  `document.querySelector('.pv2-nav__menu-trigger').getAttribute('aria-expanded')`,
);
await send("Input.dispatchKeyEvent", {
  type: "rawKeyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await wait(200);
const mobileMenuAfterEscape = JSON.parse(
  await evaluate(`JSON.stringify({
    expanded: document.querySelector('.pv2-nav__menu-trigger').getAttribute('aria-expanded'),
    focusReturned: document.activeElement === document.querySelector('.pv2-nav__menu-trigger')
  })`),
);

await navigate("keyboard-order");
await evaluate(`document.activeElement?.blur(); window.scrollTo(0, 0); true`);
const keyboardOrder = [];
for (let index = 0; index < 11; index += 1) {
  await send("Input.dispatchKeyEvent", {
    type: "rawKeyDown",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Tab",
    code: "Tab",
    windowsVirtualKeyCode: 9,
  });
  keyboardOrder.push(
    JSON.parse(
      await evaluate(`JSON.stringify({
        tag: document.activeElement?.tagName,
        label: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim(),
        href: document.activeElement?.getAttribute('href')
      })`),
    ),
  );
}

await navigate("workflow-disclosure");
await evaluate(`document.querySelector('.pv2-workflow-disclosure summary').click(); true`);
await wait(300);
const workflowDisclosure = JSON.parse(
  await evaluate(`JSON.stringify({
    open: document.querySelector('.pv2-workflow-disclosure').open,
    nodes: document.querySelectorAll('.pv2-workflow-node').length,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth
  })`),
);

await emulateViewport(1280, 800);
await navigate("text-size-200");
await evaluate(`document.documentElement.style.fontSize = '200%'; true`);
await wait(200);
const textResize = JSON.parse(
  await evaluate(`JSON.stringify({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    h1FontSize: getComputedStyle(document.querySelector('h1')).fontSize,
    h1Visible: document.querySelector('h1').getBoundingClientRect().height > 0,
    callVisible: document.querySelector('.pv2-hero__action .pv2-primary-call').getBoundingClientRect().height > 0
  })`),
);
await evaluate(`document.documentElement.style.removeProperty('font-size'); true`);

await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await navigate("reduced-motion");
await evaluate(`document.querySelector('.pv2-workflow-disclosure summary').click(); true`);
await wait(200);
const reducedMotion = JSON.parse(
  await evaluate(`JSON.stringify({
    heroAnimation: getComputedStyle(document.querySelector('.pv2-hero-enter')).animationName,
    heroTransition: getComputedStyle(document.querySelector('.pv2-hero-enter')).transitionDuration,
    signalAnimation: getComputedStyle(document.querySelector('.pv2-workflow__signals circle')).animationName,
    scrollBehavior: getComputedStyle(document.querySelector('.portfolio-v2')).scrollBehavior
  })`),
);

await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
});
await navigate("reduced-transparency");
const reducedTransparency = await evaluate(
  `getComputedStyle(document.querySelector('.pv2-utility-dock__rail')).backdropFilter`,
);

await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-contrast", value: "more" }],
});
await navigate("increased-contrast");
await evaluate(`document.querySelector('.pv2-nav__menu-trigger').focus(); true`);
const increasedContrast = await evaluate(
  `getComputedStyle(document.querySelector('.pv2-nav__menu-trigger')).outlineWidth`,
);

await send("Emulation.setEmulatedMedia", {
  features: [{ name: "forced-colors", value: "active" }],
});
await navigate("forced-colors");
const forcedColors = JSON.parse(
  await evaluate(`JSON.stringify({
    active: matchMedia('(forced-colors: active)').matches,
    dockAdjustment: getComputedStyle(document.querySelector('.pv2-utility-dock__rail')).forcedColorAdjust,
    callAdjustment: getComputedStyle(document.querySelector('.pv2-primary-call')).forcedColorAdjust
  })`),
);

await send("Emulation.setEmulatedMedia", { features: [] });
await send("Emulation.setScriptExecutionDisabled", { value: true });
await navigate("no-javascript");
await send("Emulation.setScriptExecutionDisabled", { value: false });
const noJavaScript = JSON.parse(await evaluate(pageMetricsExpression));

const thirdPartyRequests = [...requestUrls].filter((url) => {
  try {
    const requestUrl = new URL(url);
    return !["127.0.0.1", "localhost"].includes(requestUrl.hostname);
  } catch {
    return false;
  }
});

const result = {
  defaultThemeAgainstDarkSystem,
  viewportResults,
  themePersistence: { themeBeforeToggle, themeAfterToggle, themeAfterReload },
  mobileMenu: { mobileMenuBefore, mobileMenuOpen, ...mobileMenuAfterEscape },
  keyboardOrder,
  workflowDisclosure,
  textResize,
  reducedMotion,
  reducedTransparency,
  increasedContrast,
  forcedColors,
  noJavaScript,
  consoleErrors,
  thirdPartyRequests,
};

writeFileSync(`${outputDirectory}/portfolio-v2-browser-qa.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await send("Browser.close");
