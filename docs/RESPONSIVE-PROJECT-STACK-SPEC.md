# Responsive homepage project stack

2026-10-15. Leo approved the proposed responsive stack and requested review before implementation. Goal mapping: readable project proof, purposeful motion, responsiveness and accessibility. Current production base is f2c8f535dabd51e2bd6a17f4e6e6428b69fef6a3, deployment7060163986. This isolated worktree preserves earlier viewers and hero experiments. Public copy is unchanged. Local implementation and visual review precede any release.

## Review and design judgment

Senior responsive UX and motion review: preserve the full original composition whenever it fits, compact the composition where needed, and keep ordinary document scrolling when a complete foreground card cannot fit. A stack with clipped content is rejected. Compactness comes from spacing and proof arrangement, not smaller type, removed facts, duplicated cards or a new disclosure.

Frontend review: compact currently requires1440px while the stack requires1100px. Booking/HubSpot compact proof CSS separately requires1440px. Lowering one number alone does not solve the mismatch. Both hooks currently use the largest height plus the final card's pin, even when those belong to different cards. Share actual per-card geometry instead: requiredHeight = max(top + index * edgeStep + height[index]) + bottomClearance. This matches the already approved common exit envelope.

Accessibility review: retain native keyboard release, focus correction, preference guards, original server rendering and static narrow fallback. Retain readable type sizes, all card links and complete proof content.1024px is the proposed lower boundary, subject to actual visual review, not a guarantee that every1024px-tall/short combination stacks.

Live reference reads this session: at1440 x900 compact heights485/555/528px and conservative requirement827px stack. At1366 x768,1262 x900 and1100 x900 original cards need approximately1078/1070/1059px and do not stack. At1024 x1000 the original single-column Booking presentation needs approximately1391px. Metadata and source confirm the base above. Measurements do not certify a new layout before it exists.

## Behavior and boundaries

1. Render one original set of approved cards. Keep original when its actual per-card budget fits. Never substitute compact on a tall layout that safely fits.
2. At CSS width >=1024px, trial the existing approved compact copy and an adapted compact CSS composition only when original does not fit. Use the same width media query and geometry helper for presentation selection and stacking.
3. Compact CSS retains the current composition at width >=1440px. Between1024 and1439px, use tighter existing spacing and rearrange Booking, HubSpot and Salesforce proof content to reduce height. Preserve type sizes and meanings. Remove inherited proof separators/column spans only inside the compact root. Footer technologies and action may wrap without overflow.
4. A candidate fits only when every complete slot at its actual pin clears header, index bands and dock. No whole-card scale, fixed height clipping or internal scrolling. Retain all current metadata bands and clearances initially; reduce only compact internal spacing within the reviewed design.
5. If neither original nor compact fits, return to the original normal list. Below1024px, reduced motion, forced colors, unsupported geometry or keyboard release use the original static behavior. No public toggle or copy is added.
6. Keep existing holds, 3D recession, ownership and shared exit. Height-dependent hold values may change with the newly measured compact layout; do not rewrite their formula.
7. Re-measure on viewport/font/header/dock changes, not on scrolling for presentation selection. Use the existing bounded original/compact trial with synchronous layout effects and settled states. No observer on the measured cards for presentation selection, no resize timers or continuous animation loop. Disable proof ownership until the trial settles. Keep current resize phase-restart limitation explicit.
8. A small positive re-entry margin may be used if browser review demonstrates fit flicker. Never retain stacking after content no longer fits. Do not add hysteresis speculatively before reviewing the actual bounded selector.

Root visual review found cropped title fragments under the metadata bands at the
narrow compact sizes. Covered cards now visually hide their already obscured title
through scoped opacity, preserving dimensions and accessible heading semantics.
The foreground title and all titles in
normal/keyboard mode stay visible. This corrects the index-band presentation
without reducing the fit budget or changing the controller.

## Files and execution split

Lower-model builder owns `case-stack-fit.ts`, `useCasePresentation.ts`, `useCompactCaseStack.ts` and `scripts/case-stack-fit.test.mjs`. Share named clearances, exact width query, pure validated envelope calculation and DOM geometry measurement; preserve controller lifecycle and exit helpers. Root owns compact CSS, this spec, state, browser review and final reconciliation. Independent reviewer reads the spec/source and reports blockers without edits.

Primary visual file: `src/styles/homepage-case-presentation.css`. Avoid changes to the global CSS, hero, data, proof components, catalog, case pages, packages and generated routes. A narrowly necessary correction must be reviewed before expanding these boundaries. No new published wording, palette, font family or size is authorized.

## Acceptance and rejection

