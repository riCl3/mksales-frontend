import ProductCardSkeleton from '../../components/ProductCardSkeleton'

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-28 pb-24">
        {/* Page header skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-slate-200 dark:bg-zinc-700 rounded-full" />
            <div className="h-3 w-20 bg-slate-200 dark:bg-zinc-700 rounded" />
          </div>
          <div className="h-10 w-64 bg-slate-200 dark:bg-zinc-700 rounded-lg mb-3" />
          <div className="h-4 w-96 bg-slate-200 dark:bg-zinc-700 rounded" />
        </div>

        {/* Category filter skeleton */}
        <div className="relative mb-10 p-4 rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-sm backdrop-blur-xl bg-brand-blue/20 dark:bg-brand-blue/[0.15] animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-brand-blue/10 to-transparent dark:from-brand-blue/[0.2] dark:via-brand-blue/[0.08] dark:to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-wrap gap-2">
            <div className="px-4 py-2 h-9 w-28 bg-slate-200 dark:bg-zinc-700 rounded-full" />
            <div className="px-4 py-2 h-9 w-24 bg-slate-200 dark:bg-zinc-700 rounded-full" />
            <div className="px-4 py-2 h-9 w-32 bg-slate-200 dark:bg-zinc-700 rounded-full" />
            <div className="px-4 py-2 h-9 w-20 bg-slate-200 dark:bg-zinc-700 rounded-full" />
          </div>
        </div>

        {/* Count skeleton */}
        <div className="mb-6 flex items-center gap-3 animate-pulse">
          <div className="w-1 h-4 bg-brand-blue dark:bg-white rounded-full" />
          <div className="h-3 w-32 bg-slate-200 dark:bg-zinc-700 rounded" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <ProductCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
