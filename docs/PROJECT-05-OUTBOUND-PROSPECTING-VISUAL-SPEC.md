# Project 05 Outbound Prospecting Visual Specification

Status: Released to production

Approved by Leo Sanga: 2026-09-28

## Purpose

Give `AI-Assisted Outbound Prospecting Workflow (n8n)` a project-specific
homepage visual that shows how a limited visitor signal becomes a researched
and qualified draft for human review. The experience must distinguish this
project from the Project 4 qualification loop and must not imply autonomous
email sending.

The visitor-identification vendor is intentionally omitted. The public story is
about the integration design, the context supplied to the LLM, and the human
review boundary.

## Approved system account

1. A website visitor signal reaches Slack with limited lead details such as an
   email address, company name, LinkedIn profile, and the page viewed.
2. A Slack webhook starts the n8n workflow. The notification fields are mapped
   directly and do not require custom parsing.
3. HubSpot is checked for matching records as an initial qualification and
   context step. Existing context is used when available, but most visitors are
   new leads and no record is created at this stage.
4. n8n and the LLM perform the manual company research that would otherwise
   take the rep significant time. The research considers public company
   sources, leadership, current activity, possible pain points, and relevant
   case studies.
5. The page viewed guides the message angle internally. It is not treated as a
   separate outreach action.
6. The completed research determines whether the opportunity fits.
7. JavaScript normalizes the available context, applies qualification logic,
   prepares the LLM input, and validates the formatted result.
8. A conversation-starter draft is posted as a reply in the original Slack
   thread for rep review.

The workflow stops at a draft. It does not send outreach automatically. Contact
creation occurs downstream only if a draft is sent, so it is outside this
visual.

## Visual direction

Use a research-brief workspace rather than a conventional node diagram.
Desktop presents a compact input rail above two primary regions:

- The input rail carries the limited visitor signal, workflow start, and optional
  CRM context in semantic order.
- A research brief where the company research accumulates.
- A draft workspace that resolves into the original Slack thread.

The research brief carries the strongest visual weight. It shows only company
context, leadership and activity, pain-point fit, and relevant proof. The page
viewed appears as one compact signal that guides the message angle. The motion
should make research accumulation visible without simulating literal typing or
showing invented outreach copy. The draft stays content-sized rather than
stretching to match the research brief. Mobile uses one linear sequence in
semantic order.

## Approved visible copy

Disclosure eyebrow: `Context to draft`

Disclosure label: `See how it works`

Scope statement:

`This view shows how a limited visitor signal becomes a researched draft for
review. The full research and qualification logic stays out of scope.`

Visible labels:

1. `Limited lead details and the page viewed arrive in Slack`
2. `The Slack notification starts the n8n workflow`
3. `Existing HubSpot context is used when available`
4. `Public company sources build the research brief`
5. `Current company signals add context`
6. `Research identifies where the company may need support`
7. `Matching case studies support the angle`
8. `The visited page guides the angle`
9. `The completed research determines whether the opportunity fits`
10. `The evidence and relevant case studies shape the conversation starter`
11. `The draft returns to the original notification for review`

Final status: `Ready for review`

## Card copy and stack

Approved solution:

`An n8n workflow turns a limited visitor signal into a researched company brief
and determines whether the opportunity fits. The LLM uses that evidence and
relevant case studies to return a personalized draft to Slack for rep review.`

Approved stack:

`n8n / JavaScript / HubSpot API / Slack API / Webhooks / LLM`

## Motion behavior

- Use an approximately twelve-second loop.
- Advance from the limited signal through the CRM check, research brief,
  research qualification, draft preparation, and Slack review.
- Give the research brief most of the loop time.
- Hold the completed state between passes.
- Loop only while the disclosure is open, intersects the viewport, the document
  is visible, and reduced motion is not requested.
- Return to the complete static state when the loop is inactive.
- Do not add a replay button.
- Keep every step readable throughout the loop.

## Evidence boundary

Do not publish the visitor-identification vendor, qualification criteria,
scoring weights, thresholds, real records, real page paths, employer or client
information, final outreach copy, or realistic mock data. Do not imply that the
LLM sends messages or that the Slack reply is an approval required by the
automation.

## Implementation surface

- `src/content/portfolio-v2/types.ts`
- `src/content/portfolio-v2/project-visuals.ts`
- `src/components/portfolio-v2/ProjectVisualDisclosureV2.tsx`
- `src/components/portfolio-v2/OutboundDraftAssemblyV2.tsx`
- `src/components/portfolio/data.ts`
- `src/styles/portfolio-v2.css`
- `docs/REDESIGN-CURRENT-STATE.md`

No new dependency, raster asset, route, public mock record, or deployment is
part of this change.

## Verification

- Local TypeScript executable
- Targeted ESLint and Prettier checks
- Production build
- Server-rendered complete state
- Native disclosure keyboard behavior
- Loop start, pause, reset, and document-visibility behavior
- Reduced motion and no-JavaScript behavior
- Light and dark themes
- Narrow and desktop layouts
- Forced colors and readable inactive states
- Semantic reading order
- No horizontal overflow
- No regression to project-section navigation or Projects 3 and 4
