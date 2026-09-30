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

## HubSpot case-study evidence

- Purpose: owned native-system evidence for the HubSpot lead-routing case study
- Source captures: `Routing Workflow.png`, `SLA Watch.png`, and
  `RevOps Pipeline Health.png`
- Source captured: 2026-09-22 from Leo Sanga's HubSpot developer sandbox
  account using test data rather than customer data
- Source SHA-256:
  - `Routing Workflow.png`:
    `BF18D8ABDC36551577E0455013B69D8D5D2539E4AD0112135874016BF06E5ADD`
  - `SLA Watch.png`:
    `A94E6682A5ED9DAC093E2A3B259B4059676E46406CEF5C69ED2EF7F4E0613948`
  - `RevOps Pipeline Health.png`:
    `633DE13093DC86D920B4C693792B79625BC2E25F3380EE4EBB7138400E437352`
- Production tool: ImageMagick 7.1.2-30 Q16-HDRI x64
- Transformations: deterministic crop, removal of unrelated edge controls,
  metadata removal, and WebP encoding at quality 88
- Public outputs: five WebP files under `hubspot/`
- Output SHA-256:
  - `routing-workflow.webp`:
    `0609CA09602E08CEDCC8144181FD0627040040D15A31FC4D3A3B0F20743CD601`
  - `response-time-workflow.webp`:
    `BF2369D8D76D7837FFB2D0A4710091F2F1F90782F098589F92A06CCA7AE758F0`
  - `response-time-report.webp`:
    `AC5E2A3C054EC8C4C163B35B4AF208F8FF2613DD23B64627BD8209257DFE1B22`
  - `closed-deals-score-report.webp`:
    `D3F17947F6274FCAFD9A6B891E8FF9EA09EAA3FF2EC971D4FCB97D78C0EFDF5E`
  - `routing-path-report.webp`:
    `E21D98DFD596A5F7159BE61965E6DC6B6D373333A095C1DC17288CFE3FDEEF9A`
- Focused derivatives produced from the reviewed public workflow captures:
  - `routing-decision-detail.webp`, 870 by 470 pixels:
    `magick routing-workflow.webp -crop 870x470+430+300 +repage -strip -quality 88 routing-decision-detail.webp`
  - `small-company-route-detail.webp`, 780 by 850 pixels:
    `magick routing-workflow.webp -crop 780x850+70+300 +repage -strip -quality 88 small-company-route-detail.webp`
  - `response-time-enrollment-detail.webp`, 590 by 500 pixels:
    `magick response-time-workflow.webp -crop 590x500+420+105 +repage -strip -quality 88 response-time-enrollment-detail.webp`
  - `response-time-outcome-detail.webp`, 640 by 575 pixels:
    `magick response-time-workflow.webp -crop 640x575+390+640 +repage -strip -quality 88 response-time-outcome-detail.webp`
- Focused derivative SHA-256:
  - `routing-decision-detail.webp`:
    `0AAB62C6AB228FD517130D447AF86690BAB60095DAC61C42551C85F288F6A5CA`
  - `small-company-route-detail.webp`:
    `D722FFEE749E5A3BDF7195464515EE25622510C697792F3BDC204404C98D39D8`
  - `response-time-enrollment-detail.webp`:
    `47C984DBFFA6C838DACCC559E0DE4E7A70CE60D1EFCED3E3A571EF3AAC2DAA20`
  - `response-time-outcome-detail.webp`:
    `A01369499012DFEB62F2457EFAEA48C24F9E847CE91DC56F16E59013F6C49A8F`
- Current display decision, 2026-09-24: these four focused workflow
  derivatives are retained for provenance but are not imported by the case
  study. The route displays the complete `routing-workflow.webp` and
  `response-time-workflow.webp` images directly, with no separate full-workflow
  disclosure.
- Privacy review: no portal ID, email address, customer data, browser address
  bar, or generated HubSpot report summary appears in the public outputs
- License: owned screenshots supplied by Leo Sanga
- Produced: 2026-09-22

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
  `/projects/ai-booking-agent`
- Source repository: `n8n-booking-agent`, folder `docs/portfolio/`, captured
  2026-09-27 from Leo's own n8n instance for the demo business "Leo Demo Co".
  Screenshots at commit `196f442`, overview map at commit `61c146c`.
- Source privacy: every email address and the meeting link were blurred in the
  page before capture. Guest names are test guests.
