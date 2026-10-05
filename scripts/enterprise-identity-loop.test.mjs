import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const hookPath = new URL(
  "../src/components/portfolio-v2/useIdentityExplanationLoopV2.ts",
  import.meta.url,
);
const hookSource = await readFile(hookPath, "utf8");
const compiled = ts.transpileModule(hookSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function createHarness({
  compact = true,
  observer = true,
  waapi = true,
  enabled = true,
  playback = "loop",
} = {}) {
  const effects = [];
  const media = new Map();
  const listeners = new Map();
  const animations = [];
  let observerInstance;
  const addListener = (name, listener) => {
    const set = listeners.get(name) ?? new Set();
    set.add(listener);
    listeners.set(name, set);
  };
  const removeListener = (name, listener) => listeners.get(name)?.delete(listener);
  const mediaQuery = (query) => {
    if (!media.has(query)) {
      const item = {
        matches: false,
        listeners: new Set(),
        addEventListener(type, listener) {
          if (type === "change") this.listeners.add(listener);
        },
        removeEventListener(type, listener) {
          if (type === "change") this.listeners.delete(listener);
        },
        change(matches) {
          this.matches = matches;
          for (const listener of this.listeners) listener({ matches });
        },
      };
      media.set(query, item);
    }
    return media.get(query);
  };
  const cues = [0, 1].map((phase) => ({
    dataset: { identityPhase: String(phase) },
    width: 20,
    getBoundingClientRect() {
      return { width: this.width };
    },
    animate(frames, options) {
      const animation = {
        frames,
        options,
        cancelCount: 0,
        cancel() {
          this.cancelCount += 1;
        },
      };
      animations.push(animation);
      return animation;
    },
  }));
  const root = {
    querySelectorAll: () => cues,
  };
  const window = {
    matchMedia: mediaQuery,
    ...(observer ? { IntersectionObserver: class {} } : {}),
  };
  const Element = { prototype: waapi ? { animate() {} } : {} };
  class IntersectionObserverMock {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      observerInstance = this;
    }
    observe(target) {
      this.target = target;
    }
    disconnect() {
      this.disconnected = true;
    }
    intersect(isIntersecting, intersectionRatio) {
      this.callback([{ isIntersecting, intersectionRatio }]);
    }
  }
  if (observer) window.IntersectionObserver = IntersectionObserverMock;
  const document = {
    hidden: false,
    addEventListener: addListener,
    removeEventListener: removeListener,
  };
  const react = {
    useRef: (initial) => ({ current: initial }),
    useEffect: (effect) => effects.push(effect),
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.equal(name, "react");
      return react;
    },
    window,
    document,
    Element,
    ...(observer ? { IntersectionObserver: IntersectionObserverMock } : {}),
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Array,
    Number,
  });
  const ref = exports.useIdentityExplanationLoopV2(compact, enabled, playback);
  ref.current = root;
  const cleanup = effects[0]();
  return {
    animations,
    cues,
    cleanup,
    document,
    listeners,
    media,
    observer: () => observerInstance,
  };
}

function enter(harness) {
  harness.observer().intersect(true, 0.2);
}

test("missing IntersectionObserver or WAAPI keeps the static model and installs no listeners", () => {
  for (const config of [{ observer: false }, { waapi: false }]) {
    const harness = createHarness(config);
    assert.equal(harness.animations.length, 0);
    assert.equal(harness.cleanup, undefined);
    assert.equal(harness.listeners.size, 0);
    assert.equal(harness.media.size, 0);
  }
});

test("reduced motion and forced colors prevent autoplay and cancel active emphasis", () => {
  for (const query of ["(prefers-reduced-motion: reduce)", "(forced-colors: active)"]) {
    const harness = createHarness();
    const preference = harness.media.get(query);
    preference.change(true);
    enter(harness);
    assert.equal(harness.animations.length, 0, query);
  }

  const harness = createHarness();
  enter(harness);
  const active = [...harness.animations];
  harness.media.get("(prefers-reduced-motion: reduce)").change(true);
  assert.ok(active.every((animation) => animation.cancelCount === 1));
  assert.equal(harness.animations.length, 2);
});

