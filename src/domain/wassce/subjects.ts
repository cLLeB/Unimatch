/**
 * WASSCE elective subjects, grouped by the programme tracks Ghanaian SHS
 * students follow.
 *
 * The prototype's grade form collected four unnamed "Elective Subject" slots
 * with only a grade each. That makes programme-specific requirements
 * impossible to check, there is no way to know whether a student sat Biology,
 * so "Medicine requires Biology at C6" can never be evaluated. Naming the
 * electives is what turns the matcher from an aggregate comparison into a real
 * eligibility check.
 */
export const ELECTIVE_SUBJECT_GROUPS = [
  {
    track: 'General Science',
    subjects: ['Elective Mathematics', 'Physics', 'Chemistry', 'Biology'],
  },
  {
    track: 'General Arts',
    subjects: [
      'Literature in English',
      'Government',
      'History',
      'Economics',
      'Geography',
      'French',
      'Christian Religious Studies',
      'Islamic Religious Studies',
      'Ghanaian Language',
    ],
  },
  {
    track: 'Business',
    subjects: ['Financial Accounting', 'Cost Accounting', 'Business Management', 'Typewriting'],
  },
  {
    track: 'Agricultural Science',
    subjects: ['General Agriculture', 'Animal Husbandry', 'Crop Husbandry', 'Forestry'],
  },
  {
    track: 'Home Economics',
    subjects: ['Food and Nutrition', 'Management in Living', 'Clothing and Textiles'],
  },
  {
    track: 'Visual Arts',
    subjects: [
      'General Knowledge in Art',
      'Graphic Design',
      'Picture Making',
      'Textiles',
      'Sculpture',
      'Ceramics',
      'Leatherwork',
      'Basketry',
    ],
  },
  {
    track: 'Technical',
    subjects: [
      'Technical Drawing',
      'Building Construction',
      'Woodwork',
      'Metalwork',
      'Applied Electricity',
      'Electronics',
      'Auto Mechanics',
    ],
  },
] as const

export const ALL_ELECTIVE_SUBJECTS: string[] = ELECTIVE_SUBJECT_GROUPS.flatMap(
  (group) => group.subjects as readonly string[],
)

export const SHS_TRACKS: string[] = ELECTIVE_SUBJECT_GROUPS.map((group) => group.track)

/** Exam years offered in the form, newest first. */
export function recentExamYears(now: Date = new Date(), count = 6): number[] {
  const latest = now.getFullYear()
  return Array.from({ length: count }, (_, index) => latest - index)
}
