'use client'

import { usePathname } from 'next/navigation'

export default function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="animate-page-in"
      style={{ animation: 'pageIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {children}
    </div>
  )
}
