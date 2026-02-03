import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { X, ExternalLink, Github, Layers, Cpu, TrendingUp, CheckCircle2, Box } from 'lucide-react';
import { selectedProject, closeProject } from '../../store/projectStore';
import type { Content } from '../../types';

// Definimos las props para las etiquetas de texto (traducciones)
interface Props {
  labels: Content['projects']['labels'];
}

export default function ProjectModal({ labels }: Props) {
  // 1. Conexión al Store
  const project = useStore(selectedProject);

  // 2. Bloqueo de Scroll del Body
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  // Si no hay proyecto seleccionado, no renderizamos nada (ni siquiera el AnimatePresence envuelve null)
  // Pero AnimatePresence DEBE envolver la condición.
  
  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm"
          onClick={closeProject} // Cierra al hacer clic en el fondo oscuro
        >
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
            className="relative w-full max-w-6xl h-full md:h-[90vh] bg-tech-gray-charcoal/95 backdrop-blur-2xl border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            
            {/* === BOTÓN CERRAR FLOTANTE === */}
            <button 
              onClick={closeProject}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-tech-gold text-white border border-white/10 transition-colors group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* === COLUMNA IZQUIERDA: IMAGEN === */}
            <div className="w-full md:w-[45%] h-64 md:h-full relative bg-black shrink-0">
              {/* Imagen Principal */}
              <img 
                src={project.images[0]} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Gradiente Overlay para integrar la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-tech-gray-charcoal via-transparent to-transparent opacity-90" />
              
              {/* Info superpuesta en la imagen (Solo Desktop) */}
              <div className="absolute bottom-0 left-0 p-8 hidden md:block">
                 <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs font-mono bg-black/50 border border-white/20 text-white/80 px-2 py-1 rounded backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                 </div>
              </div>
            </div>

            {/* === COLUMNA DERECHA: CONTENIDO === */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <div className="p-8 md:p-12 pb-24">
                
                {/* 1. Header del Proyecto */}
                <div className="mb-12">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-gold/10 border border-tech-gold/20 text-tech-gold text-xs font-mono tracking-widest uppercase mb-6">
                      <Box size={12} />
                      Case Study
                   </div>
                   
                   <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight tracking-tighter">
                     {project.title}
                   </h2>
                   
                   <p className="text-xl text-tech-text-secondary font-light leading-relaxed">
                     {project.shortDesc}
                   </p>

                   {/* Botones de acción (Demo / Repo) */}
                   <div className="flex gap-4 mt-8">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-tech-gold text-white rounded-full font-medium hover:bg-tech-gold-dark transition-colors shadow-lg shadow-tech-gold/20">
                           <ExternalLink size={18} /> Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                           <Github size={18} /> Code
                        </a>
                      )}
                   </div>
                </div>

                {/* 2. Grid de Detalles (Problema / Solución) */}
                <div className="grid grid-cols-1 gap-12 mb-12 border-t border-white/5 pt-12">
                   
                   {/* El Problema */}
                   <div>
                      <h3 className="flex items-center gap-2 text-tech-gold text-xs font-mono uppercase tracking-widest mb-4">
                         <Layers size={14} /> {labels.problem}
                      </h3>
                      <p className="text-tech-text-primary/90 leading-relaxed">
                         {project.problem}
                      </p>
                   </div>

                   {/* La Arquitectura */}
                   <div>
                      <h3 className="flex items-center gap-2 text-tech-gold text-xs font-mono uppercase tracking-widest mb-4">
                         <Cpu size={14} /> {labels.architecture}
                      </h3>
                      <p className="text-tech-text-secondary leading-relaxed">
                         {project.architecture}
                      </p>
                   </div>
                </div>

                {/* 3. Highlights & Resultados */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/5">
                   <h3 className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
                      <TrendingUp size={14} /> {labels.outcome}
                   </h3>
                   
                   <p className="text-2xl font-serif text-white mb-8">
                      {project.outcome}
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                           <CheckCircle2 size={16} className="text-tech-gold mt-1 shrink-0" />
                           <span className="text-sm text-tech-text-secondary">{highlight}</span>
                        </div>
                      ))}
                   </div>
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}