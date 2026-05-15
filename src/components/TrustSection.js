'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const taglines = [
  'From foundation to finish',
  'Pan-India logistics network',
  'Quality assured materials',
  'Delivered with precision',
]

function TypewriterText() {
  const [displayed, setDisplayed] = useState('')
  const [tagIndex, setTagIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = taglines[tagIndex]

    if (!deleting) {
      if (charIndex < current.length) {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else {
        setTimeout(() => setDeleting(true), 1500)
        return
      }
    } else {
      if (charIndex > 0) {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else {
        setDeleting(false)
        setTagIndex(t => (t + 1) % taglines.length)
        return
      }
    }
  }, [tagIndex, charIndex, deleting])

  useEffect(() => {
    const speed = deleting ? 40 : 80
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, deleting])

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-brand-blue">|</span>
    </span>
  )
}

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-100 py-24 md:py-32">
      <div className="absolute inset-0 section-texture" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(0,124,188,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(100,116,139,0.10) 0%, transparent 70%)',
              width: 250 + i * 100,
              height: 250 + i * 100,
              left: `${10 + i * 25}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute h-px bg-brand-blue/10"
            style={{
              width: `${40 + i * 20}%`,
              top: `${25 + i * 20}%`,
              left: `${10 + i * 5}%`,
            }}
            animate={{
              scaleX: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute bg-brand-blue/20 rounded-full"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-zinc-100/60 via-transparent to-zinc-100/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-1 bg-brand-blue mb-6" />
          <h2 className="text-display-xl text-slate-900 mb-6 max-w-2xl min-h-[4.5rem]">
            Trusted Industrial Solutions:<br />
            <span className="text-brand-blue text-display-lg"><TypewriterText /></span>
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            From foundation to finish, we supply premium construction materials
            engineered for performance. Backed by Pan-India logistics and quality assurance.
          </p>
        </motion.div>
      </div>
    </section>
  )
}