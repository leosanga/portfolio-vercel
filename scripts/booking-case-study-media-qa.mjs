// Browser QA for the booking case study's evidence figures and viewer. Drives a headless Chrome over
// the DevTools protocol, like portfolio-v2-browser-qa.mjs, so it needs no visible window.
//
// Start Chrome:  chrome --headless=new --remote-debugging-port=9333 --user-data-dir=<temp dir>
// Then run:      node scripts/booking-case-study-media-qa.mjs http://127.0.0.1:9333 \
//                  http://127.0.0.1:8090/projects/n8n-booking-agent <output-directory>
// Exits 1 and lists every failure when any check fails. Screenshots land in the output directory.
import { mkdirSync, writeFileSync } from "node:fs";

const [endpoint, url, outputDirectory] = process.argv.slice(2);

if (!endpoint || !url || !outputDirectory) {
  throw new Error(
    "Usage: node booking-case-study-media-qa.mjs <endpoint> <url> <output-directory>",
  );
}

const VIEWPORTS = [
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
const SHOT_VIEWPORTS = ["1440x900", "390x844", "320x568"];
const MOBILE_BELOW = 768;
const THEME_KEY = "leo-portfolio-theme";
const LOCAL_HOST = new URL(url).host;

mkdirSync(outputDirectory, { recursive: true });

const page = (await fetch(`${endpoint}/json`).then((response) => response.json())).find(
  (target) => target.type === "page",
);
if (!page) throw new Error("No Chrome page target was available.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const consoleErrors = [];
const requestHosts = new Set();
const failures = [];
let messageId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") {
    consoleErrors.push(message.params.exceptionDetails.text);
  }
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
    consoleErrors.push(message.params.entry.text);
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description).join(" "));
  }
  if (message.method === "Network.requestWillBeSent") {
    const requestUrl = message.params.request.url;
    if (/^https?:/.test(requestUrl)) requestHosts.add(new URL(requestUrl).host);
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

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const pressKey = async (key, code, keyCode, shift = false) => {
  const base = { key, code, windowsVirtualKeyCode: keyCode, modifiers: shift ? 8 : 0 };
  await send("Input.dispatchKeyEvent", { type: "keyDown", ...base });
  await send("Input.dispatchKeyEvent", { type: "keyUp", ...base });
  await wait(80);
};

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Network.enable");

async function load(width, height, theme, { scale = 1 } = {}) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: scale,
    mobile: width < MOBILE_BELOW,
  });
  await send("Page.navigate", { url });
  await wait(1200);
  await evaluate(`localStorage.setItem('${THEME_KEY}', '${theme}'); true`);
  await send("Page.reload", {});
  await wait(1500);
  // Lazy images below the fold would otherwise count as unloaded.
  await evaluate(`(async () => {
    for (const img of document.querySelectorAll('.pv2-case-evidence img')) {
      img.loading = 'eager';
      if (!img.complete) await new Promise((r) => { img.onload = img.onerror = r; });
    }
    await document.fonts.ready;
    return true;
  })()`);
}

// Page-level state: overflow, loaded previews, and the map's phone fallback.
const PAGE_STATE = `(() => {
  const doc = document.documentElement;
  const figures = [...document.querySelectorAll('.pv2-case-evidence')];
  const drawing = document.querySelector('.pv2-workflow-map__drawing');
  const list = document.querySelector('.pv2-workflow-map__stages');
  return {
    horizontalOverflow: doc.scrollWidth > innerWidth,
    figureCount: figures.length,
    unloaded: figures.map((f) => f.querySelector('img')).filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.src),
    mapLabel: document.querySelector('.pv2-workflow-map .pv2-case-evidence__label')?.textContent,
    mapDrawingShown: getComputedStyle(drawing).display !== 'none',
    mapListShown: list.getBoundingClientRect().height > 2,
    labels: [...document.querySelectorAll('.pv2-case-evidence__label')].map((l) => l.textContent),
  };
})()`;

