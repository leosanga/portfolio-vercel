# Portfolio release regression audit

Date: 2026-10-01. Status: visual corrections deployed through PR 12; prevention
integration verified and approved for a separate documentation/tooling release.
Authoritative current state: ../REDESIGN-CURRENT-STATE.md.

## Scope and roles

Leo requested an audit of deployments after reporting the Approach laptop
layout and mobile floating-dock regressions. Review the production deployment
chain for the version 2 portfolio, with detailed runtime/source tracing for the
recent Salesforce, Approach, credibility, and corrective releases. Older releases
receive source/metadata review where no contemporaneous browser evidence exists;
do not describe historical source review as historical runtime verification.

Roles: senior release engineer, QA/debugging engineer, frontend architect, and
accessibility engineer. The audit is against the approved goal, visual and
responsive specifications, QA acceptance plan, and release/rollback plan.

## Findings established so far

| Item | Evidence | Finding |
| --- | --- | --- |
| Dock before Salesforce | CSS at ac7feea and responsive spec lines 265-270 | Fixed from 360px upward; document flow only below 360px on short screens |
| Salesforce release | ac7feea..8948e29 CSS diff | Changed the exception from max-width 359px and max-height 650px to all max-width 767px |
| Approach release | 956310e CSS plus published c6238e2 | Moved the prior 1024px horizontal boundary to 1280px |
| Reported laptop symptom | Live DOM at 1262px and 1280px | Narrow vertical copy column below 1280px, five horizontal columns above |
| Credibility follow-up | PR 9, e7db344, merge 37d5b76 | Changed only credibility strings and last-row phone columns; did not introduce either reported regression |
| Approach correction | PR 10, c60f2d3, merge e48a74c | Restores horizontal layout from 1024px; live 1262px DOM confirms five columns, exact copy, no overflow |
| Release checks | Current-state verification records, GH/Vercel statuses | Build/deploy success and geometry checks were recorded without catching the responsive art-direction and inherited-dock mismatch |

The existing QA plan already requires intermediate resizing, visual acceptance,
input-mode checks, and truthful coverage gaps. These were execution failures,
not evidence that those principles were absent. Specialist source reviews were
not substitutes for integrated visual inspection. The recent preview checks were
hosting build statuses; they were not browser inspection of the hosted preview.

The Salesforce release also added a conflicting guideline telling implementers
to move the shared rail after the footer at phone width if it obscures content.
That conflicted with the existing persistent-dock responsive specification. The
failure was both incomplete enforcement and contradictory durable guidance.
The local guideline correction now preserves the approved boundary and requires
explicit product approval for any other dock relocation.

scripts/portfolio-v2-browser-qa.mjs collected geometry but originally had no
assertions or failing exit status. Its dock sample recorded horizontal bounds,
not fixed positioning, vertical visibility, or persistence across scrolling. An
offscreen static dock could avoid overlap and still produce a successful run.
The media-specific booking collector has assertions, but that does not make the
homepage collector a release gate. No claim is made that the collector ran during
the recent corrective releases; runtime checks used CUA.

## Complete recorded deployment inventory

GitHub returned 35 production deployment records, including today's dock fix:
20 version 2 records and 15 legacy records. Source checks cover the dock CSS at
every version 2 release. Version 1 does not contain this shared dock or the new
Salesforce close. This is a deployment/source inventory, not a claim that every
historical hosted build received fresh runtime, accessibility, or approval audit.
Public Git and tracked decision documents cannot reconstruct private session
approval history or an uncommitted earlier design.

