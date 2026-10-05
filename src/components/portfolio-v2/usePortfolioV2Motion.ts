import { useEffect } from "react";

export function usePortfolioV2Motion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-pv2-observe]"));
    const loopSurfaces = Array.from(
      document.querySelectorAll<HTMLElement>(".pv2-projects-context, .pv2-approach .pv2-frame"),
    );
    loopSurfaces.forEach((element) => {
      element.dataset["pv2MotionActive"] = "false";
    });
    if (!elements.length || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset["pv2Visible"] = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset["pv2Visible"] = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -18%", threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    const intersecting = new Set<HTMLElement>();
    const updateLoops = () => {
      loopSurfaces.forEach((element) => {
        element.dataset["pv2MotionActive"] = String(intersecting.has(element) && !document.hidden);
      });
    };
    const loopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) intersecting.add(element);
          else intersecting.delete(element);
        });
        updateLoops();
      },
      { threshold: 0 },
    );
    loopSurfaces.forEach((element) => loopObserver.observe(element));
    document.addEventListener("visibilitychange", updateLoops);
    return () => {
      observer.disconnect();
      loopObserver.disconnect();
      document.removeEventListener("visibilitychange", updateLoops);
      loopSurfaces.forEach((element) => {
        element.dataset["pv2MotionActive"] = "false";
      });
    };
  }, []);
}
