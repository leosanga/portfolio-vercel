# Portfolio Animation Plans

Status: Approved planning set, no implementation authorized
Commit surveyed: `de93ea4`
Primary specification: [`000-MOTION-INTERACTION-SPEC.md`](./000-MOTION-INTERACTION-SPEC.md)

## Audit summary

The current site has solid accessibility and scrollspy foundations, but its
motion language is split between useful feedback and continuous template-like
decoration. The redesign should preserve responsive feedback while replacing
shimmer, grid drift, generic spotlight cards, infinite workflow motion, and
animated disclosure height.

| # | Severity | Category | Location | Finding | Fix summary |
|---|---|---|---|---|---|
| 1 | HIGH | Performance | `src/styles.css:872-889` | Disclosure layout animates through `block-size` | Use immediate native layout and animate only internal opacity and transform |
| 2 | HIGH | Purpose | `src/styles.css:254-338` | Shimmer and grid drift loop without explaining state | Remove both and use one finite hero signal |
| 3 | MEDIUM | Purpose | `src/styles.css:466-607` | Workflow signal loops while content is read | Play once on disclosure open |
| 4 | MEDIUM | Accessibility | `src/styles.css:199-207` | Reduced motion removes all useful transition feedback | Preserve short color and opacity transitions |
| 5 | MEDIUM | Performance | `Competencies.tsx:5-11` | Card spotlight updates parent CSS variables on every pointer move | Remove spotlight; isolate pointer response to portrait transform |
| 6 | MEDIUM | Performance | `Nav.tsx:20-25` | Active rule animates width | Split movement and length across nested transform layers |
| 7 | LOW | Cohesion | Motion values throughout `src/styles.css` | Curves and timings lack one shared vocabulary | Introduce the approved token set |

## Missed opportunities addressed

- A bespoke hero node signal can replace generic ambient effects.
- Shallow portrait depth can provide local human response.
- Approach connectors can explain sequential work.
- A finite final signal can connect the narrative to `Schedule a Call`.

## Plans

| Plan | Title | Severity | Status | Depends on |
|---|---|---|---|---|
| [001](./001-establish-motion-foundation.md) | Establish the motion foundation | HIGH | TODO | Approved frontend architecture |
| [002](./002-build-navigation-continuity.md) | Build navigation continuity | MEDIUM | TODO | 001 |
| [003](./003-build-hero-choreography.md) | Build hero choreography and signal | HIGH | TODO | 001, approved hero structure, brand SVG |
| [004](./004-build-portrait-depth.md) | Build shallow portrait depth | MEDIUM | TODO | 001, approved portrait crop |
| [005](./005-build-project-response.md) | Build project row response | MEDIUM | TODO | 001, approved project layout |
| [006](./006-build-workflow-playback.md) | Build disclosure and workflow playback | HIGH | TODO | 001, approved workflow component architecture |
| [007](./007-build-approach-and-conversation-motion.md) | Build Approach and conversation motion | MEDIUM | TODO | 001, approved section structure |

## Recommended execution order

1. Complete and approve the frontend architecture and implementation plan.
2. Execute plan 001 before adding any component animation.
3. Execute plans 002 and 003 against the navigation and hero shell.
4. Produce the approved portrait crop, then execute plan 004.
5. Execute plans 005 and 006 together because they share project state.
6. Execute plan 007 after page spacing and section geometry are stable.
7. Run the complete motion verification matrix before visual acceptance.

## Scope boundary

These plans apply only to the additive local redesign. They do not authorize
editing the live portfolio components, running a server, installing a motion
library, committing, pushing, or interacting with Vercel.
