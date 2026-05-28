import React from 'react';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';

const GRAPHQL_ENDPOINT = 'https://mksales.co.in/graphql';

async function getProduct(slug) {
  const productSlug = typeof slug === 'object' ? slug.slug : slug;

  const query = `
    query GetProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        name
        description
        ... on SimpleProduct {
          price
          regularPrice
          image {
            sourceUrl
          }
        }
        shortDescription
        productCategories {
          nodes {
            name
            slug
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
      body: JSON.stringify({ query, variables: { id: productSlug } }),
    });

    const responseData = await res.json();
    return responseData.data?.product || null;
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
