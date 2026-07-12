import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/portfolio';

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'clamp(0.8rem, calc(22*var(--u)), 1.35rem)',
  letterSpacing: '0.03em',
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`hw-nav${scrolled ? ' hw-nav-scrolled' : ''}`}
    >
      {/* Left: nav links */}
      <div className="flex gap-[calc(40*var(--u))]">
        <a href="#projects" className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
          Projects
        </a>
        <a href="#about" className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
          About
        </a>
        <a href="#skills" className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
          Skills
        </a>
      </div>

      {/* Center: logo */}
      <div className="flex flex-col items-center leading-none">
        <a href="#top" className="hw-link flex flex-col items-center">
          <span
            className="font-extrabold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, calc(40*var(--u)), 2.5rem)',
              letterSpacing: '0.03em',
            }}
          >
            NEONETZ
          </span>
          <span
            className="opacity-70"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'calc(12 * var(--u))',
              letterSpacing: '0.14em',
              marginTop: 'calc(4 * var(--u))',
            }}
          >
            PORTFOLIO
          </span>
        </a>
      </div>

      {/* Right: social */}
      <div className="flex justify-end gap-[calc(24*var(--u))] items-start">
        {profile.socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-nav-link opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
            style={navLinkStyle}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
