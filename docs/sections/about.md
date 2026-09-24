# About index

Owner: About sub-agent. Slices A1-A4; section 2.

| Term | Current lookup |
| --- | --- |
| Biography / responsive portrait and coffee | [about.component.ts](../../angular/src/app/core/staticComponents/about/about.component.ts), [about.component.html](../../angular/src/app/core/staticComponents/about/about.component.html) |
| Styles / tests | [about](../../angular/src/app/core/staticComponents/about) |
| Deferred media gate | [about-media.ts](../../angular/src/app/core/staticComponents/about/about-media.ts), [tests](../../angular/src/app/core/staticComponents/about/about-media.spec.ts) |
| Foreground cup / expanded steam canvas | [steam-cup.component.ts](../../angular/src/app/core/staticComponents/about/steam-cup.component.ts), [steam-animation.ts](../../angular/src/app/core/staticComponents/about/steam-animation.ts), [bounds tests](../../angular/src/app/core/staticComponents/about/steam-animation.spec.ts) |
| Existing public resume | [resume.pdf](../../angular/public/assets/documents/resume.pdf) |
| Skills / core tech / hobbies snapshot | [about.component.html](../../angular/src/app/core/staticComponents/about/about.component.html), [responsive styles and tests](../../angular/src/app/core/staticComponents/about) |
| Resume / GitHub / LinkedIn cards | [about.component.html](../../angular/src/app/core/staticComponents/about/about.component.html), [styles and tests](../../angular/src/app/core/staticComponents/about) |
| Original local profile icons | [profile-icons](../../angular/public/assets/icons/profile-icons) |
| Professional highlights marquee / original drone graphic / drag-and-resume native-scroll loop | [about-marquee.component.ts](../../angular/src/app/core/staticComponents/about/about-marquee.component.ts), [explicit item sizing and native-scroll styles](../../angular/src/app/core/staticComponents/about/about-marquee.component.css), [rendered geometry, drag and repeated-cycle contracts](../../angular/src/app/core/staticComponents/about/about-marquee.component.spec.ts) |
| Images | [images](../../angular/public/assets/images) |

**About:** background, professional experience, education and resume. **Home:** brief introduction. **Contact:** direct profile/email access, owned by the [Contact agent](contact.md).

Use [status](../STATUS.md) and public resume information for accurate biography; never import transcript content. About is separate from Home and Contact. The single page h1 belongs to Home; About's section h2 is in the root template. Biography still needs A1 refresh. Update index paths with future moves.
