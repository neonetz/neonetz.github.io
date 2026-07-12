interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`hw-eyebrow ${className}`.trim()}>
      {children}
    </span>
  );
}
