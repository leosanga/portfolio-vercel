import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateCaseStackRequiredHeight,
  CASE_STACK_CLEARANCES,
  CASE_STACK_WIDTH_QUERY,
  measureCaseStackFit,
} from "../src/components/portfolio-v2/case-stack-fit.ts";

test("per-card envelope avoids mixing the tallest card with the last pin", () => {
  const heights = [600, 400, 400];
  const required = calculateCaseStackRequiredHeight(88, 50, heights, 88);
  assert.equal(required, 776);
  assert.ok(required <= 800);
  assert.ok(600 + 88 + 2 * 50 + 88 > 800);
});

test("first, second, or last pin can define the envelope", () => {
  const cases = [
    { heights: [600, 500, 480], expected: 776 },
    { heights: [500, 600, 480], expected: 821 },
    { heights: [500, 480, 600], expected: 866 },
  ];
  for (const { heights, expected } of cases) {
    assert.equal(calculateCaseStackRequiredHeight(88, 45, heights, 88), expected);
  }
});

test("exact and fractional boundaries are evaluated without rounding", () => {
  const heights = [485.41, 555.44, 528.21];
  const required = calculateCaseStackRequiredHeight(88.25, 45.5, heights, 88.125);
  assert.equal(required, 795.585);
  assert.equal(required <= 795.585, true);
  assert.equal(required <= 795.584, false);
});

test("invalid dimensions and empty geometry return null", () => {
  assert.equal(calculateCaseStackRequiredHeight(88, 45, [], 88), null);
  assert.equal(calculateCaseStackRequiredHeight(-1, 45, [500], 88), null);
  assert.equal(calculateCaseStackRequiredHeight(88, 0, [500], 88), null);
  assert.equal(calculateCaseStackRequiredHeight(88, 45, [45], 88), null);
  assert.equal(calculateCaseStackRequiredHeight(88, 45, [Number.NaN], 88), null);
  assert.equal(calculateCaseStackRequiredHeight(88, 45, [500], 0), null);
});

function rect(top, height, width = 1200) {
  return { top, bottom: top + height, height, width };
}

function fixture(heights, { invalidLabel = false } = {}) {
  const slots = heights.map((height, index) => {
    const article = {
      clientTop: 1,
      querySelector: () => ({
        offsetParent: invalidLabel ? null : article,
        offsetTop: 12,
        offsetHeight: 20,
      }),
    };
    return {
      getBoundingClientRect: () => rect(200 + index * 50, height),
      querySelector: () => article,
    };
  });
  return {
    root: {
      querySelectorAll: () => slots,
      getBoundingClientRect: () => ({ ...rect(100, 2000), bottom: 2100 }),
    },
    header: { getBoundingClientRect: () => rect(0, 64) },
    dock: { getBoundingClientRect: () => rect(0, 40) },
  };
}

test("both hooks share the same viewport query and named clearance geometry", () => {
  assert.equal(CASE_STACK_WIDTH_QUERY, "(width >= 1024px)");
  assert.deepEqual(CASE_STACK_CLEARANCES, {
    headerGap: 16,
    labelClearance: 12,
    minimumBottomClearance: 88,
    dockGap: 32,
  });
  const { root, header, dock } = fixture([500, 610, 480]);
  const geometry = measureCaseStackFit(root, header, dock, 823);
  assert.ok(geometry);
  assert.equal(geometry.top, 80);
  assert.equal(geometry.edgeStep, 45);
  assert.equal(geometry.clearance, 88);
  assert.equal(geometry.requiredHeight, 823);
  assert.equal(geometry.fits, true);
  assert.equal(measureCaseStackFit(root, header, dock, 822.99)?.fits, false);
});

test("DOM measurement rejects invalid labels, rectangles, and viewport dimensions", () => {
  const invalid = fixture([500], { invalidLabel: true });
  assert.equal(measureCaseStackFit(invalid.root, invalid.header, invalid.dock, 900), null);
  const valid = fixture([500]);
  assert.equal(measureCaseStackFit(valid.root, valid.header, valid.dock, 0), null);
  const badRoot = { ...valid.root, getBoundingClientRect: () => rect(0, 0) };
  assert.equal(measureCaseStackFit(badRoot, valid.header, valid.dock, 900), null);
});
