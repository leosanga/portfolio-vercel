# 003: Build hero choreography and signal
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: HIGH
- **Category**: Purpose, hierarchy, and visual identity
- **Estimated scope**: 3 new files, approximately 280 lines

## Problem

The current hero combines an infinite text shimmer and drifting grid:

```css
/* src/styles.css:278, current */
animation: shimmer-sweep 5s ease-in-out infinite;

/* src/styles.css:338, current */
animation: grid-drift 34s linear infinite;
```

These effects move continuously without explaining state and contribute to the
generic AI landing-page appearance rejected by the approved direction.

## Target

Create a finite hierarchy entrance and one three-node signal:

- Role label, H1, body, and CTA use opacity plus 10 px vertical travel.
- Each runs 520 ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Delays are 0, 60, 120, and 180 ms.
- Portrait enters from opacity 0 and scale `0.98` over 560 ms after 120 ms.
- Hero signal begins at 620 ms and runs once for 900 ms with
  `cubic-bezier(0.77, 0, 0.175, 1)`.
- Static connectors and semantic content exist before motion.
- Resting state is fully static.

## Repo conventions to follow

- Existing hero content uses short staggered CSS animation.
- Hidden states must remain inside `prefers-reduced-motion: no-preference` and
  applicable support guards.
- The ID-bearing hero section remains untransformed.
- The approved headline remains `I build systems that run the business`.

## Steps

1. Create `HeroV2.tsx` and `HeroSignalV2.tsx` in the approved additive path.
2. Render approved copy in semantic order before any decorative SVG.
3. Build the signal from a static connector layer plus separate moving signal
   elements.
4. Animate the trunk signal first, then two output signals, using transform and
   opacity only.
5. Apply the exact content and portrait timings.
6. Ensure the sequence plays once per page presentation and does not replay when
   scrolling back.
7. Remove shimmer and drifting-grid concepts from the v2 hero.
8. Add reduced-motion behavior that shows final copy, portrait, connectors, and
   active output nodes immediately.
9. Keep the signal hidden from assistive technology.

## Boundaries

- Do not edit the current `Hero.tsx` during local prototype work.
- Do not split text into letter spans.
- Do not animate individual words.
- Do not use background-position, glow, filter, particles, or infinite loops.
- Do not cross Leo's protected face area with text or system lines.
- Do not delay clickability until the entrance finishes.

## Verification

- **Mechanical**: confirm the v2 hero contains no `infinite`, animated
  background-position, or transformed section wrapper. Typecheck and build after
  implementation.
- **Feel check**: reload at 10 percent playback speed. Confirm copy order reads
  clearly, the signal starts after the headline is readable, both branch outputs
  resolve cleanly, and nothing moves afterward. Repeat with reduced motion and
  JavaScript disabled.
- **Done when**: the hero has one authored motion story and a quiet resting
  state.
