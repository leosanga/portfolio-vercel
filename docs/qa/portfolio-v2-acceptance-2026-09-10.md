# Portfolio Version 2 QA Evidence, Review 1

Date: 2026-09-10

Status: Gate 1 implementation review in progress. This is not Gate 2 approval.

## Tested state

- Branch: `redesign/v2`
- Base planning commit: `a767ce7fc6a7cc684b7d6127d0cd11995f1804f9`
- Gate 1 implementation checkpoint: `a4d34c7728d6d35007da3873882a4b1ff62ffd44`
- Version 1 baseline: `de93ea40bddbcf08cce6bb391bf6df1e5e0e6dd2`
- Version 1 baseline tag: `portfolio-v1-baseline-2026-09-10`
- Version 1 URL: `http://127.0.0.1:8080/`
- Version 1 process: PID 28532 at time of review
- Version 2 URL: `http://127.0.0.1:8081/redesign`
- Version 2 process: PID 94372 at time of review
- Browser: Google Chrome 152.0.7977.76 on Windows
- GitHub push: none
- Vercel action: none
- Production change: none

## Automated checks

| Check                   | Result | Evidence                                                                                                                                             |
| ----------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript              | Pass   | `tsc --noEmit` exited 0                                                                                                                              |
| Version 2 lint          | Pass   | ESLint exited 0 for the new components, content, and route                                                                                           |
| Version 2 formatting    | Pass   | Prettier check exited 0 for all new implementation paths                                                                                             |
| Production build        | Pass   | `bun run build` exited 0                                                                                                                             |
| Server-rendered content | Pass   | Approved H1, 8-hour figure, 70-file figure, final CTA, calendar URL, and `noindex, nofollow` were present in the HTML response                       |
| Locked source integrity | Pass   | Original and redesign `data.ts` content matched after line-ending normalization; version 2 imports this source directly                              |
| Motion guard search     | Pass   | No `transition: all`, infinite animation, stroke-dash animation, disclosure height animation, or ID-bearing section transform was found in version 2 |

The full repository lint command reports 5,930 existing problems, including
5,922 CRLF-related Prettier errors and 8 warnings across the version 1
repository. This is recorded as a baseline failure. The targeted version 2 lint
run passes with no findings.

## Bundle and asset evidence

- Scoped version 2 CSS: 33.92 KB raw, 6.77 KB gzip.
- Version 2 route JavaScript: 19.54 KB raw, 5.22 KB gzip.
- Instrument Sans and IBM Plex Mono total: 138,032 bytes. This is below the
  160 KB ceiling and above the 120 KB preferred target.
- Portrait derivatives cover AVIF, WebP, and progressive JPEG at the approved
  4:5, 3:4, and 4:3 art directions.
- Largest AVIF: 80,941 bytes.
- Largest WebP: 119,940 bytes.
- JPEG fallback: 248,582 bytes.
- All checked portrait derivatives report sRGB and expected dimensions.
- The original HEIC and private source path are absent from the redesign
  worktree and public asset manifest.
- Favicon outputs exist at 16, 32, 48, and 180 px. The 180 px PNG is 6,534
  bytes.
- The social card is intentionally pending Leo's crop and mark approval.

## Visual and semantic findings

### Passed in the first Chrome desktop inspection

- Version 1 remains visually available and unchanged on its own port.
- Version 2 uses the approved headline, support copy, one-call CTA, portrait,
  palette, and primary information hierarchy.
- The redesigned hero is visibly distinct from version 1 and no longer relies
  on the generic glowing-card and neon-grid treatment.
- Navigation, main content, sections, headings, project articles, native
  workflow disclosure, lists, image alternative text, CTA links, and footer are
  represented in the Chrome accessibility tree in logical order.
- The redesigned identity now uses one input, an orthogonal branch, and two
  rounded-square outputs. This reduced the earlier resemblance to a share icon.

### Defects corrected during this review

- Hero copy initially flowed into a second CSS Grid row because it overlapped
  the portrait columns without an explicit row assignment. Setting both hero
  layers to row 1 restored the intended editorial overlap and kept all content
  visible.
- Desktop navigation links were initially nested in a closed disclosure. The
  navigation now uses one semantic link set with a dedicated mobile menu
  control, so desktop links remain visible.
- Workflow playback initially relied on stroke-dash animation. It now uses
  transform and opacity on small signal circles over static connectors.

## Motion review

- Entrance motion is one-time and uses opacity plus a 10 px translation for
  copy and a 0.98 to 1 scale for the portrait.
- Navigation, CTA, project cue, approach route, and conversation responses use
  scoped transitions with explicit properties.
- Portrait depth is limited to 4 px translation and 1.25 degrees rotation,
  coalesced with `requestAnimationFrame`, and gated to fine pointers without a
  reduced-motion preference.
- Reduced-motion CSS removes entrance and signal playback, neutralizes
  transforms, and keeps content visible.
- Motion feel requires Leo's live localhost review before acceptance.

## Coverage still required

- Exact viewport matrix from 1920 by 1080 through 320 by 568.
- Mobile menu operation, touch behavior, and portrait crop review on mobile.
- Keyboard-only navigation, disclosure operation, focus order, and Escape
  behavior.
- Browser preference toggles for reduced motion, reduced transparency, forced
  colors, and increased contrast.
- NVDA and Windows Narrator passes.
- Edge, Firefox, Safari, iOS Safari, and Android Chrome. Only Chrome was exposed
  to the available browser review surface in this round.
- 200 percent text size and 400 percent browser zoom.
- Production Lighthouse runs and median performance measurements.
- Console and network request audit.
- Workflow connector inspection while open at desktop and mobile widths.
- Social image production and metadata review after visual asset approval.

## Review decisions required from Leo

1. Approve or revise the 4:5 desktop portrait crop and 4:3 mobile art direction.
2. Approve or revise the orthogonal three-node workflow mark and browser icon.
3. Approve or revise the desktop hierarchy, typography, spacing, and palette.
4. Judge whether the entrance, navigation, signal, and portrait motion feel
   premium and restrained in the live preview.

## Exact next action

Create the first local implementation checkpoint. Leo then compares both local
URLs and returns one coherent revision batch. Gate 2 remains closed.
