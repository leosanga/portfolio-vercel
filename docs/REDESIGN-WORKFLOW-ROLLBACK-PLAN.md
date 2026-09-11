# Portfolio Redesign Workflow and Rollback Plan

Status: Approved workflow. Current gate status is recorded in
[`REDESIGN-CURRENT-STATE.md`](./REDESIGN-CURRENT-STATE.md).
Last updated: 2026-09-11
Owner: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Strategy rationale: [`PORTFOLIO-REDESIGN-ANALYSIS.md`](./PORTFOLIO-REDESIGN-ANALYSIS.md)

## Purpose

This document defines how the redesign will be built, reviewed locally, committed, merged, and restored without destroying the current portfolio.

It does not authorize implementation. It establishes the safety workflow that the later implementation plan must follow.

## Non-negotiable constraints

- Preserve the current production implementation throughout design and review.
- Do not delete or destructively replace existing portfolio components, styles, assets, or content.
- Build the redesign in a separate Git branch and separate Git worktree.
- Keep the original working directory available for the current portfolio.
- Run the current and redesigned sites on separate localhost ports for side-by-side review.
- Do not push directly to `main`.
- Do not force-push, reset, bypass hooks, or use broad cleanup commands.
- Stage files explicitly. Do not use `git add -A` or another command that could include the HEIC master or unrelated user changes.
- Keep the original HEIC portrait master out of Git history.
- Require Leo's explicit visual approval before production cutover.
- Preserve at least two independent rollback paths after launch.

## Role assignment protocol

Before each substantive phase, state which senior roles govern the work and why
they are relevant. Apply their standards together rather than handing separate,
inconsistent decisions to each role.

| Phase or task                              | Required senior perspective                                         |
| ------------------------------------------ | ------------------------------------------------------------------- |
| Positioning, audience, and conversion      | Senior web strategist and senior conversion strategist              |
| Content architecture and user journeys     | Senior UX architect and senior content designer                     |
| Public copy and metadata                   | Senior conversion copywriter and technical SEO strategist           |
| Visual system and page design              | High-end digital product designer and senior UI/UX designer         |
| Asset selection and art direction          | Senior art director and senior digital product designer             |
| Motion and interaction                     | Senior interaction and motion designer                              |
| Technical specification and implementation | Senior frontend architect and senior frontend developer             |
| Responsive behavior and accessibility      | Senior accessibility engineer and senior frontend developer         |
| Performance review                         | Senior web performance engineer                                     |
| Testing and defect resolution              | Senior QA engineer and senior debugging engineer                    |
| Security, privacy, and data exposure       | Senior security-minded and privacy-minded engineer                  |
| Git, cutover, and rollback                 | Senior release engineer                                             |
| Final integrated review                    | Staff-level frontend reviewer and high-end digital product designer |

The task owner remains responsible for reconciling these perspectives into one
cohesive recommendation. Role assignment does not authorize additional product
scope, external actions, publication, deployment, or legal conclusions.

## Repository state recorded on 2026-09-10

- Repository: `https://github.com/leosanga/portfolio-vercel.git`
- Current branch: `main`
- Current commit: `de93ea4`
- `main`, `origin/main`, and `origin/HEAD` point to the same commit.
- `CLAUDE.md` has an existing user-owned modification.
- `AGENTS.md` is an existing user-owned untracked file.
- `docs/` contains the redesign planning documents.
- `portrait image.heic` is an untracked source master and must not be committed.

This is a dirty working tree by design. No future agent may discard, stash, stage, or commit these items as a group merely to obtain a clean status.

## Recommended isolation model

### Original worktree

Keep the current directory unchanged:

`C:\Users\Leo\Downloads\projects\portfolio-vercel`

This remains the reference copy of the current site during redesign review. Existing user changes remain where they are until Leo approves their handling.

### Redesign worktree

After the planning documents have been committed through an explicitly reviewed change, create a sibling worktree:

`C:\Users\Leo\Downloads\projects\portfolio-vercel-redesign`

Recommended branch:

`redesign/v2`

A Git worktree gives the redesign its own physical folder, branch, dependency state, and localhost process. Editing the redesign folder cannot overwrite files in the original portfolio folder.

