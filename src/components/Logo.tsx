import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark'
}

export default function Logo({ variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-full bg-brand">
        <GraduationCap className="size-5 text-white" strokeWidth={2} />
      </div>
      <span className="text-lg font-bold tracking-tight">
        <span className={isLight ? 'text-white' : 'text-slate-900'}>
          UniMatch
        </span>{' '}
        <span className="text-brand">Ghana</span>
      </span>
    </Link>
  )
}
