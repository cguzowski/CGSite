# Modernization roadmap

Updated direction: 2026-09-12. Audience: recruiters and technical managers evaluating Christopher Guzowski for full-stack development and AI integration engineering.

## Product and stack

The website is **TypeScript/Angular only**, with HTML/CSS templates and styles. Spring Boot/Java is removed and must not be restored. Featured projects may still describe their actual Java or other technology stacks; the site does not run those applications.

Sections, in order:

1. **Home:** concise introduction, role focus and entry points to the rest of the site.
2. **About:** professional background, experience, education and resume.
3. **Projects:** Payment Incident Copilot, then Atlas Capital Intelligence; screenshot/text walkthroughs instead of live demos.
4. **Contact:** working profile/email links and a deliberately scoped contact interaction.

No blog, authored-post pipeline, public comments or separate blog-feedback feature. Preserve natural scrolling, responsive readability, keyboard navigation and reduced-motion support. Signature interaction remains optional **Under the hood** architecture explanations using prepared browser-side content.

## Measurable vertical slices

B0 (documentation) and F1 (baseline) are historical completed work. F2 implemented the former three-section design; do not silently redefine its old test results as proof of the new design. Old B1/B2 blog/feedback slices are retired. F3 cleanup is implemented; see status for verification limits and the next content slices.

| ID / owner | Outcome | Acceptance |
| --- | --- | --- |
| F3 / foundation | Angular-only four-section shell | Home → About → Projects → Contact rendered in order; native navigation and skip link reach real targets. Remove remaining blog imports/components/services/models/tests as applicable. No Spring Boot/Java build or runtime dependency. Tests cover new order and placement; production build passes. No clipping at 375px/1440px and 200% zoom; record any verification limit. |
| F4 / foundation + About | Restore restrained signature motion | Theme control uses recognizable Moon/Sun icons and transitions page colors over one second. Plan, Build, Test and Learn occupy the four cardinal positions around the About portrait, advance 90 degrees over one second, then pause for two seconds; biography text follows the circular portrait shape. Both effects preserve accessible naming, mobile reflow and reduced-motion behavior. |
| F5 / foundation | Readable modern typography | Shared text uses a modern system font stack and a responsive 17px mobile / 18px desktop base. About prose approaches the inspiration's 20px scale on desktop; section headings, Home copy, project copy, Contact copy, supporting labels and footer preserve a clear hierarchy without horizontal clipping at 375px or desktop widths. Browser zoom remains supported through relative units. |
| H1 / Home | Clear landing introduction | Accurate name/role focus and usable links to About, Projects and Contact; concise mobile-readable introduction without duplicating detailed biography. |
| H0 / foundation | Fuji Home background | Supplied WebM is centered in a viewport-height area (500px minimum). Wide viewports use contain to preserve the full frame; square/portrait viewports use cover to fill the height and crop the sides without distortion. Navbar overlays the background. Other content remains unchanged. Latest framing correction supersedes reference sizing. |
| A2 / About | Reference coffee composition | Desktop: portrait with circular biography flow at left and supplied SteamCup at right. Mobile: portrait and cup above full-width biography. Remove the former crossed-out Skills/Aspirations/Hobbies lists. Cup code loads only when About is visible and Fuji has a first frame (or fails/is hidden for reduced motion); reserve layout space, preserve scrolling, pause offscreen and respect reduced motion. Displaced steam can render in the foreground beyond the cup slot on desktop/mobile without intercepting content or adding horizontal scrolling. |
| A1 / About | Accurate professional background | Relevant experience and “Admitted to Georgia Tech OMSCS, starting Spring 2027.” Public resume opens; unsupported project claims and obsolete CV actions reconciled. No transcript content. |
| A3 / About | Professional skills snapshot | Skills, categorized core technologies and hobbies appear between the biography/coffee composition and profile links. Desktop uses a balanced three-column layout; narrow viewports use a readable single-column flow without horizontal clipping. |
| A4 / About | Scannable professional highlights | A continuously moving highlight marquee appears beneath the About profile links with paired symbols and text. Desktop presents five items across; narrow viewports present about three plus faded edge context. Motion is slow and continuous, and becomes manually scrollable when reduced motion is preferred. The drone artwork is original local SVG markup and all duplicate loop content is hidden from assistive technology. |
| C1 / Contact | Reliable direct connections | Correct email/profile destinations in Contact; no obsolete contact details or misleading submission action. Existing fragment replacements handled explicitly. |
| P1 / Projects | Copilot screenshot story | Discover project and navigate screenshots/text by mouse and keyboard, with current/planned labels, alternatives and position feedback. |
| P2 / Projects | Atlas screenshot story | Reuse minimal walkthrough pattern; missing Alpaca/chatbot features labeled planned. Readable mobile presentation. |
| P3 / Projects | One architecture walkthrough | Component selection and request steps show matching explanations; planned paths distinct; no project API/model dependency; usable without motion. |
| C2 / Contact | Resolve optional message delivery | Direct email may satisfy contact needs. If a form is retained, select delivery mechanism and verify a controlled submission reaches its private destination; validation, pending/error/success and abuse controls work. No credentials in browser code. Any custom server-side application code is TypeScript. Do not claim this optional decision is already implemented. |
| M1 / foundation | Dependency advisory review | Classify advisories by build/runtime exposure; bounded applicable fixes, residual-risk record and affected tests/build. No blind force-fix. |
| R1 / coordinator + owners | Integrated release | Relevant tests/build pass; links, keyboard, mobile, actual zoom and reduced motion checked; static content works without project services. Record deployment/rollback and deploy only within authorization. |

Complete one observable outcome at a time; split broad slices into independently verifiable steps. Delegate independent section work after shared contracts are stable. C2 is optional, not a reason to introduce a backend preemptively.

## Directory migration

Current application root: `angular/`. Home now has a dedicated component; Contact uses the existing `connect/` component. Blog code and the non-delivering `form-contact/` scaffold were removed in F3. Do not restore retired features to satisfy obsolete tests. No wholesale directory move was needed for cleanup.

Prefer Home, About, Projects and Contact ownership boundaries with a small shared shell. Choose directory names when implementing; no empty scaffolding or mass move for its own sake.

For every move or removal:

1. State old/new paths or removal reason.
2. Update imports, tests, routes, assets, build/deploy references and indexes together.
3. Run affected checks; verify links/downloads or intentional replacements.
4. Remove superseded paths after consumers migrate. List actual paths, not proposed ones, in indexes.

Retain static portfolio serving on the Pi. Existing Angular SSR/prerender configuration is TypeScript and does not imply a required live rendering process; verify output compatibility before changing it.

## Deferred work and measurements

Optional later: real hosting-health panel and hosting architecture story. No invented live metrics. Live project deployments, Alpaca and project AI features belong to separate project roadmaps.

No blog/CMS, public comments, accounts, attachments, portfolio chatbot or speculative framework rewrite. Keep build budgets unless measured evidence justifies a change. [Baseline](BASELINE.md) preserves historical measurements; remeasure under comparable conditions after implementation and distinguish past checks from current verification.
