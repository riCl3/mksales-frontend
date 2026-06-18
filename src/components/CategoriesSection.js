'use client'

import { useState, useEffect } from 'react'
import CategoriesScroll from './CategoriesScroll'

const REST_API_CATEGORIES = 'https://mksales.co.in/wp-json/wp/v2/product_cat?per_page=20&hide_empty=true'
const PLACEHOLDER_IMG = 'https://mksales.co.in/wp-content/plugins/categories-images/assets/images/placeholder.png'

export default function CategoriesSection() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(REST_API_CATEGORIES)
      .then(res => res.json())
      .then(data => {
        const nodes = (Array.isArray(data) ? data : []).map(cat => ({
          name: cat.name,
          slug: cat.slug,
          image: cat.z_taxonomy_image_url && cat.z_taxonomy_image_url !== PLACEHOLDER_IMG
            ? { sourceUrl: cat.z_taxonomy_image_url }
            : null,
        }))
        setCategories(nodes)
      })
      .catch(err => console.error('Connection Error:', err.message))
  }, [])

  return (
    <section id="categories" className="py-24 md:py-32 bg-gradient-to-br from-white via-brand-blue/[0.03] to-brand-green/[0.06] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/15 via-brand-blue/5 to-transparent dark:from-brand-blue/10 dark:via-brand-blue/5 pointer-events-none" />
      <CategoriesScroll categories={categories} />
    </section>
  )
}


