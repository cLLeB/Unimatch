import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import type { SavedProgrammeSummary } from '../types/university';

interface SavedProgramsProps {
  programmes: SavedProgrammeSummary[];
  onRemove?: (id: string) => void;
  onAddProgramme?: () => void;
}

export default function SavedPrograms({ programmes, onRemove, onAddProgramme }: SavedProgramsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Saved Programmes</h2>

      <ul className="mt-4 flex flex-col divide-y divide-slate-100">
        {programmes.map((programme) => (
          <li key={programme.id} className="flex items-center justify-between gap-4 py-4 first:pt-0">
            <Link to={`/programme/${programme.programmeId}`} className="min-w-0">
              <p className="font-semibold text-slate-900 hover:underline">{programme.name}</p>
              <p className="text-sm text-slate-500">
                {programme.university} &middot; {programme.degreeType}
              </p>
            </Link>

            <div className="flex shrink-0 items-center gap-3">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Agg. {programme.cutoffAggregate}
              </span>
              <button
                type="button"
                onClick={() => onRemove?.(programme.id)}
                aria-label={`Remove ${programme.name} from saved programmes`}
                className="text-slate-400 transition-colors hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}

        {programmes.length === 0 && (
          <li className="py-6 text-center text-sm text-slate-500">
            You haven't saved any programmes yet.
          </li>
        )}
      </ul>

      <button
        type="button"
        onClick={onAddProgramme}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
      >
        <Plus size={16} />
        Add Programme
      </button>
    </div>
  );
}
