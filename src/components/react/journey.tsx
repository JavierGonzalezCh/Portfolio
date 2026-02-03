import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Content } from '../../types';

interface JourneyProps {
  content: Content;
}

const Journey: React.FC<JourneyProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Scroll logic para animaciones de entrada
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const steps = document.querySelectorAll('.journey-step');
      const windowCenter = window.innerHeight / 2;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        // Ajustamos la detección para que sea más indulgente
        if (rect.top <= windowCenter + 100 && rect.bottom >= windowCenter) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="journey" ref={containerRef} className="relative bg-tech-blue-primary">
      
      {/* --- 1. PUENTE DE TRANSICIÓN (NUEVO) --- */}
      {/* Este gradiente hace que el corte con el Hero sea invisible */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#050505] to-transparent z-30 pointer-events-none" />
      
      {/* Línea conectora que viene del Hero */}
      <div className="absolute top-0 left-6 md:left-24 h-32 w-px bg-gradient-to-b from-transparent via-tech-gold/50 to-tech-gold/20 z-30" />


      {/* --- 2. FONDO STICKY --- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, filter: "blur(10px)" }} // Blur para transición onírica
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Imagen de fondo */}
            <motion.img 
              src={content.journey.milestones[activeStep].image}
              alt={content.journey.milestones[activeStep].title}
              className="w-full h-full object-cover opacity-20" // Opacidad reducida para mejor lectura
              animate={{ scale: [1, 1.1] }}
              transition={{ duration: 15, ease: "linear" }}
            />
            
            {/* Capas de color para unificar con el tema */}
            <div className="absolute inset-0 bg-tech-blue-primary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-tech-blue-primary via-transparent to-transparent" />
            
            {/* Grid sutil sobre la imagen (continuidad con Hero) */}
            <div className="absolute inset-0  opacity-10 bg-[length:30px_30px]" />
          </motion.div>
        </AnimatePresence>

        {/* Título Estático */}
        <div className="absolute top-24 left-6 md:left-24 z-20">
             <motion.div 
               style={{ opacity, scale }} // Animamos la entrada del título
               className="flex items-center gap-4"
             >
                <span className="w-12 h-px bg-tech-gold/50"></span>
                <h2 className="text-sm font-mono text-tech-gold uppercase tracking-[0.3em]">
                  {content.journey.title}
                </h2>
            </motion.div>
        </div>
      </div>

      {/* --- 3. CONTENIDO SCROLLEABLE --- */}
      {/* Ajuste importante: Padding top extra para que el primer elemento no choque */}
      <div className="relative z-10 -mt-[100vh] pb-[20vh] pt-[10vh]"> 
        {content.journey.milestones.map((milestone, index) => (
          <div 
            key={milestone.id} 
            className="journey-step min-h-[80vh] flex items-center px-6 md:px-24 py-12" // Reduje min-h-screen para mejor ritmo
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px", amount: 0.4 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0 }}
              className={`max-w-xl relative group`}
            >
              {/* Línea conectora vertical lateral */}
              <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-px bg-tech-text-secondary/10 group-hover:bg-tech-gold/30 transition-colors duration-500">
                  {activeStep === index && (
                      <motion.div 
                          layoutId="activeIndicator"
                          className="absolute top-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-tech-gold rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                      />
                  )}
              </div>

              <div className={`p-8 md:p-10 rounded-2xl border backdrop-blur-md transition-all duration-500 ${
                activeStep === index 
                  ? 'bg-tech-gray-card/90 border-tech-gold/40 translate-x-2 shadow-2xl shadow-black/50' 
                  : 'bg-tech-gray-card/40 border-white/5 opacity-40 hover:opacity-60 grayscale'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-5xl font-serif font-bold transition-colors duration-500 ${
                      activeStep === index ? 'text-tech-gold' : 'text-white/10'
                  }`}>
                    0{index + 1}
                  </span>
                  <div className={`h-px flex-1 transition-all duration-500 ${
                      activeStep === index ? 'bg-tech-gold/50' : 'bg-white/10'
                  }`} />
                  <span className="font-mono text-xs text-tech-text-secondary uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                    {milestone.year}
                  </span>
                </div>

                <h3 className="text-3xl font-medium mb-4 text-tech-text-primary">
                  {milestone.title}
                </h3>
                
                <p className="text-base text-tech-text-secondary/80 leading-relaxed font-light">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Journey;