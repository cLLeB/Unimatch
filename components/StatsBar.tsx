import type { ProgrammeStats } from '../types/university';

interface StatsBarProps {
  stats: ProgrammeStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { ...stats.cutoff, title: 'Cut-off' },
    { ...stats.annualFees, title: 'Annual Fees' },
    { ...stats.employmentRate, title: 'Employment Rate' },
    { ...stats.averageSalary, title: 'Avg. Salary' },
  ];

  return (
    <div className="grid grid-cols-2 divide-y divide-slate-200 border-b border-slate-200 bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      {items.map((item) => (
        <div key={item.title} className="px-4 py-6 text-center sm:px-2">
          <p className="text-2xl font-bold text-teal-700 sm:text-3xl">{item.label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{item.title}</p>
          <p className="text-xs text-slate-500">{item.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
