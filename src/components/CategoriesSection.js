import CategoriesScroll from './CategoriesScroll'

async function getCategories() {
  const query = `
    query GetCategories {
      productCategories(first: 20, where: { hideEmpty: true }) {
        nodes {
          name
          slug
          image {
            sourceUrl
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://mksales.co.in/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()
    return data.data?.productCategories?.nodes || []
  } catch (err) {
    console.error('Connection Error:', err.message)
    return []
  }
}

export default async function CategoriesSection() {
  const categories = await getCategories()

  return (
    <section id="categories" className="py-22 md:py-30 bg-gradient-to-br from-zinc-200/80 via-zinc-100/50 to-blue-100/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,124,188,0.4) 2px, rgba(0,124,188,0.4) 3px)`,
        backgroundSize: '30px 30px'
      }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(0,124,188,0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      <CategoriesScroll categories={categories} />
    </section>
  )
}
