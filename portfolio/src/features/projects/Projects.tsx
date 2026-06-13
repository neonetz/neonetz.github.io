import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Cpu, Globe, Database, Wrench } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { projects } from '../../data/portfolio';

const categoryIcons: Record<string, any> = {
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
    <section id="projects" className="relative w-full min-h-screen flex flex-col pt-32 pb-16 bg-bg-primary">
      <div className="section-wrapper flex-grow flex flex-col">
        
        <div className="mb-14">
          <p className="text-label mb-2">02 — Archives</p>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-accent-yellow mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 flex-grow">
          
          <div className="lg:col-span-4">
            <div 
              className="space-y-3 overflow-y-auto pr-2 custom-scrollbar" 
              style={{ maxHeight: 'calc(100vh - 350px)', minHeight: '400px' }}
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setSelected(project)}
                  className={`w-full text-left p-5 transition-all duration-300 group relative border-l-2 ${
                    selected.id === project.id
                      ? 'bg-bg-tertiary border-accent-yellow'
                      : 'bg-transparent border-border-subtle hover:bg-bg-secondary hover:border-accent-teal/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <span className={`text-xs font-mono font-bold tracking-widest ${selected.id === project.id ? 'text-accent-yellow' : 'text-text-muted'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`font-bold text-sm uppercase tracking-wide mt-2 ${selected.id === project.id ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary transition-colors'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-xs mt-2 leading-relaxed line-clamp-2 ${selected.id === project.id ? 'text-text-secondary' : 'text-text-muted'}`}>
                        {project.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-transform ${selected.id === project.id ? 'text-accent-yellow rotate-90' : 'text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent-teal transform translate-x-2 group-hover:translate-x-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="card-base cut-corner p-6 sm:p-8 lg:p-10"
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
                          className="flex items-center gap-2 px-3 py-1.5 border border-accent-teal/20 bg-accent-teal/5 text-xs font-mono text-accent-teal rounded-sm"
                        >
                          <Icon className="w-3 h-3 opacity-70 flex-shrink-0" />
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
