# n8n Booking Agent Case Study, Private Planning Spec

Status: approved first-release implementation completed locally. The homepage
failure-safe outcome record and case-study architecture handoff are approved and
implemented locally. Publication, deployment, and later media additions require
separate approval.

Date: 2026-09-15

## Purpose

Define how the n8n Booking Agent should enter the portfolio once the underlying
project is complete enough to represent accurately. The homepage introduces the
project as the featured owned case study. A dedicated route carries the working
demonstration, architecture, production-safety argument, verification, and stated
limits.

Approved route direction: `/projects/n8n-booking-agent`.

Approved public project title: `AI Booking Agent (n8n)`.

The public framing is **prompt-led versus production-safe**. "Entry-level versus
senior" remains a private build and review lens. Public copy demonstrates judgment
through evidence and does not assign Leo a seniority label.

## Authority and read order

Technical claims follow this order:

1. `../../n8n-booking-agent/docs/PROJECT-GOAL.md`
2. The newest `CURRENT STATE` block in
   `../../n8n-booking-agent/docs/build-decisions.md`
3. The approved design spec that owns the behavior
4. The current canonical workflow, source module, schema, and tests
5. Live observations recorded in the current-state block or completed plan

Security claim boundaries also use
`../../n8n-booking-agent/docs/security-audit-2026-09-15.md`. That audit is a
finding set, not an implementation spec or current-state authority.

Portfolio presentation follows:

1. `docs/PROJECT-GOAL.md`
2. `docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md`
3. `docs/PORTFOLIO-VISUAL-INTERFACE-SPEC.md`
4. `docs/PORTFOLIO-ASSET-IMAGERY-SPEC.md`
5. `docs/PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md`
6. `../../leo-sanga-brand/docs/BRAND-PLAYBOOK.md`
7. `C:/Users/Leo/.claude/voice.md`

The booking-agent README and original 2026-08-25 design spec are historical until
they are reconciled with the finished system. They must not be used as the source
for public capability claims. In particular:

- HubSpot was removed from the built scope and is only a narrated integration seam.
- Cancellation is a human-executed path routed to the rep.
- Zoom and Teams remain placeholder-link paths until an adopter wires the provider.
- The agent is not available for public visitor testing.

## Approved portfolio model

### Homepage

The booking agent becomes the featured project after its publication gates pass.
The entry keeps the homepage's established evidence sequence:

1. The problem
2. What I built
3. The hard part
4. Technology context

It adds a project-specific visual and one link to the case study. The homepage does
not contain the long-form comparison, a Loom call to action, or a loaded Loom
player.

Moving the current implementation-delivery system out of the featured position
must preserve access to its locked workflow evidence. `ProjectRowV2` does not
currently render that workflow, so changing only the `featured` flag is
insufficient.

### Dedicated route

The route uses this reading order:

1. A text-led hero with no call to action or architecture diagram
2. The problem, what Leo built, and the hard part
3. An optional demonstration poster and Loom path when the video is ready
4. Generic prompt-led topology beside the production-safe architecture
5. Four production-safety proof chapters with evidence placed inside each chapter
6. A short architecture-evolution section using only completed work
7. Final scope and limits
8. One tailored `Schedule a Call` close

When the first release has no Loom, omit step 3 completely. The architecture
comparison follows the overview, with no placeholder between them.

The hero metadata uses the label `TECH STACK` and presents the stack in the same
comma-separated form used by the other portfolio projects:

`n8n, JavaScript, PostgreSQL, Groq, Google Calendar API, Gmail API, Slack API`

The close keeps the live site's current `Schedule a Call` button and scheduling
context. Its approved project-specific message is:

- Heading: `Build a workflow that survives production.`
- Supporting line: `Map the failure modes before they become incidents.`

No outcome claim is drafted until the final behavior and its evidence are frozen.

## Case-study thesis

Working thesis, not final public copy:

Production safety came from moving guarantees out of model behavior and workflow
assumptions, then changing the architecture when live evidence disproved those
assumptions.

Leo selected this plain-language hero direction for the next copy pass:

> An AI booking agent built to stay accurate when a request is unclear or part of
> the booking process fails. The AI handles the conversation, while tested code
> decides whether anything can change.

This is an approved direction, not locked final wording.

### Selected overview direction

Working copy selected by Leo for the next case-study pass. This remains subject to
the final evidence and copy review.

**The problem**

> A booking workflow becomes unreliable when it assumes every request is clear and
> every connected system will respond as expected.

**What I built**

> I built an n8n booking agent where the AI handles the conversation and tested code
> checks every proposed action before the calendar can change.

**The hard part**

> The hard part was keeping the booking accurate when one system succeeded and
> another failed. Each failure needed a clear outcome so the next request would not
> inherit a broken or unfinished booking.

The final system remains the main subject. Development history appears only where
it proves a consequential judgment or explains why the architecture has its final
shape.

## Four proof chapters

Leo selected the reader-first Option A as the working public direction. The
technical notes under each chapter remain the evidence authority.

1. **The AI cannot book on its own.** The AI identifies what the user wants.
   Tested JavaScript checks the request before the workflow can create or change a
   booking.
2. **Two people cannot book the same time.** Postgres reserves the time before the
   calendar is changed. If another request arrives at the same moment, only one can
   continue. If a later step fails, the workflow releases the reservation safely.
3. **The workflow checks what really changed.** Meetings added outside the agent
   can be brought into its records without claiming that the agent created them. A
   missing calendar event does not automatically erase the booking history.
4. **Booking and calendar failures do not become success messages.** On the
   verified failure paths, the workflow stops the requested change, tells the
   guest what happened, records the result, and alerts the people who need to
   respond.

This is selected working copy, not locked final wording. Each claim still has to
pass the final evidence review.

### 1. Action authority

The model emits data. Deterministic code validates and routes it. A user-facing
statement that an action happened must come from the code path that performed it.

Pending additions such as code-written booking and reschedule confirmation stages
and the explicit chat responder become publishable evidence only after their plans
are built and verified.

### 2. Concurrency and safe recovery

The database admits one booking for a calendar and start time. Booking and
reschedule paths check the calendar, acquire the database lock, and respond
truthfully when another request wins. A refused lock is released only when Google
positively establishes that its event is gone. Unreadable state stays locked and
alerts a person.

### 3. Truth across systems

Calendar adoption makes rep-created meetings visible to booking, reschedule, and
cancel paths. Provenance distinguishes adopted rows from agent-created rows so a
repair can remain silent when no guest promise changed and alert the rep when an
agent confirmation became stale. Absence from a calendar response never deletes a
booking.

