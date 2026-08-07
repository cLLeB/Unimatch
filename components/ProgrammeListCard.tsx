import { Link } from 'react-router-dom';
import { Building2, MapPin, Clock, Banknote, ArrowLeftRight, Star, Check } from 'lucide-react';
import type { Programme } from '../types/university';

interface ProgrammeListCardProps {
  programme: Programme;
  /** The signed-in student's own aggregate, used for the "Your aggregate" comparison. */
  studentAggregate: number;
  onCompareToggle?: (programmeId: string) => void;
  onSaveToggle?: (programmeId: string) => void;
  isComparing?: boolean;
  isSaved?: boolean;
}

export default function ProgrammeListCard({
  programme,
  studentAggregate,
  onCompareToggle,
  onSaveToggle,
  isComparing = false,
  isSaved = false,
}: ProgrammeListCardProps) {
  const cutoff = programme.entryRequirements.minimumAggregate;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">{programme.name}</h3>
            {programme.qualifies ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                <Check size={12} strokeWidth={3} />
                Qualified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                Not Qualified
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
              {programme.degreeType}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Building2 size={15} />
              {programme.university}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} />
              {programme.location.split(',')[0]}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {programme.durationYears} years
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote size={15} />
              {programme.stats.annualFees.label}
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            Cut-off: <span className="font-semibold text-slate-800">Agg. {cutoff}</span>{' '}
            <span className="ml-2">
              Your aggregate:{' '}
              <span
                className={`font-semibold ${
                  studentAggregate <= cutoff ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                Agg. {studentAggregate}
              </span>
            </span>
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {programme.careerPaths.map((path) => (
              <span
                key={path.title}
                className="rounded-lg bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
              >
                {path.title}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
          <Link
            to={`/programme/${programme.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => onCompareToggle?.(programme.id)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
              isComparing
                ? 'border-teal-600 bg-teal-50 text-teal-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ArrowLeftRight size={15} />
            Compare
          </button>
          <button
            type="button"
            onClick={() => onSaveToggle?.(programme.id)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
              isSaved
                ? 'border-amber-400 bg-amber-50 text-amber-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Star size={15} fill={isSaved ? 'currentColor' : 'none'} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
