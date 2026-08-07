interface DeadlinesHeaderProps {
  title: string;
  subtitle: string;
}

export default function DeadlinesHeader({ title, subtitle }: DeadlinesHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-slate-500">{subtitle}</p>
    </div>
  );
}
