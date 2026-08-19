# Pipeline Diagram Plan

Animated system diagrams in the Projects section, and the tiering that decides
which projects get one at all.

## Status (2026-08-19, third revision — copy pass and a scroll-fade fix)

**Every tier-2 card's copy was rewritten this pass, one Employee Onboarding
was removed entirely, and a real scroll-fade bug was found and fixed.** None
of it is a diagram change. Details:

- **Lead Qualification** retitled to "AI-Assisted Lead Qualification (HubSpot
  + n8n)" and fully rewritten. The n8n/LLM research layer was previously
  under-documented (Leo supplied it directly, not written anywhere before);
  see the corrected "How the lead qualification and routing system actually
  works" section below for the full account. `hardPart` and `stack` both
  changed to match.
- **Support Ticket Pipeline** and **Executive Reporting** rewritten to fix a
  tense break (they had drifted to past tense; `problem`/`solution` stay
  present tense project-wide) and to stop `solution` narrating mechanism the
  way `hardPart` already does.
- **Outbound Prospecting** gained a `hardPart` (grounding the LLM in business
  context was the real difficulty, not the research step) and a corrected
  `stack`. It did not have one before — this is new content, not a rewrite.
- **The n8n featured card** had its `problem`/`solution` rewritten to stop
  `solution` repeating a number `problem` already stated, and its stack
  corrected to `Microsoft SharePoint API`.
- **Employee Onboarding (Make.com) was removed from `PROJECTS` entirely** —
  not deferred, not moved to a "someday" list. Leo's call, no reason beyond
  wanting it gone recorded here, matching how tier 0 was handled.
