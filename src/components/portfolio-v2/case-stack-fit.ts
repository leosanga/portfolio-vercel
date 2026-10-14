export const CASE_STACK_WIDTH_QUERY = "(width >= 1024px)";
const RECT_PRECISION_TOLERANCE_PX = 0.01;
export const CASE_STACK_CLEARANCES = {
  headerGap: 16,
  labelClearance: 12,
  minimumBottomClearance: 88,
  dockGap: 32,
} as const;

export type CaseStackFitRect = {
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export type CaseStackFitGeometry = {
  top: number;
  edgeStep: number;
  clearance: number;
  heights: number[];
  rects: CaseStackFitRect[];
  rootBottom: number;
  rootHeight: number;
  requiredHeight: number;
  viewportHeight: number;
  fits: boolean;
};

/** Returns null when any measured dimension cannot safely support a fit decision. */
export function calculateCaseStackRequiredHeight(
  top: number,
  edgeStep: number,
  heights: readonly number[],
  clearance: number,
): number | null {
  if (
    !Number.isFinite(top) ||
    top < 0 ||
    !Number.isFinite(edgeStep) ||
    edgeStep <= 0 ||
    !Number.isFinite(clearance) ||
    clearance <= 0 ||
    heights.length === 0 ||
    heights.some((height) => !Number.isFinite(height) || height <= edgeStep)
  )
    return null;

  const pinnedBottom = Math.max(...heights.map((height, index) => top + index * edgeStep + height));
  const requiredHeight = pinnedBottom + clearance;
  return Number.isFinite(requiredHeight) ? requiredHeight : null;
}

/** Shared live geometry for both presentation selection and stack activation. */
export function measureCaseStackFit(
  root: HTMLElement,
  header: HTMLElement | null,
  dock: HTMLElement | null,
  viewportHeight: number,
): CaseStackFitGeometry | null {
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) return null;

  const slots = [...root.querySelectorAll<HTMLElement>(".pv2-case-stack__slot")];
  if (slots.length === 0) return null;
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const dockHeight = dock?.getBoundingClientRect().height ?? 0;
  const top = headerHeight + CASE_STACK_CLEARANCES.headerGap;
  const clearance = Math.max(
    CASE_STACK_CLEARANCES.minimumBottomClearance,
    dockHeight + CASE_STACK_CLEARANCES.dockGap,
  );
  const rootRect = root.getBoundingClientRect();
  const rects = slots.map((slot) => slot.getBoundingClientRect());
  const bands = slots.map((slot) => {
    const article = slot.querySelector<HTMLElement>(":scope > article");
    const label = article?.querySelector<HTMLElement>(".pv2-project-index");
    if (!article || !label || label.offsetParent !== article) return Number.NaN;
    return Math.ceil(
      label.offsetTop +
        label.offsetHeight +
        article.clientTop +
        CASE_STACK_CLEARANCES.labelClearance,
    );
  });
  if (
    !Number.isFinite(headerHeight) ||
    headerHeight < 0 ||
    !Number.isFinite(dockHeight) ||
    dockHeight < 0 ||
    !Number.isFinite(top) ||
    !Number.isFinite(clearance) ||
    clearance <= 0 ||
    !Number.isFinite(rootRect.width) ||
    rootRect.width <= 0 ||
    !Number.isFinite(rootRect.bottom) ||
    !Number.isFinite(rootRect.height) ||
    rootRect.height <= 0 ||
    bands.some((band) => !Number.isFinite(band) || band <= 0) ||
    rects.some(
      (rect) =>
        !Number.isFinite(rect.top) ||
        !Number.isFinite(rect.bottom) ||
        rect.bottom <= rect.top ||
        !Number.isFinite(rect.width) ||
        rect.width <= 0 ||
        !Number.isFinite(rect.height) ||
        rect.height <= 0 ||
        Math.abs(rect.bottom - rect.top - rect.height) >= RECT_PRECISION_TOLERANCE_PX,
    )
  )
    return null;

  const edgeStep = Math.max(...bands);
  const heights = rects.map((rect) => rect.height);
  const requiredHeight = calculateCaseStackRequiredHeight(top, edgeStep, heights, clearance);
  if (requiredHeight === null) return null;

  return {
    top,
    edgeStep,
    clearance,
    heights,
    rects: rects.map(({ top: rectTop, bottom, width, height }) => ({
      top: rectTop,
      bottom,
      width,
      height,
    })),
    rootBottom: rootRect.bottom,
    rootHeight: rootRect.height,
    requiredHeight,
    viewportHeight,
    fits: requiredHeight <= viewportHeight,
  };
}