// Opens figure `index` through one of its two openers, reports the viewer's state, and leaves it open.
const openViewer = (index, opener) => `(async () => {
  const figure = document.querySelectorAll('.pv2-case-evidence')[${index}];
  const button = figure.querySelector('${opener}');
  button.scrollIntoView({ block: 'center' });
  button.focus();
  button.click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const dialog = document.querySelector('[role="dialog"]');
  if (!dialog) return { opened: false };
  const img = dialog.querySelector('img');
  if (!img.complete) await new Promise((r) => { img.onload = img.onerror = r; });
  return {
    opened: true,
    label: figure.querySelector('.pv2-case-evidence__label').textContent,
    caption: figure.querySelector('figcaption p').textContent,
    title: dialog.querySelector('h2').textContent,
    description: dialog.querySelector('p').textContent,
    focusInside: dialog.contains(document.activeElement),
    inlineSrc: figure.querySelector('img').getAttribute('src'),
    viewerSrc: img.getAttribute('src'),
    viewerLoaded: img.naturalWidth > 0,
    zoom: dialog.querySelector('.pv2-evidence-viewer__zoom').dataset.zoom,
    barControls: [...dialog.querySelectorAll('.pv2-evidence-viewer__bar :is(a, button)')].map((c) => c.textContent),
    links: dialog.querySelectorAll('a').length,
  };
})()`;

// Opens the workflow map's viewer through one of its two openers and leaves it open.
const OPEN_MAP = (opener) => `(async () => {
  const button = document.querySelector('${opener}');
  button.scrollIntoView({ block: 'center' });
  button.focus();
  button.click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const dialog = document.querySelector('[role="dialog"]');
  if (!dialog) return { opened: false };
  return {
    opened: true,
    hasDrawing: Boolean(dialog.querySelector('.pv2-evidence-viewer__drawing svg')),
    title: dialog.querySelector('h2').textContent,
    focusInside: dialog.contains(document.activeElement),
  };
})()`;

const FOCUS_STATE = `(() => ({
  dialogOpen: Boolean(document.querySelector('[role="dialog"]')),
  activeClass: document.activeElement?.className ?? '',
  activeFigure: [...document.querySelectorAll('.pv2-case-evidence')].indexOf(document.activeElement?.closest('.pv2-case-evidence')),
}))()`;

// Clicking the image in the viewer is the zoom toggle.
const CLICK_IMAGE = `(async () => {
  document.querySelector('.pv2-evidence-viewer__zoom').click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return true;
})()`;

// Viewer geometry: the image's scale, whether it fits its scroll area, and whether the page moved.
const VIEWER_GEOMETRY = `(() => {
  const dialog = document.querySelector('[role="dialog"]');
  const area = dialog.querySelector('.pv2-evidence-viewer__image');
  const img = area.querySelector('img');
  const a = area.getBoundingClientRect();
  const i = img.getBoundingClientRect();
  return {
    zoom: dialog.querySelector('.pv2-evidence-viewer__zoom').dataset.zoom,
    cursor: getComputedStyle(dialog.querySelector('.pv2-evidence-viewer__zoom')).cursor,
    scale: i.width / img.naturalWidth,
    imgWidth: Math.round(i.width),
    areaScrolls: area.scrollWidth > area.clientWidth + 1 || area.scrollHeight > area.clientHeight + 1,
    fitsArea: i.width <= a.width + 1 && i.height <= a.height + 1,
    pageOverflow: document.documentElement.scrollWidth > innerWidth,
    dialogOverflow: dialog.scrollWidth > dialog.clientWidth + 1,
  };
})()`;

// Every control must be reachable: already on screen, or brought on screen by scrolling the dialog.
const CONTROLS_REACHABLE = `(() => {
  const dialog = document.querySelector('[role="dialog"]');
  return [dialog.querySelector('h2'), ...dialog.querySelectorAll('.pv2-evidence-viewer__bar button')].map((el) => {
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const r = el.getBoundingClientRect();
    const reachable = r.width > 0 && r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1;
    const smallTarget = el.matches('a, button') && (r.width < 24 || r.height < 24);
    return { text: el.textContent.slice(0, 24), reachable, smallTarget };
  });
})()`;

async function closeWithEscape() {
  await pressKey("Escape", "Escape", 27);
  await wait(120);
  return evaluate(FOCUS_STATE);
}

// Scrolls the element well below the sticky navigation first, so the nav is not captured over it.
const NAV_CLEARANCE = 200;
const clipBox = (elementExpression) => `(() => {
  const el = ${elementExpression};
  scrollTo(0, el.getBoundingClientRect().top + scrollY - ${NAV_CLEARANCE});
  const b = el.getBoundingClientRect();
  return { x: 0, y: b.top + scrollY - 24, width: innerWidth, height: Math.min(b.height + 48, 3000) };
})()`;

