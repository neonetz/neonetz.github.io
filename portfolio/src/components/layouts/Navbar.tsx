import { useEffect, useState } from 'react';
import { profile } from '../../data/portfolio';

const SECTION_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 100);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver: a section is active while it crosses a
  // thin band around the upper third of the viewport. IO is driven by the
  // compositor, so it works no matter which scroller moves the page.
  useEffect(() => {
    const sections = SECTION_LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSection((prev) => {
          let next = prev;
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (entry.isIntersecting) next = id;
            else if (next === id) next = null;
          }
          return next;
        });
      },
      // Detection band: from 30% to 40% of the viewport height.
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  const navLinks = SECTION_LINKS.map((link) => {
    const isActive = activeSection === link.href.slice(1);
    return (
      <a
        key={link.href}
        href={link.href}
        onClick={closeMobile}
        aria-current={isActive || undefined}
        className={`hw-link hw-nav-link${isActive ? ' hw-nav-link-active' : ''}`}
      >
        {link.label}
      </a>
    );
  });

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
        >
          {link.name}
        </a>
      ))}
    </>
  );

  const logo = (
    <a href="#top" onClick={closeMobile} className="hw-link hw-nav-logo">
      <span className="hw-nav-logo-title">NEONETZ</span>
      <span className="hw-nav-logo-sub">PORTFOLIO</span>
    </a>
  );

  return (
    <nav
      aria-label="Primary"
      className={`hw-nav${scrolled ? ' hw-nav-scrolled' : ''}${mobileOpen ? ' hw-nav-mobile-open' : ''}`}
    >
      {/* Desktop: 3-col grid */}
      <div className="hw-nav-desktop">
        <div className="hw-nav-links">{navLinks}</div>
        {logo}
        <div className="hw-nav-social">{socialLinks}</div>
      </div>

      {/* Mobile: hamburger + logo */}
      <div className="hw-nav-mobile">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="hw-icon-btn hw-hamburger"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
        {logo}
        <div className="hw-nav-spacer" aria-hidden />
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="hw-nav-mobile-panel">
          <div className="hw-nav-panel-links">{navLinks}</div>
          <div className="hw-nav-panel-social">{socialLinks}</div>
        </div>
      )}
    </nav>
  );
}
