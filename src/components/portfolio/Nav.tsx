import { NAV_LINKS, CONTACT } from "./data";
import { useActiveSection } from "./useActiveSection";

const IDS = NAV_LINKS.map((l) => l.id);

export function Nav() {
  const active = useActiveSection(IDS);

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
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative text-sm transition-colors hover:text-lavender ${
                  active === link.id ? "text-lavender" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-lavender"
                  />
                )}
              </a>
            ))}
          </nav>

          <a
            href={CONTACT.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-lavender px-4 py-2 text-sm font-medium text-primary-foreground transition-[opacity,translate] duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}
