# Portfolio Case-Study Design Guidelines

Status: approved by Leo as active guidance for current and future portfolio case
studies.

Authority: the approved portfolio goal remains the highest project authority. An
approved case-study specification may override these general guidelines only
when the result still satisfies that goal and its invariants.

Last updated: 2026-09-30

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

## Lessons consolidated from the Salesforce case study

These rules prevent a technically complete project from turning into a long build
report that asks the audience to find its value.

### Decide whether the project deserves a case study

- A case study earns a homepage slot when it adds a capability the current set does
  not already prove and when the implementation has evidence strong enough to carry
  the page.
- Approval to add or promote a case study does not authorize removing, archiving, or
  relocating existing projects. Treat homepage composition, project ordering, and a
  separate project index as independent information-architecture decisions that each
  require explicit approval.
- State the audience value before designing the route. For a recruiter or business
  owner, identify the operational problem, the judgment demonstrated, and the proof
  that the system exists.
- Independent work, sandbox work, and confidential client work are different evidence
  classes. Name the real class accurately. Do not use NDA language to make an
  independent project sound commissioned or deployed for a client.

### Make the first impression answer what the system is for

- The project title and first supporting sentence must name the operational job in
  language a reader can understand without knowing the platform.
- Put the platform in the title when it is a useful hiring signal, but do not let the
  platform replace the purpose.
- Lead with the consequence the system prevents or produces.
- Keep the public hero anatomy consistent across case studies: title, one support
  paragraph, and the technology list. Do not add project-specific test counts, status
  lines, or implementation qualifiers merely to fill the supporting column. Place
  verification and operating boundaries in the evidence section that substantiates
  them.
- Keep the shared hero-title scale. When a shorter title should remain on one line,
  change its grid allocation before changing its font size. Project names may wrap to
  different line counts without losing typographic consistency.
- Derive the public route from the approved public case-study title, not from an
  internal repository or project slug. Update the route file, internal link, canonical
  URL, and generated route tree as one change, then verify the former route is absent
  when no redirect was approved.
- Do not lead with `fictional`, `test data`, `sandbox`, or a defense of the project.
  Place one accurate evidence-context statement at the first evidence boundary. When
  a section header has an available supporting column, use that column instead of
  creating a partial-width standalone row. Do not repeat the statement in every
  caption.

### Build one narrative instead of repeating a system summary

- Give the opening proof one memorable sentence and one story. A relationship change,
  failure boundary, or before-and-after state is easier to remember than a complete
  outcome matrix.
- Treat a stop or review condition as a different state from an ordinary route. Do
  not style it as one more successful outcome.
- A standalone Overview is optional. Remove it when the hero and opening proof already
  establish the problem, build, and hard part. Section order is a reading aid, not a
  requirement to repeat material.
- Each chapter must add a new answer. A useful default is: how the decision is made,
  when the system acts or stops, how it remains safe and traceable, and what is working
  now.
- Each screenshot gets one job. Do not repeat its fields in a second transcript unless
  the image text cannot carry an essential claim at page size.

### Budget the page and evidence before polishing it

- Measure the full page, opening, and major section heights at a real desktop width
  and a real phone width. Do not accept length by feel.
- When a hero feels underused, compare the title and supporting columns before
  changing its overall scale. Preserve the shared hero rhythm and improve the column
  composition. Do not shrink one project's hero to compensate for an underfilled
  support column.
- Measure where both hero columns begin and end, plus the gap from the lowest content
  to the section boundary. Total hero height alone cannot show whether the support
  column is wasting space or whether one column is setting the height for both.
- Solve a short-title hero in this order: rebalance the grid, tighten the support
  column's internal rhythm, then adjust vertical padding. Asymmetric padding is valid
  when the content needs to sit slightly lower while the section becomes shorter, but
  verify the resulting top and bottom gaps in the browser.
- Compare computed title size and line height at the same viewport across case studies.
  A title that looks smaller because it fits on one line must not receive a private
  scale unless a documented legibility problem requires it.
- Capture those measurements before the first layout edit. If a baseline was not
  recorded, report that limitation instead of reconstructing or inventing a
  before-and-after comparison.
- Review whether the primary evidence appears soon enough. If the reader must pass
  several summaries before reaching proof, remove a layer.
