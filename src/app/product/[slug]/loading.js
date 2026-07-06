import Spinner from '../../../components/Spinner'

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1 opacity-10 dark:opacity-15" />
        <div className="trust-orb trust-orb-2 opacity-8 dark:opacity-12" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,124,189,0.04),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,124,189,0.06),transparent_60%)]" />

      {/* Breadcrumb skeleton */}
      <div className="relative z-10 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60 shadow-sm animate-pulse">
            <div className="h-3 w-10 bg-slate-200 dark:bg-zinc-700 rounded" />
            <div className="text-[#C7C7C7] dark:text-zinc-600">/</div>
            <div className="h-3 w-14 bg-slate-200 dark:bg-zinc-700 rounded" />
            <div className="text-[#C7C7C7] dark:text-zinc-600">/</div>
            <div className="h-3 w-32 bg-slate-200 dark:bg-zinc-700 rounded" />
          </div>
        </div>
      </div>

      {/* Header skeleton */}
      <div className="relative z-10 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-slate-200 dark:bg-zinc-700 rounded-full" />
              <div className="h-3 w-24 bg-slate-200 dark:bg-zinc-700 rounded" />
            </div>
            <div className="h-10 w-3/4 bg-slate-200 dark:bg-zinc-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-24 md:pb-32 -mt-2">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-pulse">
          {/* Left: Image skeleton */}
          <div className="relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-blue/20 rounded-tl-lg" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-brand-green/20 rounded-tr-lg" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-brand-green/20 rounded-bl-lg" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-blue/20 rounded-br-lg" />
            <div className="aspect-square rounded-3xl bg-slate-200 dark:bg-zinc-700 shadow-2xl ring-1 ring-[#C7C7C7]/30 dark:ring-[#1A3A50]" />
          </div>

          {/* Right: Info skeleton */}
          <div className="flex flex-col justify-center py-4 space-y-6">
            {/* Category badges */}
            <div className="flex gap-2">
              <div className="h-7 w-20 bg-slate-200 dark:bg-zinc-700 rounded-full" />
              <div className="h-7 w-16 bg-slate-200 dark:bg-zinc-700 rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-5/6" />
              <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-4/6" />
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-slate-200 dark:bg-zinc-700 rounded-xl" />
              <div className="h-12 w-36 bg-slate-200 dark:bg-zinc-700 rounded-xl" />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-[#0A1F30]/80 rounded-xl border border-[#C7C7C7]/40 dark:border-[#1A3A50]/60">
                  <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-zinc-700" />
                  <div className="h-3 flex-1 bg-slate-200 dark:bg-zinc-700 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs section skeleton */}
        <div className="mt-20 animate-pulse">
          <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-[#C7C7C7]/30 dark:border-[#1A3A50]/50 p-8 md:p-10 shadow-sm">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-gradient-to-b from-brand-green/30 to-brand-blue/30 rounded-full" />
                <div className="h-7 w-40 bg-slate-200 dark:bg-zinc-700 rounded" />
              </div>
              <div className="w-12 h-1 bg-brand-blue/20 rounded-full mb-8 ml-[18px]" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-11/12" />
                <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-4/5" />
                <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-9/12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centered spinner overlay */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="flex flex-col items-center gap-3 bg-white/80 dark:bg-[#0A1F30]/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#C7C7C7]/30 dark:border-[#1A3A50]/50">
          <Spinner size="lg" />
          <p className="text-sm font-medium text-[#014565] dark:text-white/80">Loading product...</p>
        </div>
      </div>
    </div>
  )
}
