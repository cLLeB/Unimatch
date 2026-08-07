import type { TabId } from '../types/university';

interface TabNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'careers', label: 'Careers' },
  { id: 'apply', label: 'Apply' },
];

export default function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-10">
      <div className="inline-flex gap-1 rounded-full bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
