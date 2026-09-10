# Portfolio Content and Conversion Specification

Status: Approved by Leo; Gate 1 local implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
Strategy rationale: [`PORTFOLIO-REDESIGN-ANALYSIS.md`](./PORTFOLIO-REDESIGN-ANALYSIS.md)
Reference and motion research: [`PORTFOLIO-REFERENCE-MOTION-RESEARCH.md`](./PORTFOLIO-REFERENCE-MOTION-RESEARCH.md)
Visual and interface proposal: [`PORTFOLIO-VISUAL-INTERFACE-SPEC.md`](./PORTFOLIO-VISUAL-INTERFACE-SPEC.md)
Asset and imagery proposal: [`PORTFOLIO-ASSET-IMAGERY-SPEC.md`](./PORTFOLIO-ASSET-IMAGERY-SPEC.md)
Responsive, accessibility, and performance proposal: [`PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md`](./PORTFOLIO-RESPONSIVE-ACCESSIBILITY-PERFORMANCE-SPEC.md)
Workflow and rollback: [`REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`](./REDESIGN-WORKFLOW-ROLLBACK-PLAN.md)

## Purpose

This document defines what the redesigned portfolio should say, how the content
should be organized, and how the page should lead an appropriate visitor toward
one primary action: scheduling a call.

It is written so a fresh-session LLM can resume the project without guessing at
Leo's positioning, audience, evidence, conversion strategy, or publication
boundaries.

This is a content and conversion specification. It does not define the final
visual design, authorize implementation, start a local server, change source
files, create a Git branch, commit work, push to GitHub, or interact with Vercel.

## Senior perspectives applied

This specification combines the standards of a:

- Senior web strategist for positioning and page purpose
- Senior conversion strategist for the visitor journey and call action
- Senior UX architect for information order and progressive disclosure
- Senior content designer for section roles and content governance
- Senior conversion copywriter for public-facing draft copy
- Senior technical SEO strategist for search and sharing metadata

The perspectives are reconciled into one system. They do not create additional
scope or replace Leo's approval authority.

## Source hierarchy

When two sources appear to conflict, use this order:

1. Leo's latest explicit instruction
2. [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)
3. An approved specification for the relevant phase
4. The newest authoritative current-state record, once implementation begins
5. [`PORTFOLIO-REDESIGN-ANALYSIS.md`](./PORTFOLIO-REDESIGN-ANALYSIS.md)
6. Current public copy in `src/components/portfolio/data.ts`
7. The Markdown context files directly inside `..\context files`, excluding
   `archive`
8. Older planning notes and implementation records

Do not infer new public claims from private career context. A fact being present
in a source document does not automatically make it approved for publication.

## Content status vocabulary

Every content decision in this specification uses one of these states:

| Status       | Meaning                                                | Implementation rule                                    |
| ------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `locked`     | Leo explicitly approved the fact and wording boundary  | Preserve it exactly unless Leo later approves a change |
| `approved`   | Leo explicitly approved the strategic or copy decision | It may be implemented as specified                     |
| `draft`      | Recommended language awaiting Leo's review             | Do not publish or treat as final                       |
| `deferred`   | Intentionally excluded until a stated condition is met | Do not create a placeholder or coming-soon treatment   |
| `prohibited` | Explicitly outside the public portfolio direction      | Do not implement                                       |

## Strategic outcome

The homepage should help an appropriate visitor reach five conclusions in a
short, credible sequence:

1. Leo is a Systems Engineer focused on integration and automation.
2. He understands the operational work the system must support.
3. He has implemented systems under real platform and process constraints.
4. He can explain his decisions clearly enough to discuss them in depth.
5. A call is the appropriate next step.

The portfolio should create qualified interest, not maximize raw clicks. Its job
is to make the right conversation easier to start.

## Conversion objective

### Primary action

`Schedule a Call`

Status: `approved`

This is the only primary conversion action. It supports an interview, an
introductory conversation, or a discussion about a systems problem without
forcing the visitor to classify the call first.

### Conversion boundary

The portfolio can reliably measure a click that sends a visitor to the external
Google Calendar scheduler. It cannot claim that the click became a completed
booking unless the scheduler later provides a verified completion signal.

### Supporting interactions

These actions help a visitor build confidence but must not compete visually with
the primary action:

