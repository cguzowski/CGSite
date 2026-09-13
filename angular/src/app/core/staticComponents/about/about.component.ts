import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { SteamCupComponent } from './steam-cup.component';
import { waitForAboutMedia } from './about-media';
import { AboutMarqueeComponent } from './about-marquee.component';

@Component({
  selector: 'app-about',
  imports: [SteamCupComponent, AboutMarqueeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly cupReady = signal(false);

  constructor() {
    const document = inject(DOCUMENT);
    const host = inject(ElementRef<HTMLElement>);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const cleanup = waitForAboutMedia(
        host.nativeElement,
        document.querySelector<HTMLVideoElement>('#home video'),
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        () => this.cupReady.set(true)
      );
      destroyRef.onDestroy(cleanup);
    });
  }
}
