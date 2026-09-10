import { useCallback, useEffect, useState } from "react";

export type PortfolioTheme = "dark" | "light";

export const PORTFOLIO_THEME_STORAGE_KEY = "leo-portfolio-theme";

export const PORTFOLIO_THEME_BOOTSTRAP_SCRIPT = `(() => {
  try {
    const stored = window.localStorage.getItem("${PORTFOLIO_THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.dataset.pv2Theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    const theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
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

function getSystemTheme(): PortfolioTheme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: PortfolioTheme) {
  document.documentElement.dataset["pv2Theme"] = theme;
  document.documentElement.style.colorScheme = theme;
}

export function usePortfolioThemeV2() {
  const [theme, setTheme] = useState<PortfolioTheme | null>(null);

  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: light)");
    const syncTheme = () => {
      const resolvedTheme = getStoredTheme() ?? getSystemTheme();
      applyTheme(resolvedTheme);
      setTheme(resolvedTheme);
    };

    syncTheme();
    systemPreference.addEventListener("change", syncTheme);

    return () => {
      systemPreference.removeEventListener("change", syncTheme);
      delete document.documentElement.dataset["pv2Theme"];
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const resolvedTheme = currentTheme ?? getStoredTheme() ?? getSystemTheme();
      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

      try {
        window.localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, nextTheme);
      } catch {
        // The preference still applies for this visit when storage is unavailable.
      }

      applyTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
}
