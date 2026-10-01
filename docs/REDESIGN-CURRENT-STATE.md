# Portfolio Redesign Current State

Last updated: 2026-10-01

## Current phase

Gate 4 is complete. Pull request 1 was merged through merge commit `b0bbd04`,
and Vercel successfully deployed that commit to production. The canonical site
at `https://leosanga.vercel.app/` now serves portfolio version 2.

The HubSpot CRM case-study release is also complete. Commit `debe80d` is on
`main`, Vercel marked its production deployment successful, and the canonical
site now serves the project from `/projects/lead-routing-pipeline-health-system`.

## Repository state

- Original worktree: `C:\Users\Leo\Downloads\projects\portfolio-vercel`
- Original branch: `main`
- Redesign worktree: `C:\Users\Leo\Downloads\projects\portfolio-vercel-redesign`
- Redesign branch: `redesign/v2`
- Planning commit: `a767ce7fc6a7cc684b7d6127d0cd11995f1804f9`
- Gate 1 implementation checkpoint: `a4d34c7728d6d35007da3873882a4b1ff62ffd44`
- Positioning and workflow revision checkpoint: `cf621e6`
- Project-label and conversation revision checkpoint: `0c21ec8`
- Adaptive-theme and utility-dock checkpoint: `e28481b`
- Transparent workflow favicon checkpoint: `492cdcb`
- Light-default, social-card, and QA checkpoint: `6e35760`
- Final visual approval checkpoint: `6368990`
- Reversible homepage cutover checkpoint: `5240bfc`
- Version 1 baseline commit: `de93ea40bddbcf08cce6bb391bf6df1e5e0e6dd2`
- Version 1 baseline tag: `portfolio-v1-baseline-2026-09-10`
- GitHub branch: `redesign/v2` published
- Gate 3 implementation and evidence checkpoint: `85bdd2d`
- Pull request: `https://github.com/leosanga/portfolio-vercel/pull/1`
- Pull request state: merged
- Application cutover merge commit: `b0bbd04cd567711dd6562083ef6f8c4830db0cbd`
- Vercel Preview:
  `https://leosanga-hd7gwe7tp-leo-c2f6.vercel.app`
- Application cutover Vercel deployment: `6385275062`
- Deployment URL: `https://leosanga-po6wvj3jq-leo-c2f6.vercel.app`
- Canonical production URL: `https://leosanga.vercel.app/`
- HubSpot CRM case-study release commit: `debe80d94bbf203efac725d2ee973f155d05e8ae`
- HubSpot production route:
  `https://leosanga.vercel.app/projects/lead-routing-pipeline-health-system`

## Local review surfaces

- Version 1 reference: `http://127.0.0.1:8080/`
- Version 2 development surface: `http://127.0.0.1:8081/`
- Version 2 production candidate: `http://127.0.0.1:8082/`

Process identifiers are recorded when the servers are started. Do not stop a
port broadly.

## Latest approval

Leo approved the frontend architecture and QA plans and explicitly authorized
Gate 1 local implementation on 2026-09-10. This permits local file changes,
asset production, verification, localhost review, and local commits within the
approved redesign worktree.

On 2026-09-11, Leo approved the requested light-default behavior and the final
social-sharing image. Leo then completed the Windows screen-reader check and
confirmed that it passed without problems. Gate 2 is complete, and Leo
authorized local Gate 3 preparation.

Leo explicitly authorized Gate 3 on 2026-09-11: push `redesign/v2` and open the
pull request. The branch and pull request are now published. This approval does
not authorize merging or production cutover.

After reviewing the Gate 4 instructions, Leo approved the production cutover on
2026-09-11. Pull request 1 was merged with a merge commit as required by the
rollback plan, and the resulting Vercel production deployment completed
successfully.

On 2026-09-27, Leo approved the final HubSpot case-study recommendations, the
shared case-study hero scale, and deployment. Commit `debe80d` was pushed to
`main`, and Vercel completed the production deployment successfully.

## Current implementation state

- Approved planning artifacts committed locally.
- Immutable version 1 baseline tag created locally.
- Sibling worktree and `redesign/v2` branch created.
- Existing dependencies installed from the locked dependency graph.
- ImageMagick confirmed with HEIC, AVIF, WebP, JPEG, and color-profile support.
- Approved free font sources downloaded from their official repositories.
- Version 2 portrait derivatives were produced from the read-only HEIC master
  under new filenames. The master remains outside the redesign worktree.
- The production candidate serves the approved version 2 composition at `/`.
  The private `/redesign` route has been removed and returns 404.
- The featured project uses native disclosure semantics, semantic workflow
  nodes, and a decorative connector layer.
- The scoped visual system, responsive art direction, one-time entrance
  choreography, scroll-aware navigation, portrait depth, and interaction
  feedback are implemented without a new motion dependency.
- The approved role line, `Systems Engineer: Integration + Automation`, now
  appears directly below the portrait in place of the decorative four-part
  caption.
- Capabilities now use a compact four-column matrix on wide screens, two
  columns at medium widths, and one column on mobile. `AI + Intelligent
Automation` is a distinct second capability so it is visible to skim readers
  without replacing the primary Systems Integration + Automation identity.
- Every project evidence row now uses `The hard part` rather than `Constraint`.
- Project evidence labels now use the uniform sequence `The problem`, `What I
built`, and `The hard part`.
- The final conversation opens with `The best solutions start with` and renders
  each supporting sentence as a separate stacked paragraph for faster scanning.
  Its supporting type is smaller and more compact so the call action holds the
  correct visual weight.
- A persistent utility dock now provides Home, Email, LinkedIn, and theme
  controls. Home uses the approved three-node identity mark. Pointer proximity
  magnification is capped at 1.14 and is disabled for coarse pointers and
  reduced-motion preferences.
- First visits use the light theme. An explicit light or dark selection is
  stored locally and restored before the page hydrates. Both themes share the
  approved lavender-led visual system.
- The footer now closes with identity and copyright only. Email and LinkedIn
  are available from the persistent dock without competing with the call CTA.
- Scrolled navigation state is remeasured after first paint and on hash changes,
  preventing the fixed header from losing its surface after direct anchor
  navigation.
