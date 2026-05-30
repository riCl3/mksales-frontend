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
        <div className="relative h-full bg-white dark:bg-[#0A1F30] rounded-2xl border border-[#C7C7C7]/50 dark:border-[#1A3A50] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/50 dark:hover:border-brand-blue/30 transition-all duration-500">
          <Link href={`/product/${product.slug}`} className="block">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-brand-blue to-brand-darkBlue scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#F0F5FA] to-[#E2EBF3] dark:from-[#0A1F30] dark:to-[#0E2940]">
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
                  <span className="text-5xl font-bold text-brand-blue/15 dark:text-brand-blue/25">{name.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


            </div>

            <div className="p-5">
              <h3 className="text-sm font-semibold text-brand-darkBlue dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors duration-300 mb-4 line-clamp-2 leading-snug">
                {name}
              </h3>
            </div>
          </Link>

          <div className="px-5 pb-5 flex gap-3">
            <Link
              href={`/contact?product=${product.slug}`}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-green text-white text-xs font-semibold rounded-lg shadow-sm shadow-brand-green/20 hover:bg-brand-dark hover:shadow-brand-green/45 transition-all duration-300 whitespace-nowrap"
            >
              Request Price
            </Link>
            <Link
              href={`/product/${product.slug}`}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border-2 border-brand-blue text-brand-blue text-xs font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-all duration-300 whitespace-nowrap"
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
        <div className="mb-10 p-4 bg-white dark:bg-[#0A1F30] backdrop-blur-sm rounded-2xl border border-[#C7C7C7]/50 dark:border-[#1A3A50] shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                  : 'bg-white dark:bg-[#0A1F30] text-brand-darkBlue dark:text-zinc-300 border-[#C7C7C7]/50 dark:border-[#1A3A50] hover:border-brand-blue/40 hover:text-brand-blue'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                    : 'bg-white dark:bg-[#0A1F30] text-brand-darkBlue dark:text-zinc-300 border-[#C7C7C7]/50 dark:border-[#1A3A50] hover:border-brand-blue/40 hover:text-brand-blue'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center gap-3">
        <span className="inline-block w-1 h-4 bg-brand-blue rounded-full" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Showing <span className="font-semibold text-brand-blue">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
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
          className="text-center py-20 bg-white dark:bg-[#0A1F30] backdrop-blur-sm rounded-2xl border border-[#C7C7C7]/50 dark:border-[#1A3A50] shadow-sm"
        >
          <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">No products in this category.</p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-brand-darkBlue transition-colors duration-300 shadow-sm shadow-brand-blue/20"
          >
            View all products
          </button>
        </motion.div>
      )}
    </div>
  )
}
