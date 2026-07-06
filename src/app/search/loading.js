import ProductCardSkeleton from '../../components/ProductCardSkeleton'

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-28 pb-24">
        {/* Search header skeleton */}
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-80 bg-slate-200 dark:bg-zinc-700 rounded-xl mb-4" />
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-brand-blue rounded-full" />
            <div className="h-3 w-48 bg-slate-200 dark:bg-zinc-700 rounded" />
          </div>
        </div>

        {/* Search results grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <ProductCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
