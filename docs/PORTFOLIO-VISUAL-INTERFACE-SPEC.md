# Portfolio Visual Identity and Interface Specification

Status: Approved by Leo; Gate 1 local implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Approved content: [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
Approved research: [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
Asset and imagery proposal: [`PORTFOLIO-ASSET-IMAGERY-SPEC.md`](./PORTFOLIO-ASSET-IMAGERY-SPEC.md)
Responsive, accessibility, and performance proposal: [`PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md`](./PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md)
Workflow and rollback: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This specification proposes the visual identity and interface system for Leo's
portfolio redesign. It compares two complete composition directions, recommends
one, and defines the recommended direction precisely enough to guide asset
planning, motion planning, responsive planning, and later implementation.

This file does not authorize code changes, dependency installation, image
conversion, a local server, branch creation, a commit, a GitHub push, or a
Vercel action.

## Senior perspectives applied

- High-end digital product designer for authorship, composition, material, and
  visual restraint
- Senior UI/UX designer for hierarchy, scanning, navigation, and interaction
  clarity
- Senior brand systems designer for the three-node identity, palette, and
  repeatable visual grammar
- Senior interaction designer for state, continuity, and motion-ready layout
- Senior frontend architect for practical component boundaries and maintainable
  tokens
- Senior accessibility and performance reviewer for contrast, input modes,
  responsive behavior, and rendering cost

## Design objective

The visual system should make a visitor feel that Leo understands operational
work before designing the system that supports it. The site should appear calm,
specific, technically credible, and human. It should not resemble an AI startup,
a no-code agency, a terminal portfolio, or a page assembled from effect-library
demos.

The experience has one primary action: `Schedule a Call`. Projects carry the
proof. Capabilities and approach explain the judgment behind that proof.

## Composition directions

### Direction A: Editorial systems canvas

This is a linear, project-led homepage with a large human hero and a quiet
systems layer running through the composition.

#### Structure

- A translucent full-width navigation layer sits above the page without a
  floating capsule around the entire menu.
- The hero uses an asymmetric 12-column layout. Copy occupies columns 1 through 7. The portrait occupies columns 8 through 12 and extends farther vertically.
- The headline becomes the dominant typographic element and overlaps the
  portrait's visual territory without covering Leo's face.
- A thin three-node system path moves from the copy field toward the portrait.
- Projects follow immediately after the hero and receive the strongest layout
  differentiation on the page.
- Capabilities use open columns and dividing rules rather than boxed cards.
- `My Approach` becomes a connected progression with one readable step per
  segment.
- The final conversation section resolves the system path into the call action.

#### Visual character

- Warm near-black canvas
- Solid pastel accents without neon bloom
- Large editorial typography
- Controlled asymmetry
- Fine lines and quiet technical metadata
- One prominent portrait rather than a profile card
- Project-specific diagrams rather than generic illustrations

#### Strengths

- Balances Leo's human presence with technical evidence.
- Supports the approved homepage narrative in its natural reading order.
- Creates an original identity from the portrait and three-node mark.
- Keeps the call action visible without turning the page into a service funnel.
- Can grow into dedicated case studies without redesigning the homepage shell.

#### Risks and controls

- Large typography can crowd narrow laptops. Use fluid type with tested line
  breaks and a width ceiling.
- Portrait overlap can obscure the image. Define a protected face and body area
  during asset production.
- Fine system lines can become decoration. Each use must support identity,
  section continuity, or explanation.

### Direction B: Structured project index

This is a denser desktop composition with a persistent identity rail and a
project ledger occupying the primary reading column.

#### Structure

- A four-column left rail remains visible on large screens.
- The rail contains the three-node mark, Leo's name and role, a smaller portrait,
  the section navigation, and `Schedule a Call`.
- The remaining eight columns contain the headline, projects, capabilities,
  approach, and final conversation.
- Projects use numbered records with compact metadata and expandable evidence.
- Dividing rules create the page structure. Surfaces are used only for diagrams
  and the final action.
- The rail becomes a normal top header on tablet and mobile.

#### Visual character

- More technical and information-dense
- Strong record and index language
- Smaller portrait
- Less dramatic section transitions
- Persistent navigation and action

#### Strengths

- Makes a growing project archive easy to scan.
- Keeps navigation and the call action continuously available on wide screens.
- Communicates systematic organization without terminal styling.

#### Risks and controls

- The persistent left rail resembles several established developer-portfolio
  patterns.
- A smaller portrait weakens the human impression Leo wants to retain.
- The rail consumes too much width on common 13-inch laptops.
- Dense project records can feel like a resume unless the visual evidence
  remains prominent.

## Recommendation

Proceed with **Direction A: Editorial systems canvas**.

Direction A is the stronger answer to the approved goal because it makes the
portrait, systems identity, project evidence, and call action part of one
narrative. It also gives the redesign more visual range without turning it into
a dashboard or a component showcase.

Direction B should remain a documented alternative. Its compact record pattern
may become useful for a future project archive once the catalog is large enough
to justify a dedicated index.

The remainder of this specification defines Direction A.

### Direction approval record

Leo approved Direction A on 2026-09-10. Direction B remains a documented future
option whose reconsideration trigger is a project catalog large enough to need a
dedicated archive or denser index. Leo subsequently approved the proposed
palette and typography. These approvals authorize later planning artifacts but
do not authorize implementation.

## Identity system

### Three-node mark

The identity consists of one starting node feeding two downstream nodes. It must
read as a workflow at 16 px and must not resemble a share icon.

The construction should use:

- A filled starting node with a slightly larger visual weight
- A short horizontal connector that branches once
- Two downstream nodes aligned vertically
- Rounded connector ends and optical alignment rather than mathematical
  centering alone
- A static favicon and an animated inline version within the site

The mark may appear in four roles:

| Role                | Treatment                                                           |
| ------------------- | ------------------------------------------------------------------- |
| Browser favicon     | Static, high-contrast simplified form                               |
| Navigation identity | 20 to 24 px mark beside `Leo Sanga`                                 |
| Hero system path    | Enlarged line construction integrated with the portrait composition |
| Diagram grammar     | Node and connector primitives reused to explain real project flow   |

Do not scatter the mark as a decorative pattern. The favicon, navigation, hero,
and explanatory diagrams are its complete first-release scope.

### Visual voice

- Precise without appearing clinical
- Sophisticated without relying on luxury-brand styling
- Technical without terminal or circuit-board imagery
- Personal without biography or lifestyle content
- Expressive through scale, space, and motion rather than glow

## Color system

### Core palette

| Token            | HEX       | Role                                                    |
| ---------------- | --------- | ------------------------------------------------------- |
| `canvas`         | `#0F0E14` | Page background and deepest surface                     |
| `canvas-soft`    | `#14121A` | Alternating section field where separation is necessary |
| `surface`        | `#1A1722` | Diagrams, mobile menu, and elevated content             |
| `surface-raised` | `#211D2B` | Selected or interactive evidence area                   |
| `text-primary`   | `#F7F3FA` | Headings and high-priority text                         |
| `text-body`      | `#C8C0D0` | Body copy                                               |
| `text-muted`     | `#9D94A6` | Metadata and supporting labels                          |
| `lavender`       | `#CBB7F5` | Primary accent and call action                          |
| `lavender-hover` | `#D9C9FA` | Primary-action hover state                              |
| `mist`           | `#AFC9E8` | Secondary accent, focus, and active system signal       |
| `sage`           | `#B8CDBD` | Optional completed-state accent in diagrams only        |
| `line`           | `#393341` | Structural rules and default borders                    |
| `line-strong`    | `#51485D` | Active or emphasized boundaries                         |
| `button-ink`     | `#17121F` | Text and icons on lavender controls                     |

### Contrast baseline

Calculated contrast on `canvas`:

| Pair                       |   Ratio | Use                                   |
| -------------------------- | ------: | ------------------------------------- |
| `text-primary` on `canvas` | 17.52:1 | All text sizes                        |
| `text-body` on `canvas`    | 10.89:1 | Body copy                             |
| `text-muted` on `canvas`   |  6.60:1 | Metadata and labels                   |
| `lavender` on `canvas`     | 10.64:1 | Accent text and focus-adjacent states |
| `mist` on `canvas`         | 11.29:1 | Links and active signals              |
| `button-ink` on `lavender` | 10.18:1 | Primary button                        |

These ratios are inputs to implementation testing. Final browser rendering must
still be verified.

### Color behavior

- Lavender is the primary identity accent.
- Mist is the complementary accent and the preferred color for moving signals,
  focus emphasis, and selected technical details.
- Sage appears only when a diagram needs a stable completed state.
- Do not use gradients on text.
- A low-opacity radial wash may appear behind the portrait. Lavender and mist
  should remain below 10 percent opacity and must not create a visible glow ring.
- Do not use pure black, pure white, saturated violet, electric blue, or neon
  pink.
- Color should never be the only indicator of focus, selection, completion, or
  disclosure state.

## Typography

### Recommended families

| Role               | Typeface                                                                    | Source and use                                                                    |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Display and body   | [`Instrument Sans`](https://github.com/Instrument/instrument-sans) variable | SIL Open Font License 1.1; headings, body, navigation, and controls               |
| Technical metadata | [`IBM Plex Mono`](https://github.com/IBM/plex)                              | SIL Open Font License 1.1; project IDs, diagram labels, and compact metadata only |
| Fallback           | `ui-sans-serif, system-ui, sans-serif`                                      | Immediate fallback and failure-safe rendering                                     |

The fonts should be self-hosted as subset WOFF2 assets during implementation.
Only the weights used by the interface should ship. Space Grotesk should be
retired because its heavy use in modern templates contributes to the current
generic appearance. Monospace must remain a supporting voice rather than the
default technical aesthetic.

### Type scale

| Token             | Size                                       | Line height |   Tracking |     Weight | Use                                 |
| ----------------- | ------------------------------------------ | ----------: | ---------: | ---------: | ----------------------------------- |
| `display-hero`    | `clamp(3.25rem, 7vw, 7rem)`                |      `0.94` | `-0.045em` | 580 to 620 | One homepage H1                     |
| `display-section` | `clamp(2.25rem, 4.5vw, 4.5rem)`            |      `1.00` | `-0.035em` | 560 to 600 | Section headings                    |
| `heading-project` | `clamp(1.75rem, 2.8vw, 2.75rem)`           |      `1.08` | `-0.025em` | 560 to 600 | Featured project title              |
| `heading-card`    | `clamp(1.25rem, 1.8vw, 1.625rem)`          |      `1.18` | `-0.015em` |        560 | Project and capability titles       |
| `body-large`      | `clamp(1.125rem, 1.35vw, 1.375rem)`        |      `1.55` | `-0.005em` |        400 | Hero and final conversation support |
| `body`            | `clamp(1rem, 0.25vw + 0.95rem, 1.0625rem)` |      `1.65` |        `0` |        400 | Standard copy                       |
| `navigation`      | `0.9375rem`                                |      `1.20` | `-0.005em` |        520 | Navigation and buttons              |
| `label`           | `0.75rem`                                  |      `1.30` |   `0.08em` |        600 | Rare section labels and statuses    |
| `metadata`        | `0.8125rem`                                |      `1.55` |  `0.015em` |        450 | Project and diagram metadata        |

Use optical sizing where the selected font supports it. Large type uses tighter
tracking. Small type uses neutral or slightly positive tracking. All-caps text is
limited to compact project IDs or diagram states and may not become the default
section-heading treatment.

### Reading measures

- Hero support copy: 48 to 58 characters per line
- Standard body copy: maximum 65 characters per line
- Dense project metadata: maximum 78 characters per line
- Avoid centered paragraphs longer than two short lines
- Preserve the approved wording and change only line breaks during visual layout

## Layout system

### Page frame

| Viewport          |  Outer margin | Columns | Gutter | Content maximum |
| ----------------- | ------------: | ------: | -----: | --------------: |
| 1440 px and wider | 64 px minimum |      12 |  28 px |         1320 px |
| 1024 to 1439 px   |         40 px |      12 |  24 px |           Fluid |
| 768 to 1023 px    |         32 px |       8 |  20 px |           Fluid |
| Below 768 px      |         20 px |       4 |  16 px |           Fluid |

Do not center every section into the same narrow text column. Alignment should
repeat across the hero, projects, capabilities, approach, and final action so
the page feels composed rather than stacked.

### Spacing scale

Use a 4 px base unit with named steps:

| Token      |  Value | Typical use                       |
| ---------- | -----: | --------------------------------- |
| `space-1`  |   4 px | Optical adjustment                |
| `space-2`  |   8 px | Icon and label gaps               |
| `space-3`  |  12 px | Compact metadata groups           |
| `space-4`  |  16 px | Control internals                 |
| `space-6`  |  24 px | Local content groups              |
| `space-8`  |  32 px | Card or diagram padding           |
| `space-12` |  48 px | Subsection separation             |
| `space-16` |  64 px | Major internal section gap        |
| `space-24` |  96 px | Small-screen section space        |
| `space-36` | 144 px | Wide-screen section space ceiling |

Default section padding is `clamp(6rem, 10vw, 9rem)`. The hero-to-projects
transition may be tighter because the first project is the next proof point.
Empty space must establish hierarchy or allow the portrait to breathe. It should
not appear as an unassigned band between components.

## Navigation

### Desktop

- Sticky at the top with a 72 px visual height.
- `Leo Sanga` and the 20 to 24 px three-node mark align left.
- `Projects`, `Capabilities`, and `Approach` align right before the primary
  action.
- `Schedule a Call` remains the only filled control.
- The background begins transparent, then gains a dark translucent material
  after content scrolls beneath it.
- Use a soft scroll-edge fade instead of a permanent hard bottom border.
- Active-section indication uses the approved shared moving rule.

### Mobile

- Use a 64 px header with the mark and `Leo Sanga` on the left.
- Keep a compact `Call` action visible.
- A clearly labeled menu button opens navigation links in a non-modal drop-down
  or sheet anchored to the header.
- The menu must trap focus only when it behaves as a modal sheet.
- Closing returns focus to the menu button.
- Body scrolling is locked only for a modal sheet.

### Navigation states

- Minimum target size: 44 by 44 px
- Visible focus ring: 2 px `mist` with a 2 px `canvas` separation
- Hover may change text color and move the shared rule
- Press feedback begins on pointer-down and may scale to `0.97`
- Anchor targets receive enough scroll margin to clear the sticky header

## Hero

### Desktop composition

- Role label begins in column 1.
- H1 spans columns 1 through 8 and is allowed to cross the conceptual boundary
  toward the portrait.
- Supporting copy stays within columns 1 through 6.
- `Schedule a Call` sits below the copy with 28 to 32 px separation.
- Portrait occupies columns 8 through 12, with a target visible aspect ratio near
  4:5.
- The portrait should sit directly on the composition or within one quiet crop.
  Do not place it inside a thick outer card with a second profile card below it.
- The three-node system line sits behind text and portrait edges without crossing
  Leo's face.

### Tablet and mobile

- Tablet retains two columns if the headline can hold an intentional line break.
- Mobile uses copy first, then the primary action, then the portrait.
- Mobile portrait aspect ratio may move toward 4:3 to avoid an overly tall first
  viewport.
- The professional label remains above the H1.
- The H1 must not shrink below 52 px on common 390 px screens unless a verified
  long-word overflow requires it.

### Portrait treatment

- Use the original HEIC as the derivative source later.
- Preserve Leo's lighting edits and natural skin tone.
- Asset work may crop, resize, encode, and apply output sharpening. It must not
  reshape facial features, generate missing content, replace the background, or
  apply a stylized AI treatment.
- Define protected crop coordinates after inspecting the original image.
- Use a subtle edge treatment only where needed to merge the image with the
  canvas.

## Projects

### Section structure

All current work stays inside one `Projects` section. The visual hierarchy may
distinguish the lead project, but the page must not create a separate `Work` or
`Featured Projects` navigation destination.

### Lead project

- Use a wide two-column composition.
- Evidence and project copy occupy five columns.
- The workflow visual occupies seven columns.
- The project number and status appear as quiet metadata above the title.
- Existing approved claims retain their wording and context.
- The workflow visual is visible without opening a second page.
- Deeper evidence may use a disclosure if its closed state still communicates
  the project, constraint, and outcome.

### Remaining projects

- Use editorial rows separated by full-width rules.
- Each row exposes its title, concise system description, relevant metadata,
  and disclosure affordance.
- The open state creates a two-column evidence area without turning every project
  into an identical card.
- Only one project needs to be open by default if the complete closed list is
  still understandable.
- Do not add category filters yet.

### Project visuals

- Prefer system topology, sequence, branching, transformation, and validation
  diagrams derived only from approved project facts.
- Future owned work may use a video poster and demo playback.
- NDA-constrained work must not receive invented screenshots or realistic mock
  data that implies access to the original system.
- Technology names belong in metadata. Do not create a logo wall.

## Capabilities

The four approved capability groups should appear as an open two-by-two matrix
made from shared rules, not four separate floating card shells. AI + Intelligent
Automation appears second so it is visible in the first capability scan.

### Desktop

- Use two columns and two rows separated by shared vertical and horizontal
  rules.
- Each capability has a short functional heading, approved description, and one
  quiet metadata line.
- No icons are required.
- A local cursor or focus response may brighten the nearest rule or node, but the
  content itself remains stable.

### Mobile

- Stack the capabilities with horizontal separators.
- Preserve natural content order.
- Avoid horizontal carousels.

AI + Intelligent Automation remains a distinct capability group. Its treatment
must match the other capability groups so AI is visible without becoming the
site's visual identity.

## My Approach

- Use the approved heading `My Approach`.
- Desktop displays the steps along a horizontal route.
- Tablet may use a two-by-two route only if connector order stays unambiguous.
  A single vertical route is the safer default.
- Mobile uses a vertical path aligned to the left of the step copy.
- Numbers use the technical metadata face and should not become large faded
  background decoration.
- Each connector has a clear beginning and end.
- The ID-bearing section wrapper remains untransformed because scrollspy measures
  its position.

## Final conversation section

- Use the approved heading `Start with a conversation.`
- Place the approved support copy within a readable 56-character measure.
- Stack each support-copy sentence on its own line as a paragraph, using a
  compact internal gap rather than one continuous text block.
- `Schedule a Call` is the single prominent action.
- Email and LinkedIn move to a quiet footer treatment and do not appear beside
  the primary button.
- The final section may use `surface` as a contained field with a 24 px radius,
  provided it is the only large rounded panel on the homepage.
- The system path ends at one terminal node adjacent to the call action.
- Do not use availability language, a form, service packages, or a repeated
  slogan.

## Footer

- Keep the footer visually small.
- Include Leo's name, current year, email, and LinkedIn as low-emphasis text
  links.
- Do not include a resume, GitHub, availability statement, navigation sitemap,
  or the removed slogan.
- Repeat the small static three-node mark only if it improves balance. The mark
  should not animate again in the footer.

## Controls and states

### Primary button

| Property           | Specification                                                 |
| ------------------ | ------------------------------------------------------------- |
| Label              | `Schedule a Call` except compact mobile header may use `Call` |
| Height             | 48 px default; 44 px compact header                           |
| Horizontal padding | 20 px default; 16 px compact                                  |
| Radius             | 12 px                                                         |
| Fill               | `lavender`                                                    |
| Text               | `button-ink`, 15 px, weight 600                               |
| Icon               | Optional 16 px directional arrow, after the label             |
| Hover              | `lavender-hover`, 1 px lift, controlled shadow                |
| Press              | Scale to `0.97`, 100 to 140 ms                                |
| Focus              | 2 px `mist` ring with 2 px separation                         |
| Disabled           | Not applicable to the outbound call link                      |

Avoid pill buttons. A moderate radius feels more deliberate and gives the call
action a stronger silhouette.

### Text links

- Use an underline, directional cue, or rule movement for interactive affordance.
- Default body links use `text-primary` with a `mist` underline.
- Hover and focus increase underline contrast.
- External destinations receive accessible text where the destination is not
  otherwise clear. Do not add an external-link icon to every link.

### Disclosures

- Use a native or accessible disclosure with an explicit expanded state.
- The row remains visually complete when closed.
- Animate internal opacity and translation only. Do not animate disclosure
  height.
- The indicator rotates from its current state and uses the same anchored path
  in reverse.
- Focus stays on the trigger when state changes.

## Surfaces, borders, radii, and shadows

### Surface hierarchy

1. `canvas` for the page
2. `canvas-soft` for rare section separation
3. `surface` for functional diagrams or the mobile menu
4. `surface-raised` for an active local state

Do not place translucent surfaces on top of other translucent surfaces.

### Borders

- Default structural rule: 1 px `line`
- Active boundary: 1 px `line-strong`
- Use a brighter top edge only on floating navigation material
- Avoid outlined containers around every content group

### Radius scale

| Token            | Value | Use                                       |
| ---------------- | ----: | ----------------------------------------- |
| `radius-control` | 12 px | Buttons, menu items, compact controls     |
| `radius-content` | 16 px | Diagrams and project media                |
| `radius-feature` | 24 px | Portrait crop or final conversation panel |

Use no more than these three radii. Full pills are reserved for a true status
chip if a future project needs one.

### Shadows

| Token            | Value                              | Use                                                      |
| ---------------- | ---------------------------------- | -------------------------------------------------------- |
| `shadow-control` | `0 8px 24px rgba(5, 3, 10, 0.24)`  | Primary button hover                                     |
| `shadow-nav`     | `0 14px 48px rgba(5, 3, 10, 0.30)` | Sticky navigation after scroll                           |
| `shadow-feature` | `0 28px 80px rgba(5, 3, 10, 0.38)` | Portrait or final panel only when separation is required |

Shadows indicate elevation. They may not become colored glows.

## Icons and visual assets

- Use custom SVG for the identity mark and project workflow diagrams.
- Use Lucide only for familiar functional actions such as arrows, menu, close,
  email, or LinkedIn when text alone is insufficient.
- Default functional icon size is 16 to 20 px with a 1.75 px stroke.
- Do not place icons above capability headings.
- Do not use emoji, abstract 3D objects, stock illustrations, or AI-generated
  decorative imagery.
- The social-sharing image should combine the portrait, name, role, and static
  three-node mark. Exact art direction belongs in the asset specification.

## Motion-ready composition frames

The separate motion specification will define implementation. These frames lock
the visual relationship the animation must preserve.

### Hero sequence

| Frame             | Visual state                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Initial           | Layout space is final. The role label, H1, support copy, call action, portrait, and node system occupy their final semantic order |
| Hierarchy settles | Copy moves no more than 10 px into place with short stagger. The portrait resolves from a maximum scale of `0.98`                 |
| Identity signal   | One mist signal moves from the starting node to the two downstream nodes after the headline is readable                           |
| Resting           | All content is static. Fine-pointer portrait depth becomes available only while the pointer is inside the portrait region         |

### Project interaction

| Frame  | Visual state                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| Closed | Title, summary, metadata, and disclosure affordance are fully readable                                     |
| Intent | Focus or hover increases local contrast and moves the internal directional cue up to 4 px                  |
| Open   | Evidence appears in place. A workflow signal traverses once and leaves the completed diagram static        |
| Close  | Internal movement follows the same anchored path in reverse. Layout state changes without height animation |

### Approach progression

| Frame            | Visual state                                                            |
| ---------------- | ----------------------------------------------------------------------- |
| Before threshold | All text remains readable; future connector segments use lower contrast |
| Active step      | Step text and node reach full contrast                                  |
| Progress         | Connector scales toward the next node without moving the text block     |
| Complete         | The full route remains static and readable                              |

### Final conversation

| Frame          | Visual state                                                  |
| -------------- | ------------------------------------------------------------- |
| Entry          | Heading, support copy, and call action settle as one group    |
| Signal arrival | One signal reaches the terminal node beside `Schedule a Call` |
| Interaction    | Hover, focus, and press respond immediately at the button     |
| Resting        | No pulse or loop remains                                      |

## Responsive specification

### Wide desktop, 1440 px and above

- Use the complete 12-column composition.
- Keep content width at or below 1320 px.
- Hero H1 may reach 112 px when the approved words retain a stable two-line
  composition.
- Portrait depth and project hover choreography may be enabled for fine pointers.

### Laptop, 1024 to 1439 px

- Preserve 12 columns with smaller gutters and margins.
- Reduce hero overlap before reducing readable copy size.
- Keep the portrait at least four columns wide.
- Validate specifically at 1024 by 768 and 1280 by 800 because the hero must not
  create the current oversized empty transition.

### Tablet, 768 to 1023 px

- Use eight columns.
- Allow the hero to stack if the portrait would become too narrow.
- Use vertical approach progression by default.
- Capability columns may remain three-up only when each column supports a
  readable measure.
- Mobile navigation behavior may begin at this range if labels do not fit.

### Mobile, below 768 px

- Use four columns and 20 px margins.
- Keep the content order semantic and linear.
- Use full-width project rows and vertical workflow layouts.
- Primary content controls may span the available width, but the call button
  does not need to become full-width when its label remains comfortable.
- Disable portrait pointer depth and hover-only effects.
- Reduce entrance travel to 6 px or less.
- Avoid horizontal scrolling at 320 px CSS width.

### Text scaling and zoom

- Use `rem`, `em`, and `clamp()` for text and content-related spacing.
- Support 200 percent browser zoom without clipped controls or hidden content.
- Essential content must reflow at 400 percent zoom at a 1280 px viewport.
- Do not truncate project titles or the primary action.

## Accessibility requirements

- One H1 and a logical heading hierarchy.
- Semantic landmarks for navigation, main content, and footer.
- A visible skip link.
- Every interactive element reachable and operable with a keyboard.
- Focus styles visible against every surface.
- Minimum 44 by 44 px target area for primary navigation and controls.
- Current navigation state exposed with `aria-current` where appropriate.
- Disclosure triggers expose expanded state and control relationship.
- Portrait and project imagery receive context-specific alternative text.
- Decorative node lines are hidden from assistive technology.
- Project diagrams have a concise text equivalent.
- No essential content appears only on hover.
- Reduced-motion, reduced-transparency, and increased-contrast preferences have
  defined fallbacks.
- No transformed ID-bearing section wrapper.
- Initial content remains available in server-rendered HTML.

## Performance requirements carried into design

- No WebGL, canvas scene, shader, background video, or cursor-trail system.
- Self-host fonts and subset them. Prefer one variable sans file plus the
  minimum mono files required.
- Use responsive portrait sources with intrinsic dimensions.
- Use AVIF and WebP where browser support and source quality justify them, plus a
  JPEG fallback.
- Inline only small critical SVG assets.
- Lazy-load project media below the initial viewport.
- Load future demo video after clear visitor intent.
- Use CSS and the Web Animations API as the motion baseline.
- No new design-system package is required for this direction.
- Use existing accessible primitives only when their behavior matches the
  approved interface.

Exact byte, paint, and Core Web Vitals budgets belong in the responsive,
accessibility, and performance specification.

## Component-library rules

- The final composition must be authored in the repository rather than imported
  as a page template.
- A borrowed primitive must solve a behavior or accessibility problem.
- Do not combine Mantine, HeroUI, daisyUI, or MUI with the current Tailwind
  application for visual styling.
- shadcn/ui patterns may inform accessible structure, but their default card,
  button, badge, and typography appearance must not define the portfolio.
- Aceternity UI, Magic UI, Recent Design, and 21st.dev may inform an interaction
  prototype only after license, dependency, server-rendering, keyboard, and
  reduced-motion review.
- Every adopted effect must be redrawn with the approved palette, dimensions,
  easing, and signal-routing identity.

## Prohibited visual patterns

- Neon gradients or colored glow around text and cards
- Gradient-filled headline text
- Dot-grid or perspective-grid background as the primary atmosphere
- Terminal windows, command prompts, boot text, or code-rain decoration
- Glass panels nested inside glass panels
- Repeated pills, badges, and rounded cards
- Bento layout used only because it is fashionable
- Profile-card treatment around the hero portrait
- Technology logo wall
- Floating mobile dock
- Command palette without a portfolio-specific need
- Skill percentages or proficiency meters
- Employment status or availability pill
- Chatbot or AI assistant on the homepage
- Decorative stock images or generated abstract 3D shapes

## Acceptance criteria for this specification

The visual direction is ready for the next planning phase when Leo has approved:

- Direction A or Direction B
- The three-node mark as the visual identity
- The core palette and mist-blue partnership
- Instrument Sans and IBM Plex Mono as the typography direction
- The editorial project presentation and open capability layout
- The portrait treatment
- The navigation and final conversation composition
- The prohibited-pattern list

Approval of this file permits the asset and imagery production specification to
begin. It does not permit image conversion or implementation.

## Next planning artifacts

After visual-direction approval, create these artifacts in order:

1. Asset and imagery production specification
2. Motion and interaction specification
3. Responsive, accessibility, and performance specification
4. Frontend architecture and implementation plan
5. QA, visual review, and acceptance plan

Implementation begins only after the complete planning set is reviewed and Leo
explicitly approves Gate 1 in the workflow plan.

## Fresh-session continuation

A fresh session continuing visual work should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. [`PORTFOLIO-REDESIGN-ANALYSIS.md`](./PORTFOLIO-REDESIGN-ANALYSIS.md)
5. [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
6. [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
7. This specification
8. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
9. `ANIMATION_PLAN_PROMPT.md` before touching motion or measured sections
10. Current portfolio source and asset files relevant to the next phase

The session must inspect Git status, preserve user-owned changes, and stop before
implementation unless the relevant approval gate has been explicitly granted.
