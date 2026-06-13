import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { profile } from '../../data/portfolio';

// Custom social icons using simple SVG-like approach
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

export function Footer() {
  return (
    <footer className="relative bg-bg-secondary border-t border-border-subtle">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xl text-text-primary">
                NEONETZ<span className="text-accent-cyan">.DEV</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs">
              Building digital experiences through code. 
              Specializing in full-stack development and automation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-mono text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-text-muted hover:text-accent-cyan text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-text-primary font-mono text-sm uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {profile.socialLinks.map((social) => {
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded bg-bg-tertiary border border-border-subtle flex items-center justify-center text-text-muted hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
                    whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0, 240, 255, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialIcon type={social.icon} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs font-mono">
            © 2024 {profile.name}. All rights reserved.
          </p>
          <p className="text-text-muted text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Online
          </p>
        </div>
      </div>
    </footer>
  );
}
