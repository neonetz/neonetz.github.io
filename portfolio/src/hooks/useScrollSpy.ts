import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    // This creates an invisible horizontal line slightly above the vertical center.
    // Whichever section intersects this line becomes the active section.
    // -40% top margin, -50% bottom margin = a 10% high window just above the center.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Debounce or directly update URL hash without jumping
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join(',')]);

  return activeSection;
}