- **Hero's intro paragraph** fixed a five-item enumeration
  ("operations, RevOps, customer success, implementation, and enterprise
  systems") down to a category-level pair, per `voice.md`'s "name the
  category, not its members" rule.
- **ContactCTA reverted to its pre-CTA-button text**: three same-size muted
  paragraphs instead of the two-paragraph lead/supporting layout the CTA
  commit (`756fdb9`) introduced alongside the "Book a Call" button. The
  button itself is untouched — only the paragraph text/structure reverted.
- **A real bug, not a copy issue**: `.reveal`'s scroll-timeline fade broke
  when a `<details>` disclosure inside the same reveal-tracked element
  opened. See "Constraint compliance" below for the fix; it is also recorded
  in the root `CLAUDE.md` since it is a durable architectural rule, not a
  one-off patch.

**The four standard ("also built") cards get no diagram of their own, and no
substitute for one.** This was tried twice and both attempts are now recorded
as rejected. The governing fact: a diagram needs internals, and for these four
projects the internals are the NDA surface. Lead Qualification is the clearest
case: its qualification criteria, weights and routing rules are the whole
substance and none of it can ship.

The second attempt, `FlowStrip`, failed for a reason worth keeping. It was not
that a four-word flow says nothing, though it does. It is that putting a
four-word flow on a card standing next to a card with a twenty-node diagram
invites the comparison and loses it. The strip read as "this project was four
steps." A weak diagram is worse than no diagram, because it makes a claim about
the project's depth that the project does not deserve.

**Done:**

- The Competencies dedup and claim layer described under "Competencies" below.
- `FlowDiagram` (`src/components/portfolio/FlowDiagram.tsx`), the `Flow` /
  `FlowNode` types and the `flow` field on `Project` in `data.ts`, the
  `.flow-*` block at the bottom of `styles.css`, and the render hook in
  `Projects.tsx`.
- The HubSpot RevOps card and its diagram. **Now hidden**, see below.
- `FlowStrip` and its five strips, then their removal. Nothing of it remains in
  the tree; see the "Rejected alternatives" table so it is not rebuilt.

**The RevOps card is hidden, not deleted.** `REVOPS_PIPELINE` still stands in
`data.ts` as its own named const, it is simply not in the `PROJECTS` array. The
card and diagram are built and type-check clean. Restoring it is putting the
const back in the array and settling which card carries `featured`.

That hiding force-settled the open decision about the `featured` flag: with the
RevOps card out, the flag went back to the n8n card, which is now the one wide
slot in the section.

**Three deviations from what this document specified.** They held up in the
build, so they are recorded here rather than treated as debt:

1. **No SVG connector layer.** Connectors are pseudo-element borders positioned
   in percentages of the row. A column centre sits at `25% - gap/4` of the
   grid, so the split and merge bars meet the drop stubs exactly, at any width.
2. **The "known ceiling" below is therefore gone.** There are no hand-authored
   coordinates to drift, so nothing needs to collapse to a `FlowStrip` under
   `md`. Under 640px the branch keeps both columns and the type tightens
   instead, because a stacked branch reads as two sequential steps.
3. **No legend.** Each node carries its own kind tag (`native workflow` /
   `python service` / `human decision`), which labels itself.

## ON HOLD (2026-08-19)

**The HubSpot RevOps card and its diagram are on hold at Leo's request.** The
code is built, type-checks clean, and renders. Nothing is half-finished and
nothing needs cleaning up before it sits. Do not extend, restyle, or "polish"
it in a new session unless Leo reopens it.

To see the current state: `bun run dev`, then the Projects section. The diagram
is at the bottom of the featured card under "How it runs".

**Two decisions were left open when the hold started.** They are the first
things to settle if this is picked back up, and neither is a bug:

1. **Does the RevOps card keep `featured: true`?** It took the flag off the
   n8n card, because a branching diagram needs the wide `md:col-span-2` slot
   and there is only one. Reverting is a one-line move of the flag.
2. **Does the diagram stay at the bottom of the card?** It sits after the stack
   tags and runs about 1090px tall at desktop width. The alternatives are
   moving it above "Business Problem", or splitting the featured card into
   text-left / diagram-right.

The hold covers the RevOps card only. `FlowStrip` and the five strips were
built afterwards and are live.

## How the n8n implementation-delivery workflow actually works

Built 2026-08-19 from Leo's own account of the workflow, since there is no
repo for it. Recorded here because it is the only written record: the workflow
lives in a prior employer's n8n tenant that he no longer has access to.

A signed contract kicks off internal client onboarding, and one step of that is
producing the client's copy of the deliverables for whatever service they
bought. Each project type has a template folder.

- **Trigger** is a row added to an intake sheet, holding company name, project
  type, logo link, the client's people. Deliberately simple enough that anyone
  on the team can fill it in.
- **A completeness check runs before anything is created**, so a half-filled
  row is caught up front instead of halfway through building a client's folder.
  Nothing executes at all in that case, and the person who entered the row
  learns straight away that it is incomplete. Corrected by Leo on 2026-08-19:
  an earlier draft said the run "stops" and that a failed run notified him, and
  both were wrong.
- **Platform routing**: the template exists in both Google Drive and Microsoft
  SharePoint, and a client uses one or the other. The two sides are separate
  chains in the workflow and **do not rejoin** — whichever workspace the client
  prefers is the one everything gets built in.
- **Each file gets its own branch. It is not a loop.** Every file needs
  different edits in different places, so each carries its own node chain. The
  largest project is 70 files.
- **The Drive constraint that forced this**: duplicating a folder in Google
  Drive creates shortcuts pointing at the original files, so a naive copy edits
  the master templates in place. The alternative to real per-file copying was
  duplicating by hand, or downloading and re-uploading.
- **In-file rewrites** (company name, logo, the client's people, at specific
  spots on specific pages) have no node that does them, so they are custom
  JavaScript and JSON. Same for retrieving each file's share link.
- **Share links** are scoped either to anyone holding the link or to the
  client's own email addresses, and land in an overview sheet describing what
  each file is and when it matters during the rollout.
- **A run takes about 3 minutes.** The manual version it replaced ran to 8+
  hours a week across clients. Note the units differ: the 8+ hours is a weekly
  aggregate, the 3 minutes is one run, so do not divide one into the other for
  a ratio.
- **A human reviews before the client sees it.** The overview sheet goes to
  C-suite buyers, executive sponsors and strategy leads.

### What the diagram simplifies, and why

`FlowDiagram` only draws a branch that merges back on the next row, and the
real Drive/SharePoint split never merges. Rather than extend the component, the
split is drawn as one branch row and the steps below it are written to hold
for either platform, with the SharePoint node saying in as many words that the
same chain exists a second time. The per-file fan-out is likewise one node
carrying the 70-file number rather than any attempt to draw 70 chains. Both
choices trade node-for-node fidelity for the shape and the ownership, which is
what the diagram is for.

### Screenshot of the live canvas is unusable

Leo has one, and it cannot go on the site: the n8n cloud URL in the address bar
carries the employer's tenant name and the workflow title is in the tab. It was
used as context only. It does confirm the structure — a small trigger cluster
on the left, then two large fan-outs each exploding into stacks of short
per-file chains.

### Open follow-up on this card

`Webhooks` is still in its `stack` list, carried over from the original copy.
The trigger described above is a sheet row, not a webhook. Left in place rather
than removed unilaterally; Leo's call whether it is accurate.

## How the lead qualification and routing system actually works

Recorded 2026-08-19 from Leo's own account, for the same reason as the n8n
section above: there is no repo and no remaining access, so this file is the
only written record of it. Corrected the same day, second pass, after a
review session established the card had drifted: the version below replaces
an earlier account in this file that treated the project as one small window
into an undisclosable system. The accurate picture is narrower and more
deliberate than that.

- **Leads arrive through whichever platform someone used to find the
  company** — the site, course signups, email outreach, a different CRM,
  content downloads among them — and most are reviewed and routed by hand, so
  follow-up timing depends on who picks a lead up and a qualified one can end
  up on the wrong path. Demo requests and non-demo engagements run through
  separate pipelines; a qualified demo request goes to a booking sequence, an
  unqualified one gets the starting rate, and non-demo traffic runs a
  sequence that can turn into a demo request later. Custom contact properties
  record where each lead was imported from and which automation it belongs
  in. (Source: Leo's own portfolio doc, not previously captured in this
  file.)
- **The card is deliberately repositioned onto the one slice of the system
  that is disclosable: the qualification-signal research.** An n8n workflow
  with an LLM produces that signal and writes it back to HubSpot as custom
  properties; the existing native HubSpot workflow reads those properties and
  acts on them unchanged. The layer split is the one that shows up across
  Leo's builds: the platform's own engine owns the routing, and the part the
  platform has no step for is built outside it.
- **The hard part was integration, not the research itself**: extending an
  already-running native HubSpot workflow with n8n without disrupting it.
  Webhooks trigger n8n, which uses the HubSpot API to write the custom
  properties the existing workflow already knows how to read.
- **Everything after routing — deal creation, deal stage routing, which
  sequence a lead enters by source — belongs to a larger HubSpot workflow
  this card does not show.** That is stated on the card itself now ("stays
  out of scope here"), not left implicit the way the earlier account had it.

The card's `stack` is `HubSpot API, Webhooks, n8n, LLM, Custom Properties` —
every tool named in the hard-part account above, and nothing carried over
from the wider system that stays undisclosed.

This entry is still the strongest argument for promoting a project from tier
2 to tier 1, since it genuinely has the topology a `FlowDiagram` wants. It
has not been promoted, for the same reason as before: the branch conditions
are the part that cannot ship, and a diagram of a branching system with its
branch conditions removed is the `FlowStrip` problem again at a larger size.
Ask Leo before attempting it.

## The diagram is behind a disclosure

Added 2026-08-19. Two open diagrams pushed the Projects section past 4,800px,
so each one now sits inside a native `<details>` with a "See how it works"
summary. Collapsed, the section is about 2,590px.

It is `<details>`, not React state, and that is load-bearing rather than
lazy. Collapsed content stays in the DOM, so it is still indexable, still
reachable by the browser's own find-in-page, and still openable with JS
disabled. A `hidden` class toggled by React would reintroduce exactly the
hidden-state-that-can-get-stuck failure the rest of `styles.css` was
restructured to remove.

Opening runs `scrollIntoView()` on the `<details>` from an `onToggle` handler,
one `requestAnimationFrame` later. Without it the click reads as doing nothing:
the button sits near the bottom of the card and everything it reveals lands
below the fold. The rAF matters because `toggle` fires before the expanded
content has been laid out, so an immediate scroll aims at the collapsed box.
`scrollIntoView()` is called with no options on purpose, so it inherits
`scroll-behavior` from CSS, which the reduced-motion block already forces to
`auto`. `.flow-disclosure` carries `scroll-margin-top: 5.5rem` to clear the
fixed header, matching the anchored sections.

**The open animates, but only because the hook allows it.**
`useActiveSection.ts` recomputes on `scroll` and `resize` only, and observes no
layout, so a height transition running while the page is stationary never
reaches it. `::details-content` transitions `block-size` with
`interpolate-size` scoped to the disclosure, behind `@supports` and inside
`prefers-reduced-motion: no-preference`, so an unsupporting browser and a
reduced-motion visitor both get the instant open. Closed is closed because the
element is closed, not because a rule is hiding it, so there is still no state
that can get stuck.

**This is the whole allowance.** Do not add anything that animates height
continuously, or anything that animates the `section[id]` itself. The reason
the old ban existed still holds; it just does not cover a one-shot transition
on a stationary page.

 The card sits inside
`section#projects`, whose box `useActiveSection.ts` measures on every scroll
frame. A height transition on the disclosure would move that box every frame
and reproduce the nav mis-highlight bug that has already been fixed twice. Only
the caret rotates, and a rotate is paint-time. Do not add a height, max-height,
or `interpolate-size` transition here without re-reading that hook.

## Node kinds

Four, and the fourth is not a step:

| kind | Default tag | Means |
| --- | --- | --- |
| `native` | native workflow | the platform's own automation engine |
| `service` | python service | hand-written code |
| `manual` | human decision | a person |
| `constraint` | platform limitation | a limit that shaped the design |

`constraint` renders with a dashed left edge, so it reads as a note before its
tag is read. It exists because the Google Drive folder-copy behaviour is not
something the automation does — it is the reason a step of the automation had
to be custom at all, and tagging it `custom code` claimed the opposite.

`tag` overrides the default per node, since the vocabulary is per-platform.
The n8n card uses `n8n node`, `custom code` and `human`.

## How the node copy is written

This is the part most likely to be got wrong by a fresh session, because the
first draft of it was. Every node carries a `label` and a `detail`, and both
are portfolio copy that a recruiter reads.

**Start from `../voice.md`.** It governs anything written in Leo's voice, and
three of its rules bite constantly here: no em dashes as a clause connector, no
"not X, it's Y" reversal, and no rule-of-three lists dressed up for rhythm. If
a sentence needs a dash to hold together it is two sentences, or one with
"and".

**Then the rules that came out of the 2026-08-19 rewrite.** The first draft
named specific fields, specific job titles, and bare counts. That reads as an
NDA problem even on work where the detail is harmless, and it crowds out the
shape the diagram exists to show.

- Say "client-specific info", not the list of fields being replaced.
- Say "reviewed before it reaches the client", not who reviews it.
- A number is fine as scale, and needs its context. 70 files is the largest
  project, not the typical one, so the node says so.
- Name a platform when the platform is the point (Google Drive, SharePoint),
  and not otherwise.
- Cut the sentence that explains the workaround for a problem nobody asked
  about. A node earns one idea.

**What a good `detail` does.** It says why the step is shaped the way it is,
not what the step obviously does. "Incomplete info stops the run" needs to say
that the check happens before anything is created, because that is the design
decision. It does not need to list which fields are checked.

**The `label` is a claim, the `detail` is the evidence for it.** Same rule the
Competencies cards follow, see "The rule the claims follow" below.

### The same rule for a card's `solution`, arrived at the hard way

`solution` is the impact. It says what changed for the people involved and it
does not describe the automation. Two drafts got this wrong in opposite
directions before it landed:

1. **Impact bullets welded into prose.** Three outcome sentences in a row, which
   reads as the bullet list it was made from, and one of them asserted a
   causality that was not there.
2. **A walk through the system.** Trigger, then platform split, then per-file
   handling, then the run time. More informative and still wrong: the diagram
   already carries the mechanism, and the stack tags carry the tools, so the
   one paragraph a reader is guaranteed to read spent itself on neither.

Do not write a third mechanism draft. If a mechanism detail feels essential to
the solution, it belongs in the `flow` or in `stack`.

**Never claim clients get the same deliverables.** Every set is client-specific,
which is the entire reason each file carries its own chain of edits rather than
being copied in a loop. A consistency claim has to be about the process, so
"what a client receives no longer depends on who put it together" is sayable
and "every client gets the same set" contradicts the project.

**The 8+ hours a week is manual effort, and its consequence is delay.** Say both
or the number is just a number. It also stays a weekly aggregate: never divide
it into the 3 minute run time.

**The HubSpot card's copy has not had this pass** and shows every habit above:
named properties, a test count, branch internals. It is on hold, so it was left
alone. Give it the same treatment when it reopens.

## Project stack tags use the Skills treatment

The rounded pills on the project cards were replaced with the same `tool-list`
utility the Competencies cards use: mono terms, CSS-generated middot
separators, a rule above, no containers. It is the existing utility reused, not
a second implementation, so the note in that utility still governs — it is
flex rather than inline, and must stay that way.

## Layout: diagram cards take the full row

Adding the second diagram forced this. Two `md:col-span-2` cards in an
`xl:grid-cols-3` grid left an empty third column beside the first one, and
stretched whichever short card landed beside the second one to the full height
of the diagram — about 1,800px of mostly empty card.

Diagram cards are now `md:col-span-2 xl:col-span-3`, keyed on `project.flow`
rather than on `featured`, so the held decision about which card carries
`featured` stays untouched. The grid now reads: RevOps full row, n8n full row,
then the five text cards in rows of three and two.

The side effect is that a full-width card leaves roughly 290px of empty space
either side of the diagram at 1440px. That is the argument for the
text-left/diagram-right split noted in the open decisions above, and it is
still not built.

**This file is the handoff.** There is no separate handoff doc, on purpose:
two documents about the same work drift apart and the fresh session reads the
wrong one. A new session needs three sections in particular, and should read
them in this order:

1. **"FlowDiagram: how it is actually built"** — the construction method.
2. **"How the node copy is written"** — the writing rules, which are stricter
   than they look and were arrived at by getting them wrong first.
3. **"ON HOLD"** just above, and the open decisions in it.

Read the rest of the file before proposing anything; several obvious-looking
approaches were considered and rejected on purpose, and they are listed under
"Rejected alternatives" so they don't get re-proposed. Everything in this file
now describes built code.

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

## One component, and three tiers around it

**Tiers 1 and 2 are built. Tier 0 was built and rejected on sight**, see below.
Everything else under this heading describes shipped code.

`FlowDiagram` is the only flow component. There is no second one, because the
answer for a project with no showable internals is not a smaller diagram, it is
a different tier.

The section becomes three tiers rather than one grid of equals. The problem
being solved is that seven cards in one grid claim equal depth, when one has
evidence and five cannot have any. Tiering stops the five from competing in a
comparison they lose.

### Tier 0: the shared pattern, once — BUILT AND ROLLED BACK

Built on 2026-08-19 and reverted the same hour, on sight, at Leo's call. There
is nothing left of it in the tree: no `SHARED_PATTERN` in `data.ts`, no render
block in `Projects.tsx`.

**Do not rebuild it without asking why it was cut.** The reason is not recorded
here, because Leo did not give one and inventing a plausible-sounding one would
be worse than leaving the gap. What is on the record is that a generic pattern
diagram above the cards was tried in full and did not survive first look.

The best guess available, which is a guess and not his reason: a diagram that
names no tool has nothing concrete in it, so it reads as a description of
automation in general rather than of Leo's work. That is the same failure as
`FlowStrip` from the other direction. The strip was too small to say anything,
this was too abstract to say anything.

What it was, for the record: six rows and one branch inside `FlowDiagram`'s
existing shape, above the cards, under a "How these get built" heading. Arrive,
check before creating, branch on platform-engine against hand-written code,
write back, notify, human review. Tags overridden to `automated step`,
`custom code`, `a person` since there was no implementation to name.

### Tier 1: one case study

The n8n implementation-delivery card, `featured`, full row, its diagram behind
the "See how it works" disclosure. The only card carrying a diagram while
RevOps is hidden.

It reads problem then solution, the same as an also-built row, so a reader
moving down the section reads every project the same way. Its `overview` and
`impact` bullets are gone, folded into `solution`. The three impact bullets it
had were the best on the page, so they were kept as claims and only moved: the
3 minute figure, the identical set with no drift, and implementation starting
as soon as the contract is signed. The 8+ hours a week stays in the problem,
and the two numbers are still never divided into each other, since one is a
weekly aggregate and the other is a single run.

`REVOPS_PIPELINE` got a `solution` at the same time, assembled from its own
overview and impact so the hidden card is not broken when it is restored. That
is not the copy pass it still needs.

### Tier 2: five supporting builds, as an accordion

The remaining five under an "Also built" heading, each a native `<details>`
row. Collapsed the whole tier is five lines.

**The open list was the first attempt and it was rejected.** Five entries at
full depth ran close to a screen each, so anything under them was a long scroll
away, and cards were what Leo had chosen in the first place precisely to avoid
that. The accordion keeps the full depth and costs almost no height until
someone asks for it.

**Native `<details>` again, not React state.** Same reasoning as the diagram
disclosures: the content stays in the DOM for crawlers and find-in-page, it
opens with JS off, and there is no hidden state that can get stuck.
`.project-disclosure` shares the caret and the `::details-content` open
transition with `.flow-disclosure`, and deliberately not its summary chrome.
That one is a button because it reveals a diagram inside a card; this one is a
row in a list, and the whole row is the click target.

There is **no `scrollIntoView` on open** here, unlike `.flow-disclosure`. A row
expands by a few hundred pixels rather than by a screen and a half, so the
jump would be more disruptive than the thing it fixes.

**Entry order is problem, then solution, then the hard part.** The solution
carries its own outcome rather than handing it to a separate `Impact` list,
because a result is what the solution produced and stating them apart made the
entry say the same thing twice at two different lengths. The hard part sits
last because it is the extra, not the point.

**This meant rewriting the five, not just re-rendering them.** `overview` and
`impact` came off those entries and `solution` replaced both. The old impact
bullets were the weakest copy on the page (`Reduced manual intervention`,
`Improved routing accuracy and consistency`) and none of it was verifiable or
attributable. The keyword surface did not depend on them, that lives in the
stack terms, which stay.

`overview` and `impact` were then removed from `Project` altogether once the
featured card moved to the same shape. Every project is `problem` plus
`solution` now, both required, and there is one rendering path for the copy at
both tiers. There is also no one-line "what this is" above the problem any
more: it restated the solution two paragraphs before the solution.

The measure (`max-w-3xl`) sits on the `<ul>`, not on the rows, so the top rule
and every row rule end in the same place. On the rows they did not.

**Tiering is derived, not flagged.** `Projects.tsx` splits on `project.flow`,
because a project that can show its topology is exactly the project that has
evidence to show. Restoring the RevOps card therefore puts it in tier 1
automatically, with no data change beyond the array.

### The "hard part" line

`hardPart?: string` on `Project`, rendered with the same dashed left edge and
muted mono tag a `constraint` node carries inside a diagram, since both say the
same thing. It is the one thing on a tier-2 entry that is specific, memorable
and safe to say, because a platform's limitation is not the employer's business
process.

It does not reuse `.flow-node--constraint` itself. That class carries a full
border and a panel background, and a box per entry would put back the card
affordance the list exists to remove. `.hard-part` in `styles.css` is the same
language without the box.

It only exists where there is a real one. Three of the five have one:

| Project | Hard part |
| --- | --- |
| Support Ticket Pipeline | HubSpot has no real ticket-lifecycle primitive, so the lifecycle was built out of properties and workflows. |
| Executive Reporting | The platform's own reporting could not do it, so the data had to leave the platform to be modelled. |
| Lead Qualification | Leads arrived from many sources with no shared definition of qualified, so that had to be settled before any routing could be built. |

The other two do not get one, and should not be given one. Outbound
prospecting's problem was time spent per prospect; onboarding's was repetition.
Both are reasons to automate, neither is a constraint that shaped a design.
Manufacturing a third-and-fourth constraint to make the five look even is
exactly the padding this whole revision is removing.

## FlowDiagram: how it is actually built

`src/components/portfolio/FlowDiagram.tsx`, styled by the `.flow-*` block at
the bottom of `src/styles.css`. Read both before changing either.

**The shape it can draw is deliberately narrow.** A vertical spine of rows,
where a row is one node, or two nodes forming a branch that merges back on the
very next row. Nothing else. That covers every pipeline on this site and needs
no node/edge model, no layout engine, and no measuring.

**Data shape.** `Flow` is `{ summary, rows: FlowNode[][] }`. One node in a row
is a spine step; two is a branch. Anything a row cannot express gets written
into a node's `detail` instead of drawn — see the two simplifications recorded
under the n8n section below.

**Markup.** Nodes are real HTML: selectable text, an `<ol>` of rows with a
nested `<ul>` for a branch, so the sequence reaches a screen reader without the
connectors having to say anything. A prose `summary` sits above the figure and
carries the same path in a sentence.

**Connectors are CSS, not SVG.** Pseudo-elements positioned in percentages of
the row they belong to. The one piece of arithmetic worth knowing: in a
two-column grid, a column's centre sits at `25% - gap/4` from the grid's edge,
so the split and merge bars meet the vertical drop stubs exactly, at any width,
with nothing measured and no coordinates to drift. **There is no SVG anywhere
in this component**, and the "SVG connector layer" this document originally
specified was never built.

**Pulse.** Each connector is a `background-color` line with a lavender gradient
sized `100% 300%` sitting off-view at rest; the animation moves
`background-position` down. `--i` is set inline per row and inherited by the
branch children, so the delay staggers and it reads as one signal travelling
down rather than every segment blinking together. Declared only inside
`prefers-reduced-motion: no-preference`, so frozen it is still a visible line.

**Narrow screens keep both branch columns** and tighten the type under 640px.
Stacking a branch would read as two sequential steps, which is the one thing
the diagram exists to disprove.

## Constraint compliance

Both components satisfy the two constraints established for this codebase:

- **SSR / no-JS**: it is all markup and CSS. Both render complete and correct
  on the server with zero JS. There is no hidden-by-default state that can get
  stuck, which is the failure mode `styles.css` was restructured to avoid.
- **Scrollspy**: diagrams live inside project cards, never on a `section[id]`,
  so no box measured by `getBoundingClientRect()` in `useActiveSection.ts`
  receives a transform.
- **Reduced motion**: pulse keyframes are declared only inside
  `@media (prefers-reduced-motion: no-preference)`, matching the existing
  pattern at `styles.css:173`. Frozen, every diagram is still fully
  informative — the motion is enhancement, never load-bearing.

**A fourth constraint, found the hard way on 2026-08-19: `.reveal` must never
sit on the same element as a resizable `<details>`.** `.reveal` uses
`animation-timeline: view()`, which recomputes its entry/exit range against
the element's *live* box every scroll frame — the same class of bug the
scrollspy rules above exist to prevent, just hitting the view-timeline reveal
instead of `useActiveSection`. The featured card's `.reveal` sat directly on
the `<article>` that also holds the flow disclosure; opening it grew that box
by close to a screen's height, and scrolling back up while it was open could
land the title mid-viewport inside the recomputed "still entering" range,
fading the whole card. Same shape on the "Also built" `<li>` rows, smaller
magnitude. Fixed by moving `.reveal` off the resizable element: onto an inner
wrapper that excludes the `<details>` for case-study cards, onto the
`<summary>` alone for accordion rows — in both cases an element whose own box
never changes size regardless of open state. Verified in-browser: with the
featured card expanded and scrolled so the title sits at viewport center,
`.reveal`'s computed `opacity` is `1` and its `transform` is the identity
matrix. Also recorded in the root `CLAUDE.md`, since this is a durable rule
for any future disclosure, not specific to these two diagrams.

## Flow data

Lives in `data.ts` beside the copy it belongs to, as an optional field on
`Project`.

| Project | Tier | Carries |
| --- | --- | --- |
| The shared pattern | 0 | A `FlowDiagram` naming no tools. **Built, then rolled back.** |
| Implementation Delivery (n8n) — **featured** | 1 | Its own diagram, behind the disclosure. Built. |
| HubSpot RevOps Architecture | — | Built, then hidden. Would be a second tier-1 card. |
| AI-Assisted Lead Qualification (HubSpot + n8n) | 2 | Problem, solution, hard part, stack. |
| Support Ticket Pipeline (HubSpot) | 2 | Problem, solution, hard part, stack. |
| Executive Reporting | 2 | Problem, solution, hard part, stack. |
| AI-Assisted Outbound Prospecting (n8n) | 2 | Problem, solution, hard part, stack. |

Employee Onboarding (Make.com) was removed from `PROJECTS` entirely on
2026-08-19, not deferred — see "Status" below. Tier 2 is now these four, all
of which carry a `hardPart`.

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
| `FlowStrip`: a 4-5 step compact flow on the standard cards | **Built, then removed.** A four-word flow beside a twenty-node diagram invites a comparison it loses, and reads as "this project was four steps". It also restated the card's own `overview` line. Do not rebuild it in any form: pills, arrows, breadcrumbs, or a step count. |
| Giving all five standard projects a `FlowDiagram` | Needs internals none of them can show. The tiering above exists so they do not have to. |
| A shared pattern diagram above the cards (tier 0) | **Built, then rolled back on sight.** See the tier 0 section. Ask Leo before proposing anything like it again. |

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

## Still open

1. **Do outbound prospecting and onboarding get a hard-part line?** They have
   none in the copy that exists, and inventing one is the padding this revision
   removed. If they do have one, it needs a sentence from Leo about what was
   actually difficult, since neither project has a repo to read.
2. **Does the RevOps card come back, and if so which card is `featured`?**
   There is one wide slot. See the hold above.

## Build order

Done, in this order:

1. `FlowDiagram` on the n8n card.
2. HubSpot RevOps card + diagram, then hidden.
3. `FlowStrip` + five strips, then removed.
4. Tier 2 as an open list, and the hard-part line on the three that have one.
5. Tier 0, the shared pattern, then rolled straight back out.
6. Tier 2 rewritten to problem/solution and turned into an accordion.
7. The featured card moved to problem/solution too, and `overview`/`impact`
   deleted from the type.
8. Full copy pass on every tier-2 card plus the featured card, Employee
   Onboarding removed from `PROJECTS`, Hero's enumeration fixed, ContactCTA
   reverted to its pre-CTA text, and the `.reveal`-on-a-resizable-`<details>`
   fade bug found and fixed on both the case-study cards and the accordion
   rows.
