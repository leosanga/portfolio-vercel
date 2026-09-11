import { useEffect } from "react";

export function usePortfolioV2Motion() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-pv2-observe]"));
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
    return () => observer.disconnect();
  }, []);
}
