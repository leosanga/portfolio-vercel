# Booking Case-Study Media: Release and Rollback Runbook

Status: UX revision built and verified locally, awaiting Leo's local visual
review. Nothing is pushed or deployed.

Date: 2026-09-27

Active senior role: release engineer. This runbook follows the existing
[`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md): a
separate worktree and branch, an immutable tag on the production commit, a merge
commit into `main`, rollback by revert, and `main` history never rewritten.

The design, claims, and captions are recorded in
[`N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md`](./N8N-BOOKING-AGENT-CASE-STUDY-SPEC.md),
section `Media release, 2026-09-27`.

The implementation-ready response to the visual review is
[`BOOKING-MEDIA-UX-REVISION-PLAN.md`](./BOOKING-MEDIA-UX-REVISION-PLAN.md).
It replaces the first pass's repeated labels, raw-image primary interaction,
desktop-wide inline captures, and long captions. Read it before changing or
releasing the media work.

## Where everything is

| Item                                                | Value                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Production commit (what leosanga.vercel.app serves) | `887e845` on `main`, equal to `origin/main`                      |
| Rollback anchor tag, local only                     | `pre-booking-media-2026-09-27` on `887e845`                      |
| Worktree                                            | `C:\Users\Leo\Downloads\projects\portfolio-vercel-booking-media` |
| Branch                                              | `feature/booking-case-study-media`, local only                   |
| Local preview                                       | `http://127.0.0.1:8090/projects/n8n-booking-agent`               |
| Live page to compare against                        | `https://leosanga.vercel.app/projects/n8n-booking-agent`         |
| Source assets                                       | `n8n-booking-agent` commits `7316b97` and `61c146c`, local only  |

The original `portfolio-vercel` worktree holds another session's uncommitted
work and was not touched. See `Merge order` below.

## Gates

Each gate needs Leo's explicit approval. Approval of one does not approve the
next.

1. **Build and visually review the UX revision locally.** Current gate.
2. **Push the branch and open a pull request.** Vercel builds a preview
   deployment for the pull request. The live site does not change.
3. **Review the Vercel preview** on a phone and a desktop.
4. **Merge into `main` with a merge commit.** Vercel deploys production.
5. **Verify production** with the checks in `After release`.

This runbook does not treat the existence of the revision plan as release
authorization. Leo's later instruction must explicitly authorize the remote and
deployment actions Claude should perform.

The two booking-repository commits are pushed separately and are not needed by
the site, which carries its own copies of the assets.

## Task A: restart the local preview

Only needed if the preview at port 8090 has stopped, for example after a
restart.

1. Open PowerShell and go to the worktree:

   ```powershell
   cd C:\Users\Leo\Downloads\projects\portfolio-vercel-booking-media
   ```

2. Build the site:

   ```powershell
   bun run build
   ```

3. Serve the build:

   ```powershell
   bunx vite preview --port 8090 --strictPort --host 127.0.0.1
   ```

4. Open `http://127.0.0.1:8090/projects/n8n-booking-agent` in the browser.

### Test

- Step 2 ends with lines containing `built in` and `You can preview this build`.
- Step 3 prints a local URL on port 8090 and keeps running. Leave the window open.
- After the UX revision, the map says `WORKFLOW MAP`, the canvas figures use
  stage-specific labels, every figure opens the in-page viewer, and a screenshot
  remains under each of the four situations in section 03.
- If step 3 says the port is in use, a preview is already running. Open the URL
  instead.
- If step 2 fails with a native module error, run it from a normal PowerShell
  window rather than from inside a restricted tool.

## Merge order

The other session's uncommitted work in `portfolio-vercel` edits four of the same
files: `BookingAgentCaseStudyV2.tsx`, `booking-agent.ts`, `types.ts`, and
`portfolio-v2.css`, plus `ASSET-SOURCES.md`. Whichever lands on `main` second
must be updated first. If this branch is second:

1. Merge the new `main` into this branch in the worktree, not a rebase, so the
   reviewed commits keep their identity.
2. Resolve conflicts by keeping both sides. This branch adds figures inside
   existing chapters, one CSS block before `.pv2-case-adaptability__list`, one
   type at the end of `types.ts`, and one section at the end of
   `ASSET-SOURCES.md`.
3. If the other work renumbers the case-study sections, the figures follow their
   chapters and need no change.
4. Rebuild, rerun the checks, and review the preview again before gate 2.

## Rollback

### Before the merge

Nothing is live. The branch and worktree can be deleted without affecting the
site.

### After the merge

Use the first option that fits.

1. **Emergency, fastest: Vercel Instant Rollback.** Restores the previous
   production deployment in seconds, without a new build. Vercel then stops
   promoting new pushes to production until the rollback is undone, so follow it
   with option 2.
2. **Standard: revert the merge commit.** Keeps Git as the source of truth and
   redeploys the pre-release page through the normal pipeline.
3. **Full restore from the tag.** Only if the revert itself cannot be applied
   cleanly. Build a recovery branch from `pre-booking-media-2026-09-27` and merge
   it through review.

Never force-push or reset `main`.

## Task B: emergency rollback in Vercel

1. Open the Vercel dashboard and select the `portfolio-vercel` project.
2. Open `Deployments`.
3. Find the production deployment listed before the merge. Its commit is the
   one before the merge commit.
4. Open its menu (`...`) and choose `Instant Rollback`, then confirm.
5. Go straight on to Task C, which also restores automatic production deploys.

### Test

- `https://leosanga.vercel.app/projects/n8n-booking-agent` shows no
  `IMPLEMENTED IN N8N` label within a minute. Use a private window to avoid the
  browser cache.
- If `Instant Rollback` is not offered, that deployment is not eligible. Use
  Task C alone.

## Task C: revert the release

1. Open PowerShell in the original worktree:

   ```powershell
   cd C:\Users\Leo\Downloads\projects\portfolio-vercel
   ```

2. Update `main`:

   ```powershell
   git switch main
   git pull --ff-only
   ```

3. Find the merge commit:

   ```powershell
   git log --merges --oneline -5
   ```

4. Revert it, replacing `MERGE_SHA` with the hash of the booking media merge from
   step 3:

   ```powershell
   git revert -m 1 MERGE_SHA
   ```

5. Push the revert:

   ```powershell
   git push origin main
   ```

6. If Task B was used, return to the Vercel dashboard, open the new production
   deployment, and choose `Promote` (or `Undo Rollback`) so automatic deploys
   resume.

### Test

- Step 3 lists a line mentioning `booking-case-study-media`.
- Step 4 opens no editor and prints a new commit whose message starts with
  `Revert`.
- Step 5 prints `main -> main`. Vercel starts a production build within a
  minute.
- The live page then matches `pre-booking-media-2026-09-27`: no screenshots, no
  map, four architecture stories.
- If step 2 refuses with local changes, the other session's work is still
  uncommitted there. Stop and ask before touching it. Do the revert from a
  separate clean worktree instead.
- If step 4 reports a conflict, a later commit built on this release. Run
  `git revert --abort` and ask for help rather than resolving it under pressure.

## After release

- The live page returns 200 and shows every figure and the map.
- `https://leosanga.vercel.app/` is unchanged.
- The page requests no host other than `leosanga.vercel.app`.
- On a phone, the map is still a numbered list. Each evidence preview opens the
  in-page viewer, Fit and Actual size work, Escape and Close return focus to the
  opener, and the original-image link remains available inside the viewer.
- Push the local tag so the rollback anchor survives a fresh clone:
  `git push origin pre-booking-media-2026-09-27`.
- Remove the worktree when the branch is merged:
  `git worktree remove ..\portfolio-vercel-booking-media`.

## Checks run on 2026-09-27

- TypeScript: passed.
- Production build: passed.
- Server-rendered HTML contains all seven figures, the inline map, and every
  caption before JavaScript runs.
- Headless Chrome 153 on the 11-viewport matrix from 1920 by 1080 to 320 by 568,
  in the light and dark themes: 22 of 22 runs with no horizontal overflow, no
  unloaded image, no console error, and no request outside the local server.
- Reduced motion: every figure present.
- Below 768 px the map drawing is replaced by its numbered stage list.
- `n8n-booking-agent` unit suite: 405 of 405 pass, including the map's
  connection test.

## Checks run on the UX revision, 2026-09-27

- TypeScript and the production build: passed.
- ESLint on every changed file: no problem other than the known CRLF baseline.
  The full `bun run lint` did not finish in 10 minutes on this machine, likely
  because `.vercel/output` is not in the ESLint ignore list; it was stopped.
- Prettier: every changed file passes.
- `node scripts/booking-case-study-media-qa.mjs` (Headless Chrome 153): 0
  failures. It opened the viewer from both openers of all seven figures in all
  22 theme and viewport runs, and covered Fit, Actual size, focus return,
  focus containment, 200 and 400 percent text and page zoom, reduced motion,
  forced colors, the no-JavaScript page, console errors, and outside requests.
- The three previews decode pixel-identical to their source rectangles.
