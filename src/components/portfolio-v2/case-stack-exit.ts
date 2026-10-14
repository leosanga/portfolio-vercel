export type StackExitRect = {
  top: number;
  bottom: number;
  height: number;
};

const RECT_PRECISION_TOLERANCE_PX = 0.01;

function validRects(rects: readonly StackExitRect[]) {
  return (
    rects.length > 0 &&
    rects.every(
      (rect) =>
        Number.isFinite(rect.top) &&
        Number.isFinite(rect.bottom) &&
        Number.isFinite(rect.height) &&
        rect.height > 0 &&
        rect.bottom > rect.top &&
        Math.abs(rect.bottom - rect.top - rect.height) < RECT_PRECISION_TOLERANCE_PX,
    )
  );
}

/** Removes only a translate that is currently active in the enhanced stack. */
export function restoreNativeStackRects(
  rects: readonly StackExitRect[],
  appliedOffsets: readonly number[],
  enhancementApplied: boolean,
): StackExitRect[] {
  return rects.map((rect, index) => {
    const offset =
      enhancementApplied && Number.isFinite(appliedOffsets[index]) ? appliedOffsets[index]! : 0;
    return {
      top: rect.top - offset,
      bottom: rect.bottom - offset,
      height: rect.height,
    };
  });
}

/**
 * Returns per-slot vertical translates that make every exiting card share the
 * same displacement from its sticky pin while preserving native arrival.
 */
export function calculateSharedStackExitOffsets(
  rects: readonly StackExitRect[],
  pinTop: number,
  edgeStep: number,
  rootBottom: number,
): number[] {
  const zeroOffsets = rects.map(() => 0);
  if (
    !validRects(rects) ||
    !Number.isFinite(pinTop) ||
    !Number.isFinite(edgeStep) ||
    edgeStep <= 0 ||
    !Number.isFinite(rootBottom)
  )
    return zeroOffsets;

  const envelope = Math.max(...rects.map((rect, index) => pinTop + index * edgeStep + rect.height));
  const exit = Math.max(0, envelope - rootBottom);
  if (exit === 0) return zeroOffsets;

  return rects.map((rect, index) => pinTop + index * edgeStep - exit - rect.top);
}
