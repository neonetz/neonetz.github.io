import type { ReactNode } from 'react';

/** Small mono chip used for technology names on cards and modals. */
export function TechChip({ children }: { children: ReactNode }) {
  return <span className="hw-chip">{children}</span>;
}
