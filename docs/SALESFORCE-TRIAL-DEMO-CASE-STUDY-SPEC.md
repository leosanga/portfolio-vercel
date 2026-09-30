# Salesforce Trial and Demo Case Study

Status: SUPERSEDED on 2026-09-28 by
`docs/SALESFORCE-CASE-STUDY-REVISION-IMPLEMENTATION-SPEC.md`. Do not use this
document as the implementation authority. It remains as the decision and evidence
history for the first local version.

Correction recorded 2026-09-30: the separate `/projects` index and removal of the five
standard homepage project rows were not approved by Leo. Revision 5 of the active
implementation specification restores the live homepage structure and supplies the
title-derived Salesforce case-study route.

Date: 2026-09-28

## Authority and sources

- Highest authority: `docs/PROJECT-GOAL.md`, then this specification, then
  `docs/CASE-STUDY-DESIGN-GUIDELINES.md` where this specification is silent.
- Factual claim boundary:
  `../salesforce-revenue-system/docs/portfolio-case-study-handoff.md`. Every public claim
  below maps to a row in its claim-to-evidence map, or is listed under "Claims outside the
  handoff map" for Leo's approval.
- Verification sources, used only to check claims: the Salesforce project's
  `docs/PROJECT-GOAL.md`, its approved design specification
  (`docs/superpowers/specs/2026-09-27-salesforce-revenue-system-design.md`), its `README.md`,
  and its execution ledger.
- Voice: `~/.claude/voice.md`, Mode 4 (professional copy about Leo). No em dashes.

Active senior perspectives: portfolio strategist, Revenue Systems hiring manager, Salesforce
architect, content designer, conversion strategist, UX architect, accessibility engineer,
technical SEO strategist.

## Approved decisions (not reopened)

- Title: **Trial & Demo Matching & Routing System (Salesforce)**
- Homepage order: Booking Agent is the lead case study, Salesforce is the second prominent
  case study, HubSpot is the third.
- The five smaller project summaries move to a simple `/projects` index without filters.
- Thesis: **Every trial sign-up and demo request should enter the customer and pipeline
  context the business already has.**
- Signature visual heading: **The same request takes a different path as the company
  relationship changes.**
- The visual shows four paths: unknown company to a new Lead in the inbound queue, open deal
  to the deal owner, customer to the account owner, and conflicting evidence stopping for
  review with a reason.
- Positioning pair: Salesforce determines where an inbound request belongs before the CRM
  creates or routes the next record. HubSpot demonstrates how routing decisions and
  reporting remain consistent after a lead enters the CRM.

This specification supersedes three lines of `HUBSPOT-LEAD-ROUTING-CASE-STUDY-SPEC.md`
("Booking Agent remains the only lead project", "HubSpot is the first secondary case study",
"Five existing projects remain standard project rows"). The HubSpot copy itself is
unchanged.

## Evidence checks against the approved decisions

No approved decision is contradicted by the evidence. Three points constrain how the
approved decisions are rendered:

1. **"The same request."** The recorded story sent three requests from three different
   fictional people at Growing Company S (`story-1.json` to `story-3.json`), and between the
   first and second request a scripted sales step converted the first lead into an account
   and deal. The visual may present the heading as the routing principle, with one constant
   request card, but it must not claim to replay one recorded payload. The evidence caption
   in Section 02 states what the story actually sent.
2. **"Conflicting evidence."** Two of the five review patterns are conflicts (a contact on
   one account while the domain belongs to another, and a lead whose domain belongs to a
   known account). The others are ambiguous or incomplete (two matching contacts, a contact
   with no account, a personal email whose company name matches an account). The visual
   keeps the approved label and uses a real conflict example. Section 04 uses the broader
   phrase "uncertain match" so it covers all five.
3. **Handoff test names.** The handoff now cites the actual tests
   `aSingleOpenDealIsLinked` and `aCustomerAccountGivesCustomerExpansion`. No public copy
   uses test names.

