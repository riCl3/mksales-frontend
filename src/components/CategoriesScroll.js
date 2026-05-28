'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const gradients = [
  'from-brand-blue to-brand-dark',
  'from-brand-green to-brand-dark',
  'from-slate-700 to-slate-900',
  'from-brand-dark to-slate-900',
  'from-brand-green to-green-900',
  'from-brand-blue to-blue-900',
  'from-green-800 to-green-950',
  'from-slate-800 to-brand-dark',
]

export default function CategoriesScroll({ categories }) {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' })
    }
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="relative z-10 px-6 md:px-8 lg:px-12 py-8">
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 h-72 bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative z-10 mb-10 px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <h2 className="text-display-md text-slate-900">Categories</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300"
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden px-6 md:px-8 lg:px-12">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="relative flex-shrink-0 w-80 h-72 overflow-hidden snap-center group block shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} group-hover:scale-105 transition-transform duration-500`} />
              {cat.image?.sourceUrl && (
                <Image
                  src={cat.image.sourceUrl}
                  alt={cat.name}
                  fill
                  sizes="320px"
                  className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}


