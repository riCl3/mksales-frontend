export default function Section({ children, className = '', background = 'white', padding = 'lg' }) {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-zinc-50',
    dark: 'bg-zinc-900',
    blue: 'bg-brand-blue',
    concrete: 'bg-zinc-100',
  }

  const paddingClasses = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-22',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className} ${background === 'concrete' ? 'section-texture' : ''}`}>
      {children}
    </section>
  )
}