- Open the detailed workflow for a featured project
- Open a future public case study
- Watch a future project demonstration
- Visit LinkedIn from the footer
- Use email as a lower-emphasis fallback

### Prohibited competing actions

- Download resume
- View GitHub
- Hire me
- Work with me
- Get a quote
- Start a project
- Join a mailing list
- Read a career timeline
- Choose between hiring and business inquiry paths

## Audience model

### Primary audiences

| Audience                            | What they need to know                                                | Evidence that answers it                                                       | Desired next step |
| ----------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------- |
| Hiring manager or department leader | Whether Leo can understand the operation and own the systems work     | Role clarity, project outcomes, implementation judgment, working approach      | Schedule a call   |
| Technical interviewer               | Whether the work has architectural depth and accounts for constraints | System flow, hard parts, validation behavior, platform boundaries              | Schedule a call   |
| Recruiter                           | Whether the role fit is legible and supported by credible examples    | Search-aligned title, visible specialization, capability labels, project index | Schedule a call   |

### Secondary audience

Founders and operators with a systems problem are neutrally accommodated. They
should recognize relevant capability and feel welcome to schedule a call. The
site must not introduce packages, service menus, pricing, engagement models, or
agency-style language.

### Audience language rule

Public copy should speak about the work, the role, and the system. It should not
announce that Leo is job-seeking, available for employment, seeking a long-term
role, or selling consulting services.

## Visitor questions and content answers

| Visitor question                     | Page answer                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Who is this?                         | Leo Sanga, Systems Engineer: Integration + Automation                                                                |
| What does he actually do?            | He connects business systems and builds automation around how the work operates                                      |
| Is there proof?                      | Selected projects show the problem, implementation, constraint, and system behavior                                  |
| Is the work technically credible?    | The featured workflow and hard-part descriptions expose engineering judgment without exposing confidential internals |
| Can he work beyond a single tool?    | Capability groups and project stacks show cross-platform systems experience                                          |
| How does he approach ambiguous work? | The working approach explains how he understands, plans, builds, and validates                                       |
| What should I do next?               | Schedule a 30-minute call                                                                                            |

## Persuasion sequence

The homepage should follow this order:

1. **Recognition:** establish Leo's role and specialization.
2. **Relevance:** describe the kind of systems work he owns in plain language.
3. **Evidence:** show the strongest available project before asking visitors to
   study a general capability list.
4. **Judgment:** expose implementation decisions, constraints, and validation.
5. **Breadth:** show the range of relevant systems work without turning the page
   into a resume.
6. **Conversation:** provide one clear next step after the visitor has enough
   context.

This sequence changes the current content order by moving proof before general
capabilities and approach.

## Recommended homepage information architecture

| Order | Section      | Purpose                                                                                    | Required content                                                                        | Excluded content                                                |
| ----: | ------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
|     1 | Navigation   | Orientation and persistent conversion access                                               | Projects, Capabilities, Approach, Schedule a Call                                       | Resume, GitHub, availability                                    |
|     2 | Hero         | Establish role, relevance, and human presence                                              | Professional label, value headline, short support copy, portrait, primary CTA           | Tool cloud, career history, animated slogans                    |
|     3 | Projects     | Present the complete current project set in one section, with the strongest evidence first | Featured project, locked evidence, system flow disclosure, four compact project entries | Confidential media, invented outcomes, unfinished booking agent |
|     4 | Capabilities | Translate proof into role breadth                                                          | Four approved capability groups, with AI visible as a distinct second group             | Unsupported AI claims, logo wall                                |
|     5 | Approach     | Show how Leo handles work                                                                  | Understand, Plan, Build, Validate                                                       | Long methodology essay, sales process                           |
|     6 | Conversation | Resolve the page into one next step                                                        | Neutral call invitation, 30-minute expectation, Schedule a Call                         | Visitor-type form, service pitch, availability claim            |
|     7 | Footer       | Identity and quiet fallback routes                                                         | Name, professional label, email, LinkedIn, copyright                                    | Resume and GitHub                                               |

## Navigation specification

Status: `approved`

Recommended desktop and mobile labels:

| Item            | Destination        | Priority | Rule                                                                  |
| --------------- | ------------------ | -------: | --------------------------------------------------------------------- |
| Leo Sanga       | Top of page        | Identity | Text identity, not an additional logo concept                         |
| Projects        | Projects           |        1 | Use the familiar portfolio label while the current list remains small |
| Capabilities    | Capability map     |        2 | Keep terminology professional and searchable                          |
| Approach        | My Approach        |        3 | Preserve the current four-step model                                  |
| Schedule a Call | External scheduler |  Primary | Maintain visual priority on desktop and mobile                        |

Do not add a separate Contact navigation item. The persistent primary CTA and
final conversation section already provide the destination.

## Hero content specification

### Professional label

`Systems Engineer: Integration + Automation`

Status: `approved`

Use the complete label as visible text directly below the hero portrait. It
remains near the primary heading within the same hero composition. Do not split
it into decorative fragments that weaken readability or search meaning.

### Headline

`I build systems that run the business`

Status: `approved`

This retains the direct statement Leo prefers and makes his ownership explicit
through the first-person construction.

### Supporting copy

`I design and build the systems a business relies on. My background across operations and technical delivery helps me see how the work gets done before I decide how the system should support it.`

Status: `approved`

### Recommended hero copy set

```text
Systems Engineer: Integration + Automation

I build systems that run the business

I design and build the systems a business relies on. My background across
operations and technical delivery helps me see how the work gets done before I
decide how the system should support it.

Schedule a Call
```

Status: `approved`

### Hero content rules

- Keep the heading to two lines at the intended desktop measure when practical.
- Keep the body to two short paragraphs or two sentences.
- Do not list software in the hero.
- Do not state availability or career intent.
- Do not add a secondary button.
- Do not put social links beside the primary CTA.
- Retain the portrait as the human anchor.
- Use alt text: `Leo Sanga, Systems Engineer.` Status: `draft`.

## Projects content specification

### Section heading

`Projects`

Status: `approved`

No introductory paragraph or separate `More builds` section is required. The
featured project's problem statement should begin the evidence quickly, and the
remaining project entries should continue within the same section.

### Featured project

Use the current `Automated Client Implementation Delivery System (n8n)` as the
featured project until a completed owned case study is approved to replace or
join it.

Recommended information order inside the feature:

1. Project type: `Featured system`
2. Project title
3. The problem
4. What I built
5. Technology metadata
6. The hard part
7. `See how it works` disclosure
8. Detailed implementation-delivery workflow

The labels `The problem`, `What I built`, and `The hard part` are `approved`.
The label `See how it works` is `draft`.
The project facts and locked content listed below must be sourced from
`src/components/portfolio/data.ts`.

### Locked prior-employer content

Status: `locked`

The following must not be removed, generalized, or rewritten without Leo's
later approval:

- The `more than 8 hours` per week figure in the featured problem statement
- The `70 files` figure in the detailed flow
- The complete detailed implementation-delivery workflow
- The existing employer-derived architecture and platform constraints across
  the current project descriptions

Implementation may change hierarchy, layout, disclosure behavior, and visual
presentation. It may not change the facts or wording boundary. A future agent
must compare these passages against the current source before every approval
gate.

This lock records Leo's content decision based on a verbal understanding. It is
not a claim of written third-party approval. It does not authorize a future
agent to add client identity, internal data, real field names, scoring rules,
screenshots, recordings, repositories, or other inferred details.

### Confidentiality presentation

- Do not add an `NDA-bound` label.
- Do not identify the company or agreement.
- Do not use a warning badge that makes the work appear incomplete.
- Do not add media placeholders for evidence that cannot be published.
- The existing system-flow presentation is sufficient for the featured project.
- Use `Selected details withheld` only if a future layout creates a clear need
  to explain an intentional omission. It is not recommended for the current
  project.

### Remaining project entries

The entries continue directly after the featured project inside the `Projects`
section. They may use a more compact layout, but they should not receive a
separate section heading or navigation destination while the list remains small.

Status: `approved`

Render the four current entries from `src/components/portfolio/data.ts`:

- AI-Assisted Lead Qualification (HubSpot + n8n)
- AI-Assisted Outbound Prospecting Workflow (n8n)
- Executive Reporting & Dashboard Automation (Fully custom)
- Support Ticket Pipeline Automation (HubSpot)

Do not invent a fifth entry to match an outdated comment or expected count.

### Entry structure

Each compact entry should answer:

- What was the operational problem?
- What did Leo build?
- What constraint or implementation decision made the work meaningful?
- Which technologies help establish context?

Use the current problem, solution, hard-part, and stack content. The
employer-derived architecture and platform constraints within these entries are
`locked`.

### Growth behavior

The homepage is a curated front door, not the permanent full archive.

- Keep two or three projects prominent on the homepage once public case studies
  exist.
- Move the broader catalog to `/projects` when the number and depth justify it.
- Add visible filters only when there are roughly eight substantial public
  entries and at least two meaningful entries per category.
- Internal tags may be added earlier for content organization.
- Do not publish an empty archive, disabled filters, or future-project cards.

## Capability content specification

### Section heading

Recommended: `Capabilities`

Status: `approved`

No promotional introduction is required. The content should operate as a map of
Leo's relevant systems scope after the visitor has seen proof.

### Recommended capability structure

Status: `approved`

#### Systems Integration + Automation

| Option      | Copy                                                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| A, selected | `I build the layer that moves information between the systems a business depends on, then automate the work that sits across them.` |
| B           | `I connect business systems and build the automation that carries work reliably between them.`                                      |
| C           | `I design integrations for work that has to move reliably across platform and team boundaries.`                                     |

Supporting terms:

- REST APIs and webhooks
- n8n, Zapier, and Make
- Python and JavaScript
- CRM workflow automation
- Cross-functional systems integration

#### AI + Intelligent Automation

| Option      | Copy                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| A, selected | `I build AI into operational workflows that need judgment, with human checkpoints on the decisions that carry risk.` |

Supporting terms:

- AI agents
- LLM integration
- MCP connectors
- AI-assisted workflows
- Intelligent routing
- Lead enrichment
- Human-in-the-loop workflows

#### Business Systems + Process Architecture

| Option      | Copy                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| A, selected | `I translate an operating process into a system structure and workflow that people can keep using as the work changes.` |
| B           | `I turn the way a team operates into system behavior that can be understood and maintained.`                            |
| C           | `I map the real process before shaping the systems that support it.`                                                    |

Supporting terms:

- CRM architecture
- Data models and routing logic
- Workflow design
- Process mapping
- Reporting and dashboards
- Business systems administration

#### Enterprise Systems + Reliability

| Option      | Copy                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| A, selected | `I handle enterprise identity and the reliability problems that appear between connected platforms.`            |
| B           | `I work across identity and connected platforms to diagnose failures and keep enterprise workflows dependable.` |
| C           | `I resolve the integration and access problems that appear when enterprise systems have to operate together.`   |

Supporting terms:

- SSO and SAML
- SCIM provisioning
- Entra ID and Okta
- API troubleshooting
- Root-cause analysis
- Documentation and governance

### AI positioning rule

AI is a standalone top-level capability group and appears second, immediately
after Systems Integration + Automation. This is a scan and search decision. It
does not replace `Systems Engineer: Integration + Automation` as Leo's primary
professional identity.

Leo's review of hundreds of relevant job posts found that AI capabilities often
appear as a distinct hiring requirement. Recruiters and hiring managers may scan
capability headings without reading the project details, so project evidence
alone does not provide enough first-pass visibility.

The AI group stays grounded in capabilities Leo can discuss and support. It
names AI agents, LLM integration, MCP connectors, AI-assisted workflows,
intelligent routing, lead enrichment, and human-in-the-loop workflows. It does
not use generic innovation language or imply model research experience.

Project-level AI details remain the strongest evidence. The capability group
makes that experience discoverable before a visitor decides whether to inspect
the projects.

### Capability presentation rules

- Treat technologies as supporting metadata, not as a logo wall.
- Do not score skill proficiency with bars, percentages, stars, or years.
- Do not claim exhaustive expertise in every listed platform.
- Keep the public emphasis on system responsibilities and outcomes.
- Allow the data model to add or retire terms without changing the layout.

## Approach specification

### Section heading

`My Approach`

Status: `approved`

### Step labels and copy

The four-step model is sound and should remain:

1. Understand
2. Plan
3. Build
4. Validate

The current descriptions in `src/components/portfolio/data.ts` should be
retained for the first visual prototype. Their status is `draft, current wording
retained`. They should not be shortened inside implementation without a separate
copy review because their practical detail distinguishes the section from a
generic agency process.