The calendar-first pre-model read remains approved design work in progress. Claims
that the model is fully grounded in current booking state stay blocked until that
bundle is built and verified.

### 4. Designed failure

Partial writes have compensation paths. Failures produce truthful guest replies,
audit outcomes, and notices to the operator and rep through the Notify boundary.
The notification result returns to the caller when the guest's next state depends
on whether the notice landed.

The proposed catch-all n8n Error Workflow remains undecided. The case study must
not imply coverage for executions the explicit error branches cannot see.

## First-release claim cut

Status: selected for the first public case-study version. This is a content and
evidence boundary, not final public copy.

First-release planning status, 2026-09-15:

- Launch claim cut: complete
- Targeted source and test check: complete
- Public-copy audit: next
- Site implementation: not started

The first release presents the current verified version as a completed portfolio
case study. It does not describe the entire engineering backlog, use an "in
progress" label, or imply that every production concern has been implemented.
Later verified improvements can update the page as normal project revisions.

### Primary claims

| Public idea                                                  | Evidence-backed meaning                                                                                                                           | Launch treatment                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| The AI cannot book on its own                                | The model emits data. Tested JavaScript validates and routes it before any booking action                                                         | Primary proof chapter                                                       |
| Two requests cannot take the same time                       | Postgres owns the slot lock, and compensation removes incomplete reservations after failure                                                       | Primary proof chapter                                                       |
| The workflow recognizes changes made outside the agent       | Calendar adoption records meetings created through the business's existing calendar path and preserves their origin                               | Primary proof chapter                                                       |
| Verified booking and calendar failures have defined outcomes | Explicit failure branches stop the requested change, return truthful guest copy, record the outcome, and attempt to notify the responsible people | Primary proof chapter, always scoped to the demonstrated and verified paths |

### Supporting claims

These may appear inside the related proof chapter or architecture-evolution
section. They do not need separate feature sections.

- Business settings are centralized instead of repeated through the workflow.
- Notifications use one shared workflow that returns whether delivery succeeded.
- Guest-controlled values use validation, parameterized database queries, and
  output escaping on the tested surfaces.
- Tested JavaScript is injected into the importable workflow so the tested source
  and generated node code do not silently drift.
- Conversation outcomes are recorded independently from the wording of the reply.
- Cancellation is deliberately handed to a person instead of claiming an
  automatic cancellation the workflow does not perform.

### Claims excluded from the first release

Do not state or imply any of the following:

- Every conversational statement is grounded in a current Calendar read.
- Booking and reschedule confirmation is already written by the pending
  confirmation-stage code.
- Every possible n8n execution failure reaches Notify.
- The chat response is independent of canvas execution order before the explicit
  responder work is verified.
- Empty model responses already have the pending fixed fallback and burst alert.
- Rate limiting, bot protection, or verified email ownership is built.
- The included Docker configuration is ready for public hosting.
- Multi-rep routing, multi-tenant isolation, queue mode, or high-volume operation
  is implemented.
- Zoom and Microsoft Teams are working provider integrations.
- HubSpot is part of the running workflow.
- The portfolio offers a live agent for visitors to test.
- Public outcome or conversion metrics exist.

### Required limits beside the launch evidence

- One configured rep calendar
- Google Calendar is the implemented calendar provider
- Google Meet is the working meeting provider; Zoom and Teams remain documented
  placeholders
- Cancellation is routed to a person
- The demonstration runs in Leo's private local environment
- Public deployment would require separate abuse controls, identity verification,
  and hardened hosting

### First-release page composition

The launch version contains:

1. Homepage project entry using the approved problem, build, hard-part, and
   technology structure
2. Dedicated text-led case-study hero and overview
3. Prompt-led-to-production-safe architecture handoff
4. The four primary proof chapters above
5. The four approved architecture-evolution stories
6. A concise limits section
7. The approved project-specific `Schedule a Call` close

The launch version may use one focused workflow capture as its primary real-system
evidence. Additional focused captures and the full-canvas panorama are optional.
The Loom section is added only when the recording and its transcript are ready.

### Targeted evidence check, 2026-09-15

The reduced launch set was checked against the current canonical workflow,
source modules, schema, repository tests, and the live verification records in
the newest booking-agent current state.

The targeted Node suite passed 132 of 132 tests across:

- Intent validation and sanitization
- Calendar adoption and provenance-aware repair classification
- Availability, reschedule, and booking-race behavior
- Stale slot-lock classification
- Confirmation-email escaping and recipient integrity
- Notify routing, channel results, and output escaping
- Source-to-generated-workflow injection checks

The database slot-lock and compensation claims continue to use their existing SQL
tests and recorded live concurrency evidence. Those database tests were not rerun
for this portfolio-only check because the selected claims and canonical workflow
have not changed.

Result: the four primary claims and the supporting claims above are eligible for
the public-copy pass with their stated limits. No `approved-pending` behavior was
promoted into the launch set.

## First-release public-copy pass

Status: approved by Leo, 2026-09-15. Previously approved wording is preserved.
The selected hero, comparison, metadata, and functional labels below are the
first-release copy set.

### Homepage entry

**Title**

> AI Booking Agent (n8n)

**The problem**

> A booking workflow becomes unreliable when it assumes every request is clear and
> every connected system will respond as expected.

**What I built**

> I built an n8n booking agent where the AI handles the conversation and tested code
> checks every proposed action before the calendar can change.

**The hard part**

> The hard part was keeping the booking accurate when one system succeeded and
> another failed. Each failure needed a clear outcome so the next request would not
> inherit a broken or unfinished booking.

**TECH STACK**

> n8n, JavaScript, PostgreSQL, Groq, Google Calendar API, Gmail API, Slack API

**Case-study link**

> See how the safeguards work

The homepage wording and functional link label above are approved.

### Case-study hero support

**Option A, not selected**

> An AI booking agent built to stay accurate when a request is unclear or part of
> the booking process fails. The AI handles the conversation, while tested code
> decides whether anything can change.

**Option B, selected**

> An AI booking agent designed to keep booking decisions accurate when a request is
> unclear or part of the process fails. The AI handles the conversation, while
> tested code controls whether anything can change.

**Option C, not selected**

> An AI booking agent that separates conversation from action. The AI understands
> the request, while tested code checks the booking before anything can change.

Option B narrows the accuracy claim to booking decisions. This avoids implying
that every model-written sentence is already grounded by the pending pre-model
Calendar read.

