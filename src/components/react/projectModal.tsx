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
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es pantalla móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check inicial
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bloqueo de scroll "a prueba de balas"
  useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      setActiveExampleIndex(null);
      setCurrentSlide(0);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
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

  const showDescription = isMobile ? activeExampleIndex === null : true;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-xl touch-none h-full"
        onClick={closeProject}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-7xl md:h-[90vh] bg-[#0a0a0a] border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >

          <button
            onClick={closeProject}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 rounded-full bg-black/40 backdrop-blur-lg hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 group active:scale-95"
          >
            <X size={20} className="md:group-hover:rotate-90 transition-transform duration-300" />
          </button>

         <div className="w-full md:w-[50%] h-[40dvh] md:h-full relative bg-black shrink-0 border-b md:border-b-0 md:border-r border-white/10 group/slider flex items-center justify-center overflow-hidden">
            <AnimatePresence mode='wait'>
              <motion.div
                key={`${activeExampleIndex}-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
              >
                {activeMediaItem?.type === 'video' ? (
                  <video 
                    src={activeMediaItem.url} 
                    className="w-full h-auto max-h-full object-contain shadow-2xl" 
                    autoPlay 
                    muted 
                    loop
                    playsInline 
                  />
                ) : (
                  <img 
                    src={activeMediaItem?.url} 
                    alt={project.title} 
                    className="w-full h-auto max-h-full object-contain shadow-2xl" 
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {hasMultipleSlides && (
              <>
                <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-all z-20">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-all z-20">
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {currentMedia?.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-6 md:w-8 bg-white" : "w-1.5 md:w-2 bg-white/30"}`} />
                  ))}
                </div>
              </>
            )}

            <div className="absolute bottom-8 left-5 md:bottom-12 md:left-12 max-w-xl z-10 pointer-events-none pr-4">
              <AnimatePresence mode='wait'>
                {activeExampleIndex === null ? (
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="main-title">
                    <span className="text-tech-orange font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 block drop-shadow-md">Área de Expertiz</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg">{project.title}</h2>
                  </motion.div>
                ) : (
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="project-title">
                    <span className="text-tech-gold font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 flex items-center gap-2 drop-shadow-md"><Sparkles size={12} /> Proyecto Seleccionado</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">{project.examples[activeExampleIndex].name}</h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col overflow-hidden relative bg-[#0a0a0a] p-5 md:p-10">
            <AnimatePresence initial={false}>
              {showDescription && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginBottom: 20 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className="border-b border-white/5 overflow-hidden shrink-0"
                >
                  <h3 className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-widest mb-3">
                    <Layers size={14} /> Mi Enfoque
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed pb-4">
                    {project.shortDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col flex-1 overflow-hidden min-h-fit">
              <h3 className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-widest mb-3 shrink-0">
                <Sparkles size={14} /> Casos de Éxito
              </h3>

              <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                {project.examples && project.examples.map((ex, index) => {
                  const isActive = activeExampleIndex === index;

                  return (
                    <motion.button
                      layout="position"
                      key={index}
                      onClick={() => setActiveExampleIndex(isActive ? null : index)}
                      className={`w-full max-h-fit text-left flex flex-col rounded-2xl border transition-colors duration-300 relative 
                        ${isActive
                          ? "flex-1 pb-8 bg-white/[0.05] border-tech-orange/50 shadow-[0_0_20px_-10px_rgba(255,100,0,0.15)]"
                          : "shrink-0 bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                        }`}
                    >
                      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-tech-orange to-tech-gold z-10" />}

                      <div className="flex justify-between items-center p-4 shrink-0">
                        <h4 className={`text-sm md:text-base font-semibold pr-4 truncate ${isActive ? "text-white" : "text-gray-300"}`}>
                          {ex.name}
                        </h4>
                        {isActive ? (
                          <span className="text-tech-orange animate-pulse shrink-0"><Play size={16} fill="currentColor" /></span>
                        ) : (
                          <span className="text-white/20 shrink-0"><ChevronRight size={16} /></span>
                        )}
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 overflow-y-auto px-4 custom-scrollbar"
                          >
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light">
                              {ex.description}
                            </p>
                            {!isMobile &&
                              <div className="space-y-2 border-l border-white/5 ml-1 pl-2">
                                {ex.outcomes.map((outcome, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-[10px] md:text-xs text-gray-500">
                                    <CheckCircle2 size={12} className="text-tech-orange/70 mt-0.5 shrink-0" />
                                    <span>{outcome}</span>
                                  </div>
                                ))}
                              </div>
                            }
                            {ex.link && ex.link !== '#' && (
                              <div className="pt-1 lg:pt-5 border-white/5">
                                <a
                                  href={ex.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex justify-center items-center gap-2 w-full md:w-auto px-5 py-2.5 bg-tech-gold/10 hover:bg-tech-gold text-tech-gold hover:text-black border border-tech-gold/30 rounded-xl text-xs font-bold font-mono tracking-wider transition-all duration-300 shadow-[0_0_15px_-5px_rgba(255,184,0,0.2)] hover:shadow-[0_0_20px_0_rgba(255,184,0,0.4)]"
                                >
                                  VER PROYECTO EN VIVO <ExternalLink size={14} />
                                </a>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 shrink-0">
              <p className='text-gray-400 text-xs md:text-sm leading-relaxed mb-4 font-light inline-block w-full text-center'>¿Tienes una idea similar?</p>
              <a
                href="https://wa.me/573013460118"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeProject}
                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-tech-orange hover:bg-orange-600 text-white rounded-full font-medium active:scale-95 transition-all text-xs md:text-sm shadow-lg"
              >
                Iniciar Conversación <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}