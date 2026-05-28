'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

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

  const linkClass = () => {
    const base = 'text-sm font-bold uppercase tracking-widest transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-green after:transition-all after:duration-300 hover:after:w-full'
    return `${base} ${scrolled || menuOpen ? 'text-gray-700 dark:text-zinc-200 hover:text-brand-green' : 'text-white hover:text-brand-green drop-shadow-md'}`
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border-b border-brand-green/30 dark:border-brand-green/20 shadow-lg shadow-brand-green/5'
        : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4 gap-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide transition-colors duration-300 shrink-0"
        >
          <span className={scrolled ? 'text-brand-blue dark:text-blue-400' : 'text-white'}>MK</span>
          <span className={`${scrolled ? 'text-gray-800 dark:text-zinc-100' : 'text-brand-blue'} ml-1`}>Sales</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          <Link href="/" className={linkClass()}>Home</Link>
          <button onClick={() => scrollToSection('categories')} className={linkClass()}>Categories</button>
          <Link href="/products" className={linkClass()}>Products</Link>
          <Link href="/contact" className={linkClass()}>Contact</Link>
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-300 dark:border-zinc-600">
            <SearchBar scrolled={scrolled} />
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-brand-blue text-white text-sm font-bold hover:bg-brand-dark transition-all duration-300 rounded-lg shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:-translate-y-0.5"
            >
              Get Quote
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <SearchBar scrolled={scrolled} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-800 dark:text-zinc-100' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-2xl">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-brand-green transition-colors">Home</Link>
            <button onClick={() => scrollToSection('categories')} className="text-white text-lg font-bold uppercase tracking-widest hover:text-brand-green transition-colors">Categories</button>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-brand-green transition-colors">Products</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-white text-lg font-bold uppercase tracking-widest hover:text-brand-green transition-colors">Contact</Link>
            <div className="flex items-center gap-4 mt-4">
              <ThemeToggle />
            </div>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 bg-brand-blue text-white font-bold hover:bg-brand-dark transition-all duration-300 rounded-lg shadow-lg shadow-brand-blue/30"
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}


