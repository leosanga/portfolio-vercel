export interface CanvasViewport {
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
}

export const MIN_CANVAS_SCALE = 0.15;
export const MAX_CANVAS_SCALE = 2;
export const CANVAS_ZOOM_FACTOR = 1.2;
export const CANVAS_VIEWPORT_HINT =
  "Drag to pan. Ctrl + scroll to zoom. Focus the canvas to use arrows, + / − to zoom, and 0 to Fit.";
const WHEEL_LINE_PIXELS = 16;
const WHEEL_STEP_PIXELS = 100;

/** Anchor coordinates are fractions of the physical viewport, not world coordinates. */
export function zoomCanvasAt(
  view: CanvasViewport,
  factor: number,
  anchor = { x: 0.5, y: 0.5 },
): CanvasViewport {
  if (!Number.isFinite(factor) || factor <= 0) return view;
  // Fit can sit below the floor for a wide graph on a phone; zooming out then holds at Fit.
  const floor = Math.min(MIN_CANVAS_SCALE, view.scale);
  const scale = Math.max(floor, Math.min(MAX_CANVAS_SCALE, view.scale * factor));
  return {
    ...view,
    scale,
    x: view.x + anchor.x * view.width * (1 / view.scale - 1 / scale),
    y: view.y + anchor.y * view.height * (1 / view.scale - 1 / scale),
  };
}

export function wheelZoomFactor(mode: number, delta: number, height: number): number | null {
  if (!Number.isFinite(delta) || delta === 0) return null;
  const unit = mode === 1 ? WHEEL_LINE_PIXELS : mode === 2 ? height : 1;
  const pixels = Math.max(-WHEEL_STEP_PIXELS, Math.min(WHEEL_STEP_PIXELS, delta * unit));
  return Math.pow(CANVAS_ZOOM_FACTOR, -pixels / WHEEL_STEP_PIXELS);
}
