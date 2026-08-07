import { Settings, LogOut } from 'lucide-react';

interface EditProfileButtonProps {
  onEditProfile?: () => void;
}

interface LogOutButtonProps {
  onLogOut?: () => void;
}

export function EditProfileButton({ onEditProfile }: EditProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onEditProfile}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
    >
      <Settings size={16} />
      Edit Profile
    </button>
  );
}

export function LogOutButton({ onLogOut }: LogOutButtonProps) {
  return (
    <button
      type="button"
      onClick={onLogOut}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
    >
      <LogOut size={16} />
      Log Out
    </button>
  );
}
