import { useEffect, useRef } from "react";

const IN_VIEW_THRESHOLD = 0.2;
const REST_DURATION = 3000;

/** Repeated inspection emphasis over a complete, unchanged static model. */
export function useIdentityExplanationLoopV2<T extends HTMLElement = HTMLElement>(
  compact: boolean,
  enabled = true,
  playback: "loop" | "once" = "loop",
) {
  const rootRef = useRef<T>(null);
  const onceStarted = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    const phone = window.matchMedia("(width < 768px)");
    const phaseDuration = compact ? 800 : 1300;
    const cycleDuration = phaseDuration * 2 + REST_DURATION;
    let visible = false;
    let animations: Animation[] = [];

    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };
    const update = () => {
      if (!enabled || !visible || document.hidden || reduced.matches || forced.matches) {
        cancel();
        return;
      }
      if (playback === "once" && onceStarted.current) return;
      if (animations.length) return;

      const easing =
        getComputedStyle(root).getPropertyValue("--ease-out").trim() ||
        "cubic-bezier(0.23, 1, 0.32, 1)";
      animations = Array.from(root.querySelectorAll<SVGElement>("[data-identity-model-cue]"))
        .filter((cue) => cue.getBoundingClientRect().width > 0)
        .map((cue) => {
          const start = Number(cue.dataset["identityPhase"]) * phaseDuration;
          const frames: Keyframe[] = [
            { opacity: 0, offset: 0, easing: start ? "linear" : easing },
            ...(start ? [{ opacity: 0, offset: start / cycleDuration, easing }] : []),
            {
              opacity: 0.9,
              offset: (start + phaseDuration * 0.18) / cycleDuration,
              easing: "linear",
            },
            { opacity: 0.9, offset: (start + phaseDuration * 0.65) / cycleDuration, easing },
            { opacity: 0, offset: (start + phaseDuration) / cycleDuration, easing: "linear" },
            { opacity: 0, offset: 1 },
          ];
          return cue.animate(frames, {
            duration: cycleDuration,
            iterations: playback === "once" ? 1 : Infinity,
            easing: "linear",
          });
        });
      if (playback === "once" && animations.length) onceStarted.current = true;
    };
    const drawingChanged = () => {
      cancel();
      if (playback === "loop") update();
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
    phone.addEventListener("change", drawingChanged);

    return () => {
      cancel();
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      forced.removeEventListener("change", update);
      phone.removeEventListener("change", drawingChanged);
    };
  }, [compact, enabled, playback]);

  return rootRef;
}
