import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { profile } from '../../data/portfolio';

export function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Set initial states
      gsap.set(
        [eyebrowRef.current, line1Ref.current, line2Ref.current, line3Ref.current, bodyRef.current, ctaRef.current],
        { opacity: 0, y: 40 },
      );

      // Entrance sequence
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to(line3Ref.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      // Fade out eyebrow on scroll
      gsap.to(eyebrowRef.current, {
        opacity: 0,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: '200px top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="hw-hero" id="top">
      <div className="hw-hero-content">
        {/* Eyebrow */}
        <span ref={eyebrowRef} className="hw-eyebrow">
          {profile.role} • {profile.location}
        </span>

        {/* H1 — 3 stacked spans, fluid serif */}
        <h1 className="hw-h1">
          <span ref={line1Ref} className="block">The Developer</span>
          <span ref={line2Ref} className="block">Who Builds</span>
          <span ref={line3Ref} className="block italic">With Purpose</span>
        </h1>

        {/* Body text */}
        <p ref={bodyRef} className="hw-body" style={{ maxWidth: 'calc(640 * var(--u))' }}>
          {profile.bio}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center"
          style={{ gap: 'calc(20 * var(--u))', marginTop: 'calc(40 * var(--u))' }}
        >
          <a href="#projects" className="hw-btn hw-btn-primary">
            View Projects
          </a>
          <a href="#contact" className="hw-btn hw-btn-outline">
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}
