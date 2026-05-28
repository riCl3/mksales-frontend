'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, BadgePercent } from 'lucide-react'

const cards = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'ISO 9001 certified materials tested for durability and performance standards.',
    gradient: 'from-slate-900 to-slate-800 dark:from-zinc-800 dark:to-zinc-900',
    iconBg: 'bg-brand-green/20',
    iconColor: 'text-brand-green',
  },
  {
    icon: Truck,
    title: 'Pan-India Supply',
    description: 'Reliable logistics network delivering to 500+ locations across India.',
    gradient: 'from-slate-800 to-slate-700 dark:from-zinc-900 dark:to-zinc-800',
    iconBg: 'bg-brand-green/20',
    iconColor: 'text-brand-green',
  },
  {
    icon: BadgePercent,
    title: 'Bulk Pricing',
    description: 'Competitive rates for large-scale infrastructure and industrial projects.',
    gradient: 'from-brand-green to-brand-blue',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
  },
]

export default function FeatureCards() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${card.gradient} p-8 rounded-2xl shadow-xl shadow-slate-900/10 ring-1 ring-brand-blue/10`}
              >
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



