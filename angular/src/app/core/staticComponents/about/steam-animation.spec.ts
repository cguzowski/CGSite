import {
  createSteamAnimation,
  createSteamSwipe,
  createSteamTapSwipe,
  findTrackedTouch,
  getSteamPlumeHeight,
  getSteamSpawnOffsets,
  shouldTrackSteamPointer
} from './steam-animation';

describe('Steam layout', () => {
  it('keeps the ten central spawn points and adds one at each cup edge', () => {
    const offsets = getSteamSpawnOffsets();

    expect(offsets.length).toBe(12);
    expect(offsets[0]).toBe(-77);
    expect(offsets[offsets.length - 1]).toBe(77);
  });

  it('raises the current plume height by fifty percent', () => {
    const originY = 190;
    const previousHeight = Math.max(20, originY - 12) * (4 / 3);

    expect(getSteamPlumeHeight(originY)).toBeCloseTo(previousHeight * 1.5, 6);
  });
});

describe('Steam drawing bounds', () => {
  for (const width of [156, 350]) {
    it(`leaves drawing space beyond both sides of a ${width}px cup slot`, () => {
      const host = document.createElement('div');
      host.style.cssText = `position:relative;width:${width}px;height:336px`;
      const canvas = document.createElement('canvas');
      const cup = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      host.append(canvas, cup);
      document.body.append(host);
      const cleanup = createSteamAnimation(canvas, cup);
      try {
        expect(parseFloat(canvas.style.left)).toBeLessThan(0);
        expect(parseFloat(canvas.style.width) + parseFloat(canvas.style.left)).toBeGreaterThan(width);
      } finally {
        cleanup();
        host.remove();
      }
    });
  }
});

describe('Steam pointer interaction', () => {
  it('tracks touch pointers so a mobile swipe can disperse the steam', () => {
    expect(shouldTrackSteamPointer('touch')).toBeTrue();
  });

  it('turns a tap near the plume into a short gust without cancelling scrolling', () => {
    const gust = createSteamTapSwipe(140, 100, 150);

    expect(gust.fromX).toBeLessThan(gust.x);
    expect(gust.fromY).toBe(gust.y);
    expect(gust.vx).toBeLessThan(0);
    expect(gust.vy).toBeLessThan(0);
  });

  it('keeps following the same finger when a mobile gesture changes its touch-list order', () => {
    const touches = [
      { identifier: 9, clientX: 220, clientY: 130 },
      { identifier: 4, clientX: 150, clientY: 90 }
    ];

    expect(findTrackedTouch(touches, 4)).toBe(touches[1]);
  });

  it('converts consecutive mobile touch positions into the same swipe force as a pointer', () => {
    const swipe = createSteamSwipe(
      { x: 120, y: 100, time: 1000 },
      { x: 160, y: 90, time: 1050 }
    );

    expect(swipe.fromX).toBe(120);
    expect(swipe.x).toBe(160);
    expect(swipe.vx).toBe(800);
    expect(swipe.vy).toBe(-200);
  });

  it('registers a passive touch-move path so scrolling does not cancel steam input', () => {
    const host = document.createElement('div');
    host.style.cssText = 'position:relative;width:156px;height:336px';
    const canvas = document.createElement('canvas');
    const cup = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    host.append(canvas, cup);
    document.body.append(host);
    const addEventListener = spyOn(document, 'addEventListener').and.callThrough();

    const cleanup = createSteamAnimation(canvas, cup);
    try {
      const passiveTouchMove = addEventListener.calls.allArgs().some(args =>
        args[0] === 'touchmove' && (args[2] as AddEventListenerOptions)?.passive === true);

      expect(passiveTouchMove).toBeTrue();
    } finally {
      cleanup();
      host.remove();
    }
  });
});
