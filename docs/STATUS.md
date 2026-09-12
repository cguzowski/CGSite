# Current status

Updated: 2026-09-12. Baseline branch: `modernizing-baseline`.

## Current decision

Website application stack: **TypeScript/Angular only**. Sections: **Home → About → Projects → Contact**. Spring Boot and blog scope are retired. This decision supersedes the former combined About/connect and blog/feedback layout.

Cleanup is implemented in application code and indexes. Content/design refresh remains separate from this foundation change.

## Delivery and observed tree

- A2 steam length adjustment: plume rise distance increased by 4/3 (about 33%) at all viewport sizes; rise speed and cup dimensions retained. Existing canvas padding accommodates the longer plume. Styling-only tuning: no new tests; production build passed after sandbox spawn EPERM retry outside the sandbox. Visual review of the new length remains pending.

- A2 steam overflow correction (September 13): cup host now allows foreground overflow, and the canvas adds 300 simulation units per side plus 150 above/below. Drawing/clearing uses translated bounds, retaining cup coordinates and half-resolution rendering. Passive document pointer tracking follows displaced steam outside the slot; the illustration ignores hit testing so text selection and scrolling pass through. Fuji gate unchanged. Two desktop/mobile bounds regressions failed before the fix; `npm run test:ci` passed 19/19 with CHROME_BIN and outside-sandbox Chrome, `npm run build` passed, and `git diff --check` passed. Browser checked 1440x900 and 375x812: canvas extends beyond both slot edges, host overflow is visible, no horizontal page overflow; mobile-size pointer swipe visibly dispersed steam. Physical touch-device and OS reduced-motion testing remain unverified.

- A2 (September 13): About now follows supplied desktop/mobile coffee references. Removed the crossed-out Skills/Aspirations/Hobbies lists; existing biography and portrait ring retained. Supplied SteamCup SVG and simulation ported to a transparent Angular component. Desktop places cup beside biography; at <=48rem portrait/cup share a row above biography. Deferred chunk waits for About visibility and Fuji loadeddata, with already-ready/error/reduced-motion handling. Steam pauses offscreen/hidden, respects reduced motion, and preserves native touch scrolling. Only About application files changed for A2.
- A2 checks: five loading contract tests initially failed before implementation; corrected a constructor mock during the green run. `npm run test:ci` in `angular/` passed 17/17 (CHROME_BIN set; outside-sandbox retry needed for Chrome spawn EPERM). `npm run build` passed, one prerendered route, 377.89 kB initial bundle and separate 8.08 kB steam chunk. Browser screenshots at 1440x900 and 375x812 confirmed composition and visible steam, with document width within viewport. Reduced-motion/offscreen cleanup reviewed in code; OS emulation and actual 200% zoom remain unverified. No commit, push or deployment.

- Home edge correction: feather stops reduced from 4% to 0.4% (one-tenth). Introduction and header offsets now share the video's natural aspect ratio and visible bounds, keeping them inside the image instead of in the side bands. Edge inset reduced from 1.5rem to 1rem. Production build passed; visual review remains outstanding.

- Home presentation update: feathered video edges using an intersected CSS mask; wide video bounds follow its loaded aspect ratio so feathering reaches the actual image edges. Navigation is upper right with the theme button outside the navigation landmark to its right. The requested name, role and photo credit are upper left, flowing below controls on narrow screens. Production build passed; visual browser review remains outstanding.

- Mobile framing: square/portrait viewports (`max-aspect-ratio: 1/1`) now use centered `cover` to fill the background height and crop the landscape video's sides. This replaces the ineffective 40rem alignment-only override. Wide viewports retain `contain`. `npm run build` passed; visual framing awaits user review.

- H0 desktop framing correction: centered cover cropped the summit and reflection in the user's wide screenshot. Wide viewports use `object-fit: contain` with centered alignment to preserve the entire frame without distortion. Unfilled space shows the page background; navbar overlay remains unchanged.

- H0 follow-up: header now overlays the Home video with transparent, absolute positioning instead of occupying a row above it. Home content retains clearance for the desktop navbar and its two-row mobile layout; background starts at the page top. Navbar controls and markup unchanged.

- H0 (September 13): supplied Fuji WebM copied unchanged into `angular/public/videos/` and added as a muted, looping, inline Home background. Reference CSS/JS uses full width, viewport height with a 500px minimum, cover sizing and top-center positioning; the Home background follows those rules. Reduced-motion hides the video. Navbar and other section files were not edited for H0. `npm run build` passed (369.18 kB initial bundle); `npm run test:ci` passed 12/12 after retrying outside the sandbox because Chrome spawn was denied; `git diff --check` passed. Desktop/mobile visual playback and OS reduced-motion remain unverified.

- B0: documentation baseline updated for the new direction.
- F1: historical build/test, hosting and performance audit preserved in [baseline](BASELINE.md).
- F2: former three-section shell implemented and tested on September 9; now superseded by F3.
- F3: cleanup implemented and tests/build passing; actual 200% browser zoom remains unverified. H1/A1/C1, project walkthroughs and release work remain planned.
- F4: restrained motion restoration implemented. The theme action is a Moon/Sun icon with a one-second color transition. An aria-hidden Plan/Build/Test/Learn ring advances between the four cardinal positions around the About portrait, rotating for one second and pausing for two, while biography copy retains circular text flow. Reduced-motion disables both transitions/animation.
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
- F4 verification: `npm run test:ci` passed 12/12 and `npm run build` passed with one prerendered route and a 368.54 kB initial bundle. Browser inspection confirmed the theme background was still interpolating at 500 ms and reached its final value after one second; the control label/icon changed with the theme. At 375×812, document width stayed within the viewport and the portrait returned to normal flow. The portrait word animation uses a 12-second cycle containing four one-second quarter-turns and four two-second pauses. Reduced motion was verified from the CSS media rules, not by OS emulation.
- Browser reflow checked at 375×812, 1440×900 and 720×450: no horizontal overflow or section clipping. Keyboard Contact link focused the contact section. 720px is an equivalent reflow check, not actual browser zoom.
- Local Markdown links and diff checks are validated at handoff.
- No production deployment or remote changes.

Keep this file a current snapshot. Roadmap owns acceptance criteria; section indexes own paths.
