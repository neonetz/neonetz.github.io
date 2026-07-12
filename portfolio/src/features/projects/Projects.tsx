import { useRef, useState } from 'react';
import { projects, type Project } from '../../data/portfolio';
import { useScrollReveal, useScrollRevealChildren } from '../../hooks/useScrollReveal';
import { ProjectModal } from './ProjectModal';

function statusLabel(status: Project['status']): string {
  switch (status) {
    case 'completed':   return 'Completed';
    case 'in-progress': return 'In Progress';
    case 'archived':    return 'Archived';
    default:            return status;
  }
}

export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useScrollReveal(headingRef, { y: 30, duration: 0.8 });
  useScrollRevealChildren(gridRef, '.hw-card', { y: 50, duration: 0.6, stagger: 0.1 });

  return (
    <section id="projects" className="hw-section">
      <div ref={headingRef} className="flex flex-col" style={{ gap: 'calc(20 * var(--u))' }}>
        <span className="hw-eyebrow">Selected Work</span>
        <h2 className="hw-h2">Projects</h2>
      </div>

      {projects.length === 0 ? (
        <div
          style={{
            marginTop: 'calc(60 * var(--u))',
            padding: 'calc(60 * var(--u))',
            border: '1px solid rgba(245,245,245,0.1)',
            textAlign: 'center',
          }}
        >
          <p className="hw-eyebrow" style={{ opacity: 0.5 }}>Projects coming soon</p>
        </div>
      ) : (
        <div ref={gridRef} className="hw-card-grid" style={{ marginTop: 'calc(60 * var(--u))' }}>
          {projects.map((project) => (
            <article
              key={project.id}
              className="hw-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`View ${project.title} details`}
              onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'calc(32 * var(--u))',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                }}
              >
                {project.title}
              </h3>

              <p
                className="opacity-75"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'calc(15 * var(--u))',
                  lineHeight: 1.5,
                  letterSpacing: '0.02em',
                  textTransform: 'none',
                }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap" style={{ gap: 'calc(8 * var(--u))' }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'calc(12 * var(--u))',
                      letterSpacing: '0.1em',
                      padding: 'calc(4 * var(--u)) calc(10 * var(--u))',
                      border: '1px solid rgba(245,245,245,0.2)',
                      opacity: 0.75,
                    }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="flex-1" />

              <div
                className="flex justify-between items-center"
                style={{ marginTop: 'calc(20 * var(--u))' }}
              >
                <span className={`hw-badge hw-badge-${project.status}`}>
                  {statusLabel(project.status)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'calc(14 * var(--u))',
                    letterSpacing: '0.08em',
                    opacity: 0.6,
                  }}
                >
                  View details →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
