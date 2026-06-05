import React from 'react';
import { GRAPHQL_ENDPOINT } from '../../../../lib/constants';
import PdfViewerClient from './PdfViewerClient';

async function getProduct(slug) {
  const query = `
    query GetProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        name
        slug
        shortDescription
      }
    }
  `;

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id: slug } }),
    });

    const data = await res.json();
    return data.data?.product || null;
  } catch (err) {
    console.error('Viewer fetch error:', err.message);
    return null;
  }
}

function extractDriveUrl(text) {
  if (!text) return null;
  const trimmed = text.trim();
  if (/^https?:\/\/drive\.google\.com\//.test(trimmed)) return trimmed;
  const anchorMatch = trimmed.match(/href="(https?:\/\/drive\.google\.com\/[^"]+)"/);
  if (anchorMatch) return anchorMatch[1];
  const urlMatch = trimmed.match(/(https?:\/\/drive\.google\.com\/[^\s<"']+)/);
  if (urlMatch) return urlMatch[1];
  return null;
}

export const dynamic = 'force-dynamic';

export default async function PdfViewerPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors duration-300">
            Back to Products
          </a>
        </div>
      </main>
    );
  }

  const driveUrl = extractDriveUrl(product.shortDescription);

  if (!driveUrl) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">No Document Available</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">No PDF document is linked for this product yet.</p>
          <a href={`/product/${slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-darkBlue transition-colors duration-300">
            Back to Product
          </a>
        </div>
      </main>
    );
  }

  const pdfUrl = `/api/pdf-proxy?url=${encodeURIComponent(driveUrl)}`;

  return <PdfViewerClient pdfUrl={pdfUrl} productName={product.name} productSlug={product.slug} />;
}
