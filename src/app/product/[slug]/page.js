import React from 'react';
import Link from 'next/link';

async function getProduct(slug) {
  const GRAPHQL_ENDPOINT = 'http://mksales.co.local/graphql';
  
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
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
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
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const price = product.price || product.regularPrice;

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          <div className="border-b lg:border-b-0 lg:border-r border-slate-200">
            {product.image?.sourceUrl ? (
              <img
                src={product.image.sourceUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <span className="text-9xl font-bold text-slate-300">
                  {product.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-slate-900 mb-8">
              {price ? `₹${price}` : 'Price on request'}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/" 
                className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-medium text-sm uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                ← Back to Gallery
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-blue-600 text-white font-medium text-sm uppercase tracking-wider hover:bg-blue-700 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 lg:px-16 max-w-4xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Specifications</h2>
        <div className="w-16 h-1 bg-blue-600 mb-8"></div>
        {product.shortDescription || product.description ? (
          <div 
            className="text-base text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.shortDescription || product.description }}
          />
        ) : (
          <p className="text-slate-400">No description available.</p>
        )}
      </section>
    </main>
  );
}