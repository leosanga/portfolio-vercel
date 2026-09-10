import { useEffect, useState } from "react";

import type { SectionId } from "@/content/portfolio-v2/types";

export function useActiveSectionV2(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId | "">("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let next: SectionId | "" = "";

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= center && rect.bottom >= center) {
          next = id;
          break;
        }
      }

      setActive((current) => (current === next ? current : next));
      const nextScrolled = window.scrollY > 24;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return { active, scrolled };
}
