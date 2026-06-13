import { motion } from 'framer-motion';
import { profile } from '../../data/portfolio';

const skillBarColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'bg-accent-teal';
    case 'backend': return 'bg-accent-yellow';
    case 'database': return 'bg-accent-teal/70';
    case 'devops': return 'bg-accent-yellow/70';
    default: return 'bg-border-subtle';
  }
};

const skillTextColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'text-accent-teal';
    case 'backend': return 'text-accent-yellow';
    case 'database': return 'text-accent-teal/70';
    case 'devops': return 'text-accent-yellow/70';
    default: return 'text-text-muted';
  }
};

export function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col pt-32 pb-16 bg-bg-primary">
      <div className="section-wrapper flex-grow flex flex-col">
        <div className="mb-14">
          <p className="text-label mb-2">03.5 — System Matrix</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-accent-teal mt-4" />
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {profile.skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm md:text-base font-semibold text-text-primary uppercase tracking-wide">
                      {skill.name}
                    </span>
                    <span className={`text-xs md:text-sm font-mono font-bold ${skillTextColor(skill.category)}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg-tertiary w-full overflow-hidden">
                    <motion.div
                      className={`h-full ${skillBarColor(skill.category)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
              {[
                { label: 'Projects', value: '4+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Lines Code', value: '10K+' },
                { label: 'Years', value: '3+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-bg-tertiary/50 border border-border-subtle/50 cut-corner-xs p-6 text-center hover:bg-bg-tertiary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-black text-accent-yellow mb-2">{stat.value}</div>
                  <div className="text-xs font-mono text-text-muted uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
