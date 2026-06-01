import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import CategoriesSection from '../components/CategoriesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />

      <TrustSection />

      <CategoriesSection />

      <WhyChooseUs />

      <TestimonialsSection />

      <section className="py-24 md:py-32 bg-gradient-to-br from-brand-blue to-brand-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 section-texture pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <span className="section-accent mx-auto mb-4 block" />
          <h2 className="text-display-md text-white mb-4">Browse Our Products</h2>
          <p className="text-lg text-blue-200/80 mb-12">
            Explore our complete catalog of premium construction materials for every project.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-blue font-bold hover:bg-brand-green hover:text-white transition-all duration-300 rounded-lg shadow-lg shadow-black/10"
          >
            View All Products
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}



