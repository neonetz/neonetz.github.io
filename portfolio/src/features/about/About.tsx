import { motion } from 'framer-motion';
import { MapPin, Mail, Code, Award } from 'lucide-react';
import { profile, experiences } from '../../data/portfolio';

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

export function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center py-24 bg-bg-secondary">
      <div className="section-wrapper">
        
        <div className="mb-14">
          <p className="text-label mb-2">03 — Operator</p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent-yellow mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="relative inline-block self-start">
              <div className="w-32 h-32 sm:w-40 sm:h-40 cut-corner overflow-hidden border border-border-subtle p-1 bg-bg-tertiary">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover cut-corner"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r border-b border-accent-yellow pointer-events-none" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl uppercase tracking-tight text-text-primary mb-1 leading-tight flex flex-col">
                <span className="font-black">{profile.name.split(' ')[0]}</span>
                <span className="font-light text-text-secondary text-xl sm:text-2xl tracking-[0.1em]">{profile.name.split(' ').slice(1).join(' ')}</span>
              </h3>
              <div className="flex items-center gap-3 mt-4 mb-6">
                <div className="w-8 h-px bg-accent-teal/50" />
                <p className="text-accent-teal font-mono text-xs tracking-widest uppercase">
                  {profile.role}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 text-accent-teal flex-shrink-0 opacity-70" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <Mail className="w-4 h-4 text-accent-teal flex-shrink-0 opacity-70" />
                {profile.email}
              </div>
            </div>

            <div className="card-base cut-corner-sm p-6 mt-2">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span className="text-label-sm">Biography</span>
              </div>
              <p className="text-text-secondary text-sm leading-loose">
                {profile.bio}
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-2 mb-8">
                <Award className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <span className="text-label-sm">Experience</span>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-border-subtle">
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 -translate-x-[4px] bg-accent-teal rotate-45" />
                    <span className="text-[0.65rem] font-mono text-accent-teal/60 tracking-[0.2em] uppercase">
                      {exp.period}
                    </span>
                    <h4 className="font-bold text-text-primary text-sm tracking-wide mt-1">
                      {exp.title}
                    </h4>
                    <p className="text-accent-yellow text-xs mt-1 mb-2 font-mono uppercase tracking-widest">{exp.company}</p>
                    <p className="text-text-muted text-xs leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <span className="text-label-sm">Skill Matrix</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary mt-2">
                Technical Skills
              </h3>
            </div>

            <div className="space-y-5">
              {profile.skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                      {skill.name}
                    </span>
                    <span className={`text-xs font-mono font-bold ${skillTextColor(skill.category)}`}>
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

            <div className="grid grid-cols-2 gap-6 mt-14">
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
                  <div className="text-3xl font-black text-accent-yellow mb-1">{stat.value}</div>
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
