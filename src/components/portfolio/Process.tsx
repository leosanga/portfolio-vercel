import { PROCESS_STEPS } from "./data";

export function Process() {
  return (
    <section id="approach" className="border-y border-border py-24 md:py-28">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">Approach</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          From Problem to Solution
        </h2>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="reveal">
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold leading-none text-lavender">{step.number}</p>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-lavender/50 to-transparent"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 text-center text-sm italic text-muted-foreground">
          "I build automation to solve the actual problem, not to add complexity."
        </p>
      </div>
    </section>
  );
}
