import { profile } from '../../data/portfolio';

export function Contact() {
  return (
    <section id="contact" className="hw-contact">
      {/* Ghost wordmark behind content */}
      <span
        className="hw-wordmark"
        aria-hidden
        style={{
          position: 'absolute',
          fontSize: 'calc(280 * var(--u))',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        NEONETZ
      </span>

      {/* Foreground content */}
      <div
        className="relative flex flex-col items-center"
        style={{ gap: 'calc(40 * var(--u))', zIndex: 3 }}
      >
        <span className="hw-eyebrow">
          {profile.socialLinks.map((s) => s.name).join(' • ')}
        </span>

        <h2 className="hw-h2 text-center">
          <span className="block">Let's Build</span>
          <span className="block italic">Something</span>
        </h2>

        <p
          className="hw-body text-center"
          style={{ maxWidth: 'calc(560 * var(--u))' }}
        >
          Open to collaborations, freelance work, and interesting conversations.
          Reach out and let's create together.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="hw-btn hw-btn-primary"
        >
          Send Email
        </a>

        {/* Social links */}
        <div
          className="flex"
          style={{ gap: 'calc(40 * var(--u))', marginTop: 'calc(20 * var(--u))' }}
        >
          {profile.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-link opacity-70 hover:opacity-100 transition-opacity duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'calc(16 * var(--u))',
                letterSpacing: '0.08em',
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
