import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Layers, Scale, Rocket, CheckCircle2 } from 'lucide-react';

const JOURNEY_MILESTONES = [
  {
    id: 1,
    year: "El Origen",
    title: "Curiosidad Técnica",
    subtitle: "Entender antes que construir",
    description:
      "Mi camino comenzó con preguntas, no con frameworks. Me obsesioné con comprender cómo funcionan realmente los sistemas: lógica, estructuras de datos y pensamiento algorítmico. Aprendí que programar no es escribir código, sino modelar problemas con claridad.",
    values: [
      "Pensamiento Lógico",
      "Fundamentos Sólidos",
      "Mentalidad Autodidacta",
    ],
    icon: Lightbulb,
    image: "/journey/journey-1.png"
  },
  {
    id: 2,
    year: "Evolución",
    title: "Full Stack Real",
    subtitle: "De la interfaz al sistema completo",
    description:
      "Entendí que una buena UI necesita una arquitectura sólida detrás. Me enfoqué en backend, bases de datos y nube, aprendiendo a visualizar el recorrido completo de cada solicitud. Dejé de construir pantallas aisladas y empecé a diseñar soluciones integrales.",
    values: [
      "Arquitectura End-to-End",
      "Database Design",
      "Cloud",
    ],
    icon: Layers,
    image: "/journey/journey-2.png"
  },
  {
    id: 3,
    year: "Madurez",
    title: "Arquitectura & Escalabilidad",
    subtitle: "Pensar en el largo plazo",
    description:
      "Hacer que funcione es solo el comienzo. Mi enfoque evolucionó hacia Clean Architecture, mantenibilidad y escalabilidad. Empecé a diseñar sistemas preparados para crecer sin comprometer calidad ni rendimiento.",
    values: [
      "Clean Code",
      "Escalabilidad",
      "Performance",
    ],
    icon: Scale,
    image: "/journey/journey-3.png"
  },
  {
    id: 4,
    year: "Presente",
    title: "Impacto & IA",
    subtitle: "Ingeniería alineada al negocio",
    description:
      "Hoy construyo soluciones que impactan métricas reales. Integro automatización e IA de forma estratégica, buscando optimizar procesos y generar ventaja competitiva. Tecnología con propósito, no solo implementación.",
    values: [
      "Visión de Producto",
      "Integración IA",
      "Liderazgo Técnico",
    ],
    icon: Rocket,
    image: "/journey/journey-4.png"
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.05], [20, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const steps = document.querySelectorAll('.journey-step');
      
      const triggerPoint = isMobile ? window.innerHeight * 0.25 : window.innerHeight * 0.5;
      let foundActive = false;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        
        const topLimit = triggerPoint - 150;
        const bottomLimit = triggerPoint + 150;

        if (rect.top <= bottomLimit && rect.bottom >= topLimit) {
          setActiveStep(index);
          foundActive = true;
        }
      });

      if (!foundActive) {
        const firstStep = steps[0]?.getBoundingClientRect();
        if (firstStep && firstStep.top > triggerPoint) {
           setActiveStep(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section id="journey" ref={containerRef} className="relative bg-[#0a0a0a]">
      <div className="fixed top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-20 pointer-events-none" />
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden z-0 bg-[#0a0a0a]">
        <AnimatePresence mode="wait">
          {activeStep !== null && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={JOURNEY_MILESTONES[activeStep].image}
                alt="Background"
                className="absolute inset-0 top-1/4 md:top-0 w-full h-full object-cover opacity-60 filter blur-[1px]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="sticky top-0 z-30 pointer-events-none -mt-[100dvh] h-[100dvh] overflow-hidden w-full">
        <div className="absolute top-0 left-0 pl-6 md:pl-24 w-full bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pb-10 pt-24">
          <motion.div style={{ y: titleY }} className="flex flex-col gap-2 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="w-8 md:w-12 h-px bg-tech-gold"></span>
              <span className="text-[10px] md:text-sm font-mono text-tech-gold uppercase tracking-[0.3em]">
                Mi Evolución
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mt-2 drop-shadow-2xl pb-3">
              Trayectoría <span
                className="bg-clip-text bg-gradient-to-r from-tech-gold via-tech-orange to-tech-gold bg-[length:200%_auto] animate-gradient-x py-1"
              >
                Profesional
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto pt-[40vh] pb-[30vh] md:pt-[30vh] md:pb-[10vh]">
        {JOURNEY_MILESTONES.map((milestone) => {
          const Icon = milestone.icon;
          return (
            <div
              key={milestone.id}
              className="journey-step min-h-[70vh] md:min-h-[80vh] flex items-center px-4 md:px-24 mb-[80vh] md:mb-0 last:mb-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-30% 0px -30% 0px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0 }}
                className="w-full max-w-2xl relative"
              >
                <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block">
                  <motion.div
                    initial={false}
                    animate={{
                      height: "100%",
                      opacity: 1
                    }}
                    className="w-[2px] bg-gradient-to-b from-tech-gold to-tech-orange shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                  />
                </div>
                
                <div className="relative p-6 md:px-10 md:py-8 rounded-3xl border transition-all duration-700 bg-[#0a0a0a]/85 border-tech-gold/20 hover:border-tech-gold/40 backdrop-blur-md md:translate-x-4 shadow-2xl shadow-black/50">
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className="pr-4">
                      <span className="text-tech-gold/70 font-mono text-[10px] uppercase tracking-widest mb-1 block">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl md:text-3xl font-bold font-serif text-white mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm md:text-lg italic font-serif text-tech-orange">
                        {milestone.subtitle}
                      </p>
                    </div>

                    <div className="p-3 md:p-4 rounded-2xl border transition-colors duration-500 bg-gradient-to-br from-tech-gold/10 to-transparent border-tech-gold/30 text-tech-gold shrink-0">
                      <Icon size={24} className="md:w-8 md:h-8" />
                    </div>
                  </div>
                  
                  <p className="text-tech-text-secondary leading-relaxed mb-6 text-sm md:text-base font-light">
                    {milestone.description}
                  </p>
                  
                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2 font-mono">
                      <CheckCircle2 size={12} className="text-tech-gold" /> Competencias Clave
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {milestone.values.map((val) => (
                        <span
                          key={val}
                          className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium border transition-colors duration-500 bg-tech-gold/5 text-gray-300 border-tech-gold/20"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-30 pointer-events-none" />
    </section>
  );
}