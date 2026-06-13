import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, Fingerprint, Cpu, Mail, Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const navLinks = [
  { name: 'Home', id: 'home', icon: Home },
  { name: 'Projects', id: 'projects', icon: FolderGit2 },
  { name: 'About', id: 'about', icon: Fingerprint },
  { name: 'Skills', id: 'skills', icon: Cpu },
  { name: 'Contact', id: 'contact', icon: Mail },
];

export function Sidebar() {
  const activeSection = useScrollSpy(navLinks.map(l => l.id));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 right-4 z-[60] w-10 h-10 bg-bg-tertiary border border-border-subtle flex items-center justify-center text-accent-yellow cut-corner-xs"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="md:hidden fixed inset-0 z-[55] bg-bg-primary/80 flex items-center justify-center"
            onClick={toggleMobileMenu}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-8 p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-accent-yellow cut-corner-sm flex items-center justify-center mb-4">
                <span className="text-black font-black text-4xl leading-none">N</span>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  
                  return (
                    <a
                      key={link.name}
                      href={`#${link.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 text-xl font-mono tracking-widest uppercase transition-colors ${
                        isActive ? 'text-accent-teal' : 'text-text-muted hover:text-accent-yellow'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden md:flex fixed top-0 left-0 bottom-0 w-20 bg-bg-secondary border-r border-border-subtle z-50 flex-col items-center py-6"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="#home" className="mb-10 group relative">
          <div className="w-10 h-10 bg-accent-yellow cut-corner-xs flex items-center justify-center">
            <span className="text-black font-black text-xl leading-none">N</span>
          </div>
        </a>

        <div className="flex flex-col items-center gap-6 flex-grow">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.name}
                href={`#${link.id}`}
                className={`relative p-3 transition-colors group ${isActive ? 'text-accent-teal' : 'text-text-muted hover:text-accent-yellow'}`}
              >
                <Icon className="w-6 h-6 relative z-10" />
                
                {/* Sci-Fi Active Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-accent-teal/10 blur-md rounded-full pointer-events-none" />
                )}
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-bg-tertiary border border-border-subtle text-[0.65rem] font-mono text-text-primary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap cut-corner-xs z-50">
                  {link.name}
                </div>
                
                {/* Sci-Fi Vertical Bar Indicator */}
                <div 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-accent-teal transition-all duration-300 -ml-[1px] ${
                    isActive ? 'h-full shadow-[0_0_10px_#2bc0d4]' : 'h-0 group-hover:h-full group-hover:bg-accent-yellow'
                  }`} 
                />
              </a>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-border-subtle" />
          <div className="flex flex-col items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
        </div>
      </motion.aside>
    </>
  );
}
