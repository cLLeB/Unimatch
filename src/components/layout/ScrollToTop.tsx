import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * A fragment we are willing to hand to `querySelector`: "#" followed by a
 * plain element id.
 *
 * This guard is not cosmetic. Supabase returns its tokens in the URL fragment,
 * so every magic-link sign-in lands on `#access_token=...&refresh_token=...`,
 * and an errored sign-in lands on `#error=access_denied&error_code=...`.
 * Passing either to `querySelector` throws a DOMException for an invalid
 * selector, and a throw inside this effect unmounts the whole React tree: the
 * student sees a blank page at the exact moment they finish signing in.
 */
const ELEMENT_ID = /^#[A-Za-z][\w-]*$/

/**
 * Reset scroll on navigation, and honour `#anchor` links from the navbar and
 * footer (e.g. "About" → the landing page FAQ).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (ELEMENT_ID.test(hash)) {
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
