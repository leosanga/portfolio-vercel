# 002: Build navigation continuity
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: MEDIUM
- **Category**: Orientation, performance, and interruptibility
- **Estimated scope**: 2 new files, approximately 220 lines

## Problem

The current navigation writes and animates the indicator width:

```tsx
// src/components/portfolio/Nav.tsx:20-25, current
indicator.style.transform = `translateX(${link.offsetLeft}px)`;
indicator.style.width = `${link.offsetWidth}px`;
indicator.style.opacity = active ? "1" : "0";
```

```css
/* src/styles.css:399-404, current */
transition:
  transform 250ms cubic-bezier(0.77, 0, 0.175, 1),
  width 250ms cubic-bezier(0.77, 0, 0.175, 1),
  opacity 200ms ease;
```

Width is a layout property. The redesign also needs an anchored mobile-menu
transition while preserving scrollspy behavior.

## Target

Create a nested indicator:

- Outer span translates horizontally over 220 ms with
  `cubic-bezier(0.77, 0, 0.175, 1)`.
- Inner span scales horizontally over 220 ms with the same curve and left
  transform origin.
- Opacity changes over 160 ms `ease`.
- No animated width property.

The mobile navigation enters from the header using opacity and an 8 px vertical
translation over 240 ms with `cubic-bezier(0.32, 0.72, 0, 1)`. It exits over
180 ms with `cubic-bezier(0.23, 1, 0.32, 1)` and remains interruptible.

## Repo conventions to follow

- Preserve `useActiveSection.ts` center-line measurement unless an approved
  architecture replaces it.
- Active links use `aria-current`.
- Do not transform measured sections.
- Use CSS transitions for rapidly retargeted indicator movement.

## Steps

1. Add `NavigationV2.tsx` under the approved additive component path.
2. Keep the existing active-section IDs synchronized with approved navigation
   labels.
3. Render an outer position span and inner length span for the active rule.
4. Measure active-link offset and width on active change and resize.
5. Convert measured width into the inner transform scale rather than setting an
   animated width.
6. Apply exact transform, opacity, and color transitions from the primary
   specification.
7. Add the mobile menu with focus entry, Escape close, outside close, and focus
   return.
8. Ensure open and close can reverse without waiting.
9. Add reduced-motion behavior that switches indicator position immediately and
   cross-fades the mobile menu without translation.

## Boundaries

- Do not edit the current `Nav.tsx` during local prototype work.
- Do not change scrollspy to an IntersectionObserver merely for convenience.
- Do not animate width or left.
- Do not create a floating mobile dock.
- Do not hide `Schedule a Call` inside the mobile menu.
- Do not add a command palette.

## Verification

- **Mechanical**: typecheck and build after implementation. Confirm no animated
  width or left property exists in the v2 navigation.
- **Feel check**: scroll rapidly across sections and verify the rule retargets
  without jumping. Open, close, and reverse the mobile menu before completion.
  Test keyboard focus return and reduced motion.
- **Done when**: navigation always shows where the visitor is, remains fully
  operable during transitions, and uses only transform, opacity, and color for
  animation.
