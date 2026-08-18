# Pipeline Diagram Plan

Add animated system diagrams to the Projects section: one full branching
diagram on the featured card, compact flow strips on the rest.

## Status (2026-08-18)

Planned, not started. Nothing in this document has been built yet.

**Done:** the Competencies dedup described under "Competencies" below — one
edit to `data.ts`, type-check clean.

**Next:** build order step 1 at the bottom of this file. Start there.

Read this whole file before proposing anything; several obvious-looking
approaches were considered and rejected on purpose, and they are listed under
"Rejected alternatives" so they don't get re-proposed.

## Why this and not a component library

The prior-employer projects are NDA-bound with no remaining access, so
screenshots, recordings, and live links are permanently unavailable for them.
An architecture diagram is the one evidence format that survives that
constraint — it shows the shape of a system without exposing the employer's
data, instance, branding, or records.

Secondary benefit: this is motion that carries information rather than
decoration, and it exists in no component registry, so it reads as authored
rather than assembled.

Net new dependencies: zero.

## Two components, not one

Five of the seven flows are straight lines. Building a general graph renderer
to draw a straight line is the wrong trade, so this is two components:

| Component | Used by | Complexity |
| --- | --- | --- |
| `FlowStrip` | 5 standard project cards | ~40 lines, no SVG |
| `FlowDiagram` | featured card + HubSpot RevOps card | SVG connector layer |

`FlowStrip` takes `string[]`. It does not need a node/edge model.

## FlowStrip

Horizontal row of small pills joined by a connector line, ~40px tall, sitting
under the project's stack tags.

- Markup is an `<ol>` — the ordering *is* the information, so list semantics
  give screen readers the correct reading for free.
- Connector is a `div` with
  `background: linear-gradient(90deg, transparent, var(--lavender), transparent)`
  at 200% width, animating `background-position`. One keyframe, reused by all
  five instances. No SVG, no JS.
- Wraps to two rows under `sm`; pills stay legible because they are real text.

## FlowDiagram

Branching layout for the two cards that have real topology.

- **Nodes are HTML in a CSS grid**, not SVG `<text>`. Keeps text selectable,
  responsive, and accessible, and avoids hand-tuning glyph positions.
- **Connectors are one absolutely-positioned SVG layer behind the grid**,
  `preserveAspectRatio="none"`, `aria-hidden="true"` — it carries no
  information the node sequence doesn't already carry.
- **Pulse** is a duplicated `<path>` with `stroke-dasharray: 8 400` animating
  `stroke-dashoffset`, reading as a signal travelling a wire.
- Semantics: `<ol>` with a nested `<ul>` per branch, plus one summary sentence
  above the figure describing the flow in prose.

### Known ceiling

Connector coordinates are hand-authored against a fixed desktop grid, so they
would drift if the grid reflowed. Rather than solve responsive SVG geometry,
**the diagram collapses to a `FlowStrip` below `md`** — branching is
unreadable at phone width regardless. Named here so it is a decision, not a
bug. Upgrade path if it ever matters: measure node positions with a
`ResizeObserver` and emit the path at runtime.

## Constraint compliance

Both components satisfy the two constraints established for this codebase:

- **SSR / no-JS**: SVG and HTML are markup. Both render complete and correct
  on the server with zero JS. There is no hidden-by-default state that can get
  stuck, which is the failure mode `styles.css` was restructured to avoid.
- **Scrollspy**: diagrams live inside project cards, never on a `section[id]`,
  so no box measured by `getBoundingClientRect()` in `useActiveSection.ts`
  receives a transform.
- **Reduced motion**: pulse keyframes are declared only inside
  `@media (prefers-reduced-motion: no-preference)`, matching the existing
  pattern at `styles.css:173`. Frozen, every diagram is still fully
  informative — the motion is enhancement, never load-bearing.

## Flow data

Lives in `data.ts` beside the copy it belongs to, as an optional field on
`Project`.

| Project | Mode | Flow |
| --- | --- | --- |
| Implementation Delivery (n8n) — **featured** | diagram | Webhook → parse client record → *fan out:* generate docs / create folder structure → update tracking sheet → notify |
| HubSpot RevOps Architecture — **new card** | diagram | Form → lead created → score *(service)* → route *(branch: bypass to AE / SDR round-robin)* → SLA watch 4h → handoff → sales pipeline |
| Lead Qualification & Routing (HubSpot) | strip | Inbound lead → qualify → route → sequence |
| AI Outbound Prospecting (n8n) | strip | Visitor identified → enrich company + LinkedIn → draft with LLM → deliver to Slack |
| Executive Reporting | strip | Sources → normalize → model → live dashboard |
| Support Ticket Pipeline (HubSpot) | strip | Intake → categorize → route → resolve → report |
| Employee Onboarding (Make.com) | strip | New-hire form → create Drive folders → update records → welcome email |

### NDA hygiene

Every diagram stays at pattern level — topology and tool names only, both
already public on the resume. No employer or client names, no real field
names, no scoring weights or thresholds, no internal process names. Test
before shipping each one: could a competitor reconstruct their business
process from this? If yes, genericize the step.