### Overview

Use the homepage problem, build, and hard-part copy again so a visitor who lands
directly on the case-study route receives the complete context. Do not add a
second introductory summary between the hero and these fields.

### Architecture handoff

Section heading:

> What changes in a production-safe build

Introductory line:

> This build separates the conversation from the actions and checks each proposed
> change against the systems that hold the booking.

**Comparison Option A, selected**

Prompt-led build:

> The AI is connected directly to the booking tools. It is expected to understand
> the request, decide what should happen, and carry it out. Instructions are the
> main safeguard.

Production-safe build:

> The AI proposes a booking action. Tested code validates it and checks the booking
> state before a connected system can change.

**Comparison Option B, not selected**

Prompt-led build:

> One model response can become a calendar action. If the model misunderstands the
> request, the connected tool can still carry it out.

Production-safe build:

> A proposed action passes through tested checks before it reaches the calendar.
> Invalid or incomplete requests stop before anything changes.

**Comparison Option C, not selected**

Prompt-led build:

> The instructions carry the guarantee. Correct behavior depends on the AI always
> following them.

Production-safe build:

> The architecture carries the guarantee. The AI can propose an action, while code
> and the database decide whether it is allowed to continue.

### Proof section

Section heading:

> How the workflow protects the booking

Proof chapter copy uses the four launch-safe chapters under `Four proof chapters`
above. Evidence appears inside its related chapter rather than in a separate
technical appendix.

### Architecture evolution

Section heading:

> How the architecture changed

Use the four approved stories under `Selected architecture-evolution stories`
without adding a chronological build diary.

### Designed to adapt

Section heading:

> Designed to adapt without rebuilding the core

Adaptability points:

- **Calendar connections are replaceable.** The current implementation connects
  to Google Calendar, but booking decisions are kept separate from the calendar
  connection. Another calendar platform can be added without rewriting the core
  workflow.
- **Meeting providers can change.** Google Meet is connected today. Zoom or
  Microsoft Teams can be substituted at the integration layer without changing
  how booking decisions are validated.
- **Business rules live in one place.** Hours, meeting rules, and business
  settings are centralized, so the workflow can be adapted for another business
  without changing logic throughout the canvas.
- **Unclear requests go to a person.** When a request falls outside the actions
  the workflow can safely complete, it routes the request to a person instead of
  guessing.

### Close

**Heading**

> Build a workflow that survives production.

**Supporting line**

> Map the failure modes before they become incidents.

**Button**

> Schedule a Call

**Scheduling context**

> 30 minutes · Google Calendar

### Search and sharing copy

**Page title**

> AI Booking Agent Case Study | Leo Sanga

**Meta description Option A, selected**

> An n8n booking agent case study showing how tested code controls booking
> decisions and keeps connected-system failures from becoming false success.

**Meta description Option B, not selected**

> See how Leo Sanga built an n8n booking agent with tested action checks,
> database-backed booking protection, and defined failure paths.

**Meta description Option C, not selected**

> A case study of an n8n booking agent designed around accurate booking decisions,
> competing requests, and failures across connected systems.

## Selected architecture-evolution stories

Use four concise stories. They cover different production decisions and remain
relatable outside a technical audience. Each story explains the original problem
and the resulting design change.

1. **The AI originally had too much responsibility.** Testing showed that
   instructions alone could not guarantee correct behavior. Booking decisions were
   moved into tested JavaScript.
2. **Notifications became shared infrastructure.** Notifications started as part
   of the main workflow. They moved into a separate workflow once several parts of
   the system needed to send them and confirm whether delivery succeeded.
3. **Business settings were centralized.** Business-specific settings live in one
   place so the agent can be adapted without changing logic throughout the
   workflow.
4. **The agent was not the only way a meeting could be booked.** Most businesses
   already have another booking path. The workflow needed to recognize those
   meetings so it would not offer a time that was already taken. It also keeps a
   record of where each booking came from.

The fourth story remains provider-neutral. Google Calendar appears in the
technology stack and implementation evidence, but the business problem and design
apply to an existing booking channel rather than one calendar product.

The section is not a chronological build diary. More project-specific findings,
including stale database locks after an external deletion, remain internal evidence
unless they are needed inside a proof chapter.

## Evidence matrix

Statuses:

- `verified`: built and supported by repository tests plus recorded live evidence
- `built`: present in the canonical export, with final portfolio verification owed
- `approved-pending`: Leo approved the design, but it is not implemented
- `historical`: useful decision context, not a current capability
- `blocked`: cannot become public evidence yet

