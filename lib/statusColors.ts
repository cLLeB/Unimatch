import type { DeadlineStatus } from '../types/university';

export const statusColors: Record<DeadlineStatus, { dot: string; text: string }> = {
  open: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
  },
  'closing-soon': {
    dot: 'bg-amber-500',
    text: 'text-amber-600',
  },
  closed: {
    dot: 'bg-red-500',
    text: 'text-red-500',
  },
};
