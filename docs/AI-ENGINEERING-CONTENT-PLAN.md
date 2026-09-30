# AI engineering content proposal

Status: internal authoring guidance and final Build wording approved and applied
locally. Proportionate local verification passed. No deployment authorized.
Date: 2026-10-01
Goal authority: [PROJECT-GOAL.md](./PROJECT-GOAL.md).
Release and live project state remain authoritative in
[REDESIGN-CURRENT-STATE.md](./REDESIGN-CURRENT-STATE.md).

## Outcome

Help a hiring manager understand how Leo selects AI, controls its effects, and
checks the resulting system. Keep the Systems Engineer identity and the current
proof-led portfolio structure.

The reference is the content of Ingenium Vector's
[manifesto](https://ingeniumvector.com/about/),
[working approach](https://ingeniumvector.com/how-i-work/), and
[permissions article](https://ingeniumvector.com/bearing/ai-agent-bank-account-permissions/).
The useful principles are operational discovery, bounded authority, measurable
results, and maintainable ownership. Their engagement model and absolute vendor
independence promises are not proposed portfolio claims.

## Senior roles and review questions

| Role                                       | Question this proposal must answer                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Senior portfolio and conversion strategist | Does this help the primary hiring audience assess relevant work and move toward a call?                |
| Senior technical content designer          | Does each addition communicate something the existing page does not already explain?                   |
| Senior AI systems architect                | Are model interpretation, action authorization, and human escalation distinguished accurately?         |
| Senior frontend architect                  | Does the change follow existing data ownership without brittle array-index conditions?                 |
| Senior accessibility and QA engineer       | Is the text and link understandable, server rendered, and usable at narrow widths and with a keyboard? |

## Observed state and claims ledger

These are claims about inspected portfolio source and documents. This planning
pass does not revalidate the booking workflow, its live runtime, or its tests.

| Claim                                                                                                        | Source read this session                                                                     | Consequence                                                                |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Hiring is the primary audience; AI must not replace the Systems Engineer identity                            | `docs/PROJECT-GOAL.md:19` and `:120`                                                         | Focus on engineering judgment rather than an AI service offer              |
| Approach is intended to stay compact and retain practical detail                                             | `docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md:506` and `:523`                                   | No additional manifesto or long process section                            |
| The Build sentence currently combines custom work, AI assistance, and tool selection under simplest/cheapest | `src/components/portfolio/data.ts:92`                                                        | A focused copy review is justified; Leo confirmed the broader practices    |
| Version 2 reuses `PROCESS_STEPS` as `APPROACH`                                                               | `src/content/portfolio-v2/content.ts:3` and `:162`; `src/components/portfolio/Process.tsx:1` | A source edit also affects the retained legacy consumer                    |
| AI capability has a statement and terms but no proof link                                                    | `src/components/portfolio-v2/CapabilitiesV2.tsx:20`; `src/content/portfolio-v2/types.ts:12`  | A quiet route link is a possible navigation addition for review            |
| Booking content already explains AI proposals, tested rules, failure checks, and human escalation            | `src/content/portfolio-v2/booking-agent.ts:179`, `:248`, and `:312`                          | A second authority or safeguards section would repeat existing information |
| Case-study guidelines already require proof, limits, and separation of sandbox from live behavior            | `docs/CASE-STUDY-DESIGN-GUIDELINES.md:35`, `:46`, and `:123`                                 | Add only missing AI-specific authoring questions                           |

## Workstream 1: focused Approach copy review

Goal mapping: practical operational understanding and reliability-minded judgment.

Review only the Build description initially. Preserve the step names and the
Understand, Plan, and Validate descriptions unless Leo explicitly reopens them.
Leo clarified that Build describes selection judgment: whether an automation
needs AI, and how experience helps identify the simpler, cheaper approach among
available tools. AI governance is a separate topic and does not belong in this
paragraph. This clarification supersedes the earlier reviewer framing.

Leo confirmed on 2026-10-01 that all four queried practices are established:
choosing AI where it adds value, keeping important actions behind code or human
approval, measuring results, and documenting maintenance or handoff. This supports
practice-level wording. It does not establish a particular metric, a runtime
guarantee, or a completed handoff for any individual project.

Final approved Build body, applied on 2026-10-01:
`I choose tools that fit the process and use AI to help with the build. I decide whether the automation needs AI and choose the simpler, cheaper approach.`

Leo approved the opening and then selected the direct second sentence after
rejecting the weaker framing `My experience helps me`. The approved text
communicates the decision itself and contains no AI-governance claim.
Preserve Validate for this revision: it
already explains real-scenario checks and observed performance, and rewriting
it merely to insert another principle would add little.

Affected files after approval:

- `src/components/portfolio/data.ts`: replace only the reviewed Build body.
- `docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md`: record the selected copy and its
  scope as a dated amendment.

Recommended ownership: revise the existing shared source rather than create a
second Approach copy store for this small change. The legacy source is a retained
consumer, not a separate publication target; confirm its wrapping if rendered.

Wiring: `PROCESS_STEPS` -> version 2 `APPROACH` -> `ApproachV2`. The legacy
`Process` component also reads the shared source; its content changes too.
If Leo wants a version 2-only revision, define the four Approach records in the
version 2 content module instead, making its ownership explicit. Do not silently
split the copy sources.

Behavior: one replacement paragraph; existing layout and motion. Check actual
wrapping before proposing CSS. No new public promises about financial ROI,
universal control boundaries, or completed client handoffs.

## Considered alternative: connect AI capability to evidence

Disposition after strategy review: defer from the recommended revision. Projects
already precede Capabilities, the booking agent leads that section, and its
existing action opens the same safeguards case study. The link could help
visitors who jump directly to Capabilities, but it adds no missing explanation.
Revisit only if observed review feedback shows that visitors miss the AI proof
while scanning capabilities. The implementation sketch below is retained so the
alternative is reviewable; it is not part of the recommended change set.

Goal mapping: role breadth backed by focused proof and a clear visitor journey.

Add one low-emphasis text link inside the AI capability article, after its
statement and before its supporting terms. It opens the existing booking-agent
route in the same tab. It is supporting navigation, not another primary action.

Exact proposed link copy: `See the booking agent safeguards`.
Destination: `/projects/n8n-booking-agent`.
Use the existing route entry so the visitor receives the full project context.

Affected files after approval:

- `src/content/portfolio-v2/types.ts`: optional `proofLink` on `Capability`, with
  `label` and `href` fields.
- `src/content/portfolio-v2/content.ts`: populate that field on the AI capability
  only and explicitly type the collection as `readonly Capability[]`, or use an
  `in` guard in the consumer. The present `as const satisfies` export preserves
  a narrow union; adding an optional member only to the interface does not make
  the property accessible on every inferred record.
- `src/components/portfolio-v2/CapabilitiesV2.tsx`: conditionally render a native
  anchor from the field. No array-index or heading-text branching.
- `src/styles/portfolio-v2.css`: only if existing link styles do not provide the
  required low-emphasis treatment and wrapping.
- `docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md`: record approved link placement and
  wording.

Wiring: typed capability record -> mapped capability article -> native internal
anchor -> existing case-study route. No additional state, observer, animation,
dependency, analytics event, or booking-agent content change is required.

If this alternative is reopened, specify an always-visible underline, readable
body-text size and contrast, ordinary wrapping, and the existing shared focus
ring. Do not rely on inherited anchor color to identify a link. Check both
themes, 320px and two-column layouts, 400% zoom, forced colors, and actual
navigation with JavaScript disabled in addition to the normal source checks.

Known limit: the booking agent demonstrates this project's control architecture.
The link must not imply it proves every AI capability term or every project uses
the same architecture. Projects precede Capabilities, so some visitors will have
already seen this proof. Independent review should decide whether the extra
navigation earns its space.

## Workstream 3: improve future case-study evidence collection

Goal mapping: truthful evidence, maintainability, confidentiality, and portfolio
growth without an expanding homepage.

Leo approved this workstream on 2026-10-01. The AI project authoring subsection
has been added to `docs/CASE-STUDY-DESIGN-GUIDELINES.md`. It is an internal review
aid, not a mandatory new public section or application schema.

For each future owned AI project, record in its existing case-study spec:

| Authoring field     | Information to collect                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| AI contribution     | What the model interprets or produces and how choosing AI compared with other ways to meet the same need |
| Action authority    | Which code, platform rule, or person authorizes an external change                                       |
| Exception handling  | What happens when the request is uncertain or a dependency fails                                         |
| Verification        | Which behavior was checked, how, when, and against which version                                         |
| Operating ownership | Who maintains the system, where access is controlled, and what a handoff actually includes               |
| Outcome measurement | Baseline and observed result with comparable units, timeframe, and review or maintenance effort          |
| Scope limits        | What remains unsupported or untested, and which claims are approved for publication                      |

Reuse existing evidence ledgers where these answers already exist. A missing
answer remains unknown; it does not become a public claim. Metrics are optional
when no valid baseline exists. Technical correctness evidence remains valuable.
For prior-employer projects, retain the existing approved publication boundary.

Select only the answers that explain a distinctive decision for publication.
Do not render seven repeated headings on every case study. The authoring fields
require no TypeScript changes, runtime dashboard, ROI calculator, or new media.

## Reassessment of the earlier recommendations

| Earlier recommendation                              | Proposed disposition                                                                                           | Reason                                                                                                                                                                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Explicit engineering commitments                    | Distribute across existing Approach steps                                                                      | Build explains selection; Plan already explains reconstructable documentation; Validate explains checks and observed performance. Controls belong in project evidence. This does not establish quantified operational value |
| Discover the process before choosing AI             | Preserve current Understand copy; review the three Build variants                                              | Discovery is already explicit; Leo confirmed the selection practice                                                                                                                                                         |
| Explain AI authority                                | Preserve booking explanation; defer the extra capability link                                                  | The control boundary already has extensive evidence and a homepage entry                                                                                                                                                    |
| Separate AI-assisted engineering and operational AI | Retain development assistance in the opening; describe whether operational AI is needed in the second sentence | Leo corrected the earlier governance framing; tool-selection judgment is the Build topic                                                                                                                                    |
| Measure net operational value                       | Collect comparable measurements in future owned-project specs                                                  | Leo confirmed the measurement practice; no new project result is established here                                                                                                                                           |
| Explain ownership and maintenance                   | Preserve Plan; collect project-specific facts in future specs                                                  | Leo confirmed documentation practice; avoid absolute ownership promises or inventing completed handoffs                                                                                                                     |
| GEO and AI visibility                               | Exclude from this proposal                                                                                     | Does not address the portfolio's current systems-engineering outcome                                                                                                                                                        |

## Review and implementation sequence

1. Write this design and gather the missing practice facts.
2. Run independent strategy/content and technical/evidence reviews against the
   written artifact, then reconcile every finding here.
3. Present the final recommended scope and available exact public copy. Resolve
   any factual gaps before drafting broader first-person statements.
4. Leo reviews the scope and chooses the Build wording. Planning approval does
   not authorize a source implementation or deployment.
5. After implementation authorization, use the existing portfolio release
   workflow and preserve unrelated user edits. Make only the reviewed changes.
6. Type-check, build, and run targeted lint/format checks for touched source.
   Separate known lint and hydration baselines from new failures. No new test
   framework is warranted for a paragraph change.
7. Review desktop and 390px layout, keyboard focus and existing route navigation, 200%
   text, reduced motion, disclosure behavior, and scrollspy. Check the complete
   copy remains server rendered. Review legacy wrapping if shared copy changes.
8. Publish only after the separate release approval.

The initial turn produced the planning artifact. Leo's partial approval permitted
the internal case-study guidance, and his subsequent wording approval permitted
the local Build replacement and content-spec amendment. The external reference
is not a technical authority for claims about Leo's runtime.

## Review results

The strategy/content reviewer found that the original three Build variants did
not distinguish development assistance from operational AI. All three variants
now name those roles separately. The reviewer recommended deferring the extra
capability proof link and retaining the useful manifesto commitments within the
existing Approach steps; both recommendations are adopted in this draft.

The technical reviewer identified the optional-property inference problem and
missing link-recognition/reflow checks in the considered capability-link
implementation. Its sketch now names the needed collection typing or property
guard and concrete link styling and accessibility checks. These remain part of
the deferred alternative, not additional work in the recommended revision.

Both independent reviews found the Build distinction missing in the first draft.
The final variants now separate development assistance from operational AI and
name code checks more precisely. The recommendation retains the shared copy
source and adds no renderer or schema change. No review finding establishes a
current application defect, and no runtime behavior was reverified in this turn.

Final recommended scope: select one Build replacement, record it in the content
spec, and add the internal AI authoring questions to the case-study guidelines.
Leave public case-study structure and the other Approach steps intact.

### Leo's subsequent review

Leo approved the proposal except the Build wording. He liked the opening about
process-fit tools and AI-assisted building. He clarified that the second sentence
must explain experience-based decisions about whether an automation needs AI
and which approach is simpler and cheaper. The earlier governance-based variants
are superseded. He subsequently approved the direct second sentence and the
complete paragraph recorded above. The internal authoring guidance, shared Build
source, and approved content specification are now updated locally.

## Methodology compatibility

The global playbook requests parallel independent specialist reviews; those are
applicable to this planning review. Its Claude challenge, recurrence, and lesson
tools are not claimed as Codex enforcement. No scripts that write inside the
read-only `.claude` tree or private lesson stores are run. Goal and claim checks
are performed manually and through independent reviewers.

## Decisions this turn

- Internal AI authoring guidance and the final Build paragraph are approved and
  applied locally. Deployment remains unauthorized.
- Retain the Systems Engineer identity and compact Approach structure.
- Treat the existing booking case study as evidence already present.
- Keep the Build revision about experience-based AI and tool selection. Place
  governance in case-study discussions.
- Keep the redundant capability link deferred.
- Preserve the approved opening and direct second sentence exactly.

## Continuation

Leo subsequently locked and applied the Understand and Plan revisions, with the
exact sentences recorded in the approved content specification. Step 4 is also
locked and applied. Leo also locked the fifth paragraph about quantifiable
results and performance monitoring and requested a local visual preview.
`Monitor` is its working title, pending title review. His latest instructions
supersede the Build-only scope of the
initial proposal. The authoritative continuation is in
`REDESIGN-CURRENT-STATE.md`; do not treat this proposal's initial scope as a
reason to leave the approved sentences unchanged or retain a four-step model
after the fifth step's copy and layout are approved.

Read goal, approved content spec, authoritative current state, this proposal,
then the relevant source files. Local verification of the approved paragraph is
complete; do not push or deploy without release authorization. Internal
authoring guidance is complete. Keep verification and release state in
`REDESIGN-CURRENT-STATE.md`.
