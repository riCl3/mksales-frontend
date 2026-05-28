'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@mksales.co.in' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Address', value: 'Mumbai, Maharashtra, India' },
]

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-green/20 via-white to-brand-blue/20 dark:from-brand-green/[0.08] via-brand-darkBlue to-brand-blue/[0.10] py-24 md:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-accent mb-4 block" />
          <h1 className="text-display-xl text-slate-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl">
            Get in touch for quotes, bulk orders, or any inquiries about our construction materials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-8"
          >
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <motion.div key={label} variants={fadeInLeft} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 text-brand-green group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-1">
                    {label}
                  </h3>
                  <p className="text-slate-900 dark:text-zinc-100 font-medium">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-3 space-y-6 bg-white dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/70 dark:border-zinc-700/50 p-8 md:p-10 shadow-sm dark:shadow-zinc-900/50"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-700/50 border border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-zinc-100 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-700/50 border border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-zinc-100 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-700/50 border border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-zinc-100 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-700/50 border border-slate-300 dark:border-zinc-600 text-slate-900 dark:text-zinc-100 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all duration-300 resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-blue/25 transition-all duration-300"
            >
              Send Message
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </div>
    </main>
  )
}



