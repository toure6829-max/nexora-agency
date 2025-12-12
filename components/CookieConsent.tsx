'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('nexora-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('nexora-consent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('nexora-consent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-[100] bg-[#111] border border-white/10 p-6 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-95"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-orbitron font-bold text-[#0044EE] uppercase tracking-widest">
              Privacy & Cookies
            </span>
            <button onClick={handleDecline} className="text-white/40 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-mono">
            Utilizziamo i cookie per migliorare l'esperienza digitale e analizzare il traffico. Nessun tracciamento invasivo, solo performance pura.
          </p>
          <div className="flex gap-4">
            <button onClick={handleAccept} className="flex-1 bg-[#0044EE] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-all duration-300">
              Accetta
            </button>
            <button onClick={handleDecline} className="flex-1 border border-white/20 hover:border-white text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-all duration-300">
              Rifiuta
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

