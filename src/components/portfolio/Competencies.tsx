import { COMPETENCIES } from "./data";

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
              className="rounded-xl border border-border bg-panel p-7 transition-colors hover:border-lavender/40"
            >
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
