import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject
} from '@angular/core';

const MARQUEE_DURATION_MS = 56_000;

type RequestFrame = (callback: FrameRequestCallback) => number;
type CancelFrame = (handle: number) => void;

export function shouldUseIOSMarqueeFallback(supportsWebkitTouchCallout: boolean, maxTouchPoints: number): boolean {
  return supportsWebkitTouchCallout && maxTouchPoints > 0;
}

/** Use native scrolling on iOS so WebKit paints the offscreen duplicate before it enters view. */
export function createIOSMarqueeFallback(
  marquee: HTMLElement,
  group: HTMLElement,
  requestFrame: RequestFrame = callback => window.requestAnimationFrame(callback),
  cancelFrame: CancelFrame = handle => window.cancelAnimationFrame(handle)
): () => void {
  let frameId: number | undefined;
  let startTime: number | undefined;

  const advance = (timestamp: number): void => {
    startTime ??= timestamp;
    const groupWidth = group.getBoundingClientRect().width;
    const progress = ((timestamp - startTime) % MARQUEE_DURATION_MS) / MARQUEE_DURATION_MS;
    marquee.scrollLeft = progress * groupWidth;
    frameId = requestFrame(advance);
  };

  marquee.classList.add('marquee--native-loop');
  frameId = requestFrame(advance);

  return () => {
    if (frameId !== undefined) {
      cancelFrame(frameId);
    }
    marquee.classList.remove('marquee--native-loop');
  };
}

interface AboutHighlight {
  readonly symbol: string;
  readonly text: string;
  readonly usesDrone?: boolean;
}

@Component({
  selector: 'app-about-marquee',
  templateUrl: './about-marquee.component.html',
  styleUrl: './about-marquee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMarqueeComponent {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly duplicateGroups = [false, true] as const;
  readonly highlights: readonly AboutHighlight[] = [
    { symbol: '🚀', text: 'Launched 5+ Systems to Production' },
    { symbol: '📜', text: 'Magna Cum Laude' },
    { symbol: '🎓', text: 'Georgia Tech OMSCS · Starting Spring 2027' },
    { symbol: '🌍', text: '35 Countries · 5 of 7 Continents' },
    { symbol: '🤝', text: 'Mentored Others Across Five Skills' },
    { symbol: '', text: 'FAA Part 107 Certified Drone Pilot', usesDrone: true },
    { symbol: '▶️', text: '1.5 Million Views on One Video' },
    { symbol: '📚', text: 'Read 200+ Books' },
    { symbol: '💻', text: '5,000+ Pre-AI Hours Coding' },
    { symbol: '🛠️', text: '150+ Projects Completed' }
  ];

  constructor() {
    afterNextRender(() => {
      if (!shouldUseIOSMarqueeFallback(
        CSS.supports('-webkit-touch-callout', 'none'),
        navigator.maxTouchPoints
      )) {
        return;
      }

      const marquee = this.host.nativeElement.querySelector<HTMLElement>('.marquee');
      const group = this.host.nativeElement.querySelector<HTMLElement>('.marquee-group');
      if (!marquee || !group) {
        return;
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let stopLoop: () => void = () => undefined;
      const syncMotionPreference = (): void => {
        stopLoop();
        marquee.scrollLeft = 0;
        if (!reducedMotion.matches) {
          stopLoop = createIOSMarqueeFallback(marquee, group);
        }
      };

      reducedMotion.addEventListener('change', syncMotionPreference);
      syncMotionPreference();
      this.destroyRef.onDestroy(() => {
        reducedMotion.removeEventListener('change', syncMotionPreference);
        stopLoop();
      });
    });
  }
}
