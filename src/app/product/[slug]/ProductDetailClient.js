'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Shield, Truck, Clock, Award, ArrowRight, Package, Sparkles, FileText } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'BIS Certified', color: 'from-brand-blue to-blue-400' },
  { icon: Truck, label: 'Pan-India Delivery', color: 'from-brand-green to-emerald-400' },
  { icon: Clock, label: 'On-Time Dispatch', color: 'from-amber-500 to-orange-400' },
  { icon: Award, label: 'Quality Assured', color: 'from-brand-darkBlue to-brand-blue' },
]

const ease = [0.4, 0, 0.2, 1]

function FloatingImage({ src, alt }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Decorative corner accents */}
      <motion.div
        className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-blue/40 rounded-tl-lg z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease }}
      />
      <motion.div
        className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-brand-green/40 rounded-tr-lg z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4, ease }}
      />
      <motion.div
        className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-brand-green/40 rounded-bl-lg z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4, ease }}
      />
      <motion.div
        className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-blue/40 rounded-br-lg z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4, ease }}
      />

      {/* Glow behind image */}
      <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-brand-green/8 dark:bg-brand-green/12 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-[#0A1F30] shadow-2xl shadow-brand-blue/10 dark:shadow-black/40 ring-1 ring-[#C7C7C7]/30 dark:ring-[#1A3A50] image-shine cursor-crosshair"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F5FA] to-[#E2EBF3] dark:from-[#0A1F30] dark:to-[#0E2940]">
            <Package className="w-16 h-16 text-brand-blue/25 dark:text-brand-blue/35 mb-3" strokeWidth={1} />
            <span className="text-xs font-medium text-[#C7C7C7] dark:text-zinc-500 uppercase tracking-wider">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-3xl pointer-events-none" />

        {/* Inner glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/0 via-transparent to-brand-green/0 opacity-0 hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

export default function ProductDetailClient({ product }) {
  const categories = product.productCategories?.nodes || []

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300"
    >
      <div className="absolute inset-0 section-texture pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1 opacity-10 dark:opacity-15" />
        <div className="trust-orb trust-orb-2 opacity-8 dark:opacity-12" />
        <div className="trust-orb trust-orb-3 opacity-5 dark:opacity-10" />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,124,189,0.04),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,124,189,0.06),transparent_60%)]" />

      {/* Breadcrumb */}
      <div className="relative z-10 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="inline-flex items-center gap-2 text-sm bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 shadow-sm"
          >
            <Link href="/" className="text-zinc-500 dark:text-zinc-400 hover:text-brand-blue transition-colors font-medium">Home</Link>
            <span className="text-[#C7C7C7] dark:text-zinc-600">/</span>
            <Link href="/products" className="text-zinc-500 dark:text-zinc-400 hover:text-brand-blue transition-colors font-medium">Products</Link>
            <span className="text-[#C7C7C7] dark:text-zinc-600">/</span>
            <span className="text-brand-darkBlue dark:text-white font-semibold truncate max-w-[200px]">{product.name}</span>
          </motion.nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="relative z-10 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block w-1.5 h-6 bg-brand-green rounded-full" />
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">Product Detail</span>
            </div>
            <h1 className="text-display-xl text-brand-darkBlue dark:text-white mb-4">{product.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-24 md:pb-32 -mt-2">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Product Image */}
          <FloatingImage src={product.image?.sourceUrl} alt={product.name} />

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center py-4">

            {/* Category Badges */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease }}
                  >
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="inline-block px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-brand-blue text-white rounded-full hover:bg-brand-darkBlue transition-colors font-display"
                    >
                      {cat.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Description */}
            {product.shortDescription && !product.shortDescription.includes('drive.google.com') && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-brand-green text-white font-semibold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-brand-green/25 hover:shadow-xl hover:shadow-brand-green/40 transition-shadow duration-300 group font-display overflow-hidden"
                >
                  {/* Animated shimmer overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Sparkles className="w-4 h-4" />
                  Request Price
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={`/product/${product.slug}/viewer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brand-blue text-brand-blue font-semibold text-sm uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-colors duration-300 rounded-xl font-display"
                >
                  <FileText className="w-4 h-4" />
                  View Details
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-sm rounded-xl border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-brand-darkBlue dark:text-zinc-200">{badge.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {(product.description || product.shortDescription) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="mt-20"
          >
            {/* Decorative glow behind specs */}
            <div className="relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-blue/5 dark:bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-[#C7C7C7]/30 dark:border-[#1A3A50]/50 p-8 md:p-10 shadow-sm">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-brand-green to-brand-blue rounded-full" />
                    <h2 className="text-2xl font-bold text-brand-darkBlue dark:text-white font-display">Specifications</h2>
                  </div>
                  <div className="section-accent mb-8 ml-[18px]" />
                  <div
                    className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </motion.main>
  )
}
