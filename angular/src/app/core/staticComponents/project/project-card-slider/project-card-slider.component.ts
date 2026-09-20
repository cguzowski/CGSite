import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import type { SwiperContainer } from 'swiper/element';
import { ResponsiveImageDirective } from '../../../media/responsive-image.directive';

export interface ProjectSlide {
  title: string;
  url?: string;
  description: string;
  image: string;
  imageAlt?: string;
  color?: string;
}

@Component({
  selector: 'app-project-card-slider',
  standalone: true,
  imports: [CommonModule, ResponsiveImageDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-card-slider.component.html',
  styleUrl: './project-card-slider.component.css',
})
export class ProjectCardSliderComponent implements AfterViewInit, OnDestroy {
  @Input() slides: readonly ProjectSlide[] = [];
  @Input() ariaLabel = 'Project walkthrough';
  @ViewChild('deck', { static: true }) private deck!: ElementRef<SwiperContainer>;

  readonly playing = signal(false);
  readonly activeIndex = signal(0);
  readonly atStart = signal(true);
  readonly atEnd = signal(true);
  readonly ready = signal(false);
  readonly requestedImages = signal<ReadonlySet<number>>(new Set());

  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private visibilityObserver?: IntersectionObserver;
  private timer?: ReturnType<typeof setInterval>;
  private destroyed = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visibilityObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      this.visibilityObserver?.disconnect();
      this.requestNearbyImages();
      void this.initializeDeck();
    }, { rootMargin: '300px' });
    this.visibilityObserver.observe(this.host.nativeElement);
  }

  private async initializeDeck(): Promise<void> {
    const { register } = await import('swiper/element/bundle');
    if (this.destroyed) return;
    register();

    Object.assign(this.deck.nativeElement, {
      effect: 'cards',
      grabCursor: true,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400,
      loop: false,
      observer: true,
      observeSlideChildren: true,
      cardsEffect: { slideShadows: false, perSlideOffset: 8, perSlideRotate: 2 },
      a11y: { enabled: true },
      on: {
        init: () => this.syncState(),
        slideChange: () => this.syncState(),
        update: () => this.syncState(),
        observerUpdate: () => this.syncState(),
        touchStart: () => this.pause(),
      },
    });
    this.deck.nativeElement.initialize();
    this.ready.set(true);
    this.syncState();
  }

  previous(): void {
    this.pause();
    this.deck.nativeElement.swiper?.slidePrev();
  }

  next(): void {
    this.pause();
    this.deck.nativeElement.swiper?.slideNext();
  }

  togglePlayback(): void {
    if (this.playing()) {
      this.pause();
      return;
    }
    const swiper = this.deck.nativeElement.swiper;
    if (!swiper || swiper.slides.length < 2) return;
    if (swiper.isEnd) swiper.slideTo(0);
    this.playing.set(true);
    this.timer = setInterval(() => {
      if (swiper.isEnd) this.pause();
      else swiper.slideNext();
    }, 2000);
  }

  pause(): void {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    this.playing.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') this.previous();
    else this.next();
  }

  private syncState(): void {
    const swiper = this.deck.nativeElement.swiper;
    if (!swiper) return;
    this.activeIndex.set(swiper.activeIndex);
    this.requestNearbyImages();
    this.atStart.set(swiper.isBeginning || swiper.slides.length < 2);
    this.atEnd.set(swiper.isEnd || swiper.slides.length < 2);
    if (this.atEnd()) this.pause();
  }

  private requestNearbyImages(): void {
    const requested = new Set(this.requestedImages());
    for (let index = this.activeIndex() - 1; index <= this.activeIndex() + 1; index++) {
      if (index >= 0 && index < this.slides.length) requested.add(index);
    }
    // Retain visited images so reverse navigation never clears a painted card.
    if (requested.size !== this.requestedImages().size) this.requestedImages.set(requested);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.visibilityObserver?.disconnect();
    this.pause();
  }
}
