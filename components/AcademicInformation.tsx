import type { StudentDetails } from '../types/university';

interface AcademicInformationProps {
  student: StudentDetails;
}

export default function AcademicInformation({ student }: AcademicInformationProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-sm text-slate-500">
        {student.school} &middot; {student.track}
      </p>

      <div className="mt-4 w-full rounded-xl bg-teal-50 py-4">
        <p className="text-3xl font-bold text-teal-700">Agg. {student.aggregate}</p>
        <p className="mt-1 text-sm text-slate-500">{student.examYear} WASSCE</p>
      </div>
    </div>
  );
}
