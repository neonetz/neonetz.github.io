import { useRef } from 'react';
import { experiences } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';
import { SectionHeading } from '../../components/ui/SectionHeading';

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
      <SectionHeading ref={headingRef} eyebrow="Career" title="Experience" />

      <div ref={timelineRef} className="hw-timeline">
        {experiences.map((exp) => (
          <div key={exp.title} className="hw-timeline-item">
            {/* Left: period */}
            <div className="hw-timeline-period">{exp.period}</div>

            {/* Right: content with border-left + dot marker */}
            <div className="hw-timeline-content">
              <h3 className="hw-timeline-title">{exp.title}</h3>
              <p className="hw-timeline-company">{exp.company}</p>
              <p className="hw-timeline-desc">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
