# 006: Build disclosure and workflow playback
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: HIGH
- **Category**: Explanation, layout stability, and accessibility
- **Estimated scope**: 3 new files, approximately 320 lines

## Problem

The current workflow pulse runs indefinitely:

```css
/* src/styles.css:598-607, current */
.flow-row:not(:first-child)::before,
.flow-branch > li::before,
.flow-branch > li::after {
  animation: flow-travel 2.4s linear infinite;
  animation-delay: calc(var(--i, 0) * 0.18s);
}
```

The current disclosure also animates layout:

```css
/* src/styles.css:878-889, current */
.flow-disclosure::details-content,
.project-disclosure::details-content {
  block-size: 0;
  overflow: hidden;
  transition:
    block-size 400ms cubic-bezier(0.16, 1, 0.3, 1),
    content-visibility 400ms allow-discrete;
}
```

Continuous pulses compete with detailed labels. Animated block-size violates the
current project invariant and can complicate scrollspy geometry.

## Target

- Native disclosure changes layout immediately.
- Evidence content enters with opacity 0 and translateY(8px) over 240 ms using
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Caret rotates over 220 ms with
  `cubic-bezier(0.77, 0, 0.175, 1)`.
- Workflow signal runs once for 1,100 ms.
- Node activation offsets are 90 ms in reading order.
- All text and static connectors are visible before playback.
- Closing immediately removes playback state.
- Reopening restarts one traversal.
- Reduced motion shows the completed diagram.

## Repo conventions to follow

- Retain native `<details>` unless the approved architecture documents a better
  accessible primitive.
- Preserve semantic `<ol>` and `<ul>` reading order.
- Do not transform the project section.
- Existing flow data remains the authority for node content and order.
- `PIPELINE_DIAGRAM_PLAN.md` must be read before implementation.

## Steps

1. Create `ProjectEvidenceV2.tsx` and `WorkflowDiagramV2.tsx` under the approved
   additive path.
2. Preserve the approved data-driven node order and kinds.
3. Render static connectors as the base layer.
4. Render separate overlay segments or signal dots that can move through the
   path using transform and opacity.
5. On native toggle to open, set one local playback state for 1,100 ms.
6. Apply node activation with 90 ms offsets that follow semantic reading order.
7. Remove playback state immediately when closed and clean up its timer.
8. Allow reopening to replay from the beginning.
9. Add evidence-content entrance without block-size, height, grid-track, or
   content-visibility animation.
10. Preserve or improve the current scroll-into-view behavior without forcing
    smooth scroll under reduced motion.
11. Add reduced-motion output that renders connectors and completed nodes
    immediately.

## Boundaries

- Do not edit current flow files during local prototype work.
- Do not animate disclosure height or block-size.
- Do not loop workflow motion.
- Do not use GIF or video for the diagram.
- Do not hide diagram labels during playback.
- Do not invent nodes, metrics, client details, or architecture.
- Do not expand the accepted flow data model without a reviewed architecture
  decision.

## Verification

- **Mechanical**: typecheck and build after implementation. Search v2 disclosure
  CSS for animated layout properties and `infinite`.
- **Feel check**: open, close before completion, reopen, tab through the summary,
  scroll during playback, and repeat under reduced motion and no JavaScript.
  At 10 percent speed, confirm the signal follows reading order and branch
  direction.
- **Done when**: one playback explains the system, then the diagram remains
  quiet, semantic, and stable.