| UTC date | Deployment | SHA | Release | Dock source |
| --- | --- | --- | --- | --- |
| Oct 1 | 6777924755 | 144fee5 | PR 11 dock correction | Tiny exception only |
| Oct 1 | 6777615117 | e48a74c | PR 10 laptop correction | All phones static |
| Oct 1 | 6777447628 | 37d5b76 | PR 9 credibility wording | All phones static |
| Sep 30 | 6770353792 | c6238e2 | PR 8 Approach and loop | All phones static |
| Sep 30 | 6754327539 | 8948e29 | PR 7 Salesforce | All phones static introduced |
| Sep 28 | 6716780084 | ac7feea | Executive reporting visual | Tiny exception only |
| Sep 28 | 6713894832 | a2db4c8 | Ticket lifecycle visual | Tiny exception only |
| Sep 28 | 6707885228 | 45705ad | Credibility route | Tiny exception only |
| Sep 28 | 6703709600 | 227c7a3 | PR 5 booking layout | Tiny exception only |
| Sep 28 | 6702531790 | d4c375a | Outbound visual | Tiny exception only |
| Sep 27 | 6696404165 | 76bab9d | Qualification visual | Tiny exception only |
| Sep 27 | 6695478732 | f74cab4 | Featured label | Tiny exception only |
| Sep 27 | 6692772218 | 92e4218 | HubSpot release record | Tiny exception only |
| Sep 27 | 6692734051 | debe80d | HubSpot case study | Tiny exception only |
| Sep 27 | 6688376760 | 48cdd15 | PR 4 booking media | Tiny exception only |
| Sep 21 | 6562366504 | 887e845 | Booking proof copy | Tiny exception only |
| Sep 16 | 6472103159 | 630e905 | Booking case study | Tiny exception only |
| Sep 11 | 6385365045 | 33b775a | PR 3 release docs | Tiny exception only |
| Sep 11 | 6385332888 | bcf249f | PR 2 release docs | Tiny exception only |
| Sep 11 | 6385275062 | b0bbd04 | PR 1 version 2 cutover | Tiny exception only |
| Aug 21 | 6014649991 | de93ea4 | Also built framing | Legacy |
| Aug 21 | 6014557186 | 7fc3b84 | Build-first solutions copy | Legacy |
| Aug 19 | 5980532588 | 8f6be47 | Reporting stack copy | Legacy |
| Aug 19 | 5980499398 | 45835b5 | Hero and CTA polish | Legacy |
| Aug 19 | 5975482591 | e8e48e5 | Project diagrams and copy | Legacy |
| Aug 18 | 5968745684 | e28b6cb | Competency copy merge | Legacy |
| Aug 18 | 5964826926 | 16ffc9e | Architecture/lint docs | Legacy |
| Aug 18 | 5961269113 | 2ea6a0b | Accessibility/motion polish | Legacy |
| Aug 16 | 5935790428 | 103a80f | Calendar CTA destination | Legacy |
| Aug 16 | 5935412121 | fff4273 | Hero copy | Legacy |
| Aug 16 | 5931138548 | 88deac2 | Hero copy | Legacy |
| Aug 16 | 5928070819 | 682d81f | Systems positioning | Legacy |
| Aug 16 | 5927509774 | 9459e60 | Footer copy docs | Legacy |
| Aug 16 | 5927433169 | 9b00433 | Section copy/favicon | Legacy |
| Aug 15 | 5916581927 | 1c56c36 | Initial portfolio | Legacy |

The audit-baseline successful production merge was 144fee50a0c3672cb01ed4a11a9470f9f5a21f83,
deployment 6777924755. The first inventory pass occurred before fetching that new
merge and could not read its object. After fetching, its CSS was inspected and
confirmed to restore the tiny-only exception. It is not a legacy release.

## Salesforce Operational result trace

Leo confirmed the report concerns visual layout, not wording. The Salesforce
component, content file, and result CSS were introduced in 42852e6 and published
with PR 7. Comparing PR 7 to the audit-baseline production tree shows no subsequent
change to that component/content or its result selector family from Approach,
credibility, or the corrective releases. This excludes those later diffs as the
source of a direct closing-layout change; it cannot establish what Leo saw in an
earlier local candidate or prove that a design decision was approved.

The revision implementation spec superseded the earlier close directions and
called for an operational-result close, but did not lock the final grid and type
geometry. Git contains no earlier separately committed result layout. Do not
invent a restoration or infer approval from a spec's status. A separately reviewed
visual proposal preserves all text and is described in
../CASE-STUDY-VISUAL-CORRECTION-PLAN.md. Leo inspected and approved it before
publication through PR 12.

Line density is a separate visible design issue, not evidence of a recent
deployment altering every case study. The shared case-study rules combine
chapter boundaries, header dividers, narrative rows, and framed evidence. The
first local proposal removed too many narrative boundaries. Leo rejected it and
approved the narrower correction: preserve chapter and narrative-row structure,
remove only extra header/closing/evidence framing. The plan and authoritative
state record this correction. Diagram and screenshot structure remain intact.

## Immediate correction design

