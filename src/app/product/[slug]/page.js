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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-brand-green font-semibold hover:underline">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
