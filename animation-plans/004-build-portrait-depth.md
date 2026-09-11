# 004: Build shallow portrait depth
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: MEDIUM
- **Category**: Physicality, responsiveness, and performance
- **Estimated scope**: 2 new files, approximately 180 lines

## Problem

The current portrait has a static glow container, while the current pointer
effect belongs to capability cards and updates parent CSS variables on every
pointer move:

```tsx
// src/components/portfolio/Competencies.tsx:5-11, current
const rect = el.getBoundingClientRect();
el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
el.style.setProperty("--my", `${event.clientY - rect.top}px`);
```

The approved direction removes the card spotlight and gives the portrait one
local, shallow spatial response.

## Target

- Gate behavior behind `(hover: hover) and (pointer: fine)` and no reduced-motion
  request.
- Parent perspective is 900 px.
- Maximum X or Y translation is 4 px.
- Maximum X or Y rotation is 1.25 degrees.
- Movement retargets over 180 ms with
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Neutral return takes 360 ms with the same curve.
- Sample pointer input once per animation frame.
- Write one full transform directly to the portrait frame.
- No CSS variables on a parent drive child transforms.

## Repo conventions to follow

- Direct DOM writes are acceptable when they avoid React rerenders.
- Every scheduled frame must be canceled on unmount.
- Fine-pointer hover behavior does not run on touch.
- Reduced motion removes spatial movement.

## Steps

1. Create `PortraitDepthV2.tsx` under the approved additive path.
2. Use the approved responsive portrait component as its visual child.
3. Read the portrait region once on pointer enter and again after resize.
4. Normalize pointer position from negative one to positive one on each axis.
5. Clamp translation and rotation to the exact target limits.
6. Coalesce pointer events through one pending animation frame.
7. Write the full perspective-safe transform directly to the moving frame.
8. Set 180 ms response while active and 360 ms return on leave or window blur.
9. Add `will-change: transform` on enter and remove it after neutral return.
10. Disable the event path for reduced motion, coarse pointer, or unavailable
    hover.

## Boundaries

- Do not edit the current portrait component during local prototype work.
- Do not add a motion dependency.
- Do not add glare, reflection, blur, scale, or highlight tracking.
- Do not transform the outer layout box.
- Do not move more than 4 px or rotate more than 1.25 degrees.
- Do not continue scheduling frames after leave or unmount.

## Verification

- **Mechanical**: typecheck after implementation. Inspect performance recording
  for layout or paint work during pointer movement.
- **Feel check**: move slowly, flick across the image, leave at each edge, blur
  the window, and re-enter before the return finishes. Test with CPU throttling,
  touch emulation, and reduced motion.
- **Done when**: the portrait feels responsive but remains visually stable, and
  the effect disappears completely outside the eligible input mode.
