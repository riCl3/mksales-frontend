import CategoriesScroll from './CategoriesScroll'

export default function CategoriesSection({ categories = [] }) {

  return (
    <section id="categories" className="py-28 md:py-36 bg-gradient-to-br from-white via-brand-blue/[0.03] to-brand-green/[0.06] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/15 via-brand-blue/5 to-transparent dark:from-brand-blue/10 dark:via-brand-blue/5 pointer-events-none" />
      <CategoriesScroll categories={categories} />
    </section>
  )
}


