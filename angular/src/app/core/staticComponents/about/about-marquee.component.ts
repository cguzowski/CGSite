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

function wrapScrollPosition(position: number, groupWidth: number): number {
  if (groupWidth <= 0) {
    return position;
  }
  const offset = ((position - groupWidth) % groupWidth + groupWidth) % groupWidth;
  return groupWidth + offset;
}

/**
 * Move the real scroll position so pointer dragging and automatic movement share
 * one source of truth. Buffered copies make wrapping visually seamless.
 */
export function createInteractiveMarquee(
  marquee: HTMLElement,
  group: HTMLElement,
  requestFrame: RequestFrame = callback => window.requestAnimationFrame(callback),
  cancelFrame: CancelFrame = handle => window.cancelAnimationFrame(handle),
  autoPlay = true
): () => void {
  let frameId: number | undefined;
  let previousTimestamp: number | undefined;
  let activePointer: number | undefined;
  let activeTouch: number | undefined;
  let touchDirection: 'horizontal' | 'vertical' | undefined;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartScrollLeft = 0;
  let subpixelRemainder = 0;
  const touchEventsSupported = typeof TouchEvent !== 'undefined';

  const findTouch = (touches: TouchList, identifier: number): Touch | undefined => {
    for (let index = 0; index < touches.length; index += 1) {
      if (touches[index].identifier === identifier) {
        return touches[index];
      }
    }
    return undefined;
  };

  const advance = (timestamp: number): void => {
    if (activePointer === undefined && activeTouch === undefined) {
      if (previousTimestamp !== undefined) {
        const groupWidth = group.getBoundingClientRect().width;
        const distance = (timestamp - previousTimestamp) * groupWidth / MARQUEE_DURATION_MS;
        const precisePosition = wrapScrollPosition(
          marquee.scrollLeft + distance + subpixelRemainder,
          groupWidth
        );
        marquee.scrollLeft = precisePosition;
        subpixelRemainder = precisePosition - marquee.scrollLeft;
      }
      previousTimestamp = timestamp;
    }
    frameId = requestFrame(advance);
  };

  const endDrag = (event: PointerEvent): void => {
    if (event.pointerId !== activePointer) {
      return;
    }
    if (marquee.hasPointerCapture(event.pointerId)) {
      marquee.releasePointerCapture(event.pointerId);
    }
    activePointer = undefined;
    previousTimestamp = undefined;
    subpixelRemainder = 0;
    marquee.classList.remove('marquee--dragging');
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' && touchEventsSupported) {
      return;
    }
    if (activePointer !== undefined || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }
    activePointer = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = marquee.scrollLeft;
    previousTimestamp = undefined;
    subpixelRemainder = 0;
    marquee.classList.add('marquee--dragging');
    marquee.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' && touchEventsSupported) {
      return;
    }
    if (event.pointerId !== activePointer) {
      return;
    }
    const nextPosition = dragStartScrollLeft + dragStartX - event.clientX;
    marquee.scrollLeft = autoPlay
      ? wrapScrollPosition(nextPosition, group.getBoundingClientRect().width)
      : nextPosition;
    if (event.cancelable) {
      event.preventDefault();
    }
  };

  const finishTouch = (): void => {
    activeTouch = undefined;
    touchDirection = undefined;
    previousTimestamp = undefined;
    subpixelRemainder = 0;
    marquee.classList.remove('marquee--dragging');
  };

  const onTouchStart = (event: TouchEvent): void => {
    if (activeTouch !== undefined || activePointer !== undefined) {
      return;
    }
    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }
    activeTouch = touch.identifier;
    touchDirection = undefined;
    dragStartX = touch.clientX;
    dragStartY = touch.clientY;
    dragStartScrollLeft = marquee.scrollLeft;
    previousTimestamp = undefined;
    subpixelRemainder = 0;
    marquee.classList.add('marquee--dragging');
  };

  const onTouchMove = (event: TouchEvent): void => {
    if (activeTouch === undefined) {
      return;
    }
    const touch = findTouch(event.touches, activeTouch);
    if (!touch) {
      return;
    }
    const distanceX = dragStartX - touch.clientX;
    const distanceY = dragStartY - touch.clientY;
    if (touchDirection === undefined) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 4) {
        return;
      }
      touchDirection = Math.abs(distanceX) > Math.abs(distanceY) ? 'horizontal' : 'vertical';
      if (touchDirection === 'vertical') {
        finishTouch();
        return;
      }
    }
    const nextPosition = dragStartScrollLeft + distanceX;
    marquee.scrollLeft = autoPlay
      ? wrapScrollPosition(nextPosition, group.getBoundingClientRect().width)
      : nextPosition;
    event.preventDefault();
  };

  const onTouchEnd = (event: TouchEvent): void => {
    if (activeTouch !== undefined && findTouch(event.changedTouches, activeTouch)) {
      finishTouch();
    }
  };

  marquee.classList.add('marquee--native-loop');
  marquee.scrollLeft = autoPlay ? group.getBoundingClientRect().width : 0;
  marquee.addEventListener('pointerdown', onPointerDown);
  marquee.addEventListener('pointermove', onPointerMove);
  marquee.addEventListener('pointerup', endDrag);
  marquee.addEventListener('pointercancel', endDrag);
  marquee.addEventListener('lostpointercapture', endDrag);
  marquee.addEventListener('touchstart', onTouchStart, { passive: true });
  marquee.addEventListener('touchmove', onTouchMove, { passive: false });
  marquee.addEventListener('touchend', onTouchEnd, { passive: true });
  marquee.addEventListener('touchcancel', onTouchEnd, { passive: true });
  if (autoPlay) {
    frameId = requestFrame(advance);
  }

  return () => {
    if (frameId !== undefined) {
      cancelFrame(frameId);
    }
    marquee.removeEventListener('pointerdown', onPointerDown);
    marquee.removeEventListener('pointermove', onPointerMove);
    marquee.removeEventListener('pointerup', endDrag);
    marquee.removeEventListener('pointercancel', endDrag);
    marquee.removeEventListener('lostpointercapture', endDrag);
    marquee.removeEventListener('touchstart', onTouchStart);
    marquee.removeEventListener('touchmove', onTouchMove);
    marquee.removeEventListener('touchend', onTouchEnd);
    marquee.removeEventListener('touchcancel', onTouchEnd);
    marquee.classList.remove('marquee--native-loop', 'marquee--dragging');
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

  readonly duplicateGroups = [false, true, true, true] as const;
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
      const marquee = this.host.nativeElement.querySelector<HTMLElement>('.marquee');
      const group = this.host.nativeElement.querySelector<HTMLElement>('.marquee-group');
      if (!marquee || !group) {
        return;
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let stopLoop: () => void = () => undefined;
      const syncMotionPreference = (): void => {
        stopLoop();
        stopLoop = createInteractiveMarquee(
          marquee,
          group,
          callback => window.requestAnimationFrame(callback),
          handle => window.cancelAnimationFrame(handle),
          !reducedMotion.matches
        );
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
