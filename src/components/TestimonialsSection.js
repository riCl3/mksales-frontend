'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Mehta',
    role: 'Project Director',
    company: 'Larsen & Toubro',
    text: 'MK Sales has been our trusted partner for construction materials across 12 major projects in Maharashtra. Their consistency in quality and delivery timelines is unmatched.',
  },
  {
    name: 'Priya Sharma',
    role: 'Procurement Head',
    company: 'Tata Projects',
    text: 'The steel and structural materials from MK Sales meet the highest industry standards. Their Pan-India logistics network ensures we never face material shortages on site.',
  },
  {
    name: 'Vikram Singh',
    role: 'Site Manager',
    company: 'DLF Construction',
    text: 'We have been sourcing cement and aggregates from MK Sales for 5 years. Their pricing is competitive and the quality control is rigorous. Highly recommended.',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-28 bg-gradient-to-br from-zinc-200/80 via-zinc-100/50 to-blue-100/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,124,188,0.3) 2px, rgba(0,124,188,0.3) 3px)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 30px 10px, rgba(0,124,188,0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      <div className="max-w-3xl mx-auto px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-1 bg-brand-blue mx-auto mb-4" />
          <h2 className="text-display-md text-slate-900">Trusted by Industry Leaders</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            Leading construction companies across India rely on MK Sales for quality materials and reliable supply.
          </p>
        </div>

        <div className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white rounded-2xl border border-zinc-200/70 p-10 md:p-12 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue rounded-t-2xl" />

            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map((_, j) => (
                <span key={j} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>

            <p className="text-zinc-700 mb-10 leading-relaxed text-lg italic">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-5 pt-6 border-t border-zinc-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-blue-500 flex items-center justify-center text-white font-bold text-base shrink-0 shadow-sm">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-sm text-zinc-500">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-blue w-6' : 'bg-zinc-300 hover:bg-zinc-400'}`}
                />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}