import { universities } from '../data/landing'

export default function UniversitiesSection() {
  return (
    <section
      id="universities"
      className="border-y border-slate-100 bg-white py-10 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Cut-off data from Ghana&apos;s leading universities
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {universities.map((university) => (
            <div
              key={university.name}
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">
                {university.letter}
              </span>
              <span className="text-sm font-medium text-slate-700">
                {university.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
