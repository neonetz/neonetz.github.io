import type { Ref } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  index?: number;
  ref?: Ref<HTMLDivElement>;
}

/** Shared section header: numbered eyebrow label over the big serif title. */
export function SectionHeading({ eyebrow, title, index, ref }: SectionHeadingProps) {
  return (
    <div ref={ref} className="hw-section-heading">
      <span className="hw-eyebrow">{index !== undefined ? `#${String(index).padStart(2, '0')} ${eyebrow}` : eyebrow}</span>
      <h2 className="hw-h2">{title}</h2>
    </div>
  );
}
