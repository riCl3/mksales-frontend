'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'S & P Construction',
    role: '',
    company: 'Baripada, Orissa',
    text: 'We are satisfied with the crash barriers supplied by MK Sales. The products were IRC & MorTH compliant, manufactured using quality materials as per our technical specifications, and met our project requirements effectively.',
  },
]

export default function TestimonialsSection() {
  const [[current, direction], setCurrent] = useState([0, 0])
  const [headerInView, setHeaderInView] = useState(false)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderInView(true); obs.disconnect() }
    }, { threshold: 0.2 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  const paginate = useCallback((newDirection) => {
    setCurrent(([prev]) => {
      const next = prev + newDirection
      if (next < 0) return [testimonials.length - 1, newDirection]
      if (next >= testimonials.length) return [0, newDirection]
      return [next, newDirection]
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => paginate(1), 6000)
    return () => clearInterval(intervalRef.current)
  }, [paginate])

  const goTo = (index) => {
    clearInterval(intervalRef.current)
    setCurrent(([prev]) => [index, index > prev ? 1 : -1])
    intervalRef.current = setInterval(() => paginate(1), 6000)
  }

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-transparent pointer-events-none" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="w-12 h-1 bg-brand-blue mx-auto mb-4" />
          <h2 className="text-display-md text-white">Trusted by Industry Leaders</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Leading construction companies across India rely on MK Sales for quality materials and reliable supply.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative min-h-[320px] md:min-h-[280px]">
          <div
            key={current}
            className="relative bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 md:p-14"
            style={{
              animation: `testimonialIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
              transform: `translateX(${direction * 0}px)`,
            }}
          >
              {/* Quote icon */}
              <div className="absolute -top-6 left-8 md:left-14">
                <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center shadow-xl shadow-brand-green/30">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1.5 mb-7">
                {[1,2,3,4,5].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote text */}
              <p className="text-white/85 text-lg md:text-xl leading-[1.8] mb-12 font-light">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-7 border-t border-white/[0.08]">
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-brand-blue to-green-400 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-brand-blue/20">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-white font-display text-[15px]">{t.name}</p>
                  <p className="text-sm text-zinc-400/70 mt-0.5">{t.role ? `${t.role}, ${t.company}` : t.company}</p>
                </div>
              </div>
            </div>
        </div>

        {/* Controls */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => { clearInterval(intervalRef.current); paginate(-1); intervalRef.current = setInterval(() => paginate(1), 6000) }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === current ? 'bg-brand-green w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => { clearInterval(intervalRef.current); paginate(1); intervalRef.current = setInterval(() => paginate(1), 6000) }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}



