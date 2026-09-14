# Codex guidance for portfolio-vercel

This is Leo's canonical live portfolio at leosanga.vercel.app. It is a React 19,
TypeScript, TanStack Start, Vite 8, Tailwind CSS v4 application deployed to
Vercel.

## Start here

1. Read `CLAUDE.md` for the durable architecture, accepted decisions, rejected
   approaches, and known verification baselines.
2. When work touches identity, color, typography, the workflow mark, imagery,
   social graphics, or another branded artifact, read
   `../leo-sanga-brand/AGENTS.md`, then its goal, current state, playbook, and
   relevant application guide.
3. For non-trivial build work, read
   `C:\Users\Leo\.claude\build-playbook.md` before implementation.
4. Before drafting published copy, read `C:\Users\Leo\.claude\voice.md` and ask
   for any missing evidence or rationale.
5. Read `PIPELINE_DIAGRAM_PLAN.md` only when touching project cards,
   `FlowDiagram.tsx`, project flow data, or `.flow-*` CSS.
6. Read `ANIMATION_PLAN_PROMPT.md` only when touching motion, measured sections,
   focus behavior, or accessibility. It is an executed architecture record, not
   a plan to rerun.

There is no documented active next feature. Establish the desired portfolio
outcome and review the design before making a non-trivial change.

The sibling brand repository governs portable identity decisions at working
version `0.2.0`. This portfolio keeps authority over its layout, behavior,
content evidence, source files, testing, and release process. Brand consultation
never authorizes an automatic portfolio adoption or deployment.

Preserve Leo's current uncommitted `CLAUDE.md` update identifying this repository
as the canonical live portfolio. Do not include it in an unrelated Codex setup
commit.

## Content and structure

- `src/components/portfolio/data.ts` is the source of truth for most copy and
  project data. Check it before searching JSX.
- Do not hand-edit `src/routeTree.gen.ts`.
- Keep `skills`, `approach`, `projects`, and `contact` synchronized across nav
  data, section IDs, and their consumers.
- Do not invent hard parts, metrics, outcomes, or implementation details.
- Project evidence from prior employers is NDA constrained. Do not suggest or
  add unavailable screenshots, recordings, repositories, live links, client
  names, real field names, thresholds, or scoring weights.
- Keep architecture diagrams at pattern level. The HubSpot RevOps sandbox is the
  documented exception to the prior-employer evidence constraint.

## Interaction and layout invariants

- Keep ID-bearing `<section>` elements untransformed and untransitioned because
  scrollspy measures their live bounding boxes.
- Put reveal classes on stable inner wrappers, never on an element containing a
  resizable `<details>`.
- Keep initial hidden reveal state inside the reduced-motion and feature-support
  guards so content cannot remain invisible.
- Preserve the center-line `getBoundingClientRect()` scrollspy algorithm unless
  a reviewed design explicitly replaces it.
- Do not animate disclosure height.
- Tailwind v4 hover translation uses the `translate` property, so transition
  lists must name `translate` rather than `transform`.
- Keep the RevOps card on hold unless Leo explicitly reopens it.
- Do not reintroduce the rejected generic pattern diagram, `FlowStrip`, open
  also-built list, `overview`, or separate `impact` block.

## Commands and verification

```text
bun install
bun run dev
bun run build
bun run preview
bun run lint
```

- There is no configured test suite.
- Run the local TypeScript binary with `./node_modules/.bin/tsc.exe --noEmit` on
  Windows. Plain `npx tsc` is not reliable here.
- The lint baseline contains CRLF Prettier failures and two documented
  `react-hooks/exhaustive-deps` warnings in `useActiveSection.ts`. Separate those
  known failures from new lint errors.
- For visual changes, verify the relevant desktop and narrow viewport behavior,
  keyboard focus, reduced motion, disclosure behavior, and scrollspy.

## Git and decisions

- Preserve unrelated worktree changes and stage only the approved task.
- Never bypass Git hooks.
- For non-trivial changes, present the design and exact published copy before
  implementation.
- End write turns with a `Decisions this turn:` block.