## Routes

| Route                                                   | Purpose                              | Canonical URL                                                                      |
| ------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `/`                                                     | Homepage, existing eight-project set | `https://leosanga.vercel.app/` (unchanged)                                         |
| `/projects/trial-demo-routing-by-customer-relationship` | Salesforce case study                | `https://leosanga.vercel.app/projects/trial-demo-routing-by-customer-relationship` |

The homepage `#projects` anchor, section ids, project order, and scrollspy stay as they
are. No separate project index is added.

## Page structure

### Homepage `#projects`

1. Booking Agent, lead case study (unchanged).
2. Salesforce case study card with the signature visual (new, copy below).
3. HubSpot case study card with its coverage proof (unchanged copy, moves to third).
4. A quiet link to the project index (new, copy below).

The five standard project rows leave the homepage.

### Salesforce case-study route

| Order | Block                                                         | Numbered | Evidence                                  |
| ----- | ------------------------------------------------------------- | -------- | ----------------------------------------- |
| 1     | Hero                                                          | no       | none                                      |
| 2     | Signature visual (same component and cadence as the homepage) | no       | none                                      |
| 3     | 01 Overview                                                   | yes      | none                                      |
| 4     | 02 How Salesforce decides where a request belongs             | yes      | Inbound Events list, one resolved request |
| 5     | 03 What the right owner receives                              | yes      | Deal task and contact role                |
| 6     | 04 When a match is uncertain                                  | yes      | Review list                               |
| 7     | 05 What the design protects against                           | yes      | Dashboard                                 |
| 8     | 06 How it was checked                                         | yes      | none (verification band)                  |
| 9     | 07 What a live org would need                                 | yes      | none                                      |
| 10    | Related case study link                                       | no       | none                                      |
| 11    | Close with the primary call                                   | no       | none                                      |

Each screenshot appears once. Only top-level sections carry numbers.

### `/projects` index

1. Page heading and introduction.
2. Case studies: the three prominent projects as compact links.
3. More projects: the five summaries, unfiltered, in their current order and approved
   wording, reusing the existing standard project row.

## Homepage copy

### Salesforce card

**Title**

> Trial & Demo Matching & Routing System (Salesforce)

**The problem**

> Inbound requests can become unnecessary Leads or reach the wrong owner when the intake
> process ignores the customer and pipeline context already in Salesforce.

**What I built**

> I built a Salesforce-native system that uses existing CRM records to decide where each
> trial sign-up or demo request belongs. Known relationships reach the responsible owner,
> unknown companies enter the inbound queue, and uncertain matches wait for review.

**The hard part**

> The hard part was deciding when the CRM evidence was strong enough to act. Conflicting
> identity and company signals had to stop the automation and tell a reviewer what needed
> resolving.

**TECH STACK**

> Salesforce, Apex, Flow, Apex REST, Salesforce DX, Node.js

**Case-study link**

`See how Salesforce decides where each request belongs`

The card carries the signature visual as its proof experience, in the same slot the HubSpot
card uses for its coverage proof.

### Project index link

Placed after the third prominent project, left-aligned with the project content, styled as
a secondary text link with an arrow, never as a button competing with `Schedule a Call`.

`See more projects`

"Also built" is not used: Leo's earlier diagnosis was that it reads as if these are the only
projects. A count ("five more projects") is not used because the index will grow.

Target: `/projects#more-projects` (the visitor has just seen the three case studies).

## Signature visual

### Purpose

Show that the CRM's existing relationship with a company, not the form the request came
from, decides where the request goes, and that uncertainty is a separate stop.

### Content

**Eyebrow**

> Routing by relationship

**Heading**

> The same request takes a different path as the company relationship changes.

**Request card** (constant for the whole sequence)

> Demo request
>
> Growing Company S

**Column labels**

> What Salesforce knows

> Where it goes

