interface SteamNode {
  age: number; rise: number; x: number; y: number; launch: number;
  drift: number; strength: number; dx: number; dy: number; vx: number; vy: number;
  dispersal: number; segmentStrength: number; baseLevel: number;
}
interface Swipe {
  fromX: number; fromY: number; x: number; y: number; vx: number; vy: number;
  sx: number; sy: number; length2: number;
}

/** The supplied SteamCup simulation, contained in the About illustration. */
export function createSteamAnimation(canvas: HTMLCanvasElement, cup: SVGSVGElement): () => void {
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const ctx = context;
  const host = canvas.parentElement!;
    // The only tuning knobs: number of strands, rise speed, and swipe strength.
    const settings = { density: 10, riseSpeed: 43, mouseStrength: 0.85 };
    // Spread the light across wider edges instead of a bright, narrow core.
    // Keep three unfiltered passes; fewer strands offset the wider strokes.
    const steamLayers = [
      { width: 5, opacity: .035 },
      { width: 3, opacity: .045 },
      { width: 1.5, opacity: .045 }
    ];
    const random = (min: number, max: number) => min + Math.random() * (max - min);
    const randomFlow = () => ({ offset: random(-9, 9), drift: random(-9, 9),
      speed: random(.8, 1.2), strength: random(.15, 1) });
    const flowKeys = ['offset', 'drift', 'speed', 'strength'] as const;
    const nodePool: SteamNode[] = [];
    const strands = Array.from({ length: settings.density }, (_, i) => ({
      nodes: [] as SteamNode[], paths: new Array<Path2D | null>(13), levels: [] as number[],
      phase: random(0, Math.PI * 2), offset: ((i / (settings.density - 1)) - .5) * 76,
      width: 2.5 + (i % 4) * .7, flow: randomFlow(), target: randomFlow(),
      changeIn: random(.5, 3), spawnIn: random(0, .06)
    }));
    let width = 300, height = 360, originX = 141, originY = 190, plumeHeight = 180;
    const canvasLeft = -300, canvasTop = -150;
    let canvasWidth = 900, canvasHeight = 660;
    let gradients: CanvasGradient[] = [];
    let time = 0, previous: number | null = null, lastDraw = 0, frameBudget = 0, animationId = 0;
    const frameInterval = 1000 / 30;
    let pointer: { x: number; y: number; time: number } | null = null;
    const swipes: Swipe[] = [];

    function resize() {
      const bounds = cup.getBoundingClientRect();
      const hostBounds = host.getBoundingClientRect();
      if (!hostBounds.width || !hostBounds.height) return;
      const scale = hostBounds.width / 300;
      width = 300;
      height = hostBounds.height / scale;
      originX = (bounds.left - hostBounds.left + bounds.width * .47) / scale;
      originY = (bounds.top - hostBounds.top + bounds.height * (18 / 140)) / scale;
      plumeHeight = Math.max(20, originY - 12) * (4 / 3);
      // Keep the original cup coordinates while giving dispersed steam room to fade.
      canvasWidth = width - canvasLeft * 2;
      canvasHeight = height - canvasTop * 2;
      canvas.style.left = `${canvasLeft * scale}px`;
      canvas.style.top = `${canvasTop * scale}px`;
      canvas.style.width = `${canvasWidth * scale}px`;
      canvas.style.height = `${canvasHeight * scale}px`;
      canvas.width = Math.ceil(canvasWidth / 2);
      canvas.height = Math.ceil(canvasHeight / 2);
      const scaleX = canvas.width / canvasWidth, scaleY = canvas.height / canvasHeight;
      ctx.setTransform(scaleX, 0, 0, scaleY, -canvasLeft * scaleX, -canvasTop * scaleY);
      gradients = steamLayers.map(({ opacity }) => {
        const gradient = ctx.createLinearGradient(0, originY, 0, originY - plumeHeight);
        gradient.addColorStop(0, `rgba(224,230,233,${opacity * .6})`);
        gradient.addColorStop(.05, `rgba(224,230,233,${opacity})`);
        gradient.addColorStop(.35, `rgba(224,230,233,${opacity * .5})`);
        gradient.addColorStop(.75, `rgba(224,230,233,${opacity * .12})`);
        gradient.addColorStop(1, 'rgba(224,230,233,0)');
        return gradient;
      });
      strands.forEach(strand => {
        for (const node of strand.nodes) nodePool.push(node);
        strand.nodes.length = 0;
      });
      // Start empty and let the steam rise naturally.
    }

    function advance(dt: number) {
      time += dt;
      const easing = 1 - Math.exp(-dt * 1.8);
      const damping = Math.exp(-2.2 * dt);
      // Segment geometry is shared by every node affected by a swipe.
      for (const swipe of swipes) {
        swipe.sx = swipe.x - swipe.fromX; swipe.sy = swipe.y - swipe.fromY;
        swipe.length2 = swipe.sx * swipe.sx + swipe.sy * swipe.sy || 1;
      }
      for (const strand of strands) {
        // Ease into new random conditions so neighboring points stay fluid.
        strand.changeIn -= dt;
        if (strand.changeIn <= 0) {
          strand.target = randomFlow();
          strand.changeIn = random(.8, 3);
        }
        for (const key of flowKeys) {
          strand.flow[key] += (strand.target[key] - strand.flow[key]) * easing;
        }
        strand.spawnIn -= dt;
        while (strand.spawnIn <= 0) {
          strand.spawnIn += random(.025, .065);
          const node = nodePool.pop() || {} as SteamNode;
          node.age = 0; node.rise = 0;
          node.x = originX + strand.offset + strand.flow.offset;
          node.launch = strand.offset + strand.flow.offset;
          node.drift = strand.flow.drift; node.strength = strand.flow.strength;
          node.y = originY;
          node.dx = 0; node.dy = 0; node.vx = 0; node.vy = 0; node.dispersal = 0;
          node.segmentStrength = 0; node.baseLevel = 0;
          strand.nodes.push(node);
          const count = strand.nodes.length;
          if (count >= 3) {
            const a = strand.nodes[count - 3], b = strand.nodes[count - 2];
            // Launch strengths never change, so each segment needs this only once.
            b.segmentStrength = (a.strength + b.strength * 2 + node.strength) / 4;
            b.baseLevel = Math.round(12 * b.segmentStrength);
          }
        }
        const riseStep = settings.riseSpeed * strand.flow.speed * dt;
        for (const node of strand.nodes) {
          node.age += dt;
          node.rise += riseStep;
          const progress = node.rise / plumeHeight;
          const curl = Math.sin(node.age * 1.55 - time * .65 + strand.phase) * 13
            + Math.sin(node.age * 3.1 - time * .8 + strand.phase * .4) * 5;
          node.x = originX + node.launch * (1 + progress * .35) + node.drift * node.age
            + curl * Math.min(1, node.age * 2) + node.dx;
          node.y = originY - node.rise + node.dy;
          for (const swipe of swipes) {
            const u = Math.max(0, Math.min(1, ((node.x - swipe.fromX) * swipe.sx + (node.y - swipe.fromY) * swipe.sy) / swipe.length2));
            const distanceX = node.x - swipe.fromX - u * swipe.sx;
            const distanceY = node.y - swipe.fromY - u * swipe.sy;
            const influence = Math.exp(-(distanceX * distanceX + distanceY * distanceY) / (2 * 43 * 43)) * Math.min(1, node.age * 5);
            node.vx += swipe.vx * influence * settings.mouseStrength * .22;
            node.vy += swipe.vy * influence * settings.mouseStrength * .16;
          }
          // Untouched steam has no displacement physics to calculate.
          if (node.vx !== 0 || node.vy !== 0) {
            node.vx = Math.max(-700, Math.min(700, node.vx));
            node.vy = Math.max(-500, Math.min(500, node.vy));
            node.dx += node.vx * dt; node.dy += node.vy * dt;
            // Keep the strongest displacement: dispersed steam never reforms.
            node.dispersal = Math.max(node.dispersal, Math.hypot(node.dx, node.dy));
            node.vx *= damping; node.vy *= damping;
          }
        }
        let expired = 0;
        while (expired < strand.nodes.length && strand.nodes[expired].rise > plumeHeight) {
          nodePool.push(strand.nodes[expired++]);
        }
        if (expired) {
          strand.nodes.copyWithin(0, expired);
          strand.nodes.length -= expired;
        }
      }
      swipes.length = 0;
    }

    function draw() {
      ctx.clearRect(canvasLeft, canvasTop, canvasWidth, canvasHeight);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      // Build geometry once; translucent widths provide softness without filters.
      for (const strand of strands) {
        const nodes = strand.nodes;
        const paths = strand.paths;
        paths.fill(null);
        strand.levels.length = 0;
        let previousLevel = -1;
        for (let i = 1; i < nodes.length - 1; i++) {
          const a = nodes[i - 1], b = nodes[i], c = nodes[i + 1];
          const displacement = (a.dispersal + b.dispersal * 2 + c.dispersal) / 4;
          const level = displacement === 0 ? b.baseLevel
            : Math.round(12 * b.segmentStrength * Math.exp(-Math.pow(displacement / 55, 1.4)));
          if (level === 0) { previousLevel = -1; continue; }
          if (!paths[level]) {
            paths[level] = new Path2D();
            strand.levels.push(level);
          }
          const path = paths[level]!;
          if (level !== previousLevel) {
            path.moveTo(i === 1 ? a.x : (a.x + b.x) / 2, i === 1 ? a.y : (a.y + b.y) / 2);
          }
          path.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
          previousLevel = level;
        }
      }
      // Group similarly faded sections so local fading needs few draw calls.
      for (let pass = 0; pass < steamLayers.length; pass++) {
        ctx.strokeStyle = gradients[pass];
        for (const strand of strands) {
          ctx.lineWidth = strand.width * steamLayers[pass].width;
          for (const level of strand.levels) {
            ctx.globalAlpha = level / 12;
            ctx.stroke(strand.paths[level]!);
          }
        }
      }
      ctx.globalAlpha = 1;
    }


    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let destroyed = false;
    const running = () => visible && !document.hidden && !reducedMotion.matches && !destroyed;

    function frame(now: number): void {
      if (!running()) return;
      if (previous === null) lastDraw = now;
      const elapsed = previous === null ? 0 : now - previous;
      previous = now;
      frameBudget += elapsed;
      if (frameBudget >= frameInterval - .1) {
        advance(Math.min((now - lastDraw) / 1000, .1));
        lastDraw = now;
        frameBudget = Math.max(0, frameBudget - frameInterval);
        if (frameBudget >= frameInterval) frameBudget %= frameInterval;
        draw();
      }
      animationId = requestAnimationFrame(frame);
    }

    function syncPlayback(): void {
      cancelAnimationFrame(animationId);
      previous = null;
      frameBudget = 0;
      pointer = null;
      swipes.length = 0;
      if (reducedMotion.matches) ctx.clearRect(canvasLeft, canvasTop, canvasWidth, canvasHeight);
      if (running()) animationId = requestAnimationFrame(frame);
    }

    function movePointer(event: PointerEvent): void {
      // Native touch gestures continue to scroll the page.
      if (!running() || event.pointerType === 'touch') return;
      const bounds = host.getBoundingClientRect();
      const scale = bounds.width / width;
      const next = { x: (event.clientX - bounds.left) / scale,
        y: (event.clientY - bounds.top) / scale, time: event.timeStamp };
      if (pointer) {
        const dt = Math.max(.008, (next.time - pointer.time) / 1000);
        swipes.push({ fromX: pointer.x, fromY: pointer.y, x: next.x, y: next.y,
          vx: Math.max(-1800, Math.min(1800, (next.x - pointer.x) / dt)),
          vy: Math.max(-1800, Math.min(1800, (next.y - pointer.y) / dt)),
          sx: 0, sy: 0, length2: 1 });
        if (swipes.length > 8) swipes.shift();
      }
      pointer = next;
    }
    const leavePointer = () => { pointer = null; };
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      syncPlayback();
    });
    resizeObserver.observe(host);
    visibilityObserver.observe(host);
    document.addEventListener('pointermove', movePointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', leavePointer);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    resize();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('pointermove', movePointer);
      document.documentElement.removeEventListener('pointerleave', leavePointer);
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
}
