# Salesforce Case Study Revision Implementation Specification

Status: APPROVED by Leo for local implementation. Revision 6, approved on
2026-09-30, restores the deployed project identities and corrects the animation target.
Revision 5 corrects the homepage structure, case-study route, and resolver cadence.
Revision 4 adds the spatial-efficiency and shared platform-label requirements below.
Its hero correction was refined after rendered comparison with HubSpot: preserve the
hero's authority and maximize the supporting column instead of compressing the hero.
Revision 3 remains authoritative for the Salesforce resolver and chapter system.

This is the authoritative implementation surface for the Salesforce case-study
revision. It supersedes the layout, motion, disclosure, screenshot, section, and
closing directions in `docs/SALESFORCE-TRIAL-DEMO-CASE-STUDY-SPEC.md`. The earlier
spec remains useful only for factual evidence, claim provenance, and decision history.
When the documents differ, this revision wins.

Approval authorizes local file changes and verification. It does not authorize a
commit, push, merge, deployment, or publication.

## Revision 6: live row order and the correct animation target

Leo clarified that Salesforce remains Project 02. The homepage mismatch was the swap
between Support Ticket Pipeline Automation and Executive Reporting, and the requested
timing change applies to Support Ticket rather than Outbound Prospecting.

### Corrected decisions

1. Keep sequential numbering with Booking Agent as 01, Salesforce as 02, HubSpot as
   03, and the five standard project rows as 04 through 08.
2. Preserve the live standard-row order. Support Ticket Pipeline Automation appears
   before Executive Reporting.
3. Restore AI-Assisted Outbound Prospecting to its deployed 11.9-second cadence.
4. Slow Support Ticket Pipeline Automation to a 22-second cadence. The completed
   lifecycle holds for 6 seconds before the next pass.

### Acceptance

- Salesforce is index 02 and HubSpot is index 03.
- Support Ticket is displayed before Executive Reporting as indices 07 and 08.
- The Support Ticket lifecycle completes, holds, resets, and begins a second pass at
  the slower cadence.
- Outbound Prospecting uses its original timing.

## Revision 5: homepage continuity, title-derived route, and readable motion

Leo corrected three decisions after reviewing the local build. This revision is the
authority wherever earlier sections describe a separate project index, the old
Salesforce route, a faster resolver cadence, or one-time playback on the case-study
route.

### Corrected decisions

1. The five standard project rows stay on the homepage exactly as they do in the live
   portfolio. Preserve the Projects introduction, credibility band, project visuals,
   ordering, approved copy, and workflow disclosures. Add Salesforce between Booking
   Agent and HubSpot, then continue into the five standard rows.
2. Do not add a separate `/projects` page or a `See more projects` archive link.
3. The Salesforce public title remains `Trial & Demo Routing by Customer Relationship
(Salesforce)`. Its title-derived route is
   `/projects/trial-demo-routing-by-customer-relationship`; update the internal link,
   canonical URL, route file, and generated route tree together. The internal project
   slug may remain `salesforce-trial-demo-routing` because it identifies the project
   data and CSS, not the public case-study URL.
4. The resolver repeats at both homepage and case-study placements while at least 35
   percent is visible. It still finishes immediately when reduced motion is requested
   or the document is hidden.
5. Use one shared 21.5-second cadence. The fully readable `Unknown company`, `Open
opportunity`, and `Customer` states each hold for about 2.9 seconds; `Conflicting
evidence` holds for about 3.2 seconds; the resolved state holds for 6 seconds before
   the next pass. The initial evidence and routing construction remains progressive but
   does not consume the time intended for reading the completed states.

### Acceptance

- The homepage contains all eight projects: Booking Agent, Salesforce, HubSpot, then
  the five live standard project rows.
- No `/projects` route, archive component, or archive link remains in the built route
  tree or homepage.
- The title-derived Salesforce URL loads directly and supplies its matching canonical
  URL. The old internal-project-name URL is absent from the route tree.
- Both Salesforce placements advance through at least two complete passes while they
  remain visible, with the same phase sequence and timing.
- Reduced motion shows the complete final state without cycling.

## Revision 4: spatial efficiency and portfolio continuity

Leo requested another rendered review after the Revision 3 build. The review applies
the senior design director, information designer, frontend architect, accessibility
engineer, portfolio strategist, recruiter, and business-owner perspectives.

### Measured defects

- At a 1415-pixel desktop viewport, the Salesforce homepage summary is 535 pixels tall
  while the resolver itself is 463 pixels tall. The proof column therefore ends 72
  pixels before the card body and reads as unfinished space below the visual.
- The case-study hero is 565 pixels tall. The real weakness is not its height but how
  the Salesforce-specific grid and bottom alignment use that height less effectively
  than the HubSpot hero.
- The evidence-context disclosure is a 679-pixel surface in a 1320-pixel row. It sits
  between the section heading and evidence, leaving almost half the row unused and
  adding a separate visual boundary before the screenshots.
- The Salesforce worktree predates the approved Booking Agent layout and workflow-map
  viewer revision in portfolio commit `09a87f0`. The local viewer therefore does not
  represent the current Booking Agent case study.

### Approved corrections

1. Keep all public claims, screenshots, captions, route order, and resolver behavior.
2. Reduce only the Salesforce homepage summary rhythm until the text and resolver
   columns end together. Do not shorten or rewrite the three evidence statements.
