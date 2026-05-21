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
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #e8f0fe 60%, #dbeafe 100%)' }}>
      <div className="absolute inset-0 section-texture pointer-events-none" />

      <div className="relative z-10 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-12">
            <div className="w-12 h-1 bg-brand-blue mb-4" />
            <h1 className="text-display-xl text-slate-900 mb-4">Products</h1>
            <p className="text-lg text-zinc-600 max-w-3xl">
              Browse our complete range of premium construction materials sourced from trusted manufacturers across India.
            </p>
          </div>

          <Suspense fallback={<div className="h-96 animate-pulse bg-zinc-100 rounded-xl" />}>
            <ProductGrid products={products} categories={categories} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
