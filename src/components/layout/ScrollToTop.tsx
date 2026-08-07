import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Reset scroll on navigation, and honour `#anchor` links from the navbar and
 * footer (e.g. "About" → the landing page FAQ).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
