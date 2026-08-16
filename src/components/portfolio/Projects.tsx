import { PROJECTS } from "./data";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-28">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
          Projects
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Proof of Work
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-xl border border-border bg-panel p-7 transition-colors hover:border-lavender/40"
            >
              <h3 className="text-base font-bold leading-snug text-foreground">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.overview}
              </p>

              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-rose">
                Business Problem
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {project.problem}
              </p>

              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-lavender">
                Impact
              </p>
              <ul className="mt-1.5 space-y-1.5">
                {project.impact.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lavender" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 pt-1">
                {project.stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
