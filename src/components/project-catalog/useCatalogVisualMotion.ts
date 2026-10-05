import { useEffect, useRef, useState } from "react";

/** Non-canvas figures loop only while their open presentation is visible. */
export function useCatalogVisualMotion(enabled: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    const update = () => {
      setDocumentVisible(!document.hidden);
      setMotionAllowed(!reduced.matches && !forced.matches);
    };
    update();
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    forced.addEventListener("change", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      forced.removeEventListener("change", update);
    };
  }, []);

  return { rootRef, playing: enabled && inView && documentVisible && motionAllowed };
}
