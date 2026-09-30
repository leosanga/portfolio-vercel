# Projects and Approach connector polish

Status: Leo authorized looping and deployment on 2026-10-01. Release verification
is in progress.

## Goal and scope

Supports the portfolio goal's purposeful motion, legibility, and accessibility
invariants. Leo locked the five-step copy and requested centered Projects
connectors and a similar Approach signal advancing from step 1 through step 5.
All existing wording and titles are preserved, including Monitor.

Senior roles: interaction and motion designer, frontend architect, accessibility
engineer, and QA engineer. The project remains its own layout and release
authority; no portable brand tokens change.

## Implementation design

- Projects: retain dot placement. The existing desktop dot centers sit 3px below
  the container top; center the 1px rail at that axis with top 2.5px and the
  moving 8px signal with top -1px. On mobile the dot axis is x=6px, so rail left
  becomes 5.5px. Keep the existing content and animation behavior.
- Approach: connect the five nodes using four decorative segments. Extend each
  segment through the existing inter-step gap so its endpoints meet the nodes.
  Reuse the inline step index to schedule each node and outgoing segment.
- The loop begins when the existing inner wrapper becomes visible. Each node
  pulses on arrival and its outgoing signal travels to the next node. Movement
  runs left to right at 1280px and above and top to bottom below that width.
- Timing: 400ms initial pause, 300ms node pulse, 620ms between arrivals. Segment
  movement starts at the node pulse's 150ms peak. The fifth arrival ends the
  pass. All nodes and the resting rail stay visible. A shared 4800ms cycle keeps
  the five staggered pulses and four signals synchronized across repetitions.
  The next pass starts 2020ms after the fifth pulse settles. Node keyframes peak
  at 3.125% and settle at 6.25%; signals finish traveling at 12.916667% of the
  common cycle. Changing that cycle requires updating these keyframe stops.
- Reduced motion: all nodes and connectors remain static and visible immediately.
  Animation selectors stay inside the no-preference query. Copy is never hidden.
- No new dependencies, timers, state, schema, navigation, or public wording.
  The section elements and scrollspy algorithm remain untouched.

## Files and wiring

- src/styles/portfolio-v2.css owns alignment, decorative signals, timing, and
  responsive direction. Existing ApproachV2 inline --pv2-step supplies order.
- Existing usePortfolioV2Motion supplies data-pv2-visible on the inner wrapper.
  It continues to use its existing observer and fallback behavior.
- Keep one signal animation name across both layouts and change axis endpoints
  with CSS variables so crossing the breakpoint cannot restart the sequence.
- docs/PORTFOLIO-VISUAL-INTERFACE-SPEC.md records the approved request amendment.
- docs/REDESIGN-CURRENT-STATE.md remains the authoritative state and handoff.

The isolated worktree starts at ac7feea and carries only the approved local
Approach/content edits and their documentation. Leo's HANDOFF change, portraits,
design assets, and unrelated draft documents are excluded. The original viewer
on port 8090 remains available; the revised viewer uses port 8091.
The local-only vite.preview.config.ts permits access to the shared dependency
directory used by the node_modules junction. It is excluded from release scope.

## Verification and limits

Check Projects dot/rail centers and Approach node/segment centers at wide and
narrow widths, including 1280/1279. Inspect signal timings and repeated cycles
from browser computed styles without modifying the page. Review keyboard
navigation, disclosure behavior, scrollspy, static source fallbacks, and reduced
motion. Run TypeScript, targeted formatting/lint, production build, and whitespace
checks. Compare the changed geometry with the observed pre-fix offsets.

Both independent specialist reviews are reconciled. Static rail defaults replace
the old scale-to-zero rules; flex shrinking is disabled for extended segments.
Arrival is the pulse peak: 550ms + index * 620ms, with the fifth peak at 3030ms
and its pulse ending at 3180ms. Later mobile steps may finish offscreen because
the existing wrapper observer starts the entire pass. That is a visual-review
limit, not a content gate. Component paths are under src/components/portfolio-v2/.
No manual Claude goal challenger or lesson tool is claimed to run. No private
methodology stores are accessed.

## Production integration

The remote production branch advanced to 8948e29 with the Salesforce case study.
Merge it into this isolated branch before release. Preserve all of that release's
routes, assets, mobile utility layout, and evidence. Its duplicate late Projects
CSS also receives the approved axis correction so the cascade cannot undo it.
The only merge conflict is the guidelines date; retain 2026-10-01. Release through
a pull request and merge commit, retaining rollback history. Exclude the local
preview config, dependency junction, generated cosmetic changes, and original
unrelated user files.

Focused implementation reviews confirmed interpolation, endpoints, finite
timings, and breakpoint continuity. The loop amendment also requires checking
at least two cycles, shared duration, and constant 620ms arrival spacing.
Accessibility review caught the old observed
node-scale selector overriding reduced-motion defaults; its base scale was
removed and reduced-motion node transitions are disabled.