3. Match the HubSpot hero's spatial logic: retain the full hero scale and vertical
   authority and top-align both columns. Keep the same public anatomy as the other case
   studies: title, one support paragraph, and Built with. Do not create a smaller
   Salesforce-specific hero or add Salesforce-only status metadata as a spacing fix.
   The implementation boundary and verification remain in the later safeguards and
   working-state sections where the page substantiates them.
4. Move the evidence-context disclosure into the right side of Chapter 01's header.
   Remove its pill surface. It remains visible before the first screenshot and retains
   the exact approved disclosure.
5. Reduce Salesforce chapter padding and signature-proof padding proportionally. Do
   not compress body copy, captions, or screenshot legibility.
6. Use one shared platform-label treatment in all three case-study heroes. `(n8n)`,
   `(HubSpot)`, and `(Salesforce)` remain inside their respective H1 elements but render
   as the smaller mist-colored line established by the Salesforce hero.
7. Port only the approved Booking Agent correction from `09a87f0`: the missing spacing
   token, denser featured card, balanced opening proof, SVG workflow-map viewer, related
   dialog media support, content dimensions and alt text, QA expectations, and spec
   record. Do not import newer unrelated projects from `main`.

### Acceptance

- Measure homepage card, hero, signature proof, Chapter 01, and document heights after
  images have loaded at desktop and 390 pixels.
- The Salesforce hero should use the same column proportions, top alignment, title
  scale, and vertical rhythm as HubSpot. Its supporting column should account for the
  height rather than leaving the title to carry the composition alone.
- The homepage resolver must not end above an empty band inside its card column.
- The Chapter 01 disclosure must occupy the header's available right column instead of
  creating its own partial-width row.
- All three platform labels use the same font scale, weight, color, and line behavior.
- Booking Agent's workflow map opens from the drawing and `View larger`, closes with
  Escape, and returns focus to its opener.
- Verify TypeScript, targeted ESLint, Prettier, `git diff --check`, the production build,
  server-rendered content, dark theme, reduced motion, and no horizontal overflow.

## Revision 3: relationship-resolution visual system

Leo approved this revision after a fresh rendered comparison with the Booking Agent
and HubSpot case studies. The review applied the design director, senior product and
information designer, senior motion and interaction designer, staff frontend engineer,
accessibility engineer, portfolio strategist, hiring manager, business owner, and QA
lead perspectives.

Revision 2 corrected the content hierarchy and removed motion that merely replayed a
fully visible route table. That ruling solved an unhelpful animation, but the finished
static composition overcorrected. It explains the available outcomes without staging
the decision that makes this project valuable. Booking has a failure-state instrument
panel and HubSpot has a before, correction, and complete-coverage visualization.
Salesforce needs its own visual language: one request being resolved through the
customer relationship already in the CRM.

Revision 3 is the authority when it conflicts with Revision 2. In particular, it
supersedes Revision 2's `no motion` target. Motion is now required only inside the
signature relationship resolver and only when it explains a real change in CRM state,
routing precedence, ownership, or safety status.

### 3.1 Portfolio job and immediate question

The opening experience must answer this question without requiring the section copy:

> How does the same request reach a different owner when the customer relationship
> changes?

The visual must make these distinctions apparent:

- Booking Agent shows what happens when a connected system fails.
- Salesforce shows how existing customer and pipeline context decides where an inbound
  request belongs before a new sales record is created.
- HubSpot shows whether decisions remain visible and fully represented after a lead is
  inside the CRM.

The Salesforce experience must not resemble a generic flowchart, a Salesforce product
mockup, or a fourth variation of the Booking and HubSpot visual compositions.

### 3.2 Signature visual: relationship resolver

Replace the equal-card route table with one stable relationship-resolution canvas.
The canvas contains three functional regions that remain in the same position while
the system state changes:

1. `Inbound request`: the same demo request enters from the left. The person and company
   identity stay constant throughout the successful story.
2. `Relationship evidence`: the center represents the current Salesforce context using
   connected record nodes for Company, Contact, Account, and Opportunity. Only records
   relevant to the current decision receive full emphasis.
3. `Responsible follow-up`: the right resolves to the responsible owner and the business
   action created for that state.

The successful story uses these observed states and exact outcomes:

1. `Unknown company` resolves to `Inbound queue` and `Create a new lead`.
2. `Open opportunity` resolves to `Deal owner` and `Create a task and contact role`.
3. `Customer` resolves to `Account owner` and `Create an expansion task`.

The safety state is not a fourth step in that chronology. It is a separate interruption:

- `Conflicting evidence` breaks or retracts the active route.
- The destination becomes `Inbound review`.
- The action becomes `Stop before creating a sales record`.

Use functional labels rather than metaphors. The component remains named
`SalesforceRoutingProofV2` unless a rename materially improves source clarity without
expanding the diff.

### 3.3 Geometry and art direction

- Remove the large outer rounded proof card on the dedicated case-study route.
- Do not represent each successful state as an equal rounded card.
- Use relationship lines and compact record nodes to carry meaning. A connector may
  appear only when it represents a real relationship or selected route.
- Keep one visual spine from request through evidence to follow-up. The current state
  may change, but the primary geometry must not jump between unrelated layouts.
- Inactive evidence stays visible enough to preserve context but clearly recedes.
- The selected relationship and route use the existing lavender system.
- Coral is reserved for the interrupted review state and must not decorate successful
  routes.
- The review state must interrupt the geometry rather than appear as another destination.
- Avoid a dense field-level Salesforce UI recreation. This is an explanatory systems
  visual backed by the real screenshots below it.
- Avoid nested card borders. Use at most one containing surface in the homepage placement
  and no outer surface in the case-study placement.
