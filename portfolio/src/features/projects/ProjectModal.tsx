import { useEffect, useRef } from 'react';
import { projectStatusLabels, type Project } from '../../data/portfolio';
import { TechChip } from '../../components/ui/TechChip';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  // Keep the closer in a ref so the open/close effect below depends only on
  // `project` and cannot be re-triggered by a new inline callback each render.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    // Focus the first control (the close button) so Shift+Tab wraps correctly;
    // focusing the container would let Shift+Tab escape into the page behind.
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      // Keep Tab cycling inside the dialog while it is open
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      openerRef.current?.focus();
    };
  }, [project]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [project]);

  if (!project) return null;

  return (
    /* Overlay: click outside the card closes the dialog */
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      className="hw-modal-overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="hw-modal">
        <button type="button" onClick={onClose} aria-label="Close modal" className="hw-icon-btn hw-modal-close">
          ✕
        </button>

        <h2 className="hw-h2">{project.title}</h2>

        <div>
          <span className={`hw-badge hw-badge-${project.status}`}>
            {projectStatusLabels[project.status]}
          </span>
        </div>

        {project.image && (
          <img src={project.image} alt={project.title} className="hw-modal-img" />
        )}

        <p className="hw-body">{project.longDescription}</p>

        {project.tech.length > 0 && (
          <div className="hw-chip-row">
            {project.tech.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>
        )}

        {(project.githubUrl || project.liveUrl) && (
          <div className="hw-modal-actions">
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
