import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ProsConsCardProps {
  title: 'Pros' | 'Cons';
  items: string[];
}

export default function ProsConsCard({ title, items }: ProsConsCardProps) {
  const Icon = title === 'Pros' ? CheckCircle2 : AlertCircle;
  const iconColor = title === 'Pros' ? 'text-emerald-500' : 'text-amber-500';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-slate-900">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <Icon size={18} className={`mt-0.5 shrink-0 ${iconColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
