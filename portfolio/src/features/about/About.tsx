import { motion } from 'framer-motion';
import { MapPin, Mail, Code, Award } from 'lucide-react';
import { profile, experiences } from '../../data/portfolio';

export function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col pt-32 pb-16 bg-bg-secondary">
      <div className="section-wrapper">
        
        <div className="mb-14">
          <p className="text-label mb-2">03 — Operator</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent-yellow mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="relative inline-block self-start">
                <div className="w-40 h-40 cut-corner overflow-hidden border border-border-subtle p-1 bg-bg-tertiary">
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
                  <p className="text-accent-teal font-mono text-sm tracking-widest uppercase">
                    {profile.role}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-text-muted text-sm md:text-base">
                  <MapPin className="w-5 h-5 text-accent-teal flex-shrink-0 opacity-70" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-4 text-text-muted text-sm md:text-base">
                  <Mail className="w-5 h-5 text-accent-teal flex-shrink-0 opacity-70" />
                  {profile.email}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-base cut-corner-sm p-8 md:p-10 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span className="text-sm font-mono text-accent-teal uppercase tracking-widest">Biography</span>
                </div>
                <p className="text-text-secondary text-base md:text-lg leading-loose">
                  {profile.bio}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Award className="w-5 h-5 text-accent-yellow flex-shrink-0" />
                  <span className="text-sm font-mono text-accent-yellow uppercase tracking-widest">Experience Record</span>
                </div>
                <div className="space-y-10">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-8 border-l border-border-subtle">
                      <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-[5px] bg-accent-teal rotate-45" />
                      <span className="text-xs md:text-sm font-mono text-accent-teal/60 tracking-[0.2em] uppercase">
                        {exp.period}
                      </span>
                      <h4 className="font-bold text-text-primary text-base md:text-lg tracking-wide mt-2">
                        {exp.title}
                      </h4>
                      <p className="text-accent-yellow text-xs md:text-sm mt-1 mb-3 font-mono uppercase tracking-widest">{exp.company}</p>
                      <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-2xl">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
