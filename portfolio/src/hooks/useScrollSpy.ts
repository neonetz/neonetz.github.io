import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      // Throttle slightly for performance
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }

      timeoutId = window.requestAnimationFrame(() => {
        let currentSection = sectionIds[0];
        
        // The trigger line is 33% down the viewport
        const triggerPoint = window.innerHeight / 3;

        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is above our trigger line, 
            // it becomes the current candidate.
            // Since sections are ordered top-to-bottom, the last one 
            // that passes this test is the one currently occupying the screen.
            if (rect.top <= triggerPoint) {
              currentSection = id;
            }
          }
        }

        setActiveSection((prev) => {
          if (prev !== currentSection) {
            // Only update history if it actually changed to avoid spamming the browser
            window.history.replaceState(null, '', `#${currentSection}`);
            return currentSection;
          }
          return prev;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial check after a slight delay to allow layout to settle
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
