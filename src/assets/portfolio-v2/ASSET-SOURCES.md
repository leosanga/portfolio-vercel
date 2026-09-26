# Portfolio Version 2 Asset Sources

## Portrait master

- Purpose: responsive homepage portrait and social-card source
- Original source filename: `portrait image.heic`
- Source SHA-256: `816CC222D5E933F7CE333CDAA6D5A3348D72A7486E800BCE161BC68072D0BBF7`
- Production tool: ImageMagick 7.1.2-30 Q16-HDRI x64
- Transformations: embedded orientation respected, art-directed crop,
  downscale, conservative output sharpening, sRGB conversion, and metadata
  removal
- Public outputs: versioned AVIF, WebP, and progressive JPEG files in
  `portrait/`
- License: owned portrait supplied by Leo Sanga
- Produced: 2026-09-10

The private source path and original HEIC are intentionally excluded from this
manifest and Git history.

## Instrument Sans

- Purpose: display, body, navigation, and controls
- File: `fonts/InstrumentSans-Variable.woff2`
- Source: `https://github.com/Instrument/instrument-sans`
- Source SHA-256: `AA72922AAFCC0DC18F36EC1D805B0212057DABE8B9D5B8B57F67035AEA1B826D`
- License: SIL Open Font License 1.1
- License file: `fonts/InstrumentSans-OFL.txt`
- Downloaded: 2026-09-10

## IBM Plex Mono

- Purpose: technical metadata and compact system labels
- File: `fonts/IBMPlexMono-Regular.woff2`
- Source: `https://github.com/IBM/plex`
- Source SHA-256: `BA204497F16B6D334CEE9D1E963A831B73E3A56E1D6300A8489D18DF7214B350`
- License: SIL Open Font License 1.1
- License file: `fonts/IBMPlexMono-OFL.txt`
- Downloaded: 2026-09-10

## Three-node identity

- Purpose: navigation identity, hero system motif, browser favicon, and future
  social composition
- Files: `brand/signal-mark-v2.svg` and versioned outputs under
  `public/portfolio-v2/icons/`
- Source: original geometry created for Leo's portfolio from the approved
  one-start, one-junction, two-output concept
- Production tools: hand-authored SVG and ImageMagick rasterization
- License: original portfolio asset owned by Leo Sanga
- Produced: 2026-09-10

## Social-sharing image

- Purpose: Open Graph and Twitter large-image preview
- File: `public/portfolio-v2/social/leo-sanga-portfolio-v2.jpg`
- Reproducible source: `scripts/portfolio-v2-social-card.html`
- Source assets: approved 4:5 portrait derivative, Instrument Sans, IBM Plex
  Mono, and the three-node identity
- Production tools: headless Chrome rendering and ImageMagick JPEG encoding
- Transformations: fixed 1200 by 630 composition, sRGB conversion, metadata
  removal, progressive encoding, and 4:2:0 chroma sampling
- License: original portfolio composition and owned portrait supplied by Leo
  Sanga
- Produced: 2026-09-11

## Booking agent case-study evidence

- Purpose: real-system evidence placed under the claims it proves on
  `/projects/n8n-booking-agent`
- Source repository: `n8n-booking-agent`, folder `docs/portfolio/`, captured
  2026-09-27 from Leo's own n8n instance for the demo business "Leo Demo Co".
  Screenshots at commit `196f442`, overview map at commit `61c146c`.
- Source privacy: every email address and the meeting link were blurred in the
  page before capture. Guest names are test guests.
- Production tool: ImageMagick 7.1.2-30 Q16-HDRI x64
- Transformation: lossless WebP (`webp:lossless=true`, method 6) with metadata
  stripped. Each output decodes pixel-identical to its source (ImageMagick
  compare, absolute error 0). No crop, resize, or retouching.
- The overview map is the source SVG copied byte for byte and inlined; the page
  recolors it for each theme through CSS, so its hash matches the source, and
  the source repository's `tests/portfolio-map.test.js` still vouches for its
  connections. The stage list in `booking-agent.ts` mirrors its titles.
- License: owned screenshots and diagram supplied by Leo Sanga
- Produced: 2026-09-27

| Output in `booking-agent/`             | Source in `docs/portfolio/`      | Size                     | Source SHA-256                                                     | Output SHA-256                                                     |
| -------------------------------------- | -------------------------------- | ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `workflow-ai-reply-check.webp`         | `canvas/02-ai-reply.png`         | 1817 x 528, 52,354 bytes | `dfe8f4d906c4b34b14560abe09b599a67b08347453aa78b08f22abb6b9184b0d` | `a17faac444910bcb3b79104970e448b84477ae524f912837517d26cd78cf4057` |
| `workflow-check-and-hold.webp`         | `canvas/05-check-and-hold.png`   | 1363 x 381, 33,820 bytes | `4e59586e50d638f548b3f572381889efb75724f7d95f9479def58bd21e81d807` | `388e5c3d4bfe2d663e3b1023c19e89b7553d2c0c5d1119645cc1b9868dfeb204` |
| `workflow-outside-bookings.webp`       | `canvas/03-outside-bookings.png` | 1363 x 968, 57,166 bytes | `212fe7192f91e6109bbeceafe8a15266b49badbeb43fc6c02711eed66d842da1` | `616261381d21f8560a9a6b3f8b63c5359cbcfee604674b888afddae9fc2afa55` |
| `workflow-notify.webp`                 | `canvas/13-notify.png`           | 1235 x 400, 23,368 bytes | `3bbc72938d563ca85b814d23cae94279c51258ba36f040cf31fa84b5ec5d1d94` | `e483d0f3453bf0925469c7d3ff62ffbc649b5e6ab3b42dc7f682395b7e77d486` |
| `alert-calendar-read-failed.webp`      | `alerts/calendar-slack.png`      | 1568 x 201, 16,120 bytes | `620b4fa3e94fa8e4d29de0aa9814f08a59f79aa3e63fc45013728f77be6eb1c1` | `b2553d02617b408336e793f801fb65ae8a1a7b1cb0355589816ba05564fa7d9c` |
| `alert-confirmation-email-failed.webp` | `alerts/email-failed-slack.png`  | 1262 x 387, 35,438 bytes | `d6c660628766702da0b42d863ed94d874c40049791b1f196b2acc631035e3723` | `22646da960145654a10c0b45a1c735ffe3e3aa9b08d54376d83e83927cd8261d` |
| `alert-config-problem.webp`            | `alerts/config-slack.png`        | 1568 x 160, 10,380 bytes | `738895d012b9828ee8c67dde2ca4d18cd133f0f792a5b0c16c9a9ef2ae35069d` | `0c29db2c933e66eac9d863c277c45fce6e3db66d902d3f501c33d8328632a120` |
| `workflow-overview-map.svg`            | `overview-map.svg`               | 1220 x 566 view box      | `029ce4eb90afee74555c36f1627c2664d51ccd6b6825453399ee9d53601880aa` | identical to source                                                |

If the booking workflow's canvas changes, these images describe the build at
the commits above. Recapture, re-encode, and update this table before the page
claims anything about the newer build.
