import assert from "node:assert/strict";
import {
  MAX_CANVAS_SCALE,
  MIN_CANVAS_SCALE,
  wheelZoomFactor,
  zoomCanvasAt,
  type CanvasViewport,
} from "../../src/components/project-catalog/workflow/canvasViewport";
import { attachCanvasWheelZoom } from "../../src/components/project-catalog/workflow/useCanvasWheelZoom";

const close = (actual: number, expected: number) =>
  assert(Math.abs(actual - expected) < 1e-9, `${actual} should equal ${expected}`);
const initial: CanvasViewport = { x: -120, y: 80, scale: 0.85, width: 640, height: 370 };
const anchor = { x: 0.23, y: 0.71 };
const worldAt = (view: CanvasViewport) => ({
  x: view.x + (anchor.x * view.width) / view.scale,
  y: view.y + (anchor.y * view.height) / view.scale,
});
const enlarged = zoomCanvasAt(initial, 1.2, anchor);
close(worldAt(enlarged).x, worldAt(initial).x);
close(worldAt(enlarged).y, worldAt(initial).y);
const reversed = zoomCanvasAt(enlarged, 1 / 1.2, anchor);
close(reversed.x, initial.x);
close(reversed.y, initial.y);
close(reversed.scale, initial.scale);
assert.equal(zoomCanvasAt(initial, 100).scale, MAX_CANVAS_SCALE);
assert.equal(zoomCanvasAt(initial, 0.001).scale, MIN_CANVAS_SCALE);
// A wide graph's Fit on a phone sits below the floor; zooming out from there must not zoom in.
const PHONE_FIT_SCALE = 0.086;
const phoneFit = { ...initial, scale: PHONE_FIT_SCALE };
assert.equal(zoomCanvasAt(phoneFit, 1 / 1.2).scale, PHONE_FIT_SCALE, "zoom out holds at Fit");
close(zoomCanvasAt(phoneFit, 1.2).scale, PHONE_FIT_SCALE * 1.2);
assert.equal(zoomCanvasAt(initial, Number.NaN), initial);
close(wheelZoomFactor(0, -100, 370)!, 1.2);
close(wheelZoomFactor(1, -6.25, 370)!, 1.2);
close(wheelZoomFactor(2, -1, 370)!, 1.2);
assert.equal(wheelZoomFactor(0, 0, 370), null);

class ViewportFixture extends EventTarget {
  registrations: Array<{ type: string; options: AddEventListenerOptions | boolean | undefined }> =
    [];
  override addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ) {
    this.registrations.push({ type, options });
    super.addEventListener(type, callback, options);
  }
  getBoundingClientRect() {
    return { left: 40, top: 60, width: 320, height: 185 };
  }
}
function wheel(overrides: Record<string, unknown> = {}) {
  const event = new Event("wheel", { cancelable: overrides.cancelable !== false });
  for (const [key, value] of Object.entries({
    ctrlKey: true,
    deltaMode: 0,
    deltaY: -100,
    clientX: 113.6,
    clientY: 191.35,
    ...overrides,
  })) {
    if (key !== "cancelable") Object.defineProperty(event, key, { value, configurable: true });
  }
  return event;
}
const surface = new ViewportFixture();
let view = initial;
let explorations = 0;
const detach = attachCanvasWheelZoom(
  surface as unknown as SVGSVGElement,
  () => explorations++,
  (update) => {
    view = update(view);
  },
);
assert.deepEqual(surface.registrations, [{ type: "wheel", options: { passive: false } }]);
const input = wheel();
surface.dispatchEvent(input);
assert.equal(input.defaultPrevented, true);
assert.equal(explorations, 1);
close(worldAt(view).x, worldAt(initial).x);
close(worldAt(view).y, worldAt(initial).y);
for (const overrides of [{ ctrlKey: false }, { cancelable: false }, { deltaY: 0 }]) {
  const before = view;
  const ignored = wheel(overrides);
  surface.dispatchEvent(ignored);
  assert.equal(view, before);
  assert.equal(ignored.defaultPrevented, false);
}
view = { ...view, scale: MAX_CANVAS_SCALE };
const atLimit = wheel();
surface.dispatchEvent(atLimit);
assert.equal(atLimit.defaultPrevented, true);
assert.equal(view.scale, MAX_CANVAS_SCALE);
detach();
const afterCleanup = wheel();
surface.dispatchEvent(afterCleanup);
assert.equal(afterCleanup.defaultPrevented, false);
console.log("canvas viewport checks passed: anchor, bounds, wheel input and cleanup");
