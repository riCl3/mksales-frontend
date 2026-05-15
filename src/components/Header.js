'use client';

import Link from 'next/link';
import { Search, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Oils', 'Organic Products', 'Handmade'];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Tier - Background */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="text-xl font-black tracking-tight shrink-0">
              MK<span className="text-[#007CBC]">SALES</span>
            </Link>

            {/* Search Bar - Centered */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 dark:text-zinc-100 rounded-full text-sm focus:outline-none focus:border-[#007CBC] focus:ring-1 focus:ring-[#007CBC]"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <span className="hidden lg:block text-sm font-medium cursor-pointer">
                Easy Finance
              </span>
              <span className="hidden lg:block text-sm font-medium cursor-pointer">
                Sell With Us
              </span>
              <button className="bg-[#007CBC] text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-opacity">
                Submit Enquiry
              </button>
              <button className="border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition-opacity">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier - Dark Navigation Bar */}
      <div className="bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-0">
              {categories.map((cat, i) => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className={`px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors ${
                    i === 0 ? 'bg-[#007CBC]' : ''
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <button className="flex items-center gap-1 px-3 py-3 text-white hover:bg-gray-800 transition-colors">
              <span className="text-sm font-medium">More</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}