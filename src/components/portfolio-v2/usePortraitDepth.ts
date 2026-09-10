import { useEffect, useRef } from "react";

type PointerSample = {
  x: number;
  y: number;
};

export function usePortraitDepth() {
  const frameRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef(0);
  const bounds = useRef<DOMRect | null>(null);
  const sample = useRef<PointerSample>({ x: 0, y: 0 });

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;
    let returnTimer = 0;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const eligible = () => finePointer.matches && !reducedMotion.matches;

    const writeTransform = () => {
      animationFrame.current = 0;
      const rect = bounds.current;
      if (!rect || !eligible()) return;

      const normalizedX = Math.max(
        -1,
        Math.min(1, ((sample.current.x - rect.left) / rect.width) * 2 - 1),
      );
      const normalizedY = Math.max(
        -1,
        Math.min(1, ((sample.current.y - rect.top) / rect.height) * 2 - 1),
      );
      const translateX = normalizedX * 4;
      const translateY = normalizedY * 4;
      const rotateY = normalizedX * 1.25;
      const rotateX = normalizedY * -1.25;

      element.style.transform = `perspective(900px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const schedule = (event: PointerEvent) => {
      if (!eligible()) return;
      sample.current = { x: event.clientX, y: event.clientY };
      if (!animationFrame.current) {
        animationFrame.current = window.requestAnimationFrame(writeTransform);
      }
    };

    const enter = (event: PointerEvent) => {
      if (!eligible()) return;
      if (returnTimer) window.clearTimeout(returnTimer);
      bounds.current = element.getBoundingClientRect();
      element.dataset["depthActive"] = "true";
      element.style.willChange = "transform";
      schedule(event);
    };

    const returnToNeutral = () => {
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = 0;
      }
      bounds.current = null;
      element.dataset["depthActive"] = "false";
      element.style.transform = "perspective(900px) translate3d(0, 0, 0) rotateX(0) rotateY(0)";
      returnTimer = window.setTimeout(() => {
        if (element.dataset["depthActive"] !== "true") element.style.willChange = "auto";
      }, 360);
    };

    const handlePreferenceChange = () => {
      if (!eligible()) returnToNeutral();
    };

    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", schedule);
    element.addEventListener("pointerleave", returnToNeutral);
    window.addEventListener("blur", returnToNeutral);
    window.addEventListener("resize", returnToNeutral);
    finePointer.addEventListener("change", handlePreferenceChange);
    reducedMotion.addEventListener("change", handlePreferenceChange);

    return () => {
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", schedule);
      element.removeEventListener("pointerleave", returnToNeutral);
      window.removeEventListener("blur", returnToNeutral);
      window.removeEventListener("resize", returnToNeutral);
      finePointer.removeEventListener("change", handlePreferenceChange);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      if (animationFrame.current) window.cancelAnimationFrame(animationFrame.current);
      if (returnTimer) window.clearTimeout(returnTimer);
    };
  }, []);

  return frameRef;
}