### Purpose of the section

This is evidence of working judgment. It is not a sales process and should not
end with a sales-oriented CTA. The page-wide call action remains available in
the navigation and final conversation section.

## Booking-agent release specification

The n8n booking agent is the first planned owned case study. It is almost
finished, but it is not yet public portfolio content.

Status: `deferred`

### Current rule

Do not mention, tease, list, link, preview, or create a route for the project
until Leo confirms that the implementation is complete enough to represent
accurately.

### Release states

| State         | Public behavior                            | Gate                                                                  |
| ------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| In progress   | Invisible                                  | Current state                                                         |
| Content-ready | Draft case study exists privately          | Facts, architecture, and outcome reviewed by Leo                      |
| Demo-ready    | Recording and fallback media pass review   | Demonstration represents final behavior and exposes no sensitive data |
| Approved      | May appear on homepage and dedicated route | Leo explicitly approves copy and media                                |
| Published     | Route is live and indexed                  | Separate production approval gate completed                           |

### Future case-study content model

When the project is ready, its case study should contain:

- One-sentence project definition
- Operational problem
- Intended user and use context
- System boundary
- Architecture overview
- Key reliability decisions
- Validation and failure behavior
- Demonstration recording with poster image and text alternative
- What changed as a result, using only verified outcomes
- Reflection on what Leo would improve next
- Schedule a Call as the only primary conversion

Do not draft outcome claims before the finished behavior and evidence are
available.

## Final conversation section

### Heading

`Start with a conversation.`

Status: `approved`

### Supporting copy

`The best solutions start with understanding how the business actually works. Schedule 30 minutes to discuss a role or a systems problem. I can walk you through my work, or you can show me how the work gets done today. We'll identify where the system can improve.`

Status: `approved`

### Approved conversation copy set

```text
Start with a conversation.

The best solutions start with understanding how the business actually works.
Schedule 30 minutes to discuss a role or a systems problem. I can walk you
through my work, or you can show me how the work gets done today. We'll identify
where the system can improve.

Schedule a Call

30 minutes · Google Calendar
```

Status: `approved`

Render each sentence as its own stacked paragraph. Keep the paragraphs within
one support-copy group with a compact rhythm so the section scans as a sequence,
not as four unrelated statements.

The duration line is interface metadata. The private 30-minute buffer between
bookings should not appear on the site.

### Scheduler form recommendation

Keep first name and last name. Rename the optional message field to:

`What would you like to discuss? (optional)`

Status: `draft recommendation for Leo's external calendar settings`

Do not add a required hiring-versus-business selector. The visitor can supply
the context that matters in their own words.

## Footer specification

Recommended content:

- `Leo Sanga`
- `Systems Engineer: Integration + Automation`
- Email
- LinkedIn
- Copyright year and name

Status: identity and channel choices are `approved`; exact layout is deferred to
the visual specification.

Remove the current footer slogan. Its idea is now represented more meaningfully
in the approved conversation section.

Status: `approved`

Email should remain a lower-emphasis fallback. LinkedIn should remain a
supporting credibility route. Neither should be styled as a second primary CTA.

## Search and sharing specification

### Search title

`Leo Sanga | Systems Engineer, Integration & Automation`

Status: `approved`

### Meta description

`Portfolio of Leo Sanga, a Systems Engineer focused on reliable systems integration and automation for business operations and enterprise platforms.`

Status: `approved`

### Open Graph recommendation

- Title: use the approved search title
- Description: use the selected meta description
- Image: use a purpose-built social image derived from the approved visual system
- Image alt: `Leo Sanga, Systems Engineer specializing in integration and automation.`
- Type: `website`
- Site name: `Leo Sanga`

Status: title and description are `approved`; image, image alt, type, and site
name remain implementation candidates until metadata review.

### Search implementation rules

- Use one clear page title and one primary page heading.
- Keep `Systems Engineer`, `integration`, and `automation` readable in visible
  page content.
- Do not repeat keyword variants unnaturally.
- Do not add a meta-keywords tag. Google does not use it for web ranking.
- Write a unique description for each future project page.
- Give each future public case study a stable, descriptive URL.
- Use canonical metadata for the production URL.
- Do not index an unfinished preview route or local review surface.

