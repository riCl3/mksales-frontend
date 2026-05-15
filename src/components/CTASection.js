'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.2em]">
            Get Started
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
            Whether you need materials for a small renovation or a large-scale development, 
            we have the inventory and logistics to deliver on time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="px-10 py-4 bg-brand-blue text-white font-semibold rounded-full hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-brand-blue/25">
              Browse Products
            </Link>
            <Link href="/contact" className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-slate-900 transition-all">
              Request Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}