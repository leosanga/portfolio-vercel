# Portfolio Asset and Imagery Production Specification

Status: Approved by Leo; no production or implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Approved content: [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
Approved research: [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
Visual direction: [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
Workflow and rollback: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This specification defines every visual asset needed for the approved editorial
systems canvas. It covers the portrait, three-node identity, favicon family,
social-sharing image, project diagrams, future demo media, fonts, optimization,
accessibility, naming, and verification.

No asset is created, converted, downloaded, replaced, deleted, moved, or linked
into the application under this specification. Production begins only after Leo
approves this document and the later planning gates permit it.

## Senior perspectives applied

- Senior art director for image role, crop, composition, and visual coherence
- Senior brand identity designer for the three-node mark and favicon system
- Senior UI/UX designer for responsive image behavior and interface integration
- Senior image-production specialist for color, encoding, sharpening, and
  derivative quality
- Senior frontend performance engineer for format selection, loading priority,
  byte budgets, and layout stability
- Senior accessibility reviewer for alternative text, contrast, diagram
  equivalents, and non-image fallbacks
- Senior release engineer for additive filenames, provenance, and rollback
  safety

## Asset principles

1. Every asset must provide identity, evidence, orientation, or functional
   affordance.
2. The portrait is the primary human asset.
3. The three-node workflow is the primary brand asset.
4. Project visuals must explain approved system behavior.
5. Decorative stock imagery, generated 3D objects, and filler illustrations are
   prohibited.
6. The live asset set remains intact until the final cutover is separately
   approved.
7. Free availability does not replace license, attribution, privacy, or
   dependency review.

## Current asset inventory

| Asset | Current location | Observed properties | Current role | Redesign decision |
|---|---|---|---|---|
| Original portrait | `portrait image.heic` | 4283 by 5711 px; 8-bit; TopLeft orientation; sRGB; EXIF and XMP profiles; 6,639,893 bytes | User-provided master | Keep untouched, outside Git, and use only as the source for approved derivatives |
| Current portrait | `src/assets/leo-portrait.jpg` | 1200 by 1600 px; 139,122 bytes; 3:4 portrait | Live hero image | Keep unchanged for rollback; do not reuse as the redesign master |
| Current favicon SVG | `public/favicon.svg` | 100 by 100 viewBox; 425 bytes | Live scalable browser icon | Keep unchanged; replace only through a new versioned path at cutover |
| Current favicon PNG | `public/favicon.png` | 32 by 32 px; 809 bytes | Live raster fallback | Keep unchanged; create a versioned redesign counterpart |
| Current Apple touch icon | `public/apple-touch-icon.png` | 180 by 180 px; 3,577 bytes | Live saved-site icon | Keep unchanged; create a versioned redesign counterpart |
| Current workflow diagram | `FlowDiagram.tsx` and `.flow-*` styles | Structured HTML and CSS driven by project data | Featured-project evidence | Redesign its visual grammar later without turning it into a raster asset |
| Current social preview | None found | `summary_large_image` metadata exists without an image | Missing sharing asset | Create a static 1200 by 630 social image and add metadata only at cutover |

The original HEIC has SHA-256
`816CC222D5E933F7CE333CDAA6D5A3348D72A7486E800BCE161BC68072D0BBF7`.
This identifies the approved master without committing the source image.

### Inspection result

ImageMagick 7.1.2-30 Q16-HDRI was installed from the official WinGet package on
2026-09-10. The installed build reports the built-in HEIC delegate, HEIC and
HEIF read support, AVIF and WebP read/write support, JPEG and PNG support,
LittleCMS color management, and SVG support.

The HEIC was inspected without creating a derivative. It is 4283 by 5711 px,
8-bit, TopLeft orientation, and sRGB. It contains EXIF and XMP profiles that must
be stripped from public outputs after orientation and color information have
been handled. Its resolution is sufficient for every currently proposed crop
without upscaling.

The current JPEG was visually inspected. It contains useful cool lavender and
blue atmosphere, a warm facial light, significant skyline space above Leo, and
enough surrounding image for responsive crop exploration. The original HEIC may
contain more detail or a different crop and remains the authority.

## Required first-release asset set

| Asset family | Required now | Delivery type | Purpose |
|---|---|---|---|
| Hero portrait derivatives | Yes | AVIF, WebP, and JPEG fallback | Identity and trust |
| Three-node master mark | Yes | SVG | Navigation identity and source for icon derivatives |
| Browser favicon family | Yes | SVG and PNG | Browser chrome |
| Apple touch icon | Yes | PNG | Saved-site and home-screen presentation |
| Social-sharing image | Yes | JPEG or PNG | Deliberate link previews |
| Featured workflow visual | Yes | Code-native structure with vector connectors | Explain the approved implementation-delivery system |
| Capability icons | No | None | Open columns do not need decorative icons |
| Technology logos | No | None | Tool names remain text metadata |
| Remaining-project images | No | None | The projects lack approved visual evidence and should use editorial rows |
| Background texture | No | None | Color, line, typography, and motion provide atmosphere |
| Future booking-agent demo | Deferred | Video and poster | Produce only after the owned project is complete and approved |
| Future case-study media | Deferred | Project-specific | Produce from real evidence when each project is ready |

## File and provenance strategy

### Additive asset root

All redesign assets should be added under new paths:

```text
src/assets/portfolio-v2/
  brand/
  fonts/
  portrait/
  projects/

public/portfolio-v2/
  icons/
  social/
```

Do not replace `src/assets/leo-portrait.jpg`, `public/favicon.svg`,
`public/favicon.png`, or `public/apple-touch-icon.png` during local redesign work.
The local redesign route should reference only versioned assets. The final
cutover changes references after Leo approves the complete design.

### Provenance manifest

Production should add a small tracked manifest at
`src/assets/portfolio-v2/ASSET-SOURCES.md` containing:

- Asset filename and purpose
- Original source filename
- Source SHA-256
- Production tool and version
- Crop or transformation performed
- Output dimensions and encoded size
- License and attribution requirement when the source is external
- Date produced

Do not put private EXIF fields, local absolute paths, client details, or hidden
metadata into the manifest.

## Portrait production specification

### Master handling

- `portrait image.heic` is the read-only master.
- Do not rename, move, overwrite, or commit it.
- Do not send it to an online converter or third-party AI service.
- Verify its SHA-256 before production.
- Decode orientation and color profile before selecting a crop.
- Create temporary intermediates only inside a task-specific temporary
  directory.
- Delete temporary intermediates only after verifying their resolved path is
  inside that temporary directory.

### Permitted adjustments

- Orientation correction from embedded metadata
- Conversion to sRGB for predictable browser color
- Responsive cropping
- Downscaling without upscaling
- Format conversion
- Conservative output sharpening after resizing
- Removal of location, camera, and other private metadata from public outputs

### Prohibited adjustments

- Facial reshaping or skin replacement
- Generative fill
- Background replacement
- Artificial depth of field
- Heavy denoising that removes facial detail
- Color grading that undoes Leo's lighting edits
- Added glow, lens flare, particles, or branded overlays baked into the image

The system lines belong to the interface layer so they remain responsive and can
support reduced motion. They should not be baked into the portrait.

### Crop set

The asset-production pass should generate and compare these art-directed crops:

| Crop | Target use | Composition requirement |
|---|---|---|
| 4:5 portrait | Desktop and laptop hero | Preserve face, shoulders, and enough environment to retain the city and water context |
| 3:4 portrait | Tablet fallback | Preserve the natural balance of the current image |
| 4:3 landscape | Mobile hero | Reduce empty skyline while keeping Leo's face and upper body clear |
| 1:1 portrait-safe crop | Social card and future profile contexts | Keep facial position natural; do not use as the homepage hero |

Crop coordinates remain open until the HEIC is decoded. The protected region
must include Leo's complete face, hair, shoulders, and the arm position needed
for a natural silhouette. No headline or node line may cross the face.

### Responsive output matrix

Generate only sizes that do not upscale the decoded master.

| Art direction | Widths | Formats | Suggested filenames |
|---|---|---|---|
| Desktop 4:5 | 640, 960, 1200 px | AVIF and WebP | `leo-sanga-hero-4x5-{width}.{format}` |
| Tablet 3:4 | 640, 960 px | AVIF and WebP | `leo-sanga-hero-3x4-{width}.{format}` |
| Mobile 4:3 | 480, 768 px | AVIF and WebP | `leo-sanga-hero-4x3-{width}.{format}` |
| Fallback | 1200 px maximum | Progressive JPEG | `leo-sanga-hero-fallback.jpg` |

If two crops prove visually identical at a breakpoint, remove the redundant
family rather than shipping unnecessary files.

### Portrait loading behavior

- Use `<picture>` with media-aware sources.
- Include intrinsic width and height for every selected source.
- Set the hero image to high fetch priority because it is an expected LCP
  candidate.
- Do not lazy-load the hero portrait.
- Allow asynchronous decoding.
- Use an accurate `sizes` value derived from the approved grid rather than
  `100vw`.
- Use `surface` as the reserved background while the image decodes.
- Do not add a separate blur placeholder asset.
- Keep layout geometry stable before and after image decode.

### Portrait alternative text

Recommended alt text: `Portrait of Leo Sanga`.

The city and waterfront do not need to be described because they are atmosphere,
not evidence. If the portrait becomes immediately adjacent to a visible name in
a way that makes the alt text repetitive, the accessibility review may select
an empty alt instead. That choice must be tested in the final reading order.

### Portrait byte budgets

| Delivered resource | Maximum target |
|---|---:|
| Typical desktop AVIF at approximately 960 px | 180 KB |
| Typical desktop WebP at approximately 960 px | 240 KB |
| JPEG fallback at up to 1200 px | 320 KB |
| Typical mobile AVIF | 110 KB |

These are maximum targets, not instructions to accept visible artifacts. Adjust
dimensions before reducing quality below a professional threshold.

## Three-node identity production

### Meaning

The mark represents one starting point feeding two downstream paths. The current
mark preserves the correct node count but can read as a share icon because both
connectors leave the starting circle directly.

The redesign should add a visible process trunk and branch junction:

```text
start node ---> branch +---> upper output
                       +---> lower output
```

The production drawing should use curved or eased elbows rather than the text
diagram above. The branch must remain readable when rasterized to 16 px.

### Geometry

- Design on a 16 by 16 optical grid first, then scale to the SVG viewBox.
- Starting node diameter: approximately 4.5 px at 16 px output.
- Downstream node diameter: approximately 3.5 px at 16 px output.
- Connector visual weight: approximately 1.5 px at 16 px output.
- Minimum internal gap between node fill and unrelated connector: 1 px at 16 px.
- Keep the mark within a 13 by 13 px safe area for the browser favicon.
- Use round line caps and joins.
- Correct optical alignment at 16 and 32 px before accepting the vector master.

### Color variants

| Variant | Background | Start node | Connector | Output nodes | Use |
|---|---|---|---|---|---|
| Dark full-color | `canvas` | `lavender` | `lavender` at reduced emphasis | `mist` | Default browser and navigation |
| Light monochrome | Transparent | White | White | White | Dark photographic or constrained contexts |
| Dark monochrome | Transparent | `canvas` | `canvas` | `canvas` | Mask and print-safe contexts |
| High contrast | Black | White | White | White | Forced or fallback icon testing |

Color variation cannot be the only reason the nodes read as start and output.
Node size and branch geometry carry the meaning.

### Inline and favicon behavior

- Navigation and hero versions may animate their separate node and signal layers.
- The vector source must keep semantic groups for start node, trunk, branch,
  signal, and output nodes.
- Browser favicons remain static.
- Do not use an animated SVG favicon, GIF favicon, or theme-changing favicon.
- Decorative inline instances use `aria-hidden="true"`.
- The navigation mark should not receive alt text separate from the adjacent
  `Leo Sanga` label.

## Favicon and saved-site family

### Required outputs

| File | Size | Notes |
|---|---:|---|
| `public/portfolio-v2/icons/favicon-v2.svg` | Vector | Dark full-color master optimized for browser use |
| `public/portfolio-v2/icons/favicon-v2-16.png` | 16 by 16 | Pixel-inspected fallback |
| `public/portfolio-v2/icons/favicon-v2-32.png` | 32 by 32 | Standard raster fallback |
| `public/portfolio-v2/icons/favicon-v2-48.png` | 48 by 48 | Windows and browser fallback |
| `public/portfolio-v2/icons/apple-touch-icon-v2.png` | 180 by 180 | Full square artwork with platform-safe inset |
| `public/portfolio-v2/icons/safari-pinned-tab-v2.svg` | Vector | Single-color mask only if verified useful |

Do not add 192 or 512 px application icons unless a web-app manifest becomes an
approved requirement. The portfolio is not currently specified as an installed
PWA.

### Small-size QA

- Inspect 16, 20, 24, 32, and 180 px outputs at 100 percent scale.
- Inspect on both dark and light browser tab chrome.
- Confirm the start node, branch, and two endpoints remain distinguishable.
- Reject any raster output with a disappearing connector or merged node.
- Confirm the Apple icon remains inside the platform mask safe area.
- Compare against the current icon specifically for share-icon resemblance.

## Social-sharing image

### Output

- Path: `public/portfolio-v2/social/leo-sanga-portfolio-v2.jpg`
- Canvas: 1200 by 630 px
- Color space: sRGB
- Maximum target: 300 KB
- Safe margin: 72 px on every side
- No transparency requirement

### Composition

- Warm `canvas` field
- Leo's approved portrait crop on the right
- Static three-node mark on the left
- `Leo Sanga` as the primary line
- `Systems Engineer: Integration + Automation` as the supporting line
- A restrained mist or lavender system rule connecting the identity fields
- No project metrics, availability, technology logos, gradient text, or CTA

The image should remain understandable when displayed around 600 by 315 px. The
portrait must not depend on the extreme edge because social platforms crop
previews differently.

### Metadata requirements for later implementation

- `og:image`
- `og:image:width` set to `1200`
- `og:image:height` set to `630`
- `og:image:alt` set to `Leo Sanga, Systems Engineer focused on integration and automation.`
- `twitter:image`
- `twitter:image:alt`
- Retain `summary_large_image`
- Use an absolute production URL only at the release gate

Do not point live metadata to localhost or a branch-only asset.

## Project visual system

### Featured implementation-delivery workflow

The lead project already has an approved structured workflow. Its redesign is an
interface component, not an exported infographic.

- Keep node content in semantic HTML so it remains selectable and readable.
- Use vector or CSS connectors as a presentation layer.
- Preserve the approved data source and locked project evidence.
- Use shape, label, and line treatment alongside color for node kinds.
- Keep the detailed implementation flow available without requiring an image
  download.
- Provide a concise text summary through the existing figure structure or an
  equivalent accessible relationship.
- Do not bake motion into a GIF or video.
- Do not expose client-specific information.

The frontend architecture specification will decide whether the connector layer
remains CSS-based or becomes an SVG overlay. That decision must respect the
existing narrow data model and the motion specification.

### Remaining current projects

Do not invent screenshots, dashboards, sample records, or detailed architecture
for the remaining projects. They should use the approved editorial project-row
treatment until additional visual evidence is explicitly approved.

A small topology glyph may be introduced only when it can be derived directly
from already approved public facts. It must still add meaning at compact size.
Otherwise, typography and metadata are the correct treatment.

### Future owned project media

The n8n booking agent remains absent until complete. When approved as a public
case study, its asset package should contain:

- Real interface or workflow captures with private data removed
- A concise demo recording
- A poster image that identifies the demonstrated state
- Captions or a transcript
- A text description of the demonstrated flow
- Responsive still images for sections that do not need video

Future project media follows the same evidence rule. A case study receives media
because evidence exists, not because the layout has an empty slot.

## Demo video requirements for future use

- Record at a stable resolution and browser zoom.
- Remove notifications, personal accounts, IDs, tokens, and client data before
  recording.
- Use a short edited path focused on the system behavior being discussed.
- Do not autoplay audio.
- Do not autoplay video on narrow screens or reduced-data conditions.
- Load the video player only after visitor intent.
- Provide captions and a transcript.
- Supply an optimized poster with intrinsic dimensions.
- Keep a static written explanation available without the player.
- Prefer standard MP4 with H.264 for broad fallback. Add WebM only when the size
  reduction justifies another source.

Exact recording length and encode settings should be decided when the first
owned case study is ready.

## Fonts as assets

### Required files

- Instrument Sans variable upright, restricted to the used weight range where
  tooling permits
- IBM Plex Mono regular
- IBM Plex Mono medium only if metadata hierarchy requires it

### Delivery rules

- Download from the official project source.
- Preserve the SIL Open Font License text in the repository.
- Self-host WOFF2 files.
- Subset to the characters required by the public site only when the license and
  tool preserve required metadata.
- Use `font-display: swap` or `optional` after testing the visible fallback
  change.
- Define metric-compatible fallbacks where practical.
- Remove the live Google Fonts requests only during the approved redesign
  cutover.
- Target no more than 160 KB for initially loaded font files.

The font decision remains proposed until Leo approves the visual token system.

## Image production tooling

Use the installed [ImageMagick](https://github.com/ImageMagick/ImageMagick)
7.1.2-30 Q16-HDRI build as the single command-line image-production tool. The
official [format documentation](https://imagemagick.org/formats/) states that
ImageMagick's HEIC support requires the libheif delegate. That delegate is
already built into this installed package, so no separate libheif executable or
installation is required for this workflow.

Verified capabilities for this asset plan:

- Read the HEIC portrait
- Inspect dimensions, orientation, color space, and profile presence
- Crop and resize at Q16-HDRI working precision
- Write AVIF, WebP, JPEG, and PNG
- Read and write SVG through the installed SVG delegates
- Perform sRGB color conversion through LittleCMS
- Strip private metadata from public derivatives

Production sequence:

1. Confirm `magick -version` still lists the `heic`, `lcms`, `jpeg`, `png`,
   `rsvg`, and `webp` delegates.
2. Confirm `magick -list format` still reports HEIC read support plus AVIF and
   WebP write support.
3. Verify the master SHA-256 before opening it.
4. Inspect only the metadata required for orientation, color, dimensions, and
   profile handling.
5. Generate crop candidates inside a validated task-specific temporary
   directory.
6. Review crops before producing the final size matrix.
7. Encode AVIF, WebP, JPEG, and PNG outputs from the approved crop geometry.
8. Strip EXIF, XMP, thumbnails, and private fields from public outputs.
9. Verify dimensions, color space, profile state, file size, and visual quality
   with ImageMagick and browser inspection.
10. Record the exact ImageMagick version and commands in the provenance
    manifest.

ImageMagick fully replaces a separate libheif command-line step for the required
portfolio outputs. It still depends on its bundled libheif delegate internally.
Do not remove or disable that delegate.

The current ImageMagick policy is the package default. Use the tool only with
the trusted portrait and locally generated portfolio assets. Do not enable URL
delegates or process untrusted uploads. Review the active policy again before
adding any automated asset script.

No production runtime dependency is required. ImageMagick remains a local asset
tool and must not be invoked by the deployed application.

## Optimization and metadata rules

- Convert public raster assets to sRGB.
- Respect embedded orientation before cropping.
- Strip GPS, device, timestamp, thumbnail, and other unnecessary metadata from
  derivatives.
- Preserve only metadata required for correct color and orientation.
- Avoid chroma subsampling that visibly damages skin or colored system lines.
- Compare AVIF and WebP outputs for banding in the sky and water.
- Check facial detail at 100 percent and at the final rendered size.
- Avoid aggressive sharpening halos against hair, shirt, and skyline edges.
- Use integer intrinsic dimensions in markup.
- Use content hashes or versioned filenames for cache-safe cutover.
- Do not base64-inline the portrait or social image.

## Accessibility rules for visual assets

- Informative images receive concise alternative text.
- Decorative system lines and flourishes are hidden from assistive technology.
- Diagrams have a visible heading and a text equivalent.
- Node kind and state are communicated by labels and geometry as well as color.
- Text must not be baked into project graphics when semantic HTML can render it.
- The social image's text is repeated in page metadata and visible page content.
- No essential information depends on animation playback.
- High-contrast mode must preserve the favicon mark and diagram structure.
- Forced-colors mode may replace brand colors with system colors.

## Performance budgets

| Asset group | First-view budget | Rule |
|---|---:|---|
| Hero portrait resource selected for a typical desktop | 180 KB preferred; 240 KB hard review threshold | Select the smallest visually acceptable source |
| Initially loaded fonts | 160 KB maximum | No unused families or weights |
| Navigation brand SVG | 3 KB maximum | No editor metadata or hidden shapes |
| Inline hero identity SVG | 8 KB maximum | Reuse geometry and avoid filters |
| Favicon SVG | 3 KB maximum | Optimize paths after small-size QA |
| Social image | Not part of page load; 300 KB maximum | Crawler asset only |
| Project raster media above fold | 0 KB for the first release | Use the code-native workflow visual |

Performance budgets may be tightened after real encodes are inspected. Visible
quality and LCP behavior should be assessed together rather than optimizing a
file-size number in isolation.

## Visual QA matrix

### Portrait

- Original orientation is correct.
- Skin tone remains natural relative to the approved edit.
- Face and hair remain sharp without halos.
- Sky and water do not show banding.
- Desktop, tablet, and mobile crops preserve the protected region.
- No line or text crosses Leo's face.
- The image does not move when it decodes.
- The correct source is selected at each representative viewport.

### Brand mark and icons

- Workflow meaning is readable at 16 px.
- Mark does not resemble a share icon when viewed without context.
- Nodes remain distinct on light and dark browser chrome.
- Full-color and monochrome variants share identical geometry.
- Apple touch icon remains within safe masking bounds.
- Static favicons contain no animation or external resources.

### Social preview

- Name and role remain readable in common small previews.
- Portrait crop survives platform edge cropping.
- No private metadata remains.
- Absolute production URL resolves at the release gate.
- Open Graph and Twitter alternative text matches the image.

### Project visuals

- Every visible node and label maps to approved evidence.
- Branch and merge order remains clear at desktop and mobile widths.
- Keyboard and assistive-technology reading order remains logical.
- Reduced motion shows the completed state immediately.
- Printed or high-contrast output still exposes the structure.

## Non-overwrite and rollback controls

- Existing live asset files remain unchanged during prototype work.
- Every redesign output uses a `portfolio-v2` directory or `v2` filename.
- The original HEIC remains untracked and is never staged.
- The redesign route references only redesign assets.
- The live root metadata continues referencing current icons until cutover.
- The cutover changes references in one reviewable commit.
- Old assets are not deleted during cutover.
- Removing superseded assets is a later cleanup decision after production
  verification and is not implied by launch approval.

## Production sequence after approval

1. Verify the master hash and inspect HEIC metadata with an approved local tool.
2. Produce three portrait crop candidates without changing the source.
3. Review the candidates at desktop, laptop, tablet, and mobile compositions.
4. Approve crop coordinates before batch encoding.
5. Draw the three-node mark on the 16 px optical grid.
6. Review favicon raster proofs before producing the complete icon family.
7. Produce the social card from the approved crop and identity mark.
8. Implement the featured workflow visual as part of the later interface build.
9. Validate dimensions, file sizes, metadata removal, contrast, and responsive
   source selection.
10. Record provenance for every shipped asset.

This sequence belongs to the later implementation phase. It is not authorized
by approving the specification alone.

## Decisions proposed for approval

1. Keep the HEIC as the untouched, untracked portrait master.
2. Produce art-directed 4:5, 3:4, and 4:3 portrait crops, removing redundant
   families after comparison.
3. Permit only crop, resize, color-management, metadata-removal, encode, and
   conservative output-sharpening operations.
4. Replace the share-like direct connectors with a trunk and explicit branch in
   the three-node mark.
5. Keep the favicon static and produce versioned SVG, PNG, and Apple variants.
6. Create one 1200 by 630 social image using the portrait, name, role, and
   three-node identity.
7. Keep the featured workflow code-native and avoid images for projects without
   approved visual evidence.
8. Self-host the proposed fonts and keep the initial font payload within 160 KB.
9. Use only additive `portfolio-v2` asset paths until the approved cutover.
10. Use the installed ImageMagick toolchain locally and reproducibly, and never
    upload the portrait to an online converter.

## Next planning step

After Leo approves this specification, create the dedicated motion and
interaction specification. It will convert the seven approved motion
opportunities into state diagrams, exact timelines, interruption rules,
component ownership, input-mode behavior, reduced-motion equivalents, and
performance controls.

No asset production or interface implementation begins at that point. The
responsive, accessibility, performance, frontend architecture, and QA plans
must still be completed and approved.

## Fresh-session continuation

A fresh session continuing asset work should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
4. [`PORTFOLIO-CONTENT-CONVERSION-SPEC.md`](./PORTFOLIO-CONTENT-CONVERSION-SPEC.md)
5. [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
6. [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
7. This specification
8. [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)
9. `ANIMATION_PLAN_PROMPT.md` before changing visual behavior
10. Current portrait, icon, metadata, and workflow files

The session must inspect Git status, preserve user-owned changes, and stop before
asset production or implementation unless the relevant approval gate has been
explicitly granted.
