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

      <section className="py-24 bg-gradient-to-br from-zinc-200/70 via-zinc-100/50 to-blue-100/30 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-blue/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle, rgba(0,124,188,0.3) 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,124,188,0.3) 2px, rgba(0,124,188,0.3) 3px)`,
          backgroundSize: '35px 35px'
        }} />
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <div className="w-12 h-1 bg-brand-blue mx-auto mb-4" />
          <h2 className="text-display-md text-slate-900 mb-4">Browse Our Products</h2>
          <p className="text-lg text-zinc-600 mb-8">
            Explore our complete catalog of premium construction materials.
          </p>
          <Link href="/products" className="inline-flex px-8 py-3 bg-brand-blue text-white font-semibold hover:bg-blue-600 transition-colors duration-300">
            View All Products →
          </Link>
        </div>
      </section>
    </main>
  );
}