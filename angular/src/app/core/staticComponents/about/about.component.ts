import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { SteamCupComponent } from './steam-cup.component';
import { waitForAboutMedia } from './about-media';
import { AboutMarqueeComponent } from './about-marquee.component';
import { ResponsiveImageDirective } from '../../media/responsive-image.directive';

@Component({
  selector: 'app-about',
  imports: [SteamCupComponent, AboutMarqueeComponent, ResponsiveImageDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly cupReady = signal(false);
  readonly portraitReady = signal(false);

  constructor() {
    const document = inject(DOCUMENT);
    const host = inject(ElementRef<HTMLElement>);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // Wait for actual visibility; native lazy loading can fetch a viewport ahead.
      // A direct About link must also work when hero playback is blocked or stalls.
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        this.portraitReady.set(true);
        observer.disconnect();
      });
      observer.observe(host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
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