- The expanded featured-project workflow replays in discrete passes with a
  3.2-second cadence. Replay pauses when the disclosure is closed, the diagram
  is outside the viewport, the tab is hidden, or reduced motion is requested.
- The three-node identity was refined from curved circular geometry to an
  orthogonal rounded-square workflow mark after the first small-size review.
- Final metadata uses the verified `https://leosanga.vercel.app/` canonical,
  an absolute social-image URL, the approved title and description, and the
  version 2 favicon family. The final route has no preview robots directive.
- The root shell now uses the version 2 stylesheet and self-hosted fonts. The
  version 1 Google Fonts request and shared stylesheet are absent from the
  candidate bundle. The 404 and error states use the same accessible visual
  system.
- The approved social-sharing composition is now available as a 1200 by 630,
  78,042-byte sRGB JPEG. Its reproducible HTML source, asset provenance, local
  Open Graph metadata, and Twitter metadata are included.
- The local browser QA harness covers the complete 11-viewport matrix, default
  and persisted themes, keyboard order, mobile-menu Escape handling, workflow
  disclosure, 200 percent text sizing, preference modes, forced colors,
  no-JavaScript rendering, console errors, and network hosts.
- First integrated QA evidence:
  [`qa/portfolio-v2-acceptance-2026-09-10.md`](./qa/portfolio-v2-acceptance-2026-09-10.md)
- Gate 3 release review and exact branch manifest:
  [`qa/portfolio-v2-gate3-release-review-2026-09-11.md`](./qa/portfolio-v2-gate3-release-review-2026-09-11.md)
- Gate 4 production release evidence:
  [`qa/portfolio-v2-gate4-production-release-2026-09-11.md`](./qa/portfolio-v2-gate4-production-release-2026-09-11.md)

## Open review items

- Firefox, Apple Safari, VoiceOver, iOS Safari, and Android Chrome remain
  unverified because those test surfaces were unavailable. Chrome and Edge
  coverage passed before release.
- An unrelated local edit to `HANDOFF.md` remains unstaged in the redesign
  worktree. It was not included in the pull request or production release.

## Booking-agent case study

Leo approved and Codex completed the local first-release implementation for the
n8n Booking Agent case study on 2026-09-15. The evidence matrix, publication
gates, approved copy, homepage role, dedicated-route structure, media strategy,
and brand requirements are recorded in
[`N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md`](./N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md).

The Booking Agent launched as the lead project in a six-project collection. The
current local collection has seven projects after the HubSpot case study was
added, and `AI Booking Agent (n8n)` remains the only featured project.
`/projects/ai-booking-agent` contains the approved text-led case study,
failure-safe outcome record, scroll-led architecture handoff, four proof
chapters, architecture evolution, adaptability section, and final scheduling
action. It intentionally has no Loom, screenshot placeholder, public agent, or
new dependency. The previous featured project remains a standard project and
keeps its workflow disclosure.

The featured booking-agent card now includes a focused failure-safe outcome
record. It shows a valid request, a passed rule check, a failed booking-calendar
connection, a released temporary hold, a booking that remains unconfirmed, and a
team alert. Its lead statement is `When the booking calendar fails, the agent
stops before it sends a false confirmation.` The record repeats on a calm
6.5-second cadence while visible and pauses when it is offscreen, the tab is
hidden, or reduced motion is requested. It does not call the live workflow or
depend on a third-party asset.

The same outcome record now appears directly after the case-study hero and
before Section 01. On the dedicated route it plays once and settles on the safe
final state. This carries the homepage promise into the case study instead of
asking the reader to remember a visual they saw earlier.

The case-study architecture section now answers `Who controls the booking` with
one persistent system. Its four scroll chapters show direct AI control, the AI
becoming a proposer, tested rules taking authority, and only a verified action
reaching the connected system. A viewport-center resolver replaces the prior
ratio-based intersection thresholds so ordinary scrolling does not skip the
tested-validation chapter. Completed chapters stay legible while the current
chapter receives the strongest emphasis.

Tablet, mobile, reduced-motion, and no-JavaScript use a static before-and-after
comparison instead of depending on the scroll sequence. Tablet keeps the two
systems side by side; mobile stacks them. Desktop, 768 px, 390 px, and 320 px were
checked on 2026-09-16. The 320 px layout has no horizontal overflow. The
case-study metadata label remains `TECH STACK`, and the homepage link remains
`See how the safeguards work`.

The reusable reasoning that produced the homepage outcome record is documented
in the case-study specification under `How the homepage visual direction was
selected`.

The former `Current scope` section has been replaced by `Designed to adapt
without rebuilding the core`. It now closes the evidence narrative with calendar
and meeting-provider replaceability, centralized business rules, and deliberate
human escalation. Private-demo logistics and unfinished deployment controls no
longer interrupt the path into the final call to action.

Local build, TypeScript, targeted lint, formatting, desktop Chrome, dark-theme,
320 through 1440 px responsive checks passed. The proof stays static and complete
without JavaScript or motion, pauses offscreen, and keeps Project 2's disclosure
unchanged. There is no horizontal overflow and no new browser-console issue. The
existing theme-bootstrap hydration warning remains a known baseline. Publication
was approved on 2026-09-16 for the canonical production site. The later
real-system evidence release was merged to `origin/main` in merge commit
`48cdd15` and is now the production baseline. The route includes seven evidence
figures, an in-page evidence viewer, and the twelve-stage workflow map.

## HubSpot secondary case study, local working state

The approved HubSpot visual-impact refinement is complete in the local working
tree.
`Lead Routing & Pipeline Health System (HubSpot)` remains the first secondary
case study after the featured Booking Agent. Existing project copy and order are
unchanged after the insertion.

The homepage card answers `The problem`, `What I built`, and `The hard part`,
then uses a focused report-coverage check as its signature visual. A 5.6-second
cycle shows 14 assigned test leads, the 8-and-6 route split, the earlier report
measuring only eight leads, the response-time check moving outside routing, and
the final 14-of-14 coverage. The visual holds the complete state between passes
and pauses offscreen or when the document is hidden.

