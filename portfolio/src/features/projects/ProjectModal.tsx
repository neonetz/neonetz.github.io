import { useEffect } from 'react';
import type { Project } from '../../data/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function statusLabel(status: Project['status']): string {
  switch (status) {
    case 'completed':   return 'Completed';
    case 'in-progress': return 'In Progress';
    case 'archived':    return 'Archived';
    default:            return status;
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  if (!project) return null;

  return (
    /* Overlay */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,242,0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(40 * var(--u))',
      }}
    >
      {/* Card — stop propagation so clicking inside doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'calc(800 * var(--u))',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: '#0000f2',
          border: '1px solid rgba(245,245,245,0.2)',
          padding: 'calc(60 * var(--u))',
          display: 'flex',
          flexDirection: 'column',
          gap: 'calc(30 * var(--u))',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 'calc(20 * var(--u))',
            right: 'calc(20 * var(--u))',
            background: 'transparent',
            border: '1px solid rgba(245,245,245,0.3)',
            color: '#f5f5f5',
            fontFamily: 'var(--font-mono)',
            fontSize: 'calc(16 * var(--u))',
            width: 'calc(40 * var(--u))',
            height: 'calc(40 * var(--u))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="hw-h2">{project.title}</h2>

        {/* Status badge */}
        <div>
          <span className={`hw-badge hw-badge-${project.status}`}>
            {statusLabel(project.status)}
          </span>
        </div>

        {/* Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              display: 'block',
              border: '1px solid rgba(245,245,245,0.1)',
            }}
          />
        )}

        {/* Long description */}
        <p className="hw-body">{project.longDescription}</p>

        {/* Tech stack chips */}
        {project.techStack.length > 0 && (
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
                  textTransform: 'uppercase',
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex" style={{ gap: 'calc(16 * var(--u))', flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hw-btn hw-btn-outline"
              >
                GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hw-btn hw-btn-primary"
              >
                Live Site →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
