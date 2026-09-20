import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardSliderComponent } from './project-card-slider.component';

describe('ProjectCardSliderComponent', () => {
  const imageData = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  let component: ProjectCardSliderComponent;
  let fixture: ComponentFixture<ProjectCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardSliderComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardSliderComponent);
    component = fixture.componentInstance;
    component.slides = [
      { title: 'First', description: 'First card', image: imageData, url: 'https://example.com/first' },
      { title: 'Second', description: 'Second card', image: imageData },
    ];
    fixture.detectChanges();
  });

  it('renders accessible controls and screen-reader position feedback without a visible counter', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('[aria-label="Previous slide"]')).not.toBeNull();
    expect(host.querySelector('[aria-label="Play slideshow"]')).not.toBeNull();
    expect(host.querySelector('[aria-label="Next slide"]')).not.toBeNull();
    const position = host.querySelector('[aria-live="polite"]');
    expect(position?.textContent?.trim()).toBe('Slide 1 of 2');
    expect(position?.classList).toContain('visually-hidden');
    expect(host.querySelector('.position')).toBeNull();
  });

  it('withholds screenshot requests in the initial document', () => {
    const images: NodeListOf<HTMLImageElement> = fixture.nativeElement.querySelectorAll('img');
    expect(images.length).toBe(2);
    images.forEach(image => {
      expect(image.hasAttribute('src')).toBeFalse();
      expect(image.hasAttribute('srcset')).toBeFalse();
    });
  });

  it('shows the active title as an external link above the deck', () => {
    const host: HTMLElement = fixture.nativeElement;
    let titleLink = host.querySelector<HTMLAnchorElement>('.project-title-link');

    expect(titleLink?.textContent?.trim()).toBe('First');
    expect(titleLink?.href).toBe('https://example.com/first');
    expect(titleLink?.target).toBe('_blank');
    expect(titleLink?.rel).toContain('noopener');
    expect(titleLink?.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
    expect(titleLink?.getAttribute('aria-label')).toContain('First');
    expect((titleLink?.compareDocumentPosition(host.querySelector('swiper-container') as Node) ?? 0) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    component.activeIndex.set(1);
    fixture.detectChanges();
    expect(host.querySelector('.project-slide-title')?.textContent?.trim()).toBe('Second');
    expect(host.querySelector('.project-title-link')).toBeNull();
  });

  it('maps arrow keys to slider navigation and prevents native scrolling', () => {
    const next = spyOn(component, 'next');
    const previous = spyOn(component, 'previous');
    const right = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
    const left = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });

    component.onKeydown(right);
    component.onKeydown(left);

    expect(right.defaultPrevented).toBeTrue();
    expect(left.defaultPrevented).toBeTrue();
    expect(next).toHaveBeenCalledTimes(1);
    expect(previous).toHaveBeenCalledTimes(1);
  });
});

describe('Project screenshot loading', () => {
  let intersect: IntersectionObserverCallback;
  let observer: IntersectionObserver;
  let disconnect: jasmine.Spy;

  beforeEach(async () => {
    disconnect = jasmine.createSpy('disconnect');
    observer = { observe: jasmine.createSpy('observe'), disconnect } as unknown as IntersectionObserver;
    spyOn(window, 'IntersectionObserver').and.callFake(function(callback) {
      intersect = callback;
      return observer;
    });
    await TestBed.configureTestingModule({ imports: [ProjectCardSliderComponent] }).compileComponents();
  });

  it('requests only nearby cards on approach and preserves loaded images when navigating back', async () => {
    const fixture = TestBed.createComponent(ProjectCardSliderComponent);
    fixture.componentInstance.slides = Array.from({ length: 5 }, (_, index) => ({
      title: `Card ${index}`, description: `Card ${index}`,
      image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    }));
    fixture.detectChanges();
    const images = () => Array.from(fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>)
      .map(image => image.hasAttribute('src'));
    expect(fixture.componentInstance.ready()).toBeFalse();
    expect(images()).toEqual([false, false, false, false, false]);
    expect(window.IntersectionObserver).toHaveBeenCalledWith(jasmine.any(Function), { rootMargin: '300px' });

    intersect([{ isIntersecting: true } as IntersectionObserverEntry], observer);
    // Dynamic import completion is outside fixture stability when the observer is mocked.
    const deadline = performance.now() + 3000;
    while (!fixture.componentInstance.ready() && performance.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    await fixture.whenStable();
    fixture.detectChanges();
    expect(images()).toEqual([true, true, false, false, false]);
    expect(fixture.componentInstance.ready()).toBeTrue();
    expect(disconnect).toHaveBeenCalled();

    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(images()).toEqual([true, true, true, false, false]);
    fixture.componentInstance.previous();
    fixture.detectChanges();
    expect(images()).toEqual([true, true, true, false, false]);
    fixture.destroy();
  });

  it('disconnects the observer when removed before reaching the viewport', () => {
    const fixture = TestBed.createComponent(ProjectCardSliderComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(disconnect).toHaveBeenCalled();
  });
});
