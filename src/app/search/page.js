import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <main className="min-h-screen relative bg-gradient-to-b from-brand-green/[0.04] via-white to-brand-blue/[0.05]">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-30" />

      {/* Brand header block */}
      <div className="relative bg-gradient-to-r from-brand-green/15 via-brand-blue/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-green via-brand-blue to-brand-dark" />
        <div className="relative z-10 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-1.5 h-6 bg-brand-green rounded-full" />
                <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">Search</span>
              </div>
              <h1 className="text-display-xl text-slate-900 mb-4">Search Products</h1>
              <p className="text-lg text-zinc-600">
                Find the right construction materials for your project.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="relative -mt-6 bg-white rounded-2xl border border-brand-green/10 shadow-sm p-6">
            <Suspense fallback={<div className="h-96 animate-pulse bg-zinc-100 rounded-xl" />}>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
