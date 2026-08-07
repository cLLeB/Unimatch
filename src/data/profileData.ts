import type { StudentDetails, SavedProgrammeSummary, ChecklistItem } from '../types/university';

/**
 * In a real app this would come from `GET /students/me` after authentication.
 */
export const studentDetails: StudentDetails = {
  name: 'Kofi Asante',
  email: 'kofi.asante@gmail.com',
  initials: 'KA',
  school: 'Kumasi Academy',
  track: 'General Science',
  aggregate: 14,
  examYear: 2024,
};

/**
 * Would come from `GET /students/me/saved-programmes`. `programmeId` links
 * back to the full Programme record in universityData.ts so "View Details"
 * style navigation can reuse the same route used elsewhere in the app.
 */
export const savedProgrammes: SavedProgrammeSummary[] = [
  {
    id: 'saved-1',
    programmeId: 'knust-computer-science',
    name: 'Computer Science',
    university: 'KNUST',
    degreeType: 'BSc',
    cutoffAggregate: 12,
  },
  {
    id: 'saved-2',
    programmeId: 'ug-medicine',
    name: 'Medicine & Surgery',
    university: 'University of Ghana',
    degreeType: 'MBChB',
    cutoffAggregate: 8,
  },
  {
    id: 'saved-3',
    programmeId: 'ucc-business-administration',
    name: 'Business Administration',
    university: 'University of Cape Coast',
    degreeType: 'BBA',
    cutoffAggregate: 18,
  },
];

/**
 * Would come from `GET /students/me/checklist`. `completed` would be
 * derived server-side from real application-progress data.
 */
export const applicationChecklist: ChecklistItem[] = [
  { id: 'grades', label: 'Enter WASSCE grades', completed: true },
  { id: 'review', label: 'Review eligible programmes', completed: true },
  { id: 'save-top-5', label: 'Save top 5 programmes', completed: false },
  { id: 'compare', label: 'Compare shortlisted programmes', completed: false },
  { id: 'documents', label: 'Upload required documents', completed: false },
  { id: 'submit', label: 'Submit applications', completed: false },
];
