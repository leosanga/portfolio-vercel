# Portfolio Version 2 QA, Visual Review, and Acceptance Plan

Status: Approved by Leo; Gate 1 local implementation and test execution authorized
Last updated: 2026-09-10
Owner: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Architecture: [`PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md`](./PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md)

## Purpose

This plan defines how the local redesign will be reviewed, tested, accepted,
and proven reversible before any GitHub push or Vercel action. It separates
technical correctness from design approval because a site can pass automated
checks and still feel generic, unfinished, or visually wrong.

The plan creates evidence for four distinct questions:

1. Does the redesign match the approved strategy and content?
2. Does it look and feel high-end across real viewports and input modes?
3. Does it remain accessible, fast, private, and technically reliable?
4. Can the current site be restored without rewriting history?

## Senior perspectives applied

- Senior QA engineer, for risk-based coverage, reproducible evidence, and defect
  severity.
- Senior debugging engineer, for isolating causes and distinguishing inherited
  failures from redesign regressions.
- High-end digital product designer, for composition, typography, motion feel,
  responsive art direction, and rejection of generic visual patterns.
- Senior UI/UX designer, for hierarchy, interaction clarity, touch behavior,
  and content comprehension.
- Senior accessibility engineer, for keyboard, screen reader, zoom, semantics,
  preference modes, and forced colors.
- Senior web performance engineer, for repeatable lab conditions, bundle and
  asset budgets, and interaction responsiveness.
- Senior conversion specialist, for CTA prominence, message continuity, and
  removal of competing actions.
- Senior security-minded and privacy-minded engineer, for outbound behavior,
  source-artifact exclusion, metadata, and third-party requests.
- Senior release engineer, for commit traceability, rollback rehearsal, and
  deployment gates.

## Acceptance authority

Automated checks can reject a build, but they cannot approve the visual design.
Leo provides final visual approval at Gate 2. Technical sign-off requires the
evidence in this plan. A local render, a Lighthouse score, or an absence of
console errors is not approval by itself.

## Test surfaces

### Side-by-side local environments

| Surface                      | Worktree                                          | URL                                         | Purpose                                                |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| Version 1 reference          | `portfolio-vercel`                                | `http://127.0.0.1:8080/`                    | Confirm current behavior and detect accidental change  |
| Version 2 review             | `portfolio-vercel-redesign`                       | `http://127.0.0.1:8081/redesign`            | Design, interaction, accessibility, and content review |
| Version 2 production preview | redesign worktree after local cutover preparation | local preview URL recorded in current state | Final bundle and metadata measurement                  |

Record command, process identifier, commit, browser version, viewport, device
pixel ratio where relevant, and cache state. Do not publish a remote preview to
perform QA.

### Required viewport matrix

| Class             |     Viewport | Primary risks                                         |
| ----------------- | -----------: | ----------------------------------------------------- |
| Wide desktop      | 1920 by 1080 | Excessive emptiness, weak max-width, stretched rules  |
| Design desktop    |  1440 by 900 | Intended composition and type hierarchy               |
| Common laptop     |  1366 by 768 | Short-height hero, sticky nav, project transition     |
| Compact laptop    |  1280 by 800 | Grid compression and line lengths                     |
| Landscape tablet  |  1024 by 768 | Hero rearrangement and navigation threshold           |
| Portrait tablet   |  834 by 1112 | Project rows, capability band, portrait crop          |
| Narrow tablet     |  768 by 1024 | Mobile transition boundary and disclosure width       |
| Large mobile      |   430 by 932 | Hero crop, mobile menu, CTA reachability              |
| Reference mobile  |   390 by 844 | Primary mobile art direction                          |
| Narrow mobile     |   360 by 800 | Wrapped labels and workflow reflow                    |
| Minimum supported |   320 by 568 | Horizontal overflow, focus clipping, content survival |

Also test representative portrait and landscape rotations, intermediate drag
resizing, 200 percent text resizing, and 400 percent browser zoom from a 1280
pixel viewport.

## Browser and input matrix

Required when available:

- Current stable Chrome on Windows.
- Current stable Edge on Windows.
- Current stable Firefox on Windows.
- Current stable Safari on macOS.
- Current stable Safari on iOS.
- Current stable Chrome on Android.

Input coverage:

