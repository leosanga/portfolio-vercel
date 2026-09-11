import { useEffect, useRef, useState } from "react";

import { NAVIGATION } from "@/content/portfolio-v2/content";

import { PrimaryCallLinkV2 } from "./PrimaryCallLinkV2";
import { SignalMarkV2 } from "./SignalMarkV2";
import { useActiveSectionV2 } from "./useActiveSectionV2";

const SECTION_IDS = NAVIGATION.map((item) => item.id);

export function PortfolioNavV2() {
  const actionsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, scrolled } = useActiveSectionV2(SECTION_IDS);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const targetId = active || SECTION_IDS[0];
    const target = targetId ? linkRefs.current[targetId] : null;
    if (!indicator || !target) return;

    const position = () => {
      indicator.style.setProperty("--pv2-rule-x", `${target.offsetLeft}px`);
      indicator.style.setProperty("--pv2-rule-width", `${target.offsetWidth}`);
      indicator.dataset["visible"] = active ? "true" : "false";
    };

    position();
    const observer = new ResizeObserver(position);
    const parent = target.parentElement;
    if (parent) observer.observe(parent);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions) return;

    const closeOutside = (event: PointerEvent) => {
      if (menuOpen && event.target instanceof Node && !actions.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="pv2-nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="pv2-frame pv2-nav__inner">
        <a className="pv2-nav__identity" href="#top" aria-label="Leo Sanga, top of page">
          <SignalMarkV2 animated />
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
                  href={`#${item.id}`}
                  key={item.id}
                  ref={(element) => {
                    linkRefs.current[item.id] = element;
                  }}
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={closeMenu}
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
