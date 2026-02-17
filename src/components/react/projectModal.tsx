import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import {
  X, ExternalLink, Layers, Sparkles, ArrowRight, CheckCircle2,
  ChevronLeft, ChevronRight, Play
} from 'lucide-react';
import { selectedProject, closeProject } from '../../store/projectStore';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface Example {
  name: string;
  description: string;
  outcomes: string[];
  link?: string;
  media?: MediaItem[];
}

interface CategoryData {
  title: string;
  shortDesc: string;
  stack: string[];
  image: string;
  examples: Example[];
}

export default function ProjectModal() {
  const project = useStore(selectedProject) as CategoryData | null;
  const [activeExampleIndex, setActiveExampleIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setActiveExampleIndex(null);
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeExampleIndex]);

  if (!project) return null;
  const currentMedia = activeExampleIndex !== null && project.examples[activeExampleIndex].media
    ? project.examples[activeExampleIndex].media
    : [{ type: 'image', url: project.image }];

  const activeMediaItem = currentMedia ? currentMedia[currentSlide] : { type: 'image', url: project.image };
  const hasMultipleSlides = currentMedia && currentMedia.length > 1;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentMedia) return;
    setCurrentSlide((prev) => (prev + 1) % currentMedia.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentMedia) return;
    setCurrentSlide((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-xl"
        onClick={closeProject}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-7xl h-full md:h-[90vh] bg-[#0a0a0a] border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >

          <button
            onClick={closeProject}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white text-white hover:text-black border border-white/10 transition-all duration-300 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="w-full md:w-[55%] h-[40vh] md:h-full relative bg-black shrink-0 border-r border-white/5 group/slider">

            <AnimatePresence mode='wait'>
              <motion.div
                key={`${activeExampleIndex}-${currentSlide}`} // Clave única para forzar re-render y animación
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {activeMediaItem?.type === 'video' ? (
                  <video
                    src={activeMediaItem.url}
                    className="w-full h-full object-cover"
                    autoPlay loop muted playsInline
                  />
                ) : (
                  <img
                    src={activeMediaItem?.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-transparent" />

            {hasMultipleSlides && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {currentMedia?.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute bottom-12 left-8 md:bottom-12 md:left-12 max-w-xl z-10 pointer-events-none">
              <AnimatePresence mode='wait'>
                {activeExampleIndex === null ? (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    key="main-title"
                  >
                    <span className="text-orange-500 font-mono text-xs tracking-widest uppercase mb-3 block">
                      Área de Expertiz
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((tech: string) => (
                        <span key={tech} className="text-[10px] font-mono font-bold bg-white/10 text-gray-300 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    key="project-title"
                  >
                    <span className="text-tech-gold font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                      <Sparkles size={12} /> Proyecto Seleccionado
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                      {project.examples[activeExampleIndex].name}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-[#0a0a0a]">
            <div className="p-8 md:p-12 pb-24">
              <div className="mb-10 border-b border-white/5 pb-8">
                <h3 className="flex items-center gap-2 text-white/50 text-sm font-mono uppercase tracking-widest mb-4">
                  <Layers size={14} /> Mi Enfoque
                </h3>
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-white/50 text-sm font-mono uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> Casos de Éxito
                </h3>

                <div className="grid gap-4">
                  {project.examples && project.examples.map((ex, index) => {
                    const isActive = activeExampleIndex === index;

                    return (
                      <button
                        key={index}
                        onClick={() => setActiveExampleIndex(isActive ? null : index)}
                        className={`w-full text-left group p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${isActive
                          ? "bg-white/[0.08] border-orange-500/50 shadow-[0_0_30px_-10px_rgba(255,100,0,0.15)]"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/20"
                          }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-tech-gold" />
                        )}

                        <div className="flex justify-between items-start mb-3 pl-2">
                          <h4 className={`text-lg font-semibold transition-colors ${isActive ? "text-white" : "text-gray-200 group-hover:text-white"
                            }`}>
                            {ex.name}
                          </h4>

                          {isActive ? (
                            <span className="text-orange-500 animate-pulse"><Play size={18} fill="currentColor" /></span>
                          ) : (
                            <span className="text-white/20 group-hover:text-white/60 transition-colors"><ChevronRight size={18} /></span>
                          )}
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light pl-2">
                          {ex.description}
                        </p>

                        <div className="space-y-2 pl-2 border-l border-white/5 ml-1">
                          {ex.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                              <CheckCircle2 size={12} className="text-orange-500/70 mt-0.5 shrink-0" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>

                        {isActive && ex.link && ex.link !== '#' && (
                          <div className="mt-5 pl-2 pt-4 border-t border-white/5 flex">
                            <a
                              href={ex.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-mono text-orange-400 hover:text-white flex items-center gap-2 transition-colors"
                            >
                              VER PROYECTO EN VIVO <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-500 text-sm italic">
                  ¿Tienes un desafío similar?
                </p>
                <a
                  href="https://wa.me/573013460118"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeProject}
                  className="flex items-center gap-2 px-6 py-3 bg-tech-orange text-white border border-orange-500/20 rounded-full font-medium hover:bg-orange-500 hover:text-black transition-all duration-300 text-sm"
                >
                  Iniciar Conversación <ArrowRight size={16} />
                </a>
              </div>

            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}