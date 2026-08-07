import { CheckCircle2, Circle } from 'lucide-react';
import type { ChecklistItem } from '../types/university';

interface ApplicationProgressProps {
  items: ChecklistItem[];
  onToggleItem?: (id: string) => void;
}

export default function ApplicationProgress({ items, onToggleItem }: ApplicationProgressProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const percent = items.length === 0 ? 0 : Math.round((completedCount / items.length) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Application Checklist</h2>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>
          {completedCount}/{items.length} complete
        </span>
        <span>{percent}%</span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onToggleItem?.(item.id)}
              className="flex w-full items-center gap-2.5 text-left"
            >
              {item.completed ? (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
              ) : (
                <Circle size={18} className="shrink-0 text-slate-300" />
              )}
              <span
                className={`text-sm ${
                  item.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
