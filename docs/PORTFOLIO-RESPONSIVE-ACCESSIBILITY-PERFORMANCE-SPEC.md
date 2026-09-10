# Portfolio Responsive, Accessibility, and Performance Specification

Status: Approved by Leo; no implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Approved content: [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
Approved visual direction: [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
Approved assets: [`PORTFOLIO-ASSET-IMAGERY-SPEC.md`](./PORTFOLIO-ASSET-IMAGERY-SPEC.md)
Approved motion: [`../animation-plans/000-MOTION-INTERACTION-SPEC.md`](../animation-plans/000-MOTION-INTERACTION-SPEC.md)
Workflow and rollback: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This specification defines how the approved editorial systems canvas must
respond across screen sizes, input types, accessibility preferences, network
conditions, and device capability. It also sets measurable performance budgets
and the validation matrix required before the redesign can be accepted.

It does not authorize source changes, asset production, dependency installation,
a local server, a branch, a commit, a GitHub push, or a Vercel action.

## Senior perspectives applied

- Senior responsive UX architect for layout adaptation and content priority
- Senior accessibility engineer for semantics, keyboard behavior, assistive
  technology, and WCAG interpretation
- Senior web performance engineer for loading strategy, runtime cost, and Core
  Web Vitals
- Senior frontend architect for server rendering, hydration, component
  boundaries, and enhancement strategy
- Senior interaction designer for input-mode and preference behavior
- Senior privacy-minded reviewer for external navigation and third-party loading

## Standards position

Target [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) for the complete
responsive experience. The W3C requires conformance across every responsive
variation of a page, so desktop success cannot compensate for a mobile failure.

Do not publish a WCAG conformance claim until implementation has passed
automated and manual testing. Automated tools cannot prove full conformance.
Where this specification adopts a stricter internal rule, the stricter rule is
the implementation target.

## Core invariants

- The semantic reading order matches the visual reading order at every width.
- Essential content exists in server-rendered HTML.
- JavaScript enhances motion and convenience but does not unlock the role,
  projects, approach, or call action.
- No ID-bearing section is transformed or transitioned.
- No viewport receives a horizontal scrollbar at 320 CSS px or wider.
- The portrait, fonts, and diagrams reserve their final layout space.
- The primary action remains `Schedule a Call`.
- No breakpoint hides evidence merely to make the layout cleaner.
- Motion, transparency, contrast, color-scheme, and data preferences receive
  explicit behavior.
- The local redesign remains independent from the live root until cutover.

## Responsive model

Breakpoints describe changes in composition, not target devices. The layout
must remain usable at every width between them.

| Range             |       Grid |                           Margin |      Gutter | Primary behavior                                              |
| ----------------- | ---------: | -------------------------------: | ----------: | ------------------------------------------------------------- |
| 1440 px and wider | 12 columns |                   At least 64 px |       28 px | Full editorial canvas with controlled maximum width           |
| 1024 to 1439 px   | 12 columns |                            40 px |       24 px | Laptop composition with reduced overlap and unchanged content |
| 768 to 1023 px    |  8 columns |                            32 px |       20 px | Tablet composition that may stack the hero                    |
| 480 to 767 px     |  4 columns |                            20 px |       16 px | Mobile composition with compact header and vertical systems   |
| 320 to 479 px     |  4 columns | 20 px, reducible to 16 px at 320 | 12 to 16 px | Narrow mobile with zero nonessential overlap                  |

Use content-driven wrapping inside each range. Do not add a breakpoint to repair
one isolated line when a fluid measure or grid adjustment solves it.

## Required viewport matrix

| Class         | Required viewports                    | Why                                                         |
| ------------- | ------------------------------------- | ----------------------------------------------------------- |
| Wide desktop  | 1920 by 1080, 1440 by 900             | Maximum-width composition and large type                    |
| Laptop        | 1366 by 768, 1280 by 800, 1024 by 768 | Common constrained-height layouts and current hero-gap risk |
| Tablet        | 834 by 1112, 768 by 1024              | Grid transition and portrait stacking                       |
| Mobile        | 430 by 932, 390 by 844, 360 by 800    | Common modern narrow layouts                                |
| Minimum width | 320 by 568                            | Reflow, menu, long titles, and tap targets                  |

Portrait and landscape orientation must be checked at tablet and mobile sizes.
No design is accepted from a single desktop screenshot.

## Global layout behavior

### Width and containment

- Maximum content width is 1320 px.
- Full-bleed visual fields may extend beyond the content grid but may not create
  horizontal overflow.
- Text measures remain independent from container width.
- Use `minmax(0, 1fr)` for grid tracks that contain long text.
- Use `overflow-wrap: anywhere` only for unavoidable identifiers or URLs, never
  as the default paragraph behavior.
- Use logical properties so spacing remains adaptable.

### Vertical rhythm

- Default section padding follows `clamp(6rem, 10vw, 9rem)`.
- Mobile section padding should normally resolve between 80 and 104 px.
- The hero-to-project transition is tighter than later section transitions.
- Avoid fixed viewport-height sections.
- Avoid `min-height: 100vh` for the hero because browser chrome and short laptops
  create empty or clipped states.
- On a 1366 by 768 laptop, the next content transition should be apparent
  without a large empty band after the hero.

### Sticky header and anchors

- Desktop visual header height: 72 px.
- Mobile visual header height: 64 px.
- Anchor targets reserve at least header height plus 20 px through
  `scroll-margin-top`.
- Keyboard focus may not land beneath the sticky header.
- Sticky navigation gains material only when content passes underneath.
- At 200 and 400 percent zoom, the header must not cover the focused element.

## Responsive typography

- Keep the approved fluid type tokens.
- H1 width, font size, and line breaks must be tuned together.
- Do not use nonbreaking spaces to force the desktop headline composition.
- At 390 px, target an H1 of approximately 52 to 60 px when the approved copy
  fits without clipping.
- At 320 px, reduce the H1 only enough to avoid overflow and retain clear
  hierarchy over the body copy.
- Large headings use `text-wrap: balance` only when browser behavior produces
  stable line breaks.
- Paragraphs use natural wrapping.
- Body copy never drops below 16 CSS px.
- Technical metadata never drops below 12 CSS px and must pass contrast checks.
- Line height must remain at least 1.5 for standard body copy.
- User text resizing must not clip labels, buttons, disclosure summaries, or
  diagram nodes.

## Navigation behavior

### Desktop and laptop

- Show the identity mark, `Leo Sanga`, three section links, and
  `Schedule a Call`.
- Active location uses `aria-current="location"`.
- The moving rule supplements text color and does not carry state by itself.
- Navigation remains usable before the scrollspy hydrates.
- If no section is active, no link falsely announces a current location.

### Tablet and mobile

- Show the identity, compact `Call` action, and a menu button.
- The menu button exposes its state through `aria-expanded` and names the menu
  container through `aria-controls`.
- The expanded menu contains `Projects`, `Capabilities`, and `Approach`.
- If implemented as a modal sheet, it requires an accessible name, focus trap,
  Escape handling, focus return, and body-scroll lock.
- If implemented as a non-modal anchored menu, it must close on Escape, outside
  interaction, link activation, and focus leaving the intended navigation
  context.
- The implementation plan must select one behavior and may not mix modal and
  non-modal semantics.

### Scheduler destination

Recommended behavior: open the Google Calendar scheduler in the same tab. This
avoids an unexpected new browsing context and works naturally with browser Back.
If Leo prefers a new tab, the accessible name must communicate that behavior and
the link must retain `noopener noreferrer`.

This destination behavior remains a decision for Leo.

## Hero responsiveness

### Wide desktop

- Copy uses columns 1 through 7.
- Portrait uses columns 8 through 12.
- The H1 may extend toward the portrait while preserving its protected face
  area.
- Portrait target crop is 4:5.
- Hero visual height should normally remain below 820 px excluding the header.

### Laptop

- Reduce text overlap before reducing portrait width below four columns.
- Keep the support copy between 48 and 58 characters per line.
- Use the 4:5 or 3:4 portrait crop according to available height.
- Prevent the current oversized blank transition between hero and following
  content.

### Tablet

- Retain a split layout only while the portrait remains at least 300 CSS px wide
  and the H1 has intentional line breaks.
- Otherwise stack copy, CTA, then portrait.
- The 3:4 crop is the default stacked treatment.
- System lines move with the composition and never cross body text.

### Mobile

- Order: professional label, H1, support copy, CTA, portrait.
- Use the 4:3 art-directed crop when approved by visual review.
- Do not place text over the portrait.
- Keep the CTA visible before the portrait begins when practical.
- Hero signal geometry simplifies but retains one input and two outputs.
- No portrait depth without a fine pointer.

## Projects responsiveness

### Lead project

- Wide desktop: five-column evidence and seven-column workflow visual.
- Laptop: balanced six-column split or a stacked composition when node labels
  become narrow.
- Tablet and mobile: project copy first, then the workflow.
- The complete closed state communicates title, system, problem, outcome, and
  disclosure affordance.
- Workflow nodes reflow vertically on narrow screens.
- Branch order remains explicit when two columns become one.
- Do not shrink node text to preserve desktop topology.

### Remaining projects

- Desktop rows may use title, summary, and metadata columns.
- Mobile rows stack title, summary, metadata, then disclosure state.
- Disclosure targets span the complete row and remain at least 44 px tall.
- Long project titles wrap without truncation.
- Technology metadata wraps at term boundaries.
- No horizontal carousel or swipe-only navigation.

## Capabilities responsiveness

- Wide desktop uses four open columns with shared vertical rules.
- Layout changes to two columns below 1280 px and one column below 768 px.
- Mobile uses a compact vertical sequence with horizontal rules.
- No capability description is hidden or shortened by breakpoint.
- Technical metadata remains visible and wraps by complete term without pills.
- No pointer spotlight appears on touch devices.

## My Approach responsiveness

- Wide desktop uses a horizontal four-step path.
- Laptop retains horizontal orientation only when every step supports a readable
  measure.
- Tablet and mobile use a vertical path.
- Source order is always Understand, Plan, Build, Validate.
- Connectors are decorative and hidden from assistive technology.
- Step number, heading, and body remain one semantic list item.
- Motion attaches to an inner wrapper, not the section or list item used for
  layout measurement.

## Final conversation, utility dock, and footer responsiveness

- Wide layouts may place the approved copy and CTA in separate grid areas within
  the same final field.
- Narrow layouts stack heading, support copy, and CTA.
- Keep the CTA near its supporting sentence and do not isolate it at the far
  edge of a mobile panel.
- The conversation support copy uses 16 to 18 px text, 1.5 line height, and a
  compact paragraph rhythm.
- The utility dock stays centered above the bottom safe area.
- At the minimum 320 by 568 class, the utility dock joins normal document flow
  after the footer so it cannot obstruct the primary hero call. It remains
  fixed from 360 px upward.
- Its four controls remain at least 44 by 44 px. Magnification is disabled for
  touch and coarse-pointer input.
- Email and LinkedIn remain visually secondary to the call action while meeting
  contrast and focus requirements.
- Footer identity and copyright reflow without depending on the dock's visual
  position.
- No footer content relies on an icon alone.

## Semantic structure

Required landmarks and order:

1. Skip link
2. Header and primary navigation
3. Main
4. Hero introduction
5. Projects
6. Capabilities
7. My Approach
8. Final conversation
9. Footer
10. Utility navigation

Use one H1. Section headings use H2. Project and capability headings use H3.
Disclosure-internal headings use the next logical level without skipping for
visual size.

Do not assign a landmark role when the native element already supplies it.
Avoid redundant `aria-label` values that replace visible text with different
wording.

## Skip link

- First focusable element in the document.
- Label: `Skip to content`.
- Target the beginning of `<main>`.
- Hidden visually until focused without using `display: none` or
  `visibility: hidden`.
- When focused, place it above the sticky header with a visible two-color
  boundary.
- Activation must land before the hero content and remain visible at high zoom.

## Keyboard contract

### Global order

- Tab order follows DOM and visual order.
- No positive `tabindex`.
- Decorative graphics are not focusable.
- Every control works with its native keyboard behavior.
- Focus never moves because an animation completes.

### Navigation

- Tab reaches identity link, section links or menu trigger, then call action in
  a predictable order.
- Mobile menu supports Escape.
- Closing returns focus to its trigger.
- Anchor navigation moves focus only when the selected target requires it for
  orientation. Do not create a duplicate focus stop on every section.

### Disclosures

- Use native `<summary>` or an equivalent button with `aria-expanded` and
  `aria-controls`.
- Enter and Space toggle state.
- Focus remains on the trigger after toggling.
- Open content follows immediately in reading and tab order.
- Closing a disclosure whose content contains focus must first return focus to
  the trigger.

### External links

- Visual labels remain concise.
- Screen-reader-only new-tab announcements are required only when a link
  actually opens a new tab.
- Do not repeat `opens in a new tab` for several adjacent links when one visible
  group explanation would be clearer.

## Focus system

- Default indicator: 2 px solid `mist` outline with 2 px `canvas` separation.
- Focus outline appears through `:focus-visible` and never disappears because of
  hover.
- Focus contrast against adjacent colors must reach at least 3:1.
- The outline must surround the complete interactive target.
- Sticky or fixed content may not fully obscure a focused element.
- Active, hover, and focus are separate states.
- Use a stronger shape or boundary in forced-colors mode.
- Test focus on `canvas`, `surface`, lavender buttons, the portrait field, and
  translucent navigation.

## Target sizes and spacing

- Primary buttons and navigation controls: minimum 44 by 44 CSS px.
- Mobile menu items: minimum 48 px high.
- Disclosure summary: minimum 44 px high across its full row.
- Inline footer links may rely on spacing where a 44 px box would damage reading,
  but adjacent targets must remain clearly separated.
- Icon-only utility controls must be at least 44 by 44 px and have accessible
  names plus visible hover or focus tooltips on fine-pointer layouts.
- The mobile call control may use the visible label `Call`, never an unlabeled
  phone icon.

## Color and contrast

- Use the approved palette and verified baseline ratios.
- Standard text must reach WCAG AA contrast.
- Large text must still use the higher standard when practical.
- Muted text may not fall below the approved `#9D94A6` on `#0F0E14` without a
  new contrast calculation.
- Placeholder-style low contrast is prohibited for real metadata.
- Borders that communicate state require at least 3:1 against adjacent colors.
- Node kinds use geometry, line style, and labels as well as color.
- Links inside body text require more than color alone.
- Verify hover, focus, active, visited where applicable, and disabled states.

## Images and diagrams

- Hero portrait follows the approved responsive `<picture>` strategy.
- Every selected source has intrinsic dimensions.
- Portrait crop changes must not change semantic order.
- Recommended portrait alt remains `Portrait of Leo Sanga`, subject to final
  screen-reader duplication review.
- Decorative identity lines and motion overlays use `aria-hidden="true"`.
- Project nodes and labels remain semantic text.
- Each workflow diagram provides a concise visible or programmatically
  associated summary.
- Branch order is understandable without connector color or animation.
- Social-preview text is repeated in metadata and page content.

## Motion and sensory preferences

Follow the approved motion specification exactly.

### Reduced motion

- Remove translation, scale, rotation, signal travel, and smooth scrolling.
- Preserve short color and opacity feedback.
- Render all content and diagram states complete.
- Do not use a universal 0.01 ms transition override.

### Reduced transparency

- Replace translucent navigation and menu surfaces with near-solid `surface`.
- Remove backdrop blur.
- Preserve boundaries and elevation through color and border.

### Increased contrast and forced colors

- Strengthen borders and focus indicators.
- Let system colors replace brand colors where forced colors are active.
- Do not force exact brand colors over user contrast preferences.
- Confirm the three-node topology remains visible in monochrome.

### Reduced data

- Do not preload below-fold project media.
- Do not autoplay future video.
- Use the smallest portrait source that satisfies the rendered dimensions.
- Motion remains code-native and adds no media request.

## Text resizing, zoom, and reflow

- Support text resizing to 200 percent without loss of content or function.
- Support browser zoom to 400 percent at 1280 px viewport, producing a narrow
  reflow without two-dimensional scrolling.
- Horizontal scrolling is permitted only for a future data table that genuinely
  requires it. No current homepage component qualifies.
- Sticky navigation may become non-sticky at extreme zoom if necessary to avoid
  obscuring content.
- Do not clamp body or project copy by line count.
- Do not truncate CTA, project, or capability labels.

## Screen-reader behavior

### Required manual coverage

- NVDA with Chrome or Edge on Windows
- A second pass with Narrator or another available Windows reader
- VoiceOver with Safari when a macOS or iOS test surface becomes available

Lack of immediate Safari access must be recorded as an unverified coverage gap,
not silently treated as a pass.

### Reading-order checks

- Page title and role are announced before supporting copy.
- Navigation current state is meaningful.
- Project closed states make sense without opening everything.
- Opening evidence announces expanded state.
- Workflow nodes read in the intended sequence.
- Decorative connector and signal layers remain silent.
- Footer links have distinct accessible names.

## Error, loading, and no-JavaScript states

- The homepage requires no skeleton because its content is server rendered.
- Font fallback must keep content readable immediately.
- Portrait failure leaves reserved space and does not hide hero copy.
- Image alternative text appears when the image cannot load.
- Native disclosures remain usable with JavaScript disabled.
- Static active-state defaults must not claim the wrong current section before
  scrollspy hydrates.
- Existing not-found and error pages should inherit the approved typography,
  color, focus, and button behavior during the final cutover.
- Error recovery copy must remain direct and must not expose technical details.

## Performance objectives

### Core Web Vitals

Use the public good thresholds documented by
[Core Web Vitals](https://web.dev/articles/vitals) and its
[threshold methodology](https://web.dev/articles/defining-core-web-vitals-thresholds)
at the 75th percentile for field evaluation:

| Metric                    | Public good threshold |                                    Internal redesign target |
| ------------------------- | --------------------: | ----------------------------------------------------------: |
| Largest Contentful Paint  |   2.5 seconds or less | 2.2 seconds or less on representative mobile lab conditions |
| Interaction to Next Paint |        200 ms or less |                   150 ms or less for portfolio interactions |
| Cumulative Layout Shift   |          0.10 or less |                     0.05 or less, with zero avoidable shift |

Field data may be unavailable at low traffic. In that case, report lab evidence
as lab evidence and do not describe it as real-user performance.

### Supporting lab targets

- Total Blocking Time: 150 ms or less on representative mobile throttling
- First Contentful Paint: 1.8 seconds or less
- Speed Index: 3.0 seconds or less
- No long task above 50 ms caused by portfolio interaction code
- No layout shift caused by fonts, portrait, icons, disclosures after direct
  user input, or injected navigation state

Layout changes caused directly by opening a disclosure are expected and should
be interpreted separately from unexpected CLS.

## Transfer and resource budgets

Budgets are transferred compressed sizes for the first homepage view unless
otherwise noted.

| Resource group                        | Preferred target | Review ceiling | Action if exceeded                                                |
| ------------------------------------- | ---------------: | -------------: | ----------------------------------------------------------------- |
| Initial JavaScript                    |           150 KB |         180 KB | Inspect route imports and remove unused client dependencies       |
| Initial CSS                           |            35 KB |          50 KB | Remove unused utilities, legacy v2 overlap, and duplicated tokens |
| Initially requested fonts             |           120 KB |         160 KB | Remove unused weight or mono preload and improve subsetting       |
| Selected hero AVIF                    |           180 KB |         240 KB | Reduce dimensions before accepting visible artifacts              |
| Navigation and hero SVG combined      |            10 KB |          16 KB | Simplify groups, metadata, and path precision                     |
| Initial document plus critical assets |           450 KB |         600 KB | Treat as a blocking performance review                            |
| Third-party runtime JavaScript        |             0 KB |           0 KB | Do not ship it without a new approved requirement                 |

The social image does not count toward page-load transfer because it is a
crawler asset. Future project video is intent-loaded and measured separately.

## Server rendering and hydration

- Role, headline, supporting copy, project summaries, capabilities, approach,
  final conversation copy, footer identity, and utility links render on the
  server.
- Do not put viewport-dependent markup behind an initial client-only branch.
- Prefer one responsive DOM structure styled through CSS.
- Mobile and desktop navigation may differ only when semantic behavior requires
  it. Avoid rendering duplicate focusable navigation trees.
- Motion-only state does not change semantic content.
- Hydration may attach scrollspy, menu, pointer depth, dock magnification, theme
  state, and one-time activation.
- No hydration mismatch is acceptable.
- The static initial state is visually complete and truthful.

## JavaScript budget and execution

- Do not import unused shadcn or Radix primitives into the homepage route.
- Use direct platform APIs for scrollspy, IntersectionObserver, media queries,
  and limited pointer sampling.
- Use one passive scroll listener for the existing scrollspy behavior.
- Batch layout reads before style writes.
- Do not call `getBoundingClientRect()` for every project on every pointer move.
- Disconnect observers after one-time activation.
- Do not create one observer per Approach step.
- No continuous timer, interval, canvas loop, or background animation task.
- The portrait `requestAnimationFrame` loop exists only while a fine pointer is
  inside its region.

## CSS and rendering budget

- Import one additive redesign stylesheet during local prototype work.
- Avoid duplicate legacy and redesign styles on the final production route.
- No `transition: all`.
- No animated layout properties.
- No large fixed background with continuous repaint.
- Keep blur limited to static navigation material and provide a solid fallback.
- Avoid large paint areas from shadows.
- Use `content-visibility` only after testing anchor navigation, find-in-page,
  accessibility, and intrinsic size. It is not required for the initial page.

## Font loading

- Self-host approved WOFF2 files.
- Preload only the Instrument Sans file required above the fold.
- Do not preload IBM Plex Mono unless browser testing proves above-fold metadata
  causes a harmful delay.
- Use a system fallback immediately.
- Tune fallback metrics only if the font swap produces measurable movement.
- Remove Google Fonts stylesheet and preconnect requests during approved cutover.
- Keep license files with the font assets.

## Image loading

- Hero portrait receives high fetch priority and is not lazy-loaded.
- Below-fold raster assets use native lazy loading and asynchronous decoding.
- Every raster has `width`, `height`, and accurate `sizes`.
- Do not serve a 1200 px portrait to a 390 px viewport.
- Do not base64-inline the portrait or social image.
- Project diagrams remain code-native.
- Future demo video and player code load after intent.

## External services and privacy

- Do not embed Google Calendar on the homepage.
- The scheduler remains an outbound link.
- No tracking query parameter is required for the scheduler.
- Do not add analytics, session replay, chat, advertising, tracking pixels, or
  social widgets under the redesign scope.
- Email and LinkedIn remain ordinary links.
- If analytics becomes a future requirement, it needs separate privacy,
  performance, consent, and data-retention review.
- Do not send the portrait or private project evidence to online optimization
  services.

## Browser support

Required final checks:

- Current stable Chrome on Windows
- Current stable Edge on Windows
- Current stable Firefox on Windows
- Current stable Safari on macOS when available
- Current stable Safari on iOS when available
- Current stable Chrome on Android when available

Progressive enhancement rules:

- Unsupported view timelines or animation features show the completed state.
- Unsupported AVIF receives WebP or JPEG.
- Unsupported backdrop filtering receives a solid surface.
- Native disclosure remains the lowest-risk default.
- No essential behavior depends on one browser-only CSS feature.

## Automated validation

Run during later implementation, not now:

- Repository TypeScript check through the documented local executable
- `bun run build`
- `bun run lint`, separating known baseline failures from new failures
- Lighthouse against the local production preview at required desktop and
  mobile conditions
- Automated accessibility scan using an approved free local tool
- HTML landmark, heading, accessible-name, and duplicate-ID checks
- Asset dimension, format, metadata, and byte-budget checks
- Search for prohibited animation and layout patterns

Automated accessibility results are a defect-finding input. A zero-issue scan is
not an accessibility sign-off.

## Manual validation

### Responsive

- Inspect every required viewport and intermediate drag resizing.
- Rotate tablet and mobile surfaces.
- Test long project titles and wrapped technical metadata.
- Confirm no text overlap, clipped focus ring, or horizontal overflow.
- Confirm the hero transition into Projects remains intentional on short
  laptops.

### Keyboard

- Complete the entire page without a pointer.
- Open and close the mobile menu and every disclosure.
- Confirm focus return and no keyboard trap.
- Confirm focused content is never obscured by sticky navigation.
- Activate every call, email, and LinkedIn link.

### Assistive technology

- Complete the required Windows screen-reader pass.
- Verify landmarks, heading navigation, lists, current state, disclosures,
  diagram order, and link names.
- Record untested Safari and VoiceOver coverage plainly.

### Preferences

- Reduced motion
- Reduced transparency where supported
- Increased contrast
- Windows forced colors
- Browser text enlargement
- 200 and 400 percent zoom
- JavaScript disabled
- Images blocked

### Performance

- Run Lighthouse more than once and report the median, not the best run.
- Inspect the network waterfall for unexpected fonts, duplicate images, or
  third-party requests.
- Inspect the Performance panel during portrait motion, navigation changes,
  disclosure playback, and fast scrolling.
- Test a cold cache and a warm cache.
- Test with mobile CPU and network throttling.

## Defect severity

| Severity | Examples                                                                                                                         | Release effect                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Blocking | Missing content without JavaScript, keyboard trap, unusable call action, horizontal overflow at 320 px, severe hydration failure | Cannot proceed to visual approval                                   |
| High     | Focus obscured, diagram reading order wrong, LCP or JS above review ceiling, motion ignores reduced preference                   | Must fix before acceptance                                          |
| Medium   | Intermediate-width collision, inconsistent target size, noncritical budget miss, subtle layout shift                             | Fix before release unless Leo explicitly accepts a documented limit |
| Low      | Minor optical spacing or browser-specific polish with no lost function                                                           | May be scheduled before final cutover                               |

## Required evidence record

The later QA record must contain:

- Tested commit
- Local production command and URL
- Browser and viewport matrix
- Screenshots for key responsive states
- Keyboard and screen-reader findings
- Preference-mode findings
- Lighthouse run set and median
- Bundle and asset sizes
- Known baseline failures separated from redesign failures
- Every accepted limitation and owner
- Rollback point

## Decisions proposed for approval

1. Target WCAG 2.2 Level AA without claiming conformance before manual and
   automated verification.
2. Adopt the breakpoint, viewport, orientation, zoom, and input-mode matrix in
   this specification.
3. Use 44 px as the internal minimum for primary controls and disclosure rows.
4. Keep one semantic responsive DOM wherever possible.
5. Open the Google Calendar scheduler in the same tab.
6. Adopt the Core Web Vitals and transfer budgets in this specification.
7. Keep third-party runtime JavaScript at zero for the homepage.
8. Keep the scheduler as an outbound link rather than an embed.
9. Require Windows screen-reader coverage and record unavailable Apple coverage
   as an explicit gap.
10. Treat the manual and automated validation evidence as a release gate.

Approval authorizes the frontend architecture and implementation plan to be
written. It does not authorize implementation.

## Approval record

Leo approved all ten decisions on 2026-09-10, including opening the Google
Calendar scheduler in the same browser tab. The specification is now binding
for the frontend architecture, implementation plan, QA plan, and later local
prototype. This approval does not authorize implementation, dependency changes,
Git commits, pushes, Vercel actions, or production changes.

## Next planning artifacts

After approval, create:

1. Frontend architecture and implementation plan
2. QA, visual review, and acceptance plan

Implementation begins only after both artifacts are approved and Leo explicitly
approves Gate 1 in the workflow and rollback plan.

## Fresh-session continuation

A fresh session continuing this work should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
5. [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
6. [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
7. [`PORTFOLIO-ASSET-IMAGERY-SPEC.md`](./PORTFOLIO-ASSET-IMAGERY-SPEC.md)
8. [`../animation-plans/000-MOTION-INTERACTION-SPEC.md`](../animation-plans/000-MOTION-INTERACTION-SPEC.md)
9. This specification
10. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
11. `ANIMATION_PLAN_PROMPT.md` before touching motion or measured sections
12. Relevant current source files

The session must inspect Git status, preserve user-owned changes, and stop before
implementation unless the relevant approval gate has been explicitly granted.
