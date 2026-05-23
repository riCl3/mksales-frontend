'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GRAPHQL_ENDPOINT = 'https://mksales.co.in/graphql'

async function searchProducts(query) {
  if (!query || query.length < 2) return []

  const gqlQuery = `
    query SearchProducts($search: String!) {
      products(first: 6, where: { search: $search }) {
        nodes {
          name
          slug
          ... on SimpleProduct {
            price
            regularPrice
            image { sourceUrl }
          }
        }
      }
    }
  `

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: gqlQuery, variables: { search: query } }),
    })
    const data = await res.json()
    return data.data?.products?.nodes || []
  } catch {
    return []
  }
}

export default function SearchBar({ scrolled }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const debounceRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const debouncedSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.length < 2) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      const products = await searchProducts(value)
      setResults(products)
      setLoading(false)
    }, 300)
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
      setQuery('')
    }
  }

  const close = () => {
    setOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-lg transition-all duration-300 ${
          scrolled
            ? 'text-gray-600 hover:text-brand-green hover:bg-brand-green/5'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        aria-label="Search"
      >
        {open ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </button>

      {/* Search dropdown */}
      {open && (
        <div className={`absolute right-0 top-full mt-3 w-[380px] rounded-2xl overflow-hidden shadow-2xl border z-50 ${
          scrolled
            ? 'bg-white border-zinc-200'
            : 'bg-white border-zinc-200'
        }`}>
          {/* Input */}
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-4 text-sm text-slate-900 placeholder-zinc-400 outline-none border-b border-zinc-100"
            />
          </form>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="px-4 py-6 text-center">
                <div className="inline-block w-5 h-5 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
              </div>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-zinc-500">
                No products found for &ldquo;{query}&rdquo;
              </div>
            )}

            {!loading && results.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {product.image?.sourceUrl ? (
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                      <span className="text-sm font-bold text-slate-300">{product.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate group-hover:text-brand-green transition-colors">
                    {product.name}
                  </p>
                  {(product.price || product.regularPrice) && (
                    <p className="text-xs text-zinc-500 mt-0.5">
                      ₹{product.price || product.regularPrice}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-brand-green transition-colors shrink-0" />
              </Link>
            ))}
          </div>

          {/* View all link */}
          {query.length >= 2 && !loading && (
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-3 text-sm font-medium text-brand-green hover:bg-brand-green/5 transition-colors border-t border-zinc-100 flex items-center justify-center gap-1.5"
            >
              View all results for &ldquo;{query}&rdquo;
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
