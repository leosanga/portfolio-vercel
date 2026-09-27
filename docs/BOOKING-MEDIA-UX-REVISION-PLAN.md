# Booking Case-Study Media UX Revision Plan

Status: approved and built 2026-09-27, then revised after Leo's review of the
build (see `Leo's review of the build` at the end). Awaiting his local visual
review of the revision before the release gates.

Date: 2026-09-27

Owner: Leo Sanga

Implementation target: `feature/booking-case-study-media` in the
`portfolio-vercel-booking-media` worktree.

Release authority: this plan does not by itself authorize a push, pull request,
merge, Vercel promotion, or production deployment. A later instruction from Leo
must explicitly include the remote and deployment actions he wants Claude to
perform. Once Leo gives that instruction, Claude may execute the approved plan
and the requested release gates without stopping for design decisions already
settled here.

## Why this revision exists

The first media pass added honest evidence from the running booking agent, but
its full-size interaction and repeated labels make the evidence feel appended
rather than designed as part of the case study.

The local preview differs from production by more than image files. It adds:

- one tested overview map;
- seven evidence figures and their captions;
- one fifth architecture story, `One failure could hide a successful booking`;
- 614 words in the rendered DOM, part of which is the map's mobile and assistive
  text equivalent.

At the reviewed 1483 px desktop viewport, the seven figures occupy about 3,228
vertical pixels and the map occupies another 742 pixels. The evidence is useful,
but its presentation needs a stronger hierarchy before release.

## Goal and approved-source mapping

This revision supports the portfolio goal and the booking-agent goal in four
ways:

- A technical evaluator can inspect real implementation evidence without losing
  the case-study context.
- A business reader can connect a failure to what the team receives.
- The page keeps the production-safe thesis legible instead of becoming a
  screenshot inventory.
- Mobile and keyboard users receive evidence that is usable, not merely present.

It does not change any booking-agent behavior, claim, route, metadata, homepage
content, social image, or third-party request.

## Senior perspectives applied

- Senior portfolio strategist and hiring manager: preserve a fast path through
  the thesis and keep each proof item tied to a decision.
- Senior content designer: remove boilerplate labels and make captions point to
  the evidence instead of repeating the chapter.
- Senior interaction designer: keep enlargement inside the case study and make
  the image itself an obvious control.
- Senior accessibility reviewer: require keyboard operation, focus management,
  useful mobile detail, text alternatives, and zoom behavior.
- Senior automation architect: keep the evidence honest, preserve provenance,
  and avoid implying that a hand-authored map is itself an n8n implementation.
- Senior release engineer: keep local review, pull-request preview, merge, and
  production verification as separate gates.

## Decisions

### 1. Keep the selected evidence set

Keep the overview map and the seven current images. Do not add the other booking
workflow stage captures to this page.

The current selection is curated rather than exhaustive. Each item supports a
specific claim. If the revised page still feels too long after the compact
previews and shorter captions are built, stop and ask Leo before removing an
item. The Config alert is the first candidate because two stronger alert examples
already remain, but removal is not authorized by this plan.

### 2. Replace generic workflow labels

Remove the shared `Implemented in n8n` label. It is redundant above real n8n
canvas captures, and it is inaccurate above the hand-authored workflow map.

Use these exact labels:

| Evidence                        | Label                                    |
| ------------------------------- | ---------------------------------------- |
| Overview map                    | `Workflow map`                           |
| AI reply preview                | `Stage 2 · Validation gate`              |
| Calendar check and hold preview | `Stage 5 · Calendar check and slot hold` |
| Outside-booking preview         | `Stage 3 · Outside-booking adoption`     |
| Notify canvas                   | `Notify sub-workflow`                    |
| Calendar-read alert             | `What the team received`                 |
| Config alert                    | `What the team received`                 |
| Confirmation-email alert        | `What the team received`                 |

Do not add a second global sentence announcing that the captures come from n8n.
The stage labels, image contents, alt text, and existing project context already
establish that.

### 3. Replace the raw-image new-tab action

The primary interaction becomes an in-page evidence viewer.

- The framed image is a button and uses `cursor: zoom-in`.
- A visible `View larger` control opens the same viewer.
- Use the repository's existing Radix Dialog dependency for focus containment,
  Escape handling, overlay behavior, accessible title association, and focus
  return.
