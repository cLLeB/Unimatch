import { ChevronLeft, Check, X, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Programme } from '../types/university';

interface ProgrammeHeaderProps {
  programme: Programme;
  backTo?: string;
}

export default function ProgrammeHeader({ programme, backTo = '/dashboard' }: ProgrammeHeaderProps) {
  const initial = programme.university.charAt(0).toUpperCase();

  return (
    <div className="bg-gradient-to-br from-teal-900 to-teal-800 px-4 pb-8 pt-6 text-white sm:px-6 lg:px-10">
      <Link
        to={backTo}
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-teal-100 hover:text-white"
      >
        <ChevronLeft size={16} />
        Back to Results
      </Link>

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold">
            {initial}
          </div>
          <div>
            {programme.qualifies ? (
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-800">
                <Check size={14} strokeWidth={3} />
                You Qualify
              </span>
            ) : (
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                <X size={14} strokeWidth={3} />
                Below Cut-off
              </span>
            )}
            <h1 className="text-3xl font-bold sm:text-4xl">{programme.name}</h1>
            <p className="mt-1 text-teal-100">
              {programme.university} &middot; {programme.faculty}
            </p>
            <p className="mt-2 text-sm text-teal-200">
              {programme.degreeType} &middot; {programme.durationYears} years &middot;{' '}
              {programme.location}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition-colors hover:bg-teal-50"
          >
            <ArrowRight size={16} />
            Apply Now
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-100 hover:text-white"
          >
            <MessageSquare size={16} />
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}
