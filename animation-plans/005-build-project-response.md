# 005: Build project row response
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: MEDIUM
- **Category**: Affordance, frequency, and accessibility
- **Estimated scope**: 2 new files, approximately 180 lines

## Problem

The current project treatment moves an entire large card on hover:

```tsx
// src/components/portfolio/Projects.tsx:24-27, current
className={`flex flex-col rounded-xl border bg-panel
  transition-[translate,box-shadow,border-color] duration-200
  hover:-translate-y-1 hover:border-lavender/40 hover:shadow-lg`}
```

The approved layout uses editorial rows. Repeating large-card lifts would make
the list feel unstable and would preserve the component-library look being
removed.

## Target

- Keep each row container stationary.
- Move an internal visual up to 4 px over 220 ms with
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Move a directional cue up to 4 px toward its destination over 180 ms using the
  same curve.
- Transition text, border, and cue color over 160 ms `ease`.
- Apply movement only under `(hover: hover) and (pointer: fine)`.
- Apply equivalent emphasis through `:focus-within` without requiring movement.
- Direct links press to no less than scale `0.97` over 120 ms.

## Repo conventions to follow

- Project copy remains data present in semantic HTML.
- Native disclosure behavior remains available without JavaScript.
- Focus styles come from one visible global contract.
- Project IDs and metadata do not become hover-only content.

## Steps

1. Create `ProjectRowV2.tsx` and its approved visual child if the final
   architecture uses separate components.
2. Keep the article or list-item wrapper free of translation.
3. Add one internal visual and one directional cue as the only moving children.
4. Apply exact duration and easing values through shared tokens.
5. Gate hover transforms behind fine-pointer media features.
6. Add `:focus-within` color, border, and cue emphasis.
7. Apply press feedback only to actual links or buttons.
8. Ensure the closed project row exposes title, summary, metadata, and state.
9. Remove shadow growth from routine row interaction.

## Boundaries

- Do not edit the current `Projects.tsx` during local prototype work.
- Do not lift the complete row.
- Do not reveal essential copy on hover.
- Do not add a card spotlight, glow, cursor follower, or animated border loop.
- Do not animate box-shadow.
- Do not create visible filters before the archive requires them.

## Verification

- **Mechanical**: typecheck and build after implementation. Search the project
  row styles for `box-shadow` transitions and ungated hover transforms.
- **Feel check**: move rapidly across every project row, tab through every
  interactive element, press direct links, and compare default with reduced
  motion. Confirm surrounding text never shifts.
- **Done when**: project intent receives immediate local feedback without making
  the evidence list bounce or resemble a grid of cards.
