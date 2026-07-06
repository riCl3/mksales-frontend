export default function ProductCardSkeleton({ index = 0 }) {
  return (
    <div
      className="h-full animate-pulse"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="h-full rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-sm bg-white/60 dark:bg-white/[0.07] backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/20 dark:from-white/[0.12] dark:via-white/[0.05] dark:to-transparent pointer-events-none" />
        <div className="relative">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-zinc-700" />
          <div className="px-4 py-3 space-y-2.5">
            <div className="h-4 bg-slate-200 dark:bg-zinc-700 rounded w-3/4" />
            <div className="h-3 bg-slate-200 dark:bg-zinc-700 rounded w-1/2" />
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 h-9 bg-slate-200 dark:bg-zinc-700 rounded-lg" />
          <div className="flex-1 h-9 bg-slate-200 dark:bg-zinc-700 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
