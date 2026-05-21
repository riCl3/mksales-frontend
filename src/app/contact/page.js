'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-zinc-50/50 to-zinc-100/30 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-1 bg-brand-blue mb-4" />
          <h1 className="text-display-xl text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-zinc-600 mb-14 max-w-2xl">
            Get in touch for quotes, bulk orders, or any inquiries about our construction materials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Email</h3>
                <p className="text-slate-900">info@mksales.co.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Phone</h3>
                <p className="text-slate-900">+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Address</h3>
                <p className="text-slate-900">Mumbai, India</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-3 space-y-6 bg-white rounded-2xl border border-zinc-200/70 p-8"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea id="message" rows="5" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300 group">
              Send Message
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </div>
    </main>
  )
}
