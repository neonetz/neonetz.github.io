import { motion } from 'framer-motion';
import type { TechStack } from '../../data/portfolio';

interface SkillBarProps {
  skill: TechStack;
  index: number;
}

const categoryColors = {
  frontend: 'from-accent-teal to-accent-teal/50',
  backend: 'from-accent-yellow to-accent-yellow/50',
  database: 'from-purple-500 to-purple-500/50',
  devops: 'from-green-500 to-green-500/50',
  other: 'from-pink-500 to-pink-500/50',
};

export function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-primary font-medium text-sm uppercase tracking-wide">
          {skill.name}
        </span>
        <span className="text-accent-teal font-mono text-xs">
          {skill.level}%
        </span>
      </div>
      
      <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden relative">
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 9px,
              rgba(0, 240, 255, 0.3) 9px,
              rgba(0, 240, 255, 0.3) 10px
            )`,
          }}
        />
        
        {/* Animated fill bar */}
        <motion.div
          className={`h-full bg-gradient-to-r ${categoryColors[skill.category]} rounded-full relative`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
        >
          {/* Glow effect */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/30 blur-sm" />
        </motion.div>
      </div>
    </motion.div>
  );
}
