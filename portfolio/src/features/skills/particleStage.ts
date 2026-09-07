// Canvas particle stage: a fixed pool of dots that spring toward points sampled
// from the current logo source, forming a point-cloud of the shape. Framework
// agnostic on purpose: React only handles lifecycle and controls.

export interface StageSource {
  /** Decoded logo image or offscreen canvas. Alpha channel defines the shape. */
  source: CanvasImageSource;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  style: string;
}

export interface ParticleStageOptions {
  canvas: HTMLCanvasElement;
  sources: StageSource[];
  reducedMotion?: boolean;
  /** Fraction of the stage kept clear around the shape. */
  padding?: number;
}

const DOT_RGB = '245, 245, 245';
const SPRING = 0.05;
const DAMPING = 0.84;
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 1.6;
const MIN_DOTS = 700;
const MAX_DOTS = 3200;
/** One dot per ~this many square pixels of stage area. */
const AREA_PER_DOT = 95;
const MAX_DEVICE_PIXEL_RATIO = 2;
/** Alpha threshold for a sampled pixel to count as part of the shape. */
const SHAPE_ALPHA_THRESHOLD = 100;

export class ParticleStage {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly sources: StageSource[];
  private readonly reducedMotion: boolean;
  private readonly padding: number;
  private readonly sampleCtx: CanvasRenderingContext2D;

  private particles: Particle[] = [];
  private index = 0;
  private raf: number | null = null;
  private mouse: { x: number; y: number } | null = null;
  private width = 0;
  private height = 0;

  private readonly resizeObserver: ResizeObserver;
  private readonly intersectionObserver: IntersectionObserver | null = null;

  private readonly onPointerMove = (e: PointerEvent) => {
    this.mouse = { x: e.offsetX, y: e.offsetY };
  };

  private readonly onPointerLeave = () => {
    this.mouse = null;
  };

  private readonly tick = () => {
    // Schedule first so an obscured tab does not kill the loop.
    this.raf = requestAnimationFrame(this.tick);
    if (document.hidden) return;
    this.step();
    this.draw();
  };

  constructor(options: ParticleStageOptions) {
    this.canvas = options.canvas;
    const ctx = options.canvas.getContext('2d');
    if (!ctx) throw new Error('ParticleStage: canvas 2d context unavailable');
    this.ctx = ctx;
    this.sources = options.sources;
    this.reducedMotion = options.reducedMotion ?? false;
    this.padding = options.padding ?? 0.12;

    const sampler = document.createElement('canvas');
    const sampleCtx = sampler.getContext('2d', { willReadFrequently: true });
    if (!sampleCtx) throw new Error('ParticleStage: offscreen 2d context unavailable');
    this.sampleCtx = sampleCtx;

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas);

    if (this.reducedMotion) {
      this.handleResize();
      return;
    }

    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerleave', this.onPointerLeave);
    this.intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) this.start();
      else this.stop();
    });
    this.intersectionObserver.observe(this.canvas);
    this.handleResize();
  }

  /** Morphs the cloud toward the logo at `index` (wraps around). */
  setIndex(index: number): void {
    const count = this.sources.length;
    if (count === 0) return;
    this.index = ((index % count) + count) % count;
    this.resample();
    if (this.reducedMotion) {
      this.snap();
      this.draw();
    }
  }

  destroy(): void {
    this.stop();
    this.resizeObserver.disconnect();
    this.intersectionObserver?.disconnect();
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerleave', this.onPointerLeave);
  }

  private handleResize(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    const prevWidth = this.width;
    const prevHeight = this.height;
    this.width = width;
    this.height = height;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (prevWidth === 0 || prevHeight === 0 || this.particles.length === 0) {
      this.particles = this.createParticles(width, height);
    } else {
      const sx = width / prevWidth;
      const sy = height / prevHeight;
      for (const p of this.particles) {
        p.x *= sx;
        p.y *= sy;
      }
    }
    this.resample();
    if (this.reducedMotion) {
      this.snap();
    }
    this.draw();
  }

  private createParticles(width: number, height: number): Particle[] {
    const count = Math.max(MIN_DOTS, Math.min(MAX_DOTS, Math.round((width * height) / AREA_PER_DOT)));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        tx: width / 2,
        ty: height / 2,
        size: 1.3 + Math.random() * 1.1,
        style: `rgba(${DOT_RGB},${(0.45 + Math.random() * 0.5).toFixed(2)})`,
      });
    }
    return particles;
  }

  /** Maps the current logo's opaque pixels onto particle targets, spread evenly. */
  private resample(): void {
    const { width, height } = this;
    const source = this.sources[this.index] ?? this.sources[0];
    if (!source || width === 0 || height === 0) return;

    const inset = Math.round(Math.min(width, height) * this.padding);
    const size = Math.max(1, Math.min(width, height) - inset * 2);
    const sample = this.sampleCtx.canvas;
    if (sample.width !== size || sample.height !== size) {
      sample.width = size;
      sample.height = size;
    }
    this.sampleCtx.clearRect(0, 0, size, size);
    this.sampleCtx.drawImage(source.source, 0, 0, size, size);

    const data = this.sampleCtx.getImageData(0, 0, size, size).data;
    const points: number[] = [];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if (data[(y * size + x) * 4 + 3] > SHAPE_ALPHA_THRESHOLD) {
          points.push(x, y);
        }
      }
    }

    const offsetX = (width - size) / 2;
    const offsetY = (height - size) / 2;
    const found = points.length / 2;
    const count = this.particles.length;

    if (found === 0) {
      // Source rendered empty: scatter targets so the cloud stays visible.
      for (const p of this.particles) {
        p.tx = offsetX + Math.random() * size;
        p.ty = offsetY + Math.random() * size;
      }
      return;
    }

    for (let i = 0; i < count; i += 1) {
      const p = this.particles[i];
      const j = Math.floor((i * found) / count);
      p.tx = offsetX + points[j * 2];
      p.ty = offsetY + points[j * 2 + 1];
      if (found < count) {
        // More dots than shape pixels: jitter duplicates so clumps read as a cloud.
        p.tx += (Math.random() - 0.5) * 2.4;
        p.ty += (Math.random() - 0.5) * 2.4;
      }
    }
  }

  private step(): void {
    const { mouse } = this;
    const radiusSq = REPEL_RADIUS * REPEL_RADIUS;
    for (const p of this.particles) {
      p.vx += (p.tx - p.x) * SPRING;
      p.vy += (p.ty - p.y) * SPRING;
      if (mouse) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;
    }
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.fillStyle = p.style;
      this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
  }

  private snap(): void {
    for (const p of this.particles) {
      p.x = p.tx;
      p.y = p.ty;
      p.vx = 0;
      p.vy = 0;
    }
  }

  private start(): void {
    if (this.reducedMotion || this.raf !== null) return;
    this.raf = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    if (this.raf !== null) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }
}
