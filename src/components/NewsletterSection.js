'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="px-8 py-20 lg:px-16 bg-black text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
          STAY UPDATED
        </h2>
        <p className="text-zinc-400 mb-8">
          Subscribe to get the latest products and offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-white text-black font-bold border-2 border-white focus:outline-none focus:border-red-600"
          />
          <button 
            type="submit"
            className="px-8 py-4 bg-red-600 text-white font-bold border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}