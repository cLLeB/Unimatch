interface ProgrammeOverviewProps {
  overview: string;
}

export default function ProgrammeOverview({ overview }: ProgrammeOverviewProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-bold text-slate-900">Programme Overview</h2>
      <p className="leading-relaxed text-slate-600">{overview}</p>
    </section>
  );
}
