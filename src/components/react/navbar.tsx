import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Mail, Github, Linkedin, Download } from 'lucide-react';
import { CONTENT } from '../../constants';

const LINKS = {
  github: "https://github.com/JavierGonzalezCh",
  linkedin: "https://www.linkedin.com/in/javiergonzalezch",
  email: "mailto:javiergo.2502@gmail.com",
  cv: "/files/Javier Gonzalez CV Desarrollador FullStack.pdf"
};

interface NavbarProps {
  currentLang: 'es';
  currentPath: string;
}

export default function Navbar({ currentLang, currentPath }: NavbarProps) {
  const content = CONTENT[currentLang];

  const targetLang = currentLang === 'es' ? 'en' : 'es';
  const targetHref = currentPath.replace(`/${currentLang}`, `/${targetLang}`);
  const label = targetLang.toUpperCase();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      setIsScrolled(window.scrollY > 100);
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition);
    return () => window.removeEventListener('scroll', checkPosition);
  }, []);

  const navLinks = [
    { name: content.nav.home, href: '' },
    { name: content.nav.projects, href: '#projects' },
    { name: content.nav.expertise, href: '#stack' },
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
            : 'top-0 left-0 right-0 w-full h-auto rounded-none justify-between py-3 px-6 md:px-12 border-b border-white/10 lg:top-auto lg:bottom-1/5 xl:bottom-1/8 lg:left-auto lg:right-1/10 2xl:right-1/5 lg:w-auto lg:rounded-full lg:justify-center lg:py-2.5 lg:px-5 gap-4'
          }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center gap-8 ${!isScrolled ? 'lg:hidden' : ''}`}
        >
          <a
            href={`/`}
            className="left-12 z-60 text-3xl items-center font-bold font-serif tracking-tighter text-tech-text-primary mix-blend-difference flex flex-row gap-2"
          >
            <img src="/favicon.png" alt="Javier Gonzalez Chima" className='w-12 h-12' />
            Javier Gonzalez Ch<span className="text-tech-gold">.</span>
          </a>
        </motion.div>

        <div className={`hidden lg:flex items-center gap-3`}>
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
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -mr-2 text-tech-text-primary hover:text-tech-orange transition-colors flex items-center justify-center"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <div className={`hidden ${isScrolled ? 'lg:flex' : 'lg:hidden'} items-center gap-4 z-10`}>
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
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tech-bg/10 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-center px-8 sm:px-12"
          >
            <ul className="flex flex-col gap-8 relative z-10 w-full max-w-sm mx-auto">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-4xl sm:text-5xl font-serif font-bold text-white active:text-tech-gold active:scale-95 transition-all duration-200 origin-left"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex flex-col gap-6 relative z-10 w-full max-w-sm mx-auto"
            >
              <div className="h-px w-full bg-white/10" />

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <MobileSocialLink href={LINKS.github} Icon={Github} />
                  <MobileSocialLink href={LINKS.linkedin} Icon={Linkedin} />
                  <MobileSocialLink href={LINKS.email} Icon={Mail} />
                </div>

                <a
                  href={LINKS.cv}
                  className="px-6 py-3 bg-tech-gold/10 border border-tech-gold/30 text-tech-gold active:bg-tech-gold active:text-tech-bg font-bold rounded-full flex items-center gap-2 transition-all duration-200 text-md active:scale-95"
                >
                  CV <Download size={20} />
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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

const MobileSocialLink = ({ href, Icon }: { href: string, Icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-tech-text-secondary active:bg-tech-orange active:text-white active:scale-90 transition-all duration-200"
  >
    <Icon size={20} />
  </a>
);