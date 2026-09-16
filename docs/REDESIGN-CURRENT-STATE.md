# Portfolio Redesign Current State

Last updated: 2026-09-11

## Current phase

Gate 4 is complete. Pull request 1 was merged through merge commit `b0bbd04`,
and Vercel successfully deployed that commit to production. The canonical site
at `https://leosanga.vercel.app/` now serves portfolio version 2.

## Repository state

- Original worktree: `C:\Users\Leo\Downloads\projects\portfolio-vercel`
- Original branch: `main`
- Redesign worktree: `C:\Users\Leo\Downloads\projects\portfolio-vercel-redesign`
- Redesign branch: `redesign/v2`
- Planning commit: `a767ce7fc6a7cc684b7d6127d0cd11995f1804f9`
- Gate 1 implementation checkpoint: `a4d34c7728d6d35007da3873882a4b1ff62ffd44`
- Positioning and workflow revision checkpoint: `cf621e6`
- Project-label and conversation revision checkpoint: `0c21ec8`
- Adaptive-theme and utility-dock checkpoint: `e28481b`
- Transparent workflow favicon checkpoint: `492cdcb`
- Light-default, social-card, and QA checkpoint: `6e35760`
- Final visual approval checkpoint: `6368990`
- Reversible homepage cutover checkpoint: `5240bfc`
- Version 1 baseline commit: `de93ea40bddbcf08cce6bb391bf6df1e5e0e6dd2`
- Version 1 baseline tag: `portfolio-v1-baseline-2026-09-10`
- GitHub branch: `redesign/v2` published
- Gate 3 implementation and evidence checkpoint: `85bdd2d`
- Pull request: `https://github.com/leosanga/portfolio-vercel/pull/1`
- Pull request state: merged
- Application cutover merge commit: `b0bbd04cd567711dd6562083ef6f8c4830db0cbd`
- Vercel Preview:
  `https://leosanga-hd7gwe7tp-leo-c2f6.vercel.app`
- Application cutover Vercel deployment: `6385275062`
- Deployment URL: `https://leosanga-po6wvj3jq-leo-c2f6.vercel.app`
- Canonical production URL: `https://leosanga.vercel.app/`

## Local review surfaces

- Version 1 reference: `http://127.0.0.1:8080/`
- Version 2 development surface: `http://127.0.0.1:8081/`
- Version 2 production candidate: `http://127.0.0.1:8082/`

Process identifiers are recorded when the servers are started. Do not stop a
port broadly.

## Latest approval

Leo approved the frontend architecture and QA plans and explicitly authorized
Gate 1 local implementation on 2026-09-10. This permits local file changes,
asset production, verification, localhost review, and local commits within the
approved redesign worktree.

On 2026-09-11, Leo approved the requested light-default behavior and the final
social-sharing image. Leo then completed the Windows screen-reader check and
confirmed that it passed without problems. Gate 2 is complete, and Leo
authorized local Gate 3 preparation.

Leo explicitly authorized Gate 3 on 2026-09-11: push `redesign/v2` and open the
pull request. The branch and pull request are now published. This approval does
not authorize merging or production cutover.

After reviewing the Gate 4 instructions, Leo approved the production cutover on
2026-09-11. Pull request 1 was merged with a merge commit as required by the
rollback plan, and the resulting Vercel production deployment completed
successfully.

## Current implementation state

- Approved planning artifacts committed locally.
- Immutable version 1 baseline tag created locally.
- Sibling worktree and `redesign/v2` branch created.
- Existing dependencies installed from the locked dependency graph.
- ImageMagick confirmed with HEIC, AVIF, WebP, JPEG, and color-profile support.
- Approved free font sources downloaded from their official repositories.
- Version 2 portrait derivatives were produced from the read-only HEIC master
  under new filenames. The master remains outside the redesign worktree.
- The production candidate serves the approved version 2 composition at `/`.
  The private `/redesign` route has been removed and returns 404.
- The featured project uses native disclosure semantics, semantic workflow
  nodes, and a decorative connector layer.
- The scoped visual system, responsive art direction, one-time entrance
  choreography, scroll-aware navigation, portrait depth, and interaction
  feedback are implemented without a new motion dependency.
- The approved role line, `Systems Engineer: Integration + Automation`, now
  appears directly below the portrait in place of the decorative four-part
  caption.
- Capabilities now use a compact four-column matrix on wide screens, two
  columns at medium widths, and one column on mobile. `AI + Intelligent
Automation` is a distinct second capability so it is visible to skim readers
  without replacing the primary Systems Integration + Automation identity.
- Every project evidence row now uses `The hard part` rather than `Constraint`.
- Project evidence labels now use the uniform sequence `The problem`, `What I
built`, and `The hard part`.
- The final conversation opens with `The best solutions start with` and renders
  each supporting sentence as a separate stacked paragraph for faster scanning.
  Its supporting type is smaller and more compact so the call action holds the
  correct visual weight.