### Baseline tag

Before implementation, create an annotated tag on the exact production commit being preserved. The provisional tag name is:

`portfolio-v1-baseline-2026-09-10`

At the current repository state, that tag would point to `de93ea4`. Confirm the commit again immediately before creating and pushing the tag. Do not move or recreate the tag after it is published.

## Important technical boundary

The redesign can be developed and reviewed without changing the current production worktree. Publishing the redesign at the existing `/` URL eventually requires the production entry point to reference the new implementation.

The cutover must therefore be a small, explicit, reversible change. It is not treated as permission to rewrite or delete the old implementation.

Recommended cutover behavior:

- Keep the existing `src/components/portfolio/` implementation intact.
- Keep the existing content locks intact.
- Build new work under a distinct `portfolio-v2` namespace.
- Change only the minimum route, metadata, and asset references required to make version 2 the homepage.
- Preserve version 1 through the baseline tag and retained branch.
- Do not keep a public `/legacy` route by default because duplicate public content creates maintenance and search-indexing problems.

## Proposed version 2 file boundaries

The implementation plan should prefer new files such as:

```text
src/
  components/
    portfolio-v2/
  assets/
    portfolio-v2/
  styles/
    portfolio-v2.css
  content/
    portfolio-v2/
```

Possible new route or preview entry names will be chosen during technical planning after confirming TanStack Start routing behavior. The route design must support local review without repurposing the production homepage during the review phase.

Existing files that should remain untouched through prototype review include:

- `src/components/portfolio/*`
- `src/assets/leo-portrait.jpg`
- `public/favicon.svg`
- `public/favicon.png`
- `public/apple-touch-icon.png`
- `src/routes/index.tsx`
- `src/routes/__root.tsx`
- `src/styles.css`

Generated routing files may change when a preview route is added. If TanStack route generation makes an additive preview impossible without touching generated files, the implementation plan must identify those files in advance. A generated-file update is acceptable only in the redesign worktree and must never be mistaken for a hand-authored replacement of the current site.

## Portrait source handling

`portrait image.heic` is the approved source master. It remains in the original worktree for now and must never be staged.

During asset implementation:

1. Read the HEIC master from its known local path.
2. Generate optimized derivatives inside the redesign worktree under new filenames.
3. Strip metadata and convert outputs to sRGB.
4. Compare the new derivatives with the current JPEG in local visual review.
5. Commit only the optimized derivatives after approval.
6. Leave the original HEIC outside Git history.

No agent may replace or delete the HEIC master as part of conversion.

## Planning commit before implementation

The current planning work should be committed separately from code. Before that commit:

1. Review the exact contents of `docs/`.
2. Inspect the user-owned `CLAUDE.md` modification and `AGENTS.md` file without assuming they belong in the same commit.
3. Stage only the explicitly approved planning files.
4. Confirm `portrait image.heic` is not staged.
5. Run the applicable documentation checks.
6. Show the staged diff to Leo before committing if requested.

Do not mix methodology files, portrait source files, or unrelated changes into a redesign planning commit.

## Local visual review workflow

### Side-by-side servers

Run the current portfolio from the original worktree and the redesign from the sibling worktree on different ports. The exact commands and ports must be confirmed against the package scripts during implementation planning.

Provisional convention:

- Current version: `http://localhost:3000`
- Redesign version: `http://localhost:3001`

Only one agent or user process should own each port. Server process IDs or session identifiers must be recorded so they can be stopped without killing unrelated processes.

### Review checkpoints

Each review round should cover:

- Browser tab title and favicon at practical tab sizes
- Hero composition and portrait crop
- First-screen role clarity and CTA prominence
- Selected project hierarchy
- Locked prior-work content integrity
- Mobile navigation and CTA access
- Typography, line lengths, and content density
- Motion purpose, duration, interruption, and reduced-motion behavior
- Demo and project-media behavior when those assets exist
- Keyboard navigation and visible focus
- Loading behavior and layout stability

### Required viewports

Review at minimum:

- `360×800`
- `390×844`
- `768×1024`
- `1024×768`
- `1440×900`
- A wide desktop viewport near `1920px`

