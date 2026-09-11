# 007: Build Approach and conversation motion
- **Status**: TODO
- **Commit**: `de93ea4`
- **Severity**: MEDIUM
- **Category**: Explanation, conversion, and cohesion
- **Estimated scope**: 3 new files, approximately 260 lines

## Problem

The current Approach applies the same generic reveal to every step:

```tsx
// src/components/portfolio/Process.tsx:13-24, current
{PROCESS_STEPS.map((step) => (
  <li key={step.number} className="reveal">
```

The current final conversation section also uses the same reveal wrapper and has
no visual continuity with the system identity:

```tsx
// src/components/portfolio/ContactCTA.tsx:5-6, current
<section id="contact" className="border-t border-border py-14 md:py-16">
  <div className="reveal container-page max-w-3xl text-center">
```

The approved redesign needs the Approach to explain sequence and the final
section to resolve that sequence into the call action.

## Target

Approach:

- Activate a stable inner step at a 35 percent viewport threshold.
- Keep all text visible before activation.
- Move from translateY(6px) and 72 percent opacity to final over 420 ms using
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Grow the connector with scaleX or scaleY over 620 ms using
  `cubic-bezier(0.77, 0, 0.175, 1)`.
- Activate each step once.

Conversation:

- Activate its stable inner wrapper at the same threshold.
- Enter from translateY(8px) and opacity 0 over 520 ms using
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Begin one terminal-node signal after 220 ms.
- Run the signal for 700 ms using
  `cubic-bezier(0.77, 0, 0.175, 1)`.
- Leave the terminal node active and static.
- Button hover lifts 1 px over 220 ms; press scales to `0.97` over 120 ms.

## Repo conventions to follow

- Keep ID-bearing section wrappers stable.
- Use stable inner wrappers for motion.
- Content must remain visible without support, JavaScript, or default motion.
- `Schedule a Call` remains the only primary action.

## Steps

1. Create `ApproachV2.tsx`, `ConversationV2.tsx`, and a small local one-time
   visibility hook if the architecture does not already provide one.
2. Observe stable inner wrappers at threshold `0.35`.
3. Set a permanent local entered state on first intersection and disconnect the
   relevant observer.
4. Animate Approach step content and connectors with the exact values above.
5. Switch connector orientation through responsive CSS without changing
   semantic order.
6. Animate the conversation group and one terminal signal once.
7. Keep button feedback independent from section entrance timing.
8. Ensure unsupported and no-JS states render the completed composition.
9. Add reduced-motion behavior that removes all travel and shows complete
   connectors and nodes.

## Boundaries

- Do not edit current Process or Contact components during local prototype work.
- Do not hide copy until intersection.
- Do not transform the sections carrying `approach` or `contact` IDs.
- Do not pulse the final node.
- Do not repeat the removed footer slogan.
- Do not add secondary actions beside `Schedule a Call`.
- Do not create one IntersectionObserver per child when one section-level
  observer can own the sequence cleanly.

## Verification

- **Mechanical**: typecheck and build after implementation. Confirm observers
  disconnect and section wrappers have no transform or transition.
- **Feel check**: scroll slowly and quickly, reverse before full activation,
  navigate directly by anchor, resize across connector orientations, and test
  reduced motion and no JavaScript. At 10 percent speed, confirm every connector
  grows from the correct node.
- **Done when**: Approach motion clarifies order, the final signal supports the
  call action once, and all content remains available without motion.
