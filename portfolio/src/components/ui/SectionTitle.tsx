import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionTitle({ 
  children, 
  subtitle, 
  className = '', 
  align = 'left' 
}: SectionTitleProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={`mb-12 ${alignStyles[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative line */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div 
          className="h-px w-12 bg-gradient-to-r from-accent-teal to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <span className="text-accent-teal font-mono text-xs uppercase tracking-[0.3em]">
          // SECTION
        </span>
      </div>
      
      {/* Main title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
        {children}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      
      {/* Bottom decorative line */}
      <motion.div 
        className="h-px w-24 bg-gradient-to-r from-accent-yellow to-transparent mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </motion.div>
  );
}
