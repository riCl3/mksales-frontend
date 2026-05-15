'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Layers, Shield, Truck, Clock, Handshake, Star } from 'lucide-react'

const features = [
  { title: 'Diverse & Scalable Solutions', description: 'Infrastructure and industrial products for projects of all sizes.', metric: '5000+', unit: 'Orders Delivered', icon: Layers },
  { title: 'Quality You Can Depend On', description: 'Products sourced and tested for superior performance and durability.', metric: '100%', unit: 'BIS Compliant', icon: Shield },
  { title: 'Efficient Supply Chain', description: 'Robust vendor partnerships ensuring consistency and competitive pricing.', metric: '200+', unit: 'Vetted Suppliers', icon: Truck },
  { title: 'On-Time, Every Time', description: 'A commitment to timely delivery that keeps your projects on track.', metric: '98.7%', unit: 'On-Time Delivery', icon: Clock },
  { title: 'Relationship-Driven', description: 'We believe in building partnerships, not just transactions.', metric: '92%', unit: 'Client Retention', icon: Handshake },
  { title: 'Industry Expertise', description: 'Deep understanding of project needs for practical solutions that work.', metric: '15+', unit: 'Years Avg Experience', icon: Star },
]

function CountUp({ end, suffix }) {
  const [count, setCount] = useState('0')
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const isNumeric = !isNaN(parseFloat(end))
          if (!isNumeric) { setCount(end); return }

          const target = parseFloat(end)
          const duration = 1500
          const startTime = performance.now()

          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = (target * progress).toFixed(target % 1 === 0 ? 0 : 1)
            setCount(current + suffix)
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, suffix])

  return <span ref={ref}>{count}</span>
}

export default function WhyChooseUs() {
  const [expanded, setExpanded] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 bg-gradient-to-br from-zinc-200/70 via-zinc-100/60 to-blue-100/30">
      <div className="absolute inset-0 section-texture pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0,124,188,0.3) 1px, transparent 1px)`,
        backgroundSize: '25px 25px'
      }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-brand-blue/8 rounded-full"
            style={{
              width: 1 + i % 3,
              height: 1 + i % 3,
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 6) * 14}%`,
            }}
            animate={{ y: [0, -8, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

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
                  className="relative h-full cursor-pointer bg-white rounded-xl border border-zinc-200/70 p-6 hover:border-brand-blue/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                      <Icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-blue leading-none">
                        <CountUp end={feature.metric} suffix="" />
                      </div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">{feature.unit}</div>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-brand-blue transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className={`mt-4 pt-3 border-t border-zinc-100 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {feature.title} — {feature.metric} {feature.unit.toLowerCase()}. Trusted by leading infrastructure companies across India for consistent quality and reliable supply.
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400">
                    <span>{isExpanded ? 'Show less' : 'Click for details'}</span>
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>↓</motion.span>
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