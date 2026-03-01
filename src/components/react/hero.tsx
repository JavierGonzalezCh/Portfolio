import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTENT } from '../../constants';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HeroContent {
  greeting: string;
  role: string;
  description: string;
  ctaExplore: string;
  ctaContact: string;
}

export default function Hero() {
  const content = CONTENT['es'].hero as HeroContent;
  const { scrollY } = useScroll();

  const videoRef = useRef<HTMLVideoElement>(null);

  const heroImageY = useTransform(scrollY, [0, 1000], [0, 150]);
  const heroImageOpacity = useTransform(scrollY, [0, 400], [0.4, 0]);

  const portraitY = useTransform(scrollY, [0, 500], [0, 50]);
  const portraitOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="min-h-[100dvh] w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden bg-tech-bg text-tech-text-primary px-6 lg:px-12 pt-24 pb-24 lg:pt-0 lg:pb-0">
      <motion.div
        style={{ y: heroImageY, opacity: heroImageOpacity }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="hero-bg.png"
          alt="Background"
          className="lg:hidden w-full h-full object-cover"
          loading="eager"
        />
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-tech-bg via-tech-bg/30 to-tech-bg hidden lg:block" />
        <div className="absolute inset-0 bg-linear-to-b from-tech-bg/10 via-tech-bg/30 to-tech-bg/80 lg:hidden" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center">

        <motion.div className="mt-7 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 order-2 lg:order-1 w-full px-2 sm:px-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
          >
            {content.greeting} <br />
            <span className="block mt-2 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-serif text-transparent bg-linear-to-r from-tech-gold via-tech-orange to-tech-gold bg-[length:200%_auto] animate-gradient-x pb-2">
              {content.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-xl text-tech-text-secondary max-w-xl font-light leading-relaxed px-4 lg:px-0"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <a href="#projects" className="w-full sm:w-auto justify-center group relative px-8 py-4 lg:px-6 lg:py-3 bg-tech-orange text-white text-base lg:text-base rounded-full font-sans font-medium overflow-hidden transition-all active:scale-95 lg:hover:scale-105 hover:shadow-glow-orange flex items-center gap-2">
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                {content.ctaExplore} <ArrowRight size={18} />
              </span>
            </a>
            <a href="#contact" className="w-full sm:w-auto justify-center group px-8 py-4 lg:px-6 lg:py-3 text-base lg:text-base text-tech-text-secondary hover:text-white active:bg-white/10 border border-white/10 hover:border-tech-gold/50 rounded-full transition-all flex items-center gap-2 font-sans font-medium active:scale-95">
              {content.ctaContact} <Mail size={18} className="text-tech-gold lg:group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: portraitY, opacity: portraitOpacity }}
          className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end hidden lg:flex"
        >
          <div className="absolute inset-0 bg-tech-orange/20 blur-[80px] rounded-full transform translate-y-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[550px] overflow-hidden"
          >
            <img
              src="/hero.png"
              alt="Profile"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />

            <div className="absolute inset-0 border border-tech-gold/20 rounded-t-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-tech-orange/50 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:bottom-10 lg:left-1/5 lg:translate-x-0 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 z-40 group cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-2 rounded-full bg-white/5 border border-white/10 group-active:bg-tech-orange group-active:border-tech-orange transition-colors"
        >
          <ChevronDown size={20} className="text-tech-gold group-active:text-white" />
        </motion.div>
        <span className="text-[10px] sm:text-xs lg:text-sm text-white/70 group-active:text-white uppercase tracking-widest font-mono transition-colors text-center">
          Desliza para conocer mas
        </span>
      </motion.a>

      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-tech-bg to-transparent z-30 pointer-events-none"
      ></div>
    </section>
  );
}