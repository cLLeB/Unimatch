import { Info } from 'lucide-react';
import type { EntryRequirements } from '../types/university';
import InfoSection from './InfoSection';
import RequirementCard from './RequirementCard';

interface RequirementsTabProps {
  requirements: EntryRequirements;
}

export default function RequirementsTab({ requirements }: RequirementsTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <InfoSection title="Entry Requirements" className="lg:col-span-2">
        <p className="mb-6 text-sm text-slate-600">
          Minimum aggregate required:{' '}
          <span className="font-semibold text-teal-700">
            Agg. {requirements.minimumAggregate}
          </span>
        </p>
        <div className="flex flex-col gap-6">
          <RequirementCard heading="Core Subjects" subjects={requirements.coreSubjects} />
          <RequirementCard heading="Elective Subjects" subjects={requirements.electiveSubjects} />
        </div>
      </InfoSection>

      <InfoSection title="Notes">
        <ul className="flex flex-col gap-3">
          {requirements.notes.map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-slate-600">
              <Info size={16} className="mt-0.5 shrink-0 text-teal-600" />
              {note}
            </li>
          ))}
        </ul>
      </InfoSection>
    </div>
  );
}
