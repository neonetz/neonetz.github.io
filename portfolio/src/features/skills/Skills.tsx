import { useRef, useState } from 'react';
import { profile, type SkillCategory, type TechStack } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';
import { EmptyState } from '../../components/ui/EmptyState';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { SkillParticlePanel } from './SkillParticlePanel';

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  other: 'Other',
};

interface GroupedSkill {
  skill: TechStack;
  /** Position of the skill in profile.skills, shared with the particle stage. */
  index: number;
}

function groupByCategory(skills: TechStack[]): [SkillCategory, GroupedSkill[]][] {
  const groups = new Map<SkillCategory, GroupedSkill[]>();
  skills.forEach((skill, index) => {
    const group = groups.get(skill.category);
    const entry = { skill, index };
    if (group) group.push(entry);
    else groups.set(skill.category, [entry]);
  });
  return [...groups.entries()];
}

export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [rowHover, setRowHover] = useState(false);

  const categories = groupByCategory(profile.skills);

  useScrollReveal(headingRef, { y: 30, duration: 0.8 });
  useScrollRevealChildren(gridRef, '.hw-skills-group', { y: 50, duration: 0.6, stagger: 0.12 });

  return (
    <section id="skills" className="hw-section">
      <SectionHeading ref={headingRef} eyebrow="Capabilities" title="Skills" />

      {profile.skills.length === 0 ? (
        <EmptyState label="Skills coming soon" />
      ) : (
        <div className="hw-skills-layout hw-section-body">
          <SkillParticlePanel
            skills={profile.skills}
            index={stageIndex}
            onIndexChange={setStageIndex}
            pauseAuto={rowHover}
          />
          <div ref={gridRef} className="hw-skills-grid">
            {categories.map(([category, skills]) => (
              <div key={category} className="hw-skills-group">
                <h3 className="hw-eyebrow hw-skills-group-title">{CATEGORY_LABELS[category]}</h3>
                {skills.map(({ skill, index }) => (
                  /* Hover/click previews the skill's logo in the stage; keyboard and
                     touch users have the stage's prev/next controls (plus arrow keys)
                     as the canonical control. */
                  <div
                    key={skill.name}
                    className="hw-line-row hw-skill-row"
                    onMouseEnter={() => {
                      setStageIndex(index);
                      setRowHover(true);
                    }}
                    onMouseLeave={() => setRowHover(false)}
                    onClick={() => setStageIndex(index)}
                  >
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
