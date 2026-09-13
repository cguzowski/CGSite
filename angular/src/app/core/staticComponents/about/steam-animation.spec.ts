import { createSteamAnimation, getSteamPlumeHeight, getSteamSpawnOffsets } from './steam-animation';

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
