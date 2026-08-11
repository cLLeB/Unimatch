import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { NAV_GROUPS, PRIMARY_NAV, hasBottomNav, isNavItemActive } from './navItems'

/** Drag this far right and the sheet closes on release. */
const SWIPE_CLOSE_PX = 80

/**
 * The whole map, in one sheet.
 *
 * The in-app menu used to hold two links, Home and How it works, because
 * the sidebar "already owned" the rest. The sidebar is `lg:` and up, so on a
 * phone that reasoning left most of the app unreachable except by guessing a
 * URL. Everything is listed here, grouped, with a line saying what each one
 * is for.
 */
export default function NavMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation()
  const tabsCarryPrimary = hasBottomNav(pathname)
  const [dragX, setDragX] = useState(0)
  const startX = useRef<number | null>(null)

  // Escape closes it, and the page behind must not scroll under the sheet.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  // Reset the drag whenever the sheet opens, or it reopens mid-swipe.
  useEffect(() => {
    if (open) setDragX(0)
  }, [open])

  if (!open) return null

  /*
   * Portalled to the body. The navbar carries `backdrop-blur`, and a
   * backdrop-filter makes an element a containing block for `position: fixed`
   * descendants, so rendering the sheet in place clipped it to the 64px
   * height of the navbar and left the page showing through.
   */
  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/*
        Never full width. A sheet edge-to-edge leaves nowhere to tap back out,
        so a strip of the page stays visible on the left: it shows what you are
        returning to, and it is the target for dismissing. It also drags: pull
        the sheet right and it closes on release, which is how a thumb expects
        to shut a right-hand panel.
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onTouchStart={(event) => {
          startX.current = event.touches[0]?.clientX ?? null
        }}
        onTouchMove={(event) => {
          if (startX.current === null) return
          const delta = (event.touches[0]?.clientX ?? 0) - startX.current
          // Rightwards only; pulling left must not tear it off its edge.
          setDragX(Math.max(0, delta))
        }}
        onTouchEnd={() => {
          if (dragX > SWIPE_CLOSE_PX) onClose()
          else setDragX(0)
          startX.current = null
        }}
        style={{
          transform: dragX ? `translateX(${dragX}px)` : undefined,
          transition: startX.current === null ? 'transform 200ms ease-out' : undefined,
        }}
        className="absolute inset-y-0 right-0 flex w-[calc(100%-4rem)] max-w-sm flex-col bg-surface shadow-xl"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
          <span className="text-sm font-semibold text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-11 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="All sections">
          {NAV_GROUPS.map((group) => (
            <div
              key={group.title}
              className={cn(
                'mb-5 last:mb-0',
                /*
                 * Overflow, not a second copy of the navigation.
                 *
                 * Below `lg` the tab bar is already carrying these five, and a
                 * drawer that repeats them makes a student choose between two
                 * routes to the same place. From `lg` up the tabs are gone, so
                 * the group comes back.
                 */
                group.items === PRIMARY_NAV && tabsCarryPrimary && 'hidden lg:block',
              )}
            >
              <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {group.title}
              </h2>
              <ul>
                {group.items.map(({ label, to, icon: Icon, hint }) => {
                  const active = isNavItemActive(to, pathname)
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 transition-colors',
                          active
                            ? 'bg-brand-subtle text-brand'
                            : 'text-ink hover:bg-canvas',
                        )}
                      >
                        <Icon size={18} aria-hidden="true" className="shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium">{label}</span>
                          {hint && (
                            <span className="block truncate text-xs text-ink-muted">{hint}</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>,
    document.body,
  )
}
