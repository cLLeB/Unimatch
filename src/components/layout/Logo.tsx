import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface LogoProps {
  /** Footer variant renders on the dark surface. */
  tone?: 'default' | 'inverse'
  className?: string
}

export default function Logo({ tone = 'default', className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'flex items-center gap-2.5 font-bold',
        tone === 'inverse' ? 'text-white' : 'text-ink',
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand">
        <GraduationCap size={18} className="text-white" aria-hidden="true" />
      </span>
      <span className="text-lg">
        UniMatch<span className="text-brand"> Ghana</span>
      </span>
    </Link>
  )
}