- A persistent utility dock now provides Home, Email, LinkedIn, and theme
  controls. Home uses the approved three-node identity mark. Pointer proximity
  magnification is capped at 1.14 and is disabled for coarse pointers and
  reduced-motion preferences.
- First visits use the light theme. An explicit light or dark selection is
  stored locally and restored before the page hydrates. Both themes share the
  approved lavender-led visual system.
- The footer now closes with identity and copyright only. Email and LinkedIn
  are available from the persistent dock without competing with the call CTA.
- Scrolled navigation state is remeasured after first paint and on hash changes,
  preventing the fixed header from losing its surface after direct anchor
  navigation.
- The expanded featured-project workflow replays in discrete passes with a
  3.2-second cadence. Replay pauses when the disclosure is closed, the diagram
  is outside the viewport, the tab is hidden, or reduced motion is requested.
- The three-node identity was refined from curved circular geometry to an
  orthogonal rounded-square workflow mark after the first small-size review.
- Final metadata uses the verified `https://leosanga.vercel.app/` canonical,
  an absolute social-image URL, the approved title and description, and the
  version 2 favicon family. The final route has no preview robots directive.
- The root shell now uses the version 2 stylesheet and self-hosted fonts. The
  version 1 Google Fonts request and shared stylesheet are absent from the
  candidate bundle. The 404 and error states use the same accessible visual
  system.
- The approved social-sharing composition is now available as a 1200 by 630,
  78,042-byte sRGB JPEG. Its reproducible HTML source, asset provenance, local
  Open Graph metadata, and Twitter metadata are included.
- The local browser QA harness covers the complete 11-viewport matrix, default
  and persisted themes, keyboard order, mobile-menu Escape handling, workflow
  disclosure, 200 percent text sizing, preference modes, forced colors,
  no-JavaScript rendering, console errors, and network hosts.
- First integrated QA evidence:
  [`qa/portfolio-v2-acceptance-2026-09-10.md`](./qa/portfolio-v2-acceptance-2026-09-10.md)
- Gate 3 release review and exact branch manifest:
  [`qa/portfolio-v2-gate3-release-review-2026-09-11.md`](./qa/portfolio-v2-gate3-release-review-2026-09-11.md)
- Gate 4 production release evidence:
  [`qa/portfolio-v2-gate4-production-release-2026-09-11.md`](./qa/portfolio-v2-gate4-production-release-2026-09-11.md)

## Open review items

- Firefox, Apple Safari, VoiceOver, iOS Safari, and Android Chrome remain
  unverified because those test surfaces were unavailable. Chrome and Edge
  coverage passed before release.
- An unrelated local edit to `HANDOFF.md` remains unstaged in the redesign
  worktree. It was not included in the pull request or production release.

## Booking-agent case study

Leo approved and Codex completed the local first-release implementation for the
n8n Booking Agent case study on 2026-09-15. The evidence matrix, publication
gates, approved copy, homepage role, dedicated-route structure, media strategy,
and brand requirements are recorded in
[`N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md`](./N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md).

The homepage now has six projects with `AI Booking Agent (n8n)` as the only
featured project. `/projects/n8n-booking-agent` contains the approved text-led
case study, scroll-led architecture handoff, four proof chapters, architecture
evolution, adaptability section, and final scheduling action. It intentionally
has no Loom, screenshot placeholder, public agent, or new dependency. The
previous featured project remains second and keeps its workflow disclosure.

The featured booking-agent card now includes a focused failure-safe outcome
record. It shows a valid request, a passed rule check, a failed booking-calendar
connection, a released temporary hold, a booking that remains unconfirmed, and a
team alert. Its lead statement is `When the booking calendar fails, the agent
stops before it sends a false confirmation.` The record repeats on a calm
6.5-second cadence while visible and pauses when it is offscreen, the tab is
hidden, or reduced motion is requested. It does not call the live workflow or
depend on a third-party asset.

The case-study architecture section now answers `Who controls the booking` with
one persistent system. Its four scroll chapters show direct AI control, the AI
becoming a proposer, tested rules taking authority, and only a verified action
reaching the connected system. A viewport-center resolver replaces the prior
ratio-based intersection thresholds so ordinary scrolling does not skip the
tested-validation chapter. Completed chapters stay legible while the current
chapter receives the strongest emphasis.

Tablet, mobile, reduced-motion, and no-JavaScript use a static before-and-after
comparison instead of depending on the scroll sequence. Tablet keeps the two
systems side by side; mobile stacks them. Desktop, 768 px, 390 px, and 320 px were
checked on 2026-09-16. The 320 px layout has no horizontal overflow. The
case-study metadata label remains `TECH STACK`, and the homepage link remains
`See how the safeguards work`.

The reusable reasoning that produced the homepage outcome record is documented
in the case-study specification under `How the homepage visual direction was
selected`.

