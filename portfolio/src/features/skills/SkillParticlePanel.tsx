import { useEffect, useRef, useState } from 'react';
import { ParticleStage, type StageSource } from './particleStage';
import { prefersReducedMotion } from '../../lib/motion';

interface SkillParticlePanelProps {
  skills: { name: string; logo?: string }[];
  /** Currently showcased skill (controlled by the Skills section). */
  index: number;
  onIndexChange: (index: number) => void;
  /** True while the user is interacting elsewhere in the section (e.g. hovering a row). */
  pauseAuto?: boolean;
}

const AUTO_ADVANCE_MS = 4000;
const LETTER_CANVAS_SIZE = 600;

function loadLogo(src: string): Promise<StageSource> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ source: image });
    image.onerror = () => reject(new Error(`Logo failed to load: ${src}`));
    image.src = src;
  });
}

function initialLetter(name: string): string {
  const match = name.match(/[a-z0-9]/i);
  return match ? match[0].toUpperCase() : 'N';
}

/** Offscreen rendering of a skill initial, used when no brand logo exists. */
function letterSource(letter: string): StageSource {
  const canvas = document.createElement('canvas');
  canvas.width = LETTER_CANVAS_SIZE;
  canvas.height = LETTER_CANVAS_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 800 ${Math.round(LETTER_CANVAS_SIZE * 0.62)}px Fraunces, "Times New Roman", serif`;
    ctx.fillText(letter, LETTER_CANVAS_SIZE / 2, LETTER_CANVAS_SIZE * 0.55);
  }
  return { source: canvas };
}

async function buildSources(skills: SkillParticlePanelProps['skills']): Promise<StageSource[]> {
  // Wait for webfonts so letter fallbacks render with the site's display face.
  try {
    await document.fonts.ready;
  } catch {
    /* Font Loading API unavailable: draw with whatever is loaded. */
  }
  return Promise.all(
    skills.map(async (skill) => {
      if (skill.logo) {
        try {
          return await loadLogo(skill.logo);
        } catch {
          /* Missing or failed logo: fall through to the letter fallback. */
        }
      }
      return letterSource(initialLetter(skill.name));
    }),
  );
}

export function SkillParticlePanel({ skills, index, onIndexChange, pauseAuto = false }: SkillParticlePanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<ParticleStage | null>(null);
  const pausedRef = useRef(false);
  const [sources, setSources] = useState<StageSource[] | null>(null);

  const count = skills.length;

  useEffect(() => {
    let cancelled = false;
    buildSources(skills).then((built) => {
      if (!cancelled) setSources(built);
    });
    return () => {
      cancelled = true;
    };
  }, [skills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sources) return;
    const stage = new ParticleStage({
      canvas,
      sources,
      reducedMotion: prefersReducedMotion(),
    });
    stage.setIndex(index);
    stageRef.current = stage;
    return () => {
      stage.destroy();
      stageRef.current = null;
    };
    // Recreate only when loaded sources change; index updates are pushed below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources]);

  useEffect(() => {
    stageRef.current?.setIndex(index);
  }, [index]);

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current && !pauseAuto && !document.hidden) {
        onIndexChange((index + 1) % count);
      }
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [count, index, onIndexChange, pauseAuto]);

  if (count === 0) return null;

  const show = (offset: number) => {
    onIndexChange((index + offset + count) % count);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      show(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      show(1);
    }
  };

  return (
    <div
      className="hw-skill-stage"
      onKeyDown={handleKeyDown}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="hw-stage-tag">Showcase</span>
      {count > 1 && (
        <div className="hw-stage-controls">
          <button type="button" className="hw-icon-btn hw-stage-btn" aria-label="Previous skill" onClick={() => show(-1)}>
            ‹
          </button>
          <button type="button" className="hw-icon-btn hw-stage-btn" aria-label="Next skill" onClick={() => show(1)}>
            ›
          </button>
        </div>
      )}
      <span className="hw-stage-label">{skills[index]?.name}</span>
      <span className="hw-stage-count">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}
