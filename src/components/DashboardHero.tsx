import type { StudentProfile } from '../types/university';

interface DashboardHeroProps {
  profile: StudentProfile;
}

export default function DashboardHero({ profile }: DashboardHeroProps) {
  const stats = [
    { value: profile.aggregate, label: 'Aggregate' },
    { value: profile.qualifiedCount, label: 'Qualified' },
    { value: profile.universitiesCount, label: 'Universities' },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-teal-700 to-blue-700 px-6 py-6 text-white sm:px-8 sm:py-7">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-teal-100">
            Your {profile.examYear} WASSCE Results
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{profile.name}</h1>
          <p className="mt-1 text-sm text-teal-100">
            {profile.school} &middot; {profile.track}
          </p>
        </div>

        <div className="flex gap-8 sm:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-teal-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
