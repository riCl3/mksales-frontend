'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Truck, Clock, Award, ArrowRight } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'BIS Certified' },
  { icon: Truck, label: 'Pan-India Delivery' },
  { icon: Clock, label: 'On-Time Dispatch' },
  { icon: Award, label: 'Quality Assured' },
]

export default function ProductDetailClient({ product }) {
  const price = product.price || product.regularPrice
  const categories = product.productCategories?.nodes || []

  return (
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e8f0fe 60%, #dbeafe 100%)' }}>
      <div className="absolute inset-0 section-texture pointer-events-none" />
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 pt-24 pb-4 max-w-7xl mx-auto px-8 md:px-12 lg:px-16"
      >
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{product.name}</span>
        </nav>
      </motion.div>

      {/* Product Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group shadow-sm">
              {product.image?.sourceUrl ? (
                <Image
                  src={product.image.sourceUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <span className="text-9xl font-bold text-slate-300">
                    {product.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col justify-center py-4"
          >
            {/* Category tags */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 rounded-full hover:bg-brand-blue/20 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {product.name}
            </h1>

            <div className="mb-8">
              {price ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-slate-900">₹{price}</span>
                  <span className="text-sm text-zinc-500">per unit</span>
                </div>
              ) : (
                <span className="text-lg text-zinc-500 font-medium">Price on request</span>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <div
                className="text-base text-zinc-600 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-dark transition-all duration-300 rounded-lg group"
              >
                Get Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-zinc-300 text-slate-700 font-semibold text-sm uppercase tracking-wider hover:border-slate-900 hover:text-slate-900 transition-all duration-300 rounded-lg"
              >
                ← All Products
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-zinc-200/70"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{badge.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Full Description */}
        {(product.description || product.shortDescription) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-12 border-t border-zinc-200"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Specifications</h2>
              <div className="w-16 h-1 bg-brand-blue mb-8" />
              <div
                className="text-base text-zinc-600 leading-relaxed prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription }}
              />
            </div>
          </motion.div>
        )}
      </section>
    </main>
  )
}
