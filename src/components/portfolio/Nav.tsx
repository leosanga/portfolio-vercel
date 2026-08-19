import { useLayoutEffect, useRef } from "react";
import { NAV_LINKS, CONTACT } from "./data";
import { useActiveSection } from "./useActiveSection";

const IDS = NAV_LINKS.map((l) => l.id);

export function Nav() {
  const active = useActiveSection(IDS);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Slide the single underline to the active link. When nothing is active
  // (scrolled above the first section) the indicator is parked, invisible, under
  // the first link, so its first appearance there is a pure fade with no slide
  // in from the corner. Re-measures on resize since link widths are responsive.
  useLayoutEffect(() => {
    const position = () => {
      const indicator = indicatorRef.current;
      if (!indicator) return;
      const targetId = active || IDS[0];
      const link = targetId ? linkRefs.current[targetId] : null;
      if (!link) return;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.opacity = active ? "1" : "0";
    };
    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [active]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          Leo Sanga
        </a>

        <div className="flex items-center gap-6">
          <nav className="relative hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`text-sm transition-colors hover:text-lavender ${
                  active === link.id ? "text-lavender" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <span ref={indicatorRef} aria-hidden="true" className="nav-underline" />
          </nav>

          <a
            href={CONTACT.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-4 py-2 text-sm"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}
