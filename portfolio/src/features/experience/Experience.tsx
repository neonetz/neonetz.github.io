import { useRef } from 'react';
import { experiences } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';

export function Experience() {
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useScrollReveal([headingRef], { y: 30, duration: 0.8 });
  useScrollRevealChildren(timelineRef, '.hw-timeline-item', {
    y: 50,
    duration: 0.6,
    stagger: 0.12,
  });

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="hw-section">
      <div ref={headingRef} className="flex flex-col" style={{ gap: 'calc(20 * var(--u))' }}>
        <span className="hw-eyebrow">Career</span>
        <h2 className="hw-h2">Experience</h2>
      </div>

      <div
        ref={timelineRef}
        className="flex flex-col"
        style={{ marginTop: 'calc(60 * var(--u))', gap: 'calc(0 * var(--u))' }}
      >
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="hw-timeline-item"
            style={{
              display: 'grid',
              gridTemplateColumns: 'calc(220 * var(--u)) 1fr',
              gap: 'calc(40 * var(--u))',
              paddingBlock: 'calc(40 * var(--u))',
              borderBottom: '1px solid rgba(245,245,245,0.1)',
            }}
          >
            {/* Left: period */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'calc(14 * var(--u))',
                letterSpacing: '0.08em',
                opacity: 0.6,
                paddingTop: 'calc(6 * var(--u))',
                textTransform: 'uppercase',
              }}
            >
              {exp.period}
            </div>

            {/* Right: content with border-left + dot */}
            <div
              style={{
                position: 'relative',
                paddingLeft: 'calc(28 * var(--u))',
                borderLeft: '1px solid rgba(245,245,245,0.25)',
              }}
            >
              {/* Dot marker */}
              <span
                style={{
                  position: 'absolute',
                  left: 'calc(-5 * var(--u))',
                  top: 'calc(8 * var(--u))',
                  width: 'calc(9 * var(--u))',
                  height: 'calc(9 * var(--u))',
                  borderRadius: '50%',
                  background: '#f5f5f5',
                  display: 'block',
                }}
              />

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'calc(32 * var(--u))',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  marginBottom: 'calc(8 * var(--u))',
                }}
              >
                {exp.title}
              </h3>

              {/* Company */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'calc(15 * var(--u))',
                  letterSpacing: '0.1em',
                  opacity: 0.7,
                  marginBottom: 'calc(16 * var(--u))',
                  textTransform: 'uppercase',
                }}
              >
                {exp.company}
              </p>

              {/* Description */}
              <p className="hw-body" style={{ maxWidth: 'calc(600 * var(--u))' }}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
