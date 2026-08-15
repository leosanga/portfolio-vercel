import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const center = window.innerHeight / 2;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= center && rect.bottom >= center) {
          current = section.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids.join(",")]);

  return active;
}
