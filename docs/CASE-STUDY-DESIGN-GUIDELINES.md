# Portfolio Case-Study Design Guidelines

Status: approved by Leo as active guidance for current and future portfolio case
studies.

Authority: the approved portfolio goal remains the highest project authority. An
approved case-study specification may override these general guidelines only
when the result still satisfies that goal and its invariants.

Last updated: 2026-09-27

## Purpose

Each case study should help a first-time visitor understand the business value,
the system behavior, and Leo's judgment without requiring prior knowledge of the
tool. The page should deepen the promise made by the homepage instead of asking
the visitor to learn a second story.

## Reading order

Use this default order unless an approved project specification requires a
different one:

1. An unnumbered hero that names the project and its purpose.
2. The homepage signature visual, unnumbered, immediately after the hero.
3. Section 01, Overview, using `The problem`, `What I built`, and
   `The hard part`.
4. Numbered sections that explain the project in the order a new visitor needs.
5. A project-specific close that connects the evidence to a hiring or business
   conversation.

The signature visual is part of the opening experience. Do not turn it into a
numbered content section.

## Writing

- Use plain language that answers what, why, how, what went wrong, how it was
  checked, and what remains unresolved.
- Keep product terms when they identify the real environment or evidence. Explain
  the term when a general audience may not know it.
- Do not use a short checklist as a complete definition of a professional
  discipline. A visual can explain one important design principle without
  claiming that the principle covers all CRM or systems work.
- Do not repeat the same promise in the hero, overview, section heading, and body.
  Each layer should add information.
- Do not invent outcomes, metrics, production readiness, or transferability.

## Transferable principle and platform evidence

When a project uses a named platform, separate two ideas clearly:

- The system-design principle shows the judgment that can transfer to another
  platform.
- The platform interface and screenshots prove where the current project was
  actually implemented.

Do not imply that a configuration can be copied unchanged into every platform.
The design reasoning can transfer while the workflow, data model, permissions,
reporting, and integration details change.

## Visuals and motion

- Give every project a visual language that fits its central behavior.
- Use the opening desktop space efficiently. When room allows, let the title and
  its supporting copy and metadata share the opening row. Do not let a tall title
  create an empty grid row that pushes the project proof below the fold.
- Use the same hero-title scale across case-study routes by default. Let the
  project name wrap according to its available width rather than changing the
  type scale for each project. Record an exception only when the shared scale
  harms legibility or the opening hierarchy at a verified viewport.
- Use motion to explain a cause, a state change, a safeguard, or a result.
- Do not add motion only to make the page feel active.
- Reuse the homepage signature visual near the start of the case-study route.
- Use scroll-led motion only when the reading sequence benefits from it and the
  page remains easy to absorb.
- Prefer a fixed-height, self-running sequence for a dense case study that already
  contains substantial evidence and explanation.
- Keep an opening signature proof compact enough to deliver its result without
  occupying most of a desktop viewport.
- Review the opening proof at a real mobile width, not only as a scaled desktop
  composition. Keep its conclusion within roughly one mobile viewport when the
  content allows it. Short related metrics may share a row when their labels
  remain readable and the cause-and-result order stays clear.
- Define whether a shared visual plays once or repeats at every placement. Do not
  rely on remounting or viewport re-entry to create an accidental loop.
- When the homepage and case study share a repeating proof, set the cadence and
  playback behavior explicitly at both placements so the two experiences do not
  drift apart.
- In a repeating explanation, hold the resolved state longer than each transition
  so the result remains easy to read.
- Keep the complete final state understandable without JavaScript or motion.
- Stop motion when it is offscreen or the document is hidden. Respect reduced
  motion.

## Lines and relationships

- Draw each relationship once. Do not place a shared connector and an item border
  on the same axis when they represent the same structure.
- Use a connector only when items form a real sequence, route, or dependency.
- Use independent zones or separators for categories and responsibility
  boundaries. A boundary comparison must not look like a process flow.
- On narrow screens, remove a connector when stacking would make the relationship
  misleading. Keep the labels and markers that preserve the meaning.

## Evidence

- Keep required evidence visible. Do not hide a screenshot needed to support a
  claim behind a disclosure.
- Show the full interface when a crop removes the context needed to understand
  it.
- Keep the complete screenshot visible inline. When interface text needs closer
  inspection, make both the image and a visible `View larger` action open the
  same in-page viewer. The viewer supplements the inline evidence; it does not
  replace it or hide it behind a toggle.
- Open the viewer at a useful magnification, allow the image itself to switch
  between magnified and fit-to-screen views, keep the evidence label and caption
  in context, and provide one clear Close action. Escape must close it, focus
  must stay inside while it is open, and focus must return to the exact opener.
  The viewer does not need decorative motion.
- Do not repeat the same screenshot in several sections.
- Pair each screenshot with a caption that states what it proves and what it does
  not prove.
- Keep test data, sandbox behavior, live behavior, and separately tested code
  distinct.

## Hierarchy and numbering

- Reserve numeric indices for top-level case-study sections.
- Do not repeat `01`, `02`, and similar labels inside a numbered section unless
  the numbers carry real domain meaning.
- Supporting statements, visual captions, and evidence labels must not compete
  with the section heading in size or weight.

## Review standard

Review each case study through the relevant senior perspectives before release:

- A hiring manager asks what capability the work proves.
- A business owner asks how the problem affects operations and whether the design
  can fit a real business.
- A systems architect checks boundaries, transferability, and unsupported claims.
- An information designer checks whether the reading order is understandable at
  a glance.
- An interaction designer checks whether motion explains the system.
- An accessibility and QA review checks final-state visibility, responsive
  behavior, keyboard use, reduced motion, and overflow.

Record new project-agnostic corrections here after they are reviewed. Keep
project-specific facts in the relevant case-study specification.

## Lessons consolidated from the HubSpot case study

- Lead with the business problem and operational value, not the sandbox or the
  tool used to build it.
- Separate the transferable system-design principle from the named platform
  used to prove the current implementation.
- Answer what, why, how, what went wrong, how it was checked, and what remains in
  plain language. Keep jargon only when it names the real environment or
  evidence, then explain it.
- Present sandbox testing as a responsible step before live deployment, not as
  an apology for the work. Do not imply that test data proves a production
  outcome.
- Distinguish native platform behavior, separately tested code, business
  decisions, and controls still required before a live rollout.
- Repeat the homepage signature visual near the start of the project route, but
  keep it compact and immediately understandable.
- Show evidence complete and uncropped when context matters. Use an accessible
  viewer for close inspection instead of hiding evidence or replacing it with a
  magnified crop.
- Treat a report as a way to test the design. A useful report can reveal missing
  coverage or a conflicting rule even when the data is synthetic.
- Use motion and connector lines only when they explain a real state change,
  sequence, dependency, or boundary.
- Review the finished composition at real desktop and mobile sizes. Check hero
  height, proof visibility, image readability, keyboard behavior, reduced
  motion, and horizontal overflow.