- Keyboard only.
- Fine pointer with hover.
- Touch or emulated coarse pointer.
- Screen reader with NVDA and Chrome or Edge on Windows.
- Screen reader with Windows Narrator as the second local pass.
- VoiceOver and Safari when an Apple test surface is available.

Unavailable browser, device, or assistive-technology coverage must be recorded
as an explicit gap. It cannot be converted into a pass by inference.

## Evidence structure

At implementation start, `docs/REDESIGN-CURRENT-STATE.md` is the authoritative
live record. It should link to a dated QA evidence record for each formal review
round.

Recommended evidence record name:

`docs/qa/portfolio-v2-acceptance-YYYY-MM-DD.md`

Each record contains:

- Tested branch and commit.
- Local commands and URLs.
- Browser and viewport matrix.
- Screenshot index.
- Content and claim comparison.
- Keyboard and screen-reader findings.
- Preference-mode findings.
- Automated check results.
- Lighthouse run set and medians.
- JavaScript, CSS, font, image, and critical-transfer sizes.
- Console and network findings.
- Known baseline failures separated from new defects.
- Accepted limits with owner and rationale.
- Rollback point and rehearsal result.
- Leo's visual decisions from that round.
- Exact next action.

Keep bulk screenshots and traces outside Git by default. Commit only selected
evidence that materially supports a decision and does not contain private data.
Do not modify `.gitignore` merely to store temporary review output.

## Defect taxonomy

### Classification

- `Defect`: behavior or presentation violates an approved specification.
- `Decision`: two valid implementations require Leo's judgment.
- `Experiment`: a reversible visual alternative tested without changing the
  approved direction.
- `Baseline`: an issue already present in version 1 and not caused by version 2.
- `Coverage gap`: a required environment or method was unavailable.

### Severity

| Severity | Examples                                                                                                                                         | Release effect                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Blocking | Keyboard trap, missing content without JavaScript, unusable call link, horizontal overflow at 320 px, hydration failure, private asset committed | Stop review and release                                  |
| High     | Locked copy changed, focus obscured, wrong diagram order, reduced motion ignored, required browser failure, performance review ceiling exceeded  | Must fix before acceptance                               |
| Medium   | Intermediate breakpoint collision, inconsistent target size, visible layout shift, noncritical budget miss, weak empty state                     | Fix before release unless Leo accepts a documented limit |
| Low      | Minor optical spacing, subtle browser-specific polish, nonfunctional visual inconsistency                                                        | May remain only with an explicit follow-up decision      |

No Blocking or High defects may remain at Gate 2. A Medium defect needs an
explicit written acceptance with rationale, owner, and revisit trigger.

## Review gates

### Review 0: baseline and isolation

Purpose: prove the redesign is being built without changing version 1.

Checks:

- Original worktree branch, commit, and dirty status recorded.
- Baseline tag points to the intended production commit.
- Redesign worktree and branch are separate.
- Version 1 loads at port 8080.
- Version 2 preview loads at port 8081.
- `/` in both worktrees still renders version 1 at scaffold time.
- Only `src/routeTree.gen.ts` changes among existing source files during preview
  scaffolding.
- No Git remote action or Vercel action occurred.
- HEIC master and user-owned files are not staged.

Pass condition: isolation is demonstrable and rollback paths are recorded.

### Review 1: content and semantic skeleton

Purpose: validate the persuasion sequence and evidence before visual styling.

Checks:

- Section order is Navigation, Hero, Projects, Capabilities, My Approach,
  Conversation, Footer.
- Navigation labels and destinations match the approved specification.
- H1, role, hero support copy, CTA, conversation copy, metadata, and footer
  content match the approved wording.
- Featured project is first.
- Four current compact projects follow in the same Projects section.
- No Work, More Builds, availability, resume, GitHub, public NDA label, booking
  agent placeholder, service menu, or secondary hero CTA appears.
- The 8+ hours figure, 70 files figure, detailed workflow, and employer-derived
  constraints match their source strings.
- Headings and landmarks are sequential.
- Page remains understandable with CSS disabled and with JavaScript disabled.

Pass condition: content and reading order are complete, truthful, and approved.

### Review 2: visual system and desktop art direction

Purpose: decide whether Direction A reads as high-end rather than templated.

