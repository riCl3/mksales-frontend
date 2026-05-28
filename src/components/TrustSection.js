'use client'

import { useState, useEffect, useCallback } from 'react'

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
      <span className="animate-pulse text-brand-green">|</span>
    </span>
  )
}

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-24 md:py-32">
      <div className="absolute inset-0 section-texture opacity-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1" />
        <div className="trust-orb trust-orb-2" />
        <div className="trust-orb trust-orb-3" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/60 dark:from-zinc-950/60 dark:to-zinc-950/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="opacity-100 translate-y-0 transition-all duration-700">
          <span className="section-accent mb-4 block" />
          <h2 className="text-display-xl text-white mb-4 max-w-2xl min-h-[4.5rem]">
            Trusted Industrial Solutions:<br />
            <span className="text-brand-green text-display-lg"><TypewriterText /></span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            From foundation to finish, we supply premium construction materials
            engineered for performance. Backed by Pan-India logistics and quality assurance.
          </p>
        </div>
      </div>
    </section>
  )
}