The route at `/projects/lead-routing-pipeline-health-system` now starts with the unnumbered hero
and the same report-coverage proof used on the homepage. Section 01 restores the
compact Overview. Section 02 uses a fixed-height CRM decision trail to show a
transferable system-design principle: current fields can change while the
decision history remains available to operations and reporting. HubSpot is the
implementation evidence rather than the limit of the idea.

The 2026-09-24 case-study review made further refinements. The hero now uses
the same support-copy role and scale as the Booking Agent and describes the
project instead of defining CRM design through four questions. A later rhythm
review placed the support copy and technology list in one right-hand column, so
the tall title no longer creates a large gap between them. The former Sections
02 and 03 were first combined, then replaced after another business-owner and
systems-architecture review. The final Section 02 separates the portable CRM
principle from the named platform used to prove it. The animation runs inside a
compact canvas instead of extending the page through scroll-led scenes.

The complete Routing Workflow and SLA Watch screenshots now appear side by side
on desktop and stack only on mobile. Cropped workflow details and the separate
`View full workflow` disclosures are no longer rendered. Each report discovery
uses its clean dashboard card without repeating the workflow canvases. The four
earlier focused derivatives remain in the local asset record for provenance but
are not imported by the current route.

The supporting score report is now visible inside Section 04 rather than hidden
behind `View supporting report evidence`. Numeric indices are reserved for
top-level sections. The Booking Agent and HubSpot homepage signature visuals now
appear immediately after their case-study heroes and before Section 01.

TypeScript, targeted ESLint, Prettier, the production build, and server-rendered
content checks pass. Desktop Chrome visual review and a 390 by 844 responsive
check found no document-level horizontal overflow across the homepage and both
case studies. The server-rendered routes contain their final proof states before
JavaScript runs. Clean browser loads show only the existing root-theme hydration
warning, a known site-wide baseline; no HubSpot-specific or Booking-proof
runtime error was introduced.

The later case-study hierarchy refinement passed TypeScript, targeted ESLint,
Prettier, the production build, desktop Chrome review, and a 500-pixel headless
Chrome rendering. The revised hero, combined lead section, and workflow
evidence have no horizontal clipping. The production bundle includes the two
complete workflow images and excludes all four focused workflow derivatives.

The final decision-trail implementation was verified again on 2026-09-27.
TypeScript, targeted ESLint, Prettier, and the production build pass. Desktop
Chrome at a 1468-pixel content width and mobile Chrome at a 390 by 844 viewport
show no document-level horizontal overflow. The decision trail is 536 pixels
tall on desktop and uses a normal stacked mobile layout rather than scroll-led
motion. Inactive animation states retain readable contrast. Server HTML contains
the complete decision-trail state, both full workflow images, all three report
images, and the corrected proof-before-Overview order on both case-study routes.
The only browser console error remains the documented site-wide theme hydration
warning.

The final compactness and integration review on 2026-09-27 reconciled the five
Booking Agent evidence commits already deployed on `origin/main` with the local
HubSpot and shared-layout work. The combined candidate keeps all seven Booking
Agent evidence figures and its in-page viewer. Desktop review found the HubSpot
hero and opening proof compact enough to expose Section 01 in the same viewport,
and the Booking Agent hero now reveals its failure-safe proof without a long
empty handoff. At 390 by 844, the HubSpot proof is 603 pixels tall and the
Booking Agent proof is 736 pixels tall. Neither route has document-level
horizontal overflow. Section 05 uses one responsibility boundary, and Section
06 uses one rollout rail with distinct current and future markers.

The final opening and evidence refinement uses the HubSpot hero's efficient
desktop composition on the Booking Agent route: the project title and the
supporting copy and technology list now share the opening row instead of leaving
an empty grid row between them. All five HubSpot screenshots remain visible
inline and now also open in the established Booking Agent evidence viewer from
either the image or a visible `View larger` action. The shared case-study guide
now records this hero rule, the viewer behavior, and the project-agnostic lessons
consolidated from the HubSpot case study.

Final browser review measured the Booking Agent hero at 448 pixels on a 1483 by
1214 desktop viewport. Its full failure-safe proof ended at 1089 pixels, so the
opening behavior remained visible in the same viewport. At 390 by 844, the hero
was 573 pixels tall and the route had no horizontal overflow. The HubSpot route
rendered five complete inline screenshots and five visible `View larger`
actions. On mobile, a workflow screenshot opened at 1024 pixels wide for close
inspection, switched to a 330 by 320 fit view when activated, closed with
Escape, and returned focus to the exact image or text opener. Desktop and mobile
HubSpot checks had no horizontal overflow. Browser logs contained only the
existing site-wide theme hydration warning.

Commit, push, deployment, and canonical production verification are complete
for this release.

## Project 4 qualification-loop visual, local working state

Leo approved and Codex completed the local homepage visual for
`AI-Assisted Lead Qualification (HubSpot + n8n)` on 2026-09-28. The published
project copy is unchanged. `Slack` was added to the visible technology list
because it is both the workflow trigger and the team-facing outcome surface.

The native disclosure is labeled `Qualification loop` and opens a reusable
project-visual shell. Its project-specific canvas shows the existing HubSpot
workflow posting a missing-information alert to Slack, the Slack webhook
starting n8n with the contact email, HubSpot contact retrieval, n8n and LLM
research, the qualification write-back to HubSpot, the existing HubSpot
workflows continuing from that update, and the outcome returning to the
original Slack thread for team coordination. The qualification criteria and
downstream routing paths remain intentionally out of scope.

The eight-second sequence loops while the disclosure is open, visible, the
document is active, and motion is allowed. Otherwise it settles on the complete
state. The server-rendered and no-JavaScript state is also complete and readable.
Desktop uses a compact branching loop, while narrow viewports use one semantic
system-of-record-first sequence without horizontal overflow. The visual uses
semantic nested lists and keeps the SVG connector layer decorative.

TypeScript, targeted ESLint for the changed version 2 modules, relevant
Prettier checks, `git diff --check`, the production build, and server-rendered
content checks pass. Chrome browser review covered the expanded and collapsed
states, Enter and Space operation, the live loop, desktop composition, a 390 by
844 narrow viewport, zero horizontal overflow, and unchanged Projects
scrollspy state. A cold implementation review also found and resolved bounded
timer cleanup, a ResizeObserver fallback, explicit list semantics, inactive
step readability, and a native-details closed-state paint issue. The full lint
baseline remains unchanged in `src/components/portfolio/data.ts`.

