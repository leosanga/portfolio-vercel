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

      // Bottom-of-page fallback. The last section (contact) is short and sits
      // above the footer, so the page stops scrolling before its box can reach
      // the viewport centre — the centre-line test above can therefore never
      // elect it, and clicking its nav link lands here too. When scrolled to the
      // bottom, force the last section active. This is additive: the centre-line
      // loop is left exactly as-is, per the algorithm note in CLAUDE.md.
      const last = sections[sections.length - 1];
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && last) {
        current = last.id;
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
