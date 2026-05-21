import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-zinc-50/50 to-zinc-100/30 relative">
      <div className="absolute inset-0 section-texture pointer-events-none" />
      <div className="relative z-10 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-12">
            <div className="w-12 h-1 bg-brand-blue mb-4" />
            <h1 className="text-display-xl text-slate-900 mb-4">Search</h1>
            <p className="text-lg text-zinc-600 max-w-3xl">
              Find the right construction materials for your project.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 animate-pulse bg-zinc-100 rounded-xl" />}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
