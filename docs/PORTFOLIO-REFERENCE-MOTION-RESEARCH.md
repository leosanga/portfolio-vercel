# Portfolio Reference and Motion Research

Status: Approved by Leo; Gate 1 local implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Approved content: [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
Workflow and rollback: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This document records the portfolio-reference research requested by Leo and
turns it into an original visual and motion direction. It is a planning input
for the visual identity, asset, motion, responsive, and implementation
specifications. It does not authorize source changes, dependency installation,
a local server, Git actions, a GitHub push, or a Vercel action.

The research started with the 1,981-site
[`developer-portfolios`](https://github.com/emmabostian/developer-portfolios)
directory. The list was filtered for role adjacency, evidence-first project
presentation, mature editorial design, useful interaction, and practical
performance. Live sites were then visually inspected. A portfolio was not
treated as a useful reference merely because its owner had a similar title.

## Senior perspectives applied

- Senior web strategist: audience fit, professional positioning, and reference
  relevance
- High-end digital product designer: composition, identity, material, and
  originality
- Senior UI/UX designer: hierarchy, navigation, scanning, and responsive
  behavior
- Senior interaction and motion designer: motion purpose, timing, continuity,
  and interruption cost
- Senior frontend architect: implementation complexity and maintainability
- Senior accessibility and performance reviewer: content availability, reduced
  motion, input behavior, and runtime cost

## Filtering method

The directory is too large for random inspiration gathering. Each candidate was
judged against these questions:

1. Does the portfolio support Leo's positioning as a Systems Engineer focused
   on integration and automation?
2. Does it make evidence easier to understand?
3. Does its visual identity feel authored rather than assembled?
4. Does motion explain, orient, or provide feedback?
5. Can the useful idea be implemented without copying the site's identity?
6. Will the approach remain usable on a narrow screen, with a keyboard, and
   with reduced motion enabled?
7. Is the runtime cost appropriate for a portfolio whose first job is to make
   proof easy to access?

Role-adjacent terminal portfolios, AI landing-page portfolios, 3D experiences,
and generic developer dashboards were reviewed as anti-references when their
visual treatment conflicted with Leo's goal.

## Recommended reference blend

No one reference should become the redesign template. The proposed direction is
a deliberate blend of specific strengths:

| Reference                                        | Fit for Leo                | Idea worth adapting                                                                                                  | Boundary                                                                                                                   |
| ------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Brittany Chiang](https://brittanychiang.com/)   | High structural fit        | Calm hierarchy, clear role orientation, and scannable project evidence                                               | Do not reproduce the familiar two-column developer-portfolio template or add resume and social-link prominence             |
| [Lee Robinson](https://leerob.com/)              | High tonal fit             | Editorial typography, warm dark material, concise controls, and one strong visual anchor                             | Do not add a blog, notes index, or biography toggle unless future content creates a real need                              |
| [Adham Dannaway](https://www.adhamdannaway.com/) | High identity fit          | Make the portrait part of a bespoke visual idea rather than placing it inside a generic profile card                 | Do not split Leo into a designer-versus-developer identity, and do not delay the hero while an entrance sequence completes |
| [Chánh Đại](https://chanhdai.com/)               | High interaction-craft fit | Tactile component states, exact transform origins, line-based composition, and one memorable interactive centerpiece | Do not copy the Vercel-style grid, dashboard density, command palette, GitHub emphasis, or component-demo identity         |
| [Serdar Salim](https://serdarsalim.com/)         | Medium-high identity fit   | A personal visual motif and a soft pastel atmosphere can make a technical portfolio feel human                       | Do not turn the site into an agency funnel or add a heavy 3D scene chooser                                                 |
| [Abdul Mateen](https://abdulmateenzwl.com/)      | Medium-high evidence fit   | Structured record labels and systematic project metadata help technical proof feel deliberate                        | Do not copy the paper dossier, stamps, neon highlights, resume structure, or confidential-status treatment                 |

### Secondary references and anti-references

| Reference                                             | Useful observation                                                              | Decision for Leo                                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Luca Félix](https://luca-felix.com/)                 | A compact project index can feel premium when typography carries the hierarchy  | Adapt compactness later as the archive grows. Reject copied dock styling, letter-by-letter reveal, and initially blank content state        |
| [Ilan Lenzner](https://ilans.net/)                    | Detailed project evidence and case-study depth are useful for future owned work | Use the evidence depth, not the dotted grid, script accent, AI assistant, status pill, metric parade, or multiple competing calls to action |
| [Shubhanshu Singh](https://shubhanshusingh.com/)      | Systematic labels suit a platform-engineering profile                           | Reject the terminal metaphor, orange-on-black treatment, resume density, and competing calls to action                                      |
| [Malaka Venugopal Reddy](https://malakavenu.com/)     | Role-adjacent projects can expose architecture and tooling clearly              | Treat the neon gradients, glowing portrait, badges, animated role text, filters, and AI assistant as anti-patterns for this redesign        |
| [Bruno Simon](https://bruno-simon.com/)               | Motion can explain a spatial environment when the experience itself is the work | Reject a WebGL portfolio shell. A contained future project demo may borrow the principle of spatial explanation                             |
| [Nikhil Madaravena](https://www.nikhilmadaravena.me/) | A coherent system metaphor can create a memorable identity                      | Reject the boot loader, cyber treatment, animated tickers, skill percentages, and motion that prevents immediate access to content          |
| [Brihadeesh](https://briha.xyz/)                      | Minimal layout can preserve focus                                               | Reject the generic command-palette, copied macOS dock treatment, and typewriter text that makes the visitor wait                            |

## Design synthesis

### Recommended visual concept

The portfolio should feel like a calm systems workspace with an editorial
surface. Leo's portrait provides the human anchor. The three-node workflow mark
provides the technical identity. Project evidence provides the substance.

The visual system should combine:

- A warm near-black foundation that remains compatible with the hero portrait
- Pastel lavender as the lead accent, partnered with a muted cool tone such as
  mist blue or desaturated periwinkle
- An editorial type hierarchy with fewer all-caps utility labels
- Fine rules, quiet metadata, and project-specific diagrams instead of repeated
  generic cards
- One authored three-node motif that can change scale and function across the
  favicon, navigation identity, hero composition, and workflow explanations

The visual specification will define the final HEX values, font family, type
scale, grid, spacing, radii, borders, and shadows. This research does not lock
those tokens.

### What the current site already gets right

- The dark foundation works with the portrait.
- Lavender is a credible lead accent.
- The portrait creates an immediate human presence.
- The page already uses scroll orientation, disclosure, pointer feedback, and
  reduced-motion safeguards.
- The workflow diagram is a stronger proof device than a stock project image.

These are foundations to refine. They do not need to be discarded.

### What currently reads as generic or AI-generated

- The glowing lavender treatment, grid backdrop, and shimmer headline appear
  together as a familiar AI landing-page package.
- The capability area relies on a repeated two-column card grid with nearly
  identical shape, border, and internal rhythm.
- The portrait sits inside a card with another metadata block, which makes a
  personal image resemble a reusable profile component.
- Large vertical gaps separate sections without creating useful narrative
  tension or continuity.
- Uppercase eyebrow labels and rounded bordered surfaces are repeated often
  enough to feel like a component-library default.
- Continuous ambient movement carries less meaning than motion attached to a
  system path, project state, or visitor action.

The redesign should not become motionless. It should replace generic motion and
repeated surfaces with an authored interaction language.

## Motion position

Leo prefers a motion-rich experience. The senior recommendation is to create
many purposeful motion moments while limiting how many compete at the same
time. Motion density should come from responsive behavior across the journey,
not from making every section move continuously.

The motion signature is **signal routing**. Motion should suggest that a system
receives an input, makes progress visible, and reaches a reliable state. This
connects the site identity to Leo's work without using a terminal, a circuit
board, or a generic AI network.

### Motion hierarchy

1. **Orientation:** active navigation and section continuity
2. **Identity:** the hero portrait and three-node workflow mark
3. **Explanation:** project workflow and approach progression
4. **State:** disclosure, selection, focus, hover, and pressed feedback
5. **Conversion:** a clear arrival at the final conversation action

Only one motion moment should dominate a viewport. Smaller feedback transitions
may occur at the same time when they respond directly to visitor input.

## Motion opportunities

The following nine opportunities passed the frequency, purpose, speed, and
function gate. They are a design brief for the later motion specification, not
implementation approval.

| Location                           | Trigger                                                           |                             Frequency | Purpose                             | Technique                                                                                                                                                             |                                                           Duration | Easing                                                                                               | Properties                                      | Reduced motion                                                                               | Implementation note                                                                                                                                         |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------: | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary navigation                 | Active section changes; hover and focus on a link                 |                        Tens per visit | Orientation and state               | Preserve a shared active rule that moves between labels; use color for local hover and focus                                                                          |                                     220 ms indicator; 160 ms color | `cubic-bezier(0.77, 0, 0.175, 1)` indicator; `ease-out` color                                        | `transform`, `opacity`, `color`                 | Remove indicator travel and switch its position instantly; retain a short color transition   | Keep the existing center-line scrollspy unless the approved design replaces it. Never transform the measured sections                                       |
| Hero content and workflow identity | First page presentation                                           |                         Once per load | Hierarchy and identity              | Bring the role label, headline, support copy, and action into place with a short stagger. Resolve the three-node mark with one signal pass after the copy is readable |                480 to 560 ms content; 900 ms signal; 60 ms stagger | `cubic-bezier(0.23, 1, 0.32, 1)` content; `cubic-bezier(0.77, 0, 0.175, 1)` signal                   | `transform`, `opacity`                          | Render every element in its final position. Allow only a 160 ms opacity transition if needed | Never delay readable content. Use one signal pass, not a loop. Replace the current shimmer and generic grid drift                                           |
| Hero portrait                      | Fine-pointer movement within the portrait region                  |                Frequent while engaged | Spatial feedback and human presence | Apply a shallow depth response to the portrait and its supporting line work                                                                                           |   Follow input with approximately 180 ms damping; return in 360 ms | Damped interpolation or a low-bounce spring equivalent                                               | `transform`                                     | Disable pointer depth and keep the portrait static                                           | Limit translation to 4 px and rotation to 1.25 degrees. Gate behind `(hover: hover) and (pointer: fine)`. Do not add glare                                  |
| Project entries                    | Hover or focus within a project entry                             |               Several times per visit | Affordance and relationship         | Lift the project visual slightly, move the directional cue toward its destination, and increase local contrast                                                        |                                                      180 to 220 ms | `cubic-bezier(0.23, 1, 0.32, 1)`                                                                     | `transform`, `opacity`, `color`, `border-color` | Keep color and border feedback; remove lift                                                  | Animate the internal visual rather than moving the entire layout block. Keyboard focus must receive the same state                                          |
| Project workflow diagram           | Open a project evidence disclosure                                |       Repeated while open and visible | Explanation and state               | Reveal the diagram content, then route signals through its nodes in reading order. Leave a quiet resting interval before replaying                                    | 900 ms per connection; 70 ms path offsets; 3,200 ms replay cadence | `linear` signal travel                                                                               | `transform`, `opacity`                          | Show the completed diagram immediately and disable replay                                    | Do not animate disclosure height. Pause replay when closed, outside the viewport, in a hidden tab, or under reduced motion. Keep labels readable throughout |
| My Approach                        | Each step crosses the view threshold                              |                Once in normal reading | Explanation and progress            | Activate the step and extend its connector toward the next step as the visitor moves through the sequence                                                             |                                      420 ms step; 620 ms connector | `cubic-bezier(0.23, 1, 0.32, 1)` step; `cubic-bezier(0.77, 0, 0.175, 1)` connector                   | `transform`, `opacity`, `color`                 | Show the complete sequence with no connector growth                                          | Reveal stable inner wrappers only. Use horizontal progression on wide screens and vertical progression on narrow screens                                    |
| Final conversation section         | Section enters view; hover, focus, and press on `Schedule a Call` | Once for entrance; a few interactions | Conversion and feedback             | Let one quiet signal reach the terminal node beside the call action. Give the button immediate hover, focus, and press response                                       |                520 ms section arrival; 700 ms signal; 140 ms press | `cubic-bezier(0.23, 1, 0.32, 1)` arrival; `cubic-bezier(0.77, 0, 0.175, 1)` signal; `ease-out` press | `transform`, `opacity`, `color`                 | Show the terminal node as active and remove travel; retain color feedback                    | The signal should support the action without pulsing indefinitely. Press scale must not go below `0.97`                                                     |
| Persistent utility dock            | Pointer approaches a control; hover, focus, or press              |               Several times per visit | Feedback and spatial consistency    | Magnify the nearest surface from 1 to a maximum of 1.14 while adjacent controls receive a smaller proximity response. Show one anchored tooltip                       |                  160 ms surface and tooltip; 120 ms press response | `cubic-bezier(0.23, 1, 0.32, 1)`                                                                     | `transform`, `opacity`, `color`, `border-color` | Disable proximity scaling and tooltip travel; retain focus and color feedback                | Gate pointer sampling behind `(hover: hover) and (pointer: fine)`. Coalesce pointer work with `requestAnimationFrame`. Never animate layout dimensions      |
| Theme control                      | Visitor switches between light and dark                           |                  Occasional per visit | State indication                    | Crossfade and rotate the sun and moon icons within the fixed control while the palette changes immediately                                                            |                                                             220 ms | `cubic-bezier(0.77, 0, 0.175, 1)`                                                                    | `transform`, `opacity`                          | Crossfade only and remove rotation                                                           | Initial theme is light. Persist an explicit visitor choice locally and avoid a theme flash before hydration                                                 |

### Motion limits

- No blocking loader, boot sequence, or splash screen.
- No letter-by-letter headline entrance.
- No rotating role title, typewriter copy, or auto-advancing project carousel.
- No constantly moving marquee, technology ticker, or cursor follower.
- Workflow replay must include a visible resting interval and run only while the
  disclosure is open, near the viewport, and motion is permitted.
- No WebGL, 3D scene, or canvas dependency for the portfolio shell.
- No universal stagger applied to every card and list item.
- No use of `transition: all`.
- Default interaction feedback should complete within 300 ms.
- Dock magnification stays below 1.15 scale and never runs on touch or under a
  reduced-motion preference.
- Explanatory motion may run up to 1,100 ms when the full content is already
  readable.
- Motion should use composited `transform` and `opacity` wherever possible.
- The initial implementation baseline should use CSS and the Web Animations API.
  A motion dependency requires a later bundle-cost and maintenance
  justification.
- At most one low-amplitude ambient animation may run within a viewport. The
  preferred baseline has no continuous motion in reading sections.
- Motion must stop when its element is no longer relevant or the document is
  hidden.

### Responsive behavior

- Pointer depth and hover-only choreography are desktop enhancements.
- Touch devices receive pressed, selected, disclosure, and scroll-progress
  states without simulated hover.
- Narrow layouts use smaller travel distances and vertical system paths.
- Motion must never change the document's reading order.
- A visitor can understand every project and reach `Schedule a Call` when all
  motion is disabled.

### Reduced-motion behavior

`prefers-reduced-motion: reduce` should preserve feedback while removing spatial
travel. Essential state may use a 160 to 200 ms color or opacity change. Content
must render visible in its final position. The workflow diagram should show its
completed state, the portrait should remain static, connectors should not grow,
and no delayed sequence should remain.

## Rejected motion candidates

| Candidate                                                 | Why it was considered                  | Why it is rejected                                                                                                                  |
| --------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Full-page loading or system boot sequence                 | It creates a strong technical theme    | It blocks the visitor from Leo's role and proof, and it repeatedly charges time for decoration                                      |
| Letter-by-letter hero reveal                              | It makes the headline visibly animated | It makes a short sentence slower to read and resembles common portfolio effects                                                     |
| Rotating job-title or typewriter line                     | It can expose more keywords            | It destabilizes role positioning and forces the visitor to wait for copy                                                            |
| Continuous workflow pulse with no rest or visibility gate | It reinforces the systems motif        | Constant motion competes with diagram labels. The approved replay uses discrete passes, a resting interval, and visibility controls |
| Global cursor follower                                    | It can make the page feel interactive  | It competes with reading and is weaker than local feedback attached to an actionable area                                           |
| WebGL or game-like navigation                             | It is memorable                        | It increases load, obscures semantic structure, and changes the portfolio into an interaction demo                                  |
| Project-card entrance cascades                            | They can make a long page feel active  | Repeating the same entrance delays scanning and exposes the animation system more than the evidence                                 |
| Large parallax sections                                   | They add depth                         | They create scroll fatigue and make responsive composition harder without improving comprehension                                   |

## Component-library implication

The supplied free resources are sufficient as implementation references. They
should be used selectively for behavior, accessibility patterns, or a small
primitive that survives the visual specification. They should not determine the
page composition.

- shadcn/ui and Radix-style primitives are useful for disclosure and accessible
  state behavior.
- Aceternity UI, Magic UI, Recent Design, and 21st.dev are inspiration sources.
  Recognizable showcase effects should be redrawn into Leo's motion language.
- Mantine, HeroUI, daisyUI, and MUI are full design-system choices. Mixing one of
  them into the existing Tailwind application for isolated visual components
  would add styling and bundle complexity without creating authorship.
- Free availability is necessary but not sufficient. License, dependency cost,
  keyboard behavior, reduced motion, and server-rendering behavior must be
  checked before adoption.

The preferred baseline is custom composition on the current React and Tailwind
stack, with small accessible primitives only where they remove real engineering
risk.

## Approved research decisions

1. Use the reference blend in this document instead of selecting one portfolio
   as a template.
2. Make the three-node workflow the authored identity and motion signature.
3. Replace generic shimmer and grid drift with event-driven signal-routing
   motion.
4. Keep the portrait prominent and integrate it into the composition without a
   generic profile card.
5. Use project-specific visual evidence and quiet metadata instead of repeating
   the same card treatment.
6. Adopt all seven motion opportunities as the maximum motion scope for the
   first redesign prototype.
7. Keep CSS and the Web Animations API as the no-new-dependency baseline.

## Approval record

Leo approved all seven research decisions on 2026-09-10. They are now inputs to
the visual, asset, motion, responsive, and implementation specifications. This
approval does not authorize implementation.

## Next planning step

After Leo reviews this research direction, create the visual identity and
interface specification. It should provide at least two composition directions
that both follow this research, then recommend one. Each direction must define
the page grid, hero and portrait relationship, project presentation, three-node
identity use, palette, typography, surfaces, and representative motion frames.

The asset and motion specifications follow the selected visual direction. No
implementation begins until the complete planning set and Gate 1 in the workflow
plan are approved.

## Fresh-session continuation

A fresh session continuing the redesign should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. [`PORTFOLIO-REDESIGN-ANALYSIS.md`](./PORTFOLIO-REDESIGN-ANALYSIS.md)
5. [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
6. This research document
7. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
8. `ANIMATION_PLAN_PROMPT.md` before planning or changing motion
9. The current portfolio components and `src/styles.css`

The session should inspect Git status, preserve user-owned changes, and stop
before implementation unless the relevant approval gate has been explicitly
granted.