| Candidate public claim                                                                         | Goal mapping                                              | Current status   | Technical authority and proof                                                                                                         | Planned evidence                                                                   | Required limit or caution                                                                                          |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The model cannot invoke action tools directly                                                  | Security is architecture, not prompt                      | verified         | `workflow/booking-agent-main.json`; `workflow/js/validate-intent.js`; `tests/validate-intent.test.js`; phase-boundary security review | Generic naive topology, production-safe architecture diagram, focused gate capture | Do not describe prompt injection as impossible; describe the action boundary                                       |
| One calendar slot cannot be booked twice under concurrent requests                             | Cannot double-book, even under concurrency                | verified         | `db/schema.sql`; `tests/sql/slot-lock-race.sh`; booking and phantom-lock current-state records                                        | Loom contention demonstration, slot-lock diagram, focused canvas capture           | One rep calendar in the current template                                                                           |
| Reschedule checks Calendar before locking and moving                                           | The agent never asserts system state it did not read      | verified         | phantom-slot-lock spec; `workflow/js/availability.js`; `tests/availability.test.js`; recorded live tests                              | Focused reschedule branch capture or diagram detail                                | Current-slot exclusion in refusal alternatives is still pending Bundle 2                                           |
| A stale database lock is released only after a positive Calendar result                        | Failure and partial state are designed, compensated paths | verified         | `workflow/js/slot-blocker.js`; `workflow/sql/release-blocker.sql`; related tests and live probes                                      | Blocker-recovery diagram or short demo excerpt                                     | Unreadable or in-flight blockers remain locked by design                                                           |
| Rep-created meetings can enter the agent's booking state when the guest asks                   | A stated limit must be a true limit                       | verified         | calendar-adoption spec; `workflow/js/adoption.js`; `workflow/sql/adopt-bookings.sql`; adoption tests                                  | Architecture diagram and focused adoption capture                                  | One calendar, 90-day window, attendee matching only                                                                |
| Calendar repair preserves origin and escalates only when an agent-created promise became stale | Preserve booking provenance across repair                 | verified         | `bookings.source`; adoption classifier and SQL tests; recorded repair-notice tests                                                    | Provenance decision diagram                                                        | The rep, rather than the agent, contacts the guest about a rep-made change                                         |
| A calendar read failure is never presented as an empty calendar                                | Failed reads are not empty state                          | verified         | calendar-adoption and Notify specs; current workflow error routes; live failure tests                                                 | Failure-path diagram and one demonstrated failure                                  | Final copy audit still pending                                                                                     |
| A partial calendar write is compensated and the guest is told the actual outcome               | Failure and partial state are designed, compensated paths | verified         | release-lock path; audit rows; booking and reschedule failure tests                                                                   | Failure path in architecture diagram                                               | Catch-all execution failures are not yet covered                                                                   |
| A failure alerts both the person fixing the system and the person responsible for the guest    | A failure reaches two people                              | verified         | Notify spec; `workflow/notify.json`; `workflow/js/notify.js`; Notify tests and live channel tests                                     | Notify boundary visual                                                             | Slack and Gmail share no dependency with Calendar, but Gmail remains a Google dependency for non-Calendar failures |
| The visible conversation and stored memory remain aligned                                      | Memory reflects the visible conversation                  | built            | `Save Assistant Reply`; memory tests and historical bug record                                                                        | Focused response/memory diagram                                                    | Explicit responder and empty-reply persistence are approved-pending                                                |
| The chat reply does not depend on canvas position or an adopter's added branch                 | Code commits and the agent narrates                       | approved-pending | guest-reply-path spec; n8n 1.121 source findings                                                                                      | Final responder path capture after implementation                                  | Do not publish as complete before Bundle 1 passes live regression tests                                            |
| Booking and reschedule confirmation is written by code after an availability check             | Code commits and the agent narrates                       | approved-pending | newest build-decisions Bundle 2 section 1 approval                                                                                    | Confirmation-stage diagram after implementation                                    | Stage schema, copy, and live behavior remain unbuilt                                                               |
| The model receives current guest booking facts from a Calendar-first read                      | The agent never asserts system state it did not read      | approved-pending | newest build-decisions Bundle 2 rulings                                                                                               | Grounding diagram after implementation                                             | Read is for narration only; action paths perform their own checks                                                  |
| Business rules and notice-channel replacement are isolated from core booking logic             | Adaptation is config, not code                            | built            | Config node; Notify sub-workflow; build mapping; setup notes                                                                          | Config and Notify boundary captures                                                | Calendar provider replacement is still code work; multi-rep is not built                                           |
| Tested JavaScript is injected into the importable workflow                                     | Tested source equals deployed source                      | verified         | `build-workflow.mjs`; build-workflow tests; canonical dist artifacts                                                                  | Small source-to-build-to-workflow diagram                                          | Several glue Code nodes remain explicitly unmapped and should be described accurately                              |
| Cancellation requests reach a person through a staged, repeat-safe path                        | Honest-and-working beats feature-rich                     | verified         | cancel-to-rep spec; `workflow/js/cancel.js`; cancel tests and live tests                                                              | Brief behavior note, not a primary demo branch                                     | The agent does not cancel the event itself                                                                         |
| Conversation outcomes are recorded independently from reply wording                            | Auditability and truthful state                           | built            | `db/schema.sql`; terminal audit taps; current workflow                                                                                | Verification section                                                               | Audit status and schema will change during the confirmation-stage work                                             |
| The template includes Google Meet and placeholders for Zoom and Teams                          | A stated limit must be a true limit                       | built            | Config and meeting-platform nodes; guest-reply-path design                                                                            | Limits section only                                                                | Zoom and Teams are not working integrations until an adopter wires them                                            |
| The public portfolio lets visitors run the agent                                               | None                                                      | blocked          | Explicit Leo ruling, 2026-09-15                                                                                                       | None                                                                               | The demo runs in Leo's own n8n; do not build or imply public access                                                |
| HubSpot is part of the running workflow                                                        | None                                                      | historical       | 2026-08-31 scope decision                                                                                                             | None                                                                               | Do not place HubSpot in project copy, stack, diagram, or demo                                                      |

## Media plan

### Primary architecture visual

Use a code-native diagram built from approved facts. It carries the comparison
between a generic LLM-to-tools topology and the production-safe architecture. It
uses the brand's workflow grammar and has a concise text equivalent.

### Loom

Use a locally hosted poster on the portfolio. The default recommendation is an
explicit external link to Loom so the current zero-third-party-runtime baseline
remains intact. A click-to-load embed is a later option only after a separate
privacy, consent, performance, data-retention, and network review.

Do not autoplay. Provide captions or a transcript and a written summary that
contains the essential evidence without the player.

The Loom is not a gate for the first public version of the case study. The first
release may omit the entire video section without displaying a placeholder or a
"coming soon" message. The video can be added to the published case study once
its demonstrated paths are ready.

The approved Loom direction is:

1. A successful booking
2. A controlled calendar outage

The outage is described as an unavailable calendar connection. Changing the
request URL does not demonstrate an authentication failure and must not be
presented as one. The guest-facing result shows that the workflow does not treat
an unreadable calendar as empty or offer unverified times.

Before recording the successful booking, the preferred high-impact workflow fix
is the code-written confirmation stage and its confirmation-time availability
check. Before showing the internal alert in the outage recording, the calendar
error classification and operator wording must accurately match the injected
failure. If those fixes are not ready, omit the affected scene or evidence rather
than imply that it is finished.

### Workflow captures

The canonical main export currently has 117 nodes, including 102 action nodes and
15 sticky notes. A normal-width full-canvas image cannot make all labels readable.

Plan for:

1. A focused model-to-validation capture
2. A focused slot-lock and blocker-recovery capture
3. A focused adoption or Notify-boundary capture
4. An optional expandable full-canvas panorama

The panorama ships only if the post-build legibility pass makes its topology useful
at the tested portfolio sizes. It is supporting authenticity evidence, not the main
explanation.

Screenshot captions and explanations remain live text. Do not bake paragraphs into
the raster assets.

### Demo-company email

The real amber Date Block confirmation email remains visually distinct from the
portfolio. It demonstrates that the workflow carries an adopter's business brand.
The surrounding case-study interface follows the Leo Sanga brand.

## Brand and interface requirements

- Follow brand working version `0.2.0` unless a later approved version is adopted
  through a separate portfolio change.
