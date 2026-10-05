import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 1100;
const HEADER_GAP = 16;
const LABEL_CLEARANCE = 12;
const MIN_BOTTOM_CLEARANCE = 88;
const DOCK_GAP = 32;
const PIN_TOLERANCE = 1;

type StackState = {
  ready: boolean;
  enhanced: boolean;
  staticProofs: boolean;
  owner: number;
  coveredPrefix: number;
  top: number;
  edgeStep: number;
  holds: number[];
};
const INITIAL_STATE: StackState = {
  ready: false,
  enhanced: false,
  staticProofs: true,
  owner: -1,
  coveredPrefix: 0,
  top: 0,
  edgeStep: 0,
  holds: [],
};

function pinnedForeground(rects: DOMRect[], top: number, step: number) {
  let foreground = -1;
  rects.forEach((rect, index) => {
    if (rect.top <= top + index * step + PIN_TOLERANCE) {
      foreground = index;
    }
  });
  return foreground;
}

function foregroundOwner(rects: DOMRect[], top: number, bottom: number, step: number) {
  let owner = pinnedForeground(rects, top, step);
  if (owner < 0) owner = 0;
  const current = rects[owner];
  if (!current || current.bottom <= top || current.top >= bottom) return -1;
  const incoming = rects[owner + 1];
  if (
    incoming &&
    incoming.top < current.bottom &&
    incoming.top > top + (owner + 1) * step + PIN_TOLERANCE
  )
    return -1;
  return owner;
}

function correctFocus(root: HTMLElement, top: number, clearance: number) {
  const focused = document.activeElement;
  if (!(focused instanceof HTMLElement) || !root.contains(focused)) return;
  const rect = focused.getBoundingClientRect();
  const bottom = window.innerHeight - clearance;
  const delta = rect.top < top ? rect.top - top : rect.bottom > bottom ? rect.bottom - bottom : 0;
  if (delta) window.scrollBy({ top: delta, behavior: "instant" });
}

export function useCompactCaseStack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const slots = [...root.querySelectorAll<HTMLElement>(".pv2-case-stack__slot")];
    const header = document.querySelector<HTMLElement>(".pv2-nav");
    const dock = document.querySelector<HTMLElement>(".pv2-utility-dock");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    const supported =
      "CSS" in window && CSS.supports("position", "sticky") && "ResizeObserver" in window;
    let fontsReady = !document.fonts;
    let disposed = false;
    let keyboardFocus = false;
    let correctionPending = false;
    let appliedEnhanced = false;
    let appliedStep = 0;
    let appliedHolds: number[] = [];
    const depths: (string | undefined)[] = slots.map(() => undefined);
    let frame = 0;
    let focusFrame = 0;

    const measure = () => {
      frame = 0;
      if (disposed) return;
      const top = (header?.getBoundingClientRect().height ?? 0) + HEADER_GAP;
      const clearance = Math.max(
        MIN_BOTTOM_CLEARANCE,
        (dock?.getBoundingClientRect().height ?? 0) + DOCK_GAP,
      );
      const rects = slots.map((slot) => slot.getBoundingClientRect());
      const bands = slots.map((slot) => {
        const article = slot.querySelector<HTMLElement>(":scope > article");
        const label = article?.querySelector<HTMLElement>(".pv2-project-index");
        if (!article || !label || label.offsetParent !== article) return NaN;
        return Math.ceil(
          label.offsetTop + label.offsetHeight + article.clientTop + LABEL_CLEARANCE,
        );
      });
      const validBands =
        bands.length > 0 && bands.every((band) => Number.isFinite(band) && band > 0);
      const edgeStep = validBands ? Math.max(...bands) : 0;
      const largest = Math.max(...rects.map((rect) => rect.height));
      const staticProofs = reduced.matches || forced.matches;
      const enhanced =
        supported &&
        fontsReady &&
        validBands &&
        rects.every((rect) => Number.isFinite(rect.height) && rect.height > edgeStep) &&
        !staticProofs &&
        !keyboardFocus &&
        window.innerWidth >= MIN_WIDTH &&
        largest + top + (slots.length - 1) * edgeStep + clearance <= window.innerHeight;
      const holds = rects.map((rect, index) =>
        enhanced
          ? Math.ceil(
              Math.max(0, window.innerHeight - (top + index * edgeStep + rect.height)) +
                Math.min(480, Math.max(240, window.innerHeight * 0.35)),
            )
          : 0,
      );
      const geometryChanged =
        enhanced !== appliedEnhanced ||
        edgeStep !== appliedStep ||
        holds.length !== appliedHolds.length ||
        holds.some((hold, index) => hold !== appliedHolds[index]);
      const owner =
        enhanced && !geometryChanged && !document.hidden
          ? foregroundOwner(rects, top, window.innerHeight - clearance, edgeStep)
          : -1;
      const coveredPrefix =
        enhanced && !geometryChanged ? Math.max(0, pinnedForeground(rects, top, edgeStep)) : 0;
      const pairProgress = rects
        .slice(0, -1)
        .map((rect, index) =>
          Math.min(
            1,
            Math.max(0, (rect.bottom - rects[index + 1]!.top) / (rect.height - edgeStep)),
          ),
        );
      const nextDepths = slots.map((_, index) =>
        enhanced && !geometryChanged
          ? Math.min(
              slots.length - index - 1,
              pairProgress.slice(index).reduce((sum, value) => sum + value, 0),
            ).toFixed(3)
          : undefined,
      );
      slots.forEach((slot, index) => {
        if (depths[index] === nextDepths[index]) return;
        const depth = nextDepths[index];
        if (depth === undefined) slot.style.removeProperty("--pv2-case-stack-depth");
        else slot.style.setProperty("--pv2-case-stack-depth", depth);
        depths[index] = depth;
      });
      const next = {
        ready: fontsReady,
        enhanced,
        staticProofs,
        owner,
        coveredPrefix,
        top,
        edgeStep,
        holds,
      };
      setState((previous) =>
        Object.keys(next).every((key) =>
          key === "holds"
            ? previous.holds.length === next.holds.length &&
              previous.holds.every((hold, index) => hold === next.holds[index])
            : previous[key as keyof StackState] === next[key as keyof StackState],
        )
          ? previous
          : next,
      );
      if (geometryChanged) {
        appliedEnhanced = enhanced;
        appliedStep = edgeStep;
        appliedHolds = holds;
        schedule();
      }
      if (correctionPending) {
        correctionPending = false;
        window.cancelAnimationFrame(focusFrame);
        focusFrame = window.requestAnimationFrame(() => {
          if (!disposed) correctFocus(root, top, clearance);
        });
      }
    };
    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(measure);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
      keyboardFocus = true;
      correctionPending = true;
      schedule();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
      keyboardFocus = false;
      schedule();
    };
    const observer = supported ? new ResizeObserver(schedule) : null;
    [root, ...slots, header, dock].forEach((element) => {
      if (element) observer?.observe(element);
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    reduced.addEventListener("change", schedule);
    forced.addEventListener("change", schedule);
    document.fonts?.addEventListener("loadingdone", schedule);
    void document.fonts?.ready.then(() => {
      if (!disposed) {
        fontsReady = true;
        schedule();
      }
    });
    schedule();
    return () => {
      disposed = true;
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(focusFrame);
      slots.forEach((slot) => slot.style.removeProperty("--pv2-case-stack-depth"));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      reduced.removeEventListener("change", schedule);
      forced.removeEventListener("change", schedule);
      document.fonts?.removeEventListener("loadingdone", schedule);
    };
  }, []);
  return { rootRef, state };
}