- The final state must remain understandable as a still image.

Dedicated-route composition:

- Use an asymmetric text-and-system stage rather than a full-width bordered card.
- The statement and compact explanatory line occupy roughly four to five columns.
- The resolver occupies roughly seven to eight columns.
- The resolver must finish within the opening proof viewport at an ordinary desktop
  height. Do not create a scroll-led or sticky sequence.

Homepage composition:

- Reuse the same component and state model.
- A restrained containing surface is allowed when required by the existing project card.
- Do not remove required project-card content to make room for the visual.

### 3.4 Motion contract

Motion explains the same-company state change. It is not ambient decoration.

- The dedicated case-study route plays once when the resolver first becomes meaningfully
  visible, then holds a complete resolved state.
- The homepage placement may repeat only while visible, with a calm total cadence of at
  least eight seconds and a long final-state hold.
- No Pause, Play, replay, carousel, scrubber, pagination, or decorative product control.
- Stop timers while the component is outside the viewport or the document is hidden.
- Do not restart the dedicated-route sequence after ordinary scrolling.
- When `prefers-reduced-motion: reduce` is active, render the complete static explanation
  immediately and create no timers.
- Server-rendered and no-JavaScript output must contain every label and outcome needed to
  understand the system.
- Transitions should use opacity, color, line reveal, and movement of no more than roughly
  12 pixels. Avoid bouncing, spring overshoot, continuous pulses, and animated counters.

The implementation may tune exact timings during rendered review, but it must preserve
this phase order:

1. The request is present.
2. Relationship evidence becomes available.
3. The highest-priority applicable relationship becomes active.
4. The route resolves to its owner.
5. The resulting business action appears.
6. The safety interruption demonstrates that conflicting evidence stops creation and
   waits for review.

The full explanatory cycle should take approximately five to six seconds before its
final hold. Timing is subordinate to legibility.

### 3.5 Hero geometry

- Preserve the approved accessible H1 text and public claim boundaries.
- Visually separate `(Salesforce)` as platform metadata if that reduces the display-title
  footprint, while keeping one coherent H1 and the same spoken text.
- The desktop title should occupy approximately three to four visual lines rather than
  the current six-line block.
- Keep the support, environment, verification, and technology evidence together as one
  deliberate information column.
- The hero and signature proof together must reveal the operating idea earlier than the
  current implementation. Do not solve the title problem by increasing the hero height.

### 3.6 Page-composition revision

#### Chapter 01: decision and evidence

- Keep the design principle and the approved evidence-context sentence.
- Do not place the full resolved-event portrait capture in a narrow secondary column.
- The broad Inbound Events capture remains the primary run-level evidence.
- Present the resolved event as a compact supporting detail that preserves the complete
  original capture in the established evidence viewer.
- Any inline crop must be honest, must not remove context needed for its claim, and must
  be paired with access to the complete unmodified capture.
- The supporting detail should foreground the matched Account, Contact, Opportunity,
  owner, and decision reason rather than empty Salesforce canvas.

#### Chapter 02: act and stop

- Recompose the two stories as a deliberate `Act` and `Stop` contrast instead of two
  repeated full-width articles.
- `Act` continues the relationship path to the deal owner, task, and contact role.
- `Stop` interrupts the path and exposes the review reason and required human step.
- Use opposing but related geometry. Do not imply that the stop path is a successful
  alternate route.
- Keep each complete source screenshot available inline or through the established
  evidence-viewer behavior required by the case-study guidelines.

#### Chapter 03: safeguards and reporting

- Replace the three generic equal cards with one compact reliability lifecycle or ledger.
- The lifecycle must connect receipt, decision, action or hold, recorded outcome, replay
  handling, and credential boundary without inventing implementation behavior.
- Map the approved safeguards into that lifecycle: successful replay protection, visible
  rejected and failed requests, and a sending credential that cannot read Accounts.
- Keep the verified dashboard as evidence, but reduce its inline dominance. A compact
  code-native summary may explain the observed test-run counts if it is clearly labeled
  as explanatory and the real dashboard remains accessible.
- Combine verification scope and known limits into a compact technical ledger.

#### Chapter 04 and close

- Keep `Working now` and `Environment-specific before operational use` as the two status
  groups.
- Reduce their visual weight. They are a boundary statement, not another hero section.
- Keep the operational-result close and the related HubSpot link.
- Do not introduce agency language, a second scheduling panel, or a generic service hook.

### 3.7 Spatial budget

Measure rather than judge page length by feel.

- Record the hero, signature proof, each numbered chapter, and total document height at
  one real desktop viewport and one 390-pixel phone viewport before and after the revision.
- The desktop signature proof should be understandable without scrolling within itself.
- At phone width, the complete signature explanation should fit within roughly one
  viewport when typography permits. It must not require horizontal scrolling.
- Full screenshots may be tall when the evidence requires them, but the surrounding copy
  must not create a dead adjacent column.
- Reduce vertical waste through hierarchy and evidence framing, not by compressing body
  text below a comfortable reading size.
- Count visual boundaries. A section line, container border, row border, and screenshot
  frame must not all describe the same grouping.

### 3.8 Accessibility and responsive behavior

- Preserve logical heading order and the existing labelled figure relationship.
- All animated states are enhancements over complete semantic text in the DOM.
- Do not use color alone to identify the active or interrupted route.
- Forced-colors mode must retain visible boundaries and route meaning.
- At narrow widths, stack request, evidence, and follow-up vertically. Remove any connector
  whose stacked geometry would imply the wrong relationship.
