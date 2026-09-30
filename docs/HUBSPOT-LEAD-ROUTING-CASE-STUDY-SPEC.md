# HubSpot Lead Routing Case Study

Status: final visual refinement complete locally, not committed or published.

Date: 2026-09-24

## Authority

The detailed evidence, approved copy, claim limits, and media captions remain in
the sibling project at:

`../hubspot-revops-architecture/docs/hubspot-portfolio-case-study-spec.md`

The local implementation handoff is at:

`../hubspot-revops-architecture/docs/hubspot-portfolio-implementation-handoff.md`

The approved visual revision and acceptance criteria are at:

`../hubspot-revops-architecture/docs/hubspot-portfolio-visual-revision-spec.md`

The runtime copy has one source in
`src/content/portfolio-v2/hubspot-lead-routing.ts`. Components must not create
competing summaries or claims.

## Portfolio role

- The Booking Agent remains the only lead project.
- The HubSpot project is the first secondary case study.
- Five existing projects remain standard project rows in their existing order.
- The dedicated route is `/projects/lead-routing-pipeline-health-system`.

## Public-language rule

Write for a recruiter, hiring manager, operations leader, or business owner who
has never built a HubSpot workflow. Prefer clear answers to these questions:

- What was built?
- Why was it needed?
- What went wrong?
- How was it fixed?
- How do we know?
- What remains unresolved?

Keep exact product names only where the environment, interface, evidence, or
technology list requires them. Explain `HubSpot developer sandbox account` at
first mention and state that it contains test data rather than customer data.

## Claim boundaries

- Do not claim a percentage improvement from the response-time reports. The two
  test groups are different sizes.
- Do not claim real conversion performance, routing accuracy, or predictive
  scoring performance.
- Keep native HubSpot behavior separate from behavior proved by automated tests.
- State that the supporting service is tested but is not deployed into the live
  HubSpot workflow.
- Do not imply that automation after `Sales Accepted` is complete.
- Do not publish HubSpot portal IDs, owner emails, private paths, raw logs, or
  generated report summaries.

## Media gate

The local first-release media gate is complete. The route includes the reviewed
Routing Workflow, SLA Watch, and three selected dashboard reports. The complete
Routing Workflow and SLA Watch screenshots now appear side by side in the lead
journey on desktop. They stack only at the mobile breakpoint and are not hidden
behind disclosures. The report findings use the clean dashboard cards without
repeating workflow screenshots.

Four earlier focused workflow derivatives remain recorded in the asset manifest
for provenance, but the current route does not render them. The displayed
workflow images and report cards exclude browser controls, account controls,
unrelated reports, and generated HubSpot summaries.

## Implemented composition

- The homepage keeps the Booking Agent as the only featured project and places
  this case study second.
- The homepage card uses a focused report-coverage check. It starts with 14
  assigned test leads, shows the 8-and-6 routing split, makes the six missing
  report records visible, then ends with all 14 assigned leads measured.
- The dedicated route opens with an unnumbered hero and then repeats the homepage
  report-coverage proof as its unnumbered signature visual.
- Section 01 is the compact Overview using `The problem`, `What I built`, and
  `The hard part`.
- Section 02 explains a transferable CRM design principle: the current record can
  change while the decision history remains available to operations and
  reporting. The fixed-height animation runs in place and does not extend the
  page through scroll-led scenes.
- The two complete HubSpot workflow screenshots sit beneath that visual under
  `Implemented in HubSpot`. They prove the current implementation without making
  HubSpot the entire point of the section.
- All five displayed HubSpot screenshots remain complete and visible inline.
  Clicking an image or its visible `View larger` action opens the same accessible
  viewer with the evidence label and caption. It opens magnified, the image
  switches between magnified and fit-to-screen views, Escape and Close dismiss
  it, and focus returns to the exact opener.
- The remaining numbered sections cover safeguards, report discoveries, the
  HubSpot-versus-tested system boundary, and the path from sandbox testing to a
  live CRM.
- The complete evidence is present in server-rendered HTML. The coverage proof
  repeats every 5.6 seconds while visible on the homepage and case-study route,
  holds the resolved result between passes, pauses offscreen or while the
  document is hidden, and shows the final state for reduced motion.
- The hero uses the same support-copy role and scale as the Booking Agent. The
  supporting copy and technology list share one column so the title height does
  not create an oversized vertical gap.
- The Booking Agent case-study route now carries its homepage failure-safe
  record directly after the hero. It plays once and settles before the Overview,
  so the homepage promise is present at the start of the route itself.
- Desktop and 390-pixel mobile checks found no document-level horizontal
  overflow. TypeScript, targeted lint, formatting, and the production build
  pass.
- The existing early-theme hydration warning remains a site-wide baseline and
  is not introduced by this case study.
- Only top-level case-study sections use numeric indices. Required report
  evidence is visible inside Section 04 without a disclosure.
- The opening proof is compact on desktop and art-directed for mobile. At 390
  pixels wide, the route split stays beside the assigned total, the earlier and
  current report states share a row, and the correction remains readable below
  them.
- Section 05 uses one three-zone boundary band because the columns describe
  responsibility, not a process. Section 06 uses one rail and three markers
  because the stages form a real rollout sequence. The rail is removed when the
  stages stack on mobile.

No commit, push, preview deployment, production deployment, or publication is
authorized by this document.
