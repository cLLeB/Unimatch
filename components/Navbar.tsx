import { GraduationCap, Bell } from 'lucide-react';
import type { NavUser } from '../types/university';

interface NavbarProps {
  user: NavUser;
}

const navLinks = ['Home', 'Universities', 'Cut-Off Points', 'Resources', 'About'];

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
          <GraduationCap className="h-4.5 w-4.5" size={18} />
        </span>
        <span className="text-lg font-bold text-slate-900">
          UniMatch <span className="text-teal-600">Ghana</span>
        </span>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            {link}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white">
            {user.initials}
          </span>
          <span className="hidden text-sm font-medium text-slate-800 sm:inline">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  );
}