async function screenshot(name, clipSelector) {
  const params = { format: "png" };
  if (clipSelector) {
    const box = await evaluate(clipBox(`document.querySelector('${clipSelector}')`));
    params.captureBeyondViewport = true;
    params.clip = { ...box, scale: 1 };
  }
  const shot = await send("Page.captureScreenshot", params);
  writeFileSync(`${outputDirectory}/${name}.png`, Buffer.from(shot.data, "base64"));
}

const runs = [];
for (const theme of ["light", "dark"]) {
  for (const [width, height] of VIEWPORTS) {
    const run = `${theme} ${width}x${height}`;
    await load(width, height, theme);
    const state = await evaluate(PAGE_STATE);
    runs.push({ run, ...state });

    check(!state.horizontalOverflow, `${run}: page scrolls horizontally`);
    check(state.figureCount === 7, `${run}: expected 7 figures, found ${state.figureCount}`);
    check(state.unloaded.length === 0, `${run}: previews not loaded: ${state.unloaded.join(", ")}`);
    check(state.mapLabel === "Workflow map", `${run}: map label is "${state.mapLabel}"`);
    check(
      !state.labels.some((l) => /implemented in n8n/i.test(l)),
      `${run}: an "Implemented in n8n" label remains`,
    );
    // The drawing shows at every width and opens the viewer; the list is its screen-reader text only.
    check(state.mapDrawingShown && !state.mapListShown, `${run}: map is not the drawing`);
    for (const opener of [
      ".pv2-workflow-map__drawing",
      ".pv2-workflow-map .pv2-case-evidence__open",
    ]) {
      const where = `${run} map via ${opener.includes("drawing") ? "drawing" : "View larger"}`;
      const viewer = await evaluate(OPEN_MAP(opener));
      check(viewer.opened && viewer.hasDrawing, `${where}: viewer did not show the drawing`);
      check(viewer.title === "Workflow map", `${where}: title "${viewer.title}"`);
      check(viewer.focusInside, `${where}: focus is not in the viewer`);
      const closed = await closeWithEscape();
      check(!closed.dialogOpen, `${where}: Escape did not close the viewer`);
      const returned = await evaluate(
        `document.activeElement === document.querySelector('${opener}')`,
      );
      check(returned, `${where}: focus did not return to the opener`);
    }

    for (let index = 0; index < state.figureCount; index += 1) {
      for (const opener of [".pv2-case-evidence__frame", ".pv2-case-evidence__open"]) {
        const where = `${run} figure ${index + 1} via ${opener.includes("frame") ? "image" : "View larger"}`;
        const viewer = await evaluate(openViewer(index, opener));
        check(viewer.opened, `${where}: viewer did not open`);
        if (!viewer.opened) continue;
        check(viewer.title === viewer.label, `${where}: title "${viewer.title}" is not the label`);
        check(
          viewer.description === viewer.caption,
          `${where}: viewer caption differs from the figure's`,
        );
        check(viewer.focusInside, `${where}: focus did not move into the viewer`);
        check(viewer.zoom !== "out", `${where}: viewer opened zoomed out`);
        check(viewer.viewerLoaded, `${where}: image did not load in the viewer`);
        check(viewer.viewerSrc === viewer.inlineSrc, `${where}: viewer shows a different image`);
        check(
          viewer.barControls.join() === "Close" && viewer.links === 0,
          `${where}: viewer controls are ${viewer.barControls.join(", ")} plus ${viewer.links} links`,
        );
        const closed = await closeWithEscape();
        check(!closed.dialogOpen, `${where}: Escape did not close the viewer`);
        const expectedClass = opener.slice(1);
        check(
          closed.activeFigure === index && closed.activeClass.includes(expectedClass),
          `${where}: focus returned to "${closed.activeClass}" in figure ${closed.activeFigure + 1}`,
        );
      }
    }

    // Zoom, on the widest capture: it opens magnified and scrolling, and clicking it toggles a
    // fitted overview and back. On a screen wide enough to show it whole at natural size there is
    // nothing to zoom, so it must sit at 1:1 and fit.
    await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
    const opened = await evaluate(VIEWER_GEOMETRY);
    check(
      !opened.pageOverflow && !opened.dialogOverflow,
      `${run}: the viewer image made the page or the dialog scroll sideways`,
    );
    if (opened.zoom === "fixed") {
      check(
        Math.abs(opened.scale - 1) < 0.01 && opened.fitsArea,
        `${run}: an image with nothing to zoom is not shown whole at natural size`,
      );
    } else {
      check(
        opened.zoom === "in" && opened.scale >= 0.74 && opened.scale <= 1.01,
        `${run}: viewer opened at ${opened.zoom}, scale ${opened.scale.toFixed(2)}`,
      );
      check(
        opened.areaScrolls && opened.cursor === "zoom-out",
        `${run}: magnified image not scrollable`,
      );
      await evaluate(CLICK_IMAGE);
      const zoomedOut = await evaluate(VIEWER_GEOMETRY);
      check(
        zoomedOut.zoom === "out" && zoomedOut.fitsArea && zoomedOut.cursor === "zoom-in",
        `${run}: clicking the image did not fit it to the viewer`,
      );
      await evaluate(CLICK_IMAGE);
      const zoomedIn = await evaluate(VIEWER_GEOMETRY);
      check(
        zoomedIn.zoom === "in" && zoomedIn.imgWidth === opened.imgWidth,
        `${run}: clicking again did not restore the magnified image`,
      );
    }
    const reachable = await evaluate(CONTROLS_REACHABLE);
    for (const control of reachable) {
      check(control.reachable, `${run}: "${control.text}" is not reachable`);
      check(!control.smallTarget, `${run}: "${control.text}" is smaller than 24 by 24`);
    }
    await closeWithEscape();
    // Reopening starts magnified even after the reader zoomed out.
    await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
    await evaluate(CLICK_IMAGE);
    await closeWithEscape();
    const reopened = await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
    check(reopened.zoom !== "out", `${run}: viewer did not reset to magnified on reopening`);
    await closeWithEscape();

    const size = `${width}x${height}`;
    if (SHOT_VIEWPORTS.includes(size)) {
      const prefix = `${theme}-${size}`;
      await screenshot(`${prefix}-01-page-ai-figure`, ".pv2-case-evidence");
      await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
      await screenshot(`${prefix}-02-viewer-ai-open`);
      await evaluate(CLICK_IMAGE);
      await screenshot(`${prefix}-03-viewer-ai-zoomed-out`);
      await closeWithEscape();
      await evaluate(openViewer(2, ".pv2-case-evidence__frame"));
      await screenshot(`${prefix}-04-viewer-outside-booking-open`);
      await closeWithEscape();
      await evaluate(openViewer(6, ".pv2-case-evidence__frame"));
      await screenshot(`${prefix}-05-viewer-confirmation-email`);
      await closeWithEscape();
    }
  }
}