- Treat the portfolio's daytime theme as the primary presentation. Dark mode remains
  a secondary supported theme and does not control the art direction.
- Use the portfolio's warm daytime canvas, primary text, lavender, mist, and
  structural-line tokens exactly.
- Use Instrument Sans for reading and IBM Plex Mono for compact technical metadata.
- Use lavender for the primary signal and mist for technical relationships.
- Do not use coral as a validation, status, button, or interaction color.
- Do not encode prompt-led as red and production-safe as green. Labels, structure, and
  explanation carry the distinction.
- Prefer open editorial fields, fine rules, aligned columns, and a controlled grid.
- Avoid a repeated card grid, fake dashboard, terminal decoration, technology-logo
  wall, glow, or generic AI-startup treatment.
- Preserve meaningful reading order when desktop columns stack on narrow screens.
- Supply a reduced-motion completed state for any signal-path animation.

## Known public limits to verify at content freeze

- One configured rep calendar
- Local demonstration, with no public agent endpoint
- Google Calendar as the implemented calendar provider
- Google Meet working; Zoom and Teams represented by documented placeholder paths
- Cancellation carried to the rep rather than executed automatically
- HubSpot and another CRM represented only as possible swap-in seams
- No claim of 1,000-client deployment, queue mode, multi-tenant isolation, or a local
  availability table
- No claim that every n8n execution failure reaches Notify unless Bundle 3 adds and
  verifies the catch-all Error Workflow
- No claim that the workflow has rate limiting, bot protection, or verified email
  ownership
- Local Docker configuration is demonstration infrastructure, not a public
  production-hosting recipe
- Chat-history retention does not imply that every stored email address has an
  enforced retention period
- No public outcome metrics without a verified source and context

## Publication gates

Publication is claim-scoped, not backlog-scoped. A remaining project item blocks
publication only when at least one of these is true:

1. Public copy depends on that behavior.
2. Public media demonstrates that behavior.
3. Current behavior directly contradicts a public claim.
4. Publication creates the exposure that the item is meant to control.

Because the portfolio does not expose a live agent, unfinished public-endpoint,
identity, rate-limit, and deployment controls do not block the first case-study
release. Their absence must remain explicit in the claim boundaries and limits.

The first public version requires only these gates:

1. **Launch claim cut.** Select a small set of claims whose status is `verified`
   or whose `built` status is confirmed against the current canonical export.
   `approved-pending`, `historical`, and `blocked` rows do not become public claims.
2. **Targeted evidence check.** Check only the launch claims against the canonical
   workflow, source modules, schema, tests, and recorded live evidence. Remove or
   qualify anything that is not supported.
3. **Public-copy audit.** Review only the homepage entry, case-study copy,
   captions, limits, CTA, metadata, and accessible text. A full workflow-message
   or README copy audit is follow-up work unless the public page quotes it.
4. **Launch media check.** Review only assets that will ship. Focused workflow
   captures do not require a full-canvas legibility pass. The Loom and full-canvas
   panorama are optional follow-up assets.
5. **Claim boundaries.** State that the agent is not publicly accessible, the
   Docker environment is local-demo infrastructure, and spam protection and email
   verification are not built.
6. **Site QA.** The homepage entry and dedicated route pass responsive,
   accessibility, reduced-motion, no-JavaScript, privacy, performance, metadata,
   and supported-browser checks in proportion to what ships.
7. **Approval and publication.** Leo approves the final launch copy and media, and
   publication receives a separate production approval.

The following are not first-release gates unless a launch claim or asset depends
on them:

- Completion of Bundles 1, 2, and 3 in full
- The full booking-agent re-evaluation
- The full copy repurposability audit
- The full-canvas legibility pass
- Rate limiting, bot protection, or email verification
- The Loom recording
- README reconciliation outside statements used by the public page

## Content-freeze procedure

For the first portfolio release:

1. Re-read the booking agent's PROJECT-GOAL and newest current state.
2. Mark the small set of matrix rows selected for launch.
3. Compare those rows with the canonical export, source modules, schema, tests,
   and live results.
4. Remove, relabel, or qualify every selected claim that is pending or
   contradicted.
5. Record the relevant limits beside the related evidence.
6. Draft and audit only the copy that will ship, with complete wording options for
   Leo to review.

The broader project re-evaluation continues on the booking agent's own schedule.
Later verified improvements may update the published case study without making
the first evidence-backed version incomplete or retroactively inaccurate.

## Anticipated portfolio implementation surface

Status: proposed implementation design, awaiting Leo's approval. No source edit,
deployment, or publication is authorized by this section.

### Active senior perspectives

- Senior portfolio and conversion strategist
- Senior UX and content designer
- Senior brand systems and interface designer
- Senior frontend architect
- Senior accessibility and performance engineer
- Senior privacy-minded implementation reviewer
- Senior QA and release engineer

### Implementation outcome

Add the booking agent as the homepage's featured project and create the approved
`/projects/n8n-booking-agent` case-study route. The first release is a complete
text-and-evidence case study with no Loom, screenshot placeholder, public agent,
new dependency, or deployment change.

The existing implementation-delivery project moves to position 02. Its approved
workflow disclosure remains accessible even though that project is no longer the
featured card.

### Visual thesis

Extend the current daytime portfolio as an editorial systems case study. The page
uses the existing pale canvas, fine structural rules, Instrument Sans, and compact
IBM Plex Mono metadata. Lavender identifies action authority. Mist identifies
system relationships. The dark theme remains supported by the same semantic
tokens but does not set the art direction.

The distinguishing case-study visual is a scroll-led architecture handoff after
the overview. It begins with a prompt-led path, then reveals the responsibilities
added to make the workflow production-safe. Structure and labels show the
difference without red-versus-green status color, terminal decoration, or
tool-logo imagery.

### Homepage behavior

1. Insert `AI Booking Agent (n8n)` at the start of the project collection and make
   it the single featured project.
2. Preserve the approved problem, build, hard-part, and tech-stack sequence.
3. Add one quiet bottom-row link, `See how the safeguards work`, to the dedicated route.
   It uses the existing mist relationship color and does not compete with the
   page's `Schedule a Call` action.
4. Add the approved failure-safe booking outcome record. Do not add a Loom button,
   proof-skip link, status badge, or unfinished-project label to the homepage card.
5. Move the implementation-delivery project to the first standard row and render
   its existing workflow disclosure inside that row. No locked copy or flow data
   changes.
6. Update the project-count assertion from five to six while retaining the
   exactly-one-featured assertion.