Inspect at 1440 by 900 first, then 1920 by 1080 and 1366 by 768.

Evaluation questions:

- Does the first screen communicate Leo's role, operating perspective, and call
  action without needing to scroll?
- Does the portrait feel integrated into the composition rather than placed in
  a generic profile card?
- Does the three-node system feel like Leo's identity rather than a share icon?
- Does the page feel calm at rest even with many designed motion moments?
- Is the project hierarchy evidence-led, with the feature clearly dominant?
- Do compact projects read as an editorial body of work rather than repeated
  SaaS cards?
- Do capabilities feel like a professional scope map rather than a skill grid?
- Does the final conversation section resolve the page into one next step?
- Do lavender, mist, sage, and the warm dark neutrals feel cohesive with the
  portrait?
- Are typography, line length, spacing, borders, and shadows consistent with the
  approved tokens?

Reject the review if it shows any of these generic signals:

- Gradient headline text.
- Neon or colored glow.
- Repeated pill clusters.
- Bento dashboard composition.
- Terminal or command-palette styling.
- A copied macOS-style dock or a dock that duplicates primary section
  navigation.
- AI chat or agent decoration.
- Repeated equal-weight cards.
- Decorative logo wall.
- Infinite background motion.
- Template-like availability badge.
- Excessive rounded containers around ordinary text.

Pass condition: Leo approves the visual direction at the design desktop and no
high-risk composition defect appears at the other desktop sizes.

### Review 3: responsive art direction

Purpose: prove each width is composed, not merely compressed.

Checks at every required viewport:

- No horizontal overflow.
- No clipped focus ring or text.
- Hero order, crop, and spacing match the approved breakpoint behavior.
- Headline wraps intentionally and never collides with the portrait or signal.
- Sticky navigation does not obscure headings or focused controls.
- Mobile menu has a 48 pixel row height, predictable focus, Escape close, and
  focus return.
- The call action remains clear without dominating every mobile state.
- Featured project disclosure remains understandable and touch-friendly.
- Workflow branches stack in a readable order.
- Project rows preserve labels, full copy, and metadata.
- Capability layout resolves to four, two, and one columns at the approved
  breakpoints without clipping or excessive vertical height.
- Approach progression remains legible without a tiny horizontal timeline.
- Final copy and CTA remain together.
- The utility dock clears content and the device safe area.
- Footer identity and copyright remain readable without duplicated contact
  links.
- No body or project copy is line-clamped.

Pass condition: all required viewports pass, and intermediate resizing reveals
no unresolved collision or abrupt broken state.

### Review 4: interaction and motion quality

Purpose: validate function, feel, interruption, and restraint.

Mechanical checks:

- No ID-bearing section transforms or transitions.
- No disclosure height or block-size animation.
- No `transition: all`.
- No infinite content animation.
- Active navigation indicator uses transform-based movement.
- Hero content exists before motion and remains visible when animation support
  is absent.
- Hero signal runs once after the headline becomes readable.
- Portrait response runs only for a fine pointer while the pointer is inside.
- Project response is local and does not make non-links appear clickable.
- Workflow playback repeats in discrete passes while open and visible, with a
  quiet resting interval between passes.
- Workflow playback pauses when the disclosure closes, leaves the viewport, the
  tab is hidden, or reduced motion is active.
- Approach and Conversation use one-shot activation and disconnect afterward.
- Reduced motion removes spatial travel and leaves complete content.
- Touch states do not depend on hover.
- Dock magnification runs only for a fine pointer without reduced motion,
  remains at or below 1.14 scale, and resets on pointer exit.
- Dock tooltips appear once on hover or keyboard focus without a duplicate
  native tooltip.
- Theme icon state transitions complete within 220 ms and remain interruptible.
- Fast repeated interactions cancel or reverse cleanly.
- Scrolling during any animation does not produce stale or misplaced state.

Feel checks:

- Motion clarifies hierarchy, route, state, or causality.
- The resting page is still.
- Duration and distance match the size and purpose of the element.
- Button feedback is immediate.
- The portrait never feels like a 3D gimmick.
- Signals feel like information moving through a system, not decorative
  particles.
- Several effects never compete in the same viewport.

Theme checks:

