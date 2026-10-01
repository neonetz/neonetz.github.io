import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/**
 * Initializes Lenis smooth scroll and syncs it with the GSAP ticker.
 * Returns a ref to the Lenis instance so other components can call scrollTo().
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}

/** Pause smooth scrolling (e.g. while a modal dialog is open). */
export function stopLenis() {
  window.__lenis?.stop();
}

/** Resume smooth scrolling. */
export function startLenis() {
  window.__lenis?.start();
}