test("offscreen and hidden states cancel; eligible reentry starts a fresh cycle", () => {
  const harness = createHarness();
  const observer = harness.observer();
  observer.intersect(true, 0.2);
  const firstCycle = [...harness.animations];
  observer.intersect(false, 0);
  assert.ok(firstCycle.every((animation) => animation.cancelCount === 1));
  observer.intersect(true, 0.2);
  const secondCycle = harness.animations.slice(2);
  assert.equal(secondCycle.length, 2);
  assert.notEqual(secondCycle[0], firstCycle[0]);

  harness.document.hidden = true;
  for (const listener of harness.listeners.get("visibilitychange")) listener();
  assert.ok(secondCycle.every((animation) => animation.cancelCount === 1));
  harness.document.hidden = false;
  for (const listener of harness.listeners.get("visibilitychange")) listener();
  assert.equal(harness.animations.length, 6);
});

test("phone breakpoint changes cancel old drawings and animate only visible cues", () => {
  const harness = createHarness();
  enter(harness);
  const oldCycle = [...harness.animations];
  harness.cues[0].width = 0;
  for (const listener of harness.media.get("(width < 768px)").listeners) {
    listener({ matches: true });
  }
  assert.ok(oldCycle.every((animation) => animation.cancelCount === 1));
  assert.equal(harness.animations.length, 3);
  assert.equal(harness.animations[2].frames[1].offset, 800 / 4600);
});

test("compact and expanded cycles repeat with the complete neutral hold", () => {
  for (const [compact, phase, total] of [
    [true, 800, 4600],
    [false, 1300, 5600],
  ]) {
    const harness = createHarness({ compact });
    enter(harness);
    assert.equal(harness.animations.length, 2);
    for (const animation of harness.animations) {
      assert.equal(animation.options.duration, total);
      assert.equal(animation.options.iterations, Infinity);
      assert.equal(animation.options.easing, "linear");
      assert.equal(animation.frames[0].opacity, 0);
      assert.equal(animation.frames.at(-1).opacity, 0);
    }
    const secondPhase = harness.animations[1].frames;
    assert.equal(secondPhase[1].offset, phase / total);
    assert.equal(secondPhase.at(-2).offset, (phase * 2) / total);
    assert.equal(secondPhase.at(-2).opacity, 0);
    assert.equal(secondPhase.at(-1).offset, 1);
  }
});

test("catalog playback runs once per mount and an interrupted pass never restarts", () => {
  const harness = createHarness({ playback: "once" });
  enter(harness);
  assert.equal(harness.animations.length, 2);
  assert.ok(harness.animations.every((animation) => animation.options.iterations === 1));
  harness.observer().intersect(false, 0);
  assert.ok(harness.animations.every((animation) => animation.cancelCount === 1));
  enter(harness);
  assert.equal(harness.animations.length, 2);
  harness.cleanup();

  const reopened = createHarness({ playback: "once" });
  enter(reopened);
  assert.equal(reopened.animations.length, 2);
  reopened.cleanup();
});

test("inactive catalog preview stays static", () => {
  const harness = createHarness({ enabled: false, playback: "once" });
  enter(harness);
  assert.equal(harness.animations.length, 0);
  harness.cleanup();
});

test("cleanup cancels animations, disconnects observation and removes all listeners", () => {
  const harness = createHarness();
  enter(harness);
  const active = [...harness.animations];
  harness.cleanup();
  assert.ok(active.every((animation) => animation.cancelCount === 1));
  assert.equal(harness.observer().disconnected, true);
  assert.equal(harness.listeners.get("visibilitychange").size, 0);
  for (const preference of harness.media.values()) assert.equal(preference.listeners.size, 0);
});
