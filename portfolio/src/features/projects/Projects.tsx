import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Cpu, Database, Globe, Wrench, Crosshair } from 'lucide-react';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Button } from '../../components/ui/Button';
import type { Project } from '../../data/portfolio';
import { projects } from '../../data/portfolio';

// GitHub icon SVG
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.665-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const categoryIcons: Record<string, React.ElementType> = {
  frontend: Globe,
  backend: Cpu,
  database: Database,
  devops: Wrench,
  other: Cpu,
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <section id="projects" className="relative py-32 bg-bg-primary overflow-hidden">
      <div className="watermark top-0 right-0 opacity-5">DATABASE</div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="PROJECT INVENTORY">
          ARCHIVES
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Project List (Sidebar - Endfield style tab list) */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {projects.map((project, index) => {
              const isActive = selectedProject.id === project.id;
              return (
                <motion.div
                  key={project.id}
                  className={`group relative cursor-pointer cut-corner-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-text-primary text-bg-primary py-5 px-6'
                      : 'bg-bg-secondary text-text-secondary py-4 px-6 hover:bg-bg-tertiary'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs font-bold ${isActive ? 'text-bg-primary' : 'text-text-muted'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`font-bold uppercase tracking-wide ${isActive ? 'text-bg-primary' : 'group-hover:text-text-primary'}`}>
                        {project.title}
                      </h3>
                    </div>
                    {isActive && <ChevronRight className="w-5 h-5 text-bg-primary" />}
                  </div>
                  
                  {/* Tactical Hazard Line on active */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-yellow" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Project Detail (Main Content) */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                className="tactical-border bg-bg-secondary cut-corner relative"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Top Bar Tactical UI */}
                <div className="flex items-center justify-between px-6 py-2 border-b border-border-subtle bg-bg-tertiary">
                  <div className="flex items-center gap-2 text-text-muted font-mono text-xs">
                    <Crosshair className="w-4 h-4" />
                    <span>SYS.VIEW.PROJECT</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent-yellow" />
                    <div className="w-2 h-2 bg-text-muted" />
                    <div className="w-2 h-2 bg-text-muted" />
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Title & Status */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-4xl font-black text-text-primary uppercase tracking-tight mb-2">
                        {selectedProject.title}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-primary border border-border-subtle text-xs font-mono text-text-muted uppercase">
                        <span>Status:</span>
                        <span className={selectedProject.status === 'completed' ? 'text-accent-teal' : 'text-accent-yellow'}>
                          {selectedProject.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-4 border-l-4 border-accent-teal bg-bg-primary/50 font-mono text-sm leading-relaxed text-text-secondary">
                    {selectedProject.longDescription}
                  </div>

                  {/* Tech Stack Matrix */}
                  <div>
                    <h4 className="text-text-primary font-mono text-sm uppercase font-bold mb-4 flex items-center gap-2">
                      <span className="text-accent-yellow">///</span> Tech Matrix
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.techStack.map((tech) => {
                        const Icon = categoryIcons[tech.category];
                        return (
                          <div
                            key={tech.name}
                            className="flex items-center gap-3 p-3 bg-bg-primary border border-border-subtle cut-corner-sm"
                          >
                            <Icon className="w-4 h-4 text-accent-teal" />
                            <div>
                              <span className="text-text-primary text-sm font-bold uppercase block">
                                {tech.name}
                              </span>
                              <span className="text-text-muted text-xs font-mono">
                                Lvl {tech.level}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-border-subtle relative z-20">
                    {selectedProject.liveUrl && (
                      <Button 
                        variant="primary" 
                        size="md"
                        icon={<ExternalLink size={16} />}
                        onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      >
                        Deploy Live
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button 
                        variant="outline" 
                        size="md"
                        icon={<GithubIcon size={16} />}
                        onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      >
                        Source File
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Background Grid inside card */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
