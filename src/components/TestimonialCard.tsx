import { Star } from 'lucide-react'
import type { Testimonial } from '../data/landing'

interface TestimonialCardProps extends Testimonial {}

export default function TestimonialCard({
  quote,
  initials,
  name,
  school,
  programme,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-amber-400 text-amber-400"
            strokeWidth={0}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{school}</p>
          <p className="text-xs font-medium text-brand">{programme}</p>
        </div>
      </div>
    </div>
  )
}
