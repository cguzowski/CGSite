import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AboutMarqueeComponent,
  createInteractiveMarquee
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

  it('presents the highlights as a focusable horizontal drag region', () => {
    const marquee = fixture.nativeElement.querySelector('.marquee') as HTMLElement;
    const styles = getComputedStyle(marquee);

    expect(marquee.tabIndex).toBe(0);
    expect(marquee.getAttribute('aria-label')).toContain('Drag or swipe horizontally');
    expect(styles.cursor).toBe('grab');
    expect(styles.touchAction).toBe('pan-y');
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

    const cleanup = createInteractiveMarquee(
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

  it('joins the last item directly to the first item of the next scroll copy', () => {
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

  it('sizes each loop group to its rendered items with enough copies for seamless wrapping', () => {
    const host = fixture.nativeElement as HTMLElement;
    host.style.width = '375px';
    const marquee = host.querySelector<HTMLElement>('.marquee')!;
    const group = host.querySelector<HTMLElement>('.marquee-group')!;
    const width = group.getBoundingClientRect().width;
    const last = group.lastElementChild!.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(group).columnGap);
    expect(last.right + gap - group.getBoundingClientRect().left).toBeCloseTo(width, 0);
    expect(marquee.scrollWidth).toBeCloseTo(width * 4, 0);
  });

  it('renders surrounding copies so the iOS loop never reaches an unpainted edge', () => {
    const groups = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.marquee-group'));

    expect(groups.length).toBe(4);
    expect(groups.filter(group => group.getAttribute('aria-hidden') === 'true').length).toBe(3);
  });

  it('pauses while dragged and resumes its continuous loop from the released position', () => {
    const marquee = document.createElement('div');
    const group = document.createElement('div');
    const frames: FrameRequestCallback[] = [];
    let scrollLeft = 0;
    Object.defineProperty(marquee, 'scrollLeft', {
      get: () => scrollLeft,
      set: value => scrollLeft = value
    });
    spyOn(group, 'getBoundingClientRect').and.returnValue({ width: 560 } as DOMRect);
    spyOn(marquee, 'setPointerCapture');
    spyOn(marquee, 'releasePointerCapture');

    const cleanup = createInteractiveMarquee(marquee, group, callback => {
      frames.push(callback);
      return frames.length;
    }, () => undefined);

    frames.shift()!(1_000);
    frames.shift()!(2_000);
    expect(marquee.scrollLeft).toBeCloseTo(570, 4);

    marquee.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 7, clientX: 200 }));
    marquee.dispatchEvent(new PointerEvent('pointermove', { pointerId: 7, clientX: 140 }));
    expect(marquee.classList).toContain('marquee--dragging');
    expect(marquee.scrollLeft).toBeCloseTo(630, 4);

    frames.shift()!(3_000);
    expect(marquee.scrollLeft).toBeCloseTo(630, 4);

    marquee.dispatchEvent(new PointerEvent('pointerup', { pointerId: 7, clientX: 140 }));
    frames.shift()!(4_000);
    frames.shift()!(5_000);
    expect(marquee.classList).not.toContain('marquee--dragging');
    expect(marquee.scrollLeft).toBeCloseTo(640, 4);
    cleanup();
  });

  it('wraps a manual drag between duplicate groups without changing its visible position', () => {
    const marquee = document.createElement('div');
    const group = document.createElement('div');
    let scrollLeft = 0;
    Object.defineProperty(marquee, 'scrollLeft', {
      get: () => scrollLeft,
      set: value => scrollLeft = value
    });
    spyOn(group, 'getBoundingClientRect').and.returnValue({ width: 500 } as DOMRect);
    spyOn(marquee, 'setPointerCapture');
    spyOn(marquee, 'releasePointerCapture');

    const cleanup = createInteractiveMarquee(
      marquee,
      group,
      () => 1,
      () => undefined
    );

    marquee.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 3, clientX: 100 }));
    marquee.dispatchEvent(new PointerEvent('pointermove', { pointerId: 3, clientX: 650 }));
    expect(marquee.scrollLeft).toBeCloseTo(950, 4);
    cleanup();
  });

  it('accumulates subpixel auto-motion when the browser rounds each rendered scroll position', () => {
    const marquee = document.createElement('div');
    const group = document.createElement('div');
    const frames: FrameRequestCallback[] = [];
    let renderedScrollLeft = 0;
    Object.defineProperty(marquee, 'scrollLeft', {
      get: () => renderedScrollLeft,
      set: value => renderedScrollLeft = Math.round(value)
    });
    spyOn(group, 'getBoundingClientRect').and.returnValue({ width: 1646.4 } as DOMRect);

    const cleanup = createInteractiveMarquee(marquee, group, callback => {
      frames.push(callback);
      return frames.length;
    }, () => undefined);

    for (let frame = 0; frame <= 120; frame += 1) {
      frames.shift()!(frame * (1000 / 60));
    }

    expect(marquee.scrollLeft).toBeGreaterThan(1700);
    cleanup();
  });
});
