'use client';

import { Inter, Orbitron } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';

// --- FONTS ---
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ['latin'], variable: "--font-orbitron" });

// --- ANIMATION COMPONENTS ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- PROJECT DATA ---
const projects = [
    { id: 1, name: "LUXECAR", category: "Automotive", src: "/luxecar.jpg" },
    { id: 2, name: "PIZZERIA DIAMANTE", category: "Food & Beverage", src: "/pizzeria.jpg" },
    { id: 3, name: "CONSTRUCTIONS EDILI", category: "Architecture", src: "/construction.jpg" },
];

// --- SCROLL COLOR LOGIC ---
// Define Colors for each scroll section: Black -> Dark Gray -> Electric Blue -> Black
const colors = ["#000000", "#1A1A1A", "#0044EE", "#000000"];

// --- COOKIE BANNER COMPONENT ---
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if consent already given
    const consent = localStorage.getItem('nexora_consent');
    if (!consent) {
      // Show banner after 2 second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nexora_consent', 'accepted');
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem('nexora_consent', 'dismissed');
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 bg-white text-black p-4 rounded-lg shadow-2xl max-w-sm"
        >
          <p className="text-sm font-mono mb-4">
            Questo sito utilizza cookie per migliorare l'esperienza. Continuando a navigare, accetti il nostro utilizzo dei cookie.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-[#0044EE] transition-colors"
            >
              Accept
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-black text-black text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Ref for the main container to track scroll
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // The scroll transformation logic (0 to 1 based on viewport scroll)
  // We divide the scroll into 3 segments to match the 4 colors (3 transitions)
  // Black (Hero) -> Dark Gray (Services) -> Electric Blue (Projects) -> Black (Contact)
  const backgroundColor = useTransform(scrollYProgress, 
    [0, 0.33, 0.66, 1], // Input scroll position thresholds (0% to 100%)
    colors 
  );


  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor }} 
      className={`min-h-screen ${inter.variable} ${orbitron.variable} font-sans selection:bg-[#0044EE] selection:text-white`}
    >
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white">
        {/* Burger Menu Button (Left) */}
        <button onClick={toggleMenu} className="flex items-center gap-3 group">
          <div className="p-3 border border-white/20 rounded-full hover:border-[#0044EE] hover:bg-[#0044EE] transition-all duration-300">
            <Menu className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block text-xs font-bold font-orbitron uppercase tracking-widest text-white">Menu</span>
        </button>

        {/* CTA Button (Right) */}
        <Link 
            href="https://wa.me/393533685270" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-[#0044EE] hover:text-white transition-all duration-300"
        >
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Contattaci</span>
        </Link>
      </nav>

      {/* --- MENU OVERLAY --- (Reusing old Nexora structure) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center"
          >
            <button onClick={toggleMenu} className="absolute top-8 left-6 p-3 border border-white/20 rounded-full hover:border-[#FF5F56] transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
             <div className="flex flex-col gap-6 text-center">
                {['Home', 'Servizi', 'Progetti', 'Contatti'].map((link, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}>
                        <Link href={`#${link.toLowerCase()}`} onClick={toggleMenu} className="text-5xl font-bold font-orbitron uppercase text-white hover:text-[#0044EE] transition-colors">
                            {link}
                        </Link>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- SECTION 1: HERO (0% - 33% Scroll) --- */}
      <section id="home" className="h-[100vh] w-full flex flex-col justify-center items-center text-white p-6 relative overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                  <source src="/hero.mp4" type="video/mp4" />
              </video>
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
              {/* NEXORA Title with Staggered Reveal */}
              <motion.h1 
                  className="text-6xl md:text-9xl font-bold font-orbitron uppercase tracking-tighter leading-none drop-shadow-2xl"
                  initial="hidden"
                  animate="visible"
                  variants={{
                      visible: {
                          transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.2,
                          }
                      }
                  }}
              >
                  {Array.from("NEXORA").map((letter, index) => (
                      <motion.span
                          key={index}
                          className="inline-block"
                          variants={{
                              hidden: {
                                  opacity: 0,
                                  y: 100,
                                  clipPath: "inset(100% 0 0 0)",
                              },
                              visible: {
                                  opacity: 1,
                                  y: 0,
                                  clipPath: "inset(0% 0 0 0)",
                                  transition: {
                                      duration: 0.8,
                                      ease: [0.22, 1, 0.36, 1],
                                  }
                              }
                          }}
                      >
                          {letter}
                      </motion.span>
                  ))}
              </motion.h1>
              
              {/* Subtitle with Breathing Animation */}
              <motion.p 
                  className="text-xl md:text-2xl font-mono mt-8 tracking-widest drop-shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                      opacity: 1, 
                      y: 0,
                  }}
                  transition={{
                      opacity: { duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
                      y: { duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
                  }}
              >
                  <motion.span
                      animate={{
                          y: [0, -8, 0],
                      }}
                      transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.6,
                      }}
                  >
                      DEFINE YOUR DIGITAL FUTURE
                  </motion.span>
              </motion.p>
          </div>
          
          <div className="absolute bottom-12 text-sm font-mono text-white/70 z-10">Scroll Down ↓</div>
      </section>

      {/* --- SECTION 2: ABOUT/SERVICES (33% - 66% Scroll) --- */}
      <section id="servizi" className="min-h-[100vh] w-full flex flex-col justify-center items-center text-white p-6 md:p-12 relative">
          <div className="max-w-7xl mx-auto w-full">
              <Reveal>
                  <h2 className="text-4xl md:text-6xl font-bold font-orbitron uppercase tracking-tight mb-16 md:mb-24">
                      COSA FACCIAMO
                  </h2>
              </Reveal>

              {/* Services List */}
              <div className="flex flex-col w-full">
                  {[
                      { 
                          id: "01", 
                          title: "STRATEGY", 
                          description: "Audit, Digital Consulting, User Research" 
                      },
                      { 
                          id: "02", 
                          title: "BRANDING", 
                          description: "Visual Identity, Art Direction, Motion Design" 
                      },
                      { 
                          id: "03", 
                          title: "DEVELOPMENT", 
                          description: "Creative Web, E-Commerce, WebGL/3D" 
                      },
                      { 
                          id: "04", 
                          title: "MARKETING", 
                          description: "SEO/SEM, Social Strategy, Growth" 
                      }
                  ].map((service, index) => (
                      <Reveal key={service.id} delay={index * 0.1}>
                          <div className="group border-t border-white/20 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 hover:py-8 md:hover:py-10 transition-all duration-300 cursor-pointer">
                              {/* Number */}
                              <div className="flex-shrink-0">
                                  <span className="text-sm md:text-base font-orbitron text-white/60 group-hover:text-[#0044EE] transition-colors">
                                      {service.id}
                                  </span>
                              </div>

                              {/* Title */}
                              <div className="flex-1">
                                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold font-orbitron uppercase tracking-tight group-hover:text-[#0044EE] transition-colors">
                                      {service.title}
                                  </h3>
                              </div>

                              {/* Description */}
                              <div className="flex-1 md:max-w-md">
                                  <p className="text-sm md:text-base font-mono text-white/70 group-hover:text-white/90 transition-colors">
                                      {service.description}
                                  </p>
                              </div>

                              {/* Icon */}
                              <div className="flex-shrink-0">
                                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0044EE] group-hover:bg-[#0044EE] transition-all duration-300">
                                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                  </div>
                              </div>
                          </div>
                      </Reveal>
                  ))}
                  {/* Bottom border */}
                  <div className="border-t border-white/20 mt-4"></div>
              </div>
          </div>
      </section>

      {/* --- SECTION 3: PROJECTS (66% - 100% Scroll) --- */}
      <section id="progetti" className="min-h-[100vh] w-full text-white p-6 md:p-12 relative flex items-center justify-center">
          <div className="max-w-7xl mx-auto w-full">
              <Reveal>
                  <span className="text-sm font-mono uppercase tracking-widest text-white mb-12 block">( PROGETTI IN EVIDENZA )</span>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {projects.map((project, index) => (
                      <Reveal key={project.id} delay={index * 0.15}>
                          <div className="group cursor-pointer bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20 hover:border-[#0044EE] transition-all duration-300">
                              <div className="relative w-full aspect-[1908/863] overflow-hidden mb-4 bg-black rounded-lg">
                                  <Image 
                                      src={project.src} 
                                      alt={project.name}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                              </div>
                              <h3 className="text-2xl font-bold font-orbitron group-hover:text-[#0044EE] transition-colors">{project.name}</h3>
                              <p className="text-sm font-mono text-white/70">{project.category}</p>
                          </div>
                      </Reveal>
                  ))}
              </div>
          </div>
      </section>
      
      {/* --- SECTION 4: CONTACT / FOOTER (100% Scroll) --- */}
      <section id="contatti" className="h-[100vh] w-full flex flex-col justify-center items-center text-white p-6 relative">
           <div className="max-w-xl mx-auto text-center">
              <Reveal>
                 <h2 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight leading-tight">
                     READY <br />
                     <span className="text-[#0044EE]">TO START?</span>
                 </h2>
              </Reveal>
              <Reveal delay={0.2}>
                 <p className="text-xl font-mono mt-8 mb-12 text-white/80">
                    Siamo pronti per la vostra prossima sfida digitale.
                 </p>
              </Reveal>
              <Reveal delay={0.4}>
                  <Link 
                      href="https://wa.me/393533685270" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 bg-[#0044EE] text-white px-10 py-5 rounded-full text-lg font-bold font-mono hover:bg-white hover:text-black transition-all"
                  >
                    <span className="uppercase tracking-widest">Contattaci Ora</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
              </Reveal>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-black text-white border-t border-white/10">
          {/* Top Row: Massive NEXORA Text */}
          <div className="py-16 md:py-24 border-b border-white/10">
              <div className="text-center">
                  <h2 className="text-[12vw] md:text-[8vw] font-bold font-orbitron uppercase tracking-tighter leading-none">
                      NEXORA
                  </h2>
              </div>
          </div>

          {/* Grid: 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 p-6 md:p-12 border-b border-white/10">
              {/* 01 HEADQUARTERS */}
              <div>
                  <Reveal>
                      <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-4">
                          01 HEADQUARTERS
                      </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                      <a 
                          href="mailto:infonexora@gmail.com" 
                          className="text-sm font-mono text-white/80 hover:text-[#0044EE] transition-colors block"
                      >
                          infonexora@gmail.com
                      </a>
                  </Reveal>
              </div>

              {/* 02 SOCIALS */}
              <div>
                  <Reveal>
                      <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-4">
                          02 SOCIALS
                      </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                      <nav className="flex flex-col gap-3">
                          {[
                              { name: "Instagram", href: "#" },
                              { name: "LinkedIn", href: "#" },
                              { name: "Behance", href: "#" }
                          ].map((social, index) => (
                              <a
                                  key={social.name}
                                  href={social.href}
                                  className="text-sm font-mono text-white/80 hover:text-[#0044EE] transition-colors"
                              >
                                  {social.name}
                              </a>
                          ))}
                      </nav>
                  </Reveal>
              </div>

              {/* 03 SITEMAP */}
              <div>
                  <Reveal>
                      <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-4">
                          03 SITEMAP
                      </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                      <nav className="flex flex-col gap-3">
                          {[
                              { name: "Home", href: "#home" },
                              { name: "Servizi", href: "#servizi" },
                              { name: "Progetti", href: "#progetti" }
                          ].map((link, index) => (
                              <Link
                                  key={link.name}
                                  href={link.href}
                                  className="text-sm font-mono text-white/80 hover:text-[#0044EE] transition-colors"
                              >
                                  {link.name}
                              </Link>
                          ))}
                      </nav>
                  </Reveal>
              </div>

              {/* 04 LEGAL */}
              <div>
                  <Reveal>
                      <span className="text-xs font-mono uppercase tracking-widest text-white/60 block mb-4">
                          04 LEGAL
                      </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                      <nav className="flex flex-col gap-3">
                          {[
                              { name: "Privacy Policy", href: "#" },
                              { name: "Cookie Policy", href: "#" },
                              { name: "Credits", href: "#" }
                          ].map((link, index) => (
                              <a
                                  key={link.name}
                                  href={link.href}
                                  className="text-sm font-mono text-white/80 hover:text-[#0044EE] transition-colors"
                              >
                                  {link.name}
                              </a>
                          ))}
                      </nav>
                  </Reveal>
              </div>
          </div>

          {/* Bottom Bar: Copyright + Back to Top */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 md:p-12">
              <Reveal>
                  <p className="text-xs font-mono text-white/60 uppercase tracking-widest">
                      © 2025 NEXORA - Digital Studio. All Rights Reserved.
                  </p>
              </Reveal>
              <Reveal delay={0.1}>
                  <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="group flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[#0044EE] transition-colors uppercase tracking-widest"
                  >
                      <span>Back to Top</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
              </Reveal>
          </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />

    </motion.div>
  );
}
