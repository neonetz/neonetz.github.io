import { motion } from 'framer-motion';
import { Home, FolderGit2, Fingerprint, Cpu, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'About', href: '#about', icon: Fingerprint },
  { name: 'Skills', href: '#skills', icon: Cpu },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function Sidebar() {
  return (
    <motion.aside
      className="fixed top-0 left-0 bottom-0 w-16 md:w-20 bg-bg-secondary border-r border-border-subtle z-50 flex flex-col items-center py-6"
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
          return (
            <a
              key={link.name}
              href={link.href}
              className="relative p-3 text-text-muted hover:text-accent-teal transition-colors group"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-bg-tertiary border border-border-subtle text-[0.65rem] font-mono text-text-primary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap cut-corner-xs z-50">
                {link.name}
              </div>
              
              {/* Active Indicator (Mock via hover for now) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-accent-teal group-hover:h-full transition-all duration-300 -ml-[1px]" />
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
  );
}
