import { Compass } from 'lucide-react'
import { LinkButton } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <Compass size={40} className="text-ink-muted" aria-hidden="true" />
      <div>
        <h1 className="text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          That link doesn&apos;t lead anywhere. It may have moved, or the address may have a typo.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <LinkButton to="/">Back to home</LinkButton>
        <LinkButton to="/eligibility" variant="outline">
          Check my eligibility
        </LinkButton>
      </div>
    </div>
  )
}