The former `Current scope` section has been replaced by `Designed to adapt
without rebuilding the core`. It now closes the evidence narrative with calendar
and meeting-provider replaceability, centralized business rules, and deliberate
human escalation. Private-demo logistics and unfinished deployment controls no
longer interrupt the path into the final call to action.

Local build, TypeScript, targeted lint, formatting, desktop Chrome, dark-theme,
320 through 1440 px responsive checks passed. The proof stays static and complete
without JavaScript or motion, pauses offscreen, and keeps Project 2's disclosure
unchanged. There is no horizontal overflow and no new browser-console issue. The
existing theme-bootstrap hydration warning remains a known baseline. Publication
was approved on 2026-09-16 for the canonical production site. Later media
additions are not yet approved.

## Checks last run

- TypeScript: passed.
- Targeted version 2 ESLint: passed.
- Version 2 Prettier check: passed.
- Production build: passed.
- Server-rendered content presence: passed for the approved H1, role line, four
  capability headings, all five `The hard part` labels, both locked figures,
  final CTA, calendar destination, theme bootstrap, canonical, and social
  metadata.
- Locked source comparison: passed after line-ending normalization. Version 2
  imports the current project and workflow evidence rather than duplicating it.
- Chrome 152 and Microsoft Edge passed all 11 required viewports from 1920 by
  1080 through 320 by 568 with zero horizontal-overflow failures and zero hero
  CTA to utility-dock overlaps.
- Default-theme testing passed while the emulated operating system requested
  dark: the first visit remained light. An explicit dark selection persisted
  across reload.
- Keyboard order, mobile-menu Escape and focus return, native workflow
  disclosure, 200 percent text sizing, reduced motion, reduced transparency,
  increased contrast, forced colors, and no-JavaScript rendering passed.
- Chrome and Edge candidate audits reported zero console errors and zero
  third-party requests.
- Three-run production-candidate Lighthouse medians passed every approved
  ceiling. Desktop scored 100 performance with 422 ms FCP, 548 ms LCP, 422 ms
  Speed Index, 0 ms TBT, and 0 CLS. Mobile scored 98 performance with 1,471 ms
  FCP, 2,181 ms LCP, 1,471 ms Speed Index, 0 ms TBT, and 0 CLS.
- Lighthouse accessibility, best practices, and SEO scored 100 on desktop and
  mobile.
- Final metadata inspection passed: root 200, `/redesign` 404, one verified
  canonical, absolute social image metadata, no robots block, and no Google
  Fonts request.
- Build privacy scans found no HEIC filename, confidential company name,
  private source path, common secret assignment, legacy font reference, or
  preview-route reference.
- Rollback rehearsal passed. A fresh detached worktree at baseline tag
  `portfolio-v1-baseline-2026-09-10` installed, built, served, and returned the
  version 1 homepage. The temporary rehearsal worktree was then removed.
- Pull request 1 merged cleanly, and the application changes entered `main`
  through merge commit `b0bbd04`.
- Vercel recorded production deployment `6385275062` for the merge commit and
  marked it successful.
- The remote Vercel Preview returns 200, serves the correct title and canonical,
  contains no Google Fonts request, serves the social image at 200, returns 404
  for `/redesign`, and includes Vercel's `X-Robots-Tag: noindex` response header.
- The canonical production homepage returns 200 without a preview noindex
  header. `/redesign` returns 404. The production social image returns 200 as a
  78,042-byte JPEG. The live title, canonical, Open Graph image, and Twitter
  image metadata match the approved release.
- Social image inspection: passed at 1200 by 630, sRGB, and 78,042 bytes.
- Favicon SVG and 16, 32, and 48 px PNG fallbacks: passed for transparent alpha,
  expected dimensions, three-node legibility, and light/dark background proofs.
- Full-repository ESLint remains a known baseline failure dominated by existing
  CRLF formatting errors. Targeted version 2 files introduce no lint errors.
- A sandboxed build attempt could not spawn Vite's Windows native dependency.
  The same final build passed outside the restricted sandbox with the normal
  project command. This was tooling isolation, not an application failure.

## Exact next action

Verify the canonical production homepage and booking-agent case study after the
approved deployment. Later, create a reusable case-study design reference that
captures structure, audience, value, visualizations, motion, experience, and the
decision process behind this release. Keep the baseline tag and `redesign/v2`
branch intact, and never rewrite `main` history.

## Required read order

1. Repository `AGENTS.md` when present, otherwise repository `CLAUDE.md`
2. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
3. Approved content, visual, asset, motion, and responsive specifications
4. [`PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md`](./PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md)
5. [`PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md`](./PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md)
6. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
7. This file
8. [`qa/portfolio-v2-gate3-release-review-2026-09-11.md`](./qa/portfolio-v2-gate3-release-review-2026-09-11.md)
9. `ANIMATION_PLAN_PROMPT.md` before motion or measured-section work
10. Relevant source files
