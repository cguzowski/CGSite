import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AboutMarqueeComponent,
  createIOSMarqueeFallback,
  shouldUseIOSMarqueeFallback
} from './about-marquee.component';

describe('AboutMarqueeComponent', () => {
  let fixture: ComponentFixture<AboutMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMarqueeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMarqueeComponent);
    fixture.detectChanges();
  });

  it('starts its infinite loop from an explicit transform so WebKit paints it immediately', () => {
    const track = fixture.nativeElement.querySelector('.marquee-track') as HTMLElement;
    const animation = track.getAnimations()[0] as CSSAnimation;
    const keyframes = (animation.effect as KeyframeEffect).getKeyframes();

    expect(animation).toBeDefined();
    expect(animation.effect!.getTiming().iterations).toBe(Infinity);
    expect(keyframes[0]['transform']).not.toBe('none');
    expect(keyframes[keyframes.length - 1]['transform']).not.toBe('none');
  });

  it('recognizes iOS and iPad desktop mode without relying on CSS feature detection', () => {
    expect(shouldUseIOSMarqueeFallback('iPhone', 5)).toBeTrue();
    expect(shouldUseIOSMarqueeFallback('iPad', 5)).toBeTrue();
    expect(shouldUseIOSMarqueeFallback('MacIntel', 5)).toBeTrue();
    expect(shouldUseIOSMarqueeFallback('MacIntel', 0)).toBeFalse();
    expect(shouldUseIOSMarqueeFallback('Linux armv8l', 5)).toBeFalse();
  });

  it('loops between buffered copies instead of either edge of the scroll content', () => {
    const marquee = document.createElement('div');
    const group = document.createElement('div');
    const frames: FrameRequestCallback[] = [];
    let scrollLeft = 0;
    Object.defineProperty(marquee, 'scrollLeft', {
      get: () => scrollLeft,
      set: value => scrollLeft = value
    });
    spyOn(group, 'getBoundingClientRect').and.returnValue({ width: 1000 } as DOMRect);

    const cleanup = createIOSMarqueeFallback(
      marquee,
      group,
      callback => {
        frames.push(callback);
        return frames.length;
      },
      () => undefined
    );

    frames.shift()!(1000);
    expect(marquee.scrollLeft).toBe(1000);

    frames.shift()!(56_999);
    expect(marquee.classList).toContain('marquee--native-loop');
    expect(marquee.scrollLeft).toBeCloseTo(1999.98, 1);

    frames.shift()!(57_000);
    expect(marquee.scrollLeft).toBe(1000);
    cleanup();
  });

  it('joins the last iOS item directly to the first item of the next copy', () => {
    const host = fixture.nativeElement as HTMLElement;
    host.style.width = '375px';
    host.querySelector('.marquee')!.classList.add('marquee--native-loop');
    const track = host.querySelector<HTMLElement>('.marquee-track')!;
    expect(getComputedStyle(track).transform).toBe('none');
    expect(getComputedStyle(host.querySelector('.marquee')!).overflowX).toBe('auto');
    const groups = host.querySelectorAll<HTMLElement>('.marquee-group');
    const last = groups[0].lastElementChild!.getBoundingClientRect();
    const next = groups[1].firstElementChild!.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(groups[0]).columnGap);
    expect(next.left - last.right).toBeCloseTo(gap, 0);
  });

  it('sizes each loop group to its rendered items and keeps scrolling across repeated cycles', () => {
    const host = fixture.nativeElement as HTMLElement;
    host.style.width = '375px';
    const marquee = host.querySelector<HTMLElement>('.marquee')!;
    const group = host.querySelector<HTMLElement>('.marquee-group')!;
    const frames: FrameRequestCallback[] = [];
    const cleanup = createIOSMarqueeFallback(marquee, group, callback => {
      frames.push(callback);
      return frames.length;
    }, () => undefined);
    const width = group.getBoundingClientRect().width;
    const last = group.lastElementChild!.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(group).columnGap);
    expect(last.right + gap - group.getBoundingClientRect().left).toBeCloseTo(width, 0);
    for (const timestamp of [0, 55_999, 56_000, 111_999, 112_000]) {
      frames.shift()!(timestamp);
      const expected = width * (1 + (timestamp % 56_000) / 56_000);
      expect(marquee.scrollLeft).toBeCloseTo(expected, 0);
    }
    cleanup();
  });

  it('renders surrounding copies so the iOS loop never reaches an unpainted edge', () => {
    const groups = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.marquee-group'));

    expect(groups.length).toBe(4);
    expect(groups.filter(group => group.getAttribute('aria-hidden') === 'true').length).toBe(3);
  });
});
