import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

type ParallaxOptions = {
  speed?: number;
  direction?: 'y' | 'x';
  start?: string;
  end?: string;
};

/**
 * Applies a parallax effect to an element.
 * speed < 1: element moves slower than scroll (depth illusion)
 */
export function useParallax<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: ParallaxOptions = {},
) {
  const {
    speed = 0.3,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      if (!targetRef.current) return;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