- First visit uses the light theme regardless of the operating-system theme.
- An explicit selection persists across reloads.
- Light and dark modes both meet contrast and focus requirements.
- The theme bootstrap does not hide or delay server-rendered content.
- The portrait retains its intended photographic treatment in light mode.

Pass condition: all mechanical checks pass and Leo approves motion feel on
desktop and mobile.

### Review 5: accessibility

#### Keyboard

- First Tab reveals `Skip to content`.
- Skip link lands before hero content and is not obscured.
- Tab order follows visual and DOM order.
- Every visible interactive element is reachable once.
- No decorative element receives focus.
- Mobile menu opens, closes, supports Escape, and returns focus.
- Native disclosures toggle with Enter and Space.
- Closing focused disclosure content first restores trigger focus.
- Focus remains visible against every approved surface.
- Same-tab Calendar navigation is represented accurately.
- No keyboard trap exists.

#### Screen reader

- Page title, name, role, H1, and support copy are announced in a useful order.
- Landmarks and headings allow rapid navigation.
- Navigation current state is meaningful after hydration.
- Closed project disclosure is understandable.
- Open state is announced.
- Workflow nodes read in intended row and branch order.
- Decorative lines and signals remain silent.
- Portrait alt choice does not duplicate adjacent visible identity excessively.
- Email and LinkedIn have distinct accessible names.
- New-tab expectation is announced only where it actually applies.

#### Preferences and reflow

- Reduced motion.
- Reduced transparency where supported.
- Increased contrast.
- Windows forced colors.
- 200 percent text size.
- 400 percent zoom.
- JavaScript disabled.
- Images blocked.
- CSS disabled for structure inspection.

Pass condition: no Blocking or High accessibility defect remains. Automated
results have been manually interpreted and both available Windows screen-reader
passes are recorded.

### Review 6: assets, metadata, privacy, and security

#### Portrait

- Correct orientation and sRGB output.
- No upscaling.
- Approved crop at each breakpoint.
- Face, hair, shoulders, and natural silhouette preserved.
- No system line crosses the face.
- No generative or heavy retouching.
- Intrinsic dimensions and accurate `sizes` present.
- Hero resource has high fetch priority and is not lazy-loaded.
- Mobile does not download the 1200 pixel source unnecessarily.
- File sizes remain within approved budgets.
- Public derivative metadata contains no location, camera, or private fields.

#### Identity and favicon

- Start node, trunk, branch, and two outputs are distinct at 16, 20, 24, and 32
  pixels.
- Mark is distinguishable from a generic share icon.
- Static favicon works on dark and light tab chrome.
- Apple touch icon remains within mask-safe area.
- Inline mark is decorative beside visible identity text.
- No animated favicon is present.

#### Metadata

- Approved title and description.
- Exactly one H1.
- No meta-keywords.
- Preview route is noindex and has no canonical production URL.
- Final route has verified canonical and absolute social image URL.
- Open Graph and Twitter image dimensions and alt text are correct.
- Structured data, if included, validates and contains only verified facts.

#### Privacy and security

- No HEIC master in Git or build output.
- No private EXIF, source path, client name, record ID, token, or confidential
  screenshot.
- No analytics, chat, session replay, advertising, tracking pixel, scheduler
  embed, or social widget request.
- Booking link uses HTTPS, no tracking query, and same-tab navigation.
- New-tab links use safe relationship attributes.
- Network waterfall contains no unexpected third-party request.

Pass condition: assets, metadata, and network behavior match the approved
specifications and no private source artifact is exposed.

### Review 7: performance and stability

Run against a local production build after the final route and stylesheet shape
are represented. Do not score the dual-stylesheet development preview as the
final payload.

Procedure:

1. Close unrelated heavy applications where practical and record the test
   machine context.
2. Use a cold cache and representative mobile CPU and network throttling.
3. Run Lighthouse at least three times per required profile.
4. Report the median, not the best score.
5. Repeat with a warm cache for diagnostic comparison.
6. Inspect the network waterfall, Coverage, Performance panel, and rendered
   layout shifts.
7. Profile fast scrolling, menu operation, portrait response, disclosure open,
   workflow playback, and repeated CTA focus.

Required outcomes:

- LCP at or below 2.2 seconds under the agreed representative mobile lab setup.
- INP or local interaction latency proxy at or below 150 milliseconds for
  portfolio interactions.
