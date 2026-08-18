# Prompt: portfolio-vercel polish pass (accessibility, hierarchy, motion)

Paste this whole file as the first message in a fresh Claude Code session
opened at `C:\Users\Leo\Downloads\claude` (or `cd portfolio-vercel` first).

---

Implement the plan below in `portfolio-vercel/` (React 19 + TanStack Start +
Tailwind v4 + shadcn/ui, single-page portfolio site). Read
`portfolio-vercel/CLAUDE.md` first — it documents a scrollspy gotcha, and this
plan adds a second one it does not yet cover (see Constraint 1).

**Positioning note:** this is Leo's portfolio for **Systems Engineer:
Integration + Automation** roles (systems integration & automation) — that
title is already live in `Hero.tsx`. It is NOT a RevOps/Revenue-Systems/
Solutions-Architect portfolio; don't reframe copy toward that language.

## Before you start — branch and commit discipline

**You are on branch `polish/a11y-hierarchy-motion`, not `main`.** This was set
up deliberately before the session began. Do not switch to `main` and do not
merge until the work is verified.

- Production is `main` at `103a80f`, and it stays live and untouched for the
  whole of this pass.
- The revert point is the annotated tag **`pre-polish-2026-08-18`** (pushed to
  origin). Getting back to the pre-polish site is
  `git checkout pre-polish-2026-08-18` — no hash archaeology needed.
- Vercel builds a **preview deployment** for this branch. Use that preview URL
  for the verification checklist at the bottom, not a promoted production
  deploy. Merge to `main` only once the checklist passes.
- Third safety net, no setup required: Vercel retains every production
  deployment. Dashboard → Deployments → *Promote to Production* rolls back
  instantly without a rebuild or a git operation.

**First action of this session: commit this plan file.** It is currently
untracked. The previous version of this plan was also untracked and was
overwritten with no history to recover it from — don't repeat that.

```bash
git add ANIMATION_PLAN_PROMPT.md
git commit -m "docs: reviewed polish plan (a11y, hierarchy, motion)"
```

**Commit at the step 3 boundary, separately from step 6.** Steps 1-3
(CTA, focus rings, skip link) are low-risk accessibility fixes that stand on
their own and are worth landing as their own commit. Step 6 is where the
scrollspy regression risk lives. If motion goes wrong you want to revert one
commit, not lose the accessibility work along with it.

## Why this plan is ordered the way it is

An earlier version of this plan was motion-only. Review found that the motion
work was sitting on top of two broken things and one structural one:

- `ContactCTA.tsx` — the section the nav points to as the final destination,
  on a page whose entire job is "book a call" — contains no link. Dead end at
  the point of highest intent.
- Nothing in the codebase defines a `:focus-visible` style, despite `--ring`
  being a defined token at `styles.css:94` that nothing consumes.
- `Projects.tsx` renders six proof-of-work items at identical visual weight,
  so a hiring manager skimming it cannot tell which project is the strongest.

Those outrank every reveal animation on the page. Motion is step 6, last, and
the page should be shippable and better after step 3 even if steps 4-6 never
happen.

---

## Hard constraints

### Constraint 1 — the `<section id>` elements must never be transformed

`useActiveSection.ts:18` calls `getBoundingClientRect()` directly on the
`<section id="skills">` / `#approach` / `#projects` / `#contact` elements.

`getBoundingClientRect()` reports an element's box **after that element's own
transform is applied**. So:

- `transform: translateY()` on a section's **children** (cards, headings,
  wrappers) is **safe** — transforms are paint-time and do not alter an
  ancestor's layout box. Verified, not a risk.
- `transform` or `opacity` transitions on the **`<section>` element itself**
  shift its `rect.top` / `rect.bottom` on every frame of the animation. That
  reproduces exactly the nav mis-highlight bug `CLAUDE.md` says was hit and
  fixed twice — through a property the previous version of this plan never
  banned.

**Rule:** the `id`-bearing `<section>` element stays untransformed and
untransitioned for the lifetime of the page. Every reveal class, animation,
and observer ref goes on an **inner wrapper element**, never on the section.

