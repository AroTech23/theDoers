'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function TopProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const clearAllTimers = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  // When pathname or searchParams change (page finished loading/transitioning)
  useEffect(() => {
    if (visible) {
      clearAllTimers()
      setProgress(100)

      // Instantly finish and fade out completely
      const hideTimer = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 350)
      timeoutsRef.current.push(hideTimer)

      return () => clearAllTimers()
    }
  }, [pathname, searchParams])

  // Listen to global clicks on internal navigation links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      const targetAttr = target.getAttribute('target')
      const downloadAttr = target.getAttribute('download')

      // Ignore external, anchor links, mailto, downloads, new tabs
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        targetAttr === '_blank' ||
        downloadAttr !== null
      ) {
        return
      }

      // Check if it's actually navigating to a new destination
      const currentUrl = window.location.pathname + window.location.search
      if (href === currentUrl || href === window.location.pathname) {
        return
      }

      // Start progress bar animation
      clearAllTimers()
      setVisible(true)
      setProgress(30)

      // Step progress smoothly
      const t1 = setTimeout(() => setProgress(65), 180)
      const t2 = setTimeout(() => setProgress(85), 450)

      // Safety timeout: automatically force completion and disappearance after 3.5s max if anything stalled
      const safetyTimer = setTimeout(() => {
        setProgress(100)
        const tFade = setTimeout(() => {
          setVisible(false)
          setProgress(0)
        }, 300)
        timeoutsRef.current.push(tFade)
      }, 3500)

      timeoutsRef.current.push(t1, t2, safetyTimer)
    }

    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
      clearAllTimers()
    }
  }, [])

  if (!visible && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[3px] bg-transparent overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#C7D2FE] shadow-[0_0_10px_rgba(79,70,229,0.9)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 
            ? 'width 150ms ease-out, opacity 250ms 100ms ease-in' 
            : 'width 250ms ease-out'
        }}
      />
    </div>
  )
}
