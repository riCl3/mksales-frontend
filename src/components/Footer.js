'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 dark:bg-zinc-950 text-white pt-20 pb-8 overflow-hidden" aria-label="Site footer">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold mb-2">
            <span className="text-brand-blue">MK</span>{' '}
            <span className="text-white">Sales</span>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            Premium construction materials for industrial projects across India.
            Quality assured, delivered on time.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { label: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
              { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 dark:bg-zinc-800 flex items-center justify-center text-slate-400 hover:bg-brand-green hover:text-white hover:shadow-lg hover:shadow-brand-green/30 transition-colors duration-300"
                aria-label={social.label}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-5">Categories</h4>
          <ul className="space-y-3">
            {[
              { name: 'Cement', slug: 'cement' },
              { name: 'Steel', slug: 'steel' },
              { name: 'Aggregates', slug: 'aggregates' },
              { name: 'Bricks', slug: 'bricks' },
              { name: 'Paints', slug: 'paints' },
            ].map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="text-slate-400 text-sm hover:text-brand-blue transition-colors duration-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: 'Contact', path: '/contact' },
              { name: 'Privacy Policy', path: '#' },
              { name: 'Terms of Service', path: '#' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-slate-400 text-sm hover:text-brand-blue transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-5">Contact Us</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+919876543210" className="hover:text-brand-blue transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@mksales.co.in" className="hover:text-brand-blue transition-colors">info@mksales.co.in</a>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <a href="https://maps.google.com/?q=Mumbai+Maharashtra+India" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">Mumbai, Maharashtra, India</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 MK Sales. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span>Built with precision for Indian infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


