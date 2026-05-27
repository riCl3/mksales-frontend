'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

function ProductCard({ product, index }) {
  const name = product.name || 'Product'
  const image = product.image?.sourceUrl
  const price = product.price || product.regularPrice
  const categories = product.productCategories?.nodes || []

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block h-full">
        <div className="relative h-full bg-white rounded-xl border border-zinc-200/70 overflow-hidden hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 transition-all duration-500">
          {/* Brand ribbon accent on hover */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <span className="text-5xl font-bold text-slate-300">{name.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category tag */}
            {categories.length > 0 && (
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-brand-green/80 backdrop-blur-sm rounded-full">
                  {categories[0].name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-green transition-colors duration-300 mb-3 line-clamp-2 leading-snug">
              {name}
            </h3>

            <div className="flex items-center justify-between">
              {price ? (
                <span className="text-lg font-bold text-slate-900">₹{price}</span>
              ) : (
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Price on request</span>
              )}
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-green text-white text-xs font-medium rounded-lg group-hover:bg-brand-dark transition-colors duration-300">
                View
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
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
        <p className="text-zinc-500">No products found.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-10 p-4 bg-white rounded-xl border border-brand-green/10 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                  : 'bg-white text-slate-600 border-zinc-200 hover:border-brand-green/40 hover:text-brand-green'
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
                    ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                    : 'bg-white text-slate-600 border-zinc-200 hover:border-brand-green/40 hover:text-brand-green'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Count */}
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-block w-1 h-4 bg-brand-green rounded-full" />
        <p className="text-sm text-zinc-500">
          Showing <span className="font-semibold text-brand-green">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Products Grid */}
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
          className="text-center py-20 bg-white rounded-2xl border border-brand-green/10 shadow-sm"
        >
          <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-zinc-600 font-medium mb-2">No products in this category.</p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-brand-green text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors duration-300"
          >
            View all products
          </button>
        </motion.div>
      )}
    </div>
  )
}