- CLS at or below 0.05 with zero avoidable shift.
- Total Blocking Time at or below 150 milliseconds.
- First Contentful Paint at or below 1.8 seconds.
- Speed Index at or below 3.0 seconds.
- No interaction task over 50 milliseconds caused by version 2 code.
- Initial JavaScript preferred at 150 KB and never above the 180 KB review
  ceiling without a new decision.
- Initial CSS preferred at 35 KB and never above 50 KB.
- Initially requested fonts preferred at 120 KB and never above 160 KB.
- Selected hero AVIF preferred at 180 KB and never above 240 KB.
- Navigation and hero SVG combined preferred at 10 KB and never above 16 KB.
- Initial document and critical assets preferred at 450 KB and never above 600
  KB.
- Third-party runtime JavaScript remains exactly zero.

Pass condition: all review ceilings pass and any preferred-target miss has a
specific explanation and optimization decision.

### Review 8: rollback and release readiness

- Start version 2 at the candidate commit.
- Start version 1 from the immutable baseline tag in a temporary worktree.
- Confirm version 1 installs, builds, and runs.
- Return to the version 2 candidate and confirm it still builds and runs.
- Confirm version 1 source files were not deleted to create version 2.
- Confirm the preview route is absent from the publication candidate.
- Confirm the cutover is one identifiable reversible commit.
- Confirm exact committed file manifest.
- Confirm HEIC and private artifacts are absent.
- Confirm no GitHub push or Vercel action occurred before approval.
- Document the exact `git revert` path for the cutover or merge commit.
- Document baseline-tag recovery as the independent second path.

Pass condition: rollback is demonstrated locally and both recovery methods are
documented before Gate 3.

## Content integrity procedure

Before every major visual approval and before cutover:

1. Read the current `src/components/portfolio/data.ts` from the preserved
   version 1 source.
2. Compare the featured problem string, the flow row containing 70 files, every
   detailed flow row, and every current hard-part or platform-constraint string
   against the values rendered by version 2.
3. Record exact match or approved transformation.
4. Treat any changed wording as a High defect unless Leo separately approved a
   copy change.
5. Confirm no additional employer or client fact was inferred.

Layout labels may change only where the content specification marks them as
approved or draft candidates. Evidence strings remain locked.

## Conversion review

Test the page as three visitor types without changing public wording:

### Hiring manager or department leader

- Role is clear before project detail.
- Project evidence demonstrates ownership and judgment.
- Capabilities make role breadth scannable.
- Schedule a Call remains the obvious next step.

### Technical interviewer

- Project structure exposes problem, implementation, constraint, and system
  flow.
- Technology appears as context rather than a logo inventory.
- Detailed workflow is accessible without visual-only interpretation.

### Founder or operator

- Language accommodates a systems problem without turning the site into an
  agency funnel.
- Final copy gives permission to explain current operations.
- No visitor-type selection is required before scheduling.

Reject any revision that adds a competing primary action, employment-status
message, broad services pitch, or visitor-classification form.

## Visual comparison method

For each formal visual round:

1. Capture version 1 and version 2 at the same viewport and browser zoom.
2. Compare the first screen, project transition, open featured disclosure,
   capability band, approach progression, final conversation, footer, and
   browser tab icon.
3. Review version 2 alone after comparison so the old design does not become the
   standard for the new one.
4. Record decisions in plain language, including what felt wrong and the
   approved correction.
5. Change one coherent visual hypothesis per batch.
6. Re-capture only affected views plus one regression-wide view.

Pixel identity across browsers is not the goal. Hierarchy, rhythm, typography,
color, interaction meaning, and content availability must remain equivalent.

## Automated checks and tooling recommendation

Required repository checks use existing tools:

```text
./node_modules/.bin/tsc.exe --noEmit
bun run lint
bun run build
bun run preview -- --host 127.0.0.1 --port <recorded-port> --strictPort
```

Use browser DevTools Lighthouse, Accessibility, Network, Coverage, and
Performance panels for the first implementation. Use free local automation for
repeatable screenshots and accessibility scanning only if the manual review
burden becomes material.

Recommended optional development-only tools:

- `@playwright/test` for repeatable browser, viewport, keyboard, and screenshot
  checks.
- `@axe-core/playwright` for automated accessibility defect discovery.

