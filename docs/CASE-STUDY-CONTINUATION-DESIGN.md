# Case-study continuation design

Date: 2026-10-03. Owner/reviewer: Codex. Accepting authority: Leo.
Status: Leo visually accepted the matched compact navigation cards and all three
supporting sentences on 2026-10-04: next case study left, Project Catalog right,
stacked on narrow screens. The circular sequence and substantive closings remain
accepted. The previous standalone control is superseded. Leo selected
`/project-catalog` as the catalog destination; updating the built links remains
a later route task. Visual acceptance does not authorize publication.
The latest amendment in the separate [execution packet](./CASE-STUDY-ENDINGS-EXECUTION.md)
bounds the matched-pair implementation. Live
dispatch and acceptance belong to [current state](./REDESIGN-CURRENT-STATE.md).

## Goal and scope

Help a reader continue examining the work after finishing a case study. This maps
to the [portfolio goal](./PROJECT-GOAL.md)'s proof and clarity invariants and the
[case-study guidelines](./CASE-STUDY-DESIGN-GUIDELINES.md)' instruction to close
with the established result rather than another large sales action. Schedule a
Call remains in the shared header; the homepage's conversation section remains.
Projects / Catalog naming and the other accepted visuals are locked.

Active senior perspectives: UX architecture, visual/brand systems design, content
design, portfolio/conversion strategy, accessibility and frontend architecture.
An independent lower-model UX/content/accessibility critique was collected and
reconciled; it is not reader-test evidence.

## Source facts at the initial review

- `ProjectsV2.tsx` displays the lead project, then secondary case-study projects
  in `PROJECTS` order, then standard project explanations.
- `content.ts` currently supplies Booking Agent, Salesforce, then HubSpot before
  the standard projects. Each of these three has a dedicated case-study path.
- Booking Agent and HubSpot render a final call section and duration. Salesforce
  instead renders an operational result and an existing next link to HubSpot.
- The homepage catalog bar already has the accepted theme surface, outlined
  appearance, full-bar target, title, description and See more projects link.
- Current content assertions require exactly eight projects and two secondary
  case studies. A future case addition must review those assertions too.

## Initial approved composition direction

After the case's final substantive content, place one shared navigation group
inside the existing page frame, before the unchanged site footer:

```text
[Final case content / established result]

Next case study
Trial & Demo Routing by Customer Relationship (Salesforce)       ->

+---------------------------------------------------------------+
| Project Catalog                                               |
| The catalog shows how I design workflows for everyday          |
| business problems.                      See more projects ->   |
+---------------------------------------------------------------+

[Existing site footer]
```

The next-case row is the local focal point: a compact Next case study label,
the destination's existing full project title, and one right arrow aligned at the
far edge. Use an unboxed editorial row, the existing Instrument Sans heading
style, and restrained existing link/focus treatment. A fine top rule separates
continuation navigation from the case's substantive ending. Start local review with title
scale capped around 3rem; allow natural wrapping and verify the longest title.
The entire row is one link. No nested arrow button, thumbnail, repeated stack,
project number, carousel or extra introduction is proposed.

Place the catalog bar beneath it, spanning the same frame. Reuse its accepted
appearance and exact copy. The next title leads visually; the familiar catalog
bar provides the broader browsing choice. Start with a 24px gap between these two
elements and roughly 40-64px of outer section space, then judge actual geometry.
These are prototype starting values, not an accepted pixel specification.

Space belongs to each placement: extracting the catalog bar must preserve the
homepage's existing margins while allowing this tighter case-study context. Do
not change its global margin to make the new ending fit.

On phones, keep the same order. Let the long project title wrap, place the arrow
without consuming a narrow title column, and retain the catalog bar's existing
stacked treatment. No fixed row height or truncation. Both choices must remain
visible and understandable without hover. No new reveal or autoplay motion.

## Next-case control review amendment, 2026-10-04

Scope: Leo accepted Salesforce's substantive closing and asked Codex to diagnose
and improve the next-case button. Keep the accepted closings, catalog bar, shared
header, destination data and circular sequence. This amendment revisits only the
next-case row's composition. Leo approved this amendment for local implementation
and visual inspection on 2026-10-04. It supersedes the initial unboxed-heading
prototype above. Rendered acceptance is recorded separately in current state.

### Observed problems

Root inspected the local Salesforce ending at desktop size and Booking Agent's
ending at a 390px viewport. The desktop destination is a 48px heading with a tiny
mono label and an arrow at the far edge. On the phone, the Salesforce destination
wraps to four lines at 32px while the arrow sits beside the small label. The catalog
bar below provides stronger visible grouping and a recognizable underlined action.