Pure regressions reproduce the old conservative false rejection, verify first/second/last maximum pinned edges, exact fit and fractional underflow/overflow, invalid/empty geometry and one shared budget. Run the actual TypeScript compiler, scoped lint, shared-exit regressions and full production/SSR build. These do not replace visual review.

Browser targets:1366 x768,1280 x800,1262 x900,1100 x900,1024 x768/1000,1440 x900/1214 and phone390 x844. Establish which actually fit, with complete foregrounds, no content overlap, legible proof and visible actions. A target may remain a list if it cannot pass those criteria; document the reason. Check just below/above width and height boundaries and resize tall/short/narrow/back while inside the projects. Reject persistent stale mode, mode oscillation, lost focus, repeated proof resets from ordinary scroll, cropped content or a different terminal exit between cards.

Leave the local application viewer open for Leo. Keep design acceptance separate from code checks. Any release still requires fresh exact-preview19-sample evidence, main/base reconciliation and matching production checks. Do not reuse PR21 artifacts or claim physical preferences/touch/zoom/performance coverage from source or geometry. Codex follows the underlying review rules manually; no Claude hook or external senior panel is claimed.

## Implementation and review receipt

Root collected both the bounded lower-model builder and independent source
reviewer. No final source blocker was found. The actual implementation shares
`measureCaseStackFit` and `CASE_STACK_WIDTH_QUERY` between both hooks, validates
geometry distinctly from a valid non-fit, and preserves the existing exit/hold/
focus lifecycle. Root owns the compact proof composition. No new dependency,
content data, hero, route, global CSS or proof component change was made.

Actual settled browser results:

| Viewport | Mode | Stack | Measured required height |
| --- | --- | --- | --- |
| 1366 x768 | Compact | Yes | 714px |
| 1366 x720 | Compact | Yes | 714px |
| 1366 x700 | Original list | No | 1003px |
| 1280 x800 | Compact | Yes | 717px |
| 1262 x900 | Compact | Yes | 714px |
| 1100 x900 | Compact | Yes | 752px |
| 1024 x768/1000 | Compact | Yes | 721px |
| 1023 x768 | Original list | No | 1314px |
| 1440 x900 | Compact | Yes | 799px |
| 1440 x1214 | Original | Yes | 1005px |
| 390 x844 | Original list | No | 1900px |

Dimensions above are rounded only for reporting. Runtime uses unrounded values.
The height limit depends on width and actual content. The original and compact
wide intrinsic card heights match the production reference at1440px. Narrow
compact indices use measured41px spacing; wide compact retains45px and original
retains53px. Serial resize from1024 to1023 and back, through the laptop sizes,
short-height fallback, tall original and compact again settled correctly. Rapid
initial captures preceded controller settlement in two sizes; subsequent fresh
and settled resize checks confirmed enhancement at both. No hysteresis was added.

Root visually reviewed all three foreground compositions at1280px and the
three-card composition at1024px. Headings, summaries, proof values and links fit
without horizontal overflow. The compact covered-title opacity correction
removes cropped fragments while preserving heading semantics and dimensions.
Dark composition was reviewed and light restored. Narrow exit/reverse positions
retain equal41px spacing. Shift+Tab releases the stack, clears all exit variables,
restores title opacity1 and exposes the Salesforce action at approximately88px
below the header. Phone fallback has no exit variables or positive overflow.

Frozen installation, TypeScript, normalized scoped formatting/lint, twelve
geometry/exit regressions, twelve existing release/collector fixtures, final
production/SSR build and local SSR/alias/existing page smoke pass. The fresh local
console contains the known development html theme-bootstrap warning, specifically
`data-pv2-theme="light"` and `color-scheme:"light"`, already reproduced on the
unchanged production-code baseline in exit29. Root/theme files are unchanged.
This local review does not certify physical preference changes, touch, browser
zoom, screen readers or quantitative performance.

Local viewer: `http://127.0.0.1:3023/`, PTY5508, left open at the default window
size after resetting the viewport override. The final natural1645 x804 view
stacks with compact489/528/532px cards and approximately803px required height.
Screenshots and current dispatch are in the authoritative review worktree.
At that local review checkpoint, all six owned source/spec/test files were local
and uncommitted at production basef2c8f535. Generated route output has no semantic
diff and is excluded. Leo subsequently requested final review and deployment on
2026-10-15. The final scope review found no source blocker. That authorization
covers this reviewed responsive stack only. A fresh exact-preview gate and
matching production review remain required; the live release receipt belongs in
the authoritative current-state record.

Decisions this turn:

- Use original, then responsive compact, then normal list according to actual readable fit.
- Share the per-card envelope and CSS width eligibility between both hooks.
- Keep all motion and source copy; build locally before release review.
