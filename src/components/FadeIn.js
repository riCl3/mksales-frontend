'use client'

import { useEffect, useRef, useState } from 'react'

function useInViewOnce(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, { threshold: 0.1, rootMargin: '-50px', ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

export function FadeIn({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  duration = 0.6 
}) {
  const [ref, inView] = useInViewOnce()
  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
    none: 'translate(0, 0)',
  }
  const initialTransform = transforms[direction] || transforms.up
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0, 0)' : initialTransform,
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }) {
  const [ref, inView] = useInViewOnce()
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : undefined }}>
      {Array.isArray(children) ? children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * staggerDelay}s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * staggerDelay}s`,
          }}
        >
          {child}
        </div>
      )) : children}
    </div>
  )
}

export function StaggerItem({ children, className = '' }) {
  const [ref, inView] = useInViewOnce()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ children, className = '', delay = 0, duration = 0.5 }) {
  const [ref, inView] = useInViewOnce()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
