'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero banner">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-zinc-900/50 to-zinc-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-8 lg:px-12">
        <div
          suppressHydrationWarning
          className={`max-w-2xl transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="w-12 h-1 bg-brand-green mb-6" />
          <h1 className="mb-6 text-balance text-display-2xl text-white leading-[1.1]">
            Industrial Grade Materials.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-blue-300">
              Delivered with Precision.
            </span>
          </h1>
          <p className="mb-10 text-xl text-zinc-300 max-w-xl">
            Reliable infrastructure solutions designed for performance, durability, and scale — backed by a Pan-India logistics network.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-dark transition-colors duration-300 rounded-lg shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:-translate-y-0.5 font-display"
            >
              View Products
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white/80 text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-zinc-900 transition-colors duration-300 rounded-lg backdrop-blur-sm font-display"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '2s', opacity: mounted ? 1 : 0, transition: 'opacity 1s ease-out 2s' }}>
        <span className="text-zinc-400 text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 text-zinc-400 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}

