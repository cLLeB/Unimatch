import { Link } from 'react-router-dom'
import { footerColumns } from '../data/landing'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer id="about" className="bg-footer px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Helping SHS graduates navigate university admissions with
            confidence.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold text-white">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