Also review browser zoom at 200 percent, reduced motion, keyboard-only interaction, and touch-sized targets.

### Feedback loop

1. Start the redesign localhost.
2. Leo reviews the current and redesigned sites side by side.
3. Record feedback as decisions, defects, or experiments.
4. Update the authoritative current-state document.
5. Make one coherent revision batch.
6. Re-run focused verification.
7. Commit the approved batch with a descriptive message.
8. Repeat until Leo explicitly approves the visual result.

Do not combine multiple unreviewed visual directions in one commit. Do not declare a direction approved merely because it renders without errors.

## Authoritative current-state record

At implementation start, create one current-state file:

`docs/REDESIGN-CURRENT-STATE.md`

It should contain only live state:

- Current phase
- Current branch and worktree
- Latest approved commit
- Localhost commands and ports
- What Leo approved in the latest review
- Open defects and decisions
- Checks last run and their result
- Exact next action
- Required read order for the next session

Other documents should point to this file rather than duplicating live status.

## Commit strategy

Use small, coherent commits that leave the redesign reviewable. A provisional sequence is:

1. `docs: establish portfolio redesign specifications`
2. `chore: scaffold isolated portfolio v2 preview`
3. `feat: add portfolio v2 content structure`
4. `feat: add portfolio v2 visual system`
5. `feat: add portfolio v2 hero and navigation`
6. `feat: add portfolio v2 project presentation`
7. `feat: add portfolio v2 conversion section`
8. `feat: add portfolio v2 motion and responsive behavior`
9. `feat: add optimized portrait and identity assets`
10. `fix: resolve accessibility and visual review findings`
11. `feat: cut over portfolio homepage to version 2`

The actual commits should follow the work rather than forcing artificial boundaries. Every committed milestone should pass its proportional checks or clearly record an inherited baseline failure.

Git rules:

- Stage explicit paths only.
- Inspect `git diff --staged` before every commit.
- Never use `--no-verify`.
- Never force-push `main` or the redesign branch.
- Never rewrite published history.
- Keep the redesign branch after merge until the redesign has been stable in production.
- Do not delete the baseline tag.

## GitHub workflow

No GitHub push occurs during design, localhost review, or revision. Local commits on `redesign/v2` provide checkpoints without triggering a remote deployment integration.

After Leo approves the finished localhost version:

1. Run the complete local verification suite.
2. Review the entire branch diff and exact file manifest.
3. Confirm that `origin/main` has not changed unexpectedly during the redesign.
4. Confirm whether pushing a branch automatically creates a Vercel preview deployment.
5. Ask Leo for explicit approval to push the completed `redesign/v2` branch.
6. Push the completed branch to `origin`.
7. Open a pull request into `main`.
8. Use the pull request for the final file list, diff, checks, and approval record.
9. Ask Leo separately for approval to merge and trigger the production cutover.
10. Prefer a merge commit so the complete redesign can be reverted as one merge while preserving the branch's individual commits.
11. Keep the pull request and branch after merge for audit and restoration.

No commit or push is authorized merely by the existence of this plan.

## Local-only development boundary

Until Leo declares the redesign finished:

- Do not run `git push`.
- Do not run the Vercel CLI.
- Do not create a Vercel preview deployment.
- Do not modify Vercel project settings.
- Do not merge anything into `main`.
- Do not change the live production site.
- Do not use a remote review URL as a substitute for localhost review.
- Use local Git commits and the sibling worktree for all checkpoints.

If any tool, GitHub integration, or hosting automation would create a remote deployment, stop before triggering it and report the risk to Leo.

## Verification gates

### Before each review commit

- Type checking
- Linting, with known baseline failures separated from new failures
- Focused unit or integration checks where behavior warrants them
- Local visual review at the affected viewports
- Keyboard and reduced-motion checks for affected interactions

### Before pull request approval

- Production build
- Full route and link review
- Responsive screenshot set
- Accessibility review
- Metadata, favicon, and social-sharing preview review
- Image format, intrinsic-size, and file-size review
- No unexpected changes to version 1 files
- No HEIC master or confidential source artifact staged
- Locked content comparison

### Before production cutover

