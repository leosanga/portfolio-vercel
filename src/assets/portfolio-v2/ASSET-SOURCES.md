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
