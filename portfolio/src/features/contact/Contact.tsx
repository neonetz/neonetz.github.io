import { useRef, useState } from 'react';
import { profile } from '../../data/portfolio';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';

export function Contact() {
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useParallax(wordmarkRef, { speed: 0.3 });
  useScrollReveal(contentRef, { y: 40, duration: 0.8 });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/aksafadillah@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (response.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="hw-contact">
      {/* Ghost wordmark behind content with parallax */}
      <span ref={wordmarkRef} className="hw-wordmark hw-contact-wordmark" aria-hidden>
        NEONETZ
      </span>

      {/* Foreground content */}
      <div ref={contentRef} className="hw-contact-content">
        <span className="hw-eyebrow">
          {profile.socialLinks.map((s) => s.name).join(' • ')}
        </span>

        <h2 className="hw-h2 text-center">
          <span className="block">Let's Build</span>
          <span className="block italic">Something</span>
        </h2>

        <p className="hw-body text-center hw-contact-intro">
          Open to collaborations, freelance work, and interesting conversations.
          Reach out and let's create together.
        </p>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="hw-contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            aria-label="Your Name"
            required
            className="hw-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Your Email"
            required
            className="hw-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            aria-label="Your Message"
            rows={5}
            required
            className="hw-input"
          />
          <button
            type="submit"
            className="hw-btn hw-btn-primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p role="status" className="hw-form-status hw-form-status-ok">
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="hw-form-status hw-form-status-error">
              ✗ Something went wrong. Please{' '}
              <a href={`mailto:${profile.email}`} className="hw-form-status-link">
                email me directly
              </a>
              .
            </p>
          )}
        </form>

        {/* Social links */}
        <div className="hw-contact-social-row">
          {profile.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-link hw-contact-social opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
