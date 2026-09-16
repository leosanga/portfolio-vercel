import { Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import { CONTACT } from "@/content/portfolio-v2/content";

import { SignalMarkV2 } from "./SignalMarkV2";
import { usePortfolioThemeV2 } from "./usePortfolioThemeV2";

const DOCK_MAGNIFICATION_DISTANCE = 112;
const DOCK_MAX_SCALE = 1.14;

type DockControlProps = {
  children: ReactNode;
  label: string;
  surfaceRef: (element: HTMLSpanElement | null) => void;
} & (
  | { href: string; external?: boolean; onClick?: never }
  | { href?: never; external?: never; onClick: () => void }
);

function DockControl({ children, label, surfaceRef, ...action }: DockControlProps) {
  const content = (
    <>
      <span className="pv2-utility-dock__surface" ref={surfaceRef} aria-hidden="true">
        {children}
      </span>
      <span className="pv2-utility-dock__tooltip" aria-hidden="true">
        {label}
      </span>
    </>
  );

  if (action.href) {
    return (
      <a
        className="pv2-utility-dock__control"
        href={action.href}
        aria-label={label}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener noreferrer" : undefined}
      >
        {content}
        {action.external ? <span className="pv2-visually-hidden">, opens in a new tab</span> : null}
      </a>
    );
  }

  return (
    <button
      className="pv2-utility-dock__control"
      type="button"
      aria-label={label}
      onClick={action.onClick}
    >
      {content}
    </button>
  );
}

export function PortfolioUtilityDockV2({ homeHref = "#top" }: { homeHref?: string } = {}) {
  const surfaceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animationFrameRef = useRef(0);
  const magnificationEnabledRef = useRef(false);
  const { theme, toggleTheme } = usePortfolioThemeV2();
  const themeLabel =
    theme === null ? "Change color theme" : theme === "dark" ? "Use light theme" : "Use dark theme";

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => {
      magnificationEnabledRef.current = finePointer.matches && !reducedMotion.matches;
      if (!magnificationEnabledRef.current) {
        surfaceRefs.current.forEach((surface) => surface?.style.removeProperty("transform"));
      }
    };

    updateCapability();
    finePointer.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);

    return () => {
      finePointer.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
      window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const resetSurfaces = () => {
    window.cancelAnimationFrame(animationFrameRef.current);
    surfaceRefs.current.forEach((surface) => surface?.style.removeProperty("transform"));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!magnificationEnabledRef.current) return;

    window.cancelAnimationFrame(animationFrameRef.current);
    const pointerX = event.clientX;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      surfaceRefs.current.forEach((surface) => {
        if (!surface) return;
        const rect = surface.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const proximity = Math.max(0, 1 - distance / DOCK_MAGNIFICATION_DISTANCE);
        const scale = 1 + proximity * (DOCK_MAX_SCALE - 1);
        surface.style.transform = `scale(${scale.toFixed(3)})`;
      });
    });
  };

  const setSurfaceRef = (index: number) => (element: HTMLSpanElement | null) => {
    surfaceRefs.current[index] = element;
  };

  return (
    <div className="pv2-utility-dock">
      <nav
        className="pv2-utility-dock__rail"
        aria-label="Utility navigation"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetSurfaces}
      >
        <DockControl href={homeHref} label="Home" surfaceRef={setSurfaceRef(0)}>
          <SignalMarkV2 />
        </DockControl>
        <DockControl href={`mailto:${CONTACT.email}`} label="Email" surfaceRef={setSurfaceRef(1)}>
          <Mail />
        </DockControl>
        <DockControl
          href={CONTACT.linkedinUrl}
          external
          label="LinkedIn"
          surfaceRef={setSurfaceRef(2)}
        >
          <Linkedin />
        </DockControl>
        <span className="pv2-utility-dock__divider" aria-hidden="true" />
        <DockControl label={themeLabel} onClick={toggleTheme} surfaceRef={setSurfaceRef(3)}>
          <span className="pv2-utility-dock__theme-icons">
            <Sun className="pv2-utility-dock__theme-icon pv2-utility-dock__theme-icon--sun" />
            <Moon className="pv2-utility-dock__theme-icon pv2-utility-dock__theme-icon--moon" />
          </span>
        </DockControl>
      </nav>
    </div>
  );
}
