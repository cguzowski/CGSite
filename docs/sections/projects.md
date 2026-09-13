# Projects index

Owner: projects agent. Slices P1–P3; homepage section 3, after Home and About.

| Term | Current lookup |
| --- | --- |
| Projects view and ordered card data | [project](../../angular/src/app/core/staticComponents/project) |
| Standalone card slider | [project-card-slider](../../angular/src/app/core/staticComponents/project/project-card-slider) |
| Hosting-story images | [CGSitePhotos](../../angular/public/assets/images/CGSitePhotos) |
| Detail-page integration | [routes](../../angular/src/app/app.routes.ts) — coordinate with foundation |

The former single-card placeholder is removed. The Projects section now presents five supplied hosting-story images in numeric filename order through the standalone Swiper card slider. Each active card has a consistent bold, underlined title link above the deck with an external-link icon. Visitors can drag/swipe, use previous/next controls or Left/Right Arrow keys, start/pause two-second playback, and hear polite position feedback without a visual counter. Playback stops at the final card; reduced motion removes the slide transition. Swiper Element is registered only in the browser and loaded as a lazy chunk.

The five cards cover the physical Raspberry Pi host, Raspberry Pi Connect, domain registration, Cloudflare domain management, and the live mobile website. Text and alternatives describe only visible evidence and omit the account email visible in one source screenshot.

No Copilot/Atlas walkthrough model or architecture interaction exists yet. This reusable slider foundation does not complete P1–P3; add project-specific, truth-labeled screenshot stories in later slices.

- **Walkthrough:** manually navigated screenshot plus explanation, readable on narrow screens.
- **Under the hood:** optional browser-side architecture explanation.
- **Request step:** stage of a prepared, labeled flow; not live execution.
- **Implemented / planned:** explicit capability labels sourced from [status](../STATUS.md) and subsequent verification.

Feature Copilot before Atlas. Use suitable demonstration data in screenshots. No runtime dependency on sibling repos, project ports, Ollama, Alpaca or generated reports. Extract only the reusable walkthrough behavior the two projects actually require.

The website's Angular/TypeScript-only decision does not change the featured projects' actual technology stacks. Describe their verified technologies accurately without introducing those runtimes into this repository.
