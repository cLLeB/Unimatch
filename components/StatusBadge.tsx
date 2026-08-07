import type { DeadlineStatus } from '../types/university';

interface StatusBadgeProps {
  status: DeadlineStatus;
}

const statusConfig: Record<DeadlineStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-emerald-50 text-emerald-600',
  },
  'closing-soon': {
    label: 'Closing Soon',
    className: 'bg-amber-50 text-amber-600',
  },
  closed: {
    label: 'Closed',
    className: 'bg-red-50 text-red-500',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
