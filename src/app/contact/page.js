export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="w-12 h-1 bg-brand-blue mb-4" />
        <h1 className="text-display-xl text-slate-900 mb-4">Contact Us</h1>
        <p className="text-lg text-zinc-600 mb-12">
          Get in touch for quotes, bulk orders, or any inquiries about our construction materials.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Email</h3>
                <p className="text-slate-900">info@mksales.co.in</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Phone</h3>
                <p className="text-slate-900">+91 XXXXX XXXXX</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Address</h3>
                <p className="text-slate-900">India</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 border border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 border border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea id="message" rows="5" className="w-full px-4 py-3 border border-slate-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="px-8 py-3 bg-brand-blue text-white font-semibold hover:bg-blue-600 transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
