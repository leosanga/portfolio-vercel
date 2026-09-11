# 001: Establish the motion foundation
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: HIGH
- **Category**: Cohesion, accessibility, and performance
- **Estimated scope**: 2 new files, approximately 180 lines

## Problem

Current motion values are defined beside individual effects, and the global
reduced-motion rule removes all feedback:

```css
/* src/styles.css:199-207, current */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The existing hero also uses one curve while buttons use another. The redesign
needs one vocabulary before any component motion is added.

## Target

Create the motion tokens from `000-MOTION-INTERACTION-SPEC.md` in
`src/styles/portfolio-v2.css`. Add targeted reduced-motion,
reduced-transparency, and increased-contrast rules. Add
`src/components/portfolio-v2/useMotionPreferences.ts` only for interactions that
need a JS preference check.

The hook returns booleans for reduced motion and fine-pointer availability,
subscribes to media-query changes, and removes every listener on unmount.

## Repo conventions to follow

- Existing CSS keeps hidden states inside motion and feature guards.
- Existing section wrappers remain untransformed.
- The project uses plain CSS and direct DOM coordination rather than a motion
  dependency.
- The exact easing values are:
  - `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and direct response
  - `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement
  - `cubic-bezier(0.32, 0.72, 0, 1)` for the mobile menu

## Steps

1. Create `src/styles/portfolio-v2.css` if the approved frontend architecture
   keeps that path.
2. Add the exact motion tokens from the primary specification.
3. Add utility contracts for spatial motion and non-spatial feedback without
   hiding content by default.
4. Add targeted `prefers-reduced-motion` rules that remove transforms and
   keyframes while keeping 160 ms color, border-color, background-color, and
   opacity feedback.
5. Add `prefers-reduced-transparency` and `prefers-contrast` rules for the
   navigation and focus system.
6. Disable smooth scrolling only in the reduced-motion branch.
7. Create `useMotionPreferences.ts` with live `matchMedia` subscriptions for
   reduced motion and fine pointer.
8. Confirm the new stylesheet contains no infinite animation, `transition: all`,
   animated layout property, or unguarded hidden state.

## Boundaries

- Do not edit `src/styles.css` during additive local redesign work.
- Do not install a motion package.
- Do not create a global animation controller.
- Do not use a universal `*` selector to remove transitions.
- Do not transform any element carrying a section ID.
- If the approved architecture selects different additive paths, update this
  plan before execution rather than improvising.

## Verification

- **Mechanical**: run the approved typecheck and build commands after the later
  implementation. Search the v2 source for `transition-all`, `infinite`,
  `block-size`, and transformed section IDs.
- **Feel check**: emulate reduced motion and confirm buttons, links, focus, and
  disclosure state still provide color or opacity feedback while all travel is
  gone.
- **Done when**: every later motion component consumes shared tokens and no
  global preference rule removes useful feedback.
