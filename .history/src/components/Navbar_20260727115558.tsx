import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/landing'
import Button from './Button'
import Logo from './Logo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' && location.pathname === '/'

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-muted text-brand'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="#login"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Log in
          </Link>
          <Button className="px-5">Check Eligibility</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <Link
              to="#login"
              className="px-3 py-2 text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Button className="w-full">Check Eligibility</Button>
          </div>
        </div>
      )}
    </header>
  )
}
