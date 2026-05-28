import { Suspense } from 'react';
import ProductGrid from '../../components/ProductGrid';

export const dynamic = 'force-dynamic';

const GRAPHQL_ENDPOINT = 'https://mksales.co.in/graphql';

async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 50) {
        nodes {
          name
          slug
          shortDescription
          productCategories {
            nodes {
              name
              slug
            }
          }
          ... on SimpleProduct {
            price
            regularPrice
            image { sourceUrl }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    return data.data?.products?.nodes || [];
  } catch (err) {
    console.error('Connection Error:', err.message);
    return [];
  }
}

async function getCategories() {
  const query = `
    query GetCategories {
      productCategories(first: 20, where: { hideEmpty: true }) {
        nodes {
          name
          slug
        }
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    return data.data?.productCategories?.nodes || [];
  } catch (err) {
    console.error('Connection Error:', err.message);
    return [];
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-white via-[#F0F5FA] to-[#E2EBF3] dark:from-[#020C14] dark:via-[#051A2A] dark:to-[#082638] transition-colors duration-300">
      <div className="absolute inset-0 section-texture pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1 opacity-10 dark:opacity-15" />
        <div className="trust-orb trust-orb-2 opacity-8 dark:opacity-12" />
        <div className="trust-orb trust-orb-3 opacity-5 dark:opacity-10" />
      </div>

      <div className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block w-1.5 h-6 bg-brand-green rounded-full" />
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-green">Our Collection</span>
            </div>
            <h1 className="text-display-xl text-brand-darkBlue dark:text-white mb-4">Products</h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-300">
              Browse our complete range of premium construction materials sourced from trusted manufacturers across India.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <Suspense fallback={<div className="h-96 animate-pulse bg-white/60 dark:bg-white/5 rounded-xl" />}>
            <ProductGrid products={products} categories={categories} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