- Production tool: ImageMagick 7.1.2-30 Q16-HDRI x64
- Transformation: lossless WebP (`webp:lossless=true`, method 6) with metadata
  stripped. Each output decodes pixel-identical to its source (ImageMagick
  compare, absolute error 0) or to the kept rectangle of it. No resize or
  retouching. The canvas captures are uncropped. The three Slack alerts are
  cropped on the right only, to 24 px past their longest line, because the
  empty width shrank their text on the page: calendar `1262x201+0+0`, config
  `787x160+0+0`, confirmation email `1241x387+0+0`.
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
| `alert-calendar-read-failed.webp`      | `alerts/calendar-slack.png`      | 1262 x 201, 15,732 bytes | `620b4fa3e94fa8e4d29de0aa9814f08a59f79aa3e63fc45013728f77be6eb1c1` | `5c9b549c0d8a309e1d40121e927fac99a937f020bd6eeb0e342bbeeb5c3386a3` |
| `alert-confirmation-email-failed.webp` | `alerts/email-failed-slack.png`  | 1241 x 387, 35,302 bytes | `d6c660628766702da0b42d863ed94d874c40049791b1f196b2acc631035e3723` | `ad03e58fa1fa10ba9e71bfb6bc40a1be96bda287c0b69ca11c4227d47ab48b55` |
| `alert-config-problem.webp`            | `alerts/config-slack.png`        | 787 x 160, 10,050 bytes  | `738895d012b9828ee8c67dde2ca4d18cd133f0f792a5b0c16c9a9ef2ae35069d` | `aa8e55dcee9d6e0853591968ef36d374cdd8fa4fcf2c96c7fdf690df0baa36f1` |
| `workflow-overview-map.svg`            | `overview-map.svg`               | 1220 x 566 view box      | `029ce4eb90afee74555c36f1627c2664d51ccd6b6825453399ee9d53601880aa` | identical to source                                                |

If the booking workflow's canvas changes, these images describe the build at
the commits above. Recapture, re-encode, and update this table before the page
claims anything about the newer build.

## Salesforce case-study evidence

- Purpose: native Salesforce evidence for the Trial & Demo Matching & Routing
  System case study
- Source repository: `salesforce-revenue-system`, folder `docs/evidence/`
- Source captured: 2026-09-28, recaptured from Leo Sanga's Salesforce Developer
  Edition org after the fixture and story runs, using controlled records. Each
  capture is a full browser-viewport screenshot at native resolution, sized to fit
  its evidence, taken from a freshly loaded page with no pointer input, and without
  the browser address bar. These replace the 2026-09-27 captures, which were
  downscaled from a wider viewport and showed a mouse pointer.
- Production tool: ImageMagick 7.1.2-30 Q16-HDRI x64
- Transformation: lossless WebP (`webp:lossless=true`, method 6) with metadata
  stripped. No resize or retouching. `resolved-event.webp` removes 27 pixels of
  empty page canvas below the record panel (source 767 by 1275, output 767 by
  1248); every other output keeps its source dimensions.
- Privacy review: no org URL, client identifier, secret, access token, or real
  customer record appears. The `.example` email addresses and company records
  are controlled test records. The dashboard carries the public account label
  `Leo Social`.
- License: owned screenshots supplied by Leo Sanga
- Produced: 2026-09-28

| Output in `salesforce/` | Output size  | Source in `docs/evidence/` | Source SHA-256                                                     | Output SHA-256                                                     |
| ----------------------- | ------------ | -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `inbound-events.webp`   | 1165 by 1030 | `1-inbound-events.jpg`     | `a496ac25049d9933198dc1189a3c9496d00a6e3e18e7d53cffae3230b82f9650` | `8c81b0f90e94f71716f0f3de2cd2adc50f121d9d524177a1fcb8ab130a86c0e8` |
| `resolved-event.webp`   | 767 by 1248  | `2-resolved-event.jpg`     | `35e3d1dba0d295fe5c3e5e0320d19ae6b36941ae5d0e8b6546eadea21ba4b95a` | `1ab088df5f6d888a5941e89cdb45a8894051b1d3e0777c85f63c2ea1ae1502e8` |
| `needs-review.webp`     | 1440 by 560  | `3-needs-review.jpg`       | `f69a5d1a189daa99cfbddaf0a8458a7d9e3556baa2c98c363f74d64b18504b78` | `fb96f8412258567dd50468653c6a90b037b0b3756b0268203e0165cb48e45f90` |
| `deal-task.webp`        | 1200 by 1000 | `4-deal-task.jpg`          | `d154d42dd7afa80acb19bb9a1458432bf5f8e902f296f2fef2d2476b43121d50` | `06c5fc6263c8c40e02d247786ba4b750f34e24d99701b452ac1f9fdef66d2b69` |
| `dashboard.webp`        | 1200 by 680  | `5-dashboard.jpg`          | `42af5377acfe21f202dee0c33ede18e31eb0cd442834ac34f644deda99c0d7f4` | `6fae940c855414224c78814a81b9b2b9f8a92b5d35b3bcac2d6b049e67c6c68f` |
