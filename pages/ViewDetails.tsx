import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProgrammeHeader from '../components/ProgrammeHeader';
import StatsBar from '../components/StatsBar';
import TabNav from '../components/TabNav';
import ProgrammeOverview from '../components/ProgrammeOverview';
import CutoffTrendChart from '../components/CutoffTrendChart';
import ProsConsCard from '../components/ProsConsCard';
import CareerPathsCard from '../components/CareerPathsCard';
import RequirementsTab from '../components/RequirementsTab';
import CareersTab from '../components/CareersTab';
import ApplyTab from '../components/ApplyTab';
import { currentUser, getProgrammeById } from '../data/universityData';
import type { TabId } from '../types/university';

/**
 * Reusable programme detail page. The programme is looked up by the
 * `:programmeId` route param against the shared mock data source, so this
 * single page renders correctly for any university/programme combination
 * (e.g. /programme/knust-computer-science, /programme/uds-nursing, ...).
 */
export default function ViewDetails() {
  const { programmeId } = useParams<{ programmeId: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const programme = programmeId ? getProgrammeById(programmeId) : undefined;

  if (!programme) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <p className="text-lg font-semibold text-slate-800">Programme not found</p>
        <p className="text-sm text-slate-500">
          We couldn't find a programme matching "{programmeId}".
        </p>
        <Link
          to="/dashboard"
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={currentUser} />

      <div className="flex">
        <Sidebar active="saved" />

        <main className="min-w-0 flex-1">
          <ProgrammeHeader programme={programme} />
          <StatsBar stats={programme.stats} />
          <TabNav activeTab={activeTab} onChange={setActiveTab} />

          <div className="px-4 py-6 sm:px-6 lg:px-10">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-6 lg:col-span-2">
                  <ProgrammeOverview overview={programme.overview} />
                  <CutoffTrendChart data={programme.cutoffTrend} />
                </div>
                <div className="flex flex-col gap-6">
                  <ProsConsCard title="Pros" items={programme.pros} />
                  <ProsConsCard title="Cons" items={programme.cons} />
                  <CareerPathsCard paths={programme.careerPaths} />
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <RequirementsTab requirements={programme.entryRequirements} />
            )}

            {activeTab === 'careers' && <CareersTab programme={programme} />}

            {activeTab === 'apply' && <ApplyTab programme={programme} />}
          </div>
        </main>
      </div>
    </div>
  );
}
