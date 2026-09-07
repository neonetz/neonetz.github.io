import { useRef, useState } from 'react';
import { projects, projectStatusLabels, type Project } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';
import { EmptyState } from '../../components/ui/EmptyState';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { TechChip } from '../../components/ui/TechChip';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useScrollReveal(headingRef, { y: 30, duration: 0.8 });
  useScrollRevealChildren(gridRef, '.hw-card', { y: 50, duration: 0.6, stagger: 0.1 });

  return (
    <section id="projects" className="hw-section">
      <SectionHeading ref={headingRef} eyebrow="Selected Work" title="Projects" />

      {projects.length === 0 ? (
        <EmptyState label="Projects coming soon" />
      ) : (
        <div ref={gridRef} className="hw-card-grid hw-section-body">
          {projects.map((project) => (
            <article
              key={project.id}
              className="hw-card hw-card-interactive"
              onClick={() => setActiveProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title} details`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveProject(project);
                }
              }}
            >
              <h3 className="hw-project-title">{project.title}</h3>

              <p className="hw-project-desc opacity-75">{project.description}</p>

              <div className="hw-chip-row">
                {project.tech.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </div>

              <div className="flex-1" />

              <div className="hw-project-meta">
                <span className={`hw-badge hw-badge-${project.status}`}>
                  {projectStatusLabels[project.status]}
                </span>
                <span className="hw-project-more">View details →</span>
              </div>
            </article>
          ))}
        </div>
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
