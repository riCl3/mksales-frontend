'use client'

import { motion } from 'framer-motion'

export default function FeatureCards() {
  return (
    <section className="relative -mt-20 relative z-20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl shadow-slate-900/10"
          >
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue text-2xl mb-4">✓</div>
            <h3 className="text-lg font-bold text-white mb-2">Premium Quality</h3>
            <p className="text-slate-400 text-sm">ISO 9001 certified materials tested for durability and performance standards.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl shadow-xl shadow-slate-900/10"
          >
            <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue text-2xl mb-4">📦</div>
            <h3 className="text-lg font-bold text-white mb-2">Pan-India Supply</h3>
            <p className="text-slate-400 text-sm">Reliable logistics network delivering to 500+ locations across India.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-brand-blue to-blue-600 p-8 rounded-2xl shadow-xl shadow-brand-blue/20"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-2xl mb-4">₹</div>
            <h3 className="text-lg font-bold text-white mb-2">Bulk Pricing</h3>
            <p className="text-white/70 text-sm">Competitive rates for large-scale infrastructure projects.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}