// Figures in the page, captured on their own at each screenshot size: the tall outside-booking canvas
// and the two trimmed Slack alerts.
const PAGE_FIGURES = [
  [2, "06-page-outside-booking"],
  [3, "07-page-calendar-alert"],
  [5, "08-page-config-alert"],
];
for (const size of SHOT_VIEWPORTS) {
  const [width, height] = size.split("x").map(Number);
  await load(width, height, "light");
  for (const [index, name] of PAGE_FIGURES) {
    const box = await evaluate(
      clipBox(`document.querySelectorAll('.pv2-case-evidence')[${index}]`),
    );
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { ...box, scale: 1 },
    });
    writeFileSync(`${outputDirectory}/light-${size}-${name}.png`, Buffer.from(shot.data, "base64"));
  }
}

// Keyboard: Tab and Shift+Tab never leave the open viewer.
await load(1440, 900, "light");
await evaluate(openViewer(0, ".pv2-case-evidence__open"));
for (let step = 0; step < 12; step += 1) {
  await pressKey("Tab", "Tab", 9, step >= 6);
  const inside = await evaluate(
    `document.querySelector('[role="dialog"]').contains(document.activeElement)`,
  );
  check(inside, `keyboard: Tab step ${step + 1} moved focus behind the viewer`);
}
const focusVisible = await evaluate(`(() => {
  const el = document.activeElement;
  return getComputedStyle(el).outlineStyle !== 'none' && parseFloat(getComputedStyle(el).outlineWidth) > 0;
})()`);
check(focusVisible, "keyboard: the focused viewer control shows no focus outline");
await closeWithEscape();

