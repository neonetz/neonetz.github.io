import { useEffect, useState } from 'react';
import { profile } from '../../data/portfolio';

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'clamp(0.8rem, calc(22*var(--u)), 1.35rem)',
  letterSpacing: '0.03em',
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile panel on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile panel open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function closeMobile() { setMobileOpen(false); }

  const navLinks = (
    <>
      <a href="#projects" onClick={closeMobile} className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
        Projects
      </a>
      <a href="#about" onClick={closeMobile} className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
        About
      </a>
      <a href="#skills" onClick={closeMobile} className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
        Skills
      </a>
      <a href="#contact" onClick={closeMobile} className="hw-link hw-nav-link font-extrabold" style={navLinkStyle}>
        Contact
      </a>
    </>
  );

  const socialLinks = (
    <>
      {profile.socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name} (opens in new tab)`}
          className="hw-nav-link opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
          style={navLinkStyle}
        >
          {link.name}
        </a>
      ))}
    </>
  );

  const logo = (
    <a href="#top" onClick={closeMobile} className="hw-link flex flex-col items-center leading-none">
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
  );

  return (
    <nav
      aria-label="Primary"
      className={`hw-nav${scrolled ? ' hw-nav-scrolled' : ''}${mobileOpen ? ' hw-nav-mobile-open' : ''}`}
    >
      {/* Desktop: 3-col grid */}
      <div className="hw-nav-desktop">
        <div className="flex gap-[calc(40*var(--u))] flex-wrap">
          {navLinks}
        </div>
        {logo}
        <div className="flex justify-end items-start gap-[calc(24*var(--u))]">
          {socialLinks}
        </div>
      </div>

      {/* Mobile: hamburger + logo */}
      <div className="hw-nav-mobile">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="hw-hamburger"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
        {logo}
        <div style={{ width: 'calc(40 * var(--u))' }} aria-hidden />
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="hw-nav-mobile-panel">
          <div className="flex flex-col" style={{ gap: 'calc(24 * var(--u))' }}>
            {navLinks}
          </div>
          <div className="flex" style={{ gap: 'calc(24 * var(--u))', marginTop: 'calc(20 * var(--u))' }}>
            {socialLinks}
          </div>
        </div>
      )}
    </nav>
  );
}
