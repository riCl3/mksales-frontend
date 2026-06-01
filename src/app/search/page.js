import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-green/20 via-white to-brand-blue/20 dark:from-brand-green/[0.08] dark:via-brand-darkBlue dark:to-brand-blue/[0.10] py-24 md:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-1.5 h-6 bg-brand-green rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">Search</span>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-lg w-64" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-80 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
                ))}
              </div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}




