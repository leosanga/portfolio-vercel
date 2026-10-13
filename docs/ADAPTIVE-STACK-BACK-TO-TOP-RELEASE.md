# Adaptive project stack and smooth back-to-top release

2026-10-14. Leo explicitly requested deploying these two approved changes while excluding the hero experiment. Goal mapping: readable proof, responsive accessibility and maintainable presentation. Root applies frontend architecture, interaction/accessibility and release-engineering review. No external reviewer or Claude enforcement is claimed.

## Reviewed scope

Verified main and successful production base: `514d37922f22a627d9e72809ae22a673462992b3`, deployment `6906667172`, immutable URL `https://leosanga-n7gp0py7p-leo-c2f6.vercel.app`.

Integrate the reviewed study26 adaptive project cards and study20 native smooth back-to-top treatment. The authoritative local designs and actual observations remain in `catalog-identity-integration/docs/motion-upgrade/specs/26-adaptive-homepage-presentation.md` and its review26, with typed compact presentation from study25. This packet defines production wiring, not a new art direction.

One set of cards measures the original layout first. Retain it when it fits. At eligible widths of at least1440 px, trial compact only if the original cannot fit; retain compact only if its full measured budget fits. Otherwise retain the original readable list. Preserve the existing stack controller, project order, holds, 3D recession, proof ownership and original tall-screen copy. Preserve post-commit keyboard correction. Scrolling never starts a presentation trial. Reduced motion/forced colors retain original static behavior. Existing proof lifecycle may restart after a resize; do not promise resize phase continuity.

Compact-only copy already reviewed: Booking heading `A failed booking stops confirmation.` with empty repeated boundary/outcome heading; HubSpot heading `14 assigned. Only 8 measured.`. Full case studies, catalog and source summaries retain their copy. No new public claim.

Keep the native `Back to top` anchor and its `#top` fragment, default history and focus behavior. Before ordinary unmodified activation, enable a temporary root attribute whose CSS requests native smooth scrolling even with Lenis active. Clear on scrollend or a bounded timeout. Wheel, pointerdown, keydown, preference change and route cleanup interrupt/reset the enhancement. Reduced-motion/forced-color/no-support cases stay native instant. Do not replace Lenis, enable its anchor handling, or smooth every link.

Affected source files:

- `src/components/portfolio-v2/CompactCaseStackV2.tsx`: integrate adaptive selection and focus correction.
- `src/components/portfolio-v2/useCasePresentation.ts`: production-named selector from study26.
- `src/content/portfolio-v2/homepage-proof-presentation.ts`: typed compact overrides from study25.
- `src/styles/homepage-case-presentation.css`: compact CSS only, production scope names.
- `src/styles/portfolio-v2.css`: import compact CSS and scoped native back-to-top rules.
- `src/components/portfolio-v2/useSmoothBackToTop.ts`: production-named native anchor enhancement.
- `src/components/portfolio-v2/PortfolioUtilityDockV2.tsx`: invoke the hook once.

No hero, portrait, palette, source stack controller, routes, package/lockfile, catalog, case-study or generated file changes. Do not import local study code or carry any study hero selectors into production. Prior prototype files and unrelated worktrees stay untouched.

## Execution and review

Use apply_patch. Lower-model executor owns only the seven source files above; root owns this packet, state, checks, browser evidence, commits, PR and deployment. Executor compares production source before adapting paths/names, returns source findings, and does not commit/build/browser/deploy. Root reconciles the result and a cold source review, then runs frozen install, TypeScript, changed-file lint, required script checks and full production build. Separate inherited failures from new failures.

Before publishing, verify normal wide compact stack, tall original stack, narrow original list, keyboard release/focus, per-card holds and final release to project4, reverse scroll, proof ownership, smooth back-to-top from home/catalog/case page and ordinary fragment behavior. Verify actual preview at exact candidate SHA, full19-sample CUA release profile and validator. Preference/touch/zoom checks must be reported accurately, never inferred from geometry. The unchanged source scripts remain the gate.

Commit only approved files. Push branch, create scoped PR, bind successful immutable Vercel preview to candidate SHA, inspect it, collect fresh evidence outside Git, validate and recheck main/production. Leo's direct deployment request covers this scoped release after checks pass. Merge locked to validated SHA, verify matching production deployment and canonical site. No direct main push or hook bypass.

Rollback: promote deployment6906667172, then revert the release merge through the normal PR workflow. Recheck retained deployment availability before using that route. A Git revert and retained deployment are separate rollback paths.

## Limits

Do not declare technical checks a visual-design approval. This release uses the previously reviewed cards and user-requested back-to-top behavior. Full physical preference/touch/zoom coverage may remain explicitly unverified if the available browser surface cannot provide it. New relevant failures block merge until corrected/revalidated. No new speculative design, 100-entry catalog retest or hero work.

## Integration review receipt

Root collected the bounded executor and independent source reviewer. Root corrected route cleanup to interrupt native scrolling and guarded the new presentation selector's media API setup. The unchanged baseline stack hook still assumes a modern browser; this is not a whole-application unsupported-API certification.

The first actual production-code rendering exposed an import-order difference from the prototype: later baseline CSS overrode equal-specificity compact rules, leaving the stack in its readable original fallback. Root strengthened every compact selector with the actual root's base and modifier classes. The same local viewer then settled at1645 x860 into compact cards489/528/532 px with enhancement enabled. At1440 x1214 it returned to the original full headings and cards800/702/717 px with enhancement enabled. This is a cascade correction, not an approved-layout change. Production hero, source stack controller, Lenis, packages and routes have no authored changes.

Actual back-to-top activation from the9441 px footer retained the native#top fragment, enabled smooth behavior, and then reached scrollY0 with the temporary attribute cleared. Frozen installation, TypeScript and five-file normalized lint pass. Existing graph/presentation/browsing/navigation/Identity checks, twelve release contract/collector tests and local catalog SSR/alias/page checks pass. The full production build passes; complete exact-preview evidence and canonical verification still follow this receipt. Physical touch/preferences/200% zoom are not certified by these checks. Generated route output is excluded from the commit.

The first exact-preview19-sample gate failed two unchanged boundary conditions. Root reproduced both on immutable production: innerWidth1023 while max-width1023 is false, and359 x650 while max-width359/max-height650 are false. The browser reports rounded integer viewport sizes while matching fractional CSS sizes. Root corrected only the Approach query to width <1024 and the tiny dock exception to width <360 / height <651. This implements the existing locked breakpoints, rather than changing their design or weakening the validator. Other1023/359 rules and hero styles remain unchanged. The failing artifact is retained separately; a new candidate requires complete fresh evidence. Hosted catalog SSR/alias/page checks also pass after enabling network access for the check command.

Decisions this turn:

- Release only approved adaptive projects and native smooth back-to-top.
- Base isolated branch on exact current production.
- Preserve hero and all unrelated work.
