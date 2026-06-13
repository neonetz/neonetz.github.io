import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Cpu, Globe, Database, Wrench } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { projects } from '../../data/portfolio';

const categoryIcons: Record<string, React.ElementType> = {
  frontend: Globe,
  backend: Cpu,
  database: Database,
  devops: Wrench,
  other: Cpu,
};

const statusLabel: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  archived: 'Archived',
};

export function Projects() {
  const [selected, setSelected] = useState<Project>(projects[0]);

  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col justify-center py-24 bg-bg-primary">
      <div className="section-wrapper">
        
        <div className="mb-14">
          <p className="text-label mb-2">02 — Archives</p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-accent-yellow mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-4 space-y-3">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelected(project)}
                className={`w-full text-left p-5 transition-all duration-300 group ${
                  selected.id === project.id
                    ? 'bg-text-primary text-bg-primary cut-corner-sm'
                    : 'bg-bg-secondary border border-border-subtle hover:border-accent-teal/50 cut-corner-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-mono font-bold tracking-widest ${selected.id === project.id ? 'text-bg-primary/50' : 'text-text-muted'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`font-bold text-sm uppercase tracking-wide mt-1 ${selected.id === project.id ? 'text-bg-primary' : 'text-text-primary'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed line-clamp-2 ${selected.id === project.id ? 'text-bg-primary/60' : 'text-text-muted'}`}>
                      {project.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ml-3 mt-2 flex-shrink-0 transition-transform ${selected.id === project.id ? 'text-bg-primary rotate-90' : 'text-text-muted group-hover:text-accent-teal'}`} />
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="card-base cut-corner p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-text-primary mb-2">
                      {selected.title}
                    </h3>
                    <span className="text-label-sm">
                      {statusLabel[selected.status]}
                    </span>
                  </div>
                  <div className="w-3 h-3 bg-accent-yellow flex-shrink-0 mt-1" />
                </div>

                <div className="divider mb-6" />

                <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-2xl">
                  {selected.longDescription}
                </p>

                <div className="mb-8">
                  <p className="text-label-sm mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => {
                      const Icon = categoryIcons[tech.category] || Cpu;
                      return (
                        <div
                          key={tech.name}
                          className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary border border-border-subtle text-xs font-mono text-text-secondary"
                        >
                          <Icon className="w-3 h-3 text-accent-teal flex-shrink-0" />
                          {tech.name}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selected.liveUrl && (
                    <button
                      onClick={() => window.open(selected.liveUrl, '_blank')}
                      className="btn-primary"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </button>
                  )}
                  {selected.githubUrl && (
                    <button
                      onClick={() => window.open(selected.githubUrl, '_blank')}
                      className="btn-outline"
                    >
                      Source Code
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
