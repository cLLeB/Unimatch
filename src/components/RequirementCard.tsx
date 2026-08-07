import type { RequiredSubject } from '../types/university';

interface RequirementCardProps {
  heading: string;
  subjects: RequiredSubject[];
}

export default function RequirementCard({ heading, subjects }: RequirementCardProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {heading}
      </h3>
      <ul className="flex flex-col gap-2">
        {subjects.map((s) => (
          <li
            key={s.subject}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm"
          >
            <span className="font-medium text-slate-700">{s.subject}</span>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
              Min. {s.minimumGrade}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