- The viewer opens in `Fit` mode and resets to `Fit` every time it opens.
- `Actual size` shows the original pixels inside a two-direction scroll area.
- `Fit` returns the image to the available viewport.
- `Open original image` remains available inside the viewer as a secondary link
  with the existing hidden `opens in a new tab` announcement.
- `Close` is always visible.
- Do not add next or previous controls. Each image belongs to the claim beside
  it and is not a standalone gallery item.
- Do not change the browser URL when the viewer opens.
- Do not animate the dialog scale or image size. A short overlay opacity
  transition is acceptable only when reduced motion disables it.

Exact control copy:

- `View larger`
- `Fit`
- `Actual size`
- `Open original image`
- `Close`

The viewer title is the evidence label in the table above. The existing caption
appears below the image in the viewer.

### 4. Use focused inline previews for the three dense stage captures

The dialog always uses the complete original capture. The inline page uses
derived, lossless WebP previews for three figures:

1. `workflow-ai-reply-check-preview.webp`
2. `workflow-check-and-hold-preview.webp`
3. `workflow-outside-bookings-preview.webp`

Preview content requirements:

- AI reply: show AI Agent, its model and memory connections, Parse & Validation
  Gate, If agent is still probing, and If booking is valid. Exclude the long
  empty-reply handling lane to the right.
- Calendar check and hold: show Get Availability through If slot was locked.
  Preserve the failed-calendar entry when it fits without shrinking the main
  sequence below reading size. Offer Alternatives is not required in the inline
  preview.
- Outside-booking adoption: show List Guest Events, Match Guest Events, Adopt
  Bookings, Classify Adoption Repairs, and the first repair or conflict decisions.
  Remove the large unused upper-left area. It is acceptable for the live figure
  label to carry the stage title instead of retaining the canvas title inside
  this crop.

Do not crop the Notify canvas or the Slack alerts. Their current compositions are
already focused.

Create each preview from the committed full capture. Do not rescreenshot n8n.
Use ImageMagick 7, which is available on this machine, and record the exact crop
geometry, command, source SHA-256, output SHA-256, dimensions, format, and file
size in `src/assets/portfolio-v2/ASSET-SOURCES.md`.

The preview must decode pixel-identically to the selected rectangle of the full
capture. Use lossless WebP. Keep the original capture as the evidence master and
as the viewer's `Actual size` image.

### 5. Use this caption set

These captions replace the current longer versions. They are the recommended
Mode 4 copy set for Leo's approval with this plan. Claude must use them exactly
after approval and must not silently polish them.

**AI reply checked by code**

> The AI Agent has no action tools. Its reply reaches Parse & Validation Gate
> before any booking branch can run. The gate's rules are covered by the
> automated tests.

**Calendar check and slot hold**

> The calendar check runs before Insert Booking attempts the database hold. The
> database accepts one booking per time, and a request that loses the race stops
> at If slot was locked before any calendar write.

**Outside-booking adoption**

> List Guest Events, Match Guest Events, and Adopt Bookings record meetings
> created outside the chat as adopted. The repair branch preserves their origin
> and decides when a person needs to be told.

**Calendar-read alert**

> A controlled test used a calendar the workflow could not read. The alert asks
> the rep to contact the guest and tells the operator where the failure occurred.
> Leo holds both roles in this demo, and the guest's address is blurred.

**Notify sub-workflow**

> Every planned failure calls this shared workflow, which attempts Slack and
> email and returns a delivery result. The lower lane handles crashes outside the
> planned failure paths and looks up the affected guest.

**Config alert**

> An unsupported meeting platform triggered this operator notice once while
> guests could keep chatting. The notice names the setting and where to fix it.

**Confirmation-email alert**

> The confirmation email was forced to fail after the booking succeeded. The
> rep's booking notice still arrived and asked them to send the meeting link
> manually. Guest details are blurred.

Keep the current alt text unless a crop makes it inaccurate. When an alt text
changes, describe the visible relationship and do not repeat the full caption.

### 6. Keep the fifth architecture story

Keep `One failure could hide a successful booking` and its existing body copy.
It is new public copy, but it supports the approved production-safe thesis and
the adjacent alert proves the behavior. Leo's approval of this plan approves
that story for this release.

### 7. Keep the dark captures

