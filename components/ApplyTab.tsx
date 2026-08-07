import { CalendarClock, ArrowRight } from 'lucide-react';
import type { Programme } from '../types/university';
import InfoSection from './InfoSection';

interface ApplyTabProps {
  programme: Programme;
}

export default function ApplyTab({ programme }: ApplyTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <InfoSection title="Application Deadlines" className="lg:col-span-2">
        <ul className="flex flex-col gap-3">
          {programme.deadlines.map((deadline) => (
            <li
              key={deadline.label}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <CalendarClock size={16} className="text-teal-600" />
                <span className="text-sm font-medium text-slate-700">{deadline.label}</span>
              </div>
              <span
                className={`text-sm font-semibold ${
                  deadline.isPast ? 'text-slate-400 line-through' : 'text-slate-800'
                }`}
              >
                {deadline.date}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto"
        >
          <ArrowRight size={16} />
          Start Application
        </button>
      </InfoSection>

      <InfoSection title="Fees Breakdown">
        <p className="mb-4 text-sm text-slate-600">
          Annual fees: <span className="font-semibold text-slate-800">{programme.fees.annual}</span>
        </p>
        <ul className="flex flex-col gap-2">
          {programme.fees.breakdown.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{item.label}</span>
              <span className="font-medium text-slate-800">{item.amount}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
          {programme.fees.total}
        </p>
      </InfoSection>
    </div>
  );
}
