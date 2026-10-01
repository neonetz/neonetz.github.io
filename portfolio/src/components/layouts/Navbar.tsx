import { useEffect, useState } from 'react';
import { profile } from '../../data/portfolio';
import { stopLenis, startLenis } from '../../hooks/useLenis';

const SECTION_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 100);
  const [isPaper, setIsPaper] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect when the navbar is over the paper section (.hw-paper)
  useEffect(() => {
    const paperEl = document.querySelector('.hw-paper');
    if (!paperEl) return;

    const checkPaper = () => {
      const rect = paperEl.getBoundingClientRect();
      const navThreshold = 70; // approximate navbar height
      setIsPaper(rect.top <= navThreshold && rect.bottom >= navThreshold);
    };

    window.addEventListener('scroll', checkPaper, { passive: true });
    window.addEventListener('resize', checkPaper);
    checkPaper();

    return () => {
      window.removeEventListener('scroll', checkPaper);
      window.removeEventListener('resize', checkPaper);
    };
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

  // Lock body scroll and pause Lenis when mobile panel open
  useEffect(() => {
    if (!mobileOpen) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    stopLenis();

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent touch drag from scrolling the underlying document
      e.preventDefault();
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent wheel/trackpad from scrolling the underlying document
      e.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
      startLenis();
    };
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
      className={`hw-nav${scrolled ? ' hw-nav-scrolled' : ''}${mobileOpen ? ' hw-nav-mobile-open' : ''}${isPaper ? ' hw-nav-paper' : ''}`}
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
        <div className="hw-nav-mobile-panel" data-lenis-prevent="true">
          <div className="hw-nav-panel-links">{navLinks}</div>
          <div className="hw-nav-panel-social">{socialLinks}</div>
        </div>
      )}
    </nav>
  );
}