The first homepage release does not require project imagery. Its code-native
outcome record explains one operational safeguard without reproducing the n8n
canvas. A focused n8n capture can be added later without changing the card's
content order.

### Dedicated route behavior

The route renders complete server-visible HTML in this order:

1. Compact case-study navigation with Leo's identity linking home, a `Projects`
   return link, and the existing `Schedule a Call` control
2. Text-led hero with the approved title, selected hero support, and `TECH STACK`
3. Overview with the approved problem, build, and hard-part copy
4. Scroll-led prompt-led-to-production-safe architecture handoff
5. Four proof chapters using the launch-safe claim cut
6. Four approved architecture-evolution stories
7. Current-scope limits
8. The approved case-specific close
9. Existing portfolio footer and utility dock

No empty Loom region is rendered. Adding the video later inserts it between the
overview and architecture handoff, as already approved.

### Architecture handoff behavior

Use semantic HTML and CSS rather than a raster illustration or third-party
diagram library.

- A sticky visual on desktop begins with the prompt-led path and reveals the
  production-safe responsibilities as the related explanation enters view.
- The prompt-led path shows the AI connected directly to booking tools, with
  instructions as the main safeguard.
- The production-safe path shows the guest request, AI proposal, tested
  validation, booking state check, and connected action.
- `Authority boundary` marks the tested-validation step.
- The complete final architecture is present in server-rendered HTML and remains
  understandable with CSS disabled.
- On mobile, with reduced motion, or without JavaScript, the complete
  production-safe state is shown without a scroll-controlled transition.
- No real third-party workflow is named, linked, quoted, or reproduced.
- The handoff responds to reading progress and does not run as a continuous loop.

### Proof and evidence behavior

Each proof chapter pairs the approved plain-language explanation with a compact
evidence line sourced from the launch matrix. Evidence is rendered as text, not
as an evaluator-facing appendix.

- AI authority: tested validation module and generated-workflow synchronization
- Competing bookings: database uniqueness rule and recorded live race behavior
- External changes: adoption and provenance tests
- Failure paths: explicit booking and Calendar branches plus Notify delivery tests

Do not display pending claims, internal file paths, raw test logs, development
history, or the number of unfinished tasks. Do not add an outcome section because
there is no verified public business outcome to report.

### Navigation and theme behavior

- Keep the current homepage scrollspy navigation unchanged.
- Use a separate compact case-study header because homepage hash navigation does
  not describe a dedicated route.
- Change the utility dock to accept a home destination. It remains `#top` on the
  homepage and becomes `/` on the case-study route.
- Reuse the existing theme bootstrap and theme control. Light remains the first
  visit default, and the stored visitor preference remains respected.
- The case-study `Projects` link points to `/#projects`.

### Content and data contracts

Add an optional `caseStudyPath` to `ProjectViewModel`. Keep the booking-agent
homepage data and dedicated-page copy in a project-specific content module so
the same approved strings are not copied into several components.

The existing five legacy projects continue to come from their current source.
The booking agent is added around that mapping rather than rewriting locked
legacy content. Legacy `featured` values are normalized to false in the version
2 view model so the new project remains the only featured entry.

### Metadata and external behavior

- Page title: `AI Booking Agent Case Study | Leo Sanga`
- Meta description: the selected Option A copy in this document
- Canonical URL: `https://leosanga.vercel.app/projects/n8n-booking-agent`
- Open Graph type: `article`
- Open Graph and X title and description match the route metadata
- Do not create or replace a social image. No project-specific image was
  requested, and the route must not inherit an unrelated homepage image.
- The only external action is the existing `Schedule a Call` destination.
- No third-party video, analytics, public chat, or new runtime request is added.

### Responsive and accessibility behavior

- Keep body text at 16px or larger and functional labels at 14px or larger.
- Preserve one reading order when desktop columns stack.
- Keep the architecture sequences readable at 200 percent text zoom.
- Use real headings, lists, figures, captions, links, and landmarks.
- Include a skip link to the case-study main content.
- Keep visible keyboard focus through the existing global focus treatment.
- Do not use color as the only difference between the two architectures.
- Avoid horizontal scrolling at narrow widths.
- The architecture handoff keeps its complete final state under reduced motion and
  at compact breakpoints. Existing site motion and theme controls retain their
  current reduced-motion behavior.

### Affected files

Expected source changes:

- `src/content/portfolio-v2/types.ts`
  - Add the optional case-study path contract.
- `src/content/portfolio-v2/booking-agent.ts`
  - New single source for the approved homepage and case-study content.
- `src/content/portfolio-v2/content.ts`
  - Add the booking agent, normalize legacy featured state, and update collection
    assertions.
- `src/components/portfolio-v2/FeaturedProjectV2.tsx`
  - Render the case-study link when a path exists.
- `src/components/portfolio-v2/ProjectRowV2.tsx`
  - Preserve a legacy workflow disclosure after its project moves out of the
    featured position.
- `src/components/portfolio-v2/PortfolioUtilityDockV2.tsx`
  - Accept a route-appropriate home destination.
- `src/components/portfolio-v2/BookingAgentArchitectureV2.tsx`
  - New semantic, scroll-led architecture handoff.
- `src/components/portfolio-v2/BookingAgentCaseStudyV2.tsx`
  - New dedicated narrative page and compact route header.
- `src/routes/projects/n8n-booking-agent.tsx`
  - New route and approved metadata.
- `src/styles/portfolio-v2.css`
  - Extend the existing token-driven system for the homepage link, moved workflow
    disclosure, and case-study route.
- `src/routeTree.gen.ts`
  - Generated by TanStack tooling. Never edited by hand.

No dependency, lockfile, global brand token, existing project copy, existing
project flow data, social image, or media asset was changed.

### Known limits

- The launch contains no Loom or real workflow capture.
- The architecture handoff is explanatory evidence, not a reproduction of the
  117-node n8n canvas.
- The case study describes the verified workflow version selected in the launch
  matrix. Later engineering changes require a claim check before updating copy.
- No public chat or production hosting configuration is added.
- The current portfolio has no automated application test suite.

### Verification

Before handoff:

1. Run the local TypeScript compiler with `./node_modules/.bin/tsc.exe --noEmit`.
2. Run `bun run build` and allow TanStack to regenerate the route tree.
3. Run the existing lint command and separate the documented CRLF and hook-warning
   baseline from new errors.
4. Confirm the homepage has six projects and exactly one featured project.
5. Confirm the implementation-delivery workflow disclosure still opens and is
   fully readable.