- UX: the next destination resembles another content chapter, despite being a link.
  Its resting appearance gives little indication of the clickable area.
- Visual hierarchy: navigation receives a large heading treatment immediately after
  the substantive close. Title length changes its visual weight significantly.
- Content: Next case study is useful wording, but currently functions as small
  metadata rather than an invitation to continue.
- Responsive composition: the arrow and title become visually separated on phones.
  The long title uses substantial space without improving the action's clarity.
- Accessibility: the current native anchor and focus outline work. The primary
  concern is discoverability before hover or focus, not a demonstrated keyboard bug.

An independent lower-model review agreed with the hierarchy, grouping and wrapping
diagnosis and proposed a compact outlined panel. Root retains its clear-affordance
principle but recommends outlining the control itself, keeping the row plain. This
preserves the catalog bar's distinct composition and gives the action a bounded
target without adding a second full-width panel. These are design judgments from
local inspection, not measured reader behavior or usability-test results.

### Approved revised composition

```text
[Accepted substantive closing]

Lead Routing & Pipeline Health System (HubSpot)   [Next case study ->]

[Accepted Project Catalog bar]
```

Show the destination's exact existing title as context, followed by one visibly
outlined **Next case study** link with its arrow inside the same control. Remove
the repeated small eyebrow and detached arrow. Add no new summary, thumbnail,
stack list or introduction. The full title already describes the next topic.

Start the local prototype with these values, subject to rendered review:

- Desktop: title left, action right, vertically centered; a flexible title column
  and an intrinsic action column with a 24px gap. Use Instrument Sans, roughly
  28-32px, weight 590 and line height 1.2-1.25. The closing heading retains its
  established scale. Keep the existing continuation frame and top rule.
- Narrow screens: title above action, both left aligned, with a 12-16px gap. Start
  the title at 24px and allow natural wrapping. Switch before the two-column layout
  crowds either part. No clipped title, fixed height or line clamp.
- Control: minimum 48px height, approximately 16-18px horizontal padding, existing
  12px control radius, 1px strong-line border, primary text and transparent resting
  background. Use the existing raised surface and mist accent for restrained hover
  feedback. Match the portfolio's control typography at about 15-16px and weight
  600. Keep the arrow adjacent to the label at 16px, with no autoplay motion.
- Spacing: retain the existing 24px separation from the catalog as the starting
  point. Judge the complete ending rather than shrinking the accepted closing or
  catalog to compensate. A separate phone control may use more space for a short
  title; the requirement is clear hierarchy and purposeful spacing, not an
  unverified claim that every ending becomes shorter.

Use one native anchor for the outlined action. The title is context outside that
anchor, so blank row space does not become an unmarked click target. Associate the
link's accessible name with its visible label and destination title in that order
through stable IDs and `aria-labelledby`. Keep the decorative arrow hidden from
assistive technology. Preserve the More projects navigation landmark, next-link
then catalog-link keyboard order, existing focus outline and normal browser Back.
No nested button, extra tab stop or new per-page navigation data.

### Bounded implementation

Affected source files: `CaseStudyContinuationV2.tsx` and its scoped rules in
`portfolio-v2.css`. The shared sequence helper, catalog component, homepage bar,
substantive case content, routes and generated route tree need no change. Follow
the approved amendment in the separate execution packet when delegating the build.

Review all three destination lengths on desktop and phone, both themes, resting
and focus states, text wrapping and floating-dock clearance. Confirm the full
accessible destination name, one next link followed by one catalog link, actual
cycle navigation and Back. Preserve forced-color and reduced-motion support;
report any preference checks not actually exercised. No new dependency or test
suite is needed for this composition change. Approval and actual checks belong
to the authoritative current-state record.

## Matched compact paths proposal, 2026-10-04

Leo's latest direction: two similar compact choices, next case study on the left
and Project Catalog on the right. Stack them on narrow browsers and phones. The
next case needs one short supporting sentence. This revises the earlier visual
next-case-first hierarchy to two equally prominent choices, while retaining
next-case-first reading and keyboard order. Leo approved the exact new copy and
detailed composition on 2026-10-04. Follow the latest execution amendment for
local build. Rendered acceptance remains a separate checkpoint in current state.

Senior perspectives: UX architecture for clear choices, brand/visual systems for
the matched treatment, content design for the destination sentences, accessibility
for complete link names and whole-card targets, and frontend architecture for
reuse without altering the accepted homepage bar. One bounded Luna content/layout
review was collected; root reconciled its findings against the actual source.

### Recommended composition