The older ban still holds and is widened: do not animate `height`, `margin`,
`padding`, `display`, **or `transform` on any measured section element**.

### Constraint 2 — do not touch the `useActiveSection` algorithm

The center-line `getBoundingClientRect` approach is deliberate; a
ratio-threshold `IntersectionObserver` silently breaks for sections whose
height differs a lot from the band. Consume the returned `active` value, do
not rewrite the hook.

### Constraint 3 — content must be visible without JavaScript

This site is server-rendered (TanStack Start, nitro `vercel` preset —
`__root.tsx:110` renders the full HTML shell). Any reveal mechanism that
defaults to `opacity: 0` in the server HTML means that if the JS bundle fails,
is blocked, or hydration aborts, the affected sections are **permanently
invisible** — to users and to crawlers that don't execute JS.

**Rule:** the hidden state must never exist in a context where it cannot be
undone. The CSS-first approach in step 6 satisfies this structurally; if you
deviate from it, you own proving the no-JS case.

### Constraint 4 — reduced motion means "visible immediately", not "hidden forever"

The initial `opacity: 0` declaration must live **inside** the same
`@media (prefers-reduced-motion: no-preference)` block as the rule that
reveals it — not just the `transition` / `animation` declarations. If the
hidden state sits outside the query and the reveal sits inside, reduced-motion
users get content stuck at `opacity: 0` forever.

Outside that media query the reveal classes must contribute **no opacity rule
at all**.

### Constraint 5 — no `framer-motion`, no GSAP

Nothing here needs orchestrated exit animation, drag, or scroll-scrubbed
physics. Confirmed absent from `package.json`; keep it that way.

---

## Step 1 — Give `ContactCTA.tsx` an actual CTA

`ContactCTA.tsx:1-24` is currently three stacked `<p>` elements at the same
size with nothing clickable. Add a real primary action linking to
`CONTACT.bookingUrl` (already in `data.ts:142`), matching the pill button
treatment used in `Hero.tsx:22-29`. Keep `target="_blank"` +
`rel="noopener noreferrer"`.

Also collapse the three same-size paragraphs — they read as a wall. One lead
line at larger size plus a supporting line is enough.

While here: `ContactCTA.tsx:18` reads "We'll identify the gaps, the
opportunities, and the right solution." That is consulting-engagement
language and cuts against the Systems Engineer positioning above. Rewrite it
toward the systems-integration framing. Do not touch any other copy.

## Step 2 — Focus-visible styling everywhere

No `:focus-visible` rule exists anywhere in `styles.css`, and no component
applies a `focus-visible:` utility. Keyboard users get browser defaults only.
`--ring` (`styles.css:94`) is defined and unused — consume it.

Add a visible focus ring to every interactive element:
- `Nav.tsx:12` (wordmark), `Nav.tsx:22` (nav links), `Nav.tsx:34` (CTA)
- `Hero.tsx:22` (CTA)
- `Footer.tsx:11`, `Footer.tsx:22` (email / LinkedIn links)
- the new CTA from step 1

Prefer one shared utility or `@layer base` rule over repeating the classes in
six places. Check ring contrast against the dark `--background` — the lavender
ring must be visible on both `--background` and `--panel` surfaces.

## Step 3 — Skip link

`__root.tsx:110-122` renders `{children}` with no skip link, so every keyboard
and screen-reader user tabs through four nav links plus the CTA before
reaching any content, on every load.

Add a skip link as the **first focusable element** in `src/routes/index.tsx`
(above `<Nav />`), visually hidden until focused, targeting `<main>`. Add
`id="main-content"` to the existing `<main>` at `index.tsx:33`.

Put it in `index.tsx`, not `__root.tsx` — the 404 and error shells have no
`<main>` to point at.

**Verify after this step:** the page is meaningfully better than it was, with
zero animation added. If it isn't, stop and reassess before continuing.

## Step 4 — Projects hierarchy

`Projects.tsx:14-58` renders all six items from `data.ts:53-136` in a uniform
`md:grid-cols-2 xl:grid-cols-3` grid with identical card shells. They are not
of equal strength: the n8n implementation-delivery system carries a quantified
"8+ hours per week" outcome and matches the target title directly; employee
onboarding automation does not.