- The fixed utility dock must not cover the proof, evidence captions, related-project link,
  or footer.
- Verify the evidence viewer from both the image and visible action. Escape closes it and
  focus returns to the exact opener.

### 3.9 Implementation boundaries

Expected first-gate files:

- `src/components/portfolio-v2/SalesforceRoutingProofV2.tsx`
- `src/content/portfolio-v2/types.ts`, only if the approved state model needs a type change
- `src/content/portfolio-v2/salesforce-trial-demo-routing.ts`
- the Salesforce-only rules in `src/styles/portfolio-v2.css`

The first gate must not restructure the remaining case-study chapters. It delivers only
the signature resolver, its two placements, and the minimum hero adjustment needed to
judge the opening composition.

After the first gate passes rendered review, the second gate may change:

- `src/components/portfolio-v2/SalesforceTrialDemoCaseStudyV2.tsx`
- `src/components/portfolio-v2/CaseEvidenceFigureV2.tsx` only when a reusable evidence
  presentation need cannot be satisfied with Salesforce-local markup
- the Salesforce content module and Salesforce-only CSS

Do not modify Booking Agent or HubSpot components to make Salesforce fit. Shared changes
require a demonstrated cross-case-study need and a separate regression review.

### 3.10 Verification gates

Gate 1, signature resolver:

- TypeScript passes.
- Targeted lint and formatting pass for touched files.
- The production build passes.
- Desktop, 390-pixel, dark-theme, reduced-motion, no-JavaScript, and offscreen behavior are
  reviewed in the local viewer.
- The homepage and dedicated route both use the component without changing its meaning.
- The dedicated route plays once. The homepage pauses while hidden or offscreen.
- There is no Pause or Play control and no horizontal overflow.
- The proof has a clear request, evidence, owner, action, and separate stop state.

Gate 2, full composition:

- Every selected screenshot has one visible job and remains inspectable at full context.
- No portrait evidence is trapped in a narrow column.
- Act and Stop read as different system states.
- Safeguards read as one engineered lifecycle rather than three marketing cards.
- The dashboard no longer dominates the chapter relative to the claim it proves.
- The status and close remain factual and quiet.
- Booking Agent, HubSpot, homepage navigation, utility dock, theme, evidence viewer, and
  archive receive targeted regression checks.
- Record before-and-after section heights at desktop and 390 pixels.

Gate 3, independent audit:

- A fresh read-only reviewer checks the final diff against this revision, the project goal,
  the evidence boundaries, and the browser acceptance results.
- Resolve every invariant violation and every unsupported claim before handoff.
- Document reusable lessons only after the implementation and audit are complete.

### 3.11 Delegation and usage discipline

- The primary agent owns this specification, visual judgment, rendered acceptance, claim
  boundaries, and final integration.
- One persistent implementation agent may implement each bounded gate from this exact
  specification. It may not invent copy, claims, geometry, or additional effects.
- A separate low-cost reviewer performs the final read-only audit.
- Do not fork full conversation history. Agents receive this specification, exact files,
  current diff boundaries, and verification commands.
- Reuse the implementation agent across gates instead of onboarding another builder.
- Stop at a clean gate when session usage becomes constrained. Record the passing checks
  and exact next action in this specification rather than creating a competing handoff.

## Revision 2: phase-boundary reevaluation

Leo approved a second review and authorized implementation of its recommendations on
2026-09-29. The review applied the portfolio strategist, business-systems hiring
manager, business owner, content designer, product designer, Salesforce architect,
frontend engineer, accessibility reviewer, and QA perspectives.

The project remains strategically valuable and keeps the second homepage case-study
slot. It proves CRM decisioning, a deliberate Apex and Flow boundary, least-privilege
integration access, idempotency, human review, reporting, and rebuildability. The
problem is the current presentation: it explains the build several times before it
gives a recruiter or business owner a memorable reason to care.

Revision 2 makes these decisions authoritative:

1. Retitle the project `Trial & Demo Routing by Customer Relationship (Salesforce)`.
2. Open with the operational consequence: a known customer or active deal should not
   re-enter Salesforce as a disconnected Lead.
3. Replace the opening route table with a compact same-company story across three
   relationship states. Show conflicting evidence separately as a stop, not as a
   fourth ordinary route.
4. Remove the standalone Overview. Its useful problem, build, and hard-part content
   is absorbed into the hero and the first chapter.
5. Use four numbered chapters only:
   - how Salesforce decides;
   - when it acts and when it stops;
   - how the build stays safe and traceable;
   - what is working now and what remains environment-specific.
6. Remove the five-item owner-outcome matrix, the eight-field resolved-record
   transcription, duplicated implementation-check list, and six-item rollout
   checklist.
7. Keep every selected screenshot complete and visible inline, but give each one a
   single job. Do not place a tall image beside short copy or recreate empty columns
   around a narrow capture.
8. Correct claim scope:
   - the decision pattern is transferable; the implementation is Salesforce-specific;
   - successful replays do not repeat business actions;
   - a rejected request can be corrected and resent later with the same ID;
   - Apex makes the matching decision so subtle cases can be tested explicitly and
     repeatably.
9. Replace `Configured for each production org` with two concise groups: `Working now`
   and `Environment-specific before operational use`.
10. Close with the concrete operational result, not a generic `Result` heading or an
    agency-style hook.

Target outcome: approximately one-third less page length, one clear point per
chapter, no duplicated proof, no motion, no dead evidence column, and an opening that
answers what the system is for before describing how it was tested.

## 1. Claude start point

