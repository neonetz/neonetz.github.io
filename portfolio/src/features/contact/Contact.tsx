import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Radio, CheckCircle, Globe } from 'lucide-react';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Button } from '../../components/ui/Button';
import { profile } from '../../data/portfolio';

// Custom social icons
const SocialIcon = ({ type }: { type: string }) => {
  const iconStyles = "w-5 h-5";
  
  switch (type) {
    case 'github':
      return (
        <svg className={iconStyles} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.665-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={iconStyles} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={iconStyles} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return <Globe className={iconStyles} />;
  }
};

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 bg-bg-primary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <SectionTitle subtitle="Let's connect and build something amazing together">
              Initiate Uplink
            </SectionTitle>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Status Display */}
              <div className="p-6 rounded-lg bg-bg-secondary border border-border-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <Radio className="w-5 h-5 text-accent-cyan animate-pulse" />
                  <span className="text-text-primary font-mono text-sm uppercase tracking-wider">
                    Connection Status
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-sm">Signal Strength</span>
                    <span className="text-accent-cyan font-mono text-sm">Excellent</span>
                  </div>
                  <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-amber"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <h4 className="text-text-primary font-mono text-sm uppercase tracking-wider">
                  Available Channels
                </h4>
                
                {profile.socialLinks.map((social, index) => {
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-bg-secondary border border-border-subtle hover:border-accent-cyan/50 transition-all group"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 8 }}
                    >
                      <div className="w-12 h-12 rounded bg-bg-tertiary flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                        <SocialIcon type={social.icon} />
                      </div>
                      <div>
                        <span className="text-text-primary font-medium block">
                          {social.name}
                        </span>
                        <span className="text-text-muted text-sm">
                          @{social.url.split('/').pop()}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <SectionTitle subtitle="Send a message and I'll get back to you">
              Transmit Message
            </SectionTitle>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-text-primary font-mono text-sm uppercase tracking-wider">
                  Sender ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 transition-all outline-none"
                    placeholder="Enter your name"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-xs font-mono">
                    [STRING]
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-text-primary font-mono text-sm uppercase tracking-wider">
                  Communication Channel
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 transition-all outline-none"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-xs font-mono">
                    [EMAIL]
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-text-primary font-mono text-sm uppercase tracking-wider">
                  Message Payload
                </label>
                <div className="relative">
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    rows={5}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/50 transition-all outline-none resize-none"
                    placeholder="Enter your message"
                    required
                  />
                  <div className="absolute right-4 bottom-4 text-text-muted text-xs font-mono">
                    [TEXT]
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSubmitted}
                icon={isSubmitted ? <CheckCircle size={18} /> : <Send size={18} />}
              >
                {isSubmitting ? 'Transmitting...' : isSubmitted ? 'Message Sent!' : 'Transmit Message'}
              </Button>

              {/* Decorative Elements */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border-subtle" />
                <span className="text-text-muted text-xs font-mono">
                  ENCRYPTED CONNECTION
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border-subtle" />
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
