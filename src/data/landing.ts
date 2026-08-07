export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Deadlines', href: '/deadlines' },
  { label: 'Profile', href: '/profile' },
];
