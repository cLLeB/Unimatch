import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Grade Checker', to: '/eligibility' },
      { label: 'All Programmes', to: '/dashboard' },
      { label: 'Simulator', to: '/simulator' },
      { label: 'Compare', to: '/compare' },
      { label: 'AI Advisor', to: '/advisor' },
    ],
  },
  {
    title: 'Universities',
    links: [
      { label: 'KNUST', to: '/dashboard?university=knust' },
      { label: 'University of Ghana', to: '/dashboard?university=ug' },
      { label: 'UCC', to: '/dashboard?university=ucc' },
      { label: 'All Universities', to: '/dashboard' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/#faq' },
      { label: 'Data & Sources', to: '/#faq' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Use', to: '/terms' },
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 font-bold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-brand">
                <GraduationCap size={14} className="text-white" aria-hidden="true" />
              </span>
              UniMatch Ghana
            </div>
            <p className="text-sm text-footer-text">
              Helping SHS graduates navigate university admissions with confidence.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <div className="mb-3 text-sm font-semibold text-white">{column.title}</div>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block py-0.5 text-sm text-footer-text transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-footer-line pt-6 text-xs text-footer-text sm:flex-row">
          <span>© {new Date().getFullYear()} UniMatch Ghana. All rights reserved.</span>
          <span>Built for Ghana&apos;s next generation.</span>
        </div>
      </div>
    </footer>
  )
}