The approved design and copy are recorded in
[`PROJECT-04-LEAD-QUALIFICATION-VISUAL-SPEC.md`](./PROJECT-04-LEAD-QUALIFICATION-VISUAL-SPEC.md).
Leo approved the final hook and production release on 2026-09-28. The visual is
included in the current production release for the canonical portfolio.

## Project 5 context-to-draft visual, production release

Leo approved the homepage visual for
`AI-Assisted Outbound Prospecting Workflow (n8n)` on 2026-09-28. The project
copy now describes the actual workflow: a limited visitor signal starts n8n,
HubSpot supplies existing context when available, and the automated research
determines whether the opportunity fits. The LLM uses that evidence with
relevant case studies to create a conversation starter for rep review in Slack.
No vendor name, record creation, or automatic-send behavior is shown. Contact
creation occurs downstream only if a draft is sent.

The native disclosure is labeled `Context to draft` with the hook
`See how it works`. Its project-specific experience uses a compact input rail
above a two-column research workspace instead of another node diagram. The
limited visitor signal, workflow start, and optional CRM context lead into a
research brief covering company context, current activity, pain-point fit, and
relevant proof. The page viewed guides the message angle, then the completed
research determines fit before the content-sized draft returns to Slack as
`Ready for review`.

The 11.9-second sequence loops while the disclosure is open, visible, the
document is active, and motion is allowed. Otherwise it settles on the complete
state. Most of the loop is spent building the research brief. The
server-rendered and no-JavaScript state is complete and readable. Desktop and
intermediate widths use the input rail above the research and draft columns.
Narrow viewports use one semantic sequence without horizontal overflow.

TypeScript, targeted ESLint, relevant Prettier checks, `git diff --check`, the
production build, and server-rendered content checks pass. Chrome browser review
covered the expanded and collapsed states, the live research stages, desktop
composition, and a 390 by 844 narrow viewport. The narrow layout uses one column
and has no document-level horizontal overflow. Browser logs show only the
existing site-wide theme hydration warning.

The approved design and copy are recorded in
[`PROJECT-05-OUTBOUND-PROSPECTING-VISUAL-SPEC.md`](./PROJECT-05-OUTBOUND-PROSPECTING-VISUAL-SPEC.md).
The Project 5 visual is included in the current production release for the
canonical portfolio.

## Project 6 ticket-lifecycle visual, production release

Leo approved and Codex completed the local homepage visual for
`Support Ticket Pipeline Automation (HubSpot)` on 2026-09-28. The supplied
internal flowchart remains private and is used only as implementation evidence.
The public visual removes organization names, exact internal statuses, timing
rules, channel details, and feedback routing.

The native disclosure is labeled `Ticket lifecycle` with the hook
`See how it works`. Two compact entry conditions feed one central ticket record:
a new request creates a ticket, while an existing reply returns work to the same
ticket. The public lifecycle is condensed to `Intake`, `Active`, `Waiting`,
`Resolved`, and `Closed`. Four supporting rules show that ownership stays
visible, state determines the next action, waiting work retains follow-up, and
resolved work moves toward closure. The less important direct-close branch is
intentionally omitted.

The 9.8-second sequence loops while the disclosure is open, visible, the
document is active, and motion is allowed. Otherwise it settles on a complete,
readable state. Desktop uses a compact horizontal lifecycle rail. Narrow
viewports stack the entry conditions and rules around a vertical lifecycle rail
without horizontal overflow.

TypeScript, targeted ESLint, relevant Prettier formatting, `git diff --check`,
and the production build pass. Local Chrome review covered the expanded state,
live animation states, desktop composition, and a 390 by 844 narrow viewport.
All measured Project 6 regions remain within their containers. Browser logs
show only the existing site-wide theme hydration warning.

The approved design and evidence boundary are recorded in
[`PROJECT-06-SUPPORT-TICKET-VISUAL-SPEC.md`](./PROJECT-06-SUPPORT-TICKET-VISUAL-SPEC.md).
The support-ticket project is now Project 6, immediately before Executive
Reporting, which is now Project 7. Leo approved this ordering and the Project 6
visual for the canonical Vercel production release on 2026-09-28.

## Project 7 metric-architecture visual, local review

Leo approved and Codex completed the local homepage visual for
`Executive Reporting & Dashboard Automation (Fully custom)` on 2026-09-29.
The disclosure is labeled `Metric architecture` with the hook
`See how it works`.

The visual is a reporting architecture workspace rather than a workflow strip
or a simulated dashboard. Three representative reporting paths show that a
metric may be supported through native reporting, external modeling, or a
connector or custom API. The active path updates a central architecture
blueprint before the completed metric becomes available in a shared reporting
surface. The visual does not assign the listed technologies to specific roles
because that implementation detail has not been confirmed.

The approved outcome-first refinement now opens on the completed reporting
state before it explains the architecture. The lead statement connects the
system directly to the business result: reporting that once required manual
analysis remains available on demand. A separate evidence note preserves the
public boundary without competing with that message. Dashboard rows then move
from `Manual analysis required` to `Available on demand`, and the dashboard
itself is explicitly labeled as the outcome.

The 10.6-second sequence opens with a 1.5-second completed-state hold, then
loops while the disclosure is open, visible, the document is active, and
motion is allowed. Otherwise it settles on a complete, readable state. Desktop
uses three related regions with the blueprint as the focal point. Narrow
viewports preserve the same semantic order in one column. No client data, real
metric names or values, formulas, endpoints, refresh schedules, screenshots,
or employer details are shown.

TypeScript, targeted ESLint, relevant Prettier formatting, `git diff --check`,
and the production build pass. Local Chrome review covered live animation
states, the completed hold state, light and dark desktop composition, keyboard
disclosure behavior, and a 390 by 844 narrow viewport. The server-rendered
homepage includes the complete static state. The narrow layout has no document
level horizontal overflow, and every Project 7 region remains within its
container. Browser logs show only the existing site-wide theme hydration
warning.

