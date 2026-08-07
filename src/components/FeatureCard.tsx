import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-sm">
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-brand-light">
        <Icon className="size-5 text-brand" strokeWidth={2} />
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  )
}
