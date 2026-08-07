import { Filter, ArrowUpDown } from 'lucide-react';
import FilterSelect from './FilterSelect';
import type { SortOption } from '../types/university';

interface FiltersBarProps {
  universities: string[];
  regions: string[];
  university: string;
  region: string;
  sort: SortOption;
  onUniversityChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'most-competitive', label: 'Most Competitive' },
  { value: 'least-competitive', label: 'Least Competitive' },
  { value: 'lowest-fees', label: 'Lowest Fees' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export default function FiltersBar({
  universities,
  regions,
  university,
  region,
  sort,
  onUniversityChange,
  onRegionChange,
  onSortChange,
}: FiltersBarProps) {
  const universityOptions = [
    { value: 'all', label: 'All Universities' },
    ...universities.map((u) => ({ value: u, label: u })),
  ];
  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    ...regions.map((r) => ({ value: r, label: r })),
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Filter size={16} />
          Filters:
        </span>
        <FilterSelect
          ariaLabel="Filter by university"
          value={university}
          options={universityOptions}
          onChange={onUniversityChange}
        />
        <FilterSelect
          ariaLabel="Filter by region"
          value={region}
          options={regionOptions}
          onChange={onRegionChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown size={16} className="text-slate-400" />
        <FilterSelect
          ariaLabel="Sort programmes"
          value={sort}
          options={sortOptions}
          onChange={(v) => onSortChange(v as SortOption)}
        />
      </div>
    </div>
  );
}
