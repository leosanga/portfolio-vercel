# Portfolio Version 2 Gate 3 Release Review

Date: 2026-09-11

Status: Local publication candidate verified. GitHub push approval is pending.

## Release boundary

- Base production commit: `de93ea40bddbcf08cce6bb391bf6df1e5e0e6dd2`
- Immutable baseline tag: `portfolio-v1-baseline-2026-09-10`
- Redesign branch: `redesign/v2`
- Reversible homepage cutover commit: `5240bfc`
- Canonical URL: `https://leosanga.vercel.app/`
- GitHub push: none
- Vercel Preview: none for this branch
- Production change: none

The cutover commit changes the existing homepage route, root shell, and
generated route tree. It removes the private preview route and makes version 2
the local `/` page. Version 1 components, data, stylesheet, assets, and Git
history remain in the repository.

## Gate 2 completion

Leo approved the visual result, requested light-default behavior, social image,
and final local composition. Leo then completed the Windows screen-reader check
and reported no problems. Gate 2 passed on 2026-09-11.

## Publication-candidate results

- TypeScript, targeted ESLint, Prettier, and the production build pass.
- Chrome and Edge pass all 11 required viewports with no horizontal overflow or
  hero-call and dock overlap.
- Keyboard order, mobile-menu Escape behavior, workflow disclosure, 200 percent
  text size, light-default behavior, theme persistence, reduced motion, reduced
  transparency, increased contrast, forced colors, and no-JavaScript rendering
  pass.
- Browser checks report no console errors and no third-party requests.
- Root metadata returns the approved title, one canonical URL, absolute Open
  Graph and Twitter image URLs, and no preview robots directive.
- `/redesign` returns 404 and uses the version 2 system-state presentation.
- The production bundle contains no Google Fonts request, legacy font name,
  private preview route, HEIC source filename, private local path, confidential
  company name, or common secret assignment.
- Locked project data matches the original worktree after line-ending
  normalization.
- Social image validation passes at 1200 by 630, sRGB, and 78,042 bytes.

### Lighthouse medians

| Profile | Performance | Accessibility | Best practices | SEO | FCP      | LCP      | Speed Index | TBT  | CLS |
| ------- | ----------- | ------------- | -------------- | --- | -------- | -------- | ----------- | ---- | --- |
| Desktop | 100         | 100           | 100            | 100 | 422 ms   | 548 ms   | 422 ms      | 0 ms | 0   |
| Mobile  | 98          | 100           | 100            | 100 | 1,471 ms | 2,181 ms | 1,471 ms    | 0 ms | 0   |

All approved performance ceilings pass. Lighthouse produced six valid reports.
Its Windows launcher reported `EPERM` while deleting its own temporary folders,
but report generation and scores completed.

## Rollback proof

A fresh detached worktree was created from
`portfolio-v1-baseline-2026-09-10`. It installed from the lockfile, built,
served on localhost, and returned the original version 1 homepage. The verified
temporary worktree was then removed.

Local rollback before push:

```text
git revert 5240bfc
```

This restores the version 1 root route and private version 2 preview topology
without deleting redesign history. Do not use `git reset --hard`.

After a future merge, prefer reverting the merge commit on `main`. The immutable
baseline tag remains the independent recovery source if a dedicated recovery
branch is required.

## Remote-state check

A read-only check found `origin/main` still at `de93ea4`, so the production base
has not drifted. GitHub deployment history contains Vercel Preview and
Production records. A push of `redesign/v2` must therefore be treated as likely
to create a Vercel Preview deployment.

Gate 3 approval would authorize only the reviewed branch push and pull request.
It would not authorize merging into `main` or changing production.

## Known limits

- Firefox, Apple Safari, VoiceOver, iOS Safari, and Android Chrome were not
  available in the current tool environment. Chrome and Edge passed.
- The absolute social-image URL will resolve only after the new asset exists on
  a remote deployment. The local candidate path and metadata pass.
- Full-repository lint retains the documented version 1 CRLF baseline failures.
  Targeted changed-file lint passes.

## Exact branch manifest

This is the expected `origin/main...redesign/v2` file set after the Gate 3
evidence commit.