- Choose screenshot framing and section layout together. A portrait capture needs a
  portrait-aware placement. A wide list or dashboard should not inherit a narrow
  text column.
- Never place a tall screenshot beside a short caption or short paragraph. That empty
  column is a structural defect, not spacing to decorate.
- Do not solve an empty side column by expanding an image before checking its intrinsic
  aspect ratio and the resulting section height. A centered, capped evidence frame can
  make the space deliberate while keeping the page shorter and the screenshot legible.
- Fix wasteful source framing before compensating with CSS. Do not crop away the
  context required to understand the interface.
- Count visual boundaries. A section rule, card border, row rule, and screenshot frame
  should not all describe the same grouping.

### Keep proof motion proportional to the information

- A complete final state does not automatically make motion unnecessary. Use a short
  sequence when the state change itself is the memorable system behavior, such as the
  same request reaching a different owner as its relationship changes.
- Keep the resolved state complete and understandable without motion. The sequence
  should add causality and timing, not withhold a route or force the reader to wait for
  the answer.
- Do not add autoplay, Pause, or Play controls merely to create activity. A compact
  self-running explanation can play once on the case-study route and repeat on a longer
  cadence in a homepage card when both behaviors are specified explicitly.
- At phone width, the complete signature proof should fit within roughly one viewport
  when the information allows it. Convert desktop cards into compact rows before
  removing content.
- A decorative control is a product claim. If its purpose is not obvious and useful,
  remove it.

### Gate the signature experience before rebuilding the page

- Define the opening question, states, geometry, motion, responsive behavior, and
  accessibility fallback in the approved specification before delegating implementation.
  Do not delegate an open-ended request for a `wow factor`.
- Build and render the hero plus signature proof as the first gate. Review it on the
  homepage and dedicated route before changing the remaining chapters.
- Keep visual judgment and acceptance separate from mechanical implementation. A
  technically correct CSS change can still increase page length or create a new empty
  region, so every material geometry change needs a rendered check.
- For repeating motion, observe at least one complete reset and second pass at every
  placement. Record the dwell time of each readable state and the resolved hold. Source
  props and timer constants do not prove that the rendered sequence loops or remains
  readable while intersection and document-visibility rules are active.
- Use one persistent implementation agent for bounded revisions, then use a fresh
  read-only audit after the rendered result is accepted. This limits repeated context
  loading without giving away claim, hierarchy, or release judgment.
- Keep a production-equivalent local viewer running through acceptance. Rebuild and
  restart it after output changes so the browser never combines stale HTML with new CSS.
- Treat preservation as dependency closure, not markup recovery. When an existing
  homepage surface must remain unchanged, verify its data, components, selector
  families, responsive rules, reduced-motion and forced-color fallbacks, timer logic,
  and route links together. Restored JSX with missing CSS or behavior is still a
  regression.
- After rebuilding a same-origin local preview, load a fresh document or use a
  cache-busting query before visual acceptance. Confirm that the page references the
  new build output so a cached bundle cannot make corrected source look broken, or
  broken source look corrected.

### Separate implementation proof from operational readiness

- Test counts, coverage, fresh-environment rebuilds, and credentialed runs prove the
  implementation. They are not business-impact metrics.
- Prefer two status groups: `Working now` and `Environment-specific before operational
use`. This distinguishes observed behavior from rollout decisions without turning
  the close into a hypothetical deployment checklist.
- Scope replay claims precisely. Describe which terminal states prevent repeated
  business actions and which error states remain retryable.
- Scope transferability precisely. A decision pattern can transfer while the objects,
  automation, permissions, and operating controls remain platform-specific.

### Close as a case study, not as an agency landing page

- End with the operational result established by the evidence.
- A related project link can explain how the next case study extends the story.
- Do not add service-package language, a generic sales hook, or a second large call to
  action when the global navigation already supplies one.

### Final responsive and accessibility gate

- Verify the homepage proof and the full route separately at desktop and phone widths.
- Check that fixed utilities do not cover proof, captions, project links, or the final
  action. At phone width, place a shared utility rail after the footer when the fixed
  version obscures content.
- Open evidence from the image and from the visible action. Verify Escape closes the
  viewer and focus returns to the exact opener.
- Verify heading order, complete static meaning, no horizontal overflow, and a useful
  reduced-motion state before considering the case study complete.
