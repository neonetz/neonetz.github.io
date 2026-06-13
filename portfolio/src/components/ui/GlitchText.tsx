import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  enableGlitch?: boolean;
}

export function GlitchText({ children, className = '', enableGlitch = true }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={enableGlitch ? {
        textShadow: [
          '2px 0 #2bc0d4, -2px 0 #f0c808',
          '-2px 0 #2bc0d4, 2px 0 #f0c808',
          '2px 2px #2bc0d4, -2px -2px #f0c808',
          '-2px 2px #2bc0d4, 2px -2px #f0c808',
          '2px 0 #2bc0d4, -2px 0 #f0c808',
        ],
      } : {}}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    >
      {children}
    </motion.span>
  );
}
