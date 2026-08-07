import type { StudentDetails } from '../types/university';

interface UserInformationProps {
  student: StudentDetails;
}

export default function UserInformation({ student }: UserInformationProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-700 text-2xl font-bold text-white">
        {student.initials}
      </div>
      <h2 className="mt-4 text-xl font-bold text-slate-900">{student.name}</h2>
      <p className="mt-1 text-sm text-slate-500">{student.email}</p>
    </div>
  );
}