The approved design, published copy, and evidence boundary are recorded in
[`PROJECT-07-EXECUTIVE-REPORTING-VISUAL-SPEC.md`](./PROJECT-07-EXECUTIVE-REPORTING-VISUAL-SPEC.md).
Leo approved the outcome-first revision on 2026-09-29. The Project 7 visual is
complete locally and has not been deployed.

## Homepage project context and credibility, local review

Leo approved a compact context layer between the `Projects` heading and the
featured case study. It explains that the visible projects are selected from
broader systems work and establishes the scale and background behind them.

Approved introduction:

`These are some of the systems I’ve built. Each one started with a different
business problem and shows how I solved it.`

Approved credibility route:

- `5+ years` / `Business operations`
- `3+ years` / `Systems engineering`
- `Nearly 200` / `B2B clients supported through technical delivery`
- `Hundreds` / `Production solutions owned through deployment`

The rejected equal-cell statistics strip has been replaced by an asymmetric
credibility route. The section title and project-selection rationale now share
one compact header. The route gives the client and production scale signals
greater visual weight, and the first featured case study begins within the
initial desktop viewport. On narrow screens, the route becomes a compact
vertical progression rather than a card grid.

A signal travels through the route, rests, and repeats while its stable inner
wrapper is active. The four nodes respond in sequence while the evidence stays
settled and readable. Reduced-motion visitors receive the complete static
state. The ID-bearing `#projects` section remains untransformed for scrollspy.
The refined loop uses a 6.2-second cycle with roughly 1.2 seconds of travel and
a longer quiet interval. The traveling signal is smaller than the route nodes,
the evidence labels use 14-pixel body-text contrast, and the mobile section
starts 16 pixels earlier. The local light-theme desktop, dark-theme desktop,
390 px, and 320 px visual checks pass. Leo approved this revision for the
canonical Vercel production release.

The mobile credibility grid was corrected on 2026-09-29 so the longer
`Nearly 200` value no longer runs into its label. Narrow viewports now reserve a
slightly wider value column and a consistent 16-pixel value-to-label gap. The
390 px and 320 px checks pass after the correction.

## Checks last run

- The final Project 7 outcome-first revision passes TypeScript, targeted
  ESLint, relevant Prettier, `git diff --check`, and the Vercel production
  build. Local Chrome review confirms the completed opening frame, live row
  transitions, light and dark themes, keyboard disclosure behavior, and the
  final 390-pixel copy hierarchy without horizontal overflow. The same narrow
  check confirms the corrected gap after `Nearly 200`.
- The homepage credibility-route revision passes TypeScript, targeted ESLint,
  relevant Prettier, `git diff --check`, and the Vercel production build.
  Desktop and narrow local Chrome visual checks pass.
- TypeScript: passed.
- Targeted version 2 ESLint: passed.
- Version 2 Prettier check: passed.
- Production build: passed.
- The Booking Agent evidence harness completed 22 light- and dark-theme runs
  across its 11-viewport matrix. Image loading, evidence-viewer interaction,
  focus behavior, zoom, reduced motion, forced colors, horizontal overflow, and
  outside-request checks produced no new failure. The harness still exits with
  the existing root-theme hydration warning recorded below.
- Server-rendered content presence: passed for the approved H1, role line, four
  capability headings, all five `The hard part` labels, both locked figures,
  final CTA, calendar destination, theme bootstrap, canonical, and social
  metadata.
- Locked source comparison: passed after line-ending normalization. Version 2
  imports the current project and workflow evidence rather than duplicating it.
- Chrome 152 and Microsoft Edge passed all 11 required viewports from 1920 by
  1080 through 320 by 568 with zero horizontal-overflow failures and zero hero
  CTA to utility-dock overlaps.
- Default-theme testing passed while the emulated operating system requested
  dark: the first visit remained light. An explicit dark selection persisted
  across reload.
- Keyboard order, mobile-menu Escape and focus return, native workflow
  disclosure, 200 percent text sizing, reduced motion, reduced transparency,
  increased contrast, forced colors, and no-JavaScript rendering passed.
- Chrome and Edge candidate audits reported zero console errors and zero
  third-party requests.
- Three-run production-candidate Lighthouse medians passed every approved
  ceiling. Desktop scored 100 performance with 422 ms FCP, 548 ms LCP, 422 ms
  Speed Index, 0 ms TBT, and 0 CLS. Mobile scored 98 performance with 1,471 ms
  FCP, 2,181 ms LCP, 1,471 ms Speed Index, 0 ms TBT, and 0 CLS.
- Lighthouse accessibility, best practices, and SEO scored 100 on desktop and
  mobile.
- Final metadata inspection passed: root 200, `/redesign` 404, one verified
  canonical, absolute social image metadata, no robots block, and no Google
  Fonts request.
- Build privacy scans found no HEIC filename, confidential company name,
  private source path, common secret assignment, legacy font reference, or
  preview-route reference.
- Rollback rehearsal passed. A fresh detached worktree at baseline tag
  `portfolio-v1-baseline-2026-09-10` installed, built, served, and returned the
  version 1 homepage. The temporary rehearsal worktree was then removed.
- Pull request 1 merged cleanly, and the application changes entered `main`
  through merge commit `b0bbd04`.
- Vercel recorded production deployment `6385275062` for the merge commit and
  marked it successful.
- The remote Vercel Preview returns 200, serves the correct title and canonical,
  contains no Google Fonts request, serves the social image at 200, returns 404
  for `/redesign`, and includes Vercel's `X-Robots-Tag: noindex` response header.
- The canonical production homepage returns 200 without a preview noindex
  header. `/redesign` returns 404. The production social image returns 200 as a
  78,042-byte JPEG. The live title, canonical, Open Graph image, and Twitter
  image metadata match the approved release.
- Social image inspection: passed at 1200 by 630, sRGB, and 78,042 bytes.
- Favicon SVG and 16, 32, and 48 px PNG fallbacks: passed for transparent alpha,
  expected dimensions, three-node legibility, and light/dark background proofs.
