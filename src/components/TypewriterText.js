'use client'

import { useState, useEffect, useCallback } from 'react'

const taglines = [
  'From foundation to finish',
  'Pan-India logistics network',
  'Quality assured materials',
  'Delivered with precision',
]

export default function TypewriterText() {
  const [displayed, setDisplayed] = useState('')
  const [tagIndex, setTagIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = taglines[tagIndex]

    if (!deleting) {
      if (charIndex < current.length) {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else {
        setTimeout(() => setDeleting(true), 1500)
        return
      }
    } else {
      if (charIndex > 0) {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else {
        setDeleting(false)
        setTagIndex(t => (t + 1) % taglines.length)
        return
      }
    }
  }, [tagIndex, charIndex, deleting])

  useEffect(() => {
    const speed = deleting ? 40 : 80
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, deleting])

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-brand-green">|</span>
    </span>
  )
}