**Paths** (an ordered list; the order is the company's relationship over time)

| State           | Destination   | Detail                                        |
| --------------- | ------------- | --------------------------------------------- |
| Unknown company | New lead      | Assigned to the inbound lead queue            |
| Open deal       | Deal owner    | Follow-up task, and the person joins the deal |
| Customer        | Account owner | Customer expansion task                       |

**Review stop** (separate from the list, never a fourth step)

> At any stage

> Conflicting evidence

> Stops for review

> Recorded reason: "Matches contact Buyer F1 at Holding Company E, but the email domain
> belongs to Company F. Pick the right account."

The quoted reason is the verbatim reason stored on the fictional test record shown in the
review-list screenshot.

**Footnote**

> Fictional company and test data.

> Conceptual routing principle. The evidence below shows three arrivals from one fictional
> company as its CRM state changed.

**Playback control labels**

Visible text `Pause` or `Play`. Accessible names `Pause the routing example` and
`Play the routing example`.

### Desktop composition

- Three aligned columns: the request card on the left, `What Salesforce knows` in the
  middle, `Where it goes` on the right. Each state and its destination share one row.
- One connector runs from the request card to the active row only. It is a real route, so a
  connector is allowed; the inactive rows carry no connector.
- The review stop sits below the three rows as a full-width band separated by a rule, with
  its own attention tone and no connector to the rows. Its `At any stage` label carries the
  meaning that it can happen in any state.
- Compact: target height of 360 pixels or less inside the homepage card, so the card's copy
  and link remain visible beside or below it without the visual taking most of the viewport.
- Use existing portfolio-v2 tokens. The review stop reuses the attention tone the booking
  proof already uses for held or failed states. No new brand colors.

### Static and final state

The server-rendered HTML contains the complete content: the request card, all three rows at
equal emphasis, and the review stop. That is also the state for reduced motion and for
visitors without JavaScript. Motion only adds emphasis to one row at a time; it never
reveals content that was absent.

### Motion

- Behavior: the active row highlights (marker filled, text at full weight, connector drawn
  to it) while the other two rows dim to secondary text color. Nothing moves position.
- Cadence: 450 ms transition into each state, then a 2,550 ms hold. Three states make one
  9-second pass. After the third hold, the highlight returns to the first row with the same
  450 ms transition. No reverse playback.
- Repeats at both placements with identical cadence. Homepage and case study use one
  component with no placement-specific timing.
- Runs only while at least 35 percent of the visual is in the viewport and the document is
  visible. It pauses when offscreen or hidden and resumes from the current row.
- The review stop never animates.
- Reduced motion (`prefers-reduced-motion: reduce`): no cycling, all rows at equal emphasis,
  no playback control shown.
- The playback control is required. The sequence runs longer than five seconds beside other
  content, so WCAG 2.2.2 requires a way to pause it. A paused state persists until the
  visitor presses Play or reloads.

### Mobile composition (390 pixels)

- Request card full width at the top.
- The three rows stack as a list. Each row keeps its state label and destination together,
  destination under the state when the width requires it.
- The connector is removed. The active row keeps its filled marker and full-weight text.
- The review stop follows the list, separated by a rule.
- The complete visual, including the review stop, fits within roughly one mobile viewport.
- The playback control stays reachable with a 44 by 44 pixel target.

### Accessibility

- A `figure` with the heading as its accessible name, following the heading pattern of the
  existing HubSpot proof at each placement.
- The paths are an `ol`, each item read as one sentence, for example "Unknown company: new
  lead, assigned to the inbound lead queue."
- The highlight, connector, and markers are decorative and hidden from assistive
  technology. No live region: announcing each state every three seconds would interrupt
  reading.
- The active state is never shown by color alone: the marker fill and text weight change
  too.
- Text meets 4.5:1 contrast at every emphasis level, including dimmed rows. Markers and the
  connector meet 3:1.
- The playback control is a native `button` with visible focus from the shared
  `:focus-visible` rule.

## Case-study copy

### Hero

**Title (H1)**

> Trial & Demo Matching & Routing System (Salesforce)

**Support**

> Salesforce checks each trial sign-up and demo request against the customer and pipeline
> context already in the CRM. Known relationships reach the responsible owner, unknown
> companies enter the inbound queue, and uncertain matches wait for review.

**Environment**

> Built in a Salesforce Developer Edition org, Salesforce's free environment for
> development, using test data for a fictional company, Software Company X.

**Label above the stack**

> BUILT WITH

**Stack**

> Salesforce, Apex, Flow, Apex REST, Salesforce DX, Node.js

Layout: the shared case-study hero scale. The title wraps at its available width. Support,
environment, and stack share one column beside the title when the desktop width allows,
matching the HubSpot hero, so the signature visual starts within the first desktop
viewport.

### Signature visual

The same component and copy as the homepage, directly after the hero, unnumbered.

### 01 Overview

Use the selected homepage `The problem`, `What I built`, and `The hard part` copy, under
those three labels. No additional introduction.

### 02 How Salesforce decides where a request belongs

**Heading**

> How does Salesforce decide where a request belongs?

**Label**

> Design principle

**Principle**

> Every trial sign-up and demo request should enter the customer and pipeline context the
> business already has.

**Body**

> A person is identified by email address and a company by the email's domain. Addresses
> from personal email providers never match a company by domain.

> Uncertain matches are checked first, so a doubtful request never creates or routes
> follow-up work. An open deal outranks customer status because the deal is the most
> time-sensitive relationship.

**Platform note**

> The principle carries to any CRM. The objects, automation, and permissions shown here are
> specific to this Salesforce build.

**Evidence label**

> Implemented in Salesforce

Evidence: E1 Inbound Events list, then E2 one resolved request, side by side on desktop,
stacked on mobile.

### 03 What the right owner receives

**Heading**

> What does the right owner receive?

**Introduction**

> Apex makes the matching decision because its rules are subtle and need a test for every
> case. Flow carries out the follow-up in visible, admin-managed Salesforce automation.

**Paths** (a two-column definition list, stacked on mobile)

| What Salesforce knows  | What happens                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Unknown company        | A new lead, assigned to the New Inbound Leads queue.                                    |
| One open deal          | A follow-up task for the deal owner. The person is added to the deal as a contact role. |
| Several open deals     | A task for the account owner, who chooses the deal.                                     |
| Customer               | A Customer Expansion task for the account owner.                                        |
| Known company, no deal | A task for the account owner.                                                           |

**Note below the list**

> A person at a known company is added as a contact on that account, so existing accounts
> do not collect stray leads.

Evidence: E4 deal task and contact role.

### 04 When a match is uncertain

**Heading**

> What happens when a match is uncertain?

**Body**

> When the evidence is incomplete or points to two different relationships, the system
> stops. No Lead, Contact, or follow-up task is created. The inbound event waits in the
> Inbound Review queue with a reason that names the next step.

> The system never merges, converts, or deletes a record. Those steps stay with a person who
> can see the whole relationship.

Evidence: E3 review list.

### 05 What the design protects against

**Heading**

> What does the design protect against?

**Introduction**

> An integration can report success while it repeats work or loses a rejected request. These
> safeguards cover the failures that are easiest to miss.

**Safeguards** (title, body, and a `How this was checked` line each)

1. **Repeat deliveries change nothing**

   > A request that was already resolved or held returns as a duplicate. A rejected request
   > can be corrected and sent again with the same ID.

   How this was checked:

   > A resolved request was resent in automated tests; the event and Lead counts remained
   > one.

2. **Rejected and failed requests stay visible**

   > Resolved, held, rejected, and failed requests are stored with a status and a reason. A
   > repeat within the same delivery returns a result without a second record.

   How this was checked:

   > Covered by automated tests

3. **The sending credential cannot read accounts**

   > The credential that submits requests has access to the inbound API only. It cannot read
   > the account records the matching runs against.

   How this was checked:

   > Checked with an automated access test

**Evidence label**

> Reporting over the test run

Evidence: E5 dashboard.

### 06 How it was checked

**Heading**

> How was it checked?

**Verification band** (static, one item per line)

> 58 Apex tests passed, with 99% code coverage across the org.

> 9 tests passed for the sender that submits requests and checks each result.

> A fresh Salesforce org rebuilt from the repository matched all 16 expected results.

> The Developer Edition run through the real credential matched all 16 expected results.

**Band label**

> Project verification · September 2026

**Scope note**

> These results check the build. They do not measure business performance.

**Subheading**

> Known limits

**Limits**

> Company matching uses the exact email domain. A subsidiary on its own domain does not
> match its parent company automatically.

> Within one delivery, a rejected request followed by its correction under the same ID is
> treated as a duplicate. A corrected resend in a later delivery works.

### 07 What a live org would need

**Heading**

> What would a live org need?

**Introduction**

> This project proves the design with fictional data. A live rollout would first configure
> it around the company's real teams and systems.

**Steps** (a plain list; not a sequence, so no rail or connector)

> Replace the fictional owners, queues, and test records with the company's own.

> Connect the product sign-up and the website demo form to the inbound API.

> Create the sending credential in that org, because its secret and run-as user belong to
> one org.

> Decide who works the review queue and how quickly.

> Decide whether subsidiaries on their own domains should match their parent company.

### Related case study

> This project decides whether a request belongs with an existing relationship, in the
> inbound queue, or in review. The HubSpot case study follows a lead after it enters the CRM.

Link label: `Read the HubSpot case study`, to `/projects/lead-routing-pipeline-health-system`.

### Close

**Heading**

> Build a CRM that recognizes who is asking.

**Supporting line**

> I can help you find where inbound requests lose the customer and deal context your CRM
> already holds, then design routing your team can run and maintain.

**Button**

> Schedule a Call

**Scheduling context**

> 30 minutes · Google Calendar

## Evidence plan

All five images come from `../salesforce-revenue-system/docs/evidence/`, captured
2026-09-27 in the long-lived Developer Edition org after the fixtures and story were sent
through the real credential. Each is 1204 by 1000 pixels.

Processing: convert to WebP at the source dimensions into
`src/assets/portfolio-v2/salesforce/`, record provenance in
`src/assets/portfolio-v2/ASSET-SOURCES.md` the way the booking assets do, and keep each
image complete and uncropped. The Salesforce header stays in frame because its
`Developer Edition` label is part of the environment proof.

Display: every image is visible inline at full width of its column, with `width` and
`height` set, lazy-loaded (all sit below the first viewport). Clicking the image or its
visible `View larger` action opens the existing evidence dialog, magnified, with the label
and caption. No evidence sits behind a disclosure.

### E1 Inbound Events list

- Section: 02
- Source: `1-inbound-events.jpg`, asset `inbound-events.webp`
- Label: `Inbound Events`
- Alt: `Salesforce list of 18 Inbound Event records with status, outcome, source, company,
and reason columns.`
- Caption:

  > The 18 stored inbound events, each with its status, outcome, and a one-sentence reason.
  > The last three rows are three arrivals from one fictional company as its relationship
  > changed. The list shows decisions, not the follow-up work each one created.

- Proves: one intake produces several outcomes and keeps a reason for each (handoff rows 1,
  2, 7).
- Does not prove: queue membership or the tasks created. Some reasons are truncated in the
  list, so the viewer carries close reading.

### E2 One resolved request

- Section: 02
- Source: `2-resolved-event.jpg`, asset `resolved-event.webp`
- Label: `One resolved request`
- Alt: `Salesforce Inbound Event IE-000016, status Resolved, outcome Open Opportunity, linked
to Growing Company S, contact Buyer S2, and its open deal.`
- Caption:

  > A demo request from Growing Company S, linked to the account, contact, and deal it
  > matched, with the decision reason and the original request kept on the record. It shows
  > one path, a company with an open deal.

- Proves: the Open Opportunity path links existing context (handoff row 4).
- Does not prove: any other path.

### E3 Review list

- Section: 04
- Source: `3-needs-review.jpg`, asset `needs-review.webp`
- Label: `Inbound Review list`
- Alt: `Salesforce list of 5 Inbound Events with status Needs Review, each with an email,
company, and reason.`
- Caption:

  > Five test requests held for review, each with a reason that names the step that
  > resolves it, such as merging two contacts or converting a lead. Some reasons are cut off
  > in the list view.

- Proves: uncertain matches wait with a reason (handoff row 6).
- Does not prove: automated resolution, which does not exist.

### E4 Deal task and contact role

- Section: 03
- Source: `4-deal-task.jpg`, asset `deal-task.webp`
- Label: `What the deal owner received`
- Alt: `Salesforce opportunity Growing Company S - New business with an upcoming task, Demo
request: Buyer S2, for Demo Account Executive, and Buyer S2 listed as an Evaluator contact
role.`
- Caption:

  > The deal owner's follow-up task from the demo request, with the person added to the deal
  > as an Evaluator. The deal shows Closed Won because the story won it after this request
  > arrived. At the time of the request, the deal was open.

- Proves: the task and the contact role (handoff row 4), with the required timeline note.
- Does not prove: the Customer Expansion task, which has no detail screenshot. That path is
  covered by tests and appears in E1.

### E5 Dashboard

- Section: 05
- Source: `5-dashboard.jpg`, asset `dashboard.webp`
- Label: `Inbound Resolution dashboard`
- Alt: `Salesforce dashboard with a donut chart of 12 resolved requests by outcome, 5
waiting for review, and 1 rejected or failed.`
- Caption:

  > Resolved requests by outcome, beside the requests waiting for review and the ones that
  > were rejected or failed. The counts check the reporting setup against fictional data and
  > are not business results.

- Proves: reporting configuration over test data (handoff row 11).
- Does not prove: conversion, revenue, or operational improvement.

### Evidence not shown

- No screenshot for the integration credential. That claim is proven by an automated test
  and permission configuration, and the copy says so.
- No Customer Expansion task detail, no queue membership detail.
- No API response, token, org URL, instance name, or setup screen for the connected app.

## Project index copy (`/projects`)

**Page heading (H1)**

> Projects

**Introduction**

> Case studies first, then shorter summaries of systems built in earlier roles.

**Section heading (H2)**

> Case studies

Items: the three prominent projects in homepage order, each showing its title, its
selected `The problem` line, and its existing case-study link label.

**Section heading (H2)**, id `more-projects`

> More projects

Items: the five existing summaries, unfiltered, in their current order, with their approved
title, problem, solution, stack, hard part, and workflow disclosure unchanged.

**Close**: the existing site conversation block with `Schedule a Call`.

**Metadata**

- Title: `Projects | Leo Sanga`
- Description: `Case studies and project summaries from Leo Sanga, a Systems Engineer focused
on systems integration and automation.`
- Canonical: `https://leosanga.vercel.app/projects`

## Case-study metadata

**Page title**

`Salesforce Trial and Demo Routing Case Study | Leo Sanga`

**Meta description**

> See how Leo Sanga built a Salesforce system that matches trial sign-ups and demo requests
> to existing customers and deals, and holds uncertain ones for review.

**Canonical and sharing**

- Canonical:
  `https://leosanga.vercel.app/projects/trial-demo-routing-by-customer-relationship`
- Tags: the same set as the HubSpot route (`og:title`, `og:description`, `og:type`
  `article`, `og:url`, `twitter:card` `summary`, `twitter:title`, `twitter:description`,
  canonical link), filled from this section.

## Technical SEO

- One H1 per route: the project title, or `Projects` on the index.
- Numbered sections are H2. `Implemented in Salesforce`, `Known limits`, and similar labels
  are H3 or plain labels, never larger than the section heading.
- Visible copy establishes `Salesforce`, `Apex`, `Flow`, `routing`, and `trial` and `demo`
  requests naturally. No keyword repetition and no meta keywords tag.
- Internal links: homepage card to the case study, case study to HubSpot and back to
  `/#projects`, homepage to `/projects#more-projects`.
- Every evidence image has descriptive alt text and explicit dimensions to prevent layout
  shift.
- All copy is server-rendered. The signature visual's text is in the HTML, not drawn in a
  canvas or an image.
- No structured data is added in this release. The other case studies carry none.

## Page-level responsive and accessibility requirements

- No document-level horizontal overflow at 390 pixels or at desktop widths.
- Evidence pairs in Section 02 sit side by side on desktop and stack on mobile.
- The Section 03 definition list stacks each state above its outcome on mobile.
- Keyboard: every link, the playback control, and every evidence opener is reachable in
  reading order. The evidence dialog traps focus, closes with Escape and Close, and returns
  focus to the exact opener.
- Reduced motion: the signature visual shows its static state, and no other motion is
  added to this route.
- ID-bearing sections stay untransformed and untransitioned. Reveal classes go on inner
  wrappers only, per the repository invariants.

## Additional approved source-backed claims

These statements come from the approved Salesforce design specification or README, each
with a test or screenshot behind it. Leo approved them on 2026-09-28.

| Public statement                                                               | Where it appears | Evidence                                                                                              |
| ------------------------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------- |
| An open deal outranks customer status                                          | 02 body          | Design spec 4.2; test `anOpenDealOutranksCustomerStatus`                                              |
| Several open deals send the task to the account owner                          | 03 list          | Design spec 4.2 row 2b; test `twoOpenDealsLinkNoDeal`; README                                         |
| A known company with no deal gives the account owner a task                    | 03 list          | Design spec 4.2 row 4; test `aKnownDomainWithoutDealsCreatesAContactOwnedByTheAccountOwner`; E1 row 4 |
| A person at a known company becomes a contact, not a lead                      | 03 note          | Design spec 4.3; same test; E1 reasons ("Added Buyer A2 as a new contact")                            |
| Personal email domains never match a company by domain                         | 02 body          | Design spec 4.1; test `aPersonalEmailWithoutAMatchNeverMatchesByDomain`                               |
| A held request creates nothing                                                 | 04 body          | Design spec 4.2 row 1; test `twoContactsWithTheEmailNeedReviewAndNothingIsCreated`                    |
| Flow carries out the follow-up in visible, admin-managed Salesforce automation | 03 introduction  | README "How it is built"                                                                              |

Every other statement maps to handoff rows 1 to 11 or to the "Facts the public case study
must state" list.

## Implementation boundary (for the later build)

The handoff's Codex implementation plan stands (isolated branch and worktree, the file list,
the verification list). This specification adds three requirements to it:

1. The signature visual includes the playback control and the cadence defined above.
2. Copy lives in `src/content/portfolio-v2/salesforce-trial-demo-routing.ts` as the only
   source. Components do not write their own summaries.
3. Before handoff, every published sentence is compared against this document and the
   handoff claim map.

## Approval record

Leo approved this specification with the factual corrections above on 2026-09-28.

- `/projects` lists the three case studies as compact links, followed by the five summaries.
- The additional source-backed claims are approved with the admin-managed Flow wording.
- The hard part remains about deciding when the evidence is strong enough to act.
- The Salesforce visual receives its required Pause control in this release. Existing proof
  animations receive a separate accessibility review rather than expanding this build.
- E1 is recaptured without the pointer before publication. E5 is acceptable as captured;
  a cleaner recapture may replace it if one is available without changing the display name.

No commit, push, preview deployment, production deployment, or publication is authorized by
this document.
