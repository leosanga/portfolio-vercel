import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateSharedStackExitOffsets,
  restoreNativeStackRects,
} from "../src/components/portfolio-v2/case-stack-exit.ts";

function stickyRects(heights, pinTop, edgeStep, rootBottom) {
  return heights.map((height, index) => {
    const pin = pinTop + index * edgeStep;
    const top = Math.min(pin, rootBottom - height);
    return { top, bottom: top + height, height };
  });
}

function assertSharedExit(rects, offsets, pinTop, edgeStep) {
  const positions = rects.map((rect, index) => rect.top + offsets[index]);
  const displacements = positions.map((top, index) => top - (pinTop + index * edgeStep));
  for (const displacement of displacements) {
    assert.ok(Math.abs(displacement - displacements[0]) < 1e-8);
  }
}

test("the first, second, or last card can define the shared exit envelope", () => {
  const cases = [
    { peak: 0, heights: [600, 500, 480], bottom: 650 },
    { peak: 1, heights: [520, 590, 500], bottom: 660 },
    { peak: 2, heights: [500, 500, 620], bottom: 700 },
  ];
  const pinTop = 88;
  const edgeStep = 45;

  for (const scenario of cases) {
    const rects = stickyRects(scenario.heights, pinTop, edgeStep, scenario.bottom);
    const offsets = calculateSharedStackExitOffsets(rects, pinTop, edgeStep, scenario.bottom);
    assertSharedExit(rects, offsets, pinTop, edgeStep);
    const edges = scenario.heights.map((height, index) => pinTop + index * edgeStep + height);
    const envelope = Math.max(...edges);
    assert.equal(edges.indexOf(envelope), scenario.peak);
    const expectedExit = envelope - scenario.bottom;
    offsets.forEach((offset, index) => {
      const correctedTop = rects[index].top + offset;
      assert.ok(Math.abs(correctedTop - (pinTop + index * edgeStep - expectedExit)) < 1e-8);
    });
  }
});

test("no exit preserves native sticky positions", () => {
  const rects = stickyRects([485.41, 555.44, 528.21], 88, 45, 900);
  assert.deepEqual(calculateSharedStackExitOffsets(rects, 88, 45, 900), [0, 0, 0]);
});

test("fractional dimensions and container positions retain one shared displacement", () => {
  const pinTop = 88.25;
  const edgeStep = 45.5;
  const rootBottom = 661.98;
  const rects = stickyRects([485.41, 555.44, 528.21], pinTop, edgeStep, rootBottom);
  const offsets = calculateSharedStackExitOffsets(rects, pinTop, edgeStep, rootBottom);
  assertSharedExit(rects, offsets, pinTop, edgeStep);
});

test("deep exit and reverse scrolling are deterministic", () => {
  const heights = [485, 555, 528];
  const pinTop = 88;
  const edgeStep = 45;
  const bottoms = [900, 650, 320, 650, 900];
  const offsets = bottoms.map((rootBottom) => {
    const rects = stickyRects(heights, pinTop, edgeStep, rootBottom);
    const next = calculateSharedStackExitOffsets(rects, pinTop, edgeStep, rootBottom);
    assertSharedExit(rects, next, pinTop, edgeStep);
    return next;
  });
  assert.deepEqual(offsets[0], [0, 0, 0]);
  assert.deepEqual(offsets[4], [0, 0, 0]);
  assert.deepEqual(offsets[1], offsets[3]);
  assert.ok(offsets[2].some((offset) => Math.abs(offset) > 100));
});

test("invalid geometry produces zero offsets", () => {
  assert.deepEqual(calculateSharedStackExitOffsets([], 88, 45, 100), []);
  assert.deepEqual(
    calculateSharedStackExitOffsets([{ top: 10, bottom: 10, height: 0 }], 88, 45, 100),
    [0],
  );
  assert.deepEqual(
    calculateSharedStackExitOffsets([{ top: 10, bottom: 20, height: 9 }], 88, 45, 100),
    [0],
  );
  const valid = [{ top: 10, bottom: 20, height: 10 }];
  assert.deepEqual(calculateSharedStackExitOffsets(valid, Number.NaN, 45, 100), [0]);
  assert.deepEqual(calculateSharedStackExitOffsets(valid, 88, 0, 100), [0]);
  assert.deepEqual(calculateSharedStackExitOffsets(valid, 88, 45, Number.POSITIVE_INFINITY), [0]);
});

test("previous CSS translates are undone only when enhancement is actually active", () => {
  const native = stickyRects([485, 555, 528], 88, 45, 620);
  const previous = calculateSharedStackExitOffsets(native, 88, 45, 620);
  const measuredWithTranslate = native.map((rect, index) => ({
    top: rect.top + previous[index],
    bottom: rect.bottom + previous[index],
    height: rect.height,
  }));

  const restored = restoreNativeStackRects(measuredWithTranslate, previous, true);
  restored.forEach((rect, index) => {
    assert.ok(Math.abs(rect.top - native[index].top) < 1e-8);
    assert.ok(Math.abs(rect.bottom - native[index].bottom) < 1e-8);
  });
  assert.deepEqual(
    calculateSharedStackExitOffsets(restored, 88, 45, 580),
    calculateSharedStackExitOffsets(native, 88, 45, 580),
  );
  assert.deepEqual(
    restoreNativeStackRects(measuredWithTranslate, previous, false),
    measuredWithTranslate,
  );
});
