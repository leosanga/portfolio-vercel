import { useEffect, useRef, useState } from "react";

import { NAVIGATION } from "@/content/portfolio-v2/content";
import type { SectionId } from "@/content/portfolio-v2/types";

import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";
import { SignalMarkV2 } from "./SignalMarkV2";

type PortfolioHeaderV2Props =
  | { context: "home"; activeSection: SectionId | ""; scrolled: boolean }
  | { context: "case-study" | "catalog" };

const SCROLLED_THRESHOLD = 24;

function useInteriorHeaderScrolled(enabled: boolean) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLLED_THRESHOLD);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return scrolled;
}

function useHeaderNavigation(activeId: string) {
  const actionsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const target = linkRefs.current[activeId || "projects"];
    if (!indicator || !target) return;
    const position = () => {
      indicator.style.setProperty("--pv2-rule-x", `${target.offsetLeft}px`);
      indicator.style.setProperty("--pv2-rule-width", `${target.offsetWidth}`);
      indicator.dataset["visible"] = activeId ? "true" : "false";
    };
    position();
    const observer = new ResizeObserver(position);
    if (target.parentElement) observer.observe(target.parentElement);
    return () => observer.disconnect();
  }, [activeId]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !actionsRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return { actionsRef, menuButtonRef, indicatorRef, linkRefs, menuOpen, setMenuOpen };
}

// Local review candidate. Visual acceptance is recorded in REDESIGN-CURRENT-STATE.md.
export function PortfolioHeaderV2(props: PortfolioHeaderV2Props) {
  const home = props.context === "home";
  const interiorScrolled = useInteriorHeaderScrolled(!home);
  const scrolled = home ? props.scrolled : interiorScrolled;
  const activeId = home ? props.activeSection : props.context === "catalog" ? "catalog" : "";
  const { actionsRef, menuButtonRef, indicatorRef, linkRefs, menuOpen, setMenuOpen } =
    useHeaderNavigation(activeId);

  return (
    <header className="pv2-nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="pv2-frame pv2-nav__inner">
        <a
          className="pv2-nav__identity"
          href={home ? "#top" : "/"}
          aria-label={home ? "Leo Sanga, top of page" : "Leo Sanga, home"}
        >
          <SignalMarkV2 animated={home} />
          <span>Leo Sanga</span>
        </a>
        <div
          className="pv2-nav__actions"
          data-menu-open={menuOpen ? "true" : "false"}
          ref={actionsRef}
          onKeyDown={(event) => {
            if (event.key === "Escape" && menuOpen) {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          <button
            className="pv2-nav__menu-trigger"
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="pv2-primary-navigation"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span>Menu</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" focusable="false">
              <path d="M3 6h14M3 14h14" />
            </svg>
          </button>
          <nav
            className="pv2-nav__panel"
            id="pv2-primary-navigation"
            aria-label="Primary navigation"
          >
            <div className="pv2-nav__links">
              {NAVIGATION.map((item) => (
                <a
                  href={item.kind === "page" ? item.href : `${home ? "" : "/"}#${item.id}`}
                  key={item.id}
                  ref={(element) => {
                    linkRefs.current[item.id] = element;
                  }}
                  aria-current={
                    activeId === item.id ? (item.kind === "page" ? "page" : "location") : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <span className="pv2-nav__rule" ref={indicatorRef} aria-hidden="true">
                <span />
              </span>
            </div>
          </nav>
          <PrimaryCallLinkV2 compact className="pv2-nav__call" />
        </div>
      </div>
    </header>
  );
}
