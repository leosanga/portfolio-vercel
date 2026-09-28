# Project 06 Support Ticket Visual Specification

Status: Approved for production release

Approved by Leo Sanga: 2026-09-28

## Purpose

Give `Support Ticket Pipeline Automation (HubSpot)` a project-specific homepage
visual that explains ticket continuity and state-driven work without publishing
the complete internal support process.

The source flowchart is evidence only. It contains a company address, internal
team and partner names, exact statuses, timing rules, channel names, and
downstream operating details that must not appear on the public site.

## Approved system account

1. An incoming email is identified as a new request or a reply to an existing
   conversation.
2. A new request creates a HubSpot ticket. A reply reactivates the same existing
   ticket, including when that ticket had already been resolved or closed.
3. Slack notifications make new or reactivated work visible to the support
   team. A team member claims the work and ticket ownership is updated in
   HubSpot.
4. The ticket lifecycle state determines the next action and follow-up behavior.
5. Several internal waiting states use different operating rules. The public
   visual groups them into one `Waiting` state.
6. A new reply returns the same ticket to active work.
7. Resolved work moves toward closure after its response window.

The source workflow can close a new ticket when no action is required. Leo
confirmed that behavior is accurate but not important enough to include in the
homepage visual.

## Visual direction

Use a ticket lifecycle record rather than a conventional flowchart. Two compact
entry conditions, `New request` and `Existing reply`, feed one central ticket
record. The record shows only structural categories: conversation, owner,
lifecycle state, and next action.

A five-state rail shows `Intake`, `Active`, `Waiting`, `Resolved`, and `Closed`.
The reply transition visibly returns the same ticket from waiting to active
work. Compact supporting rules explain ownership, state-driven action,
follow-up, and resolution without reproducing the full internal topology.

Desktop uses the two entry conditions above the record and a compact two-column
rule grid beneath it. Mobile uses one semantic sequence. Every region remains
content-sized.

## Approved visible copy

Disclosure eyebrow: `Ticket lifecycle`

Disclosure label: `See how it works`

Scope statement:

`This view shows how a support request stays connected to the right ticket and
next action through resolution. Internal routing rules and timing details are
not shown.`

Visible labels:

1. `A new request creates a ticket`
2. `A reply returns work to the existing ticket`
3. `The team is notified and ownership becomes visible`
4. `The ticket state determines the next action`
5. `Waiting work keeps its follow-up`
6. `A reply returns the ticket to active work`
7. `Resolved work moves toward closure`

Final status: `Lifecycle complete`

Approved stack:

`HubSpot / Slack / Workflow Automation / Custom Properties / Process Mapping`

The existing problem, solution, and hard-part copy remain unchanged.

## Motion behavior

- Use an approximately nine-second loop.
- Advance from a new request through ownership, waiting work, an existing reply,
  reactivation, resolution, and closure.
- Animate record values and lifecycle emphasis instead of moving signals through
  the complete source topology.
- Hold the completed state between passes.
- Loop only while the disclosure is open, intersects the viewport, the document
  is visible, and reduced motion is not requested.
- Return to the complete static state when the loop is inactive.
- Do not add a replay button.
- Keep every label readable throughout the loop.

## Evidence boundary

Do not publish the source image, company email address, company identity,
internal team or partner names, exact status names, reminder intervals, Slack
channel names, feedback routing, detailed decision conditions, or realistic
ticket data. Do not imply that Slack is the system of record.

## Implementation surface

- `src/content/portfolio-v2/types.ts`
- `src/content/portfolio-v2/project-visuals.ts`
- `src/components/portfolio-v2/ProjectVisualDisclosureV2.tsx`
- `src/components/portfolio-v2/SupportTicketLifecycleV2.tsx`
- `src/components/portfolio/data.ts`
- `src/styles/portfolio-v2.css`
- `docs/REDESIGN-CURRENT-STATE.md`

No new dependency, raster asset, route, or public mock ticket is part of this
change.

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
- No regression to project-section navigation or Projects 3 through 5
