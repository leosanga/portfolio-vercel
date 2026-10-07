import assert from "node:assert/strict";
import { mock } from "bun:test";
import RealLenis from "lenis";
import type { LenisOptions } from "lenis";

// This runs the component's actual effect and the installed Lenis against a small
// DOM/event/RAF adapter. It tests controller lifecycle, not browser scrolling,
// focus defaults, touch behavior, history restoration or visual acceptance.
let effect: (() => void | (() => void)) | undefined;
let effectDependencies: readonly unknown[] = [];
let location = { href: "/", state: { __TSR_key: "first" } };
const navigationListeners = new Set<() => void>();
const router = {
  subscribe(type: string, callback: () => void) {
    assert.equal(type, "onBeforeNavigate");
    navigationListeners.add(callback);
    return () => navigationListeners.delete(callback);
  },
};
mock.module("react", () => ({
  useEffect(callback: typeof effect, dependencies: readonly unknown[]) {
    effect = callback;
    effectDependencies = dependencies;
  },
}));
mock.module("@tanstack/react-router", () => ({
  useRouter: () => router,
  useLocation: ({ select }: { select: (value: typeof location) => string }) => select(location),
}));
const instances: RealLenis[] = [];
const destroyed: RealLenis[] = [];
class InstrumentedLenis extends RealLenis {
  constructor(options: LenisOptions) {
    super(options);
    instances.push(this);
  }
  override destroy() {
    destroyed.push(this);
    super.destroy();
  }
}
mock.module("lenis", () => ({ default: InstrumentedLenis }));

// Import before defining window/document: imports must be SSR-safe.
const { PortfolioSmoothScrollV2 } =
  await import("../src/components/portfolio-v2/PortfolioSmoothScrollV2");

class FakeSvgElement extends EventTarget {
  nativeSelector: string | null = null;
  matches(selector: string) {
    return this.nativeSelector !== null && selector.split(",").includes(this.nativeSelector);
  }
}
class FakeElement extends FakeSvgElement {
  classes = new Set<string>();
  classList = {
    add: (name: string) => this.classes.add(name),
    remove: (name: string) => this.classes.delete(name),
    [Symbol.iterator]: () => this.classes[Symbol.iterator](),
  };
  style = { position: "static", overflowY: "visible", overflowX: "visible" };
  scrollHeight = 5000;
  scrollWidth = 1000;
  clientHeight = 800;
  clientWidth = 1000;
  isContentEditable = false;
  hasAttribute() {
    return false;
  }
}
class FakeWindow extends EventTarget {
  scrollY = 420;
  scrollX = 0;
  innerWidth = 1000;
  innerHeight = 800;
  writes = 0;
  scrollTo({ top }: { top: number }) {
    this.writes += 1;
    this.scrollY = top;
  }
  matchMedia(query: string) {
    return query.includes("prefers-reduced-motion") ? reduced : forced;
  }
}
class Preference extends EventTarget {
  matches = false;
  set(value: boolean) {
    this.matches = value;
    this.dispatchEvent(new Event("change"));
  }
}
const reduced = new Preference();
const forced = new Preference();
const windowAdapter = new FakeWindow();
const documentAdapter = Object.assign(new EventTarget(), {
  body: new FakeElement(),
  documentElement: new FakeElement(),
  hidden: false,
});
const observers: FakeMutationObserver[] = [];
class FakeMutationObserver {
  targets: { target: unknown; options: MutationObserverInit }[] = [];
  disconnected = false;
  constructor(public callback: () => void) {
    observers.push(this);
  }
  observe(target: unknown, options: MutationObserverInit) {
    this.targets.push({ target, options });
  }
  disconnect() {
    this.disconnected = true;
  }
}
class FakeResizeObserver {
  observe() {}
  disconnect() {}
}
const frames = new Map<number, FrameRequestCallback>();
let nextFrame = 0;
let clock = 1000;
Object.assign(globalThis, {
  Window: FakeWindow,
  Element: FakeSvgElement,
  HTMLElement: FakeElement,
  window: windowAdapter,
  document: documentAdapter,
  MutationObserver: FakeMutationObserver,
  ResizeObserver: FakeResizeObserver,
  getComputedStyle: (element: FakeElement) => element.style,
  requestAnimationFrame: (callback: FrameRequestCallback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
  },
  cancelAnimationFrame: (id: number) => frames.delete(id),
});
Object.defineProperty(globalThis, "performance", { value: { now: () => clock } });

