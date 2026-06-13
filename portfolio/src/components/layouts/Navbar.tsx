import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent-yellow cut-corner flex items-center justify-center">
              <span className="text-black font-black text-lg leading-none">N</span>
            </div>
            <span className="font-black text-sm sm:text-base tracking-widest text-text-primary hidden sm:block">
              NEONETZ
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-text-muted hover:text-text-primary text-sm font-mono uppercase tracking-widest transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-yellow group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              ONLINE
            </div>
            <a href="#contact" className="btn-outline" style={{ padding: '0.5rem 1.5rem' }}>
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-bg-secondary border-t border-border-subtle"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="section-wrapper py-6 space-y-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-text-muted hover:text-text-primary text-sm font-mono uppercase tracking-widest border-b border-border-subtle last:border-0"
                >
                  <span className="text-accent-teal/40 mr-3 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
