export interface CutoffPoint {
  year: number;
  aggregate: number; // lower = more competitive
}

export interface Stat {
  label: string;
  value: string;
  sublabel: string;
}

export interface ProgrammeStats {
  cutoff: Stat;
  annualFees: Stat;
  employmentRate: Stat;
  averageSalary: Stat;
}

export interface RequiredSubject {
  subject: string;
  minimumGrade: string;
}

export interface EntryRequirements {
  minimumAggregate: number;
  coreSubjects: RequiredSubject[];
  electiveSubjects: RequiredSubject[];
  notes: string[];
}

export interface Deadline {
  label: string;
  date: string;
  isPast: boolean;
}

export interface CareerPath {
  title: string;
}

export type TabId = 'overview' | 'requirements' | 'careers' | 'apply';

export interface Programme {
  id: string;
  name: string;
  university: string;
  faculty: string;
  degreeType: string;
  durationYears: number;
  location: string;
  qualifies: boolean;
  overview: string;
  pros: string[];
  cons: string[];
  careerPaths: CareerPath[];
  stats: ProgrammeStats;
  cutoffTrend: CutoffPoint[];
  entryRequirements: EntryRequirements;
  deadlines: Deadline[];
  fees: {
    annual: string;
    total: string;
    breakdown: { label: string; amount: string }[];
  };
}

export interface NavUser {
  name: string;
  initials: string;
}

export interface StudentProfile {
  name: string;
  school: string;
  track: string;
  examYear: number;
  aggregate: number;
  qualifiedCount: number;
  universitiesCount: number;
}

export type SidebarItemId =
  | 'dashboard'
  | 'saved'
  | 'comparison'
  | 'advisor'
  | 'deadlines'
  | 'profile';

export type SortOption = 'most-competitive' | 'least-competitive' | 'alphabetical' | 'lowest-fees';

export type DeadlineStatus = 'open' | 'closing-soon' | 'closed';

export interface DeadlineEntry {
  id: string;
  university: string;
  /** e.g. "All Programmes" or "Medicine & Law" */
  scope: string;
  deadlineDate: string;
  status: DeadlineStatus;
  daysLeft: number;
}

export interface StudentDetails {
  name: string;
  email: string;
  initials: string;
  school: string;
  track: string;
  aggregate: number;
  examYear: number;
}

export interface SavedProgrammeSummary {
  id: string;
  programmeId: string;
  name: string;
  university: string;
  degreeType: string;
  cutoffAggregate: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}



