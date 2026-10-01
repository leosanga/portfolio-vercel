# Case-study visual correction for local review

Date: 2026-10-01. Status: narrower correction, HubSpot reductions and spacing
refinement visually accepted and deployment explicitly approved by Leo.
Published through PR 12, merge 3db9a75, production deployment 6779115888.
Current state: [REDESIGN-CURRENT-STATE.md](./REDESIGN-CURRENT-STATE.md).

Leo requested fewer horizontal lines across case studies and confirmed that the
Salesforce Operational result issue concerns its visual layout. Preserve all copy,
claims, evidence, routing, motion, control behavior, and the deployed dock fix.

Senior perspectives: frontend art direction, release engineering, and accessibility.
This implements the goal's calm, deliberate presentation and the case-study
guideline against multiple boundaries describing the same content group.

## Bounded local design

- Preserve the main chapter boundaries, signature-proof boundary, Built with
  divider, narrative rows, safeguard/comparison separators, diagrams, screenshot
  frames, and navigation/footer separation. Leo rejected the first proposal's
  broad removal and approved a narrower correction with "proceed".
- Remove only the extra header divider within a chapter that already has a main
  boundary; remove the closing panel's duplicate frame while retaining the prior
  chapter and footer boundaries; remove the HubSpot evidence wrapper's extra frame while keeping
  the screenshot button's own border. Preserve forced-color boundaries.
- For Salesforce's close, propose an asymmetric desktop grid: compact label at
  left, the unchanged result statement and related case-study introduction at
  right, with ten columns available to the statement to avoid wasted width.
  Give the statement a stronger display scale, then stack all fields on
  phone/tablet widths. Do not describe this as an exact historical restoration:
  Git contains only the published Salesforce layout.
- Change only src/styles/portfolio-v2.css for product behavior. Audit and workflow
  records are separate local review files. No new dependencies or public copy.
- Apply the approved HubSpot row reductions and space-management refinements
  recorded in HUBSPOT-LINE-DENSITY-REVIEW.md. Remove duplicate header/closing
  padding and tighten chapter spacing, preserving existing content margins,
  evidence dimensions, and Salesforce's already compact status section.

## Acceptance

Inspect all three routes at 1262px and 390px; inspect Salesforce at 1024px and
the stacking boundary. Check overflow, heading hierarchy, unchanged wording,
evidence-dialog open/Escape/focus return, dock persistence, footer clearance,
and untransformed sections. Build and TypeScript must pass. Preference behavior
requires runtime evidence or an explicit NOT TESTED entry, never a source-based
claim that an emulated preference was tested.

Leo inspects http://127.0.0.1:8091/ before publication. The urgent dock deployment
approval does not cover these changes. Exact layout acceptance and deployment
authority remain with Leo. Leo subsequently approved the inspected candidate and
said "let's deploy"; that authorizes this CSS-only release, including PR and
production merge, after the documented checks.
