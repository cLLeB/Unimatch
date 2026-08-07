import { features } from '../data/landing'
import FeatureCard from './FeatureCard'

export default function FeaturesSection() {
  return (
    <section id="resources" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to decide your future
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Powerful tools designed specifically for Ghanaian SHS graduates
            navigating university admissions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
