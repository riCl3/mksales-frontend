import ProductGrid from '../../components/ProductGrid';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 20) {
        nodes {
          name
          slug
          shortDescription
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
    const res = await fetch('https://mksales.co.in/graphql', {
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

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-200/80 via-zinc-100/50 to-blue-100/40 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.06]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,124,188,0.4) 2px, rgba(0,124,188,0.4) 3px)`,
        backgroundSize: '30px 30px'
      }} />
      <div className="fixed inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(0,124,188,0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative z-10 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-14">
            <div className="w-12 h-1 bg-brand-blue mb-4" />
            <h1 className="text-display-xl text-slate-900 mb-4">Products</h1>
            <p className="text-lg text-zinc-600 max-w-3xl">
              Browse our complete range of premium construction materials sourced from trusted manufacturers across India.
            </p>
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}