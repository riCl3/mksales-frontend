'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CARD_WIDTH = 340
const AUTO_SCROLL_INTERVAL = 3000

export default function CategoriesScroll({ categories }) {
  const scrollRef = useRef(null)
  const autoScrollRef = useRef(null)
  const isHoveredRef = useRef(false)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' })
    }
  }

  const scrollRight = useCallback(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const maxScroll = el.scrollWidth - el.clientWidth
    // Loop back to start if at end
    if (el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' })
    }
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (!categories || categories.length <= 1) return

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          scrollRight()
        }
      }, AUTO_SCROLL_INTERVAL)
    }

    startAutoScroll()
    return () => clearInterval(autoScrollRef.current)
  }, [categories, scrollRight])

  if (!categories || categories.length === 0) {
    return (
      <div className="relative z-10 px-6 md:px-8 lg:px-12 py-8">
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 h-72 bg-slate-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative z-10 mb-10 px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <h2 className="text-display-md text-slate-900 dark:text-white">Categories</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-600 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll categories right"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-600 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden px-6 md:px-8 lg:px-12">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          onMouseEnter={() => { isHoveredRef.current = true }}
          onMouseLeave={() => { isHoveredRef.current = false }}
          onTouchStart={() => { isHoveredRef.current = true }}
          onTouchEnd={() => { setTimeout(() => { isHoveredRef.current = false }, 2000) }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="relative flex-shrink-0 w-[300px] h-[240px] md:w-[340px] md:h-[280px] overflow-hidden snap-center group block rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-black/15 transition-all duration-500"
            >
              {cat.image?.sourceUrl ? (
                <Image
                  src={cat.image.sourceUrl}
                  alt={cat.name}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-end p-7">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-1 drop-shadow-lg">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/70 font-medium uppercase tracking-wider group-hover:text-white/90 transition-colors duration-300">
                    Browse
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}


