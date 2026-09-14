# Projects index

Owner: projects agent. Slices P1–P3; homepage section 3, after Home and About.

| Term | Current lookup |
| --- | --- |
| Projects container and ordered walkthrough data | [project](../../angular/src/app/core/staticComponents/project) |
| Standalone card slider | [project-card-slider](../../angular/src/app/core/staticComponents/project/project-card-slider) |
| Hosting-story images | [CGSitePhotos](../../angular/public/assets/images/CGSitePhotos) |
| Atlas story images | [ACIPics](../../angular/public/assets/images/ACIPics) |
| Payment Incident AI Copilot story images | [PayCoPilotPic](../../angular/public/assets/images/PayCoPilotPic) |
| Detail-page integration | [routes](../../angular/src/app/app.routes.ts) — coordinate with foundation |

The former single-card placeholder is removed. The Projects component is the collection-level container: each `ProjectWalkthrough` owns a project title, accurate summary and ordered `ProjectSlide` collection, and renders an independent instance of the standalone Swiper card slider. New projects should be added as another walkthrough rather than by duplicating slider markup or behavior.

The “Self-hosted personal website” walkthrough presents five supplied hosting-story images in numeric filename order. Atlas Capital Intelligence presents nine supplied frontend screenshots in intended story order: workbench, saved portfolios, overview, allocation, manual builder, generator, simulation, and two planned assistant views. Atlas's frontend is implemented; Alpaca retrieval, caching and chatbot integration remain explicitly planned.

Each active slide has a fixed-size title above the deck. Verified destinations render the title as an external link; slides without a verified destination use a plain title. Visitors can drag/swipe, use previous/next controls or Left/Right Arrow keys, start/pause two-second playback, and hear polite slide-position feedback without a visual counter. Playback stops at the final slide; reduced motion removes the slide transition. Swiper Element is registered only in the browser and loaded as a lazy chunk.

The five cards cover the physical Raspberry Pi host, Raspberry Pi Connect, domain registration, Cloudflare domain management, and the live mobile website. Text and alternatives describe only visible evidence and omit the account email visible in one source screenshot.

The Payment Incident AI Copilot is registered as a third walkthrough before Atlas, but its card copy and image alternatives remain incomplete, so P1 is not complete. No architecture interaction exists yet. Atlas's screenshot story completes the current presentation layer of P2, while its planned integrations remain out of scope for the portfolio. The reusable container/slider foundation does not complete P1 or P3.

- **Walkthrough:** manually navigated screenshot plus explanation, readable on narrow screens.
- **Under the hood:** optional browser-side architecture explanation.
- **Request step:** stage of a prepared, labeled flow; not live execution.
- **Implemented / planned:** explicit capability labels sourced from [status](../STATUS.md) and subsequent verification.

Feature Copilot before Atlas. Use suitable demonstration data in screenshots. No runtime dependency on sibling repos, project ports, Ollama, Alpaca or generated reports. Extract only the reusable walkthrough behavior the two projects actually require.

The website's Angular/TypeScript-only decision does not change the featured projects' actual technology stacks. Describe their verified technologies accurately without introducing those runtimes into this repository.
