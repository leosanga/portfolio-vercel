import { useCallback, useEffect, useState } from "react";

export type PortfolioTheme = "dark" | "light";

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

  useEffect(() => {
    const resolvedTheme = getStoredTheme() ?? PORTFOLIO_DEFAULT_THEME;
    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);

    return () => {
      delete document.documentElement.dataset["pv2Theme"];
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const resolvedTheme = currentTheme ?? getStoredTheme() ?? PORTFOLIO_DEFAULT_THEME;
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