6. Confirm the case-study route renders the selected copy with no Loom placeholder.
7. Confirm the homepage and route expose one primary scheduling action and no
   competing hero action.
8. Confirm internal navigation works from the homepage and case-study route.
9. Confirm complete content remains available without client-side interaction.
10. Confirm narrow layout, keyboard focus, 200 percent text enlargement, light and
    dark themes, and reduced-motion behavior.
11. Confirm the route requests no Loom, tracking, or other new third-party runtime.
12. Confirm metadata and canonical URL match the approved copy.
13. Inspect the final Git diff and keep unrelated current worktree changes out of
    the implementation.

Implementation remains local. No commit, push, Vercel action, or production
publication is included without separate approval.

### Local implementation record, 2026-09-15

The approved homepage entry and dedicated route are implemented locally. The
production build, TypeScript check, targeted ESLint, targeted Prettier check, and
Git whitespace check pass. TanStack generated the route-tree update.

Chrome verification covered the light-first desktop layout, the secondary dark
theme, a 390 px mobile viewport, the complete semantic reading order, the moved
implementation-delivery disclosure, and the absence of horizontal overflow or
Loom placeholder content. The existing theme-bootstrap hydration warning appears
on both the homepage shell and the new route; it is recorded as a baseline issue,
not introduced by this case study.

Full cross-browser, keyboard, 200 percent text, and production checks remain part
of the pre-publication review. The local preview has not been committed, pushed,
or deployed.

## Homepage booking-response experience

Direction and implementation approved by Leo on 2026-09-15.

### Senior perspectives applied

- Senior product and portfolio designer for differentiation and visitor value
- Senior conversion strategist for recruiter and business-owner scanning
- Senior interaction and motion designer for information-carrying movement
- Senior brand systems designer for authored visual continuity
- Senior frontend architect for a reusable project-proof boundary
- Senior accessibility and performance engineer for semantic fallbacks and cost
- Senior automation architect for claim accuracy and system behavior

### How the homepage visual direction was selected

The selection started with the value a visitor should understand at first glance,
rather than with the size or appearance of the n8n canvas. A homepage visitor
should be able to recognize the business risk, see the protected outcome, and
understand the engineering judgment without opening the case study.

The design developed through these decisions:

1. A full-canvas screenshot was rejected as the primary visual because the scale
   makes the workflow hard to read and rewards apparent complexity instead of
   explaining value.
2. Reusing Project 2's moving system path was rejected because every featured
   project should have a visual language that reflects its own proof. Repeating
   the same animation would make the projects feel templated.
3. The first booking scenario used two people requesting the same time. It proved
   concurrency handling, but it was less immediate as a common business concern
   and needed more explanation before the value became clear. It remains stronger
   as deeper case-study evidence.
4. A booking-calendar failure became the homepage scenario because the problem is
   familiar, the consequence is serious, and the safe response can be understood
   without technical knowledge.
5. The selected headline puts the failure first and the protected outcome second:
   "When the booking calendar fails, the agent stops before it sends a false
   confirmation."
6. An operational outcome record became the visual form because status, failure,
   recovery, and follow-up are the proof. It also creates a different experience
   from Project 2's route animation.
7. Motion reveals the incident in causal order and resolves to a complete record.
   The pause and hidden reset prevent a partial next pass from appearing before
   the current pass has finished.
8. The final state remains complete for server rendering, reduced motion, hidden
   tabs, and unavailable JavaScript. Motion adds explanation and never owns the
   evidence.

The reusable lesson is to earn the visual form from the project's strongest
visitor-facing proof. The first line should carry a common problem and its
consequence. The visual should show one meaningful state change, use a form that
belongs to that project, and leave a clear resting result. Technical depth belongs
in the case study after the homepage has already communicated why the work matters.

For future homepage project visuals, review these questions before choosing an
animation:

1. Can a recruiter or business owner understand the problem in the first line?
2. Does the resting state communicate value without motion?
3. Is the visual form materially different from the other featured projects?
4. Does each animated change explain cause, control, or outcome?
5. Is every visible claim supported by the project's evidence authority?
6. Does the case study add depth instead of repairing an unclear homepage card?

### Experience outcome

The booking-agent card receives an always-visible, code-native outcome record
focused on a familiar, high-impact failure: the booking-calendar connection fails
after a valid request arrives. The record resolves each important state and shows
that the system stops before sending a false confirmation.

This experience answers a different question from the implementation-delivery
project. That project explains how work moves through a large workflow. The
booking agent demonstrates how the system behaves when a connected service fails
during a booking.

The experience is explanatory. It does not connect to the live workflow, make a
booking, use real customer data, or claim that a live simulation ran.

### Homepage composition

At wide desktop sizes, the featured card uses a 12-column internal composition:

- The approved problem, build, and hard-part copy occupies columns 1 through 5.
- The booking-response experience occupies columns 7 through 12.
- The tech stack and `See how the safeguards work` link form one full-width footer.

At laptop and tablet sizes, the proof experience moves below the complete project
copy. On mobile, the copy, outcome record, tech stack, and case-study link form one
semantic vertical sequence. The interaction must not use horizontal
scrolling at 320 px.

The visual uses the existing day-theme canvas, fine rules, Instrument Sans, and
IBM Plex Mono metadata. A compact operational record replaces the moving route
used by the previous featured project. Labels and state markers carry meaning in
addition to color. The dark theme receives the same hierarchy with existing dark
tokens.

No glow, gradient, robot imagery, calendar mockup, screenshot, stock asset, or
full workflow diagram is added.

### Permanent control statement

The visual includes this short statement above the active route:

`AI proposes. Tested code decides.`

It stays visible because it explains the system boundary behind the demonstrated
outcome.

### Demonstrated situation

Experience heading:

`When the booking calendar fails, the agent stops before it sends a false confirmation.`

Visual labels:

- `Request: Tuesday, 3:00 PM`
- `Rule check: Passed`
- `Time: Released`
- `Booking calendar: Connection failed`
- `Booking status: Not confirmed`
- `Follow-up: Team alerted`

The rows resolve in operational order. The failed connection never changes into a
successful booking state, the temporary hold is released, and the follow-up state
records that the team was alerted.

Outcome heading:

`No false confirmation is sent.`

Outcome body:

`The guest gets a clear response. The temporary hold is released and the team is alerted.`

### Interaction and motion

- The complete final record and outcome are visible in the server-rendered page.
- The row sequence runs when the experience enters the viewport and repeats on a
  calm 6.5-second cadence while it remains visible and the document is active.
