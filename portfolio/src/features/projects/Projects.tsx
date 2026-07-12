import { projects, type Project } from '../../data/portfolio';

function statusLabel(status: Project['status']): string {
  switch (status) {
    case 'completed':     return 'Completed';
    case 'in-progress':   return 'In Progress';
    case 'archived':      return 'Archived';
    default:              return status;
  }
}

export function Projects() {
  return (
    <section id="projects" className="hw-section">
      {/* Eyebrow + heading */}
      <div className="flex flex-col" style={{ gap: 'calc(20 * var(--u))' }}>
        <span className="hw-eyebrow">Selected Work</span>
        <h2 className="hw-h2">Projects</h2>
      </div>

      {/* Card grid */}
      <div className="hw-card-grid" style={{ marginTop: 'calc(60 * var(--u))' }}>
        {projects.map((project) => (
          <article key={project.id} className="hw-card">
            {/* Title */}
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

            {/* Description */}
            <p
              className="opacity-70"
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

            {/* Tech stack */}
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
                    opacity: 0.7,
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer row: status + link */}
            <div
              className="flex justify-between items-center"
              style={{ marginTop: 'calc(20 * var(--u))' }}
            >
              <span className={`hw-badge hw-badge-${project.status}`}>
                {statusLabel(project.status)}
              </span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hw-link"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'calc(14 * var(--u))',
                    letterSpacing: '0.08em',
                  }}
                >
                  GitHub →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