```text
[Accepted substantive closing]

+--------------------------------+  +--------------------------------+
| [Exact next project title]      |  | Project Catalog                |
| [One short supporting sentence]|  | [Existing catalog description] |
|                                |  |                                |
| Next case study ->             |  | See more projects ->           |
+--------------------------------+  +--------------------------------+

[Existing site footer]
```

- Equal-width desktop cards in the existing frame, with a 24px gap. Reuse the
  homepage catalog bar's raised theme surface, 1px strong-line border, 24px radius
  and restrained mist hover border. The homepage bar itself remains untouched.
- Inside each card, stack the title, sentence and underlined arrow action. Use
  the existing catalog action treatment on both cards; the previous separate
  outlined Next case study control is replaced in this placement.
- Start with 24px padding and titles at 24-28px, weight 590, line height 1.25.
  Description text is 15-16px with comfortable line spacing. Keep the full data
  title, natural wrapping and existing Instrument Sans. No eyebrow, icon, number,
  repeated tools, thumbnail, fixed height, truncation or added animation.
- Desktop cards stretch to the taller content and align their actions at the
  bottom. Keep title-to-sentence spacing around 8px and at least 16px before the
  action. Do not reserve empty title rows just to align descriptions.
- Stack below 1024px, matching the existing case-closing boundary. Next case
  stays first. Start phone padding at 20px and title size at 24px; use a 16px gap
  between cards. Stacked cards have independent natural heights, so the shorter
  catalog content does not inherit the next project's long-title space.
- Keep the existing continuation separator and outer rhythm for the first local
  review. Compact means restrained type and padding; the added next-case sentence
  can increase phone scroll length. Do not claim every viewport becomes shorter.

One native link per card covers that card's entire target, matching the accepted
catalog bar's interaction. Use the underlined action as the visible link cue,
with a decorative arrow. No nested link or button. The next link's accessible
name includes its action and destination title; its supporting sentence remains
ordinary readable content rather than being forced into a long link name. Make
keyboard focus clear across the card boundary, retain next then catalog order,
and verify focus-scroll clearance against the floating dock in settled state.

### Proposed exact supporting sentences

| Destination | Sentence | Source anchor |
| --- | --- | --- |
| Trial & Demo Routing by Customer Relationship (Salesforce) | The system routes trial and demo requests using Salesforce records, with unclear matches held for review. | `salesforce-trial-demo-routing.ts`, `SALESFORCE_ROUTING_OVERVIEW.solution`: existing CRM records determine the path; uncertain matches wait for review. |
| Lead Routing & Pipeline Health System (HubSpot) | Testing uncovered assigned leads missing from response-time reports. | `hubspot-lead-routing.ts`, `HUBSPOT_LEAD_ROUTING_OVERVIEW.problem` and `.hardPart`, plus the missing-six-leads evidence: an assignment path was absent from reporting coverage. |
| AI Booking Agent (n8n) | AI handles the booking conversation while tested code checks proposed actions before the calendar changes. | `booking-agent.ts`, `BOOKING_AGENT_OVERVIEW.solution`: AI handles conversation and tested code checks proposed actions before the calendar changes. |

These public sentences were approved by Leo on 2026-10-04. They add no deployment,
impact metric, client detail or new engineering claim. The HubSpot sentence hooks
into the demonstrated testing finding rather than imply operational deployment.
Root rejected the independent review's wording about a missing assignment path,
which could imply the assignment route itself was absent; the evidence concerns
leads missing from reporting. Its before-deployment caution does not establish
that the existing source's before-deployment scope is false. The concrete finding
is chosen for clarity and relevance.

Catalog copy remains verbatim: **Project Catalog**, **The catalog shows how I
design workflows for everyday business problems.**, **See more projects**. Next
action remains **Next case study**. Titles and routes remain the existing table
below. No new prose about the current case is needed.

### Implementation boundaries after copy/composition approval

Keep the existing homepage `ProjectCatalogEntryV2` unchanged. Introduce a small
shared presentation component, `ProjectContinuationCardV2`, for both compact
choices. Its inputs are title, description, href and action label. It owns the
one-link target and focus treatment, not sequencing or content selection.

`CaseStudyContinuationV2` computes the next case using the unchanged helper and
supplies its title/path/summary to one card. The other receives the existing
`PROJECTS_CONTEXT.catalog` values. This avoids duplicating catalog copy or
changing the homepage bar to accommodate its new case-study placement.

Add a short `caseStudySummary` field to each dedicated project's own source
object. The shared project type permits the field because standard projects have
no dedicated case route; content registration requires it for every eligible
dedicated case. Do not maintain a separate slug-to-caption map or silently fall
back to a long problem/solution paragraph. Future case registration reviews this
sentence along with its title, substantive closing and evidence.

