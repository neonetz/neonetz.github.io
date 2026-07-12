import { profile } from '../../data/portfolio';

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'clamp(0.8rem, calc(22*var(--u)), 1.35rem)',
  letterSpacing: '0.03em',
};

export function Navbar() {
  return (
    <nav className="hw-nav">
      {/* Left: nav links */}
      <div className="flex gap-[calc(40*var(--u))]">
        <a href="#projects" className="hw-link font-extrabold" style={navLinkStyle}>
          Projects
        </a>
        <a href="#about" className="hw-link font-extrabold" style={navLinkStyle}>
          About
        </a>
        <a href="#skills" className="hw-link font-extrabold" style={navLinkStyle}>
          Skills
        </a>
      </div>

      {/* Center: logo */}
      <div className="flex flex-col items-center leading-none">
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
      </div>

      {/* Right: social */}
      <div className="flex justify-end gap-[calc(24*var(--u))] items-start">
        {profile.socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
            style={navLinkStyle}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
