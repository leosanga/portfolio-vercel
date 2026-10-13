import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const ROOT_ATTRIBUTE = "data-pv2-scroll-to-top";
const CLEANUP_MS = 1800;

/** Temporarily enhance the native fragment link without replacing its navigation. */
export function useSmoothBackToTop() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    if (typeof window.matchMedia !== "function" || typeof CSS === "undefined") return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    if (
      typeof reduced.addEventListener !== "function" ||
      typeof forced.addEventListener !== "function"
    )
      return;

    let timeout = 0;
    const clear = () => {
      window.clearTimeout(timeout);
      root.removeAttribute(ROOT_ATTRIBUTE);
    };
    const interrupt = () => {
      if (root.hasAttribute(ROOT_ATTRIBUTE)) {
        window.scrollTo({ top: window.scrollY, behavior: "instant" });
      }
      clear();
    };
    const activate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        reduced.matches ||
        forced.matches
      )
        return;
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[aria-label="Back to top"][href="#top"]');
      if (!link || !CSS.supports("scroll-behavior", "smooth")) return;
      clear();
      root.setAttribute(ROOT_ATTRIBUTE, "");
      timeout = window.setTimeout(clear, CLEANUP_MS);
    };
    const onPreferenceChange = () => {
      if (reduced.matches || forced.matches) interrupt();
    };

    document.addEventListener("click", activate, true);
    document.addEventListener("scrollend", clear);
    document.addEventListener("wheel", interrupt, { capture: true, passive: true });
    document.addEventListener("pointerdown", interrupt, true);
    document.addEventListener("keydown", interrupt, true);
    reduced.addEventListener("change", onPreferenceChange);
    forced.addEventListener("change", onPreferenceChange);

    return () => {
      interrupt();
      document.removeEventListener("click", activate, true);
      document.removeEventListener("scrollend", clear);
      document.removeEventListener("wheel", interrupt, true);
      document.removeEventListener("pointerdown", interrupt, true);
      document.removeEventListener("keydown", interrupt, true);
      reduced.removeEventListener("change", onPreferenceChange);
      forced.removeEventListener("change", onPreferenceChange);
    };
  }, [pathname]);
}
