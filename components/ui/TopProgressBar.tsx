'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function TopProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  // When pathname or searchParams change, complete the progress bar
  useEffect(() => {
    if (isNavigating) {
      setProgress(100)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setProgress(0)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  // Listen to global click events on internal navigation links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      const targetAttr = target.getAttribute('target')

      // Only trigger for internal links that aren't opening a new tab/window, hash links, or current route
      if (
        href &&
        !href.startsWith('http') &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        targetAttr !== '_blank'
      ) {
        const currentUrl = window.location.pathname + window.location.search
        if (href !== currentUrl) {
          setIsNavigating(true)
          setProgress(25)

          // Gradually increment progress to show activity
          const p1 = setTimeout(() => setProgress(55), 150)
          const p2 = setTimeout(() => setProgress(80), 400)

          return () => {
            clearTimeout(p1)
            clearTimeout(p2)
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  if (!isNavigating && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#C7D2FE] shadow-[0_0_8px_rgba(79,70,229,0.8)] transition-all ease-out duration-200"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? 'width 200ms ease-out, opacity 300ms 150ms ease-in' : 'width 300ms ease-out'
        }}
      />
    </div>
  )
}
