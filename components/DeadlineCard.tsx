import { Calendar } from 'lucide-react';
import type { DeadlineEntry } from '../types/university';
import { statusColors } from '../lib/statusColors';
import StatusBadge from './StatusBadge';

interface DeadlineCardProps {
  deadline: DeadlineEntry;
}

export default function DeadlineCard({ deadline }: DeadlineCardProps) {
  const colors = statusColors[deadline.status];

  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`w-1.5 shrink-0 ${colors.dot}`} />

      <div className="flex flex-1 items-center justify-between gap-4 py-5 pl-5 pr-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{deadline.university}</h3>
            <StatusBadge status={deadline.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{deadline.scope}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <Calendar size={14} />
            Deadline: {deadline.deadlineDate}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className={`text-3xl font-bold ${colors.text}`}>{deadline.daysLeft}</p>
          <p className="text-sm text-slate-500">days left</p>
        </div>
      </div>
    </div>
  );
}
