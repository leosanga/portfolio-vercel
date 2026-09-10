# Portfolio Version 2 QA Evidence, Reviews 1 to 3

Dates: 2026-09-10 to 2026-09-11

Status: Gate 1 implementation review in progress. This is not Gate 2 approval.

## Tested state

- Branch: `redesign/v2`
- Base planning commit: `a767ce7fc6a7cc684b7d6127d0cd11995f1804f9`
- Gate 1 implementation checkpoint: `a4d34c7728d6d35007da3873882a4b1ff62ffd44`
- Positioning and workflow revision checkpoint: `cf621e6`
- Project-label and conversation revision checkpoint: `0c21ec8`
- Adaptive-theme and utility-dock checkpoint: `e28481b`
- Transparent workflow favicon checkpoint: `492cdcb`
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

| Check                   | Result | Evidence                                                                                                                                                          |
| ----------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript              | Pass   | `tsc --noEmit` exited 0                                                                                                                                           |
| Version 2 lint          | Pass   | ESLint exited 0 for the new components, content, and route                                                                                                        |
| Version 2 formatting    | Pass   | Prettier check exited 0 for all new implementation paths                                                                                                          |
| Production build        | Pass   | `bun run build` exited 0                                                                                                                                          |
| Server-rendered content | Pass   | Approved H1, role, four capability headings, five `The hard part` labels, both locked figures, final CTA, calendar URL, and preview robots directive were present |
| Locked source integrity | Pass   | Original and redesign `data.ts` content matched after line-ending normalization; version 2 imports this source directly                                           |
| Motion guard search     | Pass   | No `transition: all`, infinite animation, stroke-dash animation, disclosure height animation, or ID-bearing section transform was found in version 2              |

The full repository lint command reports 5,930 existing problems, including
5,922 CRLF-related Prettier errors and 8 warnings across the version 1
repository. This is recorded as a baseline failure. The targeted version 2 lint
run passes with no findings.

## Bundle and asset evidence

- Scoped version 2 CSS in review 1: 33.85 KB raw, 6.77 KB gzip.
- Version 2 route JavaScript after review 2: 26.09 KB raw, 7.35 KB gzip.
- Scoped version 2 CSS after review 2: 38.29 KB raw, 7.40 KB gzip.
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
- Transparent browser favicon outputs exist at 16, 32, and 48 px. The 180 px
  Apple touch icon remains the previously approved platform-specific asset.
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

### Revision after Leo's first review

- `Systems Engineer: Integration + Automation` moved from the hero copy column
  to a semantic caption directly beneath the portrait. It replaces the
  decorative `01`, `Operations`, `Systems`, and `Reliability` labels.
- Project rows two through five now use `The hard part`. The same label is used
  across all five projects for consistent evidence framing.
- `AI + Intelligent Automation` is now a peer capability placed second in the
  scan order. It covers AI agents, LLM integration, MCP connectors,
  AI-assisted workflows, intelligent routing, lead enrichment, and
  human-in-the-loop workflows without implying model research or training.
- The four capabilities now form a two-by-two open rule matrix at desktop
  widths and retain the established stacked responsive treatment.
- The featured workflow now replays in discrete passes every 3.2 seconds while
  it is open and near the viewport. It pauses while closed, out of view, in a
  hidden tab, or under a reduced-motion preference.
- All project entries now use the uniform evidence labels `The problem`, `What I
built`, and `The hard part`.
- The final conversation now opens with `The best solutions start with` and
  presents its four supporting sentences as a compact vertical sequence.

### Revision after Leo's second review

- The four capabilities now use one four-column row on wide screens, two
  columns at medium widths, and one column on mobile. Technical terms remain
  visible as a compact index because they carry search and skim value.
- The final conversation retains its four-sentence sequence at a smaller body
  scale and tighter rhythm. The primary call action now holds more visual weight
  without changing the approved copy.
- A persistent utility dock provides Home, Email, LinkedIn, and a color-theme
  control. Home uses the approved three-node workflow mark. The footer no
  longer repeats Email and LinkedIn.
- The first visit follows the visitor's operating-system theme. A direct light
  or dark choice persists in local storage and is applied by an inline bootstrap
  before hydration.
- The dock uses pointer-proximity magnification capped at 1.14, 160 ms hover and
  tooltip responses, and a 220 ms theme-icon transition. Magnification is
  coalesced with `requestAnimationFrame` and disabled for reduced motion or
  coarse pointers.
- Reduced-transparency and forced-colors fallbacks include the dock surface.
- Direct anchor navigation now rechecks scroll state after first paint and on
  hash changes, keeping the sticky header legible after restoration.

### Review 2 browser evidence

- Chrome 152 rendered the four-column capability matrix in dark and light
  themes without layout shift.
- Theme control semantics updated from `Use light theme` to `Use dark theme`
  after activation, and the light preference survived same-origin navigation.
- The accessibility tree exposed a named `Utility navigation` landmark with
  Home, Email, LinkedIn, and theme controls in logical order.
- Exact Chrome device emulation at 390 by 844 reported `innerWidth: 390` and
  `scrollWidth: 390`. The capabilities stacked to one column and the dock stayed
  inside the viewport.
- A direct anchor-navigation timing defect in the sticky header was reproduced,
  corrected, and visually rechecked in the persisted light theme.

### Revision after Leo's third review

- The browser favicon now uses the same orthogonal three-node geometry as the
  Home and hero mark, without an enclosing tile or background.
- The static icon uses a muted lavender start node, mid-tone plum connectors,
  and muted blue output nodes. Plum keylines preserve node edges on pale browser
  chrome without requiring a theme-changing favicon.
- The SVG remains transparent and the route now references cache-busted version
  3 SVG and 32 px PNG assets. Live root favicon files remain unchanged.
- ImageMagick regenerated 16, 32, and 48 px transparent PNG fallbacks. All
  report exact dimensions and `srgba` channels.
- Enlarged pixel proofs on `#0F0E14` and `#F7F3F8` backgrounds kept the input,
  branch, and two outputs distinguishable. The 16 px native-size asset retained
  the three-node structure.

## Motion review

- Entrance motion is one-time and uses opacity plus a 10 px translation for
  copy and a 0.98 to 1 scale for the portrait.
- Navigation, CTA, project cue, approach route, and conversation responses use
  scoped transitions with explicit properties.
- Portrait depth is limited to 4 px translation and 1.25 degrees rotation,
  coalesced with `requestAnimationFrame`, and gated to fine pointers without a
  reduced-motion preference.
- Reduced-motion CSS removes entrance and signal playback, neutralizes
  transforms, and keeps content visible. JavaScript also suppresses replay
  scheduling when the preference is active.
- Motion feel requires Leo's live localhost review before acceptance.

## Coverage still required

- Remaining viewport matrix from 1920 by 1080 through 320 by 568. Exact 390 by
  844 coverage passed in review 2.
- Mobile menu operation, touch behavior, and portrait crop review on physical
  or touch-emulated mobile hardware.
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

Leo reviews the revised version 2 localhost surface, especially both color
themes, the persistent utility dock, the compact capability matrix, and the
conversation hierarchy, plus the transparent browser favicon. Leo then returns
one coherent revision batch. Gate 2 remains closed.
