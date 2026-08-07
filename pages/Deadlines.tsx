import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DeadlinesHeader from '../components/DeadlinesHeader';
import StatusLegend from '../components/StatusLegend';
import DeadlineCard from '../components/DeadlineCard';
import { currentUser } from '../data/universityData';
import { deadlines } from '../data/deadlineData';
import type { DeadlineStatus } from '../types/university';

type FilterOption = 'all' | DeadlineStatus;

const filterTabs: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'closing-soon', label: 'Closing Soon' },
  { value: 'closed', label: 'Closed' },
];

export default function Deadlines() {
  const [filter, setFilter] = useState<FilterOption>('all');

  const visibleDeadlines = useMemo(
    () => (filter === 'all' ? deadlines : deadlines.filter((d) => d.status === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={currentUser} />

      <div className="flex">
        <Sidebar active="deadlines" />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <DeadlinesHeader
            title="Deadline Tracker"
            subtitle="2024–2025 Admissions Calendar"
          />

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <StatusLegend />

            <div className="inline-flex gap-1 self-start rounded-full bg-slate-100 p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === tab.value
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {visibleDeadlines.map((deadline) => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}

            {visibleDeadlines.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                No deadlines match this filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