Relevant official guidance:

- [Google Search title link guidance](https://developers.google.com/search/docs/appearance/title-link)
- [Google supported and unsupported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google snippet and meta description guidance](https://developers.google.com/search/docs/appearance/snippet)

### Structured data candidate

A future implementation may add a conservative `Person` schema with verified
values for name, job title, canonical URL, and LinkedIn identity. It must be
validated before release. Do not add employer, award, service, or expertise
claims that are not explicitly supported.

## Content hierarchy rules

- Start every major section with its strongest substantive statement.
- Use project names and problem statements before tool lists.
- Keep one content purpose per paragraph.
- Prefer concrete system behavior over adjectives such as innovative, seamless,
  cutting-edge, intelligent, or transformative.
- Explain decisions in the language of the work before naming the technology.
- Use technology names where they establish scope or credibility.
- Avoid repeated claims of end-to-end ownership when the project evidence can
  demonstrate it.
- Avoid slogans that could belong to any automation agency.
- Keep supporting copy shorter than the proof it introduces.

## Voice rules for public copy

- Professional, direct, calm, and specific
- First person where Leo's responsibility matters
- Plain language before specialist terminology
- No em dashes
- No contrastive reversal that dismisses one idea before replacing it
- No decorative groups of three used only for rhythm
- No invented metrics, evidence, constraints, or outcomes
- No language that makes AI the main identity
- No startup hype or consultancy funnel language
- No unsupported claims such as seamless, scalable, robust, or enterprise-grade
- Numbers must retain their context and unit

## Project content schema

The future content model should support the following fields even if the first
implementation renders only a subset:

| Field           |             Required | Purpose                                             |
| --------------- | -------------------: | --------------------------------------------------- |
| `slug`          | For dedicated routes | Stable project URL                                  |
| `title`         |                  Yes | Clear public name                                   |
| `summary`       |                  Yes | One-sentence definition                             |
| `problem`       |                  Yes | Operational reason the work mattered                |
| `build`         |                  Yes | What Leo implemented                                |
| `hardPart`      |                  Yes | Constraint or engineering judgment                  |
| `stack`         |                  Yes | Supporting technology context                       |
| `flow`          |          When useful | Structured system behavior                          |
| `ownership`     |                  Yes | What Leo personally owned, using approved facts     |
| `visibility`    |                  Yes | Private, summary, case-study-ready, or public       |
| `featured`      |                  Yes | Homepage curation flag                              |
| `categories`    |                Later | Internal archive organization                       |
| `demo`          |               Future | Video, poster, captions or transcript, and fallback |
| `caseStudy`     |               Future | Long-form route content                             |
| `claimSources`  |             Internal | Traceability for every public fact                  |
| `contentStatus` |             Internal | Locked, approved, draft, deferred, or prohibited    |

The implementation specification will decide the TypeScript structure. This
document defines only the content requirements.

## Responsive content behavior

### Narrow screens

- Preserve the professional label, full heading meaning, and Schedule a Call
  action in the first screen without forcing an exact fold height.
- Do not abbreviate the role title into ambiguous initials.
- Keep body paragraphs at a readable line length.
- Keep project problem and build statements visible before deeper disclosure.
- Collapse system-flow depth through an accessible disclosure if necessary.
- Do not remove evidence solely to make the mobile layout shorter.
- Stack capability metadata in a scannable reading order.
- Keep the primary call action available through navigation and the final
  section.

### Wide screens

- Do not turn additional width into longer line lengths.
- Use composition to relate the portrait, role, and call action.
- Keep the project narrative reading order intact even if visual elements sit
  beside one another.
- Avoid multi-column arrangements that cause a screen reader and keyboard order
  to differ from the visual order.

## Accessibility content requirements

- Every meaningful image needs useful alt text.
- Decorative textures and ornaments use empty alt text or CSS presentation.
- A video demonstration needs captions or a transcript, a useful poster image,
  and a text path to the same essential information.
- Icon-only controls need accessible names.
- Link text must describe its action or destination.
- Disclosure labels must communicate whether they open project detail.
- Headings must follow a logical hierarchy independent of type size.
- Do not place essential information only inside animation, hover, color, or
  video.
- Reduced motion must not remove content.
- Error and validation language must explain what the visitor can do next.

## Measurement plan

Measurement should answer whether visitors engage with proof and proceed toward
a call. It should not create surveillance or imply certainty the data cannot
support.

Recommended events:

| Event                     | Trigger                               | Useful property                        |
| ------------------------- | ------------------------------------- | -------------------------------------- |
| `schedule_call_click`     | Click to the external scheduler       | `placement`: `nav`, `hero`, or `final` |
| `project_detail_open`     | Open the featured workflow disclosure | Project slug or stable ID              |
| `project_case_study_open` | Open a future public case study       | Project slug                           |
| `project_demo_play`       | Start a future demonstration          | Project slug                           |
| `project_demo_complete`   | Reach a reliable completion threshold | Project slug and duration              |
| `email_link_click`        | Use the footer email fallback         | `placement`: `footer`                  |

Do not record names, email addresses, optional scheduler messages, or private
form content in portfolio analytics.

Do not call `schedule_call_click` a booking. If completed-booking measurement is
added later, it requires a separate verified scheduler integration and privacy
review.

Low traffic makes routine A/B testing unreliable. Prefer direct review,
qualitative call feedback, search-console trends, and clear behavioral signals
until traffic supports a valid experiment.

## Evidence and claim governance

### Evidence classes

| Class                          | Example                                                                            | Publication rule                                 |
| ------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| Public and approved            | Role title, portfolio-owned identity, approved project summary                     | May publish                                      |
| Locked prior-employer evidence | 8+ hours per week, 70 files, current workflow and platform constraints             | Preserve exactly within the approved boundary    |
| Owned but unfinished           | n8n booking agent                                                                  | Keep invisible until its release gate is met     |
| Private context                | Resume detail, interview preparation, internal career notes                        | Use for strategy only unless separately approved |
| Prohibited inference           | Client identity, internal fields, credentials, thresholds, unpublished screenshots | Never add by deduction                           |

### Claim review procedure

Before approving any new project copy:

1. Identify the source for each factual claim.
2. Confirm Leo's personal ownership accurately.
3. Confirm the metric, unit, timeframe, and comparison where a number appears.
4. Confirm the detail is approved for public use.
5. Remove any implication that exceeds the evidence.
6. Record the final status in the content source.

## Generic or AI-generated content patterns to avoid

The redesign should remove or avoid these content signals:

- Hero slogans that could describe any technology portfolio
- An AI capability presented as the primary professional identity
- Long tool lists before evidence
- Equal visual treatment for every project regardless of depth
- Agency-style language such as `Let's build a system for your systems`
- Repeated gradient words and animated keyword rotations
- Unsupported superlatives
- Placeholder case studies and fake browser mockups
- Badges that announce confidentiality instead of presenting available proof
- Repeated calls to action with different labels
- Generic process claims without practical detail
- A footer slogan that restates earlier claims without adding meaning

The current final-section heading `Let's build a system for your systems` is not
recommended. It reads as consulting copy and repeats the word system without
adding a concrete reason to schedule the call.

## Content performance rules

- Use the portrait and future media only when they add identity or evidence.
- Do not ship decorative stock photography.
- Do not use a client-side carousel for project copy.
- Keep essential page copy available in server-rendered HTML.
- Do not require JavaScript to reveal the basic role, project summary, or call
  action.
- Load future demo video only after clear visitor intent.
- Give future images intrinsic dimensions to prevent layout movement.
- Keep iconography sparse and use SVG where appropriate.

## Asset-related content requirements

The visual specification will define exact treatments. Content currently
requires these asset roles:

| Asset                | Section                   | Content purpose                           | Current decision                                                 |
| -------------------- | ------------------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| Portrait             | Hero                      | Human identity and trust                  | Keep; derive optimized versions later from `portrait image.heic` |
| Workflow diagram     | Featured project          | Explain system behavior                   | Keep as structured interface content, not a screenshot           |
| Technology marks     | Projects or capabilities  | Optional context                          | Prefer text; do not create a logo wall                           |
| Project demo         | Future owned case studies | Show real behavior                        | Deferred until each project is complete and approved             |
| Project poster image | Future case studies       | Preview the demo and support loading      | Create with the demo, not as a placeholder                       |
| Social sharing image | Metadata                  | Present a deliberate identity when shared | Required in the design phase                                     |
| Favicon family       | Browser and device chrome | Preserve the three-node workflow identity | Redesign in the visual phase                                     |

The favicon should retain one starting node and two downstream nodes. Its form
should read as a workflow at small sizes rather than as a generic share icon.

## Publication and release rules

- No draft copy in this document may be published until Leo approves it.
- No redesign source file may be changed under this specification alone.
- No unfinished project may receive a public placeholder.
- No GitHub push or Vercel action is part of content approval.
- Local implementation begins only after the content, visual, motion, and
  implementation specifications pass their respective approval gates.
- A later implementation must preserve the original portfolio in the original
  worktree and follow the rollback plan.

## Approval record

Leo approved the content and conversion direction on 2026-09-10. The approval
confirms:

- The primary and secondary audience treatment is accurate.
- `Schedule a Call` is the one primary action.
- The homepage order reflects how he wants the work understood.
- The approved hero headline and supporting copy are accurate.
- The three selected capability descriptions are accurate.
- The standalone AI capability is folded into the systems content.
- The current project evidence and locked wording boundaries are accurate.
- The booking agent remains invisible until complete.
- The approved final conversation heading and supporting copy are accurate.
- The approved search title and meta description are accurate.
- Email and LinkedIn remain quiet footer fallbacks.
- No availability, resume, GitHub, career timeline, or service offer appears.

## Decisions required from Leo

None. Leo approved the remaining content decisions on 2026-09-10.

## Decisions already settled

- Public professional label: `Systems Engineer: Integration + Automation`
- Hero headline: `I build systems that run the business`
- Hero supporting copy: `I design and build the systems a business relies on.
My background across operations and technical delivery helps me see how the
work gets done before I decide how the system should support it.`
- Search title: `Leo Sanga | Systems Engineer, Integration & Automation`
- Search description: `Portfolio of Leo Sanga, a Systems Engineer focused on
reliable systems integration and automation for business operations and
enterprise platforms.`
- Primary conversion: `Schedule a Call`
- Navigation labels: `Projects`, `Capabilities`, and `Approach`
- Homepage project structure: one `Projects` section containing the featured
  project and the four remaining project entries
- Approach heading: `My Approach`
- Selected capability descriptions: approved copy for all four groups
- AI positioning: use `AI + Intelligent Automation` as the second peer
  capability while keeping Systems Integration + Automation as the primary
  identity
- Project evidence labels: `The problem`, `What I built`, and `The hard part`
- Final conversation heading: `Start with a conversation.`
- Final conversation supporting copy: `The best solutions start with understanding
how the business actually works. Schedule 30 minutes to discuss a role or a
systems problem. I can walk you through my work, or you can show me how the
work gets done today. We'll identify where the system can improve.`
- Final conversation presentation: render each supporting sentence as its own
  stacked paragraph within one compact copy group
- Current footer slogan: remove in the redesign
- Secondary business audience: neutrally accommodated
- Scheduled duration: 30 minutes
- Private booking buffer: not public
- No visitor classification before booking
- No employment-availability or long-term-role language
- No public resume, GitHub, career timeline, or background section
- Current portrait remains the hero image
- Original HEIC is the future derivative source and remains out of Git
- The n8n booking agent stays invisible until complete
- Visible project filters are deferred until the archive justifies them
- No public NDA label or agreement identity
- Locked prior-employer evidence remains unchanged
- No implementation, GitHub push, or Vercel action is authorized by this file

## Deferred specifications

After Leo approves this document, the next planning artifacts should be created
in this order:

1. Visual identity and interface specification
2. Asset and imagery production specification
3. Motion and interaction specification
4. Responsive, accessibility, and performance specification
5. Frontend architecture and implementation plan
6. QA, visual review, and acceptance plan

Implementation begins only after the complete planning set is reviewed and Leo
explicitly approves Gate 1 in the workflow and rollback plan.

## Fresh-session continuation

A future LLM resuming content work should read:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. `docs/PROJECT-GOAL.md`
4. `docs/PORTFOLIO-REDESIGN-ANALYSIS.md`
5. This document
6. `docs/REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`
7. Every Markdown file directly inside `..\context files`, excluding `archive`
8. `src/components/portfolio/data.ts`

It should then inspect Git status, preserve user-owned changes, and stop before
implementation unless the relevant approval gate has been explicitly granted.
