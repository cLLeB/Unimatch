import { Link } from 'react-router-dom';
import {
  Home,
  Bookmark,
  GitCompare,
  Brain,
  Clock,
  User,
  LogOut,
} from 'lucide-react';
import type { SidebarItemId } from '../types/university';

interface SidebarLink {
  id: SidebarItemId;
  label: string;
  icon: React.ElementType;
  to: string;
}

const links: SidebarLink[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
  { id: 'saved', label: 'Saved Programmes', icon: Bookmark, to: '/saved' },
  { id: 'comparison', label: 'Comparison', icon: GitCompare, to: '/comparison' },
  { id: 'advisor', label: 'AI Advisor', icon: Brain, to: '/advisor' },
  { id: 'deadlines', label: 'Deadlines', icon: Clock, to: '/deadlines' },
  { id: 'profile', label: 'Profile', icon: User, to: '/profile' },
];

interface SidebarProps {
  /** Which nav item should render as active. Lets each page control its own state. */
  active: SidebarItemId;
}

export default function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white px-3 py-6 lg:flex">
      <nav className="flex flex-col gap-1">
        {links.map(({ id, label, icon: Icon, to }) => (
          <Link
            key={id}
            to={to}
            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              active === id
                ? 'bg-teal-50 text-teal-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </Link>
        ))}
      </nav>

      <a
        href="#"
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      >
        <LogOut size={18} />
        Log out
      </a>
    </aside>
  );
}