- Full-repository ESLint remains a known baseline failure dominated by existing
  CRLF formatting errors. Targeted version 2 files introduce no lint errors.
- A sandboxed build attempt could not spawn Vite's Windows native dependency.
  The same final build passed outside the restricted sandbox with the normal
  project command. This was tooling isolation, not an application failure.
- Release commit `debe80d` passed TypeScript, targeted ESLint, relevant Prettier,
  the production build, staged-diff validation, and the private-identifier scan.
- The production homepage links to the HubSpot project. The HubSpot and Booking
  Agent routes use the same 102.4-pixel desktop hero-title scale and the same
  54.64-pixel scale at 390 pixels wide, with no horizontal overflow.
- The canonical HubSpot route renders all five evidence figures. Its image and
  text openers launch the accessible evidence viewer, and the Close control
  returns to the case study.

## AI engineering content revision, approved locally

On 2026-10-01, Leo requested concrete recommendations and a senior review of
lessons from Ingenium Vector's AI content. The draft design and reconciled
strategy/content and technical reviews are recorded in
[`AI-ENGINEERING-CONTENT-PLAN.md`](./AI-ENGINEERING-CONTENT-PLAN.md).

Leo confirmed that AI selection, important-action controls, measurement, and
maintenance/handoff documentation are established practices. The recommended
revision is one reviewed Build paragraph plus internal AI case-study authoring
questions. Leo approved the proposal except the Build wording. The approved
internal guidance is now applied in `CASE-STUDY-DESIGN-GUIDELINES.md`.

Leo liked the opening about process-fit tools and AI-assisted building, and
clarified that the rest should explain experience-based decisions about whether
an automation needs AI and which approach is simpler and cheaper. Governance is
a separate topic. He subsequently approved the direct second sentence and the
full paragraph: `I choose tools that fit the process and use AI to help with the
build. I decide whether the automation needs AI and choose the simpler, cheaper
approach.`

The paragraph is now applied to the shared `PROCESS_STEPS` source in
`src/components/portfolio/data.ts`, and the exact wording is recorded in the
content specification. The extra capability proof link remains deferred.
Local TypeScript, targeted ESLint, Prettier, production build, and Git whitespace
checks passed. The approved paragraph is present in server HTML. Chrome review
at 1415 by 1270 and 390 by 844 confirmed readable wrapping and no horizontal
overflow; the desktop Approach navigation retained its active state. No CSS,
interaction, or motion code changed. Enlarged text, keyboard interactions, and
reduced-motion preferences were not separately rerun for this paragraph-only
revision. The preview emitted the already documented theme hydration warning.
The initial sandbox build failed to spawn Vite's child processes; the approved
retry outside the sandbox passed. No push or deployment is authorized.

Leo subsequently locked the Understand sentence: `I identify: how the process
runs today, what's already built, what's documented, who's involved, and what we
are trying to achieve.` It is applied to the same shared source and recorded in
the content specification. He reopened Plan for wording review; its source
remains unchanged until that wording is approved. The earlier build and browser
results above cover the Build revision, not this subsequent Understand edit.
TypeScript, targeted ESLint, Prettier, and whitespace checks passed after the
Understand edit. The build and browser matrix were not repeated for that
paragraph-only change.

Leo subsequently locked Plan option 1, now applied to the shared source and
recorded in the approved content specification. Step 4 is now open for review
with the opening `I test then deploy:` and a final test after deployment. Leo
requested a fifth step named `Measure` and will supply further wording input.
TypeScript, targeted ESLint, Prettier, and whitespace checks passed after the
Plan paragraph edit. The build and browser matrix were not rerun for that edit.
Leo subsequently locked the step 4 paragraph: `I test then deploy: check it
against real scenarios, watch how it performs, fix any issues, identify
improvements, then deploy and test all over again.` It is now applied locally;
the existing Validate title is unchanged. No separate post-deployment sentence
is added. TypeScript, targeted ESLint, Prettier, and whitespace checks passed
after this paragraph edit; build and browser checks were not repeated.

Leo subsequently locked the fifth paragraph: `I define and track: quantifiable
metrics for success and failure, so we can see the performance over time, and
continuously improve as we adopt to changes.` It is applied exactly, including
`adopt to changes`. `Monitor` is a working title for the local preview, pending
Leo's title review. This supersedes the earlier four-step rendering.

Leo requested a local viewer before deployment. The shared data now contains
five steps. Version 2 uses five columns at 1280 CSS pixels and above, then the
existing vertical sequence below that width. The legacy consumer's desktop grid
also accommodates five steps. Typography, palette, motion logic, section IDs,
and navigation are unchanged.

The requested viewer is running at `http://127.0.0.1:8090/#approach` in command
session `56399`, bound to loopback only. Chrome tab `1408657062` is left open as
the visual-review deliverable. TypeScript and the production build passed.
Targeted ESLint and Prettier pass after normalizing line endings in the touched
legacy component and formatting the proposal's Markdown tables. Git whitespace
checks passed. Server HTML returns 200 and contains the exact fifth paragraph.

Browser review covered 1415, 1280, 1279, 390, and 320 CSS-pixel widths. All five
steps render in order without horizontal overflow. The 1280/1279 boundary
switches between five columns and the vertical sequence. Desktop Approach
scrollspy remains active, and the section transform remains `none`. Keyboard
menu activation, Approach navigation, and project disclosure open/close passed
at 320 pixels. The viewport override was reset. Reduced-motion behavior was
checked in source: the existing rule covers every step and restores the
connector without transform animation. Browser preference emulation, enlarged
text, and a separate legacy-route visual review were not performed.

During preview verification, Leo reopened Build because its two-sentence
paragraph differs from the other steps' `I ...:` pattern. Keep its previously
approved source wording until the replacement is reviewed.

