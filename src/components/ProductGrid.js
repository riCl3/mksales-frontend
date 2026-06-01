'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

function ProductCard({ product, index }) {
  const name = product.name || 'Product'
  const image = product.image?.sourceUrl
  const categories = product.productCategories?.nodes || []

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="group h-full">
        <div className="relative h-full rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-500 backdrop-blur-xl bg-white/60 dark:bg-white/[0.07]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/20 dark:from-white/[0.12] dark:via-white/[0.05] dark:to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent pointer-events-none" />
          <div className="relative">
            <Link href={`/product/${product.slug}`} className="block">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-brand-blue to-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#C7C7C7]/60 to-[#C7C7C7]/30 dark:from-[#014565]/60 dark:to-[#014565]/30">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#014565]/30 dark:text-white/20">{name.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


            </div>

            <div className="px-4 py-3">
              <h3 className="text-sm font-semibold text-[#014565] dark:text-white group-hover:text-brand-green transition-colors duration-300 mb-3 line-clamp-2 leading-snug">
                {name}
              </h3>
            </div>
          </Link>

          </div>

          <div className="px-4 pb-4 flex gap-3">
            <Link
              href={`/contact?product=${product.slug}`}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-green text-white text-xs font-semibold rounded-lg hover:bg-brand-green/70 transition-all duration-300 whitespace-nowrap font-display"
            >
              Request Price
            </Link>
            <Link
              href={`/product/${product.slug}`}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-[#014565]/30 dark:border-white/30 text-[#014565] dark:text-white text-xs font-semibold rounded-lg hover:bg-[#014565]/10 dark:hover:bg-white/10 transition-all duration-300 whitespace-nowrap font-display"
            >
              View
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductGrid({ products = [], categories = [] }) {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const urlCategory = searchParams.get('category')
    if (urlCategory && categories.some(c => c.slug === urlCategory)) {
      setActiveCategory(urlCategory)
    }
  }, [searchParams, categories])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter(p =>
      p.productCategories?.nodes?.some(c => c.slug === activeCategory)
    )
  }, [products, activeCategory])

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-500 dark:text-zinc-400">No products found.</p>
      </div>
    )
  }

  return (
    <div>
      {categories.length > 0 && (
        <div className="relative mb-10 p-4 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-sm backdrop-blur-xl bg-brand-blue/20 dark:bg-brand-blue/[0.15]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-brand-blue/10 to-transparent dark:from-brand-blue/[0.2] dark:via-brand-blue/[0.08] dark:to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              aria-pressed={activeCategory === 'all'}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-300 font-display ${
                activeCategory === 'all'
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                  : 'bg-white/80 dark:bg-white/10 text-[#014565] dark:text-white border-white/40 dark:border-white/25 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                aria-pressed={activeCategory === cat.slug}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-300 font-display ${
                  activeCategory === cat.slug
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                    : 'bg-white/80 dark:bg-white/10 text-[#014565] dark:text-white border-white/40 dark:border-white/25 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center gap-3">
        <span className="inline-block w-1 h-4 bg-white rounded-full" />
        <p className="text-sm text-white/60">
          Showing <span className="font-semibold text-white">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[#014565] backdrop-blur-sm rounded-2xl border border-white/10 shadow-sm"
        >
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-white/80 font-medium mb-2">No products in this category.</p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-white text-[#014565] text-sm font-medium rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-300 shadow-sm"
          >
            View all products
          </button>
        </motion.div>
      )}
    </div>
  )
}
