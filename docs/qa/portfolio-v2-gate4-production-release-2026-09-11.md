# Portfolio Version 2 Gate 4 Production Release

Date: 2026-09-11

Status: Gate 4 passed. Portfolio version 2 is live on the canonical production
URL.

## Authorization and release boundary

Leo approved Gate 4 after reviewing the pull request and Vercel Preview. The
approved action was to merge pull request 1 and allow the connected Vercel
production deployment.

- Pull request: `https://github.com/leosanga/portfolio-vercel/pull/1`
- Source branch: `redesign/v2`
- Source head: `cc78878f7abc1c21f0988b51a1ea9d354a1b4660`
- Production base before merge: `de93ea40bddbcf08cce6bb391bf6df1e5e0e6dd2`
- Merge strategy: merge commit
- Production merge commit: `b0bbd04cd567711dd6562083ef6f8c4830db0cbd`
- Immutable version 1 tag: `portfolio-v1-baseline-2026-09-10`

The source branch and baseline tag remain available. No force push, history
rewrite, direct push to `main`, or branch deletion occurred.

## GitHub and Vercel results

- Pull request 1 reported `CLEAN` and `MERGEABLE` immediately before merge.
- The Vercel and Vercel Preview Comments checks passed on the reviewed head.
- GitHub reports pull request 1 as merged by `leosanga` at
  `2026-09-11T02:37:22Z`.
- The application changes entered `main` through merge commit `b0bbd04`.
- Vercel production deployment `6385275062` was created for that exact merge
  commit and completed successfully.
- Deployment URL: `https://leosanga-po6wvj3jq-leo-c2f6.vercel.app`
- Canonical production URL: `https://leosanga.vercel.app/`

## Production smoke checks

- Canonical homepage: 200
- Canonical response: no preview `X-Robots-Tag: noindex` header
- Private `/redesign` route: 404
- Page title: `Leo Sanga | Systems Engineer, Integration & Automation`
- Canonical link: `https://leosanga.vercel.app/`
- Open Graph and Twitter image:
  `https://leosanga.vercel.app/portfolio-v2/social/leo-sanga-portfolio-v2.jpg`
- Production social image: 200, `image/jpeg`, 78,042 bytes

These are post-deployment network and server-rendered metadata checks. The
complete responsive, accessibility, interaction, privacy, performance, and
rollback evidence remains in the Gate 2 and Gate 3 QA records.

## Preserved recovery paths

1. Revert merge commit `b0bbd04` through a reviewed pull request and allow
   Vercel to deploy the revert.
2. Create a recovery branch from
   `portfolio-v1-baseline-2026-09-10`, verify it, and merge it through review.
3. Use Vercel's previous deployment only for an emergency operational rollback,
   followed by a Git revert so Git remains the source of truth.

Do not force-push `main`, move the baseline tag, or delete `redesign/v2` during
the stabilization period.

## Known test limits

Firefox, Apple Safari, VoiceOver, iOS Safari, and Android Chrome were not
available in the test environment. Chrome and Edge passed the required local
matrix before release. Leo's Windows screen-reader review also passed before
Gate 3.

## Post-release state

The redesign goal is achieved and all four release gates are complete. The next
action is a final visual confirmation on the canonical URL and routine
monitoring. Any new design or content request begins as a separately scoped
change.
