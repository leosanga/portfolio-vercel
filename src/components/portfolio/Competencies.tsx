import { COMPETENCIES } from "./data";

// Writes the pointer position into CSS vars the .spotlight-card glow reads.
// Straight DOM writes in the handler — no state, no re-render. The article is a
// child of section#skills, never the measured section, so this touches no
// scrollspy box.
function trackPointer(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function Competencies() {
  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
          Skills
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          What I Build Across
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Systems, integrations, and automations across the functions that keep a business running.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {COMPETENCIES.map((item) => (
            <article
              key={item.title}
              onPointerMove={trackPointer}
              className="spotlight-card reveal rounded-xl border border-border bg-panel p-7 transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-lavender/40 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground">{item.claim}</p>
              <ul className="tool-list mt-5 border-t border-border pt-4">
                {item.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
