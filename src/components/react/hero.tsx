import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { language } from '../../store/languageStore';
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
    <section className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden bg-tech-bg text-tech-text-primary px-6 lg:px-12">
      <motion.div
        style={{ y: heroImageY, opacity: heroImageOpacity }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
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
        <div className="absolute inset-0 bg-linear-to-r from-tech-bg via-tech-bg/30 to-transparent lg:hidden" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex lg:hidden items-center gap-2 px-3 py-1 rounded-full border border-tech-gold/30 bg-tech-gold/5 text-tech-gold text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] backdrop-blur-md"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-tech-gold"></span>
        </span>
        {content.role}
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 md:gap-8 order-2 lg:order-1"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl xl:text-7xl font-bold leading-none tracking-tight text-white"
          >
            {content.greeting} <br />
            <span className="bg-clip-text text-4xl md:text-6xl xl:text-7xl font-serif text-transparent bg-linear-to-r from-tech-gold via-tech-orange to-tech-gold bg-size-[200%_auto] animate-gradient-x py-1">
              {content.role}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-xl text-tech-text-secondary max-w-xl font-light leading-relaxed"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-row gap-4 pt-2"
          >
            <a href="#projects" className="group relative px-6 py-3 bg-tech-orange text-white text-sm md:text-base rounded-full font-sans font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-glow-orange flex items-center gap-2">
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2">
                {content.ctaExplore} <ArrowRight size={16} />
              </span>
            </a>
            <a href="#contact" className="group px-6 py-3 text-sm md:text-base text-tech-text-secondary hover:text-white border border-white/10 hover:border-tech-gold/50 hover:bg-white/5 rounded-full transition-all flex items-center gap-2 font-sans font-medium">
              {content.ctaContact} <Mail size={16} className="text-tech-gold group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: portraitY, opacity: portraitOpacity }}
          className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="absolute inset-0 bg-tech-orange/20 blur-[80px] rounded-full transform translate-y-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[550px] overflow-hidden"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-10 lg:left-1/5 items-center gap-4"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} className="text-tech-gold" />
        </motion.div>
        <span className="text-sm text-white uppercase tracking-widest font-mono ">
          Desliza para conocer mas
        </span>
      </motion.div>
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none"
      ></div>
    </section>
  );
}