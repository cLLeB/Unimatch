import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'

export interface Crumb {
  label: string
  /** Omitted on the final crumb, which is the page you are on. */
  to?: string
}

/**
 * Where you are, and every level above it.
 *
 * Detail pages used to offer one link, "Back to Results", hard-wired to
 * `/dashboard`. Reach a programme from a university page or your shortlist and
 * it threw you somewhere you had not been, which is how a student ends up
 * three screens from where she meant to be. A trail cannot lie in that way:
 * it describes the catalogue's real shape, so it reads the same however you
 * arrived.
 *
 * The back arrow is separate and does mean "where I came from". It uses
 * history when there is in-app history to use, and the parent crumb when
 * there is not — a deep link from search, or a shared URL, has no history to
 * go back to and would otherwise leave the app.
 */
export default function Breadcrumbs({
  crumbs,
  className,
  tone = 'default',
}: {
  crumbs: Crumb[]
  className?: string
  /** `onBrand` for use on the coloured page headers. */
  tone?: 'default' | 'onBrand'
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const parent = [...crumbs].reverse().find((crumb) => crumb.to)
  const hasHistory = location.key !== 'default'

  const muted = tone === 'onBrand' ? 'text-on-brand' : 'text-ink-muted'
  const strong = tone === 'onBrand' ? 'text-on-brand-fill' : 'text-ink'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => (hasHistory ? navigate(-1) : navigate(parent?.to ?? '/home'))}
        className={cn(
          'inline-flex min-h-11 items-center gap-1 rounded-lg pr-2 text-sm font-medium transition-colors',
          muted,
          tone === 'onBrand' ? 'hover:text-on-brand-fill' : 'hover:text-ink',
        )}
      >
        <ChevronLeft size={18} aria-hidden="true" />
        Back
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className={cn('flex min-w-0 items-center gap-1 text-xs', muted)}>
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1
            return (
              <li key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-1">
                {index > 0 && (
                  <ChevronRight size={12} aria-hidden="true" className="shrink-0 opacity-60" />
                )}
                {crumb.to && !last ? (
                  <Link to={crumb.to} className="shrink-0 hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={cn('truncate', last && strong)} aria-current={last ? 'page' : undefined}>
                    {crumb.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