Work only in this isolated portfolio worktree:

`C:\Users\Leo\Downloads\projects\salesforce-revenue-system\.superpowers\worktrees\portfolio-salesforce-case-study`

Branch: `feature/salesforce-case-study`

Base before the Salesforce portfolio work: `f74cab4`

Do not implement in the dirty canonical portfolio worktree at
`C:\Users\Leo\Downloads\projects\portfolio-vercel`. Preserve every existing change
in both worktrees.

Read in order:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/PROJECT-GOAL.md`
4. `docs/CASE-STUDY-DESIGN-GUIDELINES.md`
5. This specification
6. The superseded spec for evidence history only
7. `src/content/portfolio-v2/salesforce-trial-demo-routing.ts`
8. `src/components/portfolio-v2/SalesforceRoutingProofV2.tsx`
9. `src/components/portfolio-v2/SalesforceTrialDemoCaseStudyV2.tsx`
10. Salesforce rules in `src/styles/portfolio-v2.css`
11. `src/assets/portfolio-v2/ASSET-SOURCES.md`
12. `C:\Users\Leo\Downloads\projects\salesforce-revenue-system\docs\portfolio-case-study-handoff.md`

Also follow `C:\Users\Leo\.claude\build-playbook.md` and
`C:\Users\Leo\.claude\voice.md`. Public copy uses voice Mode 4. Do not use em dashes.

## 2. Roles Claude must apply

- Senior portfolio strategist: target-role relevance and proof distribution
- Recruiter and hiring manager: first-impression credibility
- Business owner: operational value and clarity
- Salesforce architect: platform accuracy and boundaries
- Senior content designer: hierarchy, repetition, and disclosure placement
- Information and interaction designer: density and motion judgment
- Senior frontend engineer: maintainable responsive implementation
- Accessibility engineer: semantics, keyboard use, motion, and evidence viewers
- QA and release-safety reviewer: evidence, regressions, and handoff

## 3. Problem to correct

The first local version is technically honest but editorially over-defensive. It
introduces fictional-company and test-data language before the reader understands the
value or sees proof that the implementation works. A recruiter or business owner can
therefore read the work as conceptual rather than as a working Salesforce build.

The first version also has these concrete failures:

- the routing proof is taller and weaker than its homepage version;
- a direct anchor can leave its heading partly under the sticky header;
- autoplay adds no information because all routes are already visible;
- autoplay creates a Pause control that looks like unexplained product UI;
- the Inbound Events image contains a black mouse pointer;
- the resolved-event image wastes the right third;
- Sections 03 and 04 place short text beside tall images and create dead space;
- the dashboard image is mostly empty Salesforce canvas;
- repeated header, evidence, row, and frame lines make sections visually busy;
- controlled-data qualifications repeat throughout the page;
- the closing reads like an agency landing page.

Correct the structure, not only margins.

## 4. Truth and credibility rules

### Claims allowed

The page may say the working implementation:

- was deployed and exercised in Salesforce Developer Edition;
- was rebuilt in a fresh org from the repository;
- passed 58 Apex tests at 99 percent org coverage;
- passed 9 sender tests;
- matched 16 of 16 expected fresh-org results;
- matched 16 of 16 expected results through the real Salesforce credential;
- records resolved, held, rejected, and failed events with reasons;
- routes clear matches and holds uncertain ones for review;
- uses controlled records and contains no customer or client data.

Every claim must remain traceable to the original spec, Salesforce repository, tests,
or evidence handoff.

### Claims prohibited

Do not state or imply that this implementation:

- ran in a client production org;
- produced revenue, conversion, response-time, or efficiency improvements;
- was commissioned by a client;
- contains anonymized client records;
- is production-ready without organization-specific configuration;
- is covered by an NDA.

Leo has confidential client work, but NDA language must not be used as cover for this
independent Salesforce build.

### Disclosure placement

Do not lead the hero or routing visual with `fictional`, `test data`, `demo business`,
or an explanation that Developer Edition is free.

Use this once, immediately before the first screenshot:

> Evidence context: the screenshots use controlled records in Salesforce Developer
> Edition. No customer or client data is shown.

Do not repeat that qualification in every caption.

## 5. Approved page order

1. Unnumbered hero
2. Unnumbered compact static routing proof
3. 01 Overview
4. 02 How does Salesforce decide where a request belongs?
5. 03 What does the owner receive?
6. 04 What stops the automation?
7. 05 How does the build stay safe and traceable?
8. 06 Where the build stands
9. Small result and next-case-study close
10. Existing global footer

Remove the old standalone verification section, old hypothetical live-org section,
and oversized `pv2-case-close` sales panel. Move necessary material into Sections 05
and 06.

## 6. Approved public copy

Only minor grammatical changes required by markup are allowed. Material meaning changes
require Leo's approval.

### Hero

Title:

> Trial & Demo Matching & Routing System (Salesforce)

Support:

> Routes trial sign-ups and demo requests using the customer and pipeline context
> already in Salesforce. Clear matches reach the right owner; conflicting evidence
> stops for review.

Technologies remain Salesforce, Apex, Flow, Apex REST, Salesforce DX, and Node.js.

Environment:

> Working Salesforce implementation, deployed and exercised in Developer Edition,
> then rebuilt in a fresh org from the repository.

Hero proof items:

- `58 Apex tests`
- `99% org coverage`
- `Fresh-org rebuild verified`
- `16/16 credentialed scenarios`

These are implementation checks, not business-impact metrics. If four items crowd the
hero, move `99% org coverage` to Section 05. Fresh-org and credentialed-scenario proof
must remain near the opening.

### Static routing proof

Eyebrow:

> ROUTING BY RELATIONSHIP

Heading:

> Salesforce routes each request using the relationship already in the CRM.

Request source:

> Trial sign-up or demo request

Show all four outcomes at once:

| Salesforce context   | Destination      | Follow-up                       |
| -------------------- | ---------------- | ------------------------------- |
| No matching account  | New inbound lead | Assigned to the inbound queue   |
| One open deal        | Deal owner       | Follow-up task and contact role |
| Customer account     | Account owner    | Customer expansion task         |
| Conflicting evidence | Inbound review   | No sales record created         |

Do not use a fictional company name or the current conflict quotation in this opening
visual. The review section provides detailed conflict evidence later.

### 01 Overview

Problem:

> Inbound requests can become unnecessary Leads or reach the wrong owner when the
> intake process ignores the customer and pipeline context already in Salesforce.

What I built:

> I built a Salesforce-native system that uses existing CRM records to decide where
> each trial sign-up or demo request belongs. Known relationships reach the responsible
> owner, unknown companies enter the inbound queue, and uncertain matches wait for
> review.

Hard part:

> The hard part was deciding when the CRM evidence was strong enough to act.
> Conflicting identity and company signals had to stop the automation and tell a
> reviewer what needed resolving.

### 02 Decision logic

Heading:

> How does Salesforce decide where a request belongs?

Principle:

> Every inbound request should enter the customer and pipeline context the business
> already has.

Body:

> A person is identified by email address and a company by the email's domain.
> Addresses from personal email providers never match a company by domain.

> Uncertain matches are checked first, so a doubtful request never creates or routes
> follow-up work. An open deal outranks customer status because the deal is the most
> time-sensitive relationship.

Boundary:

> The principle carries to any CRM. The objects, automation, and permissions shown
> here are specific to this Salesforce implementation.

Then show the one evidence-context disclosure.

E1 label:

> ROUTING DECISIONS ACROSS THE RUN

E1 caption:

> Eighteen inbound events with their status, outcome, and decision reason. The final
> three records show the same company reaching a different path as its CRM relationship
> changes.

E2 label:

> ONE DECISION, FULLY TRACEABLE

E2 caption:

> One demo request linked to the account, contact, and open deal it matched, with the
> decision reason and original request retained on the event.

### 03 Owner outcomes

Heading:

> What does the owner receive?

Intro:

> Apex makes the matching decision because the rules are subtle and need a test for
> every case. Flow carries out the follow-up in visible, admin-managed Salesforce
> automation.

Outcomes:

- **Unknown company:** A new lead assigned to the New Inbound Leads queue.
- **One open deal:** A follow-up task for the deal owner. The person is added to the
  deal as a contact role.
- **Several open deals:** A task for the account owner, who chooses the deal.
- **Customer:** A Customer Expansion task for the account owner.
- **Known company, no deal:** A task for the account owner.

Note:

> A person at a known company is added as a contact on that account, so existing
> accounts do not collect stray leads.

E4 label:

> WHAT THE DEAL OWNER RECEIVED

E4 caption:

> The follow-up task created for the deal owner, with the person added to the deal as
> an Evaluator contact role. The opportunity was open when the request arrived and was
> moved to Closed Won later in the test story.

### 04 Stop condition

Heading:

> What stops the automation?

Body:

> When the evidence is incomplete or points to two different relationships, the
> system stops. No Lead, Contact, or follow-up task is created. The inbound event waits
> in the Inbound Review queue with a reason that names the next step.

> The system never merges, converts, or deletes a record. Those steps stay with a
> person who can see the whole relationship.

E3 label:

> INBOUND REVIEW QUEUE

E3 caption:

> Five requests held for review, each with a reason that identifies the conflict and
> the step needed to resolve it.

### 05 Safeguards and verification

Heading:

> How does the build stay safe and traceable?

Intro:

> An integration can report success while it repeats work or loses a rejected request.
> These safeguards cover the failures that are easiest to miss.

Safeguard 1:

> **Repeat deliveries do not create repeat work.** A request that was already resolved
> or held returns as a duplicate. A rejected request can be corrected and sent again
> with the same ID.

Verification: `A resolved request was resent in automated tests. The event and Lead
counts remained one.`

Safeguard 2:

> **Rejected and failed requests remain visible.** Resolved, held, rejected, and failed
> requests are stored with a status and a reason. A repeat within the same delivery
> returns a result without a second record.

Verification: `Covered by automated tests.`

Safeguard 3:

> **The sending credential cannot read accounts.** The credential that submits
> requests has access to the inbound API only. It cannot read the account records the
> matching runs against.

Verification: `Checked with an automated access test.`

E5 label:

> REPORTING OVER THE RUN

E5 caption:

> The dashboard groups resolved requests by outcome and keeps requests waiting for
> review or rejected visible beside them.

Implementation checks:

- `58 Apex tests passed`
- `99% code coverage across the org`
- `9 sender tests passed`
- `16/16 expected results in a fresh org`
- `16/16 expected results through the Salesforce credential`

Scope statement, once:

> These results verify the implementation and reporting setup. They are not production
> business metrics.

Known limits remain:

- exact-domain matching does not automatically match a subsidiary to its parent;
- a correction under the same ID inside one delivery is a duplicate, while a later
  corrected resend works.

### 06 Implementation status

Heading:

> Where the build stands

Intro:

> The system is implemented in Salesforce and was exercised through the inbound
> credential. The repository can rebuild it in a fresh org, and the expected routing
> scenarios pass.

Subheading:

> Configured for each production org

Items:

- Replace controlled owners, queues, and records with the company's own.
- Connect the product sign-up and website demo form to the inbound API.
- Create the sending credential and run-as user in that org.
- Decide who owns the review queue and how quickly it is worked.
- Decide how subsidiaries and related domains match parent accounts.
- Add the release, monitoring, and recovery controls required by that environment.

Do not use `What would a live org need?` or introduce this section by saying the project
uses fictional data.

### Result and related project

Label: `RESULT`

Statement:

> The system acts when the CRM context is clear, stops when the evidence conflicts,
> and records why every request took its path.

Related body:

> Salesforce decides where an inbound request belongs. The HubSpot case study follows
> a lead after it enters the CRM.

Link:

> Next case study: Lead Routing & Pipeline Health System (HubSpot)

Do not render a large Schedule a Call block at the bottom. The global header already
contains that action. Do not use `I can help you`, `Build a CRM`, or similar agency
language in the close.

## 7. Static routing implementation

`SalesforceRoutingProofV2` becomes static at both placements: homepage and case study.

Remove:

- motion `useEffect` code;
- `IntersectionObserver` playback;
- timers and visibility listeners;
- active, dimmed, pause, and motion state;
- autoplay data attributes;
- Pause and Play controls;
- animated active-row styling;
- reduced-motion CSS that exists only for this animation.

Use one compact bordered composition with eyebrow, heading, request source, and four
static rows. The case page may be wider but must not use the current unframed `full`
two-column variant.

The whole proof must fit comfortably in a desktop viewport with part of the next
section visible. At 390 CSS pixels it stacks without overflow and shows every outcome.

Give every anchored heading enough `scroll-margin-top` that the sticky header cannot
cover it. Verify direct hash navigation.

## 8. Evidence recapture

Source project:

`C:\Users\Leo\Downloads\projects\salesforce-revenue-system`

CLI org alias: `leo-dev`

Source folder: `docs/evidence/`

Portfolio outputs: `src/assets/portfolio-v2/salesforce/`

A logged-in Salesforce Chrome tab may already exist. Otherwise use existing CLI
authorization. Never expose an authenticated URL, token, or secret.

Recapture all five images. General rules:

- move the pointer outside captured content;
- choose a browser viewport that closely fits the evidence;
- retain enough Salesforce chrome, object title, or dashboard title for context;
- exclude the browser address bar;
- do not retouch, fabricate, or reconstruct UI;
- no secrets, real personal data, org URLs, or client data;
- prefer viewport recapture over crop;
- a small crop may remove outer empty canvas only when context remains intact;
- keep high-quality source captures in the Salesforce repository;
- convert outputs to lossless WebP with metadata stripped;
- update source and output hashes in `ASSET-SOURCES.md`.

### E1 Inbound Events

Replace `1-inbound-events.jpg` and `inbound-events.webp`.

Must show list context, status, outcome, source, company, reason, and all 18 rows when
readable. The final three Growing Company S rows must remain. No pointer and no large
empty area below the list. Suggested shape: about 1200 by 820 to 880 pixels.

### E2 Resolved event

Replace `2-resolved-event.jpg` and `resolved-event.webp`.

Must show IE-000016, Resolved, Open Opportunity, linked account/contact/opportunity,
decision reason, and source request or payload where readable. Use a narrower viewport
so the detail panel fills the width. No blank right third. Suggested shape: about 900
by 900 pixels.

### E3 Needs Review

Replace `3-needs-review.jpg` and `needs-review.webp`.

Show Needs Review context, all five records, and readable email/company/reason fields.
Minimize empty space. Suggested shape: about 1200 by 560 to 680 pixels.

### E4 Deal owner result

Replace `4-deal-task.jpg` and `deal-task.webp`.

Show opportunity title, created follow-up task, task owner where readable, and Buyer S2
as Evaluator. Avoid unused lower area. Suggested shape: about 1200 by 760 to 840 pixels.

### E5 Dashboard

Replace `5-dashboard.jpg` and `dashboard.webp`.

Show the Inbound Resolution title, outcome chart, waiting-for-review count, and
rejected-or-failed count. End the capture shortly after the components. No large blank
canvas. Suggested shape: about 1200 by 500 to 600 pixels.

## 9. Evidence and section layouts

Section 02:

- E1 is the primary wide image.
- Do not show E1 and E2 as equal landscape cards.
- Give near-square E2 a layout suited to its shape, such as a five-column image and
  seven-column proof/caption block.
- Stack on mobile.

Section 03:

- Use a compact two-column outcome grid on desktop and one column on mobile.
- Do not border every line.
- Place E4 below the outcomes at a wide readable size.
- Do not put short text beside a tall image.

Section 04:

- Put readable explanatory copy above E3.
- Place E3 below as a wide list screenshot.
- Explain the conflict and human boundary in text rather than relying on tiny image
  text.

Section 05:

- Present safeguards as cards or compact columns, not ruled rows.
- Do not add nested 01, 02, 03 labels inside numbered Section 05.
- Keep each verification near its safeguard.
- Use E5 at the new shallow aspect ratio.
- Put checks and limits in quieter groups beneath it.

## 10. Visual-system corrections

Reduce line density. Each numbered section should normally use one main section
boundary and one frame per image. Do not stack section rules, evidence-heading rules,
row rules, and outer card borders around the same content.

Prefer spacing, alignment, typography, and subtle surface changes. Retain a clear scan
path and readable type sizes.

## 11. Scope boundary

Do not edit Booking Agent or HubSpot copy, layouts, or closing panels in this revision.
They share sandbox-framing and agency-close issues, but those need a separate approved
cross-case pass.

Do not add a site-wide NDA statement. A later portfolio-level note may distinguish
confidential client work from independent builds, but it must be reviewed separately.

Homepage order stays Booking, Salesforce, HubSpot, followed by the five standard
project rows from the live portfolio. There is no separate `/projects` index. The
Salesforce case-study route is
`/projects/trial-demo-routing-by-customer-relationship`.

## 12. Expected files

At minimum:

- `src/content/portfolio-v2/salesforce-trial-demo-routing.ts`
- `src/components/portfolio-v2/SalesforceRoutingProofV2.tsx`
- `src/components/portfolio-v2/SalesforceTrialDemoCaseStudyV2.tsx`
- `src/styles/portfolio-v2.css`
- five files under `src/assets/portfolio-v2/salesforce/`
- `src/assets/portfolio-v2/ASSET-SOURCES.md`

Modify shared types only if the simpler Salesforce structure genuinely needs it. Do
not change Booking or HubSpot content to make Salesforce types convenient.

## 13. Implementation order

1. Inspect Git status and preserve all existing changes.
2. Read authority and source files.
3. Update Salesforce content and exact copy.
4. remove routing motion and build the compact static visual.
5. Recompose sections and simplify Salesforce CSS.
6. Recapture all five evidence images.
7. Replace WebP outputs and update hashes.
8. Format and run scoped lint, TypeScript, production build, diff check, and voice audit.
9. Verify desktop, 390-pixel mobile, anchors, evidence viewers, and regressions.
10. Start and leave running a local production viewer.
11. Report URLs, Git status, checks, limitations, and `Decisions this turn:`.

Do not commit, push, merge, deploy, or publish.

## 14. Verification

Required code checks:

- Prettier on changed TS, TSX, and CSS
- ESLint on every changed TS and TSX file
- `tsc --noEmit`
- production Vite/Nitro build
- `git diff --check`
- voice audit
- no em dashes in public copy

The worktree uses canonical `node_modules` through a junction. Vite may need the
already established sandbox escalation for native Windows dependencies. Do not change
dependencies or package manager to avoid that known behavior.

Desktop browser acceptance:

- hero leads with value and working implementation;
- proof strip cannot be mistaken for business impact;
- routing is complete, static, compact, and has no Pause/Play control;
- next section appears soon after the routing proof;
- E1 has no pointer;
- E2 has no blank right third;
- Sections 03 and 04 have no dead column;
- E5 has no large blank canvas;
- lines do not dominate the page;
- close is result plus next project, not an agency CTA.

Mobile at 390 CSS pixels:

- no horizontal overflow;
- proof items wrap cleanly;
- all routing outcomes remain visible;
- evidence does not become tiny from desktop columns;
- headings remain logical;
- evidence viewers remain keyboard accessible;
- close stays concise.

Accessibility:

- one `h1` and logical heading order;
- descriptive alt text;
- no autoplay or moving content;
- image and visible action open the same viewer;
- Escape closes it and focus returns to the exact opener;
- visible focus and forced-colors behavior remain usable.

Regression:

- Booking and HubSpot case routes remain unchanged;
- homepage cards remain unchanged except for the added Salesforce case study and its
  slower repeated resolver;
- the homepage retains three case studies and five standard project rows;
- no `/projects` archive route or link is generated;
- Salesforce metadata and canonical route remain correct;
- header, utility dock, theme control, and global footer work.

## 15. Mandatory local viewer

A running local viewer is part of completion.

After the production build:

1. Start a production preview on `127.0.0.1`, preferably port `8082`.
2. Verify the homepage and title-derived Salesforce route in the browser.
3. Open the Salesforce route for Leo.
4. Leave the preview process running.
5. Report exact URLs.

Expected URLs on port 8082:

- `http://127.0.0.1:8082/#projects`
- `http://127.0.0.1:8082/projects/trial-demo-routing-by-customer-relationship`

