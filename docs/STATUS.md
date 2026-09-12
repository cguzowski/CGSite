# Current status

Updated: 2026-09-12. Baseline branch: `modernizing-baseline`.

## Current decision

Website application stack: **TypeScript/Angular only**. Sections: **Home → About → Projects → Contact**. Spring Boot and blog scope are retired. This decision supersedes the former combined About/connect and blog/feedback layout.

Cleanup is implemented in application code and indexes. Content/design refresh remains separate from this foundation change.

## Delivery and observed tree

- B0: documentation baseline updated for the new direction.
- F1: historical build/test, hosting and performance audit preserved in [baseline](BASELINE.md).
- F2: former three-section shell implemented and tested on September 9; now superseded by F3.
- F3: cleanup implemented and tests/build passing; actual 200% browser zoom remains unverified. H1/A1/C1, project walkthroughs and release work remain planned.
- Spring Boot files are deleted in the working tree; do not restore them.
- Blog component/model/service, associated tests, non-delivering form/upload scaffold, three empty component stubs and superseded planning text files removed.
- Shell now renders Home, About, Projects, Contact with matching native navigation. Single page h1 lives in the new minimal Home component; About no longer duplicates it.
- Contact contains the existing direct links; #connect is retained as a legacy target inside Contact. #blog is retired. Existing contact details/resume and biography still need C1/A1 reconciliation.
- Projects remain a placeholder, without screenshot walkthroughs.
- Angular production configuration includes prerender/SSR. Previous read-only audit found static Nginx hosting plus cloudflared on Pi 3 Model B. No deployment changes made.

## User-confirmed content truth

- Focus: full-stack development + AI integration engineering.
- Georgia Tech OMSCS: admitted, starting Spring 2027; do not imply current enrollment or completed degree.
- Feature Copilot before Atlas, using screenshot/text stories rather than live applications.
- Copilot: RAG works with a real local model; mock service evidence and report generation unfinished.
- Atlas: frontend UI/UX exists; Alpaca retrieval/caching and chatbot unfinished.
- Transcript is private context only, never public site content or an AI corpus input.

These corrections override broader claims in old project READMEs/resume. Verify new claims before publication. The website stack decision does not change the featured projects' actual stacks. Do not depend on neighboring project directories at build/runtime.

## Next: H1 / A1 / C1

Develop Home content/design, refresh About and reconcile Contact links/resume. These section tasks can proceed independently with shared-shell edits coordinated. Keep the cleaned four-section contract and do not restore retired code.

Later decisions: accurate public resume/profile destinations, screenshot assets/capture dates, Contact delivery requirements, deployed revision and release/rollback procedure. Website source is `https://github.com/cguzowski/CGSite`; the general profile link is separate.

## Verification limits

- September 9 F2: 14/14 tests and production build passed; initial bundle 521.76 kB with the existing 500 kB warning. Those results describe the previous layout, not the new direction or current deletions.
- Previous browser checks: 375×812, 1440×900 and 720×450 equivalent reflow without clipping; keyboard anchors/skip link and theme toggle worked. Actual 200% zoom and OS reduced-motion emulation remain unverified.
- Installation previously reported 72 dependency advisories; reachability/upgrade scope remains untriaged (M1).
- F3 TDD: new order/placement tests failed before implementation (2 failures); cleaned suite passed 11/11. Three obsolete blog/form smoke tests were deleted, not skipped.
- Final production build passed with one prerendered route and initial bundle about 366 kB, below the unchanged 500 kB warning budget. Dependency versions unchanged; baseline-browser-mapping still reports stale compatibility data.
- Browser reflow checked at 375×812, 1440×900 and 720×450: no horizontal overflow or section clipping. Keyboard Contact link focused the contact section. 720px is an equivalent reflow check, not actual browser zoom.
- Local Markdown links and diff checks are validated at handoff.
- No production deployment or remote changes.

Keep this file a current snapshot. Roadmap owns acceptance criteria; section indexes own paths.