The HubSpot RevOps diagram is exempt from this — it is a personal sandbox
build — but its **live portal object IDs must be stripped** (`4704579305`,
`2488867568`, etc. as they appear in that project's `pipeline-diagram.md`).
They are real object identifiers with no reason to be published.

## Where the diagram content comes from

| Diagram | Source | Note |
| --- | --- | --- |
| HubSpot RevOps | `../hubspot-revops-architecture/docs/pipeline-diagram.md` | Already worked out as mermaid. Simplify hard — the source has 10 stages, the card needs ~6 nodes. Strip live portal IDs. |
| Implementation Delivery (n8n) | `data.ts` copy only | **No workflow JSON exists for this.** It is prior-employer work with no remaining access. Author the diagram from the card's own prose, at pattern level. |
| All five strips | `data.ts` copy only | Same — the flow column in the table above is the whole spec. |

Do **not** use `../n8n-portfolio-assistant/workflow/portfolio-ai-assistant.json`
as a source for the featured card. That JSON is this site's chat assistant, an
unrelated project that does not appear in `PROJECTS` at all. The naming
similarity is a trap.

## Rejected alternatives

Considered and turned down. Reasons hold unless the brief changes.

| Rejected | Why |
| --- | --- |
| Aurora / animated gradient background | On the anti-template banned list in `~/.claude/rules/ecc/web/design-quality.md`; costs frames on every scroll; the hero already has a lavender glow. |
| Bento grid for Competencies | Paints over a content problem instead of fixing it. The section needed dedup and hierarchy, not a new layout. |
| Tilt / 3D perspective cards | Reads as gimmick for a systems-engineering audience. |
| Morphing nav pill (`layoutId`) | Would require adding `motion` (~34KB gz) for the least visible change on the page. |
| Logo / tech-stack marquee | No logos to scroll; the stack tags already carry this. |
| Hero text reveal (word-by-word) | The hero already staggers in via `.hero-rise`. Motion decorating motion. |
| Installing a component library at all | These components are recognizable on sight and read as assembled rather than authored, which cuts against the thing this portfolio is selling. |
| Screenshots / recordings of the six existing projects | **Not possible.** See the NDA constraint under "Why this and not a component library". Do not re-suggest this. |

## Competencies

Separate from the diagrams, tracked here because it came out of the same pass.

**Done:** cards 1 and 3 in `COMPETENCIES` (`data.ts`) overlapped — `AI Agents`
and `MCP connectors` appeared verbatim in both. The boundary is now: **card 1
moves data between systems, card 3 makes decisions.** Card 1 lost
`AI-driven automation, AI Agents, MCP connectors`; card 3 was left unchanged
since it already owned those terms.

One exact string left the page: `AI-driven automation`. Card 3's `AI-driven
workflows` is the near-equivalent that remains. Flagged rather than silently
patched — restoring it is a one-word edit if wanted.

**Also done — the claim layer.** Each card now carries a claim in
`text-base` foreground type above its own term list. `COMPETENCIES` changed
shape from `{title, body}` to `{title, claim, tools[]}`.

The keyword surface was preserved rather than rewritten away: recruiters
Ctrl-F this page and it gets indexed, so every term survives as a real `<li>`.
`tools` is ordered by weight, named platforms and languages first.

### The rule the claims follow

**A claim names a territory. The term list is the evidence.** Claims do not
enumerate deliverables, because every deliverable worth naming is already in
the mono list two lines below it. Three drafts failed before this landed:

1. *Method* drafts described how the work is done, which duplicated the
   Approach section.
2. *Edge-case* drafts ("systems that have no supported integration") narrowed
   the claim to a difficulty instead of staking the domain.
3. *Enumerating* drafts listed the data model, routing rules and reporting,
   which repeated terms sitting directly beneath them.

Each claim also opens with a distinct gerund (Owning / Translating / Building
/ Running) and avoids the "Y instead of X" construction, which is the reversal
that `voice.md` bans.

### Rendering

Treatment: JetBrains Mono terms, lavender middot separators, no containers.
The generic bordered pill was rejected as reading AI-generic, which is also
the "uniform radius, uniform spacing" item on the anti-template list in
`~/.claude/rules/ecc/web/design-quality.md`.

`@utility tool-list` in `styles.css` is **flex, not inline** — JSX emits no
whitespace between `<li>` elements, so inline layout could only break *inside*
a term, and `REST API` split across two lines reads as two terms once a middot
is involved. Do not "simplify" it back to inline.

JetBrains Mono was added to the existing Google Fonts query in `__root.tsx`,
so it costs one extra font file on an already-open connection, no new request.

## Open decision

The HubSpot RevOps card's copy and whether it takes over `featured` from the
n8n card are **deferred to the separate demo-video planning session**, since
the recording lands there. This plan only establishes that the card exists and
gets a diagram.

## Build order

1. `FlowStrip` + one project's data, wired into a standard card. Smallest
   thing that proves the visual language.
2. Remaining four strips (data only, no new code).
3. `FlowDiagram` on the featured n8n card.
4. HubSpot RevOps card + diagram.

Stop after step 1 and look at it before continuing.