function mount() {
  assert.equal(PortfolioSmoothScrollV2(), null);
  const cleanup = effect?.();
  assert.equal(typeof cleanup, "function");
  return cleanup as () => void;
}
function current() {
  return instances.at(-1)!;
}
function frame() {
  clock += 16;
  const pending = [...frames.values()];
  frames.clear();
  pending.forEach((callback) => callback(clock));
}
function wheel(path: EventTarget[] = [documentAdapter.body, documentAdapter.documentElement]) {
  const event = Object.assign(new Event("wheel", { cancelable: true }), {
    deltaX: 0,
    deltaY: 180,
    deltaMode: 0,
    ctrlKey: false,
    shiftKey: false,
    composedPath: () => path,
  });
  return event;
}
function startWheel() {
  const event = wheel();
  windowAdapter.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true);
  assert.equal(current().isScrolling, "smooth");
  frame();
  frame();
}
function assertNativeInput(event: Event) {
  startWheel();
  const writes = windowAdapter.writes;
  windowAdapter.dispatchEvent(event);
  assert.equal(current().isScrolling, false);
  assert.equal(current().targetScroll, windowAdapter.scrollY);
  assert.equal(windowAdapter.writes, writes, "cancellation does not write scroll position");
  assert.equal(documentAdapter.documentElement.classes.has("lenis-smooth"), false);
  assert.equal(event.defaultPrevented, false);
  assert.equal(frames.size, 0, "native input leaves no controller frame");
}

let cleanup = mount();
assert.equal(instances.length, 1);
assert.equal(current().targetScroll, 420);
assert.equal(windowAdapter.writes, 0);
assert.equal(frames.size, 0, "idle controller schedules no frames");
assert.equal(current().options.lerp, 0.14);
assert.equal(current().options.wheelMultiplier, 1);
assert.equal(current().options.anchors, false);
assert.equal(current().options.syncTouch, false);
assert.equal(current().options.autoRaf, false);
assert.equal(current().options.autoToggle, false);
assert.deepEqual(
  observers[0]!.targets.map((entry) => entry.options.attributeFilter),
  [["style"], ["style"]],
);

// Each native action interrupts actual installed-library inertia without a jump.
for (const type of ["pointerdown", "keydown", "click", "blur"]) {
  assertNativeInput(Object.assign(new Event(type), { key: "f", ctrlKey: true }));
}
for (const selector of [
  ".pc-canvas-frame",
  ".pc-workflow-modal-overlay",
  '[aria-modal="true"]',
  "textarea",
  "[data-lenis-prevent-wheel]",
]) {
  const target = new FakeElement();
  target.nativeSelector = selector;
  assertNativeInput(wheel([target, documentAdapter.body, documentAdapter.documentElement]));
}
const nested = new FakeElement();
nested.style.overflowY = "auto";
assertNativeInput(wheel([nested, documentAdapter.body, documentAdapter.documentElement]));
const editable = new FakeElement();
editable.isContentEditable = true;
assertNativeInput(wheel([editable, documentAdapter.body, documentAdapter.documentElement]));
const svg = new FakeSvgElement();
const canvasFrame = new FakeElement();
canvasFrame.nativeSelector = ".pc-canvas-frame";
assertNativeInput(wheel([svg, canvasFrame, documentAdapter.body, documentAdapter.documentElement]));
const horizontal = new FakeElement();
horizontal.style.overflowX = "auto";
horizontal.scrollWidth = 2000;
assertNativeInput(wheel([horizontal, documentAdapter.body, documentAdapter.documentElement]));
for (const patch of [{ deltaX: 220 }, { ctrlKey: true }, { shiftKey: true }, { deltaY: 0 }]) {
  assertNativeInput(Object.assign(wheel(), patch));
}
assertNativeInput(
  Object.assign(new Event("touchstart", { cancelable: true }), {
    targetTouches: [{ clientX: 20, clientY: 20 }],
    composedPath: () => [documentAdapter.body, documentAdapter.documentElement],
  }),
);

// Equal current/target still cancels, unlike scrollTo's equal-target early return.
startWheel();
windowAdapter.scrollY = current().targetScroll;
const equalTargetWrites = windowAdapter.writes;
windowAdapter.dispatchEvent(new Event("keydown"));
assert.equal(current().isScrolling, false);
assert.equal(frames.size, 0);
assert.equal(windowAdapter.writes, equalTargetWrites);

