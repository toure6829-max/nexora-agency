'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Menu, ArrowRight, X } from 'lucide-react'
import { useState } from 'react'

// --- ANIMATION VARIANTS ---
const titleContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const titleLetter: Variants = {
  hidden: { y: 100, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: "easeInOut" 
    }
  },
}

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuLinks = [
    { label: "Home", href: "#" },
    { label: "Chi Siamo", href: "#chi-siamo" },
    { label: "Progetti", href: "#progetti" },
    { label: "Contatti", href: "#contatti" },
  ]

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0044EE] selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center text-white mix-blend-difference">
        
        {/* Left: Burger Menu Button */}
        <Reveal>
          <button onClick={toggleMenu} className="flex items-center gap-3 group relative z-50">
            <div className="p-2 border border-white/20 rounded-full group-hover:border-[#0044EE] transition-colors duration-300">
              <Menu className="w-5 h-5 cursor-pointer group-hover:text-[#0044EE] transition-colors" />
            </div>
            <span className="hidden md:block text-xs uppercase tracking-widest font-bold font-orbitron">
              Menu
            </span>
          </button>
        </Reveal>

        {/* Right: WhatsApp CTA (Fixed Link) */}
        <Reveal delay={0.2}>
          <a 
            href="https://wa.me/393533685270"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0044EE] hover:border-[#0044EE] transition-all duration-300 relative z-50"
          >
            <span>Parliamone</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </nav>

      {/* --- FULL SCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={toggleMenu}
              className="absolute top-8 right-6 md:right-12 p-2 border border-white/20 rounded-full hover:border-[#FF5F56] transition-colors group"
            >
              <X className="w-6 h-6 group-hover:text-[#FF5F56]" />
            </button>

            {/* Menu Links */}
            <div className="flex flex-col gap-8 text-center">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                >
                  <a 
                    href={link.href} 
                    onClick={toggleMenu}
                    className="text-5xl md:text-7xl font-bold font-orbitron uppercase hover:text-[#0044EE] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 text-xs font-mono text-neutral-500 uppercase tracking-widest"
            >
              Nexora Digital Studio — 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.jpg" 
            alt="Nexora Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center h-full">
          
          {/* Staggered Title */}
          <motion.h1 
            variants={titleContainer}
            initial="hidden"
            animate="show"
            className="text-[12vw] md:text-[10vw] leading-[1] font-bold font-orbitron text-white mix-blend-overlay select-none flex justify-center overflow-hidden"
          >
            {Array.from("NEXORA").map((letter, i) => (
              <motion.span key={i} variants={titleLetter} className="inline-block">
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Subtitle & Line */}
          <Reveal delay={0.8}>
            <div className="flex flex-col items-center mt-8 gap-6">
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#0044EE] font-orbitron font-bold drop-shadow-lg">
                Il Futuro del Design Digitale
              </p>
              
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="w-[1px] bg-gradient-to-b from-[#0044EE] to-transparent opacity-80 mt-6"
              />
            </div>
          </Reveal>

        </div>
      </section>

      {/* --- MISSION STATEMENT (Chi Siamo) --- */}
      <section id="chi-siamo" className="py-32 md:py-48 px-6 bg-black relative z-20 border-t border-white/5">
        <div className="max-w-[90vw] md:max-w-6xl mx-auto flex flex-col items-center">
          
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-xs md:text-sm font-orbitron font-bold uppercase tracking-[0.3em] text-neutral-500">
                ( 01 ) — Chi Siamo
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-center leading-[1.15] md:leading-[1.1] tracking-tight text-white/90">
              Non creiamo solo siti web. Costruiamo <span className="text-[#0044EE] font-semibold">Ecosistemi Digitali</span> che definiscono il futuro dei brand.
              <br className="hidden md:block" />
              <span className="opacity-50">Uniamo strategia, design e tecnologia per un impatto </span>
              <span className="italic font-serif text-white opacity-100">Assoluto.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* --- SERVICES LIST (Cosa Facciamo) --- */}
      <section className="py-32 px-6 bg-black text-white relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <span className="text-xs md:text-sm font-orbitron font-bold uppercase tracking-[0.3em] text-neutral-500 block mb-4">
                  ( 02 ) — Cosa Facciamo
                </span>
                <h2 className="text-4xl md:text-6xl font-bold font-orbitron leading-tight">
                  Design & <br /> <span className="text-[#0044EE]">Ingegneria.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {[
              { id: "01", title: "BRAND IDENTITY", tags: "Strategia / Art Direction / Naming" },
              { id: "02", title: "UI/UX DESIGN", tags: "Web Design / Mobile Apps / Motion" },
              { id: "03", title: "SVILUPPO WEB", tags: "Next.js / Creative Coding / eCommerce" },
              { id: "04", title: "DIGITAL GROWTH", tags: "SEO / Social Media / Content" }
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group border-t border-white/20 py-12 flex flex-col md:flex-row justify-between items-baseline md:items-center cursor-pointer transition-all duration-500 hover:border-[#0044EE] hover:bg-white/5 px-4 md:px-0">
                  <div className="flex items-baseline gap-8 md:gap-16 group-hover:translate-x-4 transition-transform duration-500">
                    <span className="font-orbitron text-xs md:text-sm text-neutral-500 group-hover:text-[#0044EE] transition-colors">
                      {service.id}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold font-orbitron uppercase tracking-wide group-hover:text-[#0044EE] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 md:gap-12 mt-4 md:mt-0 w-full md:w-auto justify-between group-hover:translate-x-[-1rem] transition-transform duration-500">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest hidden md:block group-hover:text-white transition-colors">
                      {service.tags}
                    </span>
                    <div className="bg-white/10 p-3 rounded-full group-hover:bg-[#0044EE] group-hover:text-white transition-all duration-500">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/20"></div>
          </div>
        </div>
      </section>

      {/* --- STICKY PARALLAX PROJECTS (Progetti) --- */}
      <section id="progetti" className="bg-black text-white relative z-10 pb-32">
        
        <div className="px-6 md:px-12 py-32">
          <Reveal>
            <span className="text-xs md:text-sm font-orbitron font-bold uppercase tracking-[0.3em] text-[#0044EE] block mb-4">
              ( 03 ) — Progetti
            </span>
            <h2 className="text-5xl md:text-7xl font-bold font-orbitron uppercase">
              Opere <span className="text-neutral-500">Selezionate.</span>
            </h2>
          </Reveal>
        </div>

        <div className="px-4 md:px-12 flex flex-col gap-12">
          {[
            { 
              name: "PIZZERIA DIAMANTE", 
              cat: "Food & Beverage", 
              year: "2024",
              desc: "Rebranding digitale e piattaforma di ordinazione per un'icona della tradizione italiana.",
              src: "/pizzeria.jpg",
              theme: "border-[#FF5F56]",
              link: "/progetti/pizzeria-diamante"
            },
            { 
              name: "COSTRUZIONI EDILI", 
              cat: "Architecture & Real Estate", 
              year: "2024",
              desc: "Portfolio architettonico minimalista per un'azienda leader nel settore costruzioni.",
              src: "/construction.jpg",
              theme: "border-[#FFBD2E]",
              link: "/progetti/costruzioni-edili"
            },
            { 
              name: "LUXECAR", 
              cat: "Automotive Dealership", 
              year: "2025",
              desc: "Showroom virtuale immersivo con configuratore 3D per veicoli di lusso.",
              src: "/luxecar.jpg",
              theme: "border-[#0044EE]",
              link: "/progetti/luxecar"
            },
            { 
              name: "AURA", 
              cat: "Wellness & Spa", 
              year: "2023",
              desc: "Esperienza web sensoriale per un centro benessere esclusivo nel cuore di Roma.",
              src: "/aura.jpg",
              theme: "border-[#27C93F]",
              link: "/progetti/aura"
            }
          ].map((project, idx) => (
            <div 
              key={idx} 
              className={`sticky top-24 md:top-32 h-[80vh] w-full bg-[#111] rounded-2xl border-t-4 ${project.theme} overflow-hidden shadow-2xl flex flex-col md:flex-row`}
              style={{ marginTop: idx === 0 ? 0 : `-20vh` }} 
            >
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 border border-white/20 px-3 py-1 rounded-full">
                      {project.cat}
                    </span>
                    <span className="text-xs font-mono text-neutral-600">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold font-orbitron uppercase leading-[0.9] mb-8">
                    {project.name}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed max-w-sm">
                    {project.desc}
                  </p>
                </div>
                <Link 
                  href={project.link}
                  className="w-fit group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-[#0044EE] transition-colors mt-8"
                >
                  <span className="border-b border-white/30 pb-1 group-hover:border-[#0044EE] transition-colors">Vedi Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                <Image 
                  src={project.src} 
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111]/80 md:to-[#111]/20" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-32"></div>
      </section>

      {/* --- MONOLITHIC FOOTER --- */}
      <footer id="contatti" className="bg-black text-white relative z-20 overflow-hidden border-t border-white/10">
        
        {/* Infinite Marquee */}
        <div className="py-8 border-b border-white/10 bg-black relative overflow-hidden">
          <motion.div 
            className="flex gap-12 whitespace-nowrap text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent uppercase select-none"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>Definiamo il Futuro</span>
                <span className="text-[#0044EE]">///</span>
                <span>Designing the Future</span>
                <span className="text-[#0044EE]">///</span>
              </span>
            ))}
          </motion.div>
        </div>

        <div className="px-6 md:px-12 py-32 flex flex-col items-center text-center">
          
          <Reveal>
            <span className="text-xs md:text-sm font-orbitron font-bold uppercase tracking-[0.3em] text-[#0044EE] mb-8 block">
              ( Contatti )
            </span>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold font-orbitron uppercase tracking-tight mb-16">
              Pronti a Partire?
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <Link 
              href="mailto:infonexora@gmail.com" 
              className="group relative block"
            >
              <span className="text-[8vw] md:text-[6vw] leading-none font-bold font-orbitron text-white group-hover:text-[#0044EE] transition-colors duration-500">
                infonexora@gmail.com
              </span>
              <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#0044EE] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          </Reveal>

          <Reveal delay={0.3}>
            <a 
              href="https://wa.me/393533685270"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-16 inline-flex items-center gap-3 border border-white/20 hover:border-[#0044EE] hover:bg-[#0044EE] px-8 py-4 rounded-full transition-all duration-300 group"
            >
              <span className="text-xs font-bold uppercase tracking-widest font-orbitron">Chatta su WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex gap-6 justify-center md:justify-start">
            {['Instagram', 'LinkedIn', 'Behance'].map(social => (
              <a key={social} href="#" className="hover:text-white transition-colors">{social}</a>
            ))}
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 flex justify-center items-center gap-3">
            <span>Italia</span>
            <span className="w-1.5 h-1.5 bg-[#0044EE] rounded-full animate-pulse" />
            <span className="text-white">CET {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
          </div>
          <div className="p-8 flex justify-center md:justify-end gap-6">
            <span>© 2025 Nexora</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </footer>

    </main>
  )
}
