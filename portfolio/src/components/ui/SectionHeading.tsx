import type { Ref } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  ref?: Ref<HTMLDivElement>;
}

/** Shared section header: eyebrow label over the big serif title. */
export function SectionHeading({ eyebrow, title, ref }: SectionHeadingProps) {
  return (
    <div ref={ref} className="hw-section-heading">
      <span className="hw-eyebrow">{eyebrow}</span>
      <h2 className="hw-h2">{title}</h2>
    </div>
  );
}
