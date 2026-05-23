export default function Container({ children, className = '', size = 'xl' }) {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    xl: 'max-w-2xl',
    '2xl': 'max-w-3xl',
    '3xl': 'max-w-xl',
    full: 'max-w-full',
  }

  return (
    <div className={`mx-auto w-full px-6 md:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}
