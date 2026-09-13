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
