# Agent working agreement

## Start with the smallest useful context

Read [status](docs/STATUS.md), the active slice in [roadmap](docs/ROADMAP.md), then the relevant [section index](docs/sections/README.md) and referenced code.

Roadmap owns scope and acceptance criteria. Status owns current facts, check results, blockers, and next work. Section files are short glossaries and path indexes, not duplicated specifications or activity logs. Update the authoritative file instead of copying facts.

## Section ownership and delegation

| Owner | Boundary | Lookup |
| --- | --- | --- |
| Coordinator / foundation | Shell, routes, global styles, dependencies, integration, deployment | [Foundation](docs/sections/foundation.md) |
| Home sub-agent | Landing introduction and entry points to the other sections | [Home](docs/sections/home.md) |
| About sub-agent | Biography, experience, education, resume | [About](docs/sections/about.md) |
| Projects sub-agent | Cards, screenshot stories, architecture interaction | [Projects](docs/sections/projects.md) |
| Contact sub-agent | Profile/email links and contact interaction | [Contact](docs/sections/contact.md) |

Delegate bounded, independent section slices when useful parallel work exists. Give each sub-agent a slice ID, owned files, dependencies, acceptance checks, and required verification. Keep dependent work sequential; small single-section tasks may use one agent. One active writer per file. Section agents coordinate shared-file edits with the coordinator rather than racing on routes, package files, models, or global styles.

Handoffs state delivered behavior, changed files, exact checks/results, remaining limits, and updated indexes. Coordinator reviews integration and cross-section behavior. Use sub-agents, not new user-visible Codex tasks, for delegation.

## Lean slices and TDD

- Deliver one observable visitor outcome through only the necessary layers. Define a measurable pass/fail criterion before editing; split broad work into smaller end-to-end slices.
- For behavior changes, add the smallest meaningful failing test, confirm the intended failure, implement, then refactor while green. For bugs, reproduce first.
- Test behavior and contracts, not private methods or implementation structure. Cover relevant failure states. Do not chase coverage percentages or write mirrored tests for static copy, documentation, or styling-only changes; inspect those appropriately.
- Run focused checks first, then the affected application suite/build before handoff when applicable. Record exact commands/results; never label unrun checks passed.
- Write self-explanatory code: domain names, typed boundaries, explicit data flow, cohesive components. Comments explain decisions and constraints rather than syntax.
- Introduce services, libraries, abstractions, or framework changes only for concrete slice needs. Separate mechanical directory moves, dependency upgrades, and behavior changes.
- Keep changes reviewable, preserve unrelated work, and update status/indexes in the same change. Do not auto-commit, push, or deploy without task authorization.

## Product rules

- Order: Home, About, Projects, Contact. These are four separate sections. No blog or publishing feature. Natural scrolling and readable content at narrow widths and zoom.
- Website application code is TypeScript/Angular with HTML/CSS templates and styles. Spring Boot/Java has been removed; do not restore it or add a separate non-TypeScript backend. This restriction applies to this website, not the technologies described in featured projects.
- Showcase screenshots and text with optional browser-side architecture interaction; no dependency on live project applications or AI models.
- Latest user corrections override stale resume/README project claims. Label implemented, illustrative, and planned behavior. Never invent results, citations, metrics, or live status.
- Transcript is private context only. Never copy the document or extracted contents into the repository, public assets, posts, or AI knowledge sources. Published biography uses public resume information and explicit user statements.
- Keep credentials, private infrastructure details, and visitor feedback out of public assets and logs. No delivery credentials in browser code.
- Semantic controls, visible focus, keyboard access, useful image alternatives, reduced-motion support, and honest pending/success/error states are required. No auto-advancing carousels or forced scroll locking.
- Keep portfolio hosting lightweight. Do not introduce an SSR process or backend merely for static content.

## Current verification commands

Repository-declared entry points, not evidence of passing checks:

| Directory | Command | Notes |
| --- | --- | --- |
| `angular/` | `npm ci` | Install locked dependencies when needed |
| `angular/` | `npm run test:ci` | Karma/Jasmine; requires Chrome; set CHROME_BIN when needed |
| `angular/` | `npm run build` | Production build and configured budgets |
| Repository root | `git diff --check` | Whitespace validation |

Check actual scripts/configuration before running. Separate environment failures from regressions. Update commands and indexes when directories or tools change.
