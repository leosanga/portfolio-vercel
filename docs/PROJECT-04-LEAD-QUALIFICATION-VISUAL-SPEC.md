# Project 04 Lead Qualification Visual Specification

Status: Approved for local implementation

Approved by Leo Sanga: 2026-09-28

## Purpose

Give `AI-Assisted Lead Qualification (HubSpot + n8n)` a project-specific
homepage visual that explains the integration boundary without exposing the
qualification criteria or the larger routing topology.

The visual supports the portfolio goal by showing systems ownership,
event-driven integration, and operational visibility. It is not a complete
workflow diagram and must not be presented as one.

## Approved system account

1. An existing HubSpot workflow identifies that qualification information is
   missing and posts a notification to a Slack channel.
2. The Slack notification contains the contact email address and triggers n8n
   through a webhook.
3. n8n uses its HubSpot node to retrieve the contact context needed for the
   research.
4. n8n performs the research and qualification with an LLM.
5. n8n writes the qualification data back to the HubSpot contact record.
6. The HubSpot record update triggers existing HubSpot workflows, which route
   the contact into the appropriate path.
7. n8n posts its outcome as a reply in the original Slack thread so the team
   remains aware and can coordinate follow-up when needed.

The existing HubSpot workflows were not modified for this integration. They
continue to respond to the record state they already use.

## Visual direction

Use a focused qualification loop with three system regions: Slack, n8n, and
HubSpot. The original Slack alert begins the loop. Research and qualification
sit in the n8n region. The completed result reaches two surfaces:

- HubSpot receives the qualification properties and activates its existing
  workflows.
- The original Slack thread receives the outcome for team visibility.

The diagram uses semantic HTML nodes and a decorative measured SVG connector
layer. Desktop uses a three-column composition. Mobile uses one linear column
with the HubSpot outcome before the Slack visibility outcome.

## Approved visible copy

Disclosure eyebrow: `Qualification loop`

Disclosure label: `See how it works`

Scope statement:

`This view shows how missing qualification data is completed. The qualification
criteria and downstream routing paths are not shown.`

Node labels:

1. `Existing workflow posts a missing-information alert`
2. `Email address starts the n8n workflow`
3. `Contact context is retrieved from HubSpot`
4. `Research and qualification run outside HubSpot`
5. `Qualification properties are written back`
6. `Existing HubSpot workflows respond to the update`
7. `Outcome is posted in the original Slack thread`
8. `The team can review and coordinate follow-up`

## Motion behavior

- Use an approximately eight-second loop.
- Animate the operational sequence, then hold the completed state for about
  three seconds.
- Loop only while the disclosure is open, intersects the viewport, the document
  is visible, and reduced motion is not requested.
- Return to the complete static state when the loop is inactive.
- Restart with a clean cycle after the visual returns to the viewport.
- Do not add a replay button.
- Keep every node readable throughout the loop. Motion changes emphasis and
  signal position only.

## Evidence boundary

Do not publish qualification criteria, scoring weights, thresholds, real
property names, real records, employer or client information, named routing
paths, or realistic mock data. Do not imply that Slack controls routing or that
the Slack reply is a required approval step.

## Implementation surface

- `src/content/portfolio-v2/types.ts`
- `src/content/portfolio-v2/project-visuals.ts`
- `src/content/portfolio-v2/content.ts`
- `src/components/portfolio-v2/ProjectRowV2.tsx`
- `src/components/portfolio-v2/ProjectVisualDisclosureV2.tsx`
- `src/components/portfolio-v2/LeadQualificationLoopV2.tsx`
- `src/components/portfolio/data.ts`
- `src/styles/portfolio-v2.css`
- `PIPELINE_DIAGRAM_PLAN.md`
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
- 320, 390, 768, laptop, and wide-desktop layouts
- 200 and 400 percent zoom
- Forced colors
- Semantic reading order without the connector layer
- No horizontal overflow
- No regression to project-section navigation or Project 3
