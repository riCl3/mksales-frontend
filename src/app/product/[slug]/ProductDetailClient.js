'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Truck, Clock, Award, ArrowRight, Package } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'BIS Certified' },
  { icon: Truck, label: 'Pan-India Delivery' },
  { icon: Clock, label: 'On-Time Dispatch' },
  { icon: Award, label: 'Quality Assured' },
]

export default function ProductDetailClient({ product }) {
  const categories = product.productCategories?.nodes || []

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1 opacity-10 dark:opacity-15" />
        <div className="trust-orb trust-orb-2 opacity-8 dark:opacity-12" />
        <div className="trust-orb trust-orb-3 opacity-5 dark:opacity-10" />
      </div>

      <div className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-sm bg-white dark:bg-[#0A1F30] backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C7C7C7]/50 dark:border-[#1A3A50] shadow-sm"
          >
            <Link href="/" className="text-zinc-500 dark:text-zinc-300 hover:text-brand-blue transition-colors">Home</Link>
            <span className="text-[#C7C7C7] dark:text-zinc-500">/</span>
            <Link href="/products" className="text-zinc-500 dark:text-zinc-300 hover:text-brand-blue transition-colors">Products</Link>
            <span className="text-[#C7C7C7] dark:text-zinc-500">/</span>
            <span className="text-brand-darkBlue dark:text-white font-semibold">{product.name}</span>
          </motion.nav>
        </div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-24 md:pb-32 -mt-2">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="absolute -top-6 -right-6 w-56 h-56 bg-brand-blue/8 dark:bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-green/5 dark:bg-brand-green/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-[#0A1F30] group shadow-2xl shadow-brand-blue/8 dark:shadow-black/30 ring-1 ring-[#C7C7C7]/30 dark:ring-[#1A3A50]">
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
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F5FA] to-[#E2EBF3] dark:from-[#0A1F30] dark:to-[#0E2940]">
                  <Package className="w-16 h-16 text-brand-blue/25 dark:text-brand-blue/35 mb-3" strokeWidth={1} />
                  <span className="text-xs font-medium text-[#C7C7C7] dark:text-zinc-500 uppercase tracking-wider">No Image Available</span>
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-3xl pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col justify-center py-4"
          >
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="inline-block px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-brand-blue text-white rounded-full hover:bg-brand-darkBlue transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl lg:text-5xl font-bold text-brand-darkBlue dark:text-white leading-tight mb-6">
              {product.name}
            </h1>

            {product.shortDescription && (
              <div
                className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href={`/contact?product=${product.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-green text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-dark transition-all duration-300 rounded-xl shadow-lg shadow-brand-green/20 hover:shadow-xl hover:shadow-brand-green/45 group"
              >
                Request Price
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-blue text-brand-blue font-semibold text-sm uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-xl"
              >
                All Products
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#0A1F30] rounded-xl border border-[#C7C7C7]/50 dark:border-[#1A3A50] hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <span className="text-sm font-medium text-brand-darkBlue dark:text-zinc-200">{badge.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {(product.description || product.shortDescription) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-12 border-t border-[#C7C7C7]/30 dark:border-[#1A3A50]"
          >
            <div className="max-w-4xl border-l-4 border-brand-blue/30 pl-6">
              <h2 className="text-2xl font-bold text-brand-darkBlue dark:text-white mb-2">Specifications</h2>
              <span className="section-accent mb-8 block" />
              <div
                className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription }}
              />
            </div>
          </motion.div>
        )}
      </section>
    </main>
  )
}