- A short hidden reset separates complete passes so the next pass does not appear
  to start before the previous one ends.
- Only opacity, color, and status-marker treatment animate.
- No height, width, margin, padding, or measured section wrapper animates.
- Playback stops when the experience is outside the viewport or the document is
  hidden.
- The pause between passes keeps the movement readable rather than continuous.

Under `prefers-reduced-motion: reduce`, the final record and outcome remain
complete and no delayed sequence runs.

### Accessibility behavior

- The changing visual record is decorative to assistive technology.
- The situation and its complete outcome remain ordinary text.
- Color never carries the only indication of success, interruption, or branch.
- With JavaScript unavailable, the situation, control statement, route labels,
  and outcome remain complete and truthful.
- At 200 percent text enlargement, the route labels and outcome remain visible
  without clipping.

### Reusable project-proof boundary

Add an optional discriminated `proofExperience` definition to
`ProjectViewModel`. A small `ProjectProofExperienceV2` dispatcher renders a
project-specific module for each approved kind. The first kind is
`booking-reliability` and renders `BookingReliabilityProofV2`.

This boundary standardizes semantic framing, reduced-motion handling, visibility
pausing, and theme integration. It does not force future projects into the same
visual or interaction. A future project adds a new approved kind and its own
module. The existing implementation-delivery workflow disclosure remains
unchanged and does not pass through this dispatcher.

### Expected files

- `src/content/portfolio-v2/types.ts`
  - Add the optional proof-experience contract.
- `src/content/portfolio-v2/booking-agent.ts`
  - Add the approved situation, route-label, and outcome copy.
- `src/components/portfolio-v2/FeaturedProjectV2.tsx`
  - Give the featured card an explicit summary, proof, and footer composition.
- `src/components/portfolio-v2/ProjectProofExperienceV2.tsx`
  - Add the small project-proof dispatcher.
- `src/components/portfolio-v2/BookingReliabilityProofV2.tsx`
  - Add the booking-specific visual, state, and playback behavior.
- `src/styles/portfolio-v2.css`
  - Add the responsive visual and motion states using existing tokens.

No route, case-study copy, dependency, lockfile, raster asset, video, social
image, analytics, or deployment change is included.

### Verification gate

Before handoff:

1. Recheck the demonstrated outcome against the booking-agent technical authority.
2. Run TypeScript, the production build, targeted ESLint, Prettier, and Git
   whitespace checks.
3. Verify default SSR output and the no-JavaScript state.
4. Verify the repeated cadence starts only while the proof is visible.
5. Verify 320, 390, 768, 1024, and 1440 px layouts with no horizontal overflow.
6. Verify light, dark, reduced-motion, increased-text, and forced-color states.
7. Verify repeated playback, offscreen pause, hidden-tab pause, and reduced-motion
   behavior.
8. Confirm that Project 2's disclosure and workflow playback are unchanged.
9. Confirm there is no new third-party request or initial-route dependency.
10. Keep the result local until Leo separately approves publication.

## Decisions recorded

Approved by Leo on 2026-09-15:

- Public project title: `AI Booking Agent (n8n)`
- Featured homepage entry plus dedicated case-study route
- Text-led case-study hero with no hero calls to action or architecture diagram
- Hero copy direction: an AI booking agent that stays accurate when a request is
  unclear or part of the booking process fails; AI handles the conversation and
  tested code decides whether anything can change
- Overview working direction combines Option C for `The problem` with Option A for
  `What I built` and `The hard part`
- Hero metadata label `TECH STACK`, followed by the comma-separated stack: `n8n,
JavaScript, PostgreSQL, Groq, Google Calendar API, Gmail API, Slack API`
- Project overview before the Loom demonstration
- Reader-first Option A selected as the working copy for all four proof chapters
- Four-story architecture-evolution section covering AI authority, shared
  notifications, centralized business settings, and recognition of bookings made
  through an existing business channel
- Fourth architecture-evolution heading selected as `The agent was not the only way
a meeting could be booked.`
- Purpose-built prompt-led-to-production-safe handoff placed after the overview and
  demonstration
- Focused real workflow capture used as the primary project media
- Full-canvas capture treated as optional supporting evidence
- Loom reached through an explicit visitor action, with the external-link approach as
  the default pending privacy and performance review
- Daytime theme as the primary presentation and dark mode as secondary
- One tailored bottom call to action using:
  - Heading: `Build a workflow that survives production.`
  - Supporting line: `Map the failure modes before they become incidents.`
  - Button: `Schedule a Call`
  - Scheduling context: `30 minutes · Google Calendar`
- Evidence placed inside the relevant proof chapters rather than repeated in a public
  evidence-planning section
- Evidence matrix before wireframe or public copy
- Claim-scoped publication gates replace completion of the entire booking-agent
  backlog as a prerequisite
- The first case-study release may omit the Loom section without showing a
  placeholder; the Loom is added later when its demonstrated paths are ready
- The approved Loom scenarios are a successful booking and a controlled calendar
  outage, described as an unavailable connection rather than an authentication
  failure
- The first release needs a targeted check of launch claims and public copy, not a
  full project re-evaluation or full workflow-copy audit
- Only the workflow areas used in public captures need a pre-launch legibility
  pass; the full canvas remains optional
- Remaining Bundles 1, 2, and 3 block publication only where public copy, media, or
  exposure depends on their unfinished behavior
- First-release copy selection: hero Option B, architecture-comparison Option A,
  and meta-description Option A
- First-release functional labels:
  - `See how the safeguards work`
  - `What changes in a production-safe build`
  - `How the workflow protects the booking`
  - `How the architecture changed`
  - `Designed to adapt without rebuilding the core`
- Homepage visual direction: use a plain-language operational outcome record,
  distinct from Project 2's moving workflow-disclosure experience
- Homepage proof scenario: the booking-calendar connection fails during a valid
  booking request
- Homepage proof heading: "When the booking calendar fails, the agent stops before
  it sends a false confirmation."
- Homepage proof outcome: "No false confirmation is sent." followed by "The guest
  gets a clear response. The temporary hold is released and the team is alerted."
- The homepage proof resolves its record in sequence, repeats on a calm 6.5-second
  cadence, and has no scenario selector or replay control.
- The case-study architecture uses a scroll-led prompt-led-to-production-safe
  handoff on desktop and a stable final state on mobile or with reduced motion.

Leo approved the local first-release implementation. Publication was not approved.
