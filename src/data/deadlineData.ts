import type { DeadlineEntry } from '../types/university';

/**
 * In a real app this would come from `GET /deadlines?studentId=...`.
 * daysLeft would typically be computed server-side (or derived client-side
 * from deadlineDate vs. today) rather than stored statically.
 */
export const deadlines: DeadlineEntry[] = [
  {
    id: 'knust-all',
    university: 'KNUST',
    scope: 'All Programmes',
    deadlineDate: 'March 28, 2025',
    status: 'open',
    daysLeft: 82,
  },
  {
    id: 'ug-medicine-law',
    university: 'University of Ghana',
    scope: 'Medicine & Law',
    deadlineDate: 'January 31, 2025',
    status: 'closing-soon',
    daysLeft: 25,
  },
  {
    id: 'ucc-all',
    university: 'University of Cape Coast',
    scope: 'All Programmes',
    deadlineDate: 'February 14, 2025',
    status: 'open',
    daysLeft: 39,
  },
  {
    id: 'uds-health-sciences',
    university: 'UDS',
    scope: 'Health Sciences',
    deadlineDate: 'January 24, 2025',
    status: 'closing-soon',
    daysLeft: 18,
  },
  {
    id: 'uew-all',
    university: 'UEW',
    scope: 'All Programmes',
    deadlineDate: 'December 20, 2024',
    status: 'closed',
    daysLeft: 0,
  },
  {
    id: 'gimpa-law',
    university: 'GIMPA',
    scope: 'Law (LLB)',
    deadlineDate: 'February 28, 2025',
    status: 'open',
    daysLeft: 53,
  },
];
