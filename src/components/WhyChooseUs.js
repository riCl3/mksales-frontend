'use client'

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
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0,124,189,0.3) 1px, transparent 1px)`,
        backgroundSize: '25px 25px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="w-12 h-1 bg-brand-green mx-auto mb-4" />
          <h2 className="text-display-md text-white">Why Choose Us</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Six pillars that make MK Sales the preferred partner for construction material supply across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon

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
                  className="relative h-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-brand-green/50 hover:shadow-xl hover:shadow-brand-green/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-green bg-brand-green/10 rounded-full font-display">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-brand-green transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



