# Portfolio Motion and Interaction Specification

- **Status**: APPROVED by Leo, no implementation authorized
- **Commit surveyed**: `de93ea4`
- **Visual direction**: Direction A, editorial systems canvas
- **Motion identity**: Signal routing
- **Implementation authorization**: None

## Purpose

This specification converts the seven approved motion opportunities into one
coherent interaction system. It defines motion purpose, component ownership,
timing, easing, interruption, reduced-motion behavior, performance limits, and
verification. It is written for an executor with no conversation context.

This specification does not authorize source changes, asset production, a local
server, a branch, a commit, a push, or a Vercel action.

## Senior perspectives applied

- Senior interaction designer for behavior and spatial continuity
- Senior motion designer for choreography, timing, and interruption
- High-end digital product designer for restraint and authored expression
- Senior frontend architect for ownership and implementation boundaries
- Senior accessibility engineer for motion and input preferences
- Senior performance engineer for compositor use and runtime cost

## Approved inputs

- Direction A is approved.
- Direction B is retained only for a future larger project archive.
- The proposed palette and typography are approved.
- The asset-production specification is approved.
- The first redesign may use the seven motion opportunities approved in
  `docs/PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`.
- CSS and the Web Animations API remain the no-new-dependency baseline.
- Existing source and live assets stay unchanged while the redesign is local.

## Motion outcome

The experience should feel responsive, calm, and alive. Motion should make
system relationships understandable and acknowledge visitor input immediately.
Motion density comes from distinct responses throughout the page rather than
several effects running continuously.

The signature is signal routing. A visitor should repeatedly see an input reach
a meaningful state through a node, connector, disclosure, project flow, or call
action. The effect must remain quiet enough that project evidence is always the
dominant content.

## Repository motion recon

### Stack

- React 19 and TypeScript
- TanStack Start and Vite
- Tailwind CSS v4 plus repository CSS
- Native `<details>` for project evidence
- Plain CSS keyframes and transitions
- `requestAnimationFrame` for limited DOM coordination
- No Framer Motion, Motion, React Spring, or GSAP dependency

### Existing strengths to preserve

- Hidden reveal states exist only inside support and motion-preference guards.
- ID-bearing sections are not transformed because scrollspy measures their
  bounding boxes.
- The center-line scrollspy is stable and already accounts for resize.
- Button press feedback reaches scale `0.97`.
- Hover motion is generally restricted to fine pointers.
- Project content remains present in semantic HTML.
- Disclosure triggers remain keyboard-operable.

### Vetted findings

| # | Severity | Category | Location | Finding | Redesign decision |
|---|---|---|---|---|---|
| 1 | HIGH | Performance and layout | `src/styles.css:872-889` | Disclosure content animates `block-size` for 400 ms even though the project invariant now prohibits disclosure-height animation | Do not port this rule. Expansion changes layout immediately and internal evidence receives a transform/opacity entrance |
| 2 | HIGH | Purpose and visual identity | `src/styles.css:254-278`, `src/styles.css:327-338` | The headline shimmer and drifting grid loop continuously and create the generic AI landing-page treatment rejected by the approved direction | Remove both from the redesign. Replace them with one finite node signal tied to the hero identity |
| 3 | MEDIUM | Purpose and frequency | `src/styles.css:466-607` | Every workflow connector runs an infinite 2.4 second pulse while the visitor reads the diagram | Replace the loop with one traversal when the disclosure opens |
| 4 | MEDIUM | Accessibility | `src/styles.css:199-207` | Reduced motion forces every transition to 0.01 ms, removing helpful color, opacity, focus, and pressed feedback | Scope reduced-motion rules to movement and preserve 160 to 200 ms non-spatial feedback |
| 5 | MEDIUM | Performance and identity | `src/components/portfolio/Competencies.tsx:5-11`, `src/styles.css:215-240` | Every pointer move writes parent CSS variables that reposition a radial-gradient spotlight inside generic cards | Remove the spotlight with the card grid. The only pointer-tracked effect becomes shallow portrait depth and writes transform directly to one element |
| 6 | MEDIUM | Performance | `src/components/portfolio/Nav.tsx:20-25`, `src/styles.css:391-404` | The active navigation rule animates width as it moves between links | Replace it with nested transform-only position and scale layers |
| 7 | LOW | Cohesion | `src/styles.css:177-190`, `src/styles.css:355-404`, `src/styles.css:883` | Timing and easing values are repeated locally and use two unrelated strong ease-out curves | Create shared motion tokens and use the approved curves consistently |

