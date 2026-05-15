'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-zinc-900/60" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-8 lg:px-12">
        <div suppressHydrationWarning className={`max-w-2xl transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="mb-6 text-balance text-display-2xl text-white">
            Industrial Grade Materials. Delivered with Precision.
          </h1>
          <p className="mb-10 text-xl text-zinc-200">
            Reliable infrastructure solutions designed for performance, durability, and scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary bg-brand-blue text-white hover:bg-brand-blue/90">
              View Products
            </Link>
            <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-zinc-900">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}