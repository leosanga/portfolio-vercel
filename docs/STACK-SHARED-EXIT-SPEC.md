# Move the completed project stack out together

2026-10-14. Leo reported that the compact and tall stacks leave different cards behind when continuing to project4. Requested result: all three stacked cards move upward together. This corrects the existing approved stack journey. Goal mapping: deliberate motion, readable proof and responsive/accessibility behavior. No new public copy or hero work.

## Review and cause

Root reviewed live production39a8e0a and the existing controller/CSS. Each slot is independently sticky within the same container, but its release boundary depends on its height and pin. The cards have different heights. At1440 x900, actual live heights485.41/555.44/528.21 px and pins88/133/178 px produce different exits. With container bottom661.98 px, observed tops88/106.54/133.77 px already break the pin spacing. This is a production defect, not a local viewer mismatch.

Motion-design judgment: during the third card's readable hold, the completed stack is one composition. It should retain its index spacing through the exit and reverse entry. Frontend judgment: correct only the terminal positions without changing the existing layout, heights, holds, CSS sticky arrival or 3D article recession. Accessibility judgment: transforms remain on non-ID-bearing slots; disable/remove correction with existing static and keyboard fallbacks. QA judgment: test unequal heights where the first, second or third card defines the lowest pinned edge.

## Bounded design

For card i, pin P_i = header clearance + i * index spacing. Let C = max(P_i + intrinsic slot height_i). Let B = the stack container's live bottom. Shared exit distance E = max(0, C - B).

Before E is positive, retain each native sticky position. During exit, target every slot's top at P_i - E. Native sticky bounds may already have moved a slot partly upward; apply only the remaining difference as a vertical CSS translate on that slot. Preserve existing article transforms, clipping, pin spacing, reading holds and DOM flow. No padding filler, equal-height cards, additional scroll length, duplicated content or transformed measured section.

The controller must account for its previously applied translate when reading slot rectangles. Keep actual CSS enablement distinct from the computed next state, so measurement/keyboard/preference transitions cannot subtract a translate that CSS is not applying. Derive corrected rectangles for ownership, cover and recession from the same offsets written to the DOM. Skip writes at unchanged offsets. On geometry changes, disabled enhancement and cleanup, remove offsets and reset their cache. Gate enhancement on vertical translate support rather than claiming a broken shared exit on unsupported browsers. Existing React presentation selection remains unchanged because slot heights and layout flow are unchanged.

Pure geometry helper inputs: uncorrected sticky rectangles, pin top, index spacing and container bottom. Return zero offsets before exit or invalid geometry. Output offsets are target-minus-native-top only during exit. During exit, corrected positions must have one equal displacement from their pins. Negative/after-container positions remain deterministic for scrolling back. No hysteresis, timers or continuous RAF at rest.

Affected files only:

- `src/components/portfolio-v2/useCompactCaseStack.ts`: reuse its existing RAF/observer lifecycle for shared exit.
- `src/components/portfolio-v2/case-stack-exit.ts`: pure geometry helper.
- `src/styles/portfolio-v2.css`: one guarded slot translate using a default-zero variable.
- `scripts/case-stack-exit.test.mjs`: meaningful pure geometry regressions.
- This specification/review packet.

No compact selector, card/proof copy, dimensions, palette, hero, dock, smooth-scroll, route, package or lockfile change. The group ends at the same document position; project4 timing/flow must not gain extra space.

## Execution and acceptance

Lower-model builder owns the four implementation/test files above. Use apply_patch. Root collects a separate source/math review and performs browser QA. Confirm current source rather than treating the formula alone as a pass.

Regression tests must reproduce existing independent sticky positions, then verify corrected displacement is equal for all cards. Cover first/second/last tallest envelopes, no-exit identity, fractional sizes, deep exit and reverse progression, invalid geometry and application of correction exactly once. Use Node's test runner through Bun for the TypeScript helper if needed. Pure fixtures supplement actual browser motion.

Actual browser review: compact1440 x900 and natural desktop, original1440 x1214; sample before exit, two mid-exit positions and reverse scroll, retaining correct index spacing. Confirm hold lengths and document flow match the production baseline at the same size. Recheck keyboard release/re-entry, phone/static source guards, proof ownership, fresh console, TypeScript, scoped lint and build. Reject double correction, position drift, RAF churn, changed reading holds or all cards jumping to their pins before the third arrives.

Retain separate build, geometry and visual outcomes. Use the existing exact-preview19-sample release gate for any production correction; do not reuse PR20 evidence. Match current main and candidate, follow normal PR/hooks/rollback. Hero and unrelated work remain excluded. State and final release outcome belong in the authoritative catalog-identity-integration dispatcher.

## Local review receipt

Root collected the bounded lower-model builder and independent math/source reviewer. The helper and controller use the same corrected rectangles for placement, ownership, coverage and depth. Source review found no blocker. TypeScript's data-attribute index access was corrected before final checks. Six geometry regressions, normalized three-file lint, full application/SSR build and twelve existing release-contract/collector tests pass. No Claude control or external senior panel is claimed.

Actual live original layout at 1440 x 1214 and container bottom 876.27 px had tops 75.97/141/158.80 px: the second card remained pinned while the others departed. Corrected local original layout at bottom 817.41 px has tops -6.05/46.95/99.95 px, each displaced approximately 94.05 px from its pin. Reversing to bottom 870.55 px gives tops 47.09/100.09/153.09 px, each displaced approximately 40.91 px. Differences between cards are below 0.001 px in these samples.

Corrected compact layout at 1440 x 900 and bottom 680.27 px has tops 62.05/107.05/152.05 px, each displaced approximately 25.95 px. A deep exit gives -489.37/-444.38/-399.37 px; all retain the 45 px spacing. Native arrivals and the third hold retain tops 88/133/178 px. Tall cards retain their original sizes and 53 px spacing. Stack document-bottom positions match the live baseline at both sizes, approximately 4710.55 px compact and 5975.70 px original, confirming no added flow/hold length in those comparisons.

Shift+Tab during compact exit disables enhancement, removes all exit variables and leaves the focused Salesforce action at approximately 87.88-112.34 px, below the 72 px header. Actual 390 x 844 mode is original/static, has no positive overflow and no exit variables. The local development console reports the existing html theme-attribute hydration warning; root reproduced the identical warning on unchanged viewer3021, and theme/root-shell files have no diff. Hosted fresh-console review remains required. Physical preference/touch/zoom and quantitative performance are not certified from this work. A geometry-change pass intentionally clears correction and applies it on the next frame; resize phase continuity remains an existing limitation.

Local viewer: `http://127.0.0.1:3022/`, from this worktree with `bun run dev --host 127.0.0.1 --port 3022`. Prior production-code viewer3021 and all hero studies remain untouched. No generated output belongs in this correction's commit. Exact-preview evidence and production outcome will be recorded in the authoritative dispatcher.

Decisions this turn:

- Treat the reported exit as a correction to the existing stack, not another redesign.
- Use one shared departure distance while preserving native arrivals and DOM flow.
- Verify both compact and original layouts and reverse scrolling.
