import type { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function InfoSection({ title, children, className = '' }: InfoSectionProps) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <h2 className="mb-4 text-lg font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
