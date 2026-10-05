# Case-study endings: bounded local execution

Date: 2026-10-04. Design/review owner: Codex. Accepting authority: Leo.
Authority: Leo accepted both the [continuation design](./CASE-STUDY-CONTINUATION-DESIGN.md)
and exact [Salesforce closing](./SALESFORCE-CLOSING-SECTION-DESIGN.md), then
instructed local implementation. This authorizes no commit, push or release.
Live status belongs to [current state](./REDESIGN-CURRENT-STATE.md).

Latest authority: Leo approved the [matched-pair design and exact supporting copy](./CASE-STUDY-CONTINUATION-DESIGN.md#matched-compact-paths-proposal-2026-10-04)
on 2026-10-04. The amendment below authorizes this local build and supersedes both
earlier next-control compositions. Rendered acceptance and release remain separate.

## Approved matched-pair execution amendment, 2026-10-04

Allocation: one bounded lower-model agent owns the shared card component, the
continuation component and the content/type changes listed below. Root owns
scoped CSS, documentation, source reconciliation, build and browser review.
Preserve all prior dirty files and Claude's separate catalog work.

1. Add `ProjectContinuationCardV2.tsx`: inputs `title`, `description`, `href` and
   `linkLabel`. Render a relative `pv2-continuation-card` div with an H2
   `__title`, paragraph `__description`, and one native anchor
   `pv2-featured-project__case-link pv2-continuation-card__link`. The anchor
   contains a label span and decorative SVG with the existing directional path.
   Use `useId` for title/action IDs; name the link from action then title through
   `aria-labelledby`. No button or nested link. CSS stretches this one link over
   the card and gives keyboard focus a clear card boundary.
2. Revise `CaseStudyContinuationV2.tsx`: keep the nav More projects and unchanged
   next-case helper. Add `pv2-case-continuation__choices` on the frame. Render
   the next card first with exact next-case title/path/summary and **Next case
   study**, followed by the catalog card using `PROJECTS_CONTEXT.catalog` verbatim.
   Do not use or change the homepage `ProjectCatalogEntryV2`. Preserve no-successor
   behavior: render just the catalog, spanning the frame.
3. Add optional `caseStudySummary` to `ProjectViewModel`; standard projects have
   no dedicated case route. Put the exact approved field in each dedicated project
   source object, not a parallel slug map:
   - Salesforce: **The system routes trial and demo requests using Salesforce records, with unclear matches held for review.**
   - HubSpot: **Testing uncovered assigned leads missing from response-time reports.**
   - Booking: **AI handles the booking conversation while tested code checks proposed actions before the calendar changes.**
4. Content registration in `content.ts` requires a nonblank summary for projects
   with a dedicated `/projects/` case path. Retain existing project-count/role
   assertions. The renderer must not silently omit or blank a next-case caption
   when it is missing; use clean narrowing or explicit error handling as needed.
   Do not change the sequence helper, route registration or homepage consumption.
5. Root replaces only the prior continuation control rules with shared card rules:
   two equal columns, 24px gap, matching raised surface/strong border/24px radius;
   24px padding, 24-28px titles, 16px body text; title/sentence/action stacked with
   desktop actions aligned at the bottom. Below 1024px: one column, 16px card gap,
   natural independent heights. Phone padding 20px, title 24px. Retain the outer
   nav separator/rhythm and the Salesforce closing rules. Card link target, visible
   focus, forced-color/reduced-motion rules and scroll clearance remain required.

Source ownership: agent may change only the new card component,
`CaseStudyContinuationV2.tsx`, `types.ts`, `content.ts`, `booking-agent.ts`,
`salesforce-trial-demo-routing.ts` and `hubspot-lead-routing.ts`. Root owns CSS.
Do not edit homepage catalog/component styles, page bodies, generated route tree,
catalog HTML, assets, shared header, dependencies or unrelated content.

Required checks: TypeScript, build, scoped LF-normalized lint and Git whitespace;
actual all-three endings on desktop/phone in both themes; 1024/1023 stacking
boundary, full-card native activation, descriptive names and next/catalog Tab
order, visible focus/dock clearance, actual cycle and Back. Confirm the accepted
homepage bar is preserved. Sequencing is unchanged, so no new test suite or
repeated helper fixtures. Report preference/device checks not actually exercised.
Root collects every result, records current state and leaves a local viewer for Leo.

## Scope and allocation

### Approved next-case control amendment, 2026-10-04

Leo approved the focused [control revision](./CASE-STUDY-CONTINUATION-DESIGN.md#next-case-control-review-amendment-2026-10-04)
with his instruction to build it for visual inspection. This amendment supersedes
the original full-row anchor and oversized next-title treatment in steps 4 and
Styles and review below. The prior closing, catalog extraction and sequence work
are already built; do not repeat or revise them.

One bounded lower-model agent owns only `CaseStudyContinuationV2.tsx`. Codex owns
scoped CSS, documentation, review and verification. Preserve all other dirty work.

Component contract:

- Keep the navigation landmark, frame, successor helper and catalog component.
- `pv2-case-continuation__next` becomes a plain row containing the exact data-sourced
  H2 destination title and one native anchor with `__link`.
- Put the visible **Next case study** label and decorative `__arrow` SVG inside
  that anchor. Remove the small eyebrow and detached arrow. Row/title space is
  ordinary context rather than an additional click target.
- Use React `useId` to provide stable unique title/label IDs. The anchor uses
  `aria-labelledby` in label-then-title order. Preserve the actual `href`, decorative
  SVG semantics, and next-link then catalog-link focus order.
- No new data, title shortening, route changes, dependency or additional controls.

Style contract:

- Desktop row: flexible title plus intrinsic control, 24px gap, vertically centered.
  Title 28-32px, weight 590 and line height 1.25, primary text. No previous title
  top margin or width cap that artificially forces short desktop lines.
- Phone row: one column, 16px gap, title 24px, action left aligned and intrinsic
  width. Switch below 768px. Titles wrap naturally with no clipping or fixed height.
- Anchor: inline flex, 48px minimum height, 18px horizontal padding, 12px existing
  control radius, 1px strong-line border, transparent resting background, primary
  text, 16px font and weight 600. Label and 16px arrow share a 12px gap.
- Hover: existing raised surface and mist border/color, without translation or
  autoplay. Preserve global keyboard focus; explicitly retain forced-color border
  and link text and remove color transitions for reduced motion.
- Give the new anchor a 7rem scroll margin at both block edges, matching the existing
  case-heading clearance. Local phone review found focus could otherwise place
  the control behind the persistent dock. This affects focus scrolling, not layout.
- Retain existing outer continuation spacing and 24px catalog gap. Do not change
  Salesforce closing, homepage, catalog bar or header styles.

Required checks: component review, TypeScript, production build, scoped lint and
whitespace; actual all-three endings at desktop and phone, both themes, focus
name/order/appearance, correct native navigation and Back, wrapping and dock
clearance. No new test suite. Preference checks not exercised remain explicit.
Record actual checks and pending rendered acceptance in current state.

One bounded implementation agent owns TypeScript/TSX and a focused sequence check;
Codex owns CSS, documentation, build/runtime verification and final reconciliation.
Preserve all prior dirty work. Do not edit catalog HTML, generated route tree,
shared header, signature proof, screenshots or unrelated copy.

## Application contract

1. Add a pure `src/content/portfolio-v2/project-navigation.ts` helper. Group
   homepage projects exactly as the renderer does: one lead, secondary cases,
   then standard projects. Derive eligible dedicated case order from those groups,
   including the lead and valid case-study paths. Validate unique IDs and paths.
   Compute the successor by position and wrap; no per-page next configuration.
   Zero or one eligible case has no next/self link; an unknown current case in a
   nonempty sequence must fail explicitly. Keep the existing current content
   count assertions; future case registration must review them separately.
2. Have `ProjectsV2.tsx` use the shared grouping helper with its existing project
   markup, numbering props, order and visible content preserved.
3. Extract `ProjectCatalogEntryV2.tsx` from the exact homepage bar. Keep its classes,
   copy, theme surface and full-bar link. Permit the catalog title to be an H2 in
   the case navigation while retaining its existing paragraph on the homepage.
   Keep placement spacing contextual rather than changing the homepage margins.
4. Add `CaseStudyContinuationV2.tsx`, accepting the current project slug. Render
   a `nav` named More projects using `pv2-case-continuation` and an inner
   `pv2-frame`. Its next-case link uses `pv2-case-continuation__next`, a paragraph
   label with `__label`, H2 title with `__title`, and decorative SVG arrow with
   `__arrow`. The entire next row is one link with no nested controls. After it,
   render the extracted catalog entry. Use actual data titles and routes.
5. Booking Agent and HubSpot: remove only the final call sections and unused call
   imports/close destructures, insert the shared continuation before `</main>`.
   Preserve their adaptability/rollout final chapters and the header call action.
6. Salesforce: replace `result` data with `closing.heading` and `closing.body`
   containing the approved two paragraphs verbatim. Replace only the old
   result/related-link block with `pv2-case-section pv2-salesforce-closing`, an
   inner frame/grid, H2 heading and paragraphs. Then insert shared continuation.
   Preserve Working now, operating limits and every earlier substantive section.

Mark each final substantive section with `pv2-case-closing`. The shared navigation
owns the single separator after it; the marker removes the chapter's duplicate
bottom border. This is structural identification, not proof of editorial quality.

## Styles and review

Reuse existing tokens. Closing: existing section rhythm and heading scale; title
left and two paragraphs right where readable, stacked below 1024px. Continuation:
fine top rule, large unboxed next title capped near 3rem, arrow at far right;
natural wrap and no narrow title column on phones. Start outer spacing 40-64px
and catalog gap 24px. Preserve homepage catalog margins; override spacing only
inside `.pv2-case-continuation`. No new reveal/autoplay animation or dependency.
Maintain existing focus treatment, forced-color visibility and dock clearance.

## Required checks

- Focused sequence checks: actual cycle; lead placed later in input still displays
  first; insertion/reorder; standard entries excluded; zero/one; unknown current;
  duplicate case IDs/paths. Exercise the shared helper used by the actual renderer.
- Local TypeScript, production build, scoped ESLint with known CRLF baseline
  separated, and Git whitespace. No broad repeated checks after successful scope.
- Real local app: all three endings desktop/narrow, both themes; exact Salesforce
  copy and retained Booking Agent/HubSpot final chapters; navigation destinations,
  wrap, destination top, browser Back, keyboard focus and dock clearance.
- Inspect actual homepage catalog bar after extraction for preservation. Keep
  catalog route integration and its local review bridge distinct.
- Record which preference/device/accessibility checks ran and which remain.
  Missing actual preference support is not a pass. Root reconciles every delegated
  result and leaves the local viewer available for Leo's visual acceptance.