Leo subsequently reopened Plan and clarified that tool selection, deciding
whether the automation needs AI, and choosing the simpler, cheaper approach
belong in Plan. Build should describe implementation, including AI-assisted
building. This supersedes the earlier Build-only wording proposals. Revised Plan
must still cover design, connections and flow, failure behavior, and enough
documentation for another person to rebuild it. Leo locked the Build opening as
`I execute:` and subsequently supplied complete Plan and Build replacements.
Both are now applied exactly to `src/components/portfolio/data.ts`. The exact
copy is recorded in the content specification and supersedes the prior drafts.
Plan retains `AI-assisted or not`; Build retains `utilize AI-assisted executions`.
The earlier simpler/cheaper clause is not reinserted. Other paragraphs, titles,
and layout are unchanged. TypeScript, targeted ESLint, Prettier, the production
build, and whitespace checks passed after these replacements. Server HTML and
the Chrome preview contain both sentences exactly. Browser review at 1415 and
390 pixels confirmed readable wrapping without horizontal overflow. The desktop
Approach navigation remains active. The viewport was reset and the preview tab
was retained for Leo. The prior responsive-boundary and keyboard checks above
remain applicable; only paragraph text changed in this latest revision.

Leo subsequently locked the complete reviewed five-step section, including the
Monitor title. The active visual revision is recorded below.

Decisions this turn:

- Preserve the fifth paragraph exactly, including `adopt to changes`.
- Use `Monitor` provisionally for local title review.
- Preview five columns from 1280 pixels and a vertical sequence below it.
- Apply Leo's complete Plan and Build replacements exactly. Plan carries design
  and selection; Build starts with `I execute:` and describes implementation.
- Keep the viewer running for Leo's inspection; no push or deployment occurred.

## Projects and Approach connectors, active local revision

On 2026-10-01, Leo requested centering the Projects credibility rail on its dots
and a similar Approach signal advancing from 1 through 5. The reviewed design
and reconciled independent motion/frontend and accessibility/QA reviews are in
`PROJECTS-APPROACH-CONNECTOR-PLAN.md`. No public wording changed.

Active implementation: branch `polish/projects-approach-connectors`, worktree
`C:/Users/Leo/Downloads/projects/portfolio-vercel/.worktrees/projects-approach-connectors`.
The original worktree and viewer on port 8090 retain the prior visual state.
The revised viewer is `http://127.0.0.1:8091/#approach`, command session `44213`,
Chrome tab `1408657096`. Both tabs are retained for visual comparison.

Projects keeps its dot placement and centers its rail and signal on the dots.
Approach now has connected segments and one signal pass with arrivals in order
1 through 5. It uses one animation name for horizontal and vertical layouts.
The final node peaks at 3030ms and settles at 3180ms. Re-entry does not change the
observed flag, and the one-iteration animations remain at rest. The sequence
runs again on a page reload. Static rails render before observation. Reduced
motion disables the sequence and node transitions; the prior observed-node
scale override was removed after accessibility review caught it.

Verification: TypeScript and production build passed. Targeted ESLint, Prettier,
and Git whitespace checks passed after normalizing copied task-file line
endings. Browser geometry at 1415px and 390px showed zero Projects axis offset
and zero Approach axis/endpoint offset. At 320px, the largest endpoint residual
was approximately 0.00002px. No horizontal overflow occurred. The 1280/1279
boundary changes direction under the same signal animation name. Keyboard menu
activation, Approach navigation, project disclosure open/close, and desktop
scrollspy passed. The viewport override was reset. The known theme hydration
warning remains. Reduced-motion and no-JavaScript fallbacks were verified in
source and server HTML; browser preference emulation and 200% zoom were not
performed. In-flight breakpoint timing was not separately captured.

Limit: the existing wrapper observer starts the entire pass, so later mobile
steps may finish before the visitor scrolls to them. This awaits Leo's visual
acceptance. No motion library, timers, schema, or dependency was added.

The local-only `vite.preview.config.ts` permits the shared dependency directory
used by the worktree's node_modules junction. Exclude this helper from commits
and release. The generated route tree has no substantive diff and is excluded.
Leo's HANDOFF edit, design assets, portrait, and unrelated draft documents were
not copied into this branch. Normal Git hooks apply; the goal challenger has no
matching staged trigger for this scope, so no verdict is claimed.

Decisions this turn:

- Lock all reviewed Approach copy and the Monitor title.
- Center Projects connectors without moving its dots.
- Run Approach once in order 1 through 5, then leave the route static.
- Keep geometry responsive and copy visible with reduced motion or no JavaScript.
- Keep this revision in its isolated local branch; no push or deployment.

## Exact next action

Leo authorized looping and deployment on 2026-10-01: "loop it, then deploy".
This supersedes the one-pass decision and the pending release gate above.
The Approach loop uses a shared 4800ms cycle, preserving 620ms arrival spacing
and a 2020ms pause after the fifth pulse settles. Copy remains exactly locked.

The latest production branch, 8948e29, was merged into the isolated release
branch before verification. Its Salesforce case study, renamed project routes,
assets, and mobile utility layout remain intact. Its late duplicate Projects
CSS receives the same axis fixes so the cascade preserves alignment.

TypeScript, the integrated production build, targeted ESLint, and Git whitespace
checks pass. Prettier's remaining warnings in the merged CSS and guidelines are
solely the repository's existing CRLF issue; normalized text matches formatting.
Browser sampling showed repeated signal order 1, 2, 3, 4 across two cycles,
with all five node durations 4.8s and infinite iteration counts. Mobile 390px
Approach axis and endpoint offsets are zero; Projects rail and all dot centers
share x=6px. No horizontal overflow occurs at 390px or 320px. Keyboard menu and
Approach navigation work at 320px; ID-bearing sections remain untransformed.
Responsive viewport override was reset. Reduced motion was source-reviewed;
browser preference emulation remains unperformed. Both specialist reviews were
collected and reconciled. No new source or motion blocker remains.

The restarted viewer uses port 8091, command session 47918. The local preview
helper stays excluded. Relative to latest production, the release contains only
the nine approved content, connector, and documentation files. Preserve original
unrelated changes, baseline tags, and retained branches. Next action: commit the
integration, publish the branch, merge its pull request, then verify Vercel and
the canonical site. Do not rewrite history.

Decisions this turn:

- Repeat Approach from 1 through 5 with a brief resting interval.
- Keep reduced-motion visitors on the static route.
- Deploy the reviewed update while preserving the newer production release.

## Approach release complete, 2026-10-01

