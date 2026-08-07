import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardHero from '../components/DashboardHero';
import FiltersBar from '../components/FiltersBar';
import ProgrammeListCard from '../components/ProgrammeListCard';
import { currentUser, studentProfile, programmes } from '../data/universityData';
import type { SortOption } from '../types/university';
import Link from 'react-router-dom'


function regionOf(location: string) {
  const parts = location.split(',');
  return parts[1]?.trim() ?? parts[0].trim();
}

export default function Dashboard() {
  const [university, setUniversity] = useState('all');
  const [region, setRegion] = useState('all');
  const [sort, setSort] = useState<SortOption>('most-competitive');
  const [comparingIds, setComparingIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const universities = useMemo(
    () => Array.from(new Set(programmes.map((p) => p.university))).sort(),
    [],
  );
  const regions = useMemo(
    () => Array.from(new Set(programmes.map((p) => regionOf(p.location)))).sort(),
    [],
  );

  const filteredProgrammes = useMemo(() => {
    let result = programmes.filter((p) => {
      const matchesUniversity = university === 'all' || p.university === university;
      const matchesRegion = region === 'all' || regionOf(p.location) === region;
      return matchesUniversity && matchesRegion;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'most-competitive':
          return a.entryRequirements.minimumAggregate - b.entryRequirements.minimumAggregate;
        case 'least-competitive':
          return b.entryRequirements.minimumAggregate - a.entryRequirements.minimumAggregate;
        case 'lowest-fees':
          return Number(a.stats.annualFees.value) - Number(b.stats.annualFees.value);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [university, region, sort]);

  const toggleCompare = (id: string) => {
    setComparingIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar active="dashboard" />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
         <Link to="/profile">Profile
         <DashboardHero profile={studentProfile} />
</Link>
          <div className="mt-6">
            <FiltersBar
              universities={universities}
              regions={regions}
              university={university}
              region={region}
              sort={sort}
              onUniversityChange={setUniversity}
              onRegionChange={setRegion}
              onSortChange={setSort}
            />
          </div>

          <p className="mt-6 text-sm font-medium text-slate-500">
            {filteredProgrammes.length} programme{filteredProgrammes.length === 1 ? '' : 's'} found
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {filteredProgrammes.map((programme) => (
              <ProgrammeListCard
                key={programme.id}
                programme={programme}
                studentAggregate={studentProfile.aggregate}
                isComparing={comparingIds.includes(programme.id)}
                isSaved={savedIds.includes(programme.id)}
                onCompareToggle={toggleCompare}
                onSaveToggle={toggleSave}
              />
            ))}

            {filteredProgrammes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                No programmes match your current filters.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