They are free and do not enter the production runtime bundle. Adding them would
modify `package.json` and `bun.lock`, so it requires a separate approval and
commit. They are not required to begin the visual prototype and a zero-issue
axe result would not replace manual accessibility review.

Do not add a paid visual-regression service or a cloud testing subscription
under this plan.

## Required search checks

Before final acceptance, search source and built output for:

- `target="_blank"` on Calendar links.
- Legacy CTA labels such as `Book a Call`.
- Availability or long-term-role language.
- Resume or GitHub navigation.
- Public NDA labels.
- `transition: all`.
- Infinite animation declarations.
- Animated height, max-height, grid rows, or block size on disclosures.
- Unversioned portrait or favicon references from version 2.
- Google Fonts network URLs in the final cutover.
- Analytics, chat, session replay, and tracking hosts.
- Client names, source paths, and forbidden private metadata.
- Duplicate section IDs.
- Preview `/redesign` route in the publication candidate.

Search results require human interpretation. A string match is a review input,
not an automatic verdict.

## Exit criteria for Gate 2

Leo may approve the finished localhost redesign when:

- He has reviewed the design at desktop and mobile sizes.
- He approves the hero, portrait crop, identity mark, project presentation,
  capability band, motion feel, final conversation, and browser tab icon.
- No Blocking or High defect remains.
- Medium defects are fixed or explicitly accepted with rationale.
- Locked content matches the source.
- Required local keyboard and Windows screen-reader passes are complete.
- Required responsive, preference, and no-JavaScript checks pass.
- Performance review ceilings pass in the representative final bundle.
- No private artifact or unexpected third-party request exists.
- Local commit and rollback points are recorded.

Gate 2 authorizes final local verification. It does not authorize a push.

## Exit criteria for Gate 3

Before Leo is asked to authorize a GitHub push:

- Complete Gate 2 evidence is linked from current state.
- Full branch diff and exact file manifest have been reviewed.
- Publication candidate contains no preview route.
- Rollback rehearsal passes.
- Baseline tag is verified.
- `origin/main` drift has been checked without changing local state.
- The repository's Vercel integration behavior for branch pushes has been
  confirmed.
- Leo understands whether a branch push would create a remote preview.

Gate 3 authorizes only the approved branch push and pull request. It does not
authorize merging.

## Exit criteria for Gate 4

Before production cutover:

- Pull request matches the locally approved candidate.
- Required checks remain valid against the exact merge candidate.
- Cutover and rollback commits are identified.
- Production metadata and canonical URL are correct.
- Leo explicitly approves the merge and resulting Vercel production action.

After cutover, perform a focused production smoke test without using production
as a design-review surface. If a Blocking defect appears, use the documented
revert path and bring repository history back into agreement with production.

## Decisions proposed for approval

1. Use the eight review gates and defect severity model in this plan.
2. Require Leo's subjective visual approval in addition to technical checks.
3. Keep bulk QA artifacts local and commit only decision-relevant evidence.
4. Use existing local browser tooling first.
5. Treat Playwright and axe integration as an optional, separately approved
   development-only addition if repeatability warrants it.
6. Require NVDA and Narrator locally and record unavailable Apple coverage as a
   gap.
7. Require the locked-content comparison at every major approval boundary.
8. Require median performance evidence from repeated production-preview runs.
9. Require a local rollback rehearsal before any GitHub push.
10. Keep GitHub publication and production cutover as separate approvals.

Approval of this plan and the frontend architecture plan completes the planning
specification set. It does not itself authorize Gate 1 implementation.

## Approval record

Leo approved this plan and explicitly authorized Gate 1 local implementation on
2026-09-10. Local test execution and evidence capture are authorized within the
approved worktree and localhost boundary. GitHub publication, Vercel actions,
remote preview creation, merging, and production changes remain unauthorized.

## Fresh-session continuation

A fresh QA or review session should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. The approved content, visual, asset, motion, and responsive specifications
5. [`PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md`](./PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md)
6. This plan
7. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
8. `docs/REDESIGN-CURRENT-STATE.md`
9. The QA evidence record linked from current state
10. Relevant source and generated build reports

Then inspect Git status, confirm the tested commit and local process ownership,
and run only the checks appropriate to the current review gate.
