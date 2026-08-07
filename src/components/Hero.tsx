import { Building2, Check, Search } from 'lucide-react'
import { heroImageUrl } from '../data/landing'
import Button from './Button'

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-4 py-1.5 text-sm font-medium text-brand">
            <Check className="size-4" strokeWidth={2.5} />
            2024 Cut-off Data Now Available
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Find Every University Programme{' '}
            <span className="text-brand">You Qualify For.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            Enter your WASSCE grades and instantly discover programmes across
            Ghana&apos;s public universities — no guessing, no stress.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              icon={<Search className="size-4" />}
              className="px-6 py-3 text-base"
            >
              Check My Eligibility
            </Button>
            <Button
              variant="secondary"
              icon={<Building2 className="size-4" />}
              className="px-6 py-3 text-base"
            >
              Explore Universities
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={heroImageUrl}
              alt="Students reviewing university programmes on a laptop"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="absolute -right-2 top-6 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:right-4 sm:top-8">
            <p className="text-xs font-medium text-slate-400">Top match</p>
            <p className="mt-0.5 text-sm font-bold text-slate-900">
              Comp. Science
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              KNUST · Cut-off:{' '}
              <span className="font-semibold text-brand">12</span>
            </p>
          </div>

          <div className="absolute -bottom-4 -left-2 rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-lg sm:bottom-6 sm:left-4">
            <p className="text-xs font-medium text-slate-400">Your aggregate</p>
            <p className="mt-0.5 text-2xl font-bold text-brand">Agg. 14</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-brand">
              <Check className="size-3.5" strokeWidth={2.5} />
              23 programmes qualify
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