// Zoom: 200 and 400 percent text, then 200 and 400 percent page zoom (a smaller CSS viewport).
const zoomCases = [
  { name: "text 200%", width: 1280, height: 800, rootSize: "200%" },
  { name: "text 400%", width: 1280, height: 800, rootSize: "400%" },
  { name: "page 200%", width: 640, height: 400, scale: 2 },
  { name: "page 400%", width: 320, height: 200, scale: 4 },
];
for (const zoom of zoomCases) {
  await load(zoom.width, zoom.height, "light", { scale: zoom.scale ?? 1 });
  if (zoom.rootSize) {
    await evaluate(`document.documentElement.style.fontSize = '${zoom.rootSize}'; true`);
    await wait(300);
  }
  // At 400 percent text the live page grid is already wider than the viewport, headings included
  // (measured on production 2026-09-27), so that case checks only that no figure reaches past the
  // page's own section headings.
  const overflow = await evaluate(
    zoom.rootSize === "400%"
      ? `(() => {
          const edge = Math.max(...[...document.querySelectorAll('h2')].map((h) => h.getBoundingClientRect().right));
          return [...document.querySelectorAll('.pv2-case-evidence, .pv2-workflow-map')].some((f) => f.getBoundingClientRect().right > edge + 1);
        })()`
      : `document.documentElement.scrollWidth > innerWidth`,
  );
  check(!overflow, `${zoom.name}: content scrolls horizontally`);
  const viewer = await evaluate(openViewer(0, ".pv2-case-evidence__open"));
  check(viewer.opened, `${zoom.name}: viewer did not open`);
  for (const control of await evaluate(CONTROLS_REACHABLE)) {
    check(control.reachable, `${zoom.name}: "${control.text}" is not reachable`);
  }
  const closed = await closeWithEscape();
  check(!closed.dialogOpen, `${zoom.name}: Escape did not close the viewer`);
}

// Reduced motion: the viewer uses no animation or transition at all.
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await load(1440, 900, "light");
await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
const MOTION_STATE = `[...document.querySelectorAll('.pv2-evidence-viewer, .pv2-evidence-viewer__overlay')].map((el) => {
  const s = getComputedStyle(el);
  return s.animationName === 'none' && s.transitionDuration.split(',').every((d) => parseFloat(d) === 0);
})`;
const motion = await evaluate(MOTION_STATE);
check(motion.length === 2 && motion.every(Boolean), "reduced motion: the viewer still moves");
await closeWithEscape();

// Forced colors: every viewer control keeps a visible boundary.
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "forced-colors", value: "active" }],
});
await load(1440, 900, "dark");
await evaluate(openViewer(0, ".pv2-case-evidence__frame"));
const BOUNDARY_STATE = `[...document.querySelectorAll('.pv2-evidence-viewer__bar button')].map((el) => {
  const s = getComputedStyle(el);
  return s.borderTopStyle !== 'none' && parseFloat(s.borderTopWidth) > 0;
})`;
const boundaries = await evaluate(BOUNDARY_STATE);
check(
  boundaries.length === 1 && boundaries.every(Boolean),
  "forced colors: the Close control lost its boundary",
);
await screenshot("forced-colors-viewer");
await closeWithEscape();
await send("Emulation.setEmulatedMedia", { features: [] });

// No JavaScript: the server-rendered page still shows every preview and caption.
await send("Emulation.setScriptExecutionDisabled", { value: true });
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url });
await wait(1500);
const noScript = await evaluate(`(() => ({
  previews: [...document.querySelectorAll('.pv2-case-evidence img')].filter((i) => i.getAttribute('src')).length,
  captions: [...document.querySelectorAll('.pv2-case-evidence figcaption p')].filter((p) => p.textContent.trim()).length,
}))()`);
check(
  noScript.previews === 7 && noScript.captions === 7,
  `no JavaScript: ${JSON.stringify(noScript)}`,
);
await send("Emulation.setScriptExecutionDisabled", { value: false });

const uniqueErrors = [...new Set(consoleErrors)];
check(uniqueErrors.length === 0, `console errors: ${uniqueErrors.join(" | ")}`);
const foreignHosts = [...requestHosts].filter((host) => host !== LOCAL_HOST);
check(foreignHosts.length === 0, `requests outside the local server: ${foreignHosts.join(", ")}`);

writeFileSync(
  `${outputDirectory}/results.json`,
  JSON.stringify(
    { runs, failures, consoleErrors: uniqueErrors, hosts: [...requestHosts] },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      runs: runs.length,
      failures: failures.length,
      firstFailures: failures.slice(0, 20),
      hosts: [...requestHosts],
    },
    null,
    1,
  ),
);
socket.close();
if (failures.length > 0) process.exit(1);
