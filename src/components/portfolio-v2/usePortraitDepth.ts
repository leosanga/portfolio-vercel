import { useEffect, useRef } from "react";

type PointerSample = {
  x: number;
  y: number;
};

export function usePortraitDepth() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = frameRef.current;
    const grid = element?.closest<HTMLElement>(".pv2-hero__grid");
    const hero = grid?.closest(".pv2-hero");
    if (!element || !grid || !hero || !("IntersectionObserver" in window)) return;
    const desktop = window.matchMedia("(min-width: 1100px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const preferences = [desktop, finePointer, reducedMotion, forcedColors];
    let inView = false;
    let animationFrame = 0;
    let sample: PointerSample = { x: 0, y: 0 };

    const eligible = () =>
      desktop.matches &&
      finePointer.matches &&
      !reducedMotion.matches &&
      !forcedColors.matches &&
      !document.hidden &&
      inView;

    const writeTransform = () => {
      animationFrame = 0;
      if (!eligible()) return;
      // Measure the stable grid, never a depth-transformed child.
      const rect = grid.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normalizedX = Math.max(-1, Math.min(1, ((sample.x - rect.left) / rect.width) * 2 - 1));
      const normalizedY = Math.max(-1, Math.min(1, ((sample.y - rect.top) / rect.height) * 2 - 1));
      grid.style.setProperty("--pv2-depth-x", String(normalizedX));
      grid.style.setProperty("--pv2-depth-y", String(normalizedY));
      element.dataset["depthActive"] = "true";
      grid.dataset["depthActive"] = "true";
    };

    const schedule = (event: PointerEvent) => {
      if (!eligible() || event.pointerType === "touch") return;
      sample = { x: event.clientX, y: event.clientY };
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(writeTransform);
      }
    };

    const returnToNeutral = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      element.dataset["depthActive"] = "false";
      grid.dataset["depthActive"] = "false";
      grid.style.removeProperty("--pv2-depth-x");
      grid.style.removeProperty("--pv2-depth-y");
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      if (!inView) returnToNeutral();
    });
    observer.observe(hero);
    grid.addEventListener("pointerenter", schedule);
    grid.addEventListener("pointermove", schedule);
    grid.addEventListener("pointerleave", returnToNeutral);
    grid.addEventListener("pointercancel", returnToNeutral);
    window.addEventListener("blur", returnToNeutral);
    window.addEventListener("resize", returnToNeutral);
    document.addEventListener("visibilitychange", returnToNeutral);
    preferences.forEach((preference) => preference.addEventListener("change", returnToNeutral));

    return () => {
      observer.disconnect();
      grid.removeEventListener("pointerenter", schedule);
      grid.removeEventListener("pointermove", schedule);
      grid.removeEventListener("pointerleave", returnToNeutral);
      grid.removeEventListener("pointercancel", returnToNeutral);
      window.removeEventListener("blur", returnToNeutral);
      window.removeEventListener("resize", returnToNeutral);
      document.removeEventListener("visibilitychange", returnToNeutral);
      preferences.forEach((preference) =>
        preference.removeEventListener("change", returnToNeutral),
      );
      returnToNeutral();
    };
  }, []);

  return frameRef;
}
