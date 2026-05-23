'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'

const GRAPHQL_ENDPOINT = 'https://mksales.co.in/graphql'

async function searchProducts(query) {
  if (!query) return []

  const gqlQuery = `
    query SearchProducts($search: String!) {
      products(first: 50, where: { search: $search }) {
        nodes {
          name
          slug
          shortDescription
          productCategories {
            nodes { name, slug }
          }
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

export default function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!q) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    searchProducts(q).then(products => {
      setResults(products)
      setLoading(false)
    })
  }, [q])

  if (!q) {
    return (
      <div className="text-center py-20">
        <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
        <p className="text-zinc-500 text-lg">Enter a search term to find products.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="bg-white rounded-xl border border-zinc-200/70 overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-slate-100" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-zinc-500">
          {results.length === 0 ? 'No results' : `Showing`}{' '}
          <span className="font-semibold text-slate-700">{results.length}</span>{' '}
          {results.length === 1 ? 'result' : 'results'} for{' '}
          <span className="font-semibold text-slate-700">&ldquo;{q}&rdquo;</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500 text-lg mb-2">No products match your search.</p>
          <p className="text-zinc-400 text-sm mb-6">Try different keywords or browse all products.</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-brand-green font-medium hover:underline">
            Browse all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {results.map((product, index) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Link href={`/product/${product.slug}`} className="group block h-full">
                  <div className="relative h-full bg-white rounded-xl border border-zinc-200/70 overflow-hidden hover:border-brand-green/30 hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {product.image?.sourceUrl ? (
                        <Image
                          src={product.image.sourceUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <span className="text-5xl font-bold text-slate-300">{product.name?.charAt(0)}</span>
                        </div>
                      )}
                      {product.productCategories?.nodes?.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-brand-green/80 backdrop-blur-sm rounded-full">
                            {product.productCategories.nodes[0].name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-green transition-colors duration-300 mb-3 line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        {(product.price || product.regularPrice) ? (
                          <span className="text-lg font-bold text-slate-900">₹{product.price || product.regularPrice}</span>
                        ) : (
                          <span className="text-xs text-zinc-400 uppercase tracking-wider">Price on request</span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg group-hover:bg-brand-green transition-colors duration-300">
                          View
                          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