## Motion gate

Every new movement must answer all four questions:

1. How often will the visitor see it?
2. Does it orient, explain, preserve continuity, or acknowledge input?
3. Does its duration match that frequency?
4. Can the visitor complete the same task without seeing it?

If an effect cannot answer these questions, it does not ship.

## Motion tokens

The redesign stylesheet should expose these exact tokens:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  --duration-press: 120ms;
  --duration-feedback: 160ms;
  --duration-control: 220ms;
  --duration-menu-in: 240ms;
  --duration-menu-out: 180ms;
  --duration-enter: 520ms;
  --duration-portrait-enter: 560ms;
  --duration-connector: 620ms;
  --duration-cta-signal: 700ms;
  --duration-hero-signal: 900ms;
  --duration-flow-signal: 1100ms;
}
```

Use `ease` for color-only hover changes. Use `--ease-out` for entrances and
direct response. Use `--ease-in-out` for movement already on screen. Use
`--ease-drawer` only for the mobile navigation surface.

No component may introduce a new duration or curve without updating this
specification first.

## Property rules

- Animate `transform` and `opacity` for spatial movement.
- Color and border-color may transition for interaction feedback.
- Do not animate width, height, block-size, margin, padding, top, left, or
  background-position.
- Do not use `transition: all`.
- Do not animate filter or backdrop-filter during scroll.
- Do not animate a measured `<section id>` element.
- Apply movement to a stable inner wrapper.
- Add `will-change` only immediately before pointer-driven portrait movement and
  remove it when the pointer leaves.

## Motion density rules

- One movement may dominate a viewport at a time.
- The preferred resting state is static.
- No content animation loops indefinitely.
- A signal plays once per meaningful trigger.
- Visitor input may interrupt or reverse a transition immediately.
- No interaction waits for an animation to finish.
- No readable content waits behind a loader or boot sequence.
- Hero copy may settle once, but the full semantic content exists in the initial
  HTML.

## Component ownership

The later frontend architecture may adjust filenames, but it must preserve these
ownership boundaries:

| Responsibility | Proposed owner |
|---|---|
| Motion tokens and preference media queries | `src/styles/portfolio-v2.css` |
| Active navigation rule and mobile menu | `src/components/portfolio-v2/NavigationV2.tsx` |
| Hero entrance and node signal | `src/components/portfolio-v2/HeroV2.tsx` plus `HeroSignalV2.tsx` |
| Portrait pointer depth | `src/components/portfolio-v2/PortraitDepthV2.tsx` |
| Project row hover and focus | `src/components/portfolio-v2/ProjectRowV2.tsx` |
| Disclosure state and workflow playback | `src/components/portfolio-v2/ProjectEvidenceV2.tsx` and `WorkflowDiagramV2.tsx` |
| Approach step activation | `src/components/portfolio-v2/ApproachV2.tsx` |
| Final signal and call feedback | `src/components/portfolio-v2/ConversationV2.tsx` |
| Motion preference lookup shared by JS interactions | `src/components/portfolio-v2/useMotionPreferences.ts` |

Do not create a global animation controller. Each component owns the state it
can explain, while CSS tokens keep their feel consistent.

## Motion opportunity 1: navigation continuity

### Desktop active rule

- Trigger: center-line scrollspy changes active section.
- Frequency: several times per visit.
- Purpose: orientation.
- Position layer: `transform 220ms var(--ease-in-out)`.
- Scale layer: `transform 220ms var(--ease-in-out)`.
- Visibility: `opacity 160ms ease`.
- Structure: outer span translates; inner span scales from its left origin.
- The scrollspy writes position and width ratio, but never animates width.
- A fast scroll retargets both CSS transitions from their current presentation
  values.
- Active text color changes over 160 ms.

### Mobile menu

- Trigger: menu button opens or closes the header-anchored sheet.
- Purpose: spatial connection and state.
- Enter: opacity 0 to 1 plus translateY(-8px) to 0 over 240 ms using
  `--ease-drawer`.
- Exit: opacity 1 to 0 plus translateY(0) to -8px over 180 ms using
  `--ease-out`.
- The menu starts from the header edge.
- Input remains available during transition.
- Focus enters only after the surface exists and returns to the trigger on close.
- Pressed feedback begins on pointer-down.

## Motion opportunity 2: hero hierarchy and identity signal

### Content entrance

- Role label: 520 ms, delay 0 ms.
- H1: 520 ms, delay 60 ms.
- Supporting copy: 520 ms, delay 120 ms.
- `Schedule a Call`: 520 ms, delay 180 ms.
- Start state: opacity 0 and translateY(10px).
- End state: opacity 1 and translateY(0).
- Easing: `--ease-out`.
- Portrait: opacity 0 and scale `0.98` to final over 560 ms, delay 120 ms.
- Do not animate individual words or letters.

### Three-node signal

- Start after 620 ms, when the headline is readable.
- Total duration: 900 ms.
- A signal moves along the trunk, then separates into two signals that reach the
  downstream nodes.
- Static connectors are always visible.
- Animate signal elements with transform and opacity only.
- Output nodes change to their resting mist state when reached.
- Play once per page presentation.
- Do not replay on every scroll back to the hero.

### Resting state

- No shimmer.
- No grid drift.
- No pulsing nodes.
- The hero becomes static unless the visitor engages the portrait region.

## Motion opportunity 3: portrait depth

- Trigger: pointer movement inside the portrait region.
- Input gate: `(hover: hover) and (pointer: fine)` plus no reduced-motion request.
- Purpose: local spatial feedback and human presence.
- Maximum translation: 4 px on either axis.
- Maximum rotation: 1.25 degrees on either axis.
- Perspective: 900 px on the stable parent.
- Response: transform retargeting over 180 ms using `--ease-out`.
- Return: 360 ms using `--ease-out`.
- Pointer events are sampled once per animation frame.
- Write the full transform directly to the portrait frame.
- Do not write CSS variables on a parent to move children.
- Add `will-change: transform` on pointer enter and remove it after the neutral
  return completes.
- No glare, shine, blur, scale, or image distortion.
- Pointer leave and window blur return the portrait to neutral.

The effect must be disabled if it cannot remain smooth under CPU throttling.

## Motion opportunity 4: project-row response

- Trigger: hover within a project entry or keyboard focus within it.
- Frequency: several times per visit.
- Purpose: affordance and relationship.
- Keep the row container in place.
- Move only the internal visual or directional cue.
- Visual translation: up to 4 px over 220 ms using `--ease-out`.
- Directional cue translation: up to 4 px toward its destination over 180 ms
  using `--ease-out`.
- Text, border, and cue color: 160 ms `ease`.
- Press feedback on a direct project link: scale no lower than `0.97` for 120 ms.
- Apply hover movement only to fine pointers.
- Apply the same visible emphasis through `:focus-within` without requiring
  pointer movement.

## Motion opportunity 5: disclosure and workflow playback

### Disclosure

- The native disclosure changes document layout immediately.
- Do not animate height, block-size, grid tracks, or content-visibility.
- The summary caret rotates over 220 ms using `--ease-in-out`.
- Evidence content enters at opacity 0 and translateY(8px), then reaches its
  final state over 240 ms using `--ease-out`.
- Closing may remove evidence immediately. Do not delay close to stage an exit.
- Focus remains on the summary trigger.
- The visitor may close the disclosure while its signal is playing.

### Workflow signal

- Trigger: the featured workflow disclosure changes from closed to open.
- Total duration: 1,100 ms.
- Node offsets: 90 ms in reading order.
- Static connectors and all text are visible before playback begins.
- One active overlay signal travels through the spine and branch segments.
- Use transform and opacity on overlay segments or signal dots.
- The final nodes retain a quiet completed-state treatment after arrival.
- Close removes playback state immediately.
- Reopening deliberately replays the sequence once.
- Do not replay because of scrolling or pointer hover.

## Motion opportunity 6: My Approach progression

- Trigger: each stable inner step wrapper crosses a 35 percent viewport
  threshold.
- Purpose: explain ordered progress.
- The section and all step copy remain visible before activation.
- Inactive step copy may use 72 percent opacity but no hidden state.
- Step activation: opacity to 1 and translateY(6px) to 0 over 420 ms using
  `--ease-out`.
- Connector growth: scaleX on desktop or scaleY on mobile over 620 ms using
  `--ease-in-out`.
- Transform origin begins at the active node.
- Each step activates once during a page visit.
- Use IntersectionObserver only for the one-time state change.
- Do not modify the measured section wrapper.
- Unsupported or no-JS environments show the completed sequence.

## Motion opportunity 7: final conversation arrival

- Trigger: the stable inner conversation wrapper reaches a 35 percent viewport
  threshold.
- Purpose: connect the page narrative to the single call action.
- Group entrance: opacity 0 and translateY(8px) to final over 520 ms using
  `--ease-out`.
- Signal begins after 220 ms and reaches the terminal node over 700 ms using
  `--ease-in-out`.
- Signal plays once.
- No pulse remains after arrival.
- The button responds independently and immediately.
- Hover: translateY(-1px) over 220 ms on a fine pointer.
- Press: scale `0.97` over 120 ms.
- Focus: visual ring appears without spatial movement.

## Button behavior

All `Schedule a Call` instances share one interaction contract:

- Hover lift is 1 px, restricted to fine pointers.
- Hover color transition is 160 ms `ease`.
- Press scale is `0.97` over 120 ms `--ease-out`.
- Release retargets immediately from the current presentation value.
- Keyboard activation receives focus and color feedback without a synthetic
  lift.
- Reduced motion removes lift and scale but keeps 160 ms color feedback.

## Reduced-motion behavior

Use targeted component overrides rather than a global 0.01 ms rule.

```css
@media (prefers-reduced-motion: reduce) {
  .v2-motion-spatial {
    animation: none;
    transform: none;
  }

  .v2-feedback {
    transition-duration: 160ms;
    transition-property: color, background-color, border-color, opacity;
  }
}
```

Required outcomes:

- Hero content renders in final position.
- Hero nodes render in completed state.
- Portrait depth is disabled.
- Navigation rule changes position immediately but may fade.
- Mobile menu cross-fades for 180 ms without translation.
- Project rows keep color and border feedback.
- Evidence appears immediately or with a 160 ms opacity transition.
- Workflow renders completed with no traveling signal.
- Approach renders complete.
- Final terminal node renders active with no signal movement.
- Smooth scrolling becomes automatic scrolling.

## Reduced transparency and increased contrast

- `prefers-reduced-transparency: reduce` replaces translucent navigation and
  mobile-menu material with `surface` at near-solid opacity and removes blur.
- `prefers-contrast: more` strengthens rules and focus boundaries.
- Neither preference should create or remove layout space.

## Input-mode behavior

| Input | Motion available |
|---|---|
| Fine pointer | Hover response, portrait depth, focus, press, navigation, and explanatory sequences |
| Touch | Press, focus where applicable, navigation, disclosure, and explanatory sequences |
| Keyboard | Focus, active navigation, disclosure, menu, and color feedback without hover-only movement |
| Reduced motion | Non-spatial color and opacity feedback only |
| No JavaScript | Complete static content, native disclosures, static nodes and connectors |

No information or action may exist only inside a hover state.

## Interruption rules

- Navigation and button CSS transitions retarget from the current visual state.
- Mobile menu open and close can reverse before either transition completes.
- Portrait movement retargets on the next sampled frame and returns on blur or
  leave.
- A project disclosure can close while content or signal motion is running.
- One-time scroll sequences may finish after activation but cannot block input.
- No animation sets `pointer-events: none` on an otherwise usable control.
- No completion callback is required for core content to become accessible.

## Performance controls

- No continuous content animations.
- No animated background-position.
- No animated blur, glow, box-shadow, width, or height.
- Use one `requestAnimationFrame` loop only while the pointer is inside the
  portrait region.
- Cancel the pending portrait frame on leave and unmount.
- Use IntersectionObserver for approach and conversation activation.
- Disconnect observers after their elements activate.
- Do not add a motion package for these interactions.
- Keep animated SVG layers simple and free of filters.
- Confirm animation work remains compositor-bound in browser profiling.
- Remove unused motion CSS when the old route is retired, but only after a
  separately approved cleanup.

## Responsive motion

- Desktop travel values are the maximum values in this specification.
- Tablet reduces hero and section entrance travel from 10 px to 8 px.
- Mobile limits entrance travel to 6 px.
- Portrait depth is unavailable without a fine pointer.
- Approach connectors move horizontally on desktop and vertically on mobile.
- Mobile menu motion originates at the header rather than the viewport edge.
- No large object crosses more than 10 px during scroll-triggered motion.

## Mechanical acceptance

- No `transition: all` inside the redesign source.
- No infinite animation inside the redesign source.
- No animated layout property.
- No transformed ID-bearing section.
- No required content hidden outside a support and preference guard.
- No new animation dependency.
- Motion preference branches exist in CSS and JS where relevant.
- Native disclosures still work without JavaScript.
- Existing scrollspy behavior remains correct after every disclosure state
  change.

## Feel acceptance

- Hero content is readable before the identity signal begins.
- Returning to the hero does not replay the first-load choreography.
- Portrait depth feels shallow and stops exactly at the region boundary.
- Moving rapidly between navigation links never makes the indicator jump.
- Project focus looks as intentional as pointer hover.
- Opening the workflow explains direction once and then becomes quiet.
- Approach movement clarifies order without withholding copy.
- The final signal leads attention to the call action without pulsing.
- At 10 percent playback speed, transform origins and reversals remain coherent.
- CPU throttling does not produce visible portrait or signal stutter.

## Verification matrix

- Desktop: 1440 by 900, 1280 by 800, and 1024 by 768
- Tablet: 834 by 1112 and 768 by 1024
- Mobile: 430 by 932, 390 by 844, 360 by 800, and 320 by 568
- Fine pointer, touch emulation, keyboard only, and window blur
- Default motion, reduced motion, reduced transparency, and increased contrast
- JavaScript enabled and disabled
- Disclosure opened, closed mid-signal, reopened, and navigated by keyboard
- Fast scrolling across multiple sections
- Browser animation playback at 10 percent speed
- CPU throttling during portrait movement

## Decisions proposed for approval

1. Adopt the exact token set in this specification.
2. Keep all seven approved opportunities within the stated limits.
3. Use targeted reduced-motion behavior instead of disabling every transition.
4. Use no infinite content animation.
5. Keep CSS and WAAPI as the baseline with no motion dependency.
6. Permit `requestAnimationFrame` only for coalescing portrait pointer input.
7. Keep native disclosure layout changes immediate and animate only internal
   evidence.
8. Implement the active navigation rule with nested transform layers.
9. Use IntersectionObserver only for one-time Approach and final-conversation
   activation.
10. Treat the verification matrix and feel checks as release requirements.

Approval authorizes the next planning artifact. It does not authorize motion
implementation.

## Approval record

Leo approved the motion contract and all seven execution plans on 2026-09-10.
Their `TODO` state means they remain unimplemented.