Restore the original dock media query in src/styles/portfolio-v2.css. Preserve
the tiny 320x568 document-flow exception required by the approved responsive
spec. At 360x800, 390x844, and 430x932 the dock must remain fixed while scrolling
between hero, Projects, Approach, and footer. Controls retain 44px targets,
safe-area placement, keyboard focus, and existing theme/Home actions. Pointer
magnification remains fine-pointer-only; no new touch hover interaction is added.
No copy, token, dependency, motion duration, or shared component change is needed.

## Prevention design for independent review

Update the existing release workflow, QA plan, and project entry guidance to
require a dated release evidence record for the exact candidate commit. Include:

- Diff each candidate against current production, including imported/shared CSS;
  identify behavior changes and reconcile them with current approved specs.
- Treat successful builds and deployment states as separate from runtime QA.
- For responsive CSS changes, inspect changed boundaries on both sides and a
  normal intermediate laptop width, with visual composition acceptance.
- Check the persistent dock at multiple scroll positions on every affected
  viewport, along with keyboard focus and footer clearance.
- Verify actual viewport dimensions and allow layout to settle before screenshots;
  screenshot and computed-state evidence must describe the same viewport.
- Inspect the hosted preview at its exact commit before merging; inspect the
  canonical page after successful production deployment, including mobile.
- Record PASS, FAIL, NOT TESTED, and NOT APPLICABLE separately. A missing required
  check blocks release or needs an explicit accepted limit, never an inferred pass.
- Require fresh, explicit deployment authority for a follow-up correction when
  existing approval does not clearly cover it. Automated approval review is not
  a UI regression gate.

No Claude challenge or lesson tooling is claimed as Codex enforcement. Do not
access private methodology state or write inside .claude. No new test framework
is assumed; propose a concrete guard only if it checks rendered behavior rather
than merely restating source rules.

## Implemented locally and independent reassessment

The urgent one-file dock correction was merged and verified in production.
Workflow, QA plan, and case-study guidance changes remain local. They distinguish
production SHA from main, require base reconciliation and renewed affected QA
after advancement, separate build/runtime/visual/approval gates, require exact
hosted preview inspection, and record truthful coverage gaps.

The initial collector proposal was not browser-verified and was superseded by
the permitted CUA collector and JSON evidence gate. Actual viewport, dock
position/visibility/control size, named multi-scroll persistence, footer endpoint
and clearance, five-step Approach orientation and untransformed-section checks
are validated across all 15 required viewport/route cases. Eight dependency-free
fixtures pass, including both released regressions and missing/malformed evidence.
Manual visual acceptance remains separate from geometry checks.

Two independent read-only senior reviews were collected and reconciled. The
release/QA review identified conflicting guidance and a non-failing collector;
the frontend/accessibility review confirmed the restored dock boundary and
required shared-route coverage. Reassessment of the new prevention implementation
caught smooth-scroll sampling, missing cleanup, and ambiguous release baselines.
These were corrected with instant scrolling, fonts/two-frame settling, finally
cleanup, distinct production/main SHAs, and renewed QA after base changes. The
final source review found no remaining blocker. The visual-source review found
no scoping/accessibility blocker and correctly left visual acceptance and
preference runtime checks outstanding.

## Completed visual release and remaining prevention work

Leo accepted the case-study candidate and explicitly authorized deployment.
The CSS-only visual release completed through PR 12. Exact preview and canonical
production checks passed; release SHAs, deployment IDs, checks and rollback are
recorded in the authoritative [current state](../REDESIGN-CURRENT-STATE.md).
The deployment inventory above is the earlier audit snapshot, not a live list.

Leo subsequently authorized finishing and publishing the separate prevention
release with "go". CUA integration collected 15 real cases against immutable
production at 3db9a751099a0f6529dbdb4a432ca0cd1b1825bc. The retained artifact,
qa/portfolio-prevention-cua-evidence-2026-10-01.json, passes the CLI with exit 0;
removing the Salesforce phone case fails with exit 1 and named missing coverage.
See ../PORTFOLIO-RELEASE-PREVENTION.md for the implemented contract and commands.
Legacy CDP remains unverified and is not the gate. This is an operator-run gate,
not an unattended CI integration or a substitute for visual approval.

Actual touch, reduced-motion/forced-color preference emulation and 200% zoom
remain NOT TESTED. Generated route-tree changes and the preview helper are
excluded from publication. No global Claude lesson corpus or enforcement control
was changed, and none is claimed to have run. Publication and future live state
belong in the authoritative current-state document linked above.
