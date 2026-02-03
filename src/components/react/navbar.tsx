import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Mail, Github, Linkedin, FileText, Download } from 'lucide-react';
// import linkedin from '../../assets/linkedin.svg'; // Si prefieres tu SVG, úsalo, aquí uso Lucide por defecto
import { CONTENT } from '../../constants';

// --- CONFIGURACIÓN DE TUS ENLACES AQUÍ ---
const LINKS = {
  github: "https://github.com/tu-usuario",
  linkedin: "https://linkedin.com/in/tu-usuario",
  email: "mailto:tu@email.com",
  cv: "/files/mi-cv-final.pdf" // Ruta a tu archivo PDF en la carpeta public
};

interface NavbarProps {
  currentLang: 'es' | 'en';
  currentPath: string;
}

const Navbar = ({ currentLang, currentPath }: NavbarProps) => {
  const content = CONTENT[currentLang];

  const targetLang = currentLang === 'es' ? 'en' : 'es';
  const targetHref = currentPath.replace(`/${currentLang}`, `/${targetLang}`);
  const label = targetLang.toUpperCase();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: content.nav.projects, href: '#projects' },
    { name: content.nav.expertise, href: '#services' },
    { name: content.nav.journey, href: '#journey' },
    { name: content.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        layout
        transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
        className={`fixed z-50 flex items-center bg-tech-surface/90 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/50 overflow-hidden
        ${isScrolled
            ? 'top-0 left-0 right-0 w-full h-auto rounded-none justify-between py-3 px-6 md:px-12 border-b border-white/10'
            : 'bottom-1/12 lg:bottom-1/5 xl:bottom-1/8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-1/10 2xl:right-1/5 w-1/2 lg:w-auto h-20 lg:h-auto rounded-full justify-center py-2.5 px-5 gap-4'
          }`}
      >

        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-8"
          >
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              href={`/${currentLang}`}
              className="left-12 z-60 text-3xl font-bold font-serif tracking-tighter text-tech-text-primary mix-blend-difference"
            >
              Javier Gonzalez Ch<span className="text-tech-gold">.</span>
            </motion.a>

          </motion.div>
        )}
        {!mobileMenuOpen && (
          <div className={`flex items-center gap-3 `}>
            <SocialLink href={LINKS.github} Icon={Github} label="GitHub" />
            <SocialLink href={LINKS.linkedin} Icon={Linkedin} label="LinkedIn" />
            <SocialLink href={LINKS.email} Icon={Mail} label="Email" />

            <div className="w-px h-4 bg-white/10 mx-1" />

            <a
              href={LINKS.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-tech-gold/10 border border-tech-gold/30 hover:bg-tech-gold text-tech-gold hover:text-tech-bg transition-all duration-300"
              title="Download Resume"
            >
              <span className="text-[10px] font-mono font-bold tracking-wider">CV</span>
              <Download size={12} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>)}
        {isScrolled && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-tech-text-primary hover:text-tech-orange transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>)}

        {isScrolled && (
          <div className="hidden lg:flex items-center gap-4 z-10">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs font-medium text-tech-text-secondary hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tech-orange opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={targetHref}
              className="flex items-center gap-2 text-xs font-mono text-tech-text-secondary hover:text-tech-gold transition-colors"
            >
              <Globe size={14} />
              <span className={`hidden ${isScrolled ? 'sm:inline' : ''}`}>{label}</span>
            </a>


          </div>)}
      </motion.nav>

      {/* 3. MENÚ MÓVIL (Sin cambios lógicos, solo estéticos) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tech-bg/95 backdrop-blur-lg z-40 md:hidden flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

            <ul className="flex flex-col gap-8 text-center mb-12 relative z-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif font-bold text-white hover:text-tech-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Redes en móvil */}
            <div className="flex gap-6 relative z-10">
              <MobileSocialLink href={LINKS.github} Icon={Github} />
              <MobileSocialLink href={LINKS.linkedin} Icon={Linkedin} />
              <MobileSocialLink href={LINKS.email} Icon={Mail} />
            </div>

            {/* CV en móvil */}
            <a href={LINKS.cv} className="mt-12 relative z-10 px-8 py-3 bg-tech-gold text-tech-bg font-bold rounded-full flex items-center gap-2">
              Download CV <Download size={18} />
            </a>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente pequeño para los iconos del Dock/Header
const SocialLink = ({ href, Icon, label }: { href: string, Icon: any, label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-tech-text-secondary hover:text-tech-orange transition-colors p-1"
    title={label}
  >
    <Icon size={25} />
  </a>
);

// Componente más grande para el menú móvil
const MobileSocialLink = ({ href, Icon }: { href: string, Icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-tech-text-secondary hover:bg-tech-orange hover:text-white transition-all"
  >
    <Icon size={20} />
  </a>
);

export default Navbar;