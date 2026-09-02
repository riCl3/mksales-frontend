import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import CategoriesSection from '../components/CategoriesSection';
import Link from 'next/link';
import { WORDPRESS_URL } from '../lib/constants';

const WhyChooseUs = dynamic(() => import('../components/WhyChooseUs'), {
  ssr: true,
  loading: () => <div className="py-28 md:py-36 bg-brand-dark animate-pulse" style={{ minHeight: '600px' }} />,
});
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'), {
  ssr: true,
  loading: () => <div className="py-28 md:py-36 bg-slate-900 animate-pulse" style={{ minHeight: '400px' }} />,
});

export const revalidate = 3600;

async function getCategories() {
  const PLACEHOLDER_IMG = `${WORDPRESS_URL}/wp-content/plugins/categories-images/assets/images/placeholder.png`;
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/product_cat?per_page=20&hide_empty=true`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(cat => ({
      name: cat.name,
      slug: cat.slug,
      image: cat.z_taxonomy_image_url && cat.z_taxonomy_image_url !== PLACEHOLDER_IMG
        ? { sourceUrl: cat.z_taxonomy_image_url }
        : null,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  return (
    <>
      <Hero />

      <TrustSection />

      <CategoriesSection categories={categories} />

      <WhyChooseUs />

      <TestimonialsSection />

      <section className="py-28 md:py-36 bg-gradient-to-br from-brand-blue to-brand-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <span className="section-accent mx-auto mb-5 block" />
          <h2 className="text-display-md text-white mb-5">Browse Our Products</h2>
          <p className="text-lg text-blue-200/70 mb-14 leading-relaxed">
            Explore our complete catalog of premium construction materials for every project.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-9 py-4 bg-white text-brand-blue font-bold hover:bg-brand-green hover:text-white transition-all duration-300 rounded-xl shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Products
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}



