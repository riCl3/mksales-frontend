'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const navLinkClass = () => {
    const base = 'text-sm font-bold uppercase tracking-widest transition-all duration-300'
    return `${base} ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400 drop-shadow-md'}`
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-2xl border-b border-blue-400/30 shadow-xl shadow-blue-900/5'
        : 'bg-gradient-to-b from-black/50 via-black/30 to-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4 gap-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide transition-colors duration-300 shrink-0"
        >
          <span className={scrolled ? 'text-blue-600' : 'text-white'}>MK</span>
          <span className={`${scrolled ? 'text-gray-800' : 'text-blue-400'} ml-1`}>Sales</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 shrink-0">
          <Link href="/" className={navLinkClass()}>Home</Link>
          <button onClick={() => scrollToSection('categories')} className={navLinkClass()}>Categories</button>
          <Link href="/products" className={navLinkClass()}>Products</Link>
          <Link href="/contact" className={navLinkClass()}>Contact</Link>
          <SearchBar scrolled={scrolled} />
          <Link
            href="/contact"
            className="px-5 py-2 bg-brand-blue text-white text-sm font-semibold hover:bg-brand-dark transition-colors duration-300 rounded-lg"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile: search + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <SearchBar scrolled={scrolled} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Home</Link>
            <button onClick={() => scrollToSection('categories')} className="text-white text-lg font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Categories</button>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Products</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-blue-300 transition-colors">Contact</Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-dark transition-colors duration-300 mt-4 rounded-lg"
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
