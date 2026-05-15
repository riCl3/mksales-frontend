'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

function ProductCard({ product, visible }) {
  const name = product.name || 'Product'
  const image = product.image?.sourceUrl
  const price = product.price || product.regularPrice

  return (
    <div className={`transition-all duration-700 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <Link href={`/product/${product.slug}`} className="group block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 mb-4 rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-4xl font-bold text-slate-300">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="pb-3 border-b border-slate-100 group-hover:border-blue-200 transition-colors duration-300">
          <h3 className="text-base font-medium text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-1">
            {name}
          </h3>
        </div>
        
        <div className="pt-3 flex items-center justify-between">
          {price && (
            <span className="text-lg font-bold text-slate-900">₹{price}</span>
          )}
          <span className="px-4 py-2 bg-brand-blue text-white text-xs font-medium hover:bg-brand-dark transition-colors duration-300">
            Details
          </span>
        </div>
      </Link>
    </div>
  )
}

export default function ProductGrid({ products = [] }) {
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
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-500">No products found.</p>
      </div>
    )
  }

  return (
    <div ref={sectionRef}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.slug}
            className={`transition-all duration-700`}
            style={{ 
              transitionDelay: visible ? `${index * 100 + 200}ms` : '0ms'
            }}
          >
            <ProductCard product={product} visible={visible} />
          </div>
        ))}
      </div>
    </div>
  )
}