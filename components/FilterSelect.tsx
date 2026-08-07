import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel: string;
}

export default function FilterSelect({ value, options, onChange, ariaLabel }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}
