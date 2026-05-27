import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import CategoriesSection from '../components/CategoriesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Hero />
      
      <TrustSection />

      <div id="categories">
        <CategoriesSection />
      </div>

      <WhyChooseUs />

      <TestimonialsSection />

      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <div className="w-12 h-1 bg-brand-green mx-auto mb-4" />
          <h2 className="text-display-md text-white mb-4">Browse Our Products</h2>
          <p className="text-lg text-blue-200 mb-8">
            Explore our complete catalog of premium construction materials.
          </p>
          <Link href="/products" className="inline-flex px-8 py-3 bg-white text-brand-blue font-semibold hover:bg-brand-green hover:text-white transition-colors duration-300 rounded-lg shadow-lg">
            View All Products →
          </Link>
        </div>
      </section>
    </main>
  );
}
