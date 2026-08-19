import { FlowDiagram } from "./FlowDiagram";
import { PROJECTS } from "./data";

// A project that can show its topology is exactly the project that has evidence
// to show, so `flow` sorts the tiers and no separate flag is needed. The five
// without one are not thin case studies, they are a register of work: giving
// them the same card as a project with a diagram invites a comparison they lose.
const CASE_STUDIES = PROJECTS.filter((project) => project.flow);
const ALSO_BUILT = PROJECTS.filter((project) => !project.flow);

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
          {CASE_STUDIES.map((project) => (
            <article
              key={project.title}
              className={`flex flex-col rounded-xl border bg-panel transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-lavender/40 hover:shadow-lg ${
                // A diagram card runs far taller than a text card, so it takes
                // the whole row. Sitting a short card beside one leaves a
                // column of dead space the height of the diagram.
                project.featured || project.flow
                  ? "border-lavender/30 p-8 md:col-span-2 md:p-10 xl:col-span-3"
                  : "border-border p-6"
              }`}
            >
              {/* `.reveal` stays off the article on purpose. Its view-timeline
                  recomputes against the element's live box every scroll frame,
                  and the flow disclosure below can grow that box by close to a
                  screen's height when opened — scrolling back up while it's
                  open then lands inside the recomputed "still entering" range
                  and fades the whole card. Keeping the disclosure outside this
                  wrapper keeps the reveal-tracked box a fixed size regardless
                  of open state. */}
              <div
                className={`reveal flex flex-col ${
                  project.featured || project.flow ? "[&>p]:max-w-3xl [&>ul]:max-w-3xl" : ""
                }`}
              >
                {project.featured && (
                  <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-lavender">
                    Featured
                  </p>
                )}
                <h3
                  className={`font-bold leading-snug text-foreground ${
                    project.featured ? "text-xl md:text-2xl" : "text-base"
                  }`}
                >
                  {project.title}
                </h3>
                {/* Problem, then the solution carrying its own outcome. Same
                    order as an "Also built" row, so a reader moving down the
                    section reads every project the same way. */}
                <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-rose">
                  Problem
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>

                <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-lavender">
                  Solution
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>

                {/* Same `tool-list` treatment as the Skills section: mono terms
                    separated by a CSS middot, no containers. */}
                <ul className="tool-list mt-6 border-t border-border pt-4">
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>

              {/* Native <details>: the browser owns open/closed, so there is
                  no React state, and the diagram is still in the DOM for
                  crawlers, Ctrl-F, and visitors whose JS never ran. */}
              {project.flow && (
                <details
                  className="flow-disclosure mt-7"
                  // Opening adds well over a screen of content below a button
                  // that is already near the bottom of the card, so without
                  // this the diagram lands off-screen and the click reads as
                  // doing nothing. No options passed: `scrollIntoView()` picks
                  // up `scroll-behavior` from CSS, which the reduced-motion
                  // block already forces to `auto`.
                  onToggle={(event) => {
                    const details = event.currentTarget;
                    if (!details.open) return;
                    // A frame later: `toggle` fires before the expanded
                    // content has been laid out, so scrolling immediately
                    // aims at a box that is still the collapsed height.
                    requestAnimationFrame(() => details.scrollIntoView());
                  }}
                >
                  <summary>See how it works</summary>
                  <div className="mt-6">
                    <FlowDiagram flow={project.flow} />
                  </div>
                </details>
              )}
            </article>
          ))}
        </div>

        {/* An accordion, not an open list. Five entries at full depth ran to
            most of a screen each and buried everything under them; collapsed
            they are five lines. Native <details> again, so the content stays in
            the DOM for crawlers and find-in-page, opens with JS off, and has no
            React state that can get stuck. */}
        <div className="mt-16">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Also built
          </h3>
          {/* The measure lives on the list, not the rows, so the top rule and
              every row rule end at the same place. */}
          <ul className="mt-6 max-w-3xl border-t border-border">
            {ALSO_BUILT.map((project) => (
              <li key={project.title} className="border-b border-border">
                <details className="project-disclosure">
                  {/* `.reveal` sits on the summary, not the <li>, for the same
                      reason as the case-study cards above: the disclosure body
                      grows the <li> by a few hundred px when opened, and a
                      view-timeline tracking that box recomputes its "still
                      entering" range against the new size. The summary's own
                      box never changes, so it stays a stable reveal target. */}
                  <summary className="reveal">
                    <h4>{project.title}</h4>
                  </summary>

                  {/* Problem, then the solution carrying its own outcome. A
                      result is what the solution produced, so a separate
                      impact list said the same thing twice. */}
                  <div className="pb-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-rose">
                      Problem
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {project.problem}
                    </p>

                    <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-lavender">
                      Solution
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {project.solution}
                    </p>

                    {/* Same dashed left edge a `constraint` node carries in a
                        diagram, so the two say the same thing the same way.
                        Last because it is the extra, not the point. */}
                    {project.hardPart && (
                      <div className="hard-part mt-5">
                        <p className="hard-part-tag">The hard part</p>
                        <p className="hard-part-text">{project.hardPart}</p>
                      </div>
                    )}

                    <ul className="tool-list mt-5 border-t border-border pt-4">
                      {project.stack.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