Pull request 8 is merged: https://github.com/leosanga/portfolio-vercel/pull/8.
Source head: df07fe204a759d071fa2032fa67dd1a67d048734.
Production merge: c6238e221d0c338bf2c4b277e39be94fd49d2c32.
Vercel's exact-commit status is successful; production deployment ID 6770353792.
The canonical https://leosanga.vercel.app/#approach serves all five exact approved
paragraphs and five node animations with 4.8s duration and infinite iteration.
Browser inspection confirmed no desktop overflow and section transform none.
The newer Salesforce case study and project routes are present in live HTML.

The initial publish was rejected by automatic approval review on a private-egress
assumption. Read-only GitHub verification showed this destination is public and
the payload was the approved nine-file diff; the evidence-backed retry succeeded.
No approval bypass or alternate publication path was used.

Recovery: revert production merge c6238e2 through a new reviewed release. Do not
rewrite history or alter preserved baseline tags. The original main worktree
remains at its prior local commit with unrelated user edits untouched. The
isolated branch retains df07fe2; its generated route tree has only a cosmetic
unstaged change and the preview helper remains untracked. This release result
is recorded locally after deployment; do not push a documentation-only release
without a reason. The authoritative state stays here, as the root pointer says.

Next action: routine live review or a new scoped request. Deployment is complete.
No approval is pending.

Decisions this turn:

- Loop and deploy the approved Approach revision.
- Preserve the current production case studies and unrelated original work.
- Retain a merge-commit rollback path and local preview.

## Credibility delivery copy follow-up, 2026-10-01

Leo approved option 2 after reopening the delivery-scale wording. Exact value:
`Hundreds of`. Exact label: `solutions built and deployed`. The change is in
src/content/portfolio-v2/content.ts, consumed by ProjectsV2's existing definition
list. No count, animation, project evidence, or other copy is changed. At 430px,
the new value overlapped the label by about 9px under the fixed 116px value
column. The last mobile row now uses minmax(7.25rem, max-content) for that column
so the text fits while preserving the existing gap and rail.
This maps to the approved credibility route and goal's focused proof invariant.
Senior roles: content designer, frontend QA engineer, release engineer.

The content source, targeted CSS fix, approved content spec, and this state record are the intended release
files. Preserve unrelated original changes and the local preview helper. Verify
desktop/mobile wrapping, TypeScript, and targeted lint before the follow-up
release. Current production remains the successfully verified c6238e2 release
until the follow-up is merged. The original repository is not the editing surface.

Verification: TypeScript and production build pass. Targeted ESLint reports only
the documented CRLF Prettier baseline; it passes with that formatting rule
excluded. At 430px, the last row now retains a 16px text gap; at 320px it has
about 26px. No overflow occurs at those widths or 390px. Desktop preview shows
the exact approved value and label. No other runtime file is changed.

Decisions this turn:

- Apply option 2 exactly, keeping the delivery-scale claim.
- Publish the small follow-up through the established release process.

Release complete: https://github.com/leosanga/portfolio-vercel/pull/9 is merged.
Source commit e7db344cefda087a8b94d50cf20d16a5565da378; production merge
37d5b7668c8bb440a457fbf373f6ecf0f205bb50; deployment ID 6777447628. Vercel's
exact-commit status is successful. The canonical site serves both exact strings
and the corrected mobile columns, with no horizontal overflow at 430px.
Responsive QA override was reset. Branch polish/credibility-delivery-copy is
active in the same isolated worktree. Original user changes remain untouched;
the generated route tree cosmetic change and preview helper remain excluded.
This post-release result is recorded locally. Next action: routine live review or
another scoped request. Revert merge 37d5b76 through a new release to roll back.
No approval is pending.

## Approach laptop layout diagnosis, 2026-10-01

Leo reported that Approach went wrong after the releases. Browser inspection
reproduced an abrupt collapse into a narrow vertical copy column at 1262px,
leaving excessive empty space. It returned to five columns at 1280px. The
five-step revision moved Approach's prior 1024px boundary to 1280px, causing
this laptop layout regression. The subsequent credibility copy release changed
only its own row, not Approach. All five exact paragraphs and loop timings
remain correct in live DOM and computed styles.

Restore horizontal Approach from 1024px upward; retain vertical tablet/mobile
below that width. Keep Capabilities' independent 1280px breakpoint. Files:
src/styles/portfolio-v2.css plus the connector plan, visual spec, and this state.
No published copy changes. This supports the approved desktop horizontal-route
and readable responsive-layout invariants. Verify 1024, 1100, 1262, 1280, and
390 widths, connector endpoints, no overflow, keyboard navigation, and static
reduced-motion fallback. The user clarification question remains open; adjust
the diagnosis if Leo identifies a different symptom.

Local checks confirm five columns at 1024, 1100, 1262, 1279, and 1280px, and a
vertical path at 1023 and 390px. Connector endpoint offsets are zero, section
transform remains none, and no horizontal overflow occurs. All five paragraphs
retain their exact approved source. At 1024px, body measures are about 154px,
with the longest paragraph taking 223px of height; text does not overlap.
Keyboard menu activation and Approach navigation pass at 390px, with the proper
aria-current location. All node iteration counts remain infinite. Reduced-motion
guards are untouched. Responsive QA override was reset. The production build and
whitespace checks pass; the original repository's unrelated changes remain
untouched. This is a correction to the existing portfolio release.

Decisions this turn:

- Restore Approach's prior laptop breakpoint without changing copy or timing.
- Preserve Capabilities, mobile geometry, and unrelated user work.

## Required read order

1. Repository `AGENTS.md` when present, otherwise repository `CLAUDE.md`
2. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
3. [`CASE-STUDY-DESIGN-GUIDELINES.md`](./CASE-STUDY-DESIGN-GUIDELINES.md)
4. Approved content, visual, asset, motion, and responsive specifications
5. [`PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md`](./PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md)
6. [`PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md`](./PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md)
7. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
8. This file
9. [`qa/portfolio-v2-gate3-release-review-2026-09-11.md`](./qa/portfolio-v2-gate3-release-review-2026-09-11.md)
10. `ANIMATION_PLAN_PROMPT.md` before motion or measured-section work
11. Relevant source files