Do not recapture n8n or Slack in a light theme. The dark captures read as
documentary evidence, create useful contrast on the light page, and integrate
cleanly with the portfolio's dark theme.

## Component and data design

### `CaseEvidenceMedia`

Extend the type with explicit viewer and preview fields:

```ts
export type CaseEvidenceMedia = {
  src: string;
  previewSrc?: string;
  width: number;
  height: number;
  previewWidth?: number;
  previewHeight?: number;
  alt: string;
  label: string;
  caption: string;
};
```

If `previewSrc` is absent, use `src` for both the inline image and the viewer.
When `previewSrc` is present, `previewWidth` and `previewHeight` are required.
Enforce that relationship in the TypeScript type if it stays readable. Do not
add a separate content model for canvas and Slack images.

### `CaseEvidenceFigureV2`

- Render `previewSrc ?? src` inline.
- Preserve lazy loading and intrinsic dimensions.
- Make the image frame and the visible `View larger` text open the viewer.
- Keep the label before the frame and the caption after it in document order.
- Do not put a nested link inside a button.
- Keep the original-image link inside the dialog only.

### `CaseEvidenceDialogV2`

Create one focused component for the viewer. Use Radix Dialog primitives already
installed in the repository. Do not add a dependency.

The component owns only:

- open and closed state;
- fit and actual-size state;
- the overlay and dialog surface;
- the original image;
- the title, caption, controls, and original-image link.

It must not own evidence ordering, gallery navigation, analytics, downloads, or
URL state.

### CSS

Keep the evidence rules in the existing self-contained booking case-study block.
Add dialog rules beside them.

- The inline frame keeps the current border and radius.
- Interactive frames show a visible focus ring using the existing global focus
  treatment and a subtle hover border change.
- The dialog never exceeds the visual viewport.
- The scroll area, not the page, owns overflow in `Actual size` mode.
- Controls meet the 24 by 24 CSS pixel minimum target size.
- At 320 px, the dialog controls wrap without horizontal page overflow.
- At 200 and 400 percent browser zoom, the title, image controls, and Close
  control remain reachable.
- Forced colors retain visible control boundaries.
- Reduced motion removes the optional overlay transition.

## Files affected

Modify:

- `src/content/portfolio-v2/types.ts`
- `src/content/portfolio-v2/booking-agent.ts`
- `src/components/portfolio-v2/CaseEvidenceFigureV2.tsx`
- `src/styles/portfolio-v2.css`
- `src/assets/portfolio-v2/ASSET-SOURCES.md`
- `docs/N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md`
- `docs/BOOKING-MEDIA-RELEASE-RUNBOOK.md`

Create:

- `src/components/portfolio-v2/CaseEvidenceDialogV2.tsx`
- three preview WebP files under
  `src/assets/portfolio-v2/booking-agent/`
- `scripts/booking-case-study-media-qa.mjs`

Do not modify:

- `src/routeTree.gen.ts`
- homepage content or components
- route definitions
- social metadata or social images
- the booking-agent repository's source captures
- package dependencies

The worktree already contains an unrelated line-ending-only modification to
`src/routeTree.gen.ts`. Preserve it and never stage it with this work.

## Implementation sequence

1. Read this plan, the case-study spec's media section, the release runbook,
   `AGENTS.md`, `CLAUDE.md`, the voice guide, and the booking repository's
   `docs/portfolio/README.md`.
2. Confirm Git status and preserve `src/routeTree.gen.ts`.
3. Create the three lossless preview crops and record their provenance.
4. Extend `CaseEvidenceMedia` and update the evidence records with exact labels,
   captions, and preview metadata.
5. Build `CaseEvidenceDialogV2` with Radix Dialog.
6. Update `CaseEvidenceFigureV2` to use the preview and viewer.
7. Add the responsive, theme, preference, zoom, and forced-color CSS.
8. Add the case-study-specific browser QA harness.
9. Run all verification below.
10. Review the local page in light and dark themes at desktop and phone sizes.
11. Update the spec and runbook from proposed to built only after the checks pass.
12. Commit only the approved files. Do not stage `src/routeTree.gen.ts`.
13. Continue through the release runbook gates authorized by Leo's session
    instruction.

## Automated verification

Run:

```powershell
cd C:\Users\Leo\Downloads\projects\portfolio-vercel-booking-media
```

```powershell
.\node_modules\.bin\tsc.exe --noEmit
```

