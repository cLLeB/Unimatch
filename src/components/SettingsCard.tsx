import ToggleSwitch from './ToggleSwitch';

interface SettingsCardProps {
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

export default function SettingsCard({ darkMode, onDarkModeChange }: SettingsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">Dark Mode</p>
          <p className="text-sm text-slate-500">Easy on the eyes</p>
        </div>
        <ToggleSwitch checked={darkMode} onChange={onDarkModeChange} label="Toggle dark mode" />
      </div>
    </div>
  );
}
