import { stats } from '../data/landing'

export default function StatsSection() {
  return (
    <section id="cut-off" className="bg-brand-dark py-12 sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
