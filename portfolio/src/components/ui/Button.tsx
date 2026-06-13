import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  icon,
  type = 'button',
}: ButtonProps) {
  // Arknights style: Sharp, utilitarian, cut corners
  const baseStyles = `
    relative font-mono font-bold uppercase tracking-widest
    transition-all duration-300 cut-corner group
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-3
  `;

  const variants = {
    primary: `
      bg-text-primary text-bg-primary
      hover:bg-accent-yellow
    `,
    secondary: `
      bg-accent-teal text-bg-primary
      hover:bg-white
    `,
    outline: `
      bg-transparent border border-text-muted text-text-primary
      hover:border-accent-yellow hover:text-accent-yellow
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Tactical UI decorative square on hover */}
      {variant !== 'outline' && (
        <span className="absolute left-2 w-1.5 h-1.5 bg-bg-primary opacity-50 group-hover:bg-black" />
      )}
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      
      {/* Decorative lines */}
      <span className="absolute right-0 bottom-0 w-4 h-4 border-r-2 border-b-2 border-current opacity-30" />
    </motion.button>
  );
}
