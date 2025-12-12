'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: "AURELIA",
    category: "EXPÉRIENCE DIGITALE",
    desc: "Une interface immersive pour une marque de luxe, redéfinissant les standards de la navigation web.",
    img: "/aurelia-preview.jpg",
    link: "/projets/aurelia"
  },
  {
    title: "LUXESHOES",
    category: "E-COMMERCE",
    desc: "Plateforme de vente haute couture optimisée pour la conversion et l'expérience visuelle.",
    img: "/luxeshoes-preview.jpg",
    link: "/projets/luxeshoes"
  },
  {
    title: "TERANGA HOTEL",
    category: "HÔTELLERIE",
    desc: "Système de réservation élégant pour un établissement de prestige au cœur de Dakar.",
    img: "/teranga-hotel-preview.jpg",
    link: "/projets/teranga-hotel"
  },
  {
    title: "TERANGA RESORT",
    category: "RESORT DE LUXE",
    desc: "Vitrine digitale capturant l'essence du luxe tropical et de l'hospitalité sénégalaise.",
    img: "/teranga-resort-preview.jpg",
    link: "/projets/teranga-resort"
  }
];

export default function Work() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] text-[#EAEAEA]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-32 border-b border-[#333] pb-8">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase mb-4">
          Archives <br /> Digitales.
        </h2>
        <p className="text-sm font-mono text-[#888] uppercase tracking-widest">
          Sélection de projets récents [2024-2025]
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-32 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            
            {/* 1. Browser Window Preview */}
            <Link href={project.link} className="w-full md:w-3/5 group cursor-pointer block">
              {/* Browser Bar */}
              <div className="h-8 bg-[#1a1a1a] rounded-t-lg border border-[#333] border-b-0 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-lg border border-[#333] border-t-0 bg-[#111]">
                <Image 
                  src={project.img} 
                  alt={project.title} 
                  fill 
                  // object-top ensures the header of the website is always visible
                  className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                     <span className="text-xs font-bold uppercase tracking-widest">Voir le projet</span>
                     <ExternalLink className="w-4 h-4" />
                   </div>
                </div>
              </div>
            </Link>

            {/* 2. Project Details */}
            <div className="w-full md:w-2/5 flex flex-col items-start">
              <span className="text-xs font-mono text-[#0044EE] uppercase tracking-[0.2em] mb-4">
                {project.category}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-none">
                {project.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed mb-8 max-w-sm">
                {project.desc}
              </p>
              
              <Link href={project.link} className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-[#0044EE] transition-colors">
                <span>Découvrir</span>
                <div className="w-8 h-[1px] bg-white group-hover:bg-[#0044EE] transition-colors" />
                <ArrowRight className="w-4 h-4 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