- Leo's explicit approval of the localhost version
- Clean pull-request diff with an exact file manifest
- All required local checks passing, with baseline failures identified separately
- Baseline tag verified at the intended version 1 commit
- Version 1 implementation still present in Git history and unchanged on its preserved reference
- Completed responsive, accessibility, metadata, favicon, asset, and performance review
- Locked content comparison showing no unauthorized changes
- Explicit confirmation that the HEIC master and confidential source artifacts are absent from the commit
- Separate approval from Leo to merge and trigger the live deployment

## Approval gates

This section defines gate meaning. The authoritative live gate status is kept
in [`REDESIGN-CURRENT-STATE.md`](./REDESIGN-CURRENT-STATE.md).

### Gate 1: start local implementation

Requires approved content, visual, motion, and implementation specifications. This authorizes local branch creation, local worktree creation, local dependency installation within scope, local servers, file changes in the redesign worktree, and local commits.

It does not authorize a GitHub push or any Vercel action.

### Gate 2: approve the finished localhost redesign

Requires Leo to review the completed site locally and confirm that no further design changes are required before remote review.

It authorizes the final local verification pass. It does not itself authorize a push.

### Gate 3: publish the completed branch to GitHub

Requires a clean final diff, passing local checks, and Leo's explicit push approval. Pushing may trigger a Vercel preview if the repository integration is configured that way, so that behavior must be confirmed before the push.

It does not authorize merging into `main` or changing the live site.

### Gate 4: production cutover

Requires Leo's separate merge approval after the GitHub branch and pull request have been reviewed. Merging to `main` may trigger the live Vercel deployment.

## Rollback strategy

### During local design

Rollback options:

1. Check out any earlier local redesign commit in the sibling worktree.
2. Revert a specific redesign commit with a new revert commit.
3. Compare against the unchanged original worktree running on its own localhost port.
4. Restore any version 1 file from the baseline tag without touching unrelated changes.

The preferred operation is `git revert`, which preserves history. Do not use `git reset --hard`.

### After the completed branch is pushed but before merge

The live site still uses `main`. Rollback requires no production action because the redesign exists only on its branch. Additional fixes can be committed locally and pushed only with approval.

### After production cutover

Maintain at least these restoration paths:

1. Revert the redesign merge commit on `main` with a new commit, then deploy that revert.
2. Restore the version 1 tree from the immutable baseline tag on a new recovery branch and merge it through review.
3. Use the hosting provider's previous-deployment rollback only as an emergency operational measure, followed by a Git revert so the repository remains the source of truth.

Never roll back production by force-pushing an old commit or rewriting `main` history.

## File preservation policy

`Do not overwrite existing files` means:

- The original worktree remains physically unchanged during redesign development.
- Version 1 source files are not deleted or destructively rewritten to create version 2.
- Version 2 receives new component, style, content, and asset namespaces wherever practical.
- Any unavoidable entry-point changes are isolated to the final cutover commit and listed before approval.
- Git history, the baseline tag, and the retained redesign branch preserve every previous version.
- The HEIC source master remains outside committed history.

An absolute rule forbidding every edit to an existing entry file would prevent the new homepage from ever becoming the `/` route. The safe interpretation is additive development plus a minimal, reviewed, reversible cutover. If Leo instead requires zero existing-file edits even at launch, the redesign must publish at a different URL and cannot replace the current homepage.

## Recovery verification

Before production merge, perform a rollback rehearsal locally:

1. Start the approved version 2 branch and record the working commit.
2. Start the version 1 baseline in a temporary worktree.
3. Confirm version 1 installs, builds, and runs from the baseline reference.
4. Confirm version 2 can be restored after the rehearsal.
5. Record the commands and results in `docs/REDESIGN-CURRENT-STATE.md`.

This proves that rollback is operational rather than merely theoretical.

## Final handoff requirements

Before ending implementation, the handoff must state:

- Current branch and commit
- Version 1 baseline tag
- Exact files added and existing entry files changed
- Localhost start command
- Checks run and results
- Known limitations
- Rollback commands appropriate to the current phase
- Whether anything has been pushed to GitHub
- Whether any Vercel deployment exists
- Whether production has changed
- The next approval gate
