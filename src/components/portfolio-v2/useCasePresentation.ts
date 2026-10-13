import { useEffect, useLayoutEffect, useRef, useState } from "react";

const MIN_COMPACT_WIDTH = 1440;
const HEADER_GAP = 16;
const LABEL_CLEARANCE = 12;
const MIN_BOTTOM_CLEARANCE = 88;
const DOCK_GAP = 32;

type PresentationMode = "original" | "compact";
type PresentationPhase = "measuring-original" | "measuring-compact" | "settled";
type PresentationState = {
  mode: PresentationMode;
  phase: PresentationPhase;
  revision: number;
};

const INITIAL_STATE: PresentationState = {
  mode: "original",
  phase: "measuring-original",
  revision: 0,
};

function canTrialCompact() {
  if (typeof window.matchMedia !== "function") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const forced = window.matchMedia("(forced-colors: active)");
  return (
    Number.isFinite(window.innerWidth) &&
    window.innerWidth >= MIN_COMPACT_WIDTH &&
    !reduced.matches &&
    !forced.matches &&
    typeof reduced.addEventListener === "function" &&
    typeof forced.addEventListener === "function" &&
    "CSS" in window &&
    CSS.supports("position", "sticky") &&
    "ResizeObserver" in window &&
    document.fonts?.status === "loaded"
  );
}

function presentationFits(root: HTMLElement) {
  const slots = [...root.querySelectorAll<HTMLElement>(".pv2-case-stack__slot")];
  const header = document.querySelector<HTMLElement>(".pv2-nav");
  const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
  const viewportHeight = window.innerHeight;
  if (!slots.length || !Number.isFinite(viewportHeight) || viewportHeight <= 0) return null;

  const top = (header?.getBoundingClientRect().height ?? 0) + HEADER_GAP;
  const clearance = Math.max(
    MIN_BOTTOM_CLEARANCE,
    (dock?.getBoundingClientRect().height ?? 0) + DOCK_GAP,
  );
  const rects = slots.map((slot) => slot.getBoundingClientRect());
  const bands = slots.map((slot) => {
    const article = slot.querySelector<HTMLElement>(":scope > article");
    const label = article?.querySelector<HTMLElement>(".pv2-project-index");
    if (!article || !label || label.offsetParent !== article) return Number.NaN;
    return Math.ceil(label.offsetTop + label.offsetHeight + article.clientTop + LABEL_CLEARANCE);
  });

  const valid =
    Number.isFinite(top) &&
    Number.isFinite(clearance) &&
    top >= 0 &&
    clearance > 0 &&
    bands.every((band) => Number.isFinite(band) && band > 0) &&
    rects.every(
      (rect) =>
        Number.isFinite(rect.width) &&
        rect.width > 0 &&
        Number.isFinite(rect.height) &&
        rect.height > 0,
    );
  if (!valid) return null;

  const edgeStep = Math.max(...bands);
  if (rects.some((rect) => rect.height <= edgeStep)) return null;
  const largest = Math.max(...rects.map((rect) => rect.height));
  return largest + top + (slots.length - 1) * edgeStep + clearance <= viewportHeight;
}

export function useCasePresentation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(INITIAL_STATE);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (state.phase === "measuring-original") {
      if (!canTrialCompact()) {
        setState((previous) => ({ ...previous, phase: "settled", mode: "original" }));
        return;
      }
      const fits = presentationFits(root);
      if (fits === null || fits) {
        setState((previous) => ({ ...previous, phase: "settled", mode: "original" }));
      } else {
        setState((previous) => ({ ...previous, phase: "measuring-compact", mode: "compact" }));
      }
      return;
    }

    if (state.phase === "measuring-compact") {
      const fits = canTrialCompact() ? presentationFits(root) : null;
      setState((previous) => ({
        ...previous,
        phase: "settled",
        mode: fits ? "compact" : "original",
      }));
    }
  }, [state.phase, state.revision]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const header = document.querySelector<HTMLElement>(".pv2-nav");
    const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    if (
      typeof reduced.addEventListener !== "function" ||
      typeof forced.addEventListener !== "function"
    )
      return;
    let disposed = false;
    let frame = 0;

    const measureAgain = () => {
      if (frame || disposed) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (disposed) return;
        setState((previous) => ({
          mode: "original",
          phase: "measuring-original",
          revision: previous.revision + 1,
        }));
      });
    };
    const observer = "ResizeObserver" in window ? new ResizeObserver(measureAgain) : null;
    if (header) observer?.observe(header);
    if (dock) observer?.observe(dock);

    window.addEventListener("resize", measureAgain, { passive: true });
    reduced.addEventListener("change", measureAgain);
    forced.addEventListener("change", measureAgain);
    document.fonts?.addEventListener?.("loadingdone", measureAgain);
    void document.fonts?.ready.then(() => {
      if (!disposed) measureAgain();
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureAgain);
      reduced.removeEventListener("change", measureAgain);
      forced.removeEventListener("change", measureAgain);
      document.fonts?.removeEventListener?.("loadingdone", measureAgain);
    };
  }, []);

  return { rootRef, mode: state.mode, settled: state.phase === "settled" } as const;
}
