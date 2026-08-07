import type { CareerPath } from '../types/university';

interface CareerPathsCardProps {
  paths: CareerPath[];
}

export default function CareerPathsCard({ paths }: CareerPathsCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-slate-900">Career Paths</h2>
      <div className="flex flex-col gap-3">
        {paths.map((path) => (
          <a
            key={path.title}
            href="#"
            className="rounded-lg bg-sky-50 px-4 py-2 text-center text-sm font-medium text-sky-700 transition-colors hover:bg-sky-100"
          >
            {path.title}
          </a>
        ))}
      </div>
    </section>
  );
}
