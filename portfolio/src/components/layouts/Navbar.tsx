import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ARCHIVES', href: '#projects' },
  { name: 'OPERATOR', href: '#about' },
  { name: 'COMMLINK', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-white/5' 
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Left) */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-accent-yellow cut-corner flex items-center justify-center">
              <span className="text-black font-black text-xl">N</span>
            </div>
            <span className="font-black text-xl tracking-widest text-text-primary hidden lg:block">
              NEONETZ
            </span>
          </motion.a>

          {/* Centered Navigation (Endfield style) */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-text-primary/70 hover:text-white font-bold text-sm tracking-[0.2em] transition-colors group py-2"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-accent-yellow group-hover:w-full transition-all duration-300 ease-out" />
              </motion.a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-text-muted font-mono text-xs mr-4 border-r border-border-subtle pr-4">
              <span className="w-2 h-2 bg-accent-teal animate-pulse" />
              SYS.ONLINE
            </div>
            <Button variant="outline" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
              CONNECT
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-bg-secondary border-b border-border-subtle"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-primary font-bold text-lg tracking-widest border-b border-border-subtle pb-4"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="primary" className="mt-4 !bg-accent-yellow !text-black w-full" onClick={() => setIsMobileMenuOpen(false)}>
                CONNECT
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
