import { profile } from '../../data/portfolio';

export function About() {
  return (
    <section id="about" className="hw-section">
      <div className="hw-about-grid">
        {/* Left: photo with mix-blend-lighten */}
        <div className="relative" style={{ overflow: 'hidden' }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="hw-about-img"
            loading="lazy"
          />
        </div>

        {/* Right: bio content */}
        <div className="flex flex-col" style={{ gap: 'calc(30 * var(--u))' }}>
          <span className="hw-eyebrow">About</span>

          <h2 className="hw-h2">
            <span className="block">Building Digital</span>
            <span className="block italic">Experiences</span>
          </h2>

          <p className="hw-body" style={{ maxWidth: 'calc(560 * var(--u))' }}>
            {profile.bio}
          </p>

          {/* Info list */}
          <div className="flex flex-col" style={{ gap: 'calc(2 * var(--u))' }}>
            <div className="hw-skill-item">
              <span>Name</span>
              <span>{profile.name}</span>
            </div>
            <div className="hw-skill-item">
              <span>Role</span>
              <span>{profile.role}</span>
            </div>
            <div className="hw-skill-item">
              <span>Location</span>
              <span>{profile.location}</span>
            </div>
            <div className="hw-skill-item">
              <span>Email</span>
              <a href={`mailto:${profile.email}`} className="hw-link">
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