Promote one item to a featured card at greater visual weight (wider span,
larger title, more breathing room) with the remaining five in a denser
secondary grid.

**Keep all six projects.** Do not trim the list — the spread of tooling (n8n,
HubSpot, Make.com, fully custom) is itself a signal for an integration role.

**Implement the featured item as an explicit `featured: true` flag** on the one
entry in `data.ts`. Do not reorder the array and do not hardcode an index —
which project is featured is going to change (see Deferred, below), and a flag
makes that a one-line edit.

Feature the n8n implementation-delivery system for now.

**Do not vary the section type scale.** `Competencies.tsx:7-15`,
`Process.tsx:7-9`, and `Projects.tsx:7-11` all repeat the same eyebrow →
`text-3xl md:text-4xl` → body rhythm, and that uniformity is deliberate to
leave in place. The featured card already makes the Projects section read
heavier by content; adding a second differentiation mechanism on top of it
makes the page noisier, not clearer. Note that `Process.tsx:5` already carries
`border-y border-border`, so the page has exactly one section-level
differentiation already — leave it at one.

## Step 5 — Process reads as a sequence

`Process.tsx:12-20` is an explicit `01 → 02 → 03 → 04` progression rendered as
four visually independent list items. This is the one section on the page
where the generic uniform treatment actively contradicts the content.

Add a connecting line or progress indicator so the sequence reads as a
sequence. This is **required**, not optional — an earlier draft demoted it to
"skip if it complicates the grid," which cut the only content-aware idea in
the plan.

Implement it with `transform: scaleX()` on a child element, or a static
gradient rule, or a border on the `<li>` elements. Anything but a width/height
animation, per Constraint 1.

## Step 6 — Motion

### Primary approach: native CSS scroll-driven animations

Use `animation-timeline: view()`. No hook file, no observer, no React state,
no hydration dependency, no SSR hidden-content risk.

