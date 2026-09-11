# Portfolio Redesign Goal

Status: Approved goal anchor. Current release phase is recorded in
[`REDESIGN-CURRENT-STATE.md`](./REDESIGN-CURRENT-STATE.md).

Last updated: 2026-09-11

## Goal

Redesign Leo Sanga's canonical portfolio into a distinctive, high-end portfolio
for a Systems Engineer specializing in systems integration and automation. The
site should make Leo's practical understanding of business operations, technical
ownership, and reliability-minded engineering clear through focused proof rather
than visual spectacle.

The primary conversion is a scheduled call. That call may begin as an interview,
an introduction, or a conversation about a business systems problem.

## Primary audience

- Hiring managers and department leaders hiring for systems integration,
  automation, business systems, technical operations, or adjacent roles.
- Technical interviewers evaluating architecture, integration depth,
  reliability, and engineering judgment.
- Recruiters screening for role relevance and credible evidence.

Founders and operators with systems problems are a secondary audience. The site
must not read primarily as an automation agency or consulting funnel unless Leo
later changes the goal.

## Intended impression

The experience should feel technically credible, calm, deliberate, practical,
and human. It should show that Leo can understand how a business works, identify
the system constraint, and build a solution that continues working when the
process becomes more complex.

It must not resemble a generic AI startup, a no-code freelancer template, neon
cyberpunk design, or a collage of recognizable component-library effects.

The public site must not state or imply that Leo is currently available for
employment, actively job-seeking, or looking for a long-term role. Hiring
relevance should come from role clarity, professional evidence, and technical
judgment. Leo can communicate career intentions during a call.

## Portfolio growth model

- Leo will continue adding projects, so the homepage must not grow by rendering
  every project at full depth.
- The n8n booking agent is the first planned public case study once the project
  is complete enough to demonstrate accurately. It does not receive an
  unfinished case-study route or placeholder demo in the meantime.
- Future featured projects will have a dedicated case study and demo recording.
- Current prior-employer projects are confidentiality constrained and cannot gain
  screenshots, recordings, repositories, live links, client names, internal
  metrics, or implementation details without specific written clearance.
- Leo has explicitly approved and locked the following existing portfolio
  content: the `8+ hours per week` figure, the `70 files` figure, the detailed
  implementation-delivery workflow, and the employer-derived architecture and
  platform constraints. Do not remove, generalize, or rewrite their substance
  or wording without Leo's later approval.
- This lock records Leo's portfolio decision based on a verbal understanding.
  It must not be described as written third-party clearance, and it does not
  authorize adding further employer, client, or implementation details by
  inference.
- The content model and navigation must accommodate dedicated project routes
  without requiring a structural redesign later.

## Design invariants

- Preserve the dark foundation that works with Leo's portrait while moving to a
  softer pastel palette led by lavender and a complementary muted color.
- Use a rich but disciplined motion system with a clear purpose. Motion density
  should come from orientation, explanation, state, and feedback across the
  visitor journey rather than from several continuous decorative effects
  competing in one viewport.
- Keep the interface fast-loading and practical to maintain.
- Prefer custom composition and project-specific visual language over assembled
  landing-page blocks.
- Use free and properly licensed resources only. Verify each copied component's
  license and dependency cost before adoption.
- Accessibility, reduced motion, keyboard behavior, server-rendered visibility,
  and responsive behavior are requirements rather than later polish.
- Preserve truthful claims, source hierarchy, voice rules, and confidentiality
  boundaries.
- Preserve the meaning of the current three-node workflow favicon while giving
  it a more distinctive, small-size design.

## Search positioning

Visible copy and page metadata should naturally establish `Systems Engineer`,
`systems integration`, `integration`, and `automation` as separate, readable
concepts. Do not repeat keyword variants unnaturally or add a meta-keywords tag.

Recommended homepage title:
`Leo Sanga | Systems Engineer, Integration & Automation`.

The visible professional label remains `Systems Engineer: Integration +
Automation` unless later copy review produces a clearer version.

## Conversion invariant

The primary action is scheduling a call. Its language and surrounding copy must
welcome hiring conversations and business systems discussions without forcing
the visitor to choose a category before scheduling.

Recommended working label: `Schedule a Call`.

The current scheduler offers a 30-minute booking and keeps a 30-minute buffer
between bookings so a useful conversation can continue for up to an hour when
needed. It asks for first name, last name, and an optional message. The site does
not need to expose the private buffer rule.

Email remains a fallback contact method. Navigating to proof, reading a case
study, or watching a demo supports the conversion but is not a competing primary
conversion.

## Explicit non-goals

- Do not turn AI into Leo's professional identity.
- Do not position Leo primarily as a consultant, support professional, RevOps
  administrator, or automation-tool operator.
- Do not publish employment availability or long-term-role language.
- Do not publish a resume, GitHub link, career timeline, or dedicated background
  section.
- Do not install a collection of effects before the design system exists.
- Do not use paid templates, paid component packs, or paid AI generation.
- Do not invent metrics, outcomes, project internals, or evidence.
- Do not expose prior-employer or client information.
- Do not add a public `NDA-bound` label or identify the agreement.
- Do not begin implementation until the redesign specification and plan are
  reviewed and approved.

## Working agreement

Planning and implementation are separate phases. The planning phase defines the
information architecture, conversion path, published copy, design tokens,
component behavior, motion, responsive rules, accessibility, performance limits,
affected files, verification, and rollout. Leo reviews the complete design before
implementation begins.

Redesign implementation and every visual revision remain local until Leo
declares the design finished. Use a separate local branch, a separate Git
worktree, local commits, and side-by-side localhost servers. Do not push the
redesign branch to GitHub, invoke Vercel, create a remote preview, merge to
`main`, or change the live site during this phase.

Publishing the completed branch to GitHub and merging it into production are
separate approval gates. Preserve the current implementation through an
immutable baseline tag, retained history, and a reversible cutover commit.

## Seniority and role standard

Every substantive task must be approached with the relevant senior professional
perspective. State the active roles before beginning the work, use only the
roles that materially apply, and meet the combined quality bar during planning,
execution, review, and handoff.

Examples include:

- Portfolio strategy and positioning: senior web strategist and senior
  conversion strategist.
- Information architecture and user journeys: senior UX architect.
- Visual design and critique: high-end digital product designer and senior UI/UX
  designer.
- Content and public copy: senior content designer, conversion copywriter, and
  technical SEO strategist, following Leo's voice and evidence rules.
- Build planning and implementation: senior frontend architect and senior
  frontend developer.
- Motion: senior interaction and motion designer.
- Accessibility: senior accessibility engineer.
- Performance: senior web performance engineer.
- Testing, debugging, and defect resolution: senior QA engineer and senior
  debugging engineer.
- Security and privacy review: senior security-minded and privacy-minded
  engineer, without claiming legal authority.
- Git, deployment, recovery, and handoff: senior release engineer.

Seniority is an execution standard rather than invented credentials. It does not
override Leo's approval authority, expand the task scope, or permit unsupported
claims.

## Drift rule

Every proposed change must support an invariant in this goal or an approved
redesign specification. If it supports neither, stop and identify the drift
before building it.
