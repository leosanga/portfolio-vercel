# Portfolio Redesign Strategy and Recommendation Trace

Status: Planning analysis, no implementation authorized
Last updated: 2026-09-10
Decision authority: Leo Sanga
Authoritative goal anchor: [`PROJECT-GOAL.md`](./PROJECT-GOAL.md)

## Purpose of this document

This document records the analysis behind the portfolio redesign recommendations. It explains what was reviewed, what conclusions were drawn, how Leo's latest requirements changed the strategy, and which decisions remain open.

It is a rationale and handoff document. `PROJECT-GOAL.md` remains the authoritative statement of the project's current goal and invariants. A future implementation specification should reference this analysis instead of copying it.

No website code was changed as part of this analysis.

## Executive conclusion

The portfolio should present Leo as a technically credible Systems Engineer who understands operations, owns implementation details, and builds dependable integrations and automations around real business constraints.

The strongest direction is a dark editorial systems portfolio with quiet pastel accents, strong typographic hierarchy, evidence-led project storytelling, and restrained motion. It should feel composed and specific to Leo. It should avoid the visual language of AI product landing pages, automation agencies, and component-library showcases.

The primary conversion should remain one action: scheduling a conversation. The recommended label is **Schedule a Call**. This wording can serve recruiters, hiring managers, technical interviewers, founders, and operators without forcing visitors to classify themselves before speaking with Leo.

Because the project list will grow, the homepage should become a curated front door rather than a permanent container for every project. Future public work should receive dedicated case-study pages and demo recordings. Prior-employer work should appear only at the level confirmed safe for public use, without artificial media placeholders.

## Inputs reviewed

### Career and positioning context

All Markdown files directly inside `C:\Users\Leo\Downloads\projects\context files` were read, excluding the `archive` folder. They covered:

- Leo's career history, target roles, and application positioning
- Interview stories and proof of work
- Systems integration and automation experience
- The n8n booking-agent project
- Portfolio constraints and evidence strategy
- Leo's writing voice and authorship rules

The recurring career pattern across those files is the bridge between operational understanding and technical implementation. Leo's experience is strongest when described through system behavior, failure handling, process constraints, integrations, and business consequences. AI is part of the toolset. It is not the professional identity the portfolio should lead with.

### Current portfolio implementation

The existing portfolio repository was reviewed at the source and rendered-interface level. Relevant surfaces include:

- `src/routes/index.tsx`
- `src/components/portfolio/Hero.tsx`
- `src/components/portfolio/Nav.tsx`
- `src/components/portfolio/Competencies.tsx`
- `src/components/portfolio/Process.tsx`
- `src/components/portfolio/Projects.tsx`
- `src/components/portfolio/ContactCTA.tsx`
- `src/components/portfolio/data.ts`
- `src/styles.css`

The current application is a React and TypeScript portfolio using TanStack Start and Router, Vite, Tailwind CSS, and Vercel deployment. It is currently a single-page experience with fixed navigation, a hero, competencies, process, projects, a contact section, and a footer.

The repository already contains shadcn-style UI primitives, although the visible portfolio is mostly custom composition. The redesign does not require replacing the stack.

### Design and resource references

The following references were evaluated for role, cost, licensing, and fit:

- [shadcn/ui](https://ui.shadcn.com/) for accessible primitives and source-owned component behavior
- [Recent](https://recent.design/info) for current visual references and pattern discovery
- [Aceternity UI](https://ui.aceternity.com/components) for selective free interaction ideas
- [Magic UI](https://magicui.design/) for selective open-source motion patterns
- [21st.dev](https://21st.dev/) for component discovery when its free access permits

These sources are sufficient. Adding more libraries before the direction is settled would create more selection work and increase the risk of a visually inconsistent result. Access limits and individual component licenses can change, so every borrowed component must be checked at the time it is selected.

The libraries should provide implementation references. They should not determine the portfolio's identity.

## How the positioning recommendation was reached

### Evidence from Leo's work

Leo's strongest proof is not a single tool or framework. It is the ability to understand an operating problem, translate it into a reliable system, integrate the required services, and account for real-world failure modes.

Examples in the source context include:

- Automation delivery that removed substantial recurring manual effort
- Integrations across workflow, CRM, calendar, email, identity, reporting, and support systems
- Troubleshooting that required both customer context and technical judgment
- The owned booking-agent build, where conversational AI is separated from deterministic validation and persistence
- Experience communicating with clients and operating teams while retaining implementation ownership

This evidence supports **Systems Engineer specializing in integrations and automation** as the lead position. It also explains why a generic AI-builder identity would undersell Leo's experience.

### Recommended audience hierarchy

1. Hiring managers and department leaders responsible for systems, automation, operations technology, or internal platforms
2. Technical interviewers evaluating architecture, implementation judgment, debugging, and reliability
3. Recruiters looking for a clear role fit and enough proof to start a conversation
4. Founders and operators with a concrete systems problem, as a compatible secondary audience

The hierarchy matters because the site currently risks reading like a consulting landing page. The redesign should welcome interviews and business conversations without publishing Leo's employment availability or career intentions.

### Intended first impression

Within the first screen, a visitor should understand that Leo:

- Works at the intersection of operations and engineering
- Can own integrations and automations beyond a prototype
- Thinks about reliability, constraints, and the people who use the system
- Communicates clearly and can discuss both a role and a business problem

The emotional impression should be calm, technically mature, deliberate, capable, and human.

### Search positioning

Leo wants the concepts `systems`, `engineer`, `systems engineer`, `integration`, and `automation` to be independently legible to search engines and visitors. They should appear in natural titles, headings, descriptions, and project copy rather than as a repeated keyword list.

Recommended homepage metadata:

- Title: `Leo Sanga | Systems Engineer, Integration & Automation`
- Visible professional label: `Systems Engineer: Integration + Automation`
- Description direction: identify Leo as a Systems Engineer specializing in systems integration and automation, then name the kinds of systems represented by the actual portfolio

The title contains the primary role and specialties once each. Page copy and future case-study descriptions provide additional semantic context. A meta-keywords tag should not be added because [Google Search does not use it](https://developers.google.com/search/docs/crawling-indexing/special-tags). Each future project route needs a concise, project-specific title and description, following Google's guidance for [descriptive and concise title text](https://developers.google.com/search/docs/appearance/title-link).

## How Leo's latest inputs change the plan

### The project list will continue to grow

This rules out a homepage that expands indefinitely through repeated cards. A growing portfolio needs a content hierarchy and a durable route structure.

Recommended model:

- Homepage: two or three curated featured projects
- Homepage proof index: a compact selection of additional work, including confidentiality-safe summaries where clearance exists
- `/projects`: the complete and filterable project archive when volume justifies it
- `/projects/$slug`: a dedicated case-study route for each substantial public project

The homepage remains concise while the archive can grow without weakening the main story.

### Future featured projects will include demos and case studies

Featured projects should be treated as editorial stories rather than large versions of ordinary cards. A future public case study should support:

1. Project premise and business problem
2. Leo's role and ownership boundary
3. Users, systems, and constraints
4. Architecture or workflow model
5. Important technical decisions and tradeoffs
6. Failure handling, validation, observability, or recovery behavior
7. Demo recording with an accurate poster image and transcript or summary
8. Outcome and evidence, using only supportable claims
9. Reflection, limitations, or next steps when useful

This structure makes technical depth legible to nontechnical visitors and gives technical reviewers a path to inspect judgment.

### Prior-employer work has confidentiality constraints

Confidential prior-employer projects should not imitate public case studies with blurred screenshots, fake dashboards, decorative browser frames, or empty demo areas. Those treatments look unfinished and can reduce trust.

Instead, a prior-work entry may include only what is confirmed safe or specifically approved:

- The class of business problem
- Leo's role
- The systems or capability categories involved
- A generalized architecture or process description
- Constraints and implementation considerations
- A supportable outcome stated at the permitted level
- A quiet `Selected details withheld` note only when visitors need an explanation

If a detail cannot be verified as safe, it stays out of the public portfolio.

### The single action is a call

One action is strategically sound because every important audience benefits from a conversation. The visitor may want to interview Leo, understand his background, explore a role, or discuss a specific operating problem.

The wording should avoid implying that every visitor is entering a sales funnel.

Recommended interaction:

- Primary CTA label: **Schedule a Call**
- Scheduler event title: **Conversation with Leo Sanga**
- Supporting message: explain that the call can begin with a role, Leo's background, or a systems problem
- Secondary fallback: a plain email link for visitors who cannot or do not want to schedule immediately

The email link is an access fallback, not a competing conversion goal.

The site should not ask visitors to choose `Hiring` or `Business` before opening the scheduler. That classification adds friction before Leo has enough context to make it useful.

### Employment availability stays off the public site

Leo does not want the portfolio to state that he is available, actively looking, or seeking the right long-term role. This information belongs in a call. The site can remain highly legible to hiring audiences through the Systems Engineer position, career evidence, project depth, and communication quality.

This means the hero should contain no availability badge, open-to-work language, or long-term-role statement. The call remains useful for interviews, introductions, and business problems without explaining Leo's private decision criteria in advance.

### The secondary business audience should be accommodated neutrally

Describing the secondary audience publicly would mean writing direct service language such as `I help companies automate...`, listing engagement types, or inviting businesses to bring Leo a project. That would make the portfolio behave more like a consulting site.

Neutral accommodation keeps the content focused on what Leo has built, how he thinks, and what kinds of problems he understands. A founder or operator can still recognize the relevance and schedule the same call. The site does not advertise consulting as a separate offer.

This is the recommended working direction because it supports business conversations without weakening the primary professional positioning.

### Scheduler expectations

The current Google Calendar scheduler offers a 30-minute call with a 30-minute buffer between bookings. The buffer allows a useful conversation to continue for up to one hour without creating a calendar conflict. The public interface should describe the booked duration as 30 minutes. The private buffer does not need to appear on the site.

Current form inputs are first name, last name, and an optional message. The optional message can remain neutral, with a prompt such as `What would you like to discuss?` if the scheduler permits field-label customization. The form should not require visitors to classify themselves as hiring or business contacts.

### First public case study

The n8n booking agent is the first planned full public case study after the project is finished. It should establish the reusable case-study template before an archive is built. No placeholder case-study route or unfinished demonstration should appear before the behavior can be represented accurately. Its strongest visual evidence will likely include:

- A short end-to-end demo recording
- A clear poster frame that explains the scenario before playback
- A system architecture diagram showing conversational AI, deterministic validation, persistence, calendar, CRM, and email boundaries
- Focused workflow excerpts when they remain readable and do not expose credentials or irrelevant configuration
- A written explanation of validation, idempotency, audit history, failure handling, and recovery behavior

The case study should distinguish the system's actual implementation state from planned capabilities.

### Locked confidential prior-work content

The applicable agreement controls what information is confidential and what disclosure is authorized, which is why [WIPO recommends that confidentiality agreements define protected information and permitted use](https://www.wipo.int/web-publications/wipo-guide-to-trade-secrets-and-innovation/en/part-iv-trade-secret-management.html).

Leo has explicitly approved the following existing portfolio content and directed that it must not be changed:

- The `8+ hours per week` figure
- The `70 files` figure
- The detailed implementation-delivery workflow
- Employer-derived architecture and platform constraints

These are content locks. Their facts, substance, and current wording may be restyled or repositioned, but they may not be removed, generalized, or rewritten without Leo's later approval. The approval records Leo's portfolio decision based on a verbal understanding and must not be described as written third-party clearance. It does not authorize adding new employer, client, metric, workflow, or implementation details by inference.

The public site will not display an `NDA-bound` label or identify the agreement. When visitors need an explanation, the approved neutral direction is `Selected details withheld`.

### Portrait source decision

The current portrait remains the final hero image. `portrait image.heic` is the approved production master. It is `4283×5711`, approximately `6.3 MiB`, and contains Leo's revised lighting treatment. The night scene contains gradients, fine light detail, and shadow information that may show compression artifacts after new crops are generated. Only optimized derivatives should be committed to the website. The HEIC master should remain untracked or be stored outside the public repository after the derivatives are approved.

### Background, resume, and GitHub stay private

The homepage will not include a dedicated career background section or timeline. No resume download or GitHub link will be added. Leo sends his resume directly with applications and does not want it publicly accessible. Removing these surfaces also keeps the scheduled call as the only primary conversion.

The portfolio may still use brief context inside project stories when it is necessary to explain Leo's role or decision-making. That context should not become a public resume substitute.

### Archive filters are deferred

Archive categories are labels such as `Integrations`, `Automation`, `Business Systems`, or `Reliability` that visitors could use to narrow a larger project catalog. The current and near-term catalog is too small to justify visible filters, and the future mix is not known yet.

The data model may support internal tags from the beginning, but no filter interface should be shown until the archive has enough projects for filtering to save time. A practical threshold is roughly eight substantial entries with at least two useful items in each visible category.

## Current-state critique

The current site is functional and coherent, but several combined patterns make it resemble an AI-generated landing page. No single pattern is automatically poor. The issue is the accumulation and repetition of familiar defaults.

| Before | Recommended after | Why |
|---|---|---|
| Hero, feature cards, process steps, project cards, CTA banner, and footer follow a common generated landing-page sequence | Build an editorial narrative around introduction, selected proof, working method, broader project index, and conversation | A story-led sequence feels authored and makes Leo's specific evidence the organizing principle |
| Lavender appears as the answer to most emphasis needs | Keep lavender as the signature accent and add mist blue, muted blush, warm text, and neutral plum surfaces with strict roles | A controlled palette creates hierarchy and avoids the synthetic neon-purple look common in AI templates |
| Rounded bordered cards are used repeatedly across sections | Use cards only for bounded interactive objects; use open editorial layouts, rules, aligned columns, and inset media elsewhere | Fewer containers create a more premium composition and clearer visual rhythm |
| Pointer spotlight, shimmer, glow, reveals, gradients, and hover lift appear together | Keep a small motion system tied to orientation, feedback, and hierarchy | Restraint makes each interaction feel intentional and reduces component-demo energy |
| Space Grotesk and JetBrains Mono create a familiar developer-template tone | Use a quieter editorial sans, a selective serif accent, and system mono only where metadata benefits from it | Typography can add humanity and authorship without ornament |
| Project proof is concentrated inside one long section | Curate two or three featured projects and give future public work dedicated routes | Each strong project receives space for decisions, demonstrations, and evidence |
| `Book a Call` repeats in a sales-oriented style | Use `Schedule a Call` with neutral supporting copy | The action remains clear for interview and business audiences |
| Desktop navigation disappears on smaller screens | Provide a compact mobile navigation with access to work, background, and the call action | Growing routes require navigation that remains useful on every viewport |
| Most sections use similar padding and centered headings | Alternate editorial compositions, widths, and alignment while preserving a stable grid | Varied composition creates hierarchy without relying on decorative effects |
| Tool and capability language can dominate the person behind the work | Lead with Leo's operating perspective, system decisions, and outcomes; tools become supporting metadata | Visitors hire judgment and ownership, then validate tool fit |

## Recommended information architecture

### Homepage

1. **Navigation**
   - Leo Sanga identity mark or wordmark
   - Work
   - Approach
   - Schedule a Call

2. **Hero**
   - Clear professional position
   - Short value statement grounded in systems and operations
   - Schedule a Call
   - Portrait integrated into the composition rather than enclosed as a glowing product card

3. **Selected proof**
   - Two or three featured projects
   - Public projects can lead to full case studies and demos
   - Prior-employer work appears only at a confidentiality-safe, approved level

4. **How Leo works**
   - A focused explanation of discovery, system design, implementation, and reliability
   - Concrete behaviors and decisions rather than generic process slogans

5. **Capability map**
   - Integrations and automation
   - Business systems and operational workflows
   - Reliability, validation, troubleshooting, and handoff
   - Tools shown as supporting evidence

6. **Project index**
   - A compact route into the wider body of work
   - Designed to accommodate ongoing additions

7. **Conversation section**
   - Neutral invitation to discuss a role, background, or systems problem
   - Schedule a Call
   - Email fallback

### Project archive

The archive should be introduced once the number of meaningful entries makes the homepage selection restrictive. It may support light filtering by problem area or capability once the catalog is large enough. It should avoid a wall of nearly identical cards.

Possible future filters include `Integrations`, `Automation`, `Business Systems`, and `Reliability`. These should be validated against the real project catalog rather than shown in the first archive version by default.

### Case-study route

A case study should prioritize reading and media consumption. It needs persistent context, clear section anchors, readable measure, accessible video controls, and a next-project path. The final action remains Schedule a Call.

## Visual system recommendation

This is the recommended starting system. Exact values should be tested against Leo's portrait, real project media, contrast requirements, and browser rendering before implementation approval.

### Color palette

| Token | HEX | Intended use |
|---|---:|---|
| Deep Ink | `#0F0E16` | Main page background |
| Aubergine | `#181520` | Alternate section background |
| Raised Plum | `#211C2A` | Inset surfaces and media frames |
| Warm White | `#F5F1F5` | Primary text |
| Soft Stone | `#B8B0BC` | Secondary text |
| Quiet Border | `#35303F` | Rules, dividers, and component borders |
| Pastel Lavender | `#C8B8F2` | Primary action and signature accent |
| Mist Blue | `#A9C9E8` | Technical diagrams, secondary highlights, and cool counterpoint |
| Muted Blush | `#DDB7C5` | Human or editorial accent used sparingly |
| Focus Lavender | `#E1D5FF` | Keyboard focus and high-visibility interaction state |
| Success Sage | `#AFC8B1` | Verified success or completion state only |

Usage rules:

- Lavender is the signature action color, not a universal decoration color.
- Mist blue supports diagrams, data relationships, or cool emphasis.
- Blush appears in small editorial moments and should not compete with the primary CTA.
- Text should use warm white and soft stone instead of pure white and generic gray.
- Gradients may support image blending or spatial depth. They should not color ordinary text or every surface.
- Final contrast pairs must meet WCAG AA for their actual text size and state.

### Typography

Recommended families:

- **Instrument Sans Variable** for navigation, interface, body copy, and most headings
- **Newsreader Variable** for one restrained editorial accent, such as a short hero phrase or case-study pull line
- System monospace for small technical metadata only

This pairing introduces personality while keeping the site fast and readable. The serif should never become a decorative theme applied to every heading.

Recommended type scale:

| Role | Desktop | Mobile | Weight and line height |
|---|---:|---:|---|
| Hero display | `clamp(2.75rem, 6vw, 5rem)` | Fluid | 520 to 600, `0.98` to `1.02` |
| Section title | `clamp(2.125rem, 4vw, 3.5rem)` | Fluid | 540 to 620, `1.04` |
| Project title | `clamp(1.625rem, 2.5vw, 2.25rem)` | Fluid | 560 to 640, `1.1` |
| Lead paragraph | `1.25rem` | `1.125rem` | 400 to 480, `1.55` |
| Body | `1rem` to `1.0625rem` | `1rem` | 400 to 480, `1.65` |
| Small label | `0.75rem` | `0.75rem` | 600, uppercase only when genuinely useful |
| Metadata | `0.8125rem` | `0.8125rem` | 450 to 550, `1.45` |

Typography rules:

- Keep body text between roughly 58 and 72 characters per line.
- Use negative tracking only for large display text.
- Avoid uppercase letter-spaced labels above every section.
- Use weight, measure, and whitespace before adding color.
- Self-host only the necessary font subsets and variable axes when licensing permits.

### Spacing and grid

- Base spacing unit: `4px`
- Primary spacing sequence: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120`
- Maximum content width: `1200px`
- Reading width: `680px` to `760px`
- Desktop grid: 12 columns, `24px` to `32px` gutters
- Tablet grid: 8 columns, `24px` gutters
- Mobile grid: 4 columns, `16px` to `20px` gutters
- Desktop section spacing: generally `112px` to `144px`
- Tablet section spacing: generally `88px` to `112px`
- Mobile section spacing: generally `64px` to `80px`

The grid should remain stable even when section compositions vary. Variation should come from span, alignment, media placement, and negative space.

### Buttons and links

Primary button:

- Label: Schedule a Call
- Height: `48px` in major placements, `42px` to `44px` in the navigation
- Horizontal padding: `20px` to `24px`
- Radius: `10px` to `12px`
- Background: Pastel Lavender
- Text: Deep Ink
- Hover: slightly lighter surface plus a `-1px` vertical translation
- Active: return to `0px` with a shorter duration
- Focus: visible `2px` Focus Lavender ring with offset

The main CTA should feel precise and confident. Avoid an oversized pill, permanent glow, sweeping shine, or animated gradient.

Text links should use underline offset, color change, or a small directional icon. They should not imitate buttons unless the action needs button prominence.

### Cards and project modules

- Radius: `14px` to `18px` for media or genuinely bounded modules
- Border: `1px` Quiet Border
- Default shadow: none or an extremely soft ambient shadow
- Elevated shadow: approximately `0 24px 60px -36px rgba(0, 0, 0, 0.65)`
- Hover translation: no more than `-2px`
- Internal spacing: `24px` mobile, `32px` to `40px` desktop for featured modules

Not every section should be a card. Use full-width compositions, fine rules, aligned lists, and open space for content that does not need a container.

### Navigation

- Keep navigation visually light and readable against the dark surface.
- Use a subtle translucent background only after scrolling if the content requires separation.
- Preserve an obvious keyboard focus state.
- Replace the disappearing mobile navigation with a compact, accessible menu.
- When project routes are added, homepage anchors must continue to work from nested pages.
- Keep Schedule a Call visible without allowing it to dominate Leo's identity.

### Imagery and media

- Keep Leo's portrait because it creates immediate human recognition.
- Integrate the portrait with the page background using crop, scale, and a restrained tonal field.
- Use real demo posters, real workflow excerpts, and purpose-built architecture diagrams.
- Do not use generic 3D blobs, stock dashboards, fake terminal windows, or decorative browser mockups.
- Give video a still poster, captions or transcript support, clear controls, and a useful written summary.
- Confidential prior-work entries should use typography and generalized diagrams only when those diagrams are confirmed safe and informative.

### Borders, surfaces, and shadows

- Use borders to organize information and show interactive boundaries.
- Use alternating dark surfaces for major spatial divisions.
- Reserve shadows for overlays, floating navigation, or interactive elevation.
- Avoid glowing borders and continuous ambient halos around ordinary content.
- Prefer one-pixel rules and tonal contrast for the editorial feel.

## Motion system recommendation

Motion should help visitors understand entry, hierarchy, relationship, and response. It should remain interruptible, quick, and safe for reduced-motion preferences.

| Interaction | Recommended behavior | Timing |
|---|---|---:|
| Initial hero entry | Opacity plus `8px` to `12px` vertical movement; at most four grouped reveals | `420ms` to `520ms`, `40ms` to `60ms` stagger |
| Section reveal | One reveal per meaningful group, opacity plus `12px` to `16px` movement | `340ms` to `420ms` |
| Button hover | Color shift and `-1px` translation | `140ms` to `180ms` |
| Project hover | Border change, media scale up to `1.015`, optional `-2px` module translation | `180ms` UI, `320ms` to `420ms` media |
| Navigation indicator | Translate and resize between active items | `180ms` to `240ms` |
| Mobile menu | Opacity and short vertical transition with immediate reversal | `180ms` to `240ms` |
| Case-study media | Fade or crossfade only when changing meaningful state | `220ms` to `300ms` |

Recommended easing for ordinary transitions: `cubic-bezier(0.22, 1, 0.36, 1)`.

Motion rules:

- Animate transform and opacity whenever possible.
- Never delay access to content for a cinematic intro.
- Do not run shimmer, beams, meteors, marquee content, or decorative looping motion.
- Pointer effects are optional and should be removed if they compete with reading.
- Disable nonessential motion under `prefers-reduced-motion: reduce`.
- Reduced motion should preserve state and comprehension, not merely shorten duration.
- Any third-party animation must be rewritten to use the same duration, easing, and interaction rules.

## Responsive behavior

### Mobile

- Preserve the professional position, proof, and call action in the first screen without crowding.
- Stack hero copy and portrait in the order that produces the strongest reading flow after real-device testing.
- Use a mobile menu that exposes all important routes and closes predictably on selection.
- Convert complex architecture diagrams into a readable vertical sequence or allow deliberate horizontal exploration with an accessible alternative.
- Keep tap targets at least `44px` where practical.
- Avoid hover-dependent meaning.
- Keep demo posters legible and video controls unobstructed.

### Tablet

- Use the 8-column grid to preserve asymmetry without forcing desktop line lengths.
- Allow featured project media and text to stack when side-by-side content becomes cramped.
- Maintain navigation clarity before switching to the mobile menu.

### Desktop and wide screens

- Cap content width so typography and compositions do not become sparse.
- Allow the hero portrait, project media, and diagrams to use controlled breakout widths.
- Do not stretch body copy or repeated project cards across the full viewport.

## Performance and accessibility expectations

- Preserve server rendering and meaningful HTML structure.
- Keep the initial page useful before client-side JavaScript completes.
- Target Core Web Vitals in the `good` range on representative mobile hardware and networks.
- Limit font families and self-host optimized WOFF2 assets where appropriate.
- Use responsive images with explicit dimensions.
- Load project videos on demand and provide lightweight poster images.
- Lazy-load below-the-fold media without delaying nearby text.
- Maintain visible focus, logical source order, skip navigation, landmark structure, and descriptive link labels.
- Test keyboard navigation, reduced motion, screen-reader naming, zoom, and color contrast.
- Avoid adding a large motion dependency for interactions that CSS or a small local utility can handle.

## Component-source policy

### shadcn/ui

Use for robust primitives such as dialogs, sheets, accordions, tooltips, and focus-managed navigation behavior. Restyle every visible surface to the portfolio system. Existing primitives in the repository should be audited before introducing duplicates.

### Recent

Use as an inspiration index to compare composition, typography, project storytelling, and navigation patterns. Do not copy a complete visual identity from one reference.

### Aceternity UI and Magic UI

Use only when a component solves a real communication or interaction need. Good candidates may include a restrained progressive blur, a well-made text transition, or a useful comparison interaction. High-spectacle effects should be excluded.

### 21st.dev

Use for discovery when the free tier allows it. Do not make the build process dependent on its availability or quota. Verify each component's author, license, package dependencies, accessibility, and server-rendering behavior before selection.

### Additional libraries evaluated on 2026-09-10

| Resource | Technical fit | Visual and maintenance risk | Recommendation |
|---|---|---|---|
| [Mantine](https://mantine.dev/getting-started/) | React-ready, supports server rendering, MIT-licensed, and offers a large component and hooks ecosystem | Introduces its own provider, CSS modules, styles, and component conventions beside the existing Tailwind and shadcn/Radix system | Do not install for the portfolio redesign. Reconsider only if a future application-like feature requires a Mantine-specific capability |
| [HeroUI](https://heroui.com/en/docs/react/getting-started) | Current version targets React 19 and Tailwind CSS 4, uses React Aria Components, and is Apache-2.0 licensed | Polished defaults can remain recognizable; its styles and component model would overlap with the existing primitives | Keep as a secondary behavioral reference. Consider headless or narrowly selected use only when React Aria solves a confirmed accessibility need better than the existing layer |
| [daisyUI](https://daisyui.com/docs/install/) | Tailwind CSS 4 plugin, simple class-based adoption, and MIT-licensed open-source core | Global component classes and themes make it easy to inherit a recognizable template identity or create token collisions | Do not install. Use documentation only as a broad reference for state coverage if needed |
| [Material UI](https://mui.com/material-ui/getting-started/) | Mature React component system with accessible production components; MUI Core is MIT-licensed | Material Design, Emotion, theme infrastructure, and application-oriented defaults work against the custom editorial direction and duplicate the current stack | Exclude from this redesign. It would be appropriate for a dense product interface, not this portfolio |

The expanded reference list is more than sufficient. The project should select one behavioral foundation and one custom visual system. The existing shadcn/Radix primitives plus local Tailwind styling remain the best foundation unless a later component requirement proves otherwise.

### Selection test for every borrowed component

A component is eligible only if all answers are satisfactory:

1. Does it support a specific user need or communication goal?
2. Can it be used for free in this project under a clear license?
3. Can it adopt the portfolio tokens without retaining a library-specific appearance?
4. Does it work with server rendering and the current stack?
5. Is it accessible by keyboard and with reduced motion?
6. Is its performance cost proportionate to its value?
7. Would the page remain strong if the effect were removed?

## Recommendation trace

| Evidence or constraint | Interpretation | Recommendation |
|---|---|---|
| Leo's best stories combine operations, implementation, and reliability | The differentiator is cross-functional systems ownership | Lead with Systems Engineer and integrations/automation, supported by operational context |
| AI is a tool inside the work | An AI-first identity would narrow and weaken the positioning | Mention AI only where it materially explains a project |
| Hiring conversations are the primary career objective | Recruiters and hiring leaders must understand fit quickly | Put role clarity and selected proof above a broad service pitch |
| Founders and operators may also arrive with problems | A business audience remains valuable | Use neutral call language and problem-aware supporting copy |
| Leo wants one action | Competing CTAs would dilute the conversion path | Use Schedule a Call consistently, with email as an accessibility fallback |
| `Book a Call` resembles a sales-funnel convention | Some hiring visitors may infer consultant or agency positioning | Rename the action Schedule a Call |
| Leo wants career intentions to emerge in conversation | Availability language would reveal positioning he prefers to discuss personally | Remove all availability and long-term-role messaging from the public site |
| Projects will be added continuously | A single expanding homepage will lose hierarchy | Curate homepage projects and add an archive plus case-study routes |
| Future public projects will have demos and case studies | The content model needs optional rich evidence | Design project entries around evidence level and public availability |
| Current projects have confidentiality limits | Rich media and detailed workflows cannot be applied uniformly | Carry forward only the prior-work information confirmed safe for public use |
| The current palette matches the portrait | Full replacement would discard a useful visual relationship | Retain pastel lavender and partner it with mist blue and muted blush |
| Lavender, glow, shimmer, gradients, and card hover recur together | The combined effect resembles generated tech templates | Reduce effect count and let composition, type, and evidence create distinction |
| The existing stack already supports the site | A platform migration adds risk without solving the design problem | Keep the stack and redesign the information architecture and system |
| Free resources are a hard constraint | Paid templates and pro component catalogs are out of scope | Use open-source primitives, selective free references, and local implementation |

## Decisions already established

- The redesign is planning-first. Implementation is a separate approved phase.
- The site positions Leo as a Systems Engineer specializing in integrations and automation.
- The primary audience includes hiring decision-makers and technical evaluators, with founders and operators as a compatible secondary audience.
- The public portfolio does not announce employment availability or a desired long-term role.
- The secondary business audience is accommodated through neutral problem and proof language rather than an advertised consulting offer.
- The intended character is premium, calm, human, technically credible, and evidence-led.
- Pastel lavender remains in the palette and loses its current role as the default answer to every emphasis need.
- The site uses one primary conversion: a scheduled call.
- The recommended CTA wording is Schedule a Call.
- The project architecture must support ongoing additions.
- The n8n booking agent is the first planned full public case study after it is finished.
- Future featured public projects should include demos and full case studies.
- The four approved prior-work content areas are locked against removal, generalization, or rewriting unless Leo later authorizes a change.
- The public site does not display an `NDA-bound` label or identify the agreement.
- The existing portrait remains the hero image, using `portrait image.heic` as the production master.
- The site does not include a public resume, GitHub link, career timeline, or dedicated background section.
- Visible archive filters are deferred until the project catalog is large enough to benefit from them.
- The scheduled event remains 30 minutes with a private 30-minute buffer between bookings.
- The favicon retains its three-node workflow meaning and receives a more distinctive small-size execution.
- Only free resources with acceptable licensing may be used.
- Motion is restrained, purposeful, accessible, and consistent.

## Deferred inputs that do not block the current design specification

These questions should be answered when the related content becomes active:

1. Which parts of the n8n booking agent are complete enough to demonstrate as current behavior when the project is finished, and which parts must remain labeled as planned?

These are product and positioning questions. Leo does not need to select visual trends or name design styles to answer them.

## Visual asset audit and placement plan

### Current asset inventory

| Asset | Current specification | Current use | Assessment |
|---|---|---|---|
| `portrait image.heic` | `4283×5711`, HEIC, approximately `6.3 MiB` | Untracked production master; not used by the website | Approved lighting treatment and sufficient source resolution for hero, responsive derivatives, and social-sharing composition. Must not be served directly or committed as a production asset |
| `src/assets/leo-portrait.jpg` | `1200×1600`, JPEG, approximately `136 KB` | Hero portrait inside a bordered 4:5 card | Strong source image with useful blue, violet, blush, and warm city light. File size is already modest, but one fixed JPEG does not provide responsive formats or art-directed crops |
| `public/favicon.svg` | Vector, 100-unit square viewBox | Preferred browser icon | Meaningful three-node workflow concept, but the diagonal branch resembles a generic share icon and loses distinction at browser-tab size |
| `public/favicon.png` | `32×32`, approximately `809 bytes` | PNG favicon fallback | Raster export of the same generic network mark |
| `public/apple-touch-icon.png` | `180×180`, approximately `3.5 KB` | Apple home-screen icon | Correct basic size, but repeats the same non-distinctive mark |

No other visual assets are currently present. The repository has no project screenshots, demo posters, social-sharing image, client logos, tool logos, resume thumbnail, or decorative stock imagery.

### Existing portrait recommendation

The current portrait should remain the hero asset, using `portrait image.heic` as the processing master. Its night-city background directly supports the revised palette:

- Blue city light supports Mist Blue `#A9C9E8`
- Violet atmosphere supports Pastel Lavender `#C8B8F2`
- Reflected pink and red light supports Muted Blush `#DDB7C5`
- Leo's dark clothing supports Deep Ink `#0F0E16` and Aubergine `#181520`
- Warm face and railing light prevent the palette from becoming cold or synthetic

The image should be integrated into the composition with deliberate cropping and tonal blending. The current glowing rounded-card frame should be removed. A future implementation should decode the HEIC master with orientation preserved, convert the working color space to sRGB, strip embedded metadata, and create responsive AVIF and WebP derivatives at approximately `480`, `768`, `1024`, and `1280` pixels wide. It should keep an optimized JPEG fallback, preserve intrinsic dimensions, and set an explicit focal position after testing each viewport.

No retouching should materially alter Leo's appearance. Acceptable processing includes exposure balance, mild noise control, careful sharpening for the rendered size, and a consistent color grade.

### Section-by-section asset needs

| Section or surface | Asset requirement | Source and treatment | Priority |
|---|---|---|---:|
| Browser tab and saved shortcut | Refined three-node workflow favicon system | Custom vector mark with small-size variants; export SVG, 32×32 PNG, and 180×180 Apple touch icon | Required for redesign |
| Social sharing and messaging previews | Open Graph image and matching Twitter image metadata | One `1200×630` branded composition using the portrait, Leo's name, and professional position; add `og:image`, image dimensions, alt text, and Twitter image metadata | Required before launch |
| Navigation | Text wordmark, with optional compact personal mark | Keep `Leo Sanga` as the primary identifier; the favicon mark may appear only if it remains legible and does not turn the header into a startup brand | Design decision |
| Hero | Existing portrait | Responsive, art-directed, and integrated into the page background without a glowing product-card container | Required and already sourced |
| Competencies | No decorative illustration required | Use typography, rules, and restrained system glyphs only if a glyph improves scanning. Avoid one generic icon per card | No new asset needed |
| Approach | No stock image or large illustration required | Use numbered editorial structure or one purposeful process line. The content should carry the section | No new asset needed |
| Featured public project | Demo poster, demo video, architecture diagram, and selected real interface or workflow excerpts | Capture from the actual project. Use one consistent media ratio and clear captions. Redact only when redaction is authorized and still meaningful | Required per future public project |
| Current confidential project | No screenshot, recording, client logo, invented mockup, or newly inferred detail | Preserve the four locked content areas and existing detailed workflow while avoiding any public agreement label or additional disclosure | Required constraint |
| Additional confidential work | No thumbnails that imply unavailable evidence | Use a compact typographic index only when its problem category, contribution, constraint, and outcome are approved for publication | Required constraint |
| Project archive | Optional generated cover system based on real project metadata | Use controlled typography, diagrams, or real posters. Do not create unrelated decorative thumbnails merely to fill a grid | Needed when archive is built |
| Case-study pages | Demo poster, video, diagrams, annotated screenshots, and outcome evidence as available | Every asset requires a caption and a reason to exist. Mobile versions must remain readable | Needed with first public case study |
| Call section | No portrait repeat or decorative illustration | Keep the close quiet and direct so the call action receives focus | No new asset needed |
| Footer | No social logos required | Text links are more editorial and accessible. Small functional icons may be used only if they improve recognition without replacing labels | No new asset needed |
| Error and empty states | Small personal mark optional | Use the same favicon mark at low emphasis instead of adding an unrelated illustration | Later refinement |

### Icon policy

Icons should be functional rather than decorative. Appropriate uses include:

- External-link indication
- Play, pause, captions, volume, and fullscreen controls for demos
- Mobile menu open and close controls
- Previous and next project navigation
- Disclosure state when the native marker is not sufficient
- Copy-link or share actions if case studies later include them

Use one icon family throughout. The repository already includes Lucide React, which is adequate for these controls. Keep icons optically aligned, use consistent stroke weight, and pair unfamiliar icons with text. Official product logos should appear only when brand recognition materially helps explain a project, and their trademark rules must be checked before use.

The portfolio should avoid decorative arrays of tool logos. They often resemble generated agency sites and shift attention from Leo's judgment to vendor familiarity.

### Favicon redesign brief

The three-node concept should be preserved because it represents a workflow automation with one starting node. Its geometry should be redesigned because the current diagonal branch resembles a share icon at small sizes.

Recommended direction: a compact **three-node workflow mark** with one clear origin and two downstream steps. Rounded-square workflow nodes and an orthogonal or gently stepped connector will read more like a system diagram than a social-sharing glyph. The connector can form a subtle `L` or `S` movement without turning the mark into a literal monogram.

Constraints:

- Recognizable at `16×16` without relying on fine gaps
- One-color form first, with Pastel Lavender on Deep Ink as the default pair
- Optional Mist Blue accent only at `32×32` and larger
- No gradient, glow, code brackets, lightning bolt, robot, or generic AI sparkle
- Clear silhouette in pinned tabs, bookmarks, and monochrome contexts
- Clearly differentiated origin and terminal nodes without relying only on color
- Related to the `Leo Sanga` wordmark without requiring a full corporate logo system
- Pixel-adjusted small variant rather than a blind raster reduction of a detailed master

Required exports:

- `favicon.svg` with an accessible, minimal shape
- `favicon.png` at `32×32`
- Optional PNG at `48×48` for broader fallback coverage
- `apple-touch-icon.png` at `180×180`
- Optional `mask-icon.svg` if Safari pinned-tab support is included
- Optional `192×192` and `512×512` icons only if a web manifest is later added

The favicon should be designed and approved before the Open Graph image so the two assets share the same identity.

### Assets that still need to be supplied or created

The approved HEIC portrait master is now available. The following project-specific assets do not exist yet:

- Future project demo recordings
- Video poster frames
- Public project screenshots
- Project architecture source diagrams, when the current CSS diagram is insufficient
- Any approved official product logos

The redesign can proceed using the approved HEIC portrait master and newly designed brand assets. Public project media should be added project by project as the underlying work becomes ready.

### Asset acceptance checklist

Every added visual asset must pass these checks:

1. It is authentic to Leo or a real project.
2. It is permitted for public use and does not expose confidential information.
3. It has a defined communication purpose.
4. It remains legible at its smallest rendered size.
5. It has responsive dimensions, modern formats where useful, and a lightweight fallback.
6. It includes meaningful alternative text, or empty alternative text when purely decorative.
7. It does not cause layout shift.
8. It is color-graded or styled consistently with the approved visual system.
9. It works in reduced-data and reduced-motion contexts when applicable.
10. Its license and attribution requirements are recorded.

## Plan for the content and conversion specification

The next planning artifact will be `docs/PORTFOLIO-CONTENT-CONVERSION-SPEC.md`. It will begin with status `Draft for Leo's review`. It becomes an approved implementation input only after Leo reviews the exact public copy and changes its status to approved.

The specification will define what the site says, the order in which it says it, and how each content decision supports the scheduled-call conversion. It will not define final visual styling, implement components, modify the scheduler, or publish unfinished project material.

### Strategy

The homepage will follow one persuasion sequence:

1. **Recognition:** establish Leo's name, Systems Engineer role, integration and automation specialties, and human presence immediately.
2. **Relevance:** show that Leo understands operational systems and the business conditions around them.
3. **Evidence:** move selected project proof ahead of broad capability claims wherever the final composition permits.
4. **Judgment:** explain how Leo approaches system constraints, implementation, validation, and reliability.
5. **Breadth:** show additional approved work without giving every project equal visual weight.
6. **Conversation:** close with one neutral invitation to schedule a call.

The site will earn the call through evidence. It will not advertise availability, consulting packages, a public resume, or a service menu.

### Proposed homepage content order

1. Navigation
2. Hero with role clarity, value proposition, portrait, and Schedule a Call
3. Selected proof
4. Capability map
5. Working approach
6. Additional project index
7. Conversation section
8. Footer with email and LinkedIn fallback links

This moves proof closer to the first impression than the current Skills, Approach, Projects sequence. The exact order will be validated against the finished copy length and mobile reading flow.

### Specification structure

The document will contain these sections:

1. **Document control**
   - Status, owner, date, source hierarchy, approval rule, and relationship to the goal anchor
2. **Conversion objective**
   - Primary action, supporting actions, success definition, and actions explicitly excluded
3. **Audience model**
   - Hiring decision-makers, technical evaluators, recruiters, and neutrally accommodated business visitors
4. **Visitor questions**
   - The questions each audience must have answered before a call feels worthwhile
5. **Message hierarchy**
   - Position, value, proof, working method, breadth, and invitation
6. **Homepage information architecture**
   - Section order, purpose, required content, entry and exit logic, and mobile priority
7. **Exact copy deck**
   - Navigation labels, hero copy, section labels, headings, supporting paragraphs, project introductions, CTA copy, footer copy, metadata, and social-sharing copy
8. **Copy evidence matrix**
   - Every factual claim mapped to an approved source, a content status, and its allowed editing scope
9. **Project-content system**
   - Featured public case studies, locked prior-work content, additional work, project archive, and future project lifecycle
10. **Booking-agent release states**
    - Homepage before completion, full case-study activation after completion, and rules preventing planned behavior from being presented as finished
11. **CTA and scheduler contract**
    - Schedule a Call label, 30-minute expectation, optional message prompt, new-tab behavior, placement, and email fallback
12. **Search and sharing specification**
    - Approved title, unique page descriptions, headings, canonical behavior, future case-study metadata, Open Graph copy, and structured-data candidates
13. **Responsive content behavior**
    - Reading order, line-length limits, truncation rules, disclosure behavior, and content that must never be hidden on mobile
14. **Accessibility requirements**
    - Heading hierarchy, descriptive links, alternative text, transcripts, captions, and plain-language interaction labels
15. **Measurement plan**
    - Vendor-neutral conversion events, privacy limits, and what can and cannot be inferred from outbound scheduler clicks
16. **Content governance**
    - Adding projects, approving claims, preserving locks, updating case studies, and preventing stale or unfinished content
17. **Risk register**
    - Dual-audience ambiguity, consulting tone, generic AI copy, confidential information, keyword stuffing, unfinished projects, homepage growth, and CTA competition
18. **Acceptance criteria**
    - Observable conditions required before the specification can be approved
19. **Deferred decisions**
    - Items tied to unfinished projects or later archive scale

### Copy-deck format

Each public copy block will be documented in a table with these fields:

| Field | Purpose |
|---|---|
| Surface | Route and section where the copy appears |
| Content role | What the copy must accomplish |
| Audience question | The visitor concern it answers |
| Draft copy | Exact proposed public wording |
| Evidence source | The approved file, fact, or content lock supporting it |
| Status | `locked`, `approved`, `draft`, `deferred`, or `prohibited` |
| Editing rule | Whether implementation may wrap, shorten, or reposition it |
| Mobile constraint | Maximum useful length or required reading order |
| Notes | SEO, accessibility, confidentiality, or interaction considerations |

This prevents a future implementation model from casually rewriting approved claims or substituting generic marketing copy.

### Content status definitions

- `locked`: existing content that must remain unchanged unless Leo explicitly reopens it
- `approved`: final copy authorized for implementation
- `draft`: proposed copy awaiting Leo's review
- `deferred`: content held until a project, asset, or decision is ready
- `prohibited`: content that must not appear publicly

The four prior-work content locks will be recorded individually as `locked`. The n8n booking-agent case study will remain `deferred` until Leo confirms that the project is finished and the demonstration reflects current behavior.

### Conversion model

The primary conversion is a completed scheduled conversation. The website can directly observe only the outbound scheduling click unless the scheduler later provides a privacy-appropriate completion signal.

CTA placements:

- Navigation
- Hero
- Final conversation section

All three use `Schedule a Call`. No section introduces a different primary action. Project links, disclosures, and demo controls support evaluation and do not become competing conversion buttons.

The final conversation section may explain that the scheduled duration is 30 minutes. The private 30-minute buffer remains absent from public copy. Email remains a lower-emphasis fallback in the footer.

### Measurement strategy

The implementation plan may define these vendor-neutral events:

- `schedule_call_click` with placement `nav`, `hero`, or `final`
- `project_case_study_open`
- `project_demo_play`
- `project_demo_complete` only when technically reliable and privacy appropriate
- `email_link_click`

The conversion review should prioritize qualified conversations rather than raw click volume. It should not claim completed bookings from outbound clicks, and it should avoid complex A/B testing while traffic volume is too low to produce meaningful conclusions.

### Search strategy

The approved homepage title is `Leo Sanga | Systems Engineer, Integration & Automation`. The visible professional label remains `Systems Engineer: Integration + Automation`.

Search terms will be supported through natural, accurate copy across the title, description, main heading context, capability language, and project stories. The specification will prohibit keyword lists, duplicate phrases written for crawlers, and a meta-keywords tag.

Each future case-study route receives a unique title and description based on the actual project. The n8n booking-agent page remains absent until it is ready to publish.

### Project growth and release strategy

The specification will describe two states:

**Before the booking agent is complete**

- Keep the homepage useful with the approved existing proof
- Preserve the four locked prior-work content areas
- Do not show an empty demo frame, disabled case-study link, or `coming soon` promotion

**After the booking agent is complete**

- Publish it as the lead public case study with a real demo and dedicated route
- Retain the locked prior-work evidence in a secondary approved position
- Use the new case-study schema for future owned projects

The project archive may store internal tags from the beginning. Visible filters remain deferred until the catalog is large enough for them to reduce effort.

### Content risks and controls

| Risk | Control in the specification |
|---|---|
| Site reads like a consulting funnel | Neutral business language, no service packages, no engagement menu, and one conversation CTA |
| Site reads like an AI-generated portfolio | Specific evidence, human voice, varied sentence structure, no broad transformation claims, and no library-derived copy |
| Role keywords become repetitive | One concise title, natural semantic coverage, and unique project descriptions |
| Locked prior-work details are changed | Claim-level status and explicit editing rules |
| New confidential details are inferred | Source mapping and a prohibition on unsupported expansion |
| Booking-agent plans are presented as complete | Deferred status and a release checklist tied to demonstrated behavior |
| Homepage becomes an endless project list | Curated featured proof plus an archive-ready content model |
| Secondary links compete with the call | No resume or GitHub link; email and LinkedIn remain low-emphasis fallbacks |
| Mobile layout hides essential proof | Required source order and no desktop-only core copy |
| Analytics overstate conversion | Distinguish outbound clicks from completed bookings |

### Approval process

1. Draft the specification using only approved context and locked content.
2. Present the complete page narrative before asking for line-level copy decisions.
3. Show exact hero and final CTA copy as reviewable drafts with rationale.
4. Review every factual claim against its evidence source.
5. Confirm that locked content remains byte-for-byte unchanged where the specification quotes it.
6. Resolve copy comments and mark accepted blocks `approved`.
7. Mark the specification approved only when no required copy or conversion decision remains open.
8. Use the approved specification as an input to the visual design specification and later implementation plan.

### Acceptance criteria for the specification

The content and conversion specification is complete only when:

- A first-time visitor can identify Leo, Systems Engineer, integration, automation, and Schedule a Call from the first screen.
- The site remains relevant to business visitors without advertising a consulting service.
- No availability, long-term-role, public resume, GitHub, or career-timeline language appears.
- The four prior-work locks remain unchanged.
- No new confidential detail is invented or inferred.
- The unfinished booking agent is not promoted as a completed case study.
- Every section has one clear purpose and a defined relationship to the conversion path.
- Desktop and mobile reading order are specified.
- Search metadata and sharing copy are exact and page-specific.
- CTA labels, destinations, and measurement semantics are unambiguous.
- A fresh implementation session can build the intended content without making new product or copy decisions.

## Proposed next planning artifacts

No code should be built until Leo reviews and approves the relevant specifications and implementation plan.

Recommended sequence:

1. **Content and conversion specification**
   - Final homepage narrative
   - CTA copy and scheduler behavior
   - Public, confidentiality-safe, and held-back evidence rules
   - Case-study schema and archive taxonomy

2. **Visual design specification**
   - Approved palette and typography
   - Grid and spacing tokens
   - Desktop, tablet, and mobile page compositions
   - Component states and accessibility behavior

3. **Motion specification**
   - Motion inventory
   - Exact transitions and reduced-motion equivalents
   - Rejected effects and performance limits

4. **Implementation plan**
   - Affected files
   - Data-model and route changes
   - Component reuse and component-source decisions
   - Migration order, verification, and rollback boundaries
   - Separate local worktree, localhost review loop, and local-only commit policy
   - No GitHub push or Vercel action until Leo approves the finished localhost redesign

5. **Implementation phase**
   - Begins only after the relevant specification and plan are approved

## Fresh-session read order

An LLM resuming this redesign should read in this order:

1. Repository `AGENTS.md`
2. Repository `CLAUDE.md`
3. `docs/PROJECT-GOAL.md`
4. This analysis document
5. `docs/REDESIGN-WORKFLOW-ROLLBACK-PLAN.md`
6. Every Markdown file directly inside `..\context files`, excluding its `archive` folder
7. `src/components/portfolio/data.ts`
8. The portfolio components and `src/styles.css`
9. The approved content, visual, motion, and implementation specifications once they exist

The resuming LLM should inspect repository status before editing and preserve all unrelated user changes.
