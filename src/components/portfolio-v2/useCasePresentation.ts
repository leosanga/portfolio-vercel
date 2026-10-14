import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CASE_STACK_WIDTH_QUERY, measureCaseStackFit } from "./case-stack-fit";

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
  const width = window.matchMedia(CASE_STACK_WIDTH_QUERY);
  return (
    width.matches &&
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
      const header = document.querySelector<HTMLElement>(".pv2-nav");
      const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
      const geometry = measureCaseStackFit(root, header, dock, window.innerHeight);
      if (!geometry || geometry.fits) {
        setState((previous) => ({ ...previous, phase: "settled", mode: "original" }));
      } else {
        setState((previous) => ({ ...previous, phase: "measuring-compact", mode: "compact" }));
      }
      return;
    }

    if (state.phase === "measuring-compact") {
      const header = document.querySelector<HTMLElement>(".pv2-nav");
      const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
      const geometry = canTrialCompact()
        ? measureCaseStackFit(root, header, dock, window.innerHeight)
        : null;
      setState((previous) => ({
        ...previous,
        phase: "settled",
        mode: geometry?.fits ? "compact" : "original",
      }));
    }
  }, [state.phase, state.revision]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const header = document.querySelector<HTMLElement>(".pv2-nav");
    const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    const width = window.matchMedia(CASE_STACK_WIDTH_QUERY);
    if (
      typeof reduced.addEventListener !== "function" ||
      typeof forced.addEventListener !== "function" ||
      typeof width.addEventListener !== "function"
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
    width.addEventListener("change", measureAgain);
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
      width.removeEventListener("change", measureAgain);
      reduced.removeEventListener("change", measureAgain);
      forced.removeEventListener("change", measureAgain);
      document.fonts?.removeEventListener?.("loadingdone", measureAgain);
    };
  }, []);

  return { rootRef, mode: state.mode, settled: state.phase === "settled" } as const;
}
