import { motion } from 'framer-motion';
import { User, MapPin, Mail, Code, Award, BookOpen } from 'lucide-react';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { SkillBar } from '../../components/ui/SkillBar';
import { profile, experiences } from '../../data/portfolio';

export function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center py-24 bg-bg-secondary">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl" />
      
      <div className="relative w-full z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - About Me */}
          <div>
            <SectionTitle subtitle="Get to know me better">
              Operator Profile
            </SectionTitle>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Avatar & Basic Info */}
              <div className="flex items-start gap-6">
                <div className="relative w-full">
                  <div className="w-32 h-32 cut-corner bg-gradient-to-br from-accent-teal/20 to-accent-yellow/20 border border-border-subtle flex items-center justify-center overflow-hidden">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-accent-teal" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-accent-yellow" />
                </div>
                
                <div className="flex-1 space-y-3 mt-2">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <User className="w-4 h-4 text-accent-teal" />
                    <span className="text-sm font-bold">{profile.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MapPin className="w-4 h-4 text-accent-teal" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Mail className="w-4 h-4 text-accent-teal" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="p-6 cut-corner-sm bg-bg-tertiary border border-border-subtle">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-4 h-4 text-accent-teal" />
                  <span className="text-text-primary font-mono text-sm uppercase tracking-wider">
                    Biography Data
                  </span>
                </div>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-yellow" />
                  <span className="text-text-primary font-mono text-sm uppercase tracking-wider">
                    Experience Log
                  </span>
                </div>
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative w-full pl-8 pb-6 border-l border-border-subtle last:pb-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-accent-teal border-2 border-bg-secondary" />
                    
                    <span className="text-accent-teal/50 font-mono text-xs font-bold">
                      {exp.period}
                    </span>
                    <h4 className="text-text-primary font-bold mt-1 uppercase">
                      {exp.title}
                    </h4>
                    <span className="text-accent-yellow text-sm">
                      {exp.company}
                    </span>
                    <p className="text-text-muted text-sm mt-2">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <SectionTitle subtitle="My technical capabilities">
              Skill Matrix
            </SectionTitle>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Skills Grid */}
              <div className="p-6 cut-corner-sm bg-bg-tertiary border border-border-subtle">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-4 h-4 text-accent-teal" />
                  <span className="text-text-primary font-mono text-sm uppercase tracking-wider">
                    Technical Specifications
                  </span>
                </div>
                
                <div className="space-y-1">
                  {profile.skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>

              {/* Skill Categories Legend */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { category: 'Frontend', color: 'accent-teal', icon: '🌐' },
                  { category: 'Backend', color: 'accent-yellow', icon: '⚙️' },
                  { category: 'Database', color: 'purple-500', icon: '💾' },
                  { category: 'DevOps', color: 'green-500', icon: '🚀' },
                  { category: 'Other', color: 'pink-500', icon: '📦' },
                ].map((item) => (
                  <motion.div
                    key={item.category}
                    className="flex items-center gap-2 p-3 rounded bg-bg-primary border border-border-subtle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
                    <span className="text-text-secondary text-xs">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Projects Completed', value: '4+' },
                  { label: 'Technologies Used', value: '15+' },
                  { label: 'Lines of Code', value: '10K+' },
                  { label: 'Years Coding', value: '3+' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="p-6 cut-corner-sm bg-gradient-to-br from-bg-tertiary to-bg-primary border border-border-subtle text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-accent-teal mb-1">
                      {stat.value}
                    </div>
                    <div className="text-text-muted text-xs uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
