# Tablet project proof composition

2026-10-15. Leo reported broken Salesforce and HubSpot visual cards in a
separate live portfolio window and requested a fix plus review. Base: production
4b23f53d306ce61c54830aa098cf038777c6658b, deployment 7087182308. Goal mapping:
readable project evidence, deliberate composition and responsive accessibility.
This is a correction to the approved card layouts, not a new visual direction.

## Observed defects and review

Root inspected the actual user window at 861 x803 CSS pixels, device pixel ratio
1.75, without changing zoom. Original list mode is correct below the 1024px stack
boundary. Salesforce and HubSpot proof wrappers occupy only 315px of a 781px
card body, leaving a large blank left area. Their internal diagrams crowd and
overlap. The source of the defect is the later unconditional case-study proof
placement at columns 6 / 13, which overrides the existing tablet full-width
rules of equal specificity.

Booking appears better, but its later summary placement at 1 / 13 conflicts
with the tablet body's eight explicit tracks. Four implicit tracks and extra
gaps result. Runtime reports eight 65px tracks plus four zero-width tracks;
the proof uses only 661px while approximately 741px is available inside the
body insets. This is a related cascade defect, not a reason to resize its type.

A bounded lower-model source audit independently confirmed both causes and
the proposed corrections. Root retains browser QA and final reconciliation.
Senior responsive UX, motion, frontend and visual QA judgment: restore the
existing full-width tablet design before changing the inner diagrams. More
animation, smaller type, clipped content or artificial fixed dimensions would
hide the layout failure rather than solve it.

## Bounded design and execution

Change only `src/styles/portfolio-v2.css`:

1. In the existing max-width 1099px featured-summary/proof placement rule,
   replace 1 / 13 with 1 / -1. The span then follows the parent's explicit
   eight or twelve columns without creating implicit tracks.
2. Keep case-study proof min-width:0 unconditional. Move its desktop
   grid-column:6 / 13 assignment inside width >1099px, allowing the
   existing narrower placements to apply. Compact mode's more specific
   two-column composition remains governed by its existing stylesheet.

Use the exact complement of the existing max-width:1099px rule. Runtime
review at device pixel ratio 1.75 reports rounded innerWidth values while
the CSS layout width can be fractional. A min-width:1100px condition leaves
a gap between those queries, changing the inherited proof placement in
that fraction of a pixel. The complementary query preserves the existing
desktop layout throughout that band without rewriting unrelated breakpoints.

No public copy, typography, palette, diagram content, timing, playback logic,
stack geometry, hero, dependencies or generated route edit. Preserve earlier
viewers. New isolated worktree: `tablet-project-proofs`, branch
`fix/tablet-project-proofs`, local viewer planned at port 3024.

## Acceptance and rejection

At the actual 861 x803 size, visually inspect every project proof in original
mode. All proof wrappers and summaries fill the intended available width, with
no implicit extra tracks, side void or overlapping readable diagram content.
Observe changing states, not just one still image. Inspect 767/768, 1023/1024
and 1099/1100 width transitions, phone 390px, short-height original fallback,
compact laptop 1366 x720 and original tall 1440 x1214. Verify full foreground
content, index bands, footer actions, absence of document overflow and keyboard
focus. Existing preference/focus rules must remain intact.

Review shared Salesforce/HubSpot standalone proofs and catalog expansions at
the reported width because their inner visuals are reused, even though the
faulty card selector does not match those standalone wrappers. Do not infer
absence of overlap from a zero document-overflow measurement. Expand scope only
for a reproduced related defect and record the reason before editing.

Run formatting checks proportionate to the edited CSS, diff checks and a full
production/SSR build. The existing release profile lacks an 861px visual sample;
its prior PASS did not establish intermediate-size composition. Real browser
review at this window size is required. Any release needs fresh exact-preview
19-sample evidence plus the targeted tablet review and matching production
verification. Do not reuse PR23 evidence for changed CSS.

## Local review receipt

At 861 x803, all three proof wrappers and summaries now use 741.14px, with
eight explicit tracks and no implicit extras. Salesforce/HubSpot previously
used only 315.43px. Root visually inspected both corrected diagrams and their
shared case-study and expanded catalog versions at this size. No remaining
crowding or overlapping readable content was found in those reviewed views.
The catalog intentionally uses its own vertically arranged Salesforce canvas.

Actual visible motion observation at this size:

- HubSpot: all phases 0-4 and repeat observed in 12 seconds, with stable
  741.14 x418.07px figure geometry and no document overflow.
- Salesforce: all phases 0-8 and repeat observed in 13 seconds, with stable
  700.00 x310.08px canvas geometry and no document overflow.

Settled resize checks cover 766/767/768, 1023/1024, 1098/1099/1100 widths,
1366 x720, 1440 x1214 and 390 x844. Narrow tablet/phone retain the normal list,
1024 x700 retains readable original fallback, 1366 x720 keeps the compact
stack (717px budget), and 1440 x1214 keeps original stacking (1005px budget).
No positive horizontal overflow was measured. At DPR 1.75, rounded innerWidth
1099 can mean a fractional CSS width above 1099; the corrected complementary
query retains the original desktop 6 /13 case-proof placement there. A boundary
attempt made against a background tab did not receive the requested resize;
those samples were discarded and replayed successfully in the active tab.

Independent final source review found no blocker or unintended shared wrapper
match. Locked installation, final production/SSR build, formatting of the
changed CSS blocks and diff checks pass. No new TypeScript, dependency or test
implementation change. Full legacy-file lint is not claimed. Generated route
output reports a line-ending-only change, is not edited, and is excluded.
Actual reduced-motion/forced-color preferences, touch, zoom, screen-reader and
performance tests are not newly certified. Existing guards remain unchanged.

The previous release profile sampled 390px and 1023px but did not certify the
intermediate tablet composition. For future homepage-card maintenance, include
an actual mid-tablet visual review such as 861px in addition to the mechanical
profile. Geometry PASS alone does not establish diagram legibility.

Local viewer: `http://127.0.0.1:3024/`, running from this isolated worktree.
Before/after PNGs and the release outcome belong to the authoritative dispatcher.
No hero study or unrelated source is part of this correction.

Decisions this turn:

- Correct the CSS cascade and grid spans before altering diagram design.
- Keep the desktop split and compact stack while restoring full-width tablets.
- Include the observed user size and breakpoint transitions in visual QA.
