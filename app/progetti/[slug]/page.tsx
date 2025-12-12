'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

// --- PROJECT DATA ---
const projects: Record<string, any> = {
  "pizzeria-diamante": {
    title: "PIZZERIA DIAMANTE",
    category: "Food & Beverage",
    year: "2024",
    client: "Gruppo Diamante",
    description: "Un rebranding totale per un'icona della tradizione italiana. Abbiamo trasformato l'esperienza di ordinazione in un viaggio visivo, unendo la storia culinaria con un'interfaccia utente fluida e moderna.",
    challenge: "Digitalizzare la tradizione senza perdere l'anima artigianale del brand.",
    solution: "Un sito web sensoriale, ricco di video in background e micro-interazioni che simulano la preparazione del prodotto.",
    imgHero: "/pizzeria.jpg",
    imgDetail1: "/pizzeria.jpg", 
    nextProject: "costruzioni-edili"
  },
  "costruzioni-edili": {
    title: "COSTRUZIONI EDILI",
    category: "Architecture",
    year: "2024",
    client: "Edilizia S.p.A.",
    description: "Minimalismo strutturale. Per questo gigante delle costruzioni, abbiamo eliminato il superfluo per lasciare spazio alla grandezza delle opere. Un portfolio digitale che pesa come il cemento e leggero come il vetro.",
    challenge: "Organizzare un archivio di 500+ progetti in una navigazione intuitiva.",
    solution: "Un layout a griglia asimmetrica con filtri intelligenti e transizioni WebGL.",
    imgHero: "/construction.jpg",
    imgDetail1: "/construction.jpg",
    nextProject: "luxecar"
  },
  "luxecar": {
    title: "LUXECAR",
    category: "Automotive",
    year: "2025",
    client: "LuxeCar Milano",
    description: "Il lusso non accetta compromessi. Abbiamo creato uno showroom virtuale immersivo dove ogni riflesso sulla carrozzeria è calcolato in tempo reale. Un configuratore 3D che definisce nuovi standard nel settore automotive.",
    challenge: "Portare l'emozione del test-drive su uno schermo desktop e mobile.",
    solution: "Rendering 3D in tempo reale e un sound design immersivo che reagisce allo scroll.",
    imgHero: "/luxecar.jpg",
    imgDetail1: "/luxecar.jpg",
    nextProject: "aura"
  },
  "aura": {
    title: "AURA",
    category: "Wellness & Spa",
    year: "2023",
    client: "Aura Roma",
    description: "Un respiro digitale. Aura è un'esperienza web progettata per calmare i sensi. Colori tenui, tipografia elegante e animazioni lente che guidano l'utente verso la prenotazione del suo momento di relax.",
    challenge: "Comunicare il silenzio e la pace attraverso un'interfaccia digitale.",
    solution: "Utilizzo di spazi bianchi negativi e transizioni liquide per un flow senza interruzioni.",
    imgHero: "/aura.jpg",
    imgDetail1: "/aura.jpg",
    nextProject: "pizzeria-diamante"
  }
}

// --- ANIMATION COMPONENT ---
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0044EE] selection:text-white">
      
      {/* --- BACK BUTTON --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 pointer-events-none">
        <Link href="/" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#0044EE] transition-colors mix-blend-difference text-white">
          <ArrowLeft className="w-4 h-4" /> Indietro
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] w-full bg-neutral-900">
        <Image 
          src={project.imgHero} 
          alt={project.title} 
          fill 
          className="object-cover opacity-60"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="block text-[#0044EE] font-mono text-sm mb-4 tracking-widest">{project.category} — {project.year}</span>
                <h1 className="text-5xl md:text-8xl font-bold font-orbitron uppercase leading-none">{project.title}</h1>
              </div>
              <div className="hidden md:block text-right">
                <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">Cliente</span>
                <span className="text-xl font-orbitron">{project.client}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Left: Summary */}
          <div className="md:col-span-1 space-y-12">
             <Reveal delay={0.1}>
               <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">La Sfida</h3>
               <p className="text-lg leading-relaxed text-neutral-300">{project.challenge}</p>
             </Reveal>
             <Reveal delay={0.2}>
               <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">La Soluzione</h3>
               <p className="text-lg leading-relaxed text-neutral-300">{project.solution}</p>
             </Reveal>
          </div>

          {/* Right: Main Description */}
          <div className="md:col-span-2">
            <Reveal delay={0.3}>
              <p className="text-2xl md:text-4xl font-light leading-tight text-neutral-100">
                {project.description}
              </p>
            </Reveal>
          </div>

        </div>
      </section>

      {/* --- VISUAL GALLERY --- */}
      <section className="px-6 md:px-12 pb-32">
        <Reveal>
          <div className="relative w-full aspect-video bg-neutral-900 rounded-sm overflow-hidden">
             <Image src={project.imgDetail1} alt="Detail" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </Reveal>
      </section>

      {/* --- NEXT PROJECT NAV --- */}
      <section className="border-t border-white/10 bg-neutral-950">
        <Link href={`/progetti/${project.nextProject}`} className="block group px-6 md:px-12 py-24 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
             <div>
               <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2 block">Prossimo Progetto</span>
               <h2 className="text-4xl md:text-6xl font-bold font-orbitron group-hover:text-[#0044EE] transition-colors">
                 {projects[project.nextProject]?.title || "PROSSIMO"}
               </h2>
             </div>
             <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-[#0044EE]" />
          </div>
          {/* Background Hover Effect */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </section>

    </main>
  )
}

