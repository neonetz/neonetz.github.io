import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ParallaxOptions = {
  speed?: number;   // 0.3 = moves 30% of scroll distance (slower = more depth)
  direction?: 'y' | 'x';
  start?: string;
  end?: string;
};

/**
 * Applies a parallax effect to an element.
 * speed < 1: element moves slower than scroll (depth illusion)
 * speed > 1: element moves faster than scroll
 */
export function useParallax(
  targetRef: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {},
) {
  const {
    speed = 0.3,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useLayoutEffect(() => {
    // Disable parallax on mobile for performance
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      if (!targetRef.current) return;

      // Calculate travel distance based on element height + viewport
      const el = targetRef.current;
      const distance = (el.offsetHeight + window.innerHeight) * speed;

      gsap.fromTo(
        el,
        { [direction]: -distance / 2 },
        {
          [direction]: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [targetRef, speed, direction, start, end]);
}