Affected source files: the new presentation component; `CaseStudyContinuationV2`;
scoped continuation CSS; `types.ts`; `content.ts` for summary validation; and the
Booking Agent, Salesforce and HubSpot content source files for approved summaries.
No case route, page body, sequence helper, homepage card, homepage catalog style,
generated route tree or dependency change. Preserve the existing zero/one-case
behavior; the catalog alone spans the available frame when no successor exists.

After approval, amend the separate execution packet with exact ownership and
checks before delegation. Review the real longest title, both themes, desktop,
1024px boundary and phone; equal desktop actions and natural phone heights; full
card activation, link names, Tab order, focus/dock clearance, real cycle and Back.
Check TypeScript, build, scoped lint and whitespace. The existing helper tests
need no new sequencing cases because sequencing is unchanged. Report unexercised
preference and device checks separately from passes.

## Exact navigation and copy

| Current case | Next destination title | Route |
| --- | --- | --- |
| AI Booking Agent | Trial & Demo Routing by Customer Relationship (Salesforce) | `/projects/trial-demo-routing-by-customer-relationship` |
| Salesforce routing | Lead Routing & Pipeline Health System (HubSpot) | `/projects/lead-routing-pipeline-health-system` |
| HubSpot routing | AI Booking Agent (n8n) | `/projects/ai-booking-agent` |

Use **Next case study** on every row, including the wrap to Booking Agent.
Readers may arrive directly at any case. Back to the first assumes a previous
reading history; an ordinal or completion indicator would imply tracked progress.
This is a static circular browsing order, not an automatic redirect or a claim
that the reader has finished the collection.

Catalog copy remains exactly:

- **Project Catalog**
- **The catalog shows how I design workflows for everyday business problems.**
- **See more projects**, linking to `/project-catalog` after the route task.

## Preserve the case ending before navigation

- Booking Agent: retain its substantive adaptability content. Replace
  only the final Build a workflow that survives production call section.
- HubSpot: retain the rollout content and its sandbox/deployment scope statement.
  Replace only the final Build a CRM your team can trust call section.
- Salesforce: Leo reopened the substantive closing on 2026-10-04. Review the
  [approved closing](./SALESFORCE-CLOSING-SECTION-DESIGN.md) before building.
  Preserve the existing result's supported meaning without adding two conclusions.
  Move navigation into the shared ending and remove the existing related-case
  sentence/link. That sentence depends on a particular pair and would become stale
  when another case is inserted between them.

Every dedicated case study must satisfy the
[required closing gate](./CASE-STUDY-DESIGN-GUIDELINES.md#required-closing-section-gate)
before this browsing navigation. Navigation does not substitute for closure.

Do not add invented outcomes or rewrite the preserved result content to make the
navigation seem like a new concluding chapter.

## Sequence and implementation boundaries

Use one canonical ordered list for the homepage's dedicated case studies and the
continuation component: lead first, then secondary cases in their displayed order.
Include only displayed dedicated cases with valid public paths. Standard catalog
entries and short homepage explanations do not enter this cycle. Do not filter
only the secondary role, which would omit the Booking Agent, or assume raw array
order always matches the homepage's grouping.

The successor wraps from the final entry to the first. Inserting a new dedicated
case after HubSpot changes HubSpot's successor to that case; the new case points
to Booking Agent. No per-page next slug, duplicated title, visited-case state or
manually maintained cycle. With one eligible case, omit a self-link and retain
the catalog. With none, retain only the catalog. Validate unique IDs/paths and
registration of the current case; do not silently choose an unrelated destination.
Registering and accepting a future case and revising the fixed count assertions
remain separate content work; sequencing alone cannot publish it.

Affected files: one shared continuation component,
one extracted catalog-entry component, the homepage project-order/content helper,
`ProjectsV2.tsx`, the three case-study components and scoped portfolio CSS. Remove
obsolete close/related copy only within the reviewed replacement scope. No
dependency, case-study URL or route-tree hand edit is needed. The catalog React
route remains a separate integration task; the local bridge is not that route.

## Acceptance before implementation completion

Review all three endings on desktop and narrow screens, both themes, long title
wrapping, keyboard focus, forced colors, reduced motion and dock clearance. Use
real links, a navigation landmark named More projects, a descriptive destination
name and decorative arrows. Confirm one next link followed by one catalog link,
arrival at the destination's top and normal browser Back behavior. Check actual
cycle targets and an insertion/reordering case. Reuse must preserve the accepted
homepage bar and all unrelated case content. Local visual approval precedes any
release step.
