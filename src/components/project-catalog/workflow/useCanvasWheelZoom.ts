import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
import { wheelZoomFactor, zoomCanvasAt, type CanvasViewport } from "./canvasViewport";

type UpdateViewport = (update: (current: CanvasViewport) => CanvasViewport) => void;

/** Element-scoped, nonpassive input. Exported for fixtures and local native-template studies. */
export function attachCanvasWheelZoom(
  svg: SVGSVGElement,
  onExplore: () => void,
  updateViewport: UpdateViewport,
) {
  const wheel = (event: WheelEvent) => {
    if (!event.ctrlKey || !event.cancelable || event.defaultPrevented) return;
    // Read mode first: some browsers choose delta units when this property is accessed.
    const mode = event.deltaMode;
    const delta = event.deltaY;
    const box = svg.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const factor = wheelZoomFactor(mode, delta, box.height);
    if (factor === null) return;
    const anchor = {
      x: Math.max(0, Math.min(1, (event.clientX - box.left) / box.width)),
      y: Math.max(0, Math.min(1, (event.clientY - box.top) / box.height)),
    };
    event.preventDefault();
    event.stopPropagation();
    onExplore();
    updateViewport((current) => zoomCanvasAt(current, factor, anchor));
  };
  svg.addEventListener("wheel", wheel, { passive: false });
  return () => svg.removeEventListener("wheel", wheel);
}

export function useCanvasWheelZoom(
  svgRef: RefObject<SVGSVGElement | null>,
  onExplore: () => void,
  setView: Dispatch<SetStateAction<CanvasViewport>>,
) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    return attachCanvasWheelZoom(svg, onExplore, setView);
  }, [svgRef, onExplore, setView]);
}
