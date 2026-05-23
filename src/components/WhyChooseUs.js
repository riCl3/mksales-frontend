'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layers, Shield, Truck, Clock, Handshake, Star } from 'lucide-react'

const features = [
  {
    title: 'Diverse & Scalable Solutions',
    description: 'Infrastructure and industrial products for projects of all sizes — from single-site builds to nationwide rollouts.',
    badge: 'Enterprise Ready',
    icon: Layers,
  },
  {
    title: 'Quality You Can Depend On',
    description: 'Every product sourced and tested to meet rigorous performance and durability standards.',
    badge: 'Certified Quality',
    icon: Shield,
  },
  {
    title: 'Efficient Supply Chain',
    description: 'Robust vendor partnerships ensuring consistency, competitive pricing, and zero supply gaps.',
    badge: 'Pan-India Network',
    icon: Truck,
  },
  {
    title: 'On-Time, Every Time',
    description: 'A proven track record of timely delivery that keeps your projects on schedule and on budget.',
    badge: 'Trusted Reliability',
    icon: Clock,
  },
  {
    title: 'Relationship-Driven',
    description: 'We build long-term partnerships, not just transactions — your success is our metric.',
    badge: 'Long-Term Partners',
    icon: Handshake,
  },
  {
    title: 'Industry Expertise',
    description: 'Deep domain knowledge across construction materials, backed by decades of hands-on experience.',
    badge: 'Seasoned Experts',
    icon: Star,
  },
]

export default function WhyChooseUs() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-zinc-200/70 via-zinc-100/60 to-blue-100/30">
      <div className="absolute inset-0 section-texture pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0,143,55,0.3) 1px, transparent 1px)`,
        backgroundSize: '25px 25px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="w-12 h-1 bg-brand-blue mx-auto mb-4" />
          <h2 className="text-display-md text-slate-900">Why Choose Us</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            Six pillars that make MK Sales the preferred partner for construction material supply across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isExpanded = expanded === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group"
              >
                <div
                  onClick={() => setExpanded(isExpanded ? null : index)}
                  className="relative h-full cursor-pointer bg-white rounded-xl border border-zinc-200/70 p-6 hover:border-brand-green/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/10 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-brand-green transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className={`mt-4 pt-3 border-t border-zinc-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Trusted by leading infrastructure companies across India for consistent quality and reliable supply. We deliver where others can&apos;t.
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400">
                    <span>{isExpanded ? 'Show less' : 'Click for details'}</span>
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>&#8595;</motion.span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
