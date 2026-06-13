import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { profile } from '../../data/portfolio';

const SocialIcon = ({ type }: { type: string }) => {
  const cls = "w-5 h-5";
  switch (type) {
    case 'github':
      return <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.665-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
    case 'linkedin':
      return <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case 'twitter':
      return <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    default:
      return <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
  }
};

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col pt-32 pb-16 bg-bg-secondary">
      <div className="section-wrapper flex-grow flex flex-col items-center justify-center">
        
        <div className="mb-14 text-center w-full">
          <p className="text-label mb-2">04 — Commlink</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-accent-yellow mt-4 mx-auto" />
          <p className="text-text-muted text-sm md:text-base mt-6 max-w-md mx-auto">
            Have a project in mind or just want to say hello? Send me a message and I'll get back to you.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-bg-secondary p-8 sm:p-12 cut-corner border border-border-subtle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="tactical-frame">
              <label className="text-[0.65rem] font-mono text-accent-teal uppercase tracking-widest block mb-2 opacity-80">01 // Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter your name"
                required
                className="w-full px-5 py-4 bg-bg-tertiary/50 border border-border-subtle text-text-primary text-sm placeholder:text-text-muted/50 focus:bg-bg-tertiary focus:border-accent-teal focus:outline-none transition-all cut-corner-xs"
              />
            </div>

            <div className="tactical-frame">
              <label className="text-[0.65rem] font-mono text-accent-teal uppercase tracking-widest block mb-2 opacity-80">02 // Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-4 bg-bg-tertiary/50 border border-border-subtle text-text-primary text-sm placeholder:text-text-muted/50 focus:bg-bg-tertiary focus:border-accent-teal focus:outline-none transition-all cut-corner-xs"
              />
            </div>

            <div className="tactical-frame">
              <label className="text-[0.65rem] font-mono text-accent-teal uppercase tracking-widest block mb-2 opacity-80">03 // Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={5}
                placeholder="Tell me about your project..."
                required
                className="w-full px-5 py-4 bg-bg-tertiary/50 border border-border-subtle text-text-primary text-sm placeholder:text-text-muted/50 focus:bg-bg-tertiary focus:border-accent-teal focus:outline-none transition-all resize-none cut-corner-xs"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={sending || sent}
                className="btn-primary"
              >
                {sent ? (
                  <><CheckCircle className="w-4 h-4" /> Message Sent!</>
                ) : sending ? (
                  'Sending...'
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </div>
          </motion.form>

          <div className="mt-14 pt-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 w-full max-w-xs mb-8">
              <div className="h-px bg-border-subtle flex-1" />
              <p className="text-[0.65rem] font-mono text-text-muted uppercase tracking-[0.2em]">External Links</p>
              <div className="h-px bg-border-subtle flex-1" />
            </div>
            <div className="flex items-center justify-center gap-6">
              {profile.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 text-text-muted hover:text-accent-teal transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center border border-border-subtle bg-bg-secondary group-hover:border-accent-teal group-hover:bg-accent-teal/5 transition-all cut-corner-xs">
                    <SocialIcon type={social.icon} />
                  </div>
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
