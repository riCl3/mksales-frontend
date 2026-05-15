'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'

const categories = [
  { name: 'Cement & Concrete', slug: 'cement-concrete', gradient: 'from-slate-700 to-slate-900' },
  { name: 'Steel & Structural', slug: 'steel-structural', gradient: 'from-slate-600 to-slate-800' },
  { name: 'Aggregates', slug: 'aggregates', gradient: 'from-stone-600 to-stone-800' },
  { name: 'Bricks & Blocks', slug: 'bricks-blocks', gradient: 'from-zinc-600 to-zinc-800' },
  { name: 'Sand & Gravel', slug: 'sand-gravel', gradient: 'from-stone-500 to-stone-700' },
  { name: 'RMC', slug: 'rmc', gradient: 'from-slate-500 to-slate-700' },
]

export default function CategoriesSection() {
  const scrollRef = useRef(null)
  const rafId = useRef(null)
  const paused = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const animate = () => {
      if (!paused.current) {
        container.scrollLeft += 0.3
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0
        }
      }
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    const onEnter = () => { paused.current = true }
    const onLeave = () => { paused.current = false }

    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafId.current)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - 350
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + 350
    }
  }

  return (
    <section id="categories" className="py-22 md:py-30 bg-gradient-to-br from-zinc-200/80 via-zinc-100/50 to-blue-100/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,124,188,0.4) 2px, rgba(0,124,188,0.4) 3px)`,
        backgroundSize: '30px 30px'
      }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(0,124,188,0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="relative z-10 mb-10 px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <h2 className="text-display-md text-slate-900">Categories</h2>
        
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            ←
          </button>
          
          <button 
            type="button" 
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative z-10 flex gap-6 overflow-x-auto pb-4 px-6 md:px-8 lg:px-12 scrollbar-hide"
      >
        {[...categories, ...categories].map((cat, i) => (
          <Link 
            key={`${cat.slug}-${i}`} 
            href={`/categories/${cat.slug}`} 
            className="relative flex-shrink-0 w-80 h-72 rounded-2xl overflow-hidden snap-center group block shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} group-hover:scale-105 transition-transform duration-500`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <h3 className="text-xl font-semibold text-white">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}