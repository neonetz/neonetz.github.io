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
      <span
        ref={wordmarkRef}
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
        ref={contentRef}
        className="relative flex flex-col items-center"
        style={{ gap: 'calc(40 * var(--u))', zIndex: 3, width: '100%', maxWidth: 'calc(640 * var(--u))' }}
      >
        <span className="hw-eyebrow">
          {profile.socialLinks.map((s) => s.name).join(' • ')}
        </span>

        <h2 className="hw-h2 text-center">
          <span className="block">Let's Build</span>
          <span className="block italic">Something</span>
        </h2>

        <p className="hw-body text-center" style={{ maxWidth: 'calc(560 * var(--u))' }}>
          Open to collaborations, freelance work, and interesting conversations.
          Reach out and let's create together.
        </p>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          style={{ gap: 'calc(20 * var(--u))', width: '100%' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="hw-input"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'calc(16 * var(--u))',
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="hw-input"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'calc(16 * var(--u))',
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="hw-input"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'calc(16 * var(--u))',
              resize: 'vertical',
            }}
          />
          <button
            type="submit"
            className="hw-btn hw-btn-primary"
            disabled={status === 'sending'}
            style={{ justifyContent: 'center' }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p
              className="hw-eyebrow text-center"
              style={{ opacity: 1, color: '#f5f5f5' }}
            >
              ✓ Message sent! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p
              className="hw-eyebrow text-center"
              style={{ opacity: 1, color: '#ff6b6b' }}
            >
              ✗ Something went wrong. Please email me directly.
            </p>
          )}
        </form>

        {/* Social links */}
        <div className="flex" style={{ gap: 'calc(40 * var(--u))', marginTop: 'calc(20 * var(--u))' }}>
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