In `src/styles.css`, add a reveal utility nested like this:

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 25% entry 100%;
    }
  }
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: none; }
}
```

Why this nesting solves three problems at once: outside either the media query
or the `@supports` guard, **no rule applies at all**, so the element renders at
its natural `opacity: 1`. That is simultaneously the reduced-motion fix
(Constraint 4), the no-JS/SSR fix (Constraint 3), and the unsupported-browser
fallback. There is no state to get stuck in.

Browser support: Chrome/Edge 115+, Safari 26, Firefox 144. The `@supports`
guard makes the tail harmless — those users see the finished page instantly.

**The `animation-range` above is load-bearing — do not change it casually.**
Scroll-driven animations are scrubbed, not triggered: progress is a pure
function of the element's position in the scrollport, so they run **backwards
when the user scrolls up**. There is no one-shot option; that is inherent to
the mechanism. What the range controls is whether anyone ever sees the
reversal.

`entry 25% entry 100%` completes the animation by the time the element is
fully inside the viewport, so a card is settled at `opacity: 1` for the entire
time it occupies readable screen space. Scrolling back up to re-read a project
shows no reversal. The only visible scrub-back is in the bottom sliver of the
viewport, as a card is already leaving.

Ranges that extend into the `cover` phase (e.g. `entry 10% cover 25%`) push
the animation well past full entry, so cards are still fading while sitting
mid-screen and visibly re-fade on the way back up. That reads as broken. Keep
the range confined to `entry`.

Two residual behaviors, both accepted: trackpad jitter with a card parked at
the bottom edge causes a mild flicker in that sliver, and clicking a nav link
scrubs intervening sections at smooth-scroll speed (reads as motion blur, and
everything lands settled). Neither is worth the JS path's failure modes.

Apply `.reveal` per-element, on inner wrappers only (Constraint 1):

- `Competencies.tsx` — on each `<article>` (`Competencies.tsx:19`)
- `Process.tsx` — on each `<li>` (`Process.tsx:14`)
- `Projects.tsx` — on each `<article>` (`Projects.tsx:16`)
- `ContactCTA.tsx` — on the inner `<div>` (`ContactCTA.tsx:4`), not the section

Note this deletes the stagger problem rather than solving it. Each card gets
its own view timeline driven by its own visibility, so the six Projects cards
in rows two and three no longer burn their stagger delay while off-screen.
What you lose is deliberate within-row stagger — all cards in a row animate
together. That is an acceptable trade, and arguably more honest.

### Hero entrance

Above the fold, so no scroll timeline. Plain time-based keyframes with
`animation-delay` stagger on headline → subcopy → CTA, portrait card fading
and scaling in slightly after. Wrap in
`@media (prefers-reduced-motion: no-preference)` only — no `@supports` needed.

### Card and button hover

**Read this before touching the cards.** `Competencies.tsx:21` and
`Projects.tsx:18` currently use `transition-colors`, which transitions color
properties *only*. Adding `hover:-translate-y-1 hover:shadow-lg` on top of
`transition-colors` makes the lift and shadow **snap instantly** while the
border color eases — visibly broken.

Change those to an explicit
`transition-[translate,box-shadow,border-color]` (or plain `transition`) at
the same time you add the hover utilities. Do not skip this.

**The property is `translate`, not `transform`.** Tailwind v4 compiles
`-translate-y-1` to the standalone `translate` property, so a list naming
`transform` transitions nothing and the lift still snaps while border and
shadow ease. Verified against the running page: with
`transition-[transform,...]` the computed `translate` jumps straight to
`0px -4px` on hover; with `transition-[translate,...]` it eases
`0 → -0.98 → -2.89 → -3.97px` over ~160ms.

Buttons (`Hero.tsx:26`, `Nav.tsx:38`) currently use `transition-opacity` —
same issue if you add `hover:-translate-y-0.5 active:translate-y-0`. Widen the
transition property list there too, again with `translate`.

Note that all card hover states are invisible on touch devices. That is
acceptable — the cards carry no action — but it means roughly half this
section's polish does not exist on mobile. Don't over-invest in it.

### Nav

Add a real active-link underline or pill driven by the existing `active` value
from `useActiveSection` (`Nav.tsx:7`). Consume only; do not modify the hook.

**Skip scroll-elevation.** The header already has `border-b`,
`backdrop-blur-md`, and `bg-background/90` (`Nav.tsx:10`) — on a dark page,
elevation adds almost nothing visible, and the naive implementation adds a
second `window` scroll listener alongside the rAF one `useActiveSection`
already runs. If it's wanted later, use a 1px sentinel element plus a single
`IntersectionObserver`, not a scroll handler.

### Fallback approach — only if strict one-shot reveal is required

If the scroll-up reversal above is unacceptable, build a `useInView` hook
instead — `src/components/portfolio/useInView.ts`, ref + boolean,
`IntersectionObserver` that unobserves after first trigger. Separate from
`useActiveSection`; do not merge them.

If you take this path, all of the following are mandatory, not optional:

1. **SSR guard.** Add `document.documentElement.classList.add("js")` as an
   inline blocking `<script>` in `<head>` in `RootShell` (`__root.tsx:113`),
   and scope the hidden state to `.js .reveal { opacity: 0 }`. Without JS the
   class never lands and content renders visible.
2. **Ref placement.** Inner wrapper only, never the `<section>` (Constraint 1).
3. **Never call `useInView()` inside `.map()`** over `COMPETENCIES` or
   `PROJECTS` — that violates the rules of hooks. Either use one section-level
   observer with a `transitionDelay` stagger, or extract a `<RevealCard>`
   child component that calls the hook once per instance.
4. **Cap the stagger index** if using the section-level approach:
   `Math.min(i, 2) * 60`. Projects has six cards across up to three rows; the
   later rows are off-screen when the section trips, so an uncapped delay is
   spent invisibly.
5. Observer created inside `useEffect`, disconnected in cleanup. Verify it
   survives StrictMode double-invoke.
6. Leave one small assertion-based check behind covering: returns `false`
   before any callback fires, unobserves after the first `isIntersecting`,
   does not re-trigger on a second intersection.

---

## Files touched

**Step 1-3:** `ContactCTA.tsx`, `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
`styles.css`, `src/routes/index.tsx`
**Step 4-5:** `Projects.tsx`, `Process.tsx`, possibly `data.ts` (a `featured`
flag only — no `id` renames, no reordering)
**Step 6:** `styles.css`, `Competencies.tsx`, `Process.tsx`, `Projects.tsx`,
`ContactCTA.tsx`, `Hero.tsx`, `Nav.tsx`
**Fallback path only:** new `src/components/portfolio/useInView.ts`,
`__root.tsx`

