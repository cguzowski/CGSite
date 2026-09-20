# Christopher Guzowski — personal website

Personal portfolio for Christopher Guzowski, focused on full-stack development and AI integration engineering.

- [View the live site](https://cguzowski.com/)
- [Browse the source](https://github.com/cguzowski/CGSite)

## Overview

The site is a single-page Angular application with four sections:

1. **Home** — a concise introduction and navigation into the portfolio.
2. **About** — professional background, skills, education, resume, and profile links.
3. **Projects** — accessible screenshot walkthroughs for the Payment Incident AI Copilot, the self-hosted website, and Atlas Capital Intelligence. Implemented and planned capabilities are identified separately.
4. **Contact** — direct email, phone, location, resume, GitHub, and LinkedIn links.

The experience includes responsive section navigation, light and dark themes, keyboard-operable project galleries, reduced-motion support, and a static production build. It has no runtime dependency on the applications featured in the project walkthroughs.

## Technology

- Angular 19 and TypeScript
- HTML and component-scoped CSS/SCSS
- Jasmine and Karma for browser tests
- GitHub Actions for build, test, and static deployment automation
- Nginx on a Raspberry Pi for production hosting

The website application is TypeScript/Angular only. The retired Spring Boot and blog implementations are intentionally not part of the supported architecture.

## Run locally

Prerequisites: Node.js 20, npm, and Chrome or Chromium for the headless test suite.

```powershell
cd angular
npm ci
npm start
```

The Angular development server is available at `http://localhost:4200/` by default.

## Verify changes

Run these commands from `angular/`:

```powershell
npm run test:ci
npm run build
```

Run the repository whitespace check from the project root:

```powershell
git diff --check
```

The production browser artifact is written to `angular/dist/angular/browser/`. Pull requests run the test and build gates. Successful pushes to `master` can deploy that verified static artifact through the repository's production workflow.

## Repository guide

| Path | Purpose |
| --- | --- |
| `angular/` | Angular application, tests, and public assets |
| `.github/workflows/` | Continuous integration and deployment workflow |
| `deploy/pi/` | Raspberry Pi deployment setup and operations guide |
| `docs/ROADMAP.md` | Product scope and acceptance criteria |
| `docs/STATUS.md` | Current implementation facts, checks, and remaining work |
| `docs/sections/` | Short ownership and code-path indexes for each site section |
| `docs/BASELINE.md` | Historical build, hosting, and performance observations |
| `AGENTS.md` | Repository working agreement for coding agents |

The roadmap owns planned scope, while the status document records what is currently implemented and verified. Historical baseline results should not be treated as the current architecture specification.
