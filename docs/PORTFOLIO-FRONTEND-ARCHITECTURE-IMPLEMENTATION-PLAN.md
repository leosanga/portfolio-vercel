# Portfolio Version 2 Frontend Architecture and Implementation Plan

Status: Approved by Leo; Gate 1 local implementation authorized
Last updated: 2026-09-10
Owner: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Safety workflow: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This document converts the approved portfolio strategy, content, visual,
asset, motion, responsive, accessibility, and performance decisions into a
frontend architecture that can be implemented locally without replacing the
current homepage.

It specifies the preview route, module boundaries, data flow, component
responsibilities, interaction ownership, file manifest, build sequence,
verification sequence, known limits, and final cutover boundary. It is written
so a fresh implementation session can resume without reconstructing product or
technical decisions.

This is a plan only. It does not authorize file scaffolding, asset production,
dependency installation, a local server, a Git commit, a push, or a Vercel
action.

## Senior perspectives applied

- Senior frontend architect, for route isolation, module boundaries, state
  ownership, server rendering, and future case-study growth.
- Senior frontend developer, for implementation order, TypeScript contracts,
  browser behavior, and maintainable CSS.
- Senior systems architect, for one-way data flow, narrow interfaces, and
  recoverable migration.
- Senior accessibility engineer, for semantic structure, keyboard behavior,
  preference modes, and resilient no-JavaScript content.
- Senior web performance engineer, for delivery budgets, hydration boundaries,
  asset loading, and avoiding unnecessary runtime dependencies.
- Senior security-minded and privacy-minded engineer, for external links,
  metadata, asset provenance, and exclusion of private source material.
- Senior release engineer, for worktree isolation, explicit commits, cutover,
  and rollback.

These roles set the quality bar. Leo retains approval authority at every gate.

## Approved inputs and precedence

Implementation must follow these sources in order:

1. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
2. [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
3. [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
4. [`PORTFOLIO-ASSET-IMAGERY-SPEC.md`](./PORTFOLIO-ASSET-IMAGERY-SPEC.md)
5. [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
6. [`../animation-plans/000-MOTION-INTERACTION-SPEC.md`](../animation-plans/000-MOTION-INTERACTION-SPEC.md)
7. [`PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md`](./PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md)
8. This plan after approval
9. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
10. `ANIMATION_PLAN_PROMPT.md` before changing motion or measured sections

If two sources appear to conflict, the more specific approved specification
wins. A change that maps to none of these sources is scope drift and must stop.

## Current technical baseline

- React 19 and TypeScript with strict compiler settings.
- TanStack Start and file-based TanStack Router.
- Vite 8 and Tailwind CSS v4.
- Server rendering through the existing TanStack Start and Nitro entry.
- Existing production route at `/` in `src/routes/index.tsx`.
- Existing root shell and global stylesheet ownership in
  `src/routes/__root.tsx`.
- Existing portfolio copy and project evidence in
  `src/components/portfolio/data.ts`.
- Existing center-line scrollspy behavior in
  `src/components/portfolio/useActiveSection.ts`.
- No test suite is currently configured.
- Existing Vite development port is `8080`.
- The route tree is generated into `src/routeTree.gen.ts` and must never be
  hand-edited.
- The current worktree contains user-owned and planning changes. They must not
  be swept into a commit.

## Architecture decision

Build version 2 as an additive application slice exposed at `/redesign` only in
the local redesign worktree. Keep `/` rendering version 1 for the entire design
and review phase.

The slice uses:

- One preview route file.
- One page composition component.
- Versioned components under `portfolio-v2`.
- A versioned content module that composes approved new copy with read-only
  legacy project evidence.
- Versioned image, font, icon, and social assets.
- One scoped version 2 stylesheet.
- Small hooks for scrollspy, menu behavior, one-shot section activation, and
  fine-pointer portrait response.
- Native platform behavior and CSS or Web Animations API motion.
- No new production runtime dependency.

This creates a complete visual prototype without repurposing the production
homepage, changing current assets, or deleting current components.

## Route and release topology

```text
Original worktree, main
  /                    -> current version 1 homepage
  localhost:8080       -> visual reference

Sibling worktree, redesign/v2
  /                    -> unchanged version 1 homepage
  /redesign            -> local-only version 2 preview
  localhost:8081       -> redesign review

Final approved cutover commit
  /                    -> version 2 page
  /redesign            -> preview route removed before publication
  version 1 source     -> retained in Git history and baseline tag
```

The preview route must include `noindex, nofollow` metadata and no canonical
link. The route must never be pushed while it is being used as a private review
surface. Removing the preview route at cutover prevents duplicate public
content.

## Local server contract

After Gate 1 approval, use explicit ports and strict binding:

```text
Current worktree:
bun run dev -- --host 127.0.0.1 --port 8080 --strictPort

Redesign worktree:
bun run dev -- --host 127.0.0.1 --port 8081 --strictPort
```

Record both process or session identifiers in
`docs/REDESIGN-CURRENT-STATE.md`. Do not kill a port broadly. Stop only the
recorded process. Binding to `127.0.0.1` keeps the review surface local to the
machine unless Leo deliberately approves another binding.

## Source and data architecture

### One-way content flow

```text
approved specs
      |
      v
portfolio-v2 content module -----------+
      |                                 |
      | imports locked evidence         | supplies approved v2 copy
      v                                 v
legacy data.ts                    page components
      |                                 |
      +---------- adapted view models --+
```

The version 2 content module must not silently copy and fork locked employer
evidence. It should import the existing project records, validate the expected
featured and compact-project identities, and map them into version 2 view
models without changing their strings.

This preserves the current source of record for:

- The more than 8 hours per week figure.
- The 70 files figure.
- The complete implementation-delivery workflow.
- Existing employer-derived architecture and platform constraints.

The new content module owns approved version 2 copy that does not exist in the
legacy source, including navigation labels, hero copy, three capability groups,
final conversation copy, metadata, and display labels.

### Proposed content types

```ts
type NavigationItem = {
  id: "projects" | "capabilities" | "approach";
  label: string;
};

type Capability = {
  title: string;
  statement: string;
  terms: readonly string[];
};

type ProjectViewModel = {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  hardPart?: string;
  featured: boolean;
  flow?: LegacyFlow;
};

type PortfolioContent = {
  navigation: readonly NavigationItem[];
  hero: HeroContent;
  projects: readonly ProjectViewModel[];
  capabilities: readonly Capability[];
  approach: readonly ApproachStep[];
  conversation: ConversationContent;
  contact: ContactContent;
  metadata: MetadataContent;
};
```

Use literal unions and readonly collections where they prevent accidental
section or content drift. Avoid a generalized content-management abstraction.
There is one page and one reviewed content set.

### Runtime validation boundary

Do not add Zod or another runtime validator merely because it is installed.
The content is compiled, local TypeScript data. Use compile-time types plus
small invariant assertions for developer mistakes that TypeScript cannot catch,
such as exactly one featured project and unique section IDs.

Do not expose assertion detail to visitors. A failed development invariant
should be caught by checks before review.

### Future case-study growth

Do not create a public case-study route now. Prepare the type boundary only:

- Optional future `caseStudy` metadata may be introduced when an owned project
  is approved for publication.
- A future route should live at `/projects/$slug`.
- The n8n booking agent remains absent until its completion and evidence review.
- The homepage remains one unified Projects section until archive thresholds in
  the content specification are met.
- Do not add filters, empty links, disabled demos, or placeholder media.

## Component architecture

```text
PortfolioV2Page
|-- SkipLinkV2
|-- PortfolioNavV2
|   |-- SignalMarkV2
|   |-- one responsive navigation list
|   `-- PrimaryCallLinkV2
|-- main#main-content-v2
|   |-- HeroV2
|   |   |-- HeroCopyV2
|   |   |-- SignalPathV2
|   |   `-- PortraitV2
|   |-- ProjectsV2
|   |   |-- FeaturedProjectV2
|   |   |   `-- WorkflowDisclosureV2
|   |   |       `-- WorkflowDiagramV2
|   |   `-- ProjectRowV2 x 4
|   |-- CapabilitiesV2
|   |   `-- CapabilityColumnV2 x 3
|   |-- ApproachV2
|   |   `-- ApproachStepV2 x 4
|   `-- ConversationV2
|       |-- SignalTerminalV2
|       `-- PrimaryCallLinkV2
`-- FooterV2
```

Keep components purpose-specific. Do not create a universal card, section, or
animation component that hides the intended composition. Reuse only primitives
whose semantics and behavior are genuinely shared, such as the primary call
link and identity mark.

## Component contracts

### `PortfolioV2Page`

- Owns semantic section order and nothing else.
- Renders one H1 and ordered H2 sections.
- Keeps each ID-bearing section free of transforms and transitions.
- Places motion wrappers inside stable section boxes.
- Supplies the one responsive DOM required by the approved accessibility spec.

### `PortfolioNavV2`

- Sticky header with identity, Projects, Capabilities, Approach, and Schedule a
  Call.
- Uses one navigation list at every breakpoint.
- Desktop exposes the list inline.
- Mobile uses a button with `aria-expanded` and `aria-controls` to reveal the
  same list.
- Mobile Escape closes the menu and returns focus to its trigger.
- A selected link closes the mobile menu.
- The call link navigates to Google Calendar in the same tab.
- Scrollspy preserves the current center-line measurement concept.
- The active indicator animates `translateX` and `scaleX`, never width.
- The static SSR state does not claim an active section before hydration.

The mobile menu is a non-modal disclosure, not a dialog. Do not add a focus trap
or body scroll lock unless later testing proves the menu occupies the full
viewport and behaves modally.

### `HeroV2`

- Uses the exact approved professional label, headline, support copy, and CTA.
- Keeps the CTA singular.
- Uses the versioned responsive `<picture>` portrait.
- Keeps copy before portrait in DOM order.
- Renders a complete readable layout before motion or JavaScript.
- Owns the one-time hierarchy entrance and one-time three-node signal.
- Enables portrait depth only for a fine pointer inside the portrait region.
- Does not place system lines across Leo's face.

### `ProjectsV2`

- Renders the complete current set inside one Projects section.
- Does not create a separate Work, More Builds, or case-study section.
- Renders the featured implementation-delivery system first.
- Keeps the remaining four entries as editorial rows.
- Receives view models only. It does not rewrite or enrich evidence.

### `FeaturedProjectV2`

- Presents project type, title, problem, solution, technology metadata, hard
  part, and workflow disclosure in the approved order.
- Uses native `<details>` and `<summary>`.
- Does not animate height or block size.
- Keeps disclosure focus on the summary.
- Keeps the closed state useful and understandable.

### `WorkflowDiagramV2`

- Reuses the existing narrow row-and-branch data shape.
- Renders nodes and labels as semantic HTML.
- Uses a decorative inline SVG overlay for trunk, branch, merge, and signal
  paths because SVG path geometry gives the one-shot signal a stable route
  while semantic text remains responsive HTML.
- Measures connector anchors only when the disclosure opens and after a
  relevant resize, not during scroll or every animation frame.
- Uses one `ResizeObserver` scoped to the open diagram when connector geometry
  needs recalculation.
- Draws a completed static topology when JavaScript, animation support, or
  motion permission is absent.
- Runs workflow playback once per open action and leaves the diagram static.
- Keeps the overlay `aria-hidden="true"` and non-focusable.

The connector decision intentionally changes the current all-CSS connector
layer. It is not a graph engine and does not expand the approved flow model.

### `ProjectRowV2`

- Uses typography, rule, metadata, and restrained directional feedback instead
  of a repeated card shell.
- Shows all approved problem, solution, hard-part, and stack content without
  line clamping.
- Adds no invented topology glyph when the source facts do not support one.
- Keeps hover enhancement behind hover and fine-pointer media queries.
- Provides equivalent focus-visible feedback for interactive elements.

Project rows are not links until a real approved destination exists. Do not
make an entire non-navigating row focusable.

### `CapabilitiesV2`

- Renders the three approved capability groups as an open band.
- Keeps technology terms as supporting text, not logos or decorative pills.
- Keeps AI within Systems Integration + Automation and relevant project facts.
- Uses semantic headings and lists.
- Does not add pointer spotlights, proficiency scores, or icon headers.

### `ApproachV2`

- Uses the heading `My Approach` and the current Understand, Plan, Build,
  Validate content.
- Renders an ordered list.
- Uses one shared one-shot observer for the progression, not one observer per
  step.
- Keeps all text visible before and after motion.
- Leaves the completed path static.

### `ConversationV2`

- Uses the exact approved heading, support copy, CTA, and duration metadata.
- Groups the copy and action as one final decision field.
- Uses one terminal signal arrival, then becomes still.
- Opens Google Calendar in the same tab.
- Keeps email out of the primary conversion block.

### `FooterV2`

- Includes name, professional label, email, LinkedIn, and copyright.
- Does not include resume, GitHub, availability, or the old footer slogan.
- Keeps email and LinkedIn visually secondary.
- May open LinkedIn in a new tab only with an accessible announcement and the
  required security relationship. Email remains a normal mail link.

## Interaction and state ownership

Use the smallest state mechanism that expresses the behavior:

| Behavior | Owner | Mechanism | Persistent state |
|---|---|---|---|
| Active navigation section | `useActiveSectionV2` | Passive scroll and resize measurement using the approved center-line algorithm | No |
| Mobile menu | `PortfolioNavV2` | React boolean plus Escape and focus-return effects | No |
| Disclosure open state | Browser | Native `<details>` | Browser-owned during the visit |
| Workflow playback restart | `WorkflowDisclosureV2` | Toggle event and local sequence key or WAAPI cancellation/restart | No |
| Hero entry and signal | `HeroV2` | CSS guarded by motion preference and support | No |
| Portrait depth | `usePortraitDepth` | CSS variables updated in a coalesced requestAnimationFrame while hovered | No |
| Approach activation | Page-level motion hook | One IntersectionObserver | No |
| Conversation arrival | Page-level motion hook | Same observer instance | No |

Do not add global state, React context, React Query data, URL state, local
storage, cookies, timers, or a canvas loop for the homepage redesign.

## CSS architecture

### Prototype loading

`src/routes/redesign.tsx` imports `src/styles/portfolio-v2.css?url` and returns it
as a route stylesheet link. The existing root stylesheet still loads during
local preview because version 1 remains available in the same application.

All version 2 selectors are scoped under `.portfolio-v2` or use a `pv2-`
prefix. Version 2 components must not depend on unscoped legacy component
classes. This prevents the redesign stylesheet from changing `/`.

The preview is allowed to carry both stylesheets because it is a local review
surface. The final production performance budget is measured after cutover,
when the root shell loads the version 2 stylesheet instead of the legacy
stylesheet.

### Layers and tokens

Organize the version 2 stylesheet in this order:

1. Font faces
2. Version 2 custom properties
3. Scoped reset and document behavior
4. Layout primitives
5. Typography
6. Controls and focus
7. Navigation
8. Hero and portrait
9. Projects and workflow
10. Capabilities
11. Approach
12. Conversation and footer
13. Motion keyframes and state selectors
14. Responsive queries
15. User preference and forced-color queries

Use the approved color, type, spacing, radius, shadow, easing, and duration
tokens exactly. Do not introduce one-off colors or durations without design
review. Do not use `transition: all`, animated layout properties, colored glow,
gradient text, or infinite animation.

### Tailwind boundary

Version 2 may use a few existing Tailwind utilities for invisible text or
layout only when that does not obscure the token contract. The recommended
implementation uses semantic `pv2-` classes for the designed experience so the
visual system remains inspectable in one stylesheet.

Do not install or copy Mantine, HeroUI, daisyUI, MUI, Aceternity, Magic UI,
21st.dev, Recent Design, or another component package for the redesign. The
research has informed composition and interaction, but the approved direction
requires a cohesive custom result. Existing shadcn or Radix code may be reused
only if a specific primitive is needed and the resulting bundle is measured.

## Font architecture

- Self-host Instrument Sans variable WOFF2 and IBM Plex Mono regular WOFF2 from
  official sources under `src/assets/portfolio-v2/fonts/`.
- Keep their SIL Open Font License files beside the assets.
- Preload only the Instrument Sans file used above the fold.
- Load IBM Plex Mono without preload unless measurement shows a real need.
- Use system fallbacks immediately.
- Remove Google Fonts network requests only in the final cutover commit.
- Do not retain Space Grotesk or JetBrains Mono on the final version 2 homepage.
- Keep total initially requested font transfer under the approved 160 KB
  ceiling.

Font downloads require a separate in-scope network action after Gate 1. Verify
official source, license, checksum, subset or weight range, and output size
before committing.

## Asset architecture

Create assets only under the approved versioned roots:

```text
src/assets/portfolio-v2/
  ASSET-SOURCES.md
  brand/
  fonts/
  portrait/
  projects/

public/portfolio-v2/
  icons/
  social/
```

### Portrait

- Read `portrait image.heic` from the original worktree as a master.
- Verify the approved SHA-256 before conversion.
- Use the installed ImageMagick build with HEIC, AVIF, WebP, JPEG, and color
  profile support.
- Work in a task-specific temporary directory.
- Produce and compare the approved 4:5, 3:4, 4:3, and 1:1 candidates.
- Strip private metadata, convert to sRGB, preserve Leo's lighting edits, and do
  not use generative editing.
- Copy only approved optimized derivatives into the redesign worktree.
- Never stage the HEIC master.

### Identity and favicon

- Build the three-node mark as a small custom SVG with separate semantic visual
  groups for start, trunk, branch, signal, and outputs.
- Keep inline marks decorative beside visible identity text.
- Create static favicon and saved-site outputs under versioned public paths.
- Do not replace current favicon files during local review.
- Use route-specific preview favicon links so Leo can evaluate the new browser
  tab icon without changing `/`.

### Social image

- Produce the approved 1200 by 630 composition under the versioned social path.
- Keep it local until release.
- Do not point preview metadata at localhost or publish an absolute production
  URL before cutover.

### Provenance

Complete `ASSET-SOURCES.md` for every generated or external file. Do not record
absolute local paths or private EXIF data.

## Metadata architecture

### Preview route

Use:

- Approved page title and meta description.
- `robots` value `noindex, nofollow`.
- Route-specific version 2 favicon links.
- No canonical URL.
- No production `og:url`.
- Local social image metadata may be omitted until the asset is approved.

### Final homepage

The cutover adds:

- Approved title and description.
- Canonical production URL after it is reverified.
- Approved Open Graph and Twitter values.
- Absolute production social image URL.
- Version 2 favicon and Apple touch icon references.
- Conservative Person structured data only if every value has been verified and
  validation passes. It is optional, not a release blocker.

Do not add a meta-keywords tag, availability language, unverified employer
information, analytics, trackers, or a scheduler embed.

## Accessibility architecture

- First focusable element is `Skip to content` and targets the version 2 main
  content start.
- One H1 and a sequential heading structure.
- Native landmarks without redundant roles.
- One navigation list across breakpoints.
- Native disclosure semantics for workflow evidence.
- Every primary control has at least a 44 by 44 CSS pixel target. Mobile menu
  rows are at least 48 pixels high.
- Focus uses the approved mist outline and canvas separation.
- Decorative SVG and motion layers remain silent and unfocusable.
- No positive tabindex.
- No focus changes at the end of an animation.
- No content depends on color or animation alone.
- Reduced motion removes travel, translation, scale, rotation, and smooth
  scrolling while retaining brief state feedback.
- Reduced transparency removes blur and translucent surfaces.
- Forced colors retains topology, boundaries, and focus.
- JavaScript-disabled content remains complete and disclosures remain usable.
- Text resizes to 200 percent and reflows at 400 percent zoom without lost
  content or two-dimensional scrolling.

## Performance architecture

- Server render all substantive copy and project evidence.
- Hydrate only navigation, menu, disclosure playback, portrait input response,
  and one-shot observers.
- Add no third-party runtime JavaScript.
- Use one passive scroll listener for scrollspy.
- Use one IntersectionObserver for Approach and Conversation.
- Use one ResizeObserver only while the workflow needs connector measurement.
- Use requestAnimationFrame only while a fine pointer is inside the portrait.
- Stop and disconnect observers when their work is complete.
- Reserve portrait space through intrinsic dimensions and aspect ratio.
- Fetch the selected hero image at high priority without lazy loading.
- Lazy-load below-fold future raster assets.
- Load future video only after intent.
- Keep every approved transfer and Core Web Vitals target as a release gate.

## Privacy and external navigation

- The primary CTA is a normal outbound Google Calendar link in the same tab.
- Do not embed the scheduler.
- Do not add tracking parameters.
- Do not send personal images to online optimization services.
- Do not include client artifacts, private screenshots, source masters, IDs,
  hidden metadata, or confidential implementation details.
- Do not add analytics, session replay, chat, advertising, pixels, or social
  widgets.
- External links must use HTTPS where available.
- Links opened in a new tab require the appropriate `rel` behavior and an
  accessible expectation. The booking CTA does not open a new tab.

## Proposed file manifest

### Planning commit, before Gate 1 implementation

Only explicitly approved planning files should be staged. Do not stage
`CLAUDE.md`, `AGENTS.md`, the HEIC master, or unrelated files without separate
review and authorization.

### New files during local prototype

```text
src/routes/redesign.tsx
src/content/portfolio-v2/content.ts
src/content/portfolio-v2/types.ts
src/components/portfolio-v2/PortfolioV2Page.tsx
src/components/portfolio-v2/SkipLinkV2.tsx
src/components/portfolio-v2/PortfolioNavV2.tsx
src/components/portfolio-v2/SignalMarkV2.tsx
src/components/portfolio-v2/PrimaryCallLinkV2.tsx
src/components/portfolio-v2/HeroV2.tsx
src/components/portfolio-v2/PortraitV2.tsx
src/components/portfolio-v2/ProjectsV2.tsx
src/components/portfolio-v2/FeaturedProjectV2.tsx
src/components/portfolio-v2/ProjectRowV2.tsx
src/components/portfolio-v2/WorkflowDisclosureV2.tsx
src/components/portfolio-v2/WorkflowDiagramV2.tsx
src/components/portfolio-v2/CapabilitiesV2.tsx
src/components/portfolio-v2/ApproachV2.tsx
src/components/portfolio-v2/ConversationV2.tsx
src/components/portfolio-v2/FooterV2.tsx
src/components/portfolio-v2/useActiveSectionV2.ts
src/components/portfolio-v2/usePortfolioV2Motion.ts
src/components/portfolio-v2/usePortraitDepth.ts
src/styles/portfolio-v2.css
src/assets/portfolio-v2/ASSET-SOURCES.md
src/assets/portfolio-v2/brand/*
src/assets/portfolio-v2/fonts/*
src/assets/portfolio-v2/portrait/*
public/portfolio-v2/icons/*
public/portfolio-v2/social/*
docs/REDESIGN-CURRENT-STATE.md
```

The exact component count may shrink when adjacent components remain clearer in
one file. It may not expand into a generic design-system exercise.

### Existing generated file expected to change during prototype

- `src/routeTree.gen.ts`, generated automatically from the new route. Never edit
  it by hand.

### Existing files that remain untouched during prototype review

- `src/routes/index.tsx`
- `src/routes/__root.tsx`
- `src/styles.css`
- `src/components/portfolio/*`
- `src/assets/leo-portrait.jpg`
- `public/favicon.svg`
- `public/favicon.png`
- `public/apple-touch-icon.png`

### Existing files permitted to change only in the final cutover commit

- `src/routes/index.tsx`, to render `PortfolioV2Page` and own final homepage
  metadata.
- `src/routes/__root.tsx`, to load the version 2 root stylesheet, fonts,
  favicons, and version 2 error-state presentation.
- `src/routeTree.gen.ts`, regenerated after the preview route is removed.

The preview route itself is removed before publication. Version 1 components,
data, stylesheet, and assets remain in the repository and baseline history.
Removal of now-unused version 1 files is out of scope for the redesign launch.

### Package and dependency files

No production dependency is planned. Do not modify `package.json` or `bun.lock`
for the visual implementation. The QA plan separately proposes optional free,
development-only browser testing tools. Any such dependency change needs Leo's
approval and a dedicated commit.

## Implementation sequence

### Phase 0: approval and repository isolation

1. Receive approval of this plan and the QA plan.
2. Receive explicit Gate 1 authorization.
3. Review every planning file and stage only approved paths.
4. Confirm the HEIC master and user-owned files are not staged.
5. Create the local planning commit without pushing.
6. Reconfirm production commit and create the immutable baseline tag locally.
7. Create `redesign/v2` and the sibling worktree from the planning commit.
8. Create `docs/REDESIGN-CURRENT-STATE.md` as the only live status record.
9. Record worktree paths, branch, commit, ports, and next action.

No code work starts before these controls are complete.

### Phase 1: additive route and semantic skeleton

1. Add the local-only `/redesign` route with noindex metadata.
2. Add the scoped stylesheet and page root.
3. Add semantic landmarks, section order, headings, navigation, skip link, and
   exact approved public copy.
4. Add content types and legacy evidence adapters.
5. Verify `/` is visually and behaviorally unchanged.
6. Verify `/redesign` server renders all substantive content with JavaScript
   disabled.

This phase intentionally looks plain. It validates architecture and content
before decorative implementation.

### Phase 2: design tokens and responsive composition

1. Add approved fonts and licenses after source verification.
2. Implement the approved color, typography, spacing, grid, surface, border,
   radius, shadow, and control tokens.
3. Build navigation, hero, Projects, Capabilities, My Approach, Conversation,
   and footer layouts without motion.
4. Validate the full required viewport matrix and zoom behavior.
5. Correct hierarchy and composition before proceeding.

### Phase 3: portrait and identity assets

1. Verify the HEIC checksum and ImageMagick capabilities.
2. Produce local crop candidates and compare them visually.
3. Leo approves the crop family.
4. Add only selected optimized derivatives and provenance.
5. Build and pixel-inspect the three-node SVG and favicon family.
6. Add route-specific preview icon references.
7. Produce and review the social image without publishing it.

Asset selection is a visual approval checkpoint, not a mechanical conversion.

### Phase 4: project evidence and workflow diagram

1. Implement the featured project hierarchy using imported locked evidence.
2. Implement editorial rows for the remaining four projects.
3. Implement native disclosure semantics.
4. Implement semantic workflow nodes and the decorative SVG connector layer.
5. Verify branch, merge, resizing, reading order, and no-JavaScript behavior.
6. Compare every locked passage against the existing source.

### Phase 5: interaction and motion

Execute the approved motion plans in dependency order:

1. Motion foundation
2. Navigation continuity
3. Hero choreography
4. Portrait depth
5. Project response
6. Workflow playback
7. Approach and conversation motion

Use the exact approved tokens and interruption rules. Run reduced-motion,
reduced-transparency, forced-color, keyboard, and performance checks after each
interaction family. Mark each motion plan complete only after its own acceptance
criteria pass.

### Phase 6: integrated local review loop

1. Run current and redesign servers side by side.
2. Review with Leo at the required desktop, laptop, tablet, and mobile sizes.
3. Record each item as a decision, defect, or experiment.
4. Implement one coherent approved revision batch.
5. Run focused checks.
6. Create a local review commit.
7. Repeat until Leo grants Gate 2 approval.

Do not combine multiple unreviewed visual directions in one revision commit.

### Phase 7: final local verification and cutover preparation

1. Run the complete QA and acceptance plan.
2. Measure the production build, not the dual-stylesheet preview, against final
   budgets in a temporary cutover state.
3. Verify metadata, tab icon, social image, links, and structured data if used.
4. Run the locked-content comparison.
5. Rehearse rollback using the baseline tag in a temporary worktree.
6. Present exact final and cutover diffs to Leo.

This phase does not authorize a push or merge.

### Phase 8: reversible cutover, only after separate approval

1. Point `/` to `PortfolioV2Page`.
2. Point the root shell to the version 2 stylesheet and asset references.
3. Update root error and not-found presentation to remain readable under the new
   stylesheet.
4. Remove the preview-only route.
5. Regenerate the route tree through the normal toolchain.
6. Run all final checks again.
7. Commit the cutover as one reversible local commit.

Gate 3 is required before pushing the branch. Gate 4 is required before merging
or triggering the production deployment.

## Commit plan

Recommended local-only checkpoints:

1. `docs: establish portfolio redesign specifications`
2. `chore: scaffold isolated portfolio v2 preview`
3. `feat: add portfolio v2 content and semantic structure`
4. `feat: add portfolio v2 visual system`
5. `feat: add portfolio v2 portrait and identity assets`
6. `feat: add portfolio v2 project evidence presentation`
7. `feat: add portfolio v2 motion and interactions`
8. `fix: resolve portfolio v2 review findings`
9. `test: record portfolio v2 acceptance evidence`
10. `feat: cut over portfolio homepage to version 2`

Actual commits should follow coherent reviewable work. Stage explicit paths,
inspect the staged diff, and never use `git add -A`, force push, reset hard, or
bypass hooks.

## Verification by phase

| Phase | Minimum checks before review commit |
|---|---|
| Skeleton | TypeScript, server-rendered content, no-JavaScript reading order, `/` unchanged |
| Visual system | TypeScript, lint delta, build, responsive screenshots, overflow, zoom |
| Assets | Dimensions, formats, byte sizes, metadata stripping, crop review, favicon pixel review |
| Projects | Locked-content comparison, disclosure keyboard behavior, diagram reading order, resize behavior |
| Motion | Reduced motion, interruption, keyboard, touch, scroll performance, no layout animation |
| Integrated | Full QA plan, performance medians, browser matrix, metadata, rollback rehearsal |

Known baseline lint failures must be listed separately from changes introduced
by version 2. A passing build does not substitute for visual, keyboard, motion,
or screen-reader review.

## Known limits and explicit non-solutions

- The preview loads legacy and version 2 styles together. It is not the final
  transfer measurement surface.
- Safari and VoiceOver may not be locally available. That gap must be recorded,
  not inferred as a pass.
- Current project evidence cannot gain screenshots, recordings, repositories,
  client details, or invented diagrams.
- The n8n booking agent remains absent until a later publication decision.
- The plan does not add analytics, so conversion measurement remains limited to
  qualitative call outcomes unless a separate privacy and measurement project
  is approved.
- The plan does not add a CMS. Project additions remain typed source changes.
- The plan does not remove the existing shadcn and other installed dependencies.
  Dependency cleanup is separate work and should be justified by measured
  production impact.
- A final homepage cutover necessarily changes existing route and root-shell
  files. Those changes are small, reviewed, reversible, and deferred until the
  local design is approved.

## Gate 1 acceptance checklist

Leo should approve this plan only if the following contract matches his intent:

- Version 1 stays available and unchanged during local review.
- Version 2 is built at local `/redesign` in a sibling worktree.
- No GitHub push or Vercel action occurs during design and revision.
- Project evidence is imported from the current source rather than copied and
  silently rewritten.
- The design uses custom scoped CSS and no new production runtime dependency.
- The workflow connector becomes a decorative SVG overlay while content stays
  semantic HTML.
- The Google Calendar CTA opens in the same tab.
- Existing source files change only during the final, separately approved
  cutover.
- The preview route is removed before publication.
- The QA plan is a release gate, not optional polish.

Approval of this plan and the QA plan completes the specification set. Local
implementation still requires Leo to explicitly authorize Gate 1.

## Approval record

Leo approved this plan and explicitly authorized Gate 1 local implementation on
2026-09-10. The authorization covers the local planning commit, baseline tag,
sibling worktree, dependency installation within the approved scope, local-only
version 2 implementation, localhost review surfaces, verification, and local
commits. It does not authorize a GitHub push, Vercel action, remote preview,
merge, or production change.

## Fresh-session continuation

A fresh session should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. Approved content, visual, asset, motion, and responsive specifications in the
   precedence order above
5. This plan
6. [`PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md`](./PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md)
7. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
8. `docs/REDESIGN-CURRENT-STATE.md` after implementation begins
9. `ANIMATION_PLAN_PROMPT.md` before motion or measured-section work
10. Relevant current source files

Then inspect Git status, confirm the active worktree and branch, identify the
current approval gate, and stop if Gate 1 has not been explicitly granted.
