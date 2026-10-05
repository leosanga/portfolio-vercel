import { useEffect, useRef } from "react";

const IN_VIEW_THRESHOLD = 0.2;
const TIMING = {
  sequence: { duration: 1200, spacing: 1000, bracketDelay: 0 },
  compact: { duration: 800, spacing: 800, bracketDelay: 120 },
  expanded: { duration: 1300, spacing: 1300, bracketDelay: 200 },
} as const;
type ExplanationVariant = keyof typeof TIMING;

/** Attention cues only. Meaningful text stays visible before, during and after playback. */
export function useExplanationOnceV2<T extends HTMLElement = HTMLElement>(
  variant: ExplanationVariant = "sequence",
) {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    let consumed = false;
    let visible = false;
    let animations: Animation[] = [];

    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };
    const update = () => {
      if (!visible || document.hidden || reduced.matches || forced.matches) {
        cancel();
        return;
      }
      if (consumed) return;
      consumed = true;
      const timing = TIMING[variant];
      const easing = getComputedStyle(root).getPropertyValue("--ease-out").trim();
      animations = Array.from(root.querySelectorAll<HTMLElement>("[data-identity-cue]")).map(
        (cue, index) => {
          const phase = Number(cue.dataset["identityPhase"] ?? index);
          const bracket = cue.hasAttribute("data-identity-bracket");
          const frames = bracket
            ? [
                { opacity: 0, transform: "scaleX(0.25)" },
                { opacity: 0.85, transform: "scaleX(1)", offset: 0.55 },
                { opacity: 0, transform: "scaleX(1)" },
              ]
            : [{ opacity: 0 }, { opacity: 0.55, offset: 0.35 }, { opacity: 0 }];
          return cue.animate(frames, {
            duration: timing.duration - (bracket ? timing.bracketDelay : 0),
            delay: phase * timing.spacing + (bracket ? timing.bracketDelay : 0),
            easing,
          });
        },
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting && entry.intersectionRatio >= IN_VIEW_THRESHOLD;
        update();
      },
      { threshold: IN_VIEW_THRESHOLD },
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    forced.addEventListener("change", update);
    return () => {
      cancel();
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      forced.removeEventListener("change", update);
    };
  }, [variant]);

  return rootRef;
}
