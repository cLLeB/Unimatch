import type { Programme } from '../types/university';
import InfoSection from './InfoSection';
import CareerPathsCard from './CareerPathsCard';

interface CareersTabProps {
  programme: Programme;
}

export default function CareersTab({ programme }: CareersTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <InfoSection title="Employment Outlook" className="lg:col-span-2">
        <p className="text-sm leading-relaxed text-slate-600">
          Graduates of {programme.name} at {programme.university} report an employment rate of{' '}
          <span className="font-semibold text-slate-800">
            {programme.stats.employmentRate.label}
          </span>{' '}
          within one year of completing the programme, with an average starting salary of{' '}
          <span className="font-semibold text-slate-800">
            {programme.stats.averageSalary.label}
          </span>
          . Demand for graduates continues to grow across banking, telecom, and the wider tech
          sector in Ghana.
        </p>
      </InfoSection>

      <CareerPathsCard paths={programme.careerPaths} />
    </div>
  );
}