**Not touched:** `useActiveSection.ts` (algorithm), `routeTree.gen.ts`,
`src/components/ui/*`.

Skip the "consolidate hover treatment into `buttonVariants`" idea from the
earlier draft. Two call sites, both `<a>` not `<button>`; consolidating means
converting them to `Button asChild`. Not worth it.

---

## Verification

Run `bun run dev` → `http://localhost:8080`.

**Content and accessibility (steps 1-3):**
1. `#contact` has a working, clickable primary action at both 390px and
   1440px widths.
2. Tab from a fresh page load: the skip link is the **first** focusable
   element and jumps to `<main>`. Continue tabbing — every nav link, both
   CTAs, and both footer links show a clearly visible focus ring against the
   dark background.

**Hierarchy (steps 4-5):**
3. At 1440px and 390px, the featured project is unambiguous without reading
   all six cards.
4. The Process section reads as `01 → 02 → 03 → 04`, not four independent
   blocks.

**Motion (step 6):**
5. Hard-refresh: Hero staggers in once and does not replay when scrolling past
   it and back.
6. Scroll through Skills → Approach → Projects → Contact: every block reveals
   as it enters. If using the CSS scroll-timeline approach, confirm the
   scroll-up reversal behavior is what you decided on, not a surprise.
7. Hover a Competencies card and a Projects card: the lift, shadow, and border
   color all ease together. **If any of them snaps, the `transition-colors`
   fix in step 6 was missed.**

**Scrollspy regression (critical):**
8. Click every nav link; confirm the correct highlight each time. Scroll
   manually across each section boundary, especially while a reveal is
   mid-animation. Confirm no nav link is highlighted while above `#skills`
   (existing behavior — `active` starts as `""`).
9. In DevTools, select each `<section id="...">` node — not its children — and
   inspect computed style **while a reveal is running**. `transform` must read
   `none` on all four. This is the check that catches a Constraint 1
   violation; the section-level ban is invisible to every other test here.

**Robustness — none of these were in the earlier draft, and each catches a
distinct failure the others miss:**
10. Disable JavaScript entirely, reload. All five sections' content must be
    visible and readable. This is the check for Constraint 3.
11. `curl http://localhost:8080` (or view-source) and confirm the server HTML
    is not shipping `opacity: 0` on core copy.
12. DevTools → Network → Slow 3G, hard-refresh and immediately scroll down.
    There must be no window where a section's text is present but invisible.
13. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload.
    All entrance, reveal, and hover transitions suppressed or instant, and all
    content visible — **not stuck at `opacity: 0`**. This is the check for
    Constraint 4.

**Build:**
14. `bun run lint` clean, then `bun run build && bun run preview`. Spot-check
    at 390px, 768px, and 1440px.

---

## Deferred — do not build in this pass

A future project will ship with a demo recording and a written case study on
its own route (`/projects/$slug`), and later projects will too. That is a
separate plan. Two things recorded here only so this pass doesn't make it
harder:

- When that project lands it becomes the featured card, replacing the n8n one.
  That is why step 4 uses a `featured: true` flag rather than an index.
- **`Nav.tsx` anchors are relative and will break on any second route.**
  `Nav.tsx:13` (`href="#top"`) and `Nav.tsx:24` (`href={`#${link.id}`}`)
  resolve against the current path, so on `/projects/anything` they point at
  anchors that don't exist there. Both need to become `/#...` before a second
  route ships. Not required for this pass — the site is single-route today —
  but do not let a refactor here make it worse.

The existing six projects get no demo/case-study affordance and no "coming
soon" placeholder. Absence of a link is invisible; an empty state advertises
the gap.
