import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }

      timeoutId = window.requestAnimationFrame(() => {
        let bestSection = sectionIds[0];
        let maxVisibleHeight = 0;

        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            
            // Calculate how many vertical pixels of this section are actually inside the viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(window.innerHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Whichever section takes up the MOST space on screen is the active one
            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              bestSection = id;
            }
          }
        }

        setActiveSection((prev) => {
          if (prev !== bestSection) {
            window.history.replaceState(null, '', `#${bestSection}`);
            return bestSection;
          }
          return prev;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Check initial state
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutId) window.cancelAnimationFrame(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeSection;
}