Expected: exit code 0 and no output.

```powershell
bun run build
```

Expected: the production build completes and reports the preview command. A
change to `src/routeTree.gen.ts` is not part of this task.

```powershell
bun run lint
```

Expected: no new lint errors. Report the documented CRLF Prettier baseline and
the two existing hook warnings separately if they still occur.

The new `scripts/booking-case-study-media-qa.mjs` must cover the case-study route
at the existing eleven viewport sizes and both themes. It must verify:

- no horizontal document overflow;
- every preview and original image loads;
- the map still becomes a numbered list below 768 px;
- every image button and `View larger` control opens the viewer;
- the viewer title and caption match the selected evidence;
- opening moves focus into the viewer;
- Escape closes it and returns focus to the opener;
- `Actual size` changes only the viewer scroll area;
- `Fit` restores the fitted image;
- `Open original image` points to the full master, not the preview;
- the Close control remains reachable at 320 by 568;
- 200 and 400 percent text and page zoom preserve access to all controls;
- reduced motion removes dialog motion;
- forced colors preserve visible controls;
- the no-JavaScript page still shows every inline preview and caption;
- there are no console errors;
- there are no requests outside the local server.

Capture screenshots at 1440 by 900, 390 by 844, and 320 by 568 with:

- the page closed;
- the AI evidence viewer open in Fit mode;
- the AI evidence viewer open in Actual size mode;
- the outside-booking preview in the page;
- the confirmation-email alert viewer open.

## Manual visual acceptance

At desktop width:

- The first view of each canvas figure shows node labels without enlargement.
- The outside-booking preview does not contain the current large empty area.
- The page reads as a case study with attached proof, not as an image gallery.
- Dark captures sit cleanly on both site themes.
- The viewer preserves the case-study title, evidence label, and caption context.

At phone width:

- The focused preview communicates the relationship named by its label.
- `View larger` is visible without horizontal scrolling.
- Fit mode provides orientation.
- Actual size mode supports deliberate two-direction panning.
- Closing returns the reader to the evidence they opened.

Keyboard-only:

- The opener has a visible focus indicator.
- Tab order reaches the viewer controls in a logical sequence.
- Focus cannot move behind the open dialog.
- Escape closes the viewer.
- Focus returns to the exact opener.

Content:

- No visible `Implemented in n8n` label remains.
- The map says `Workflow map`.
- Canvas labels match the exact table in this plan.
- Alert labels remain `What the team received`.
- The exact approved captions are present.
- The fifth architecture story remains unchanged.

## Release and rollback

Use `docs/BOOKING-MEDIA-RELEASE-RUNBOOK.md` after local acceptance. Preserve its
existing order:

1. Local visual approval.
2. Push the branch and open a pull request.
3. Review the Vercel preview on desktop and phone.
4. Merge into `main` with a merge commit.
5. Verify production.

Rollback remains a revert of the merge commit, with Vercel Instant Rollback as
the emergency first response. Never force-push or reset `main`.

## Stop conditions

Stop and ask Leo instead of inventing a decision when:

- a crop cannot make the named evidence readable without removing a node needed
  by the claim;
- the revised page still feels too long and an image would need to be removed;
- the other portfolio work lands first and creates a content or behavior
  conflict that cannot be resolved by keeping both sides;
- a caption fact no longer matches the booking workflow source;
- the Vercel preview differs materially from the local build;
- deployment would require a new dependency, service, permission, or hosting
  decision.

## Leo's review of the build

Leo reviewed the first build on 2026-09-27 and replaced two decisions. This
section overrides decisions 3 and 4 above wherever they conflict.

- Decision 4 is withdrawn. The page shows every canvas capture uncropped; the
  three preview files are deleted.
- Decision 3 is simplified. The viewer has no `Fit`, `Actual size`, or
  `Open original image` control. `Close` is the only control. The viewer opens
  magnified, filling its height at no more than natural size and no less than
  75 percent, below which node labels stop being readable, so a wide capture
  scrolls sideways. Clicking the image shows a fit-to-screen overview with a
  zoom-out cursor, and clicking again returns with a zoom-in cursor. When the
  whole capture already fits at natural size, there is nothing to toggle.
- The Slack alerts are cropped on the right to remove empty width that shrank
  their text, and each inline frame hugs its capture instead of stretching it.
