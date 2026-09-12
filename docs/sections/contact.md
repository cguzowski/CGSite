# Contact index

Owner: Contact sub-agent. Slices C1, C2; section 4.

| Term | Current lookup |
| --- | --- |
| Existing direct links / styles / tests | [connect](../../angular/src/app/core/staticComponents/connect) |
| Contact placement / legacy connect anchor | [app.component.html](../../angular/src/app/app.component.html) |
| Website commands | [package.json](../../angular/package.json) |

**Contact:** profile/email links and, if retained, a private message form. **Delivery success:** acknowledged by a selected delivery service, not browser storage or a placeholder alert.

Direct links now render in Contact using the existing connect component. The non-delivering form and upload UI were deleted; there is no form endpoint or form scaffold to maintain. Legacy #connect links still reach this section. Component directory names may change; coordinate shared edits with foundation and update paths together.

C1 delivers working direct links. C2 resolves whether a form is needed and its delivery mechanism. Browser Angular code cannot safely hold delivery credentials. Any required custom server-side application code must be TypeScript; prefer the smallest suitable mechanism and do not recreate Spring Boot. No public comments, article publishing, accounts or attachments in scope.