```text
A  animation-plans/000-MOTION-INTERACTION-SPEC.md
A  animation-plans/001-establish-motion-foundation.md
A  animation-plans/002-build-navigation-continuity.md
A  animation-plans/003-build-hero-choreography.md
A  animation-plans/004-build-portrait-depth.md
A  animation-plans/005-build-project-response.md
A  animation-plans/006-build-workflow-playback.md
A  animation-plans/007-build-approach-and-conversation-motion.md
A  animation-plans/README.md
A  docs/PORTFOLIO-ASSET-IMAGERY-SPEC.md
A  docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md
A  docs/PORTFOLIO-FRONTEND-ARCHITECTURE-IMPLEMENTATION-PLAN.md
A  docs/PORTFOLIO-QA-VISUAL-ACCEPTANCE-PLAN.md
A  docs/PORTFOLIO-REDESIGN-ANALYSIS.md
A  docs/PORTFOLIO-REFERENCE-MOTION-RESEARCH.md
A  docs/PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md
A  docs/PORTFOLIO-VISUAL-INTERFACE-SPEC.md
A  docs/PROJECT-GOAL.md
A  docs/REDESIGN-CURRENT-STATE.md
A  docs/REDESIGN-WORKFLOW-ROLLBACK-PLAN.md
A  docs/qa/portfolio-v2-acceptance-2026-09-10.md
A  docs/qa/portfolio-v2-gate2-built-state-2026-09-11.md
A  docs/qa/portfolio-v2-gate3-release-review-2026-09-11.md
A  public/portfolio-v2/icons/apple-touch-icon-v2.png
A  public/portfolio-v2/icons/favicon-v2-16.png
A  public/portfolio-v2/icons/favicon-v2-32.png
A  public/portfolio-v2/icons/favicon-v2-48.png
A  public/portfolio-v2/icons/favicon-v2.svg
A  public/portfolio-v2/social/leo-sanga-portfolio-v2.jpg
A  scripts/portfolio-v2-browser-qa.mjs
A  scripts/portfolio-v2-social-card.html
A  src/assets/portfolio-v2/ASSET-SOURCES.md
A  src/assets/portfolio-v2/brand/signal-mark-v2.svg
A  src/assets/portfolio-v2/fonts/IBMPlexMono-OFL.txt
A  src/assets/portfolio-v2/fonts/IBMPlexMono-Regular.woff2
A  src/assets/portfolio-v2/fonts/InstrumentSans-OFL.txt
A  src/assets/portfolio-v2/fonts/InstrumentSans-Variable.woff2
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-640.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-640.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-960.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-3x4-960.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-480.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-480.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-768.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x3-768.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-1200.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-1200.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-640.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-640.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-960.avif
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-4x5-960.webp
A  src/assets/portfolio-v2/portrait/leo-sanga-hero-fallback.jpg
A  src/components/portfolio-v2/ApproachV2.tsx
A  src/components/portfolio-v2/CapabilitiesV2.tsx
A  src/components/portfolio-v2/ConversationV2.tsx
A  src/components/portfolio-v2/FeaturedProjectV2.tsx
A  src/components/portfolio-v2/FooterV2.tsx
A  src/components/portfolio-v2/HeroSignalV2.tsx
A  src/components/portfolio-v2/HeroV2.tsx
A  src/components/portfolio-v2/PortfolioNavV2.tsx
A  src/components/portfolio-v2/PortfolioUtilityDockV2.tsx
A  src/components/portfolio-v2/PortfolioV2Page.tsx
A  src/components/portfolio-v2/PortraitV2.tsx
A  src/components/portfolio-v2/PrimaryCallLinkV2.tsx
A  src/components/portfolio-v2/ProjectRowV2.tsx
A  src/components/portfolio-v2/ProjectsV2.tsx
A  src/components/portfolio-v2/SignalMarkV2.tsx
A  src/components/portfolio-v2/WorkflowDiagramV2.tsx
A  src/components/portfolio-v2/WorkflowDisclosureV2.tsx
A  src/components/portfolio-v2/useActiveSectionV2.ts
A  src/components/portfolio-v2/usePortfolioThemeV2.ts
A  src/components/portfolio-v2/usePortfolioV2Motion.ts
A  src/components/portfolio-v2/usePortraitDepth.ts
A  src/content/portfolio-v2/content.ts
A  src/content/portfolio-v2/types.ts
M  src/routes/__root.tsx
M  src/routes/index.tsx
A  src/styles/portfolio-v2.css
```

No version 1 component, content, stylesheet, or asset is deleted by this branch.