// An external native restoration while idle updates the installed-library state.
windowAdapter.scrollY = 900;
windowAdapter.dispatchEvent(new Event("scroll"));
assert.equal(current().targetScroll, 900);
assert.equal(current().animatedScroll, 900);
assert.equal(frames.size, 0);

// An idle interval cannot advance the next wheel immediately to its destination.
clock += 60_000;
const previousScroll = windowAdapter.scrollY;
windowAdapter.dispatchEvent(wheel());
frame();
assert.ok(windowAdapter.scrollY > previousScroll);
assert.ok(windowAdapter.scrollY < current().targetScroll);
for (let index = 0; frames.size && index < 300; index++) frame();
assert.equal(current().isScrolling, false);
assert.equal(frames.size, 0, "RAF driver sleeps after installed-library completion");

startWheel();
const writesBeforeRoute = windowAdapter.writes;
navigationListeners.forEach((callback) => callback());
assert.equal(current().isScrolling, false);
assert.equal(windowAdapter.writes, writesBeforeRoute);
const old = current();
cleanup();
location = { href: "/project-catalog?view=workflows", state: { __TSR_key: "second" } };
windowAdapter.scrollY = 800;
cleanup = mount();
assert.ok(destroyed.includes(old));
assert.equal(current().targetScroll, 800);
assert.equal(effectDependencies[0], "/project-catalog?view=workflows:second");
assert.equal(navigationListeners.size, 1);

for (const eventType of ["hashchange", "popstate"]) {
  startWheel();
  const previous = current();
  const writes = windowAdapter.writes;
  windowAdapter.dispatchEvent(new Event(eventType));
  assert.ok(destroyed.includes(previous));
  assert.equal(current().targetScroll, windowAdapter.scrollY);
  assert.equal(windowAdapter.writes, writes);
  assert.equal(frames.size, 0);
}

// Preferences and visibility remove smoothing live; recreation reads actual position.
for (const preference of [reduced, forced]) {
  startWheel();
  const previous = current();
  preference.set(true);
  assert.ok(destroyed.includes(previous));
  assert.equal(documentAdapter.documentElement.classes.size, 0);
  assert.equal(frames.size, 0);
  assert.equal(windowAdapter.dispatchEvent(wheel()), true);
  windowAdapter.scrollY = 560;
  preference.set(false);
  assert.equal(current().targetScroll, 560);
}
startWheel();
documentAdapter.hidden = true;
documentAdapter.dispatchEvent(new Event("visibilitychange"));
assert.equal(documentAdapter.documentElement.classes.size, 0);
documentAdapter.hidden = false;
windowAdapter.scrollY = 610;
documentAdapter.dispatchEvent(new Event("visibilitychange"));
assert.equal(current().targetScroll, 610);

// Observer delivery models a modal effect's fixed body/root lock and cleanup.
for (const [target, property, value] of [
  [documentAdapter.body, "position", "fixed"],
  [documentAdapter.documentElement, "overflowY", "hidden"],
  [documentAdapter.documentElement, "overflowY", "clip"],
] as const) {
  startWheel();
  const previous = current();
  const saved = target.style[property];
  target.style[property] = value;
  observers.at(-1)!.callback();
  assert.ok(destroyed.includes(previous));
  assert.equal(frames.size, 0);
  target.style[property] = saved;
  windowAdapter.scrollY = 700;
  observers.at(-1)!.callback();
  assert.equal(current().targetScroll, 700);
}

startWheel();
windowAdapter.dispatchEvent(new Event("pagehide"));
assert.equal(frames.size, 0);
documentAdapter.dispatchEvent(new Event("visibilitychange"));
assert.equal(documentAdapter.documentElement.classes.size, 0, "pagehide stays suspended");
windowAdapter.scrollY = 930;
windowAdapter.dispatchEvent(new Event("pageshow"));
assert.equal(current().targetScroll, 930);
cleanup();
assert.equal(navigationListeners.size, 0);
assert.equal(documentAdapter.documentElement.classes.size, 0);
assert.equal(observers.at(-1)!.disconnected, true);
assert.equal(windowAdapter.dispatchEvent(wheel()), true, "unmount removes wheel interception");

// A reduced-motion first mount must never construct the wheel interceptor.
reduced.set(true);
const initialCount = instances.length;
cleanup = mount();
assert.equal(instances.length, initialCount);
assert.equal(windowAdapter.dispatchEvent(wheel()), true);
cleanup();

console.log("Smooth-scroll controller lifecycle passed with installed Lenis 1.3.26.");
console.log(
  "DOM, preferences, router events and RAF are adapters; browser acceptance remains pending.",
);
