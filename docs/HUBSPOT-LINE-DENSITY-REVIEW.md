# HubSpot line-density review

Date: 2026-10-01. Status: all reductions approved and implemented locally;
spacing refinement included. Leo accepted the local candidate and explicitly
authorized deployment of the CSS-only release.
Published through PR 12, merge 3db9a75, production deployment 6779115888.
Current state: [REDESIGN-CURRENT-STATE.md](./REDESIGN-CURRENT-STATE.md).

Senior art-direction and information-design review of the current local layout
and approved HubSpot visual specification. Checked rendered chapter geometry at
1262px and 390px, desktop responsibility/rollout compositions, and mobile rollout
and report-finding subdivisions. The initial review changed no product files;
the subsequently approved local implementation is recorded below.

## Recommendation

| Area | Preserve | Reduce |
| --- | --- | --- |
| Hero, coverage proof, Overview | Chapter boundaries, proof relationships, labelled overview fields | No further change |
| Decision trail and workflow evidence | Connectors, state/history lanes, screenshot frames, one evidence-group divider | Keep the current removal of duplicate horizontal evidence-wrapper framing |
| Safeguards | Four main safeguard row separators | Four inner verification dividers on phones; labels already associate the check with its safeguard |
| Report discoveries | Separate finding boundaries and screenshot frames | Keep one divider before each finding's detail list; remove the four internal dividers between What changed, Result and What remains |
| Responsibility band | Outer group boundary, column separation, category markers and mobile grouping | Remove 14 bullet-item separators |
| Rollout | Desktop connecting rail, three markers, stage headings, one divider before each bullet list and the concluding callout | Remove 15 bullet-item separators |
| Closing call to action | Previous chapter boundary and footer boundary | Remove the extra line immediately above the closing headline |

The clearest first correction is the 29 ordinary bullet-item separators in
responsibility and rollout. These lists already have bullets, labels, spacing,
and group structure. Their rules add a table-like pattern without encoding an
additional relationship. Keep meaningful group and diagram lines.

For Booking, the line immediately above "Build a workflow that survives
production." is also redundant: the preceding adaptability chapter already
has a boundary, and the closing headline/spacing establish the next group.
Remove that closing-frame top line without changing copy.

Any implementation is local first. Scope the HubSpot selectors to its case-study
root and the Booking closing correction to its own page. Preserve forced-color
boundaries, source evidence, interaction/motion behavior, and the deployed dock.
Leo approved all recommendations and added space management across the case
studies, specifically excess space in Salesforce's Operational result. No
deployment approval is inferred from this local implementation authorization.

## Approved spacing refinement

- Remove the closing grid's extra 48px padding at each end; the closing section
  itself provides the spacing.
- Remove the 48px chapter-header bottom padding; existing content margins retain
  the gap between heading and body.
- Reduce chapter and closing padding to a responsive 56px minimum, 6vw, 96px
  maximum. Keep Salesforce's already compact status-section padding.
- Give Salesforce's result ten desktop columns rather than nine, retain the
  left label and stacked mobile layout, and reduce the closing padding and
  related-link gaps. Preserve its exact wording and display hierarchy.
- Tighten the HubSpot context-to-first-finding gap, finding and supporting-evidence
  padding, and ordinary bullet-list padding. Keep report image dimensions,
  finding boundaries, and bullet alignment; do not crop or shrink evidence.

These support the approved calm, deliberate presentation and readable responsive
layout. Hero compositions, evidence dimensions, diagrams, motion, and utility
dock behavior remain unchanged.
