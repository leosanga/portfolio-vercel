import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type PortfolioTheme = "dark" | "light";
type ThemeOrigin = { x: number; y: number };
type ThemeTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};
type ThemeDocument = Document & { startViewTransition?: (update: () => void) => ThemeTransition };
const TRANSITION_ATTRIBUTE = "data-pv2-theme-transition";
const TRANSITION_PROPERTIES = ["--pv2-theme-x", "--pv2-theme-y", "--pv2-theme-radius"];
const RADIUS_CLEARANCE = 2;

export const PORTFOLIO_THEME_STORAGE_KEY = "leo-portfolio-theme";
export const PORTFOLIO_DEFAULT_THEME: PortfolioTheme = "light";

export const PORTFOLIO_THEME_BOOTSTRAP_SCRIPT = `(() => {
  try {
    const stored = window.localStorage.getItem("${PORTFOLIO_THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : "${PORTFOLIO_DEFAULT_THEME}";
    document.documentElement.dataset.pv2Theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = "${PORTFOLIO_DEFAULT_THEME}";
    document.documentElement.dataset.pv2Theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
})();`;

function getStoredTheme(): PortfolioTheme | null {
  try {
    const stored = window.localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: PortfolioTheme) {
  document.documentElement.dataset["pv2Theme"] = theme;
  document.documentElement.style.colorScheme = theme;
}

export function usePortfolioThemeV2() {
  const [theme, setTheme] = useState<PortfolioTheme | null>(null);
  const owner = useId();
  const mounted = useRef(false);
  const generation = useRef(0);
  const latestIntent = useRef<PortfolioTheme | null>(null);
  const transitionRef = useRef<ThemeTransition | null>(null);

  const clearOwnedStyles = useCallback(() => {
    const root = document.documentElement;
    if (root.getAttribute(TRANSITION_ATTRIBUTE) !== owner) return;
    root.removeAttribute(TRANSITION_ATTRIBUTE);
    TRANSITION_PROPERTIES.forEach((property) => root.style.removeProperty(property));
  }, [owner]);
  const cancelVisual = useCallback(() => {
    generation.current += 1;
    const previous = transitionRef.current;
    transitionRef.current = null;
    try {
      previous?.skipTransition();
    } catch {
      // A finished visual may no longer be skippable. Latest intent remains authoritative.
    }
    clearOwnedStyles();
  }, [clearOwnedStyles]);

  useEffect(() => {
    mounted.current = true;
    const resolvedTheme = getStoredTheme() ?? PORTFOLIO_DEFAULT_THEME;
    latestIntent.current = resolvedTheme;
    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    const cancelIfIneligible = () => {
      if (!transitionRef.current || (!document.hidden && !reduced.matches && !forced.matches))
        return;
      cancelVisual();
      if (mounted.current && latestIntent.current) {
        applyTheme(latestIntent.current);
        setTheme(latestIntent.current);
      }
    };
    const syncRestoredPreference = (synchronous: boolean) => {
      if (!mounted.current) return;
      const storedTheme = getStoredTheme();
      if (!storedTheme) return;
      latestIntent.current = storedTheme;
      cancelVisual();
      const update = () => {
        if (!mounted.current) return;
        applyTheme(storedTheme);
        setTheme(storedTheme);
      };
      if (synchronous) {
        try {
          flushSync(update);
        } catch {
          update();
        }
      } else update();
    };
    const onPageReveal = () => syncRestoredPreference(true);
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) syncRestoredPreference(false);
    };
    window.addEventListener("pagereveal", onPageReveal);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", cancelIfIneligible);
    reduced.addEventListener("change", cancelIfIneligible);
    forced.addEventListener("change", cancelIfIneligible);

    return () => {
      mounted.current = false;
      cancelVisual();
      window.removeEventListener("pagereveal", onPageReveal);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", cancelIfIneligible);
      reduced.removeEventListener("change", cancelIfIneligible);
      forced.removeEventListener("change", cancelIfIneligible);
      delete document.documentElement.dataset["pv2Theme"];
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, [cancelVisual]);

  const toggleTheme = useCallback(
    (origin?: ThemeOrigin) => {
      if (!mounted.current) return;
      const resolvedTheme = latestIntent.current ?? getStoredTheme() ?? PORTFOLIO_DEFAULT_THEME;
      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
      latestIntent.current = nextTheme;

      try {
        window.localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, nextTheme);
      } catch {
        // The preference still applies for this visit when storage is unavailable.
      }

      const interrupted = transitionRef.current !== null;
      cancelVisual();
      const intent = generation.current;
      let committed = false;
      const commit = (synchronous = false) => {
        if (committed || !mounted.current || intent !== generation.current) return;
        const update = () => {
          applyTheme(nextTheme);
          setTheme(nextTheme);
        };
        if (synchronous) flushSync(update);
        else update();
        committed = true;
      };
      const root = document.documentElement;
      const nativeDocument = document as ThemeDocument;
      const eligible =
        !interrupted &&
        typeof nativeDocument.startViewTransition === "function" &&
        !document.hidden &&
        "CSS" in window &&
        CSS.supports("clip-path", "circle(1px at 0px 0px)") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !window.matchMedia("(forced-colors: active)").matches &&
        !root.hasAttribute(TRANSITION_ATTRIBUTE) &&
        !root.hasAttribute("data-pc-canvas-transition") &&
        !document.querySelector("[data-pv2-case-title-owner]");
      if (!eligible) {
        commit();
        return;
      }
      const x = Math.min(
        window.innerWidth,
        Math.max(0, Number.isFinite(origin?.x) ? origin!.x : window.innerWidth / 2),
      );
      const y = Math.min(
        window.innerHeight,
        Math.max(0, Number.isFinite(origin?.y) ? origin!.y : window.innerHeight / 2),
      );
      const radius =
        Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) +
        RADIUS_CLEARANCE;
      root.setAttribute(TRANSITION_ATTRIBUTE, owner);
      root.style.setProperty("--pv2-theme-x", `${x}px`);
      root.style.setProperty("--pv2-theme-y", `${y}px`);
      root.style.setProperty("--pv2-theme-radius", `${radius}px`);
      const finish = () => {
        if (!mounted.current || intent !== generation.current) return;
        transitionRef.current = null;
        clearOwnedStyles();
      };
      try {
        const transition = nativeDocument.startViewTransition!.call(document, () => commit(true));
        transitionRef.current = transition;
        void transition.ready.catch(() => {
          commit();
        });
        void transition.finished.then(finish, () => {
          commit();
          finish();
        });
      } catch {
        commit();
        finish();
      }
    },
    [cancelVisual, clearOwnedStyles, owner],
  );

  return { theme, toggleTheme };
}
