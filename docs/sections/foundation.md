# Foundation index

Owner: coordinator/foundation agent. Active slices F3, M1, R1; F1/F2 are historical. Own shared-file integration for the Angular/TypeScript-only website.

| Term | Current lookup |
| --- | --- |
| Composition / scrolling | [app.component.html](../../angular/src/app/app.component.html), [app.component.css](../../angular/src/app/app.component.css) |
| Shell / tests | [app.component.ts](../../angular/src/app/app.component.ts), [app.component.spec.ts](../../angular/src/app/app.component.spec.ts) |
| Routes / providers | [app.routes.ts](../../angular/src/app/app.routes.ts), [app.config.ts](../../angular/src/app/app.config.ts) |
| Navigation | [navbar](../../angular/src/app/core/staticComponents/navbar) |
| Global appearance | [styles.css](../../angular/src/styles.css), [custom-theme.scss](../../angular/src/custom-theme.scss) |
| Theme behavior | [theme.service.ts](../../angular/src/app/core/singletonServices/theme.service.ts) |
| Build / SSR | [package.json](../../angular/package.json), [angular.json](../../angular/angular.json), [server.ts](../../angular/server.ts) |
| Assets | [public](../../angular/public) |
| Verified environment / serving / baseline results | [F1 baseline](../BASELINE.md) |

**Shell:** shared page composition/navigation. **Static output:** built files served without application rendering process. **Migration:** moving behavior together with consumers and verification.

F3 implemented Home, About, Projects, Contact and removed blog code/tests and the non-delivering form. Natural scrolling, native anchors, focus treatment and reduced-motion behavior remain. Legacy #connect targets Contact; #blog is retired without a publishing replacement. Empty header/footer/sidebar stubs and superseded Features.txt/Documentation.txt were deleted. No Spring Boot root or Java test/build commands remain in the supported architecture.

Live Nginx static serving was inspected read-only; release/rollback remain unverified. See baseline for evidence, and [roadmap](../ROADMAP.md) for migration protocol and release criteria.
