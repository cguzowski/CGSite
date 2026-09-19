import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMarqueeComponent } from './about-marquee.component';

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
});
