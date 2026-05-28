export default function Section({ children, className = '', background = 'white', padding = 'lg' }) {
  const backgroundClasses = {
    white: 'bg-white dark:bg-zinc-900',
    light: 'bg-zinc-50 dark:bg-zinc-800/50',
    dark: 'bg-zinc-900 dark:bg-zinc-950',
    blue: 'bg-brand-blue dark:bg-blue-800',
    concrete: 'bg-zinc-100 dark:bg-zinc-800',
    green: 'bg-brand-green dark:bg-green-800',
    'dark-green': 'bg-brand-dark dark:bg-zinc-950',
    'gradient-blue': 'bg-gradient-to-br from-brand-blue to-brand-dark',
    'gradient-green': 'bg-gradient-to-br from-brand-green to-brand-dark',
  }

  const paddingClasses = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-22',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className} transition-colors duration-300 ${background === 'concrete' ? 'section-texture' : ''}`}>
      {children}
    </section>
  )
}
