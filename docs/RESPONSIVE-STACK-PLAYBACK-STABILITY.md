# Stable Booking playback in the compact stack

2026-10-15. Correction to the reviewed responsive stack. Leo authorized final
review and deployment, then resumed after the usage reset. Base: production
36c5a9e2905448b8b9388cedf88f4e66d29efa29, deployment 7073183555. This corrects
the approved continuous proof playback and responsive readability invariants.
It adds no public wording, type change, control or new motion.

## Review before correction

The final 1024 x768 check observed an intermittent premature final/paused state.
Root repeated an 18-second read-only DOM observation on unchanged production,
including document visibility and record bounds. Visibility stayed active, the
whole record remained at approximately 232-516px within the 768px viewport, and
the stack stayed enhanced. At 7.69s the sequence jumped from phase 1 to paused
phase 4. Other cycles progressed normally. This confirms a visible interruption,
not just a background pause.

Pending/resolved row wrapping changes the first slot from 488.63 to 491.83px.
Measured rows range 44.00-51.66px. The source controller invalidates ownership
during geometry changes, and Booking returns to its final phase when ownership
is disabled. This layout-driven reset path must be removed without weakening
the controller's genuine resize/focus guards.

Senior frontend/motion judgment: reserve enough height for both approved row
texts. Accessibility judgment: keep text size, wrapping, all values, normal list
behavior and existing pause-on-visibility rules. Responsive QA judgment: verify
the extra row space still fits the reviewed laptop targets before publishing.

## Bounded design and execution

Change only the Booking row minimum in the compact 1024-1439px CSS band, from
2.75rem to 3.3125rem. At the existing 13px value type, two 1.35-line-height lines,
16px vertical padding and a 1px rule can need approximately 52.1px. A 53px minimum
reserves that space with margin. The initial 54px trial stabilized playback but
exceeded the 1366 x720 stack budget by approximately 3px. A 53px minimum retains
the required text space and the reviewed short-laptop fit. Use rem so the budget
scales with the existing type.
This is a minimum, not a fixed clipping height. Do not change row fonts, wording,
padding, timers, proof logic, controller ownership, other platforms or wide/
original styles. Re-measure fit using the existing shared helper.

Affected source: `src/styles/homepage-case-presentation.css`. This packet records
design/review; the authoritative dispatcher records release state. All earlier
hero studies, unrelated work and generated route output remain excluded.

Acceptance: at 1024 x768, observe at least two full visible cycles, including
reset, phases 0-4 and readable hold. During that observation, all rows and the
first slot must retain their size; reject a visible paused/final interruption.
Recheck 1366 x720/768, 1280 x800, 1262 x900, 1024 x768, 1023 fallback and 1440 x1214
original. Keep all three cards readable, keyboard release and shared exit intact.
Run scoped CSS formatting, production/SSR build and real local playback/fit
checks. No implementation-mirroring CSS-string test is added.

Commit only this packet and the one CSS correction. Publish a scoped PR and
bind its immutable preview to the exact head. Run fresh 19-sample CUA evidence,
hosted playback and route/console checks, merge locked to the validated head,
then verify matching production. PR22 evidence cannot validate changed source.
Rollback: retain production 7073183555 and revert only the corrective merge if
needed. No rollback, direct main push or hook bypass is part of this correction.

## Local review receipt

Root observed the final 53px source for 18 seconds at 1024 x768 with the complete
record visible at approximately 232-550px. Two complete phase 0-4 sequences,
holds and repeat transitions ran without a paused state. All six rows remained
53.0000px and the first slot remained 526.0447px throughout. Document visibility
stayed active; the stack remained enhanced. This replaces the initial 54px trial.

Settled browser measurements, rounded only for reporting:

| Viewport | Presentation | Stack | Required height |
| --- | --- | --- | --- |
| 1366 x720 | Compact | Yes | 717px |
| 1366 x768 | Compact | Yes | 717px |
| 1280 x800 | Compact | Yes | 717px |
| 1262 x900 | Compact | Yes | 714px |
| 1024 x768 | Compact | Yes | 721px |
| 1023 x768 | Original list | No | 1314px |
| 1440 x1214 | Original | Yes | 1005px |
| 390 x844 | Original list | No | 1900px |

No positive horizontal overflow was measured. Narrow/tall/phone mode selection
and serial resize settle correctly. The original tall and phone compositions
are outside the correction's CSS selector. Actual preference changes, touch,
zoom, screen readers and quantitative performance are not newly certified.
Final production/SSR build, normalized scoped CSS formatting and `git diff
--check` pass. No TypeScript or dependency source changed. Earlier PR22 geometry,
exit and collector tests remain historical checks, not new playback evidence.
Fresh hosted release evidence and matching production review remain required;
their final identifiers and results belong in the authoritative dispatcher.

Decisions this turn:

- Stabilize the proof's row geometry rather than weakening resize protection.
- Preserve all content, type, timing and the approved responsive range.
- Verify complete visible cycles as well as layout before completing release.
