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
    <main className="min-h-screen relative bg-gradient-to-b from-brand-green/[0.04] via-white to-brand-blue/[0.05]">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-30" />

      {/* Brand header block */}
      <div className="relative bg-gradient-to-r from-brand-green/15 via-brand-blue/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green via-brand-blue to-brand-dark" />
        <div className="relative z-10 pt-24 pb-4">
          <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-200 shadow-sm"
            >
              <Link href="/" className="text-zinc-500 hover:text-brand-blue transition-colors">Home</Link>
              <span className="text-zinc-300">/</span>
              <Link href="/products" className="text-zinc-500 hover:text-brand-blue transition-colors">Products</Link>
              <span className="text-zinc-300">/</span>
              <span className="text-brand-green font-medium">{product.name}</span>
            </motion.nav>
          </div>
        </div>
      </div>

      {/* Product Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pb-20 -mt-2">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            {/* Decorative brand elements behind the image */}
            <div className="absolute -top-4 -right-4 w-48 h-48 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-brand-green/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group shadow-sm ring-1 ring-black/5">
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
                  <span className="text-3xl font-bold text-brand-green">₹{price}</span>
                  <span className="text-sm text-zinc-500">per unit</span>
                </div>
              ) : (
                <span className="text-lg text-brand-green font-medium">Price on request</span>
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
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-green text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-dark transition-all duration-300 rounded-lg group"
              >
                Get Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-blue/30 text-brand-blue font-semibold text-sm uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-lg"
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
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-brand-green/10 hover:border-brand-green/30 hover:shadow-md hover:shadow-brand-green/5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-green" />
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
            <div className="max-w-4xl border-l-4 border-brand-green/30 pl-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Specifications</h2>
              <div className="w-16 h-1 bg-brand-green mb-8" />
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
