import { createSteamAnimation } from './steam-animation';

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
