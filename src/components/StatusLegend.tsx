import type { DeadlineStatus } from '../types/university';
import { statusColors } from '../lib/statusColors';

const legendItems: { status: DeadlineStatus; label: string }[] = [
  { status: 'open', label: 'Open' },
  { status: 'closing-soon', label: 'Closing Soon' },
  { status: 'closed', label: 'Closed' },
];

export default function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {legendItems.map(({ status, label }) => (
        <span key={status} className="flex items-center gap-2 text-sm text-slate-600">
          <span className={`h-2.5 w-2.5 rounded-full ${statusColors[status].dot}`} />
          {label}
        </span>
      ))}
    </div>
  );
}
