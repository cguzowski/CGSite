# F1 engineering baseline

Captured 2026-09-09 before layout changes. Local measurements are not live Pi performance.

Historical snapshot: the 2026-09-12 decision supersedes its architecture assumptions. The current site is Angular/TypeScript only with Home, About, Projects, Contact; Spring Boot and blog scope are retired. Use [status](STATUS.md) and [roadmap](ROADMAP.md) for current work. Results below do not certify the changed working tree.

## Reproduce locally

Observed environment: Windows, Node 24.14.1, npm 10.8.3, Chrome Headless 152.0.0.0. From `angular/`:

```powershell
npm ci
$env:CHROME_BIN='C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run test:ci
npm run build
```

Use an installed Chrome path appropriate to the machine. The named `test:ci` script avoids this environment's PowerShell npm wrapper dropping forwarded arguments. For one-off CLI flags, use `npm.cmd` or invoke the local Angular CLI directly. Sandbox process restrictions initially blocked installation/browser launch; the authorized outside-sandbox runs worked.

## Checks and minimal repairs

| Check | Result |
| --- | --- |
| Locked install | 944 packages installed; no dependency/lockfile changes. |
| Original tests | Compile failure: obsolete `AppComponent.title` assertion. |
| Tests after assertion repair | 7 passed, 4 failed: Material form fields lacked animation providers in test setup. |
| Repaired suite | 11/11 passed with `npm run test:ci`; added noop animation providers only to affected fixtures. |
| Production build | Passed; prerendered one route and emitted browser/server output. |
| Initial browser bundle | 523.56 kB raw, 124.17 kB estimated transfer. Warning threshold 500 kB; error threshold 1 MB unchanged. |
| Other build warning | Unused RouterOutlet import in shell; remove when shell composition changes. |
| Dependency compatibility | Installed Material/CDK 18.2.7 peer ranges explicitly accept Angular 19; version difference alone is not a demonstrated blocker. |
| Dependency audit | Install reported 72 advisories: 5 low, 20 moderate, 43 high, 4 critical. Reachability and upgrade scope not yet triaged; do not run force-fix blindly. |

At capture time tests were limited smoke coverage plus owner/section assertions. The then-present Java scaffold was not tested and has since been deleted; Java is not a website prerequisite. New shell tests must cover the current four-section contract.

## Serving and assets

`angular/dist/angular/browser/index.html` exists after the production build. The repository also emits a Node SSR server; it is not needed by the observed live static-serving configuration. Preserve output/deployment compatibility until a deliberate migration is tested.

Public assets total 1,771,988 bytes. Largest opportunities:

| Asset | Bytes | Current display |
| --- | --- | --- |
| `raspby.jpg` | 861,922 | At most 250px wide |
| `desertRose.jpg` | 360,131 | 50px navbar image |
| `favicon.ico` | 259,134 | Browser icon |

External Google Fonts and Material Icons affect network repeatability. Asset sizes and estimated bundle transfer are not measured page load times.

## Read-only Pi audit

User provided access through Raspberry Pi Connect. No credentials, device/session identifiers, or raw terminal logs are stored here.

- Raspberry Pi 3 Model B Rev 1.2, aarch64.
- Snapshot: 907 MiB RAM total, 265 MiB used, 641 MiB available; swap 168 MiB used of 511 MiB. These are momentary readings, not capacity guarantees.
- Root disk: 15 GB total, 6.2 GB available.
- Nginx and cloudflared services running; Docker command unavailable.
- Nginx serves a browser build directory with `index.html` and SPA fallback on HTTP/HTTPS. No application proxy was present in the inspected site routing directives.
- Local HTTP request with the public Host header returned 200 and Nginx 1.22.1; deployed entry point was 125,426 bytes with a September 2025 modification timestamp. Timestamp does not prove a Git revision.
- Exact deployed revision, release-copy procedure, tunnel routing, backups and rollback are still unverified. No restart, configuration edit or deployment performed.

## Next foundation changes

The original F2 recommendation was to change shell/navigation and scrolling in place. That slice was implemented before the direction change. F3 now migrates to four sections in `angular/`; the deleted Spring Boot scaffold must not be restored. Move section implementations only as their slices require it, updating indexes and consumers together.

Before release, triage dependency advisories in a separate measured maintenance slice; optimize images and bundle weight without raising budgets to hide warnings.

## Browser performance

Three sequential local production-build runs: Lighthouse 13.4.1, Chrome 152.0.0.0, mobile emulation 412×823 at device scale 1.75. Default simulated throttling: 150ms RTT, 1638.4 Kbps throughput, 4× CPU slowdown. Fresh Lighthouse browser profiles and default storage reset; external font requests returned HTTP 200 in all runs.

| Metric | Run 1 | Run 2 | Run 3 | Median |
| --- | --- | --- | --- | --- |
| First contentful paint | 5.316s | 5.153s | 5.210s | 5.210s |
| Largest contentful paint | 12.319s | 11.862s | 11.864s | 11.864s |
| Total blocking time | 88ms | 103ms | 177ms | 103ms |
| Cumulative layout shift | 0 | 0 | 0 | 0 |
| Transferred bytes | 2,385,894 | 2,386,551 | 2,386,551 | 2,386,551 |
| Performance score | 61 | 61 | 59 | 61 |

Run 2 warned that the host CPU was slower than expected; no run had a runtime error. Treat these as a directional local baseline, not a production SLA. Python's local static server does not reproduce Nginx/Cloudflare compression or caching. Desktop performance is not measured yet; 375px/1440px and zoom layout checks belong to F2.

Reproduce by serving `angular/dist/angular/browser` at `http://127.0.0.1:4173/` (for example, Python `http.server` bound to loopback), then from `angular/` run the following three times with distinct output names:

```powershell
npm.cmd exec --yes --package=lighthouse@13.4.1 -- lighthouse http://127.0.0.1:4173 --only-categories=performance --output=json --output-path=tmp/lighthouse-baseline-1.json --chrome-flags=--headless --quiet
```

Create `tmp/` first. Keep generated reports in ignored `angular/tmp/`, not public assets. At comparison time record the same settings, Chrome version, network/font conditions and machine load; report any differences.
