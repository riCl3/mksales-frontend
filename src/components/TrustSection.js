import TypewriterText from './TypewriterText'

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-28 md:py-36">
      <div className="absolute inset-0 section-texture opacity-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="trust-orb trust-orb-1" />
        <div className="trust-orb trust-orb-2" />
        <div className="trust-orb trust-orb-3" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/60 dark:from-zinc-950/60 dark:to-zinc-950/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="opacity-100 translate-y-0 transition-all duration-700">
          <span className="section-accent mb-4 block" />
          <h2 className="text-display-xl text-white mb-4 max-w-2xl min-h-[4.5rem]">
            Trusted Industrial Solutions:<br />
            <span className="text-brand-green text-display-lg"><TypewriterText /></span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            From foundation to finish, we supply premium construction materials
            engineered for performance. Backed by Pan-India logistics and quality assurance.
          </p>
        </div>
      </div>
    </section>
  )
}



