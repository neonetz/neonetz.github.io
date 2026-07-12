import { profile } from '../../data/portfolio';

export function Hero() {
  return (
    <header className="hw-hero" id="top">
      <div className="hw-hero-content">
        {/* Eyebrow */}
        <span className="hw-eyebrow">
          {profile.role} • {profile.location}
        </span>

        {/* H1 — 3 stacked spans, fluid serif */}
        <h1 className="hw-h1">
          <span className="block">The Developer</span>
          <span className="block">Who Builds</span>
          <span className="block italic">With Purpose</span>
        </h1>

        {/* Body text */}
        <p className="hw-body" style={{ maxWidth: 'calc(640 * var(--u))' }}>
          {profile.bio}
        </p>

        {/* CTAs */}
        <div
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
