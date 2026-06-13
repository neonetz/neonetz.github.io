import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    // We use IntersectionObserver with a strict center band.
    // This is hardware-accelerated and fires reliably even during Safari momentum scrolling.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      {
        // Creates a horizontal band exactly in the middle 10% of the screen.
        // top: -45%, bottom: -45% leaves the middle 10% as the detection zone.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeSection;
}
