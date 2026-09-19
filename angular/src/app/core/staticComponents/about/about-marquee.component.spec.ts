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

  it('limits the native scrolling fallback to touch-based WebKit browsers', () => {
    expect(shouldUseIOSMarqueeFallback(true, 5)).toBeTrue();
    expect(shouldUseIOSMarqueeFallback(true, 0)).toBeFalse();
    expect(shouldUseIOSMarqueeFallback(false, 5)).toBeFalse();
  });

  it('scrolls by one measured group before wrapping to its identical copy', () => {
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
    frames.shift()!(56_999);
    expect(marquee.classList).toContain('marquee--native-loop');
    expect(marquee.scrollLeft).toBeCloseTo(999.98, 1);

    frames.shift()!(57_000);
    expect(marquee.scrollLeft).toBe(0);
    cleanup();
  });
});
