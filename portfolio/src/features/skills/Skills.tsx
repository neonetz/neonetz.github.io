import { useRef } from 'react';
import { profile, type TechStack } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';

function categoryLabel(cat: TechStack['category']): string {
  switch (cat) {
    case 'frontend': return 'Frontend';
    case 'backend':  return 'Backend';
    case 'database': return 'Database';
    case 'devops':   return 'DevOps';
    case 'other':    return 'Other';
    default:         return cat;
  }
}

export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Group skills by category
  const categories = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, TechStack[]>,
  );

  useScrollReveal([headingRef as React.RefObject<HTMLElement>], { y: 30, duration: 0.8 });
  useScrollRevealChildren(gridRef as React.RefObject<HTMLElement>, '.hw-skills-group', {
    y: 50,
    duration: 0.6,
    stagger: 0.12,
  });

  return (
    <section id="skills" className="hw-section">
      <div ref={headingRef} className="flex flex-col" style={{ gap: 'calc(20 * var(--u))' }}>
        <span className="hw-eyebrow">Capabilities</span>
        <h2 className="hw-h2">Skills</h2>
      </div>

      <div
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(calc(320 * var(--u)), 1fr))',
          gap: 'calc(60 * var(--u))',
          marginTop: 'calc(60 * var(--u))',
        }}
      >
        {Object.entries(categories).map(([cat, skills]) => (
          <div key={cat} className="hw-skills-group">
            <h3 className="hw-eyebrow" style={{ marginBottom: 'calc(10 * var(--u))' }}>
              {categoryLabel(cat as TechStack['category'])}
            </h3>
            {skills.map((skill) => (
              <div key={skill.name} className="hw-skill-item">
                <span>{skill.name}</span>
                <span className="opacity-60">{skill.level}%</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
