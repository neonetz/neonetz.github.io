interface EmptyStateProps {
  label: string;
  className?: string;
}

/** Bordered placeholder box shown when a section has no data yet. */
export function EmptyState({ label, className = '' }: EmptyStateProps) {
  return (
    <div className={`hw-empty-state${className ? ` ${className}` : ''}`.trim()}>
      <p className="hw-eyebrow">{label}</p>
    </div>
  );
}
