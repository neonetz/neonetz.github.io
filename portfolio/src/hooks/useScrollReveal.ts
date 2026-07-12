import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  ease?: string;
};

/**
 * Fade + slide-up reveal on scroll into viewport.
 * Pass a ref to a single element or an array of refs.
 */
export function useScrollReveal(
  target: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  options: RevealOptions = {},
) {
  const {
    y = 40,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    ease = 'power3.out',
  } = options;

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const targets = Array.isArray(target) ? target.map((t) => t.current) : target.current;
      if (!targets || (Array.isArray(targets) && targets.every((t) => !t))) return;

      const triggerEl = Array.isArray(targets) ? targets[0] : targets;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: triggerEl,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [target, y, duration, delay, stagger, start, ease]);
}

/**
 * Staggered reveal for multiple child elements within a container.
 * Pass a ref to the container and a selector string for children.
 */
export function useScrollRevealChildren(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  options: RevealOptions = {},
) {
  const {
    y = 40,
    duration = 0.6,
    delay = 0,
    stagger = 0.08,
    start = 'top 85%',
    ease = 'power3.out',
  } = options;

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current.querySelectorAll(selector), {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, delay, stagger, start, ease]);
}
