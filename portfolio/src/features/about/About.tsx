import { motion } from 'framer-motion';
import { MapPin, Mail, Code, Award } from 'lucide-react';
import { profile, experiences } from '../../data/portfolio';

const skillBarColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'bg-accent-teal';
    case 'backend': return 'bg-accent-yellow';
    case 'database': return 'bg-purple-400';
    case 'devops': return 'bg-green-400';
    default: return 'bg-pink-400';
  }
};

const skillTextColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'text-accent-teal';
    case 'backend': return 'text-accent-yellow';
    case 'database': return 'text-purple-400';
    case 'devops': return 'text-green-400';
    default: return 'text-pink-400';
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
          >
            <div className="relative mb-8 inline-block">
              <div className="w-40 h-40 cut-corner overflow-hidden border border-border-subtle">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-accent-teal pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-accent-yellow pointer-events-none" />
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-1">
              {profile.name}
            </h3>
            <p className="text-accent-teal font-mono text-sm tracking-widest uppercase mb-6">
              {profile.role}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 text-accent-teal flex-shrink-0" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <Mail className="w-4 h-4 text-accent-teal flex-shrink-0" />
                {profile.email}
              </div>
            </div>

            <div className="card-base cut-corner-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span className="text-label-sm">Biography</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <span className="text-label-sm">Experience</span>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l border-border-subtle">
                    <div className="absolute left-0 top-1 w-2 h-2 -translate-x-[5px] bg-accent-teal" />
                    <span className="text-xs font-mono text-accent-teal/60 tracking-widest">
                      {exp.period}
                    </span>
                    <h4 className="font-bold text-text-primary text-sm uppercase mt-1">
                      {exp.title}
                    </h4>
                    <p className="text-accent-yellow text-xs mt-0.5">{exp.company}</p>
                    <p className="text-text-muted text-xs mt-2 leading-relaxed">{exp.description}</p>
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

            <div className="grid grid-cols-2 gap-4 mt-14">
              {[
                { label: 'Projects', value: '4+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Lines of Code', value: '10K+' },
                { label: 'Years Coding', value: '3+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="card-base cut-corner-xs p-5 text-center"
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
