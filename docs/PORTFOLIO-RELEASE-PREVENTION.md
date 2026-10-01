# Portfolio release prevention

Scope approved by Leo on 2026-10-01: finish, verify and publish the deployment
audit, documentation corrections and regression checks independently of the
completed visual release. No application layout, behavior, content or dependency
change is included. This supports the goal's maintainability, accessible
responsive behavior and truthful evidence invariants.

## Collection and gate

1. Bind the immutable preview URL to its actual candidate SHA using deployment
   metadata. Follow REDESIGN-WORKFLOW-ROLLBACK-PLAN.md for the full release process.
2. Import scripts/portfolio-v2-cua-collector.mjs in the CUA runtime and pass its
   `collectReleaseEvidence` function the documented tab and viewport handles,
   baseUrl and candidateSha. It serializes the shared read-only DOM capture,
   performs documented browser actions and resets viewport overrides in finally.
   A focusable dock anchor receives Control+Home/Control+End. Collection waits
   for the required endpoint or visible heading plus stable geometry; it does
   not treat return from a keyboard action as finished scrolling.
3. Collect the fixed coverage profile exported as `releaseCoverage` from
   scripts/portfolio-v2-release-evidence.mjs: nine homepage viewports covering
   laptop and dock boundaries, plus desktop and phone for all three case studies.
   Homepage samples are top/projects/approach/footer; case studies use
   top/middle/footer. Use Control+Home/Control+End to exercise actual page ends.
4. Save the real measurements using the collector's `saveReleaseEvidence`
   generated-artifact export, which refuses to overwrite existing evidence.
   Do not substitute
   fixture values or a screenshot description. Evidence includes schemaVersion
   1, collector `cua`, baseUrl, candidateSha, collectedAt and measurements.
   Each measurement adds requestedWidth/requestedHeight, isHomepage and named
   scrollSamples to the read-only capture. Archive the artifact with the release
   evidence; current project status belongs only in REDESIGN-CURRENT-STATE.md.
5. Run:

   `node scripts/portfolio-v2-browser-qa.mjs --evidence <json> <site-url> <candidate-sha>`

   Exit 0 means the measured layout and required coverage pass; malformed JSON,
   missing coverage, stale/wrong candidate evidence, geometry failure or an
   unvisited footer produces exit 1. Evidence is valid for at most 24 hours and
   is invalidated immediately by a relevant source/base change.

The gate checks actual viewports, overflow at every sampled position, four
labelled 44px dock controls, fixed/static positioning and scroll persistence,
footer clearance, and five-step Approach orientation and measured-section
stability. It is an automated evidence validator with CUA-driven collection;
it is agent-run collection and is not configured as an unattended CI check or
a visual-design approval system.

## Limits and separate checks

The original endpoint-based `--legacy-cdp` mode of portfolio-v2-browser-qa.mjs remains
available for separately authorized environments. It was not executed in this
CUA-only session and is not the verified release command. A valid JSON artifact
cannot itself prove who collected it; retained browser tool/deployment records
establish provenance. Screenshots, composition acceptance, locked-copy review,
keyboard focus, motion-loop observation, reduced-motion/forced-color preferences,
actual touch, zoom and other interactions remain separately reported checks.
Never infer those passes from geometry or fixture results.

For code changes to the validator, run
`node scripts/portfolio-v2-release-contract.test.mjs`. These fixtures cover the
released phone/laptop regressions, incomplete evidence, stale release identity,
malformed samples, footer obstruction and control-size failures. They supplement
fresh browser evidence and do not replace it.

## Durable design decisions

Record approved spacing and separator changes per affected route, including
structural boundaries retained. Removing additional boundaries, changing layout,
copy, tool behavior or responsive breakpoints is a new decision requiring review.
The accepted 2026-10-01 case-study refinements are recorded in
CASE-STUDY-VISUAL-CORRECTION-PLAN.md and HUBSPOT-LINE-DENSITY-REVIEW.md.

The deployment audit is qa/portfolio-release-regression-audit-2026-10-01.md.
Codex followed the underlying release checks manually; no Claude hook, global
lesson corpus or global enforcement control was modified or claimed to run.

## Verified integration, 2026-10-01

The CUA collector produced 15 real viewport/route measurements against immutable
production https://leosanga-p5cm167wi-leo-c2f6.vercel.app at source SHA
3db9a751099a0f6529dbdb4a432ca0cd1b1825bc. The retained historical artifact is
qa/portfolio-prevention-cua-evidence-2026-10-01.json. The CLI returned PASS/exit 0.
Removing the Salesforce phone case returned the named missing-coverage failure
and exit 1. All eight regression fixtures pass. Integration exposed premature
keyboard/footer samples; readiness and confirmed endpoint checks, bounded
endpoint retries and footer-content targeting corrected collection. No geometry
failure was accepted as PASS. Legacy CDP mode was not run. This is toolchain
integration evidence, not approval to reuse the measurements for future releases.