Do not finish with only instructions for Leo to start the viewer.

## 16. Completion criteria

Complete only when:

- hero no longer leads with fictional/test-data language;
- working implementation and verification are obvious early;
- controlled-data context appears once at the evidence boundary;
- routing repeats at a readable cadence while visible, remains compact, and has no
  decorative playback control;
- no screenshot has a pointer or wasteful framing;
- no major section has tall evidence beside short text;
- line density is materially lower;
- claims and rollout boundaries remain truthful;
- agency-style close is removed;
- result and HubSpot next-project link are present;
- browser and code checks pass;
- local viewer is running and reported;
- no commit, push, merge, deployment, or publication occurred.

## 17. Approval record

Leo approved the full package on 2026-09-28:

1. The first page is not publication-ready.
2. Remove autoplay and Pause/Play everywhere.
3. Use one compact static visual at both placements.
4. Lead with implementation proof, not fictional-company context.
5. Disclose controlled data once at the evidence boundary.
6. Do not use NDA language to imply client production work.
7. Recapture all five screenshots.
8. Structurally recompose Sections 03 through 05.
9. Reduce redundant visual rules.
10. Integrate verification into safeguards.
11. Replace hypothetical rollout framing with implementation status and production
    configuration.
12. Remove the bottom agency-style CTA.
13. End with implemented result and the HubSpot next case study.
14. Keep Booking and HubSpot revisions out of scope.
15. Always deliver a verified, running local viewer.
