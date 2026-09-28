# Project 07 Executive Reporting Visual Specification

Status: Approved for local implementation

Approved by Leo Sanga: 2026-09-29

## Purpose

Give `Executive Reporting & Dashboard Automation (Fully custom)` a
project-specific homepage visual that explains why different metrics required
different reporting architectures before they could remain available in a live
dashboard.

The visual supports the portfolio goal by showing analytics architecture,
integration judgment, and reporting ownership without publishing client data or
inventing dashboard evidence.

## Approved system account

1. The primary platform supports extensive reporting, but some enterprise
   metrics fall outside its built-in capabilities.
2. Each unsupported metric receives its own reporting path rather than being
   forced through one shared architecture.
3. A metric may rely on native reporting, external modeling, a data connector,
   or a custom API path.
4. The completed metric feeds a live dashboard where reporting remains
   available on demand.
5. The public visual shows representative architecture patterns. It does not
   assign specific tools to unconfirmed source, modeling, or output roles.

## Visual direction

Use a metric-architecture workspace rather than a conventional flowchart or a
fabricated dashboard. Three representative reporting paths sit beside one
shared architecture blueprint and a restrained live-dashboard surface.

Lead with the completed reporting outcome, then use motion to explain how the
three paths support it. This keeps the first impression legible to senior
leaders and recruiters before they inspect the implementation logic.

The paths are:

- A native path where platform reporting can support the metric.
- A modeled path where external modeling completes the metric.
- An integrated path where a connector or custom API supplies the missing data.

The active path updates the architecture blueprint and makes one additional
metric available in the dashboard. The completed state shows that different
paths can feed one reporting experience without claiming real metric names,
values, formulas, or tool assignments.

Desktop uses a compact three-region composition: reporting paths, architecture
blueprint, and live dashboard. Mobile uses one semantic sequence with the
reporting paths first, the blueprint second, and the completed reporting surface
last. Every region remains content-sized.

## Approved visible copy

Disclosure eyebrow: `Metric architecture`

Disclosure label: `See how it works`

Scope statement:

`Reporting that once required manual analysis stays available on demand because
each complex metric gets the architecture it needs.`

Evidence note:

`Representative pattern. Client data, metric definitions, and implementation
details are not shown.`

Visible labels:

1. `Platform reporting supports the metric`
2. `External modeling completes the metric`
3. `A connector or custom API supplies the data`
4. `The reporting path changes with the metric`
5. `The completed metric stays available on demand`
6. `Manual analysis required`
7. `Available on demand`

Dashboard eyebrow: `Outcome`

Dashboard heading: `Live dashboard`

Blueprint outcome label: `Dashboard outcome`

Final status: `Available on demand`

The existing problem, solution, hard-part, and technology copy remain
unchanged.

## Motion behavior

- Use a 10.6-second loop that opens on the complete reporting outcome.
- Hold the complete state for approximately 1.5 seconds before beginning the
  path sequence.
- Advance through the three representative paths one at a time.
- Update the architecture blueprint as the active path changes.
- Add one completed metric module to the dashboard after each path resolves.
- Hold the completed reporting surface for approximately 1.5 seconds between
  passes.
- Loop only while the disclosure is open, intersects the viewport, the document
  is visible, and reduced motion is not requested.
- Return to the complete static state when the loop is inactive.
- Do not add a replay button.
- Keep every path and label readable throughout the loop.

## Evidence boundary

Do not publish real metrics, values, client or employer details, dashboard
screenshots, field names, formulas, API endpoints, refresh schedules, report
names, or realistic mock data. Do not assign Google Sheets, Excel, Jira, Power
BI, Tableau, or another named tool to a specific architectural role without
confirmed evidence.

## Implementation surface

- `src/content/portfolio-v2/types.ts`
- `src/content/portfolio-v2/project-visuals.ts`
- `src/components/portfolio-v2/ProjectVisualDisclosureV2.tsx`
- `src/components/portfolio-v2/ExecutiveReportingArchitectureV2.tsx`
- `src/styles/portfolio-v2.css`
- `docs/REDESIGN-CURRENT-STATE.md`

No new dependency, raster asset, route, public mock dashboard, or deployment is
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
- 200 percent text sizing and forced colors
- Semantic reading order
- No horizontal overflow
- No regression to project-section navigation or Projects 3 through 6
