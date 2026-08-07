import type { RawProgramme, SourceFile } from './types'

/**
 * University of Ghana, complete published cut-off list, 2025/2026.
 *
 * Source: https://admissions.ug.edu.gh/undergraduate/cut-off
 *
 * `ff` is the full-fee-paying cut-off, which the pipeline expands into a second
 * record on the `fee-paying` track. Where UG publishes a bracketed second
 * figure (e.g. "14(15)") the lower, first-choice number is used, since that is
 * the one an applicant is competing against on first choice.
 */
const rows: RawProgramme[] = [
  // ── College of Basic & Applied Sciences ──────────────────────────────────
  { n: 'Agricultural Engineering', c: 15, ff: 19, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Biomedical Engineering', c: 6, ff: 8, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Computer Engineering', c: 7, ff: 8, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Food Process Engineering', c: 12, ff: 15, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Materials Science and Engineering', c: 13, ff: 17, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Biological Sciences', c: 14, ff: 15, f: 'College of Basic and Applied Sciences' },
  { n: 'Psychology', c: 15, ff: 18, f: 'College of Basic and Applied Sciences' },
  { n: 'Veterinary Medicine', c: 14, ff: 15, f: 'College of Basic and Applied Sciences', d: 'DVM', y: 6 },
  { n: 'Actuarial Science', c: 11, ff: 15, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Computer Science', c: 7, ff: 15, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Information Technology', c: 10, ff: 15, f: 'College of Basic and Applied Sciences', core: ['Core Mathematics:C4'] },
  { n: 'Earth Science', c: 15, ff: 20, f: 'College of Basic and Applied Sciences', req: ['Chemistry:C6'] },
  { n: 'Physical Sciences', c: 24, ff: 24, f: 'College of Basic and Applied Sciences', req: ['Chemistry:C6', 'Physics:C6'] },
  { n: 'Mathematical Sciences', c: 15, ff: 20, f: 'College of Basic and Applied Sciences', req: ['Elective Mathematics:B3'] },
  { n: 'Agriculture Science', c: 22, f: 'College of Basic and Applied Sciences' },
  { n: 'Family and Consumer Sciences (Family and Child Studies)', c: 16, ff: 17, f: 'College of Basic and Applied Sciences', req: ['Management in Living:C6'] },
  { n: 'Family and Consumer Sciences (Food and Clothing)', c: 20, f: 'College of Basic and Applied Sciences', req: ['Chemistry:C6'] },

  // ── College of Health Sciences ───────────────────────────────────────────
  { n: 'Medicine and Surgery', c: 8, f: 'College of Health Sciences', d: 'MBChB', y: 6, campus: 'Accra (Korle Bu)' },
  { n: 'Dental Surgery', c: 10, f: 'College of Health Sciences', d: 'BDS', y: 6, campus: 'Accra (Korle Bu)' },
  { n: 'Pharmacy', c: 10, f: 'College of Health Sciences', d: 'PharmD', y: 6, campus: 'Accra (Korle Bu)' },
  { n: 'Nursing', c: 15, f: 'College of Health Sciences' },
  { n: 'Midwifery', c: 15, f: 'College of Health Sciences' },
  { n: 'Medical Laboratory Sciences', c: 12, f: 'College of Health Sciences', campus: 'Accra (Korle Bu)' },
  { n: 'Physiotherapy', c: 14, f: 'College of Health Sciences', campus: 'Accra (Korle Bu)' },
  { n: 'Dietetics', c: 14, f: 'College of Health Sciences' },
  { n: 'Diagnostic Radiography', c: 13, f: 'College of Health Sciences', campus: 'Accra (Korle Bu)' },
  { n: 'Occupational Therapy', c: 14, f: 'College of Health Sciences', campus: 'Accra (Korle Bu)' },
  { n: 'Respiratory Therapy', c: 14, f: 'College of Health Sciences', campus: 'Accra (Korle Bu)' },
  { n: 'Public Health', c: 9, f: 'College of Health Sciences', d: 'BPH' },

  // ── College of Education ─────────────────────────────────────────────────
  { n: 'Social Studies Education', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'English Education', c: 24, f: 'College of Education', d: 'B.Ed', req: ['Literature in English:C6'] },
  { n: 'Mathematics Education', c: 24, f: 'College of Education', d: 'B.Ed', req: ['Elective Mathematics:C6'] },
  { n: 'Science Education (Physics)', c: 24, f: 'College of Education', d: 'B.Ed', req: ['Physics:C6'] },
  { n: 'Science Education (Chemistry)', c: 24, f: 'College of Education', d: 'B.Ed', req: ['Chemistry:C6'] },
  { n: 'Science Education (Biology)', c: 24, f: 'College of Education', d: 'B.Ed', req: ['Biology:C6'] },
  { n: 'Education (Early Grade Specialism)', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Education (JHS Specialism)', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Education (Upper Grade Specialism)', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Sports and Physical Culture', c: 24, f: 'College of Education', d: 'BA' },
  { n: 'French Education', c: 24, f: 'College of Education', d: 'B.Ed', req: ['French:C6'] },
  { n: 'Spanish Education', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Performing Arts Education', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Information and Communication Technology Education', c: 12, ff: 15, f: 'College of Education', d: 'B.Ed', core: ['Core Mathematics:C4'] },
  { n: 'Consumer Sciences Education', c: 20, ff: 21, f: 'College of Education', d: 'B.Ed', req: ['Biology:C6', 'Chemistry:C6', 'Management in Living:C6'] },
  { n: 'Arabic Education', c: 24, f: 'College of Education', d: 'B.Ed' },
  { n: 'Computer Science Education', c: 9, ff: 12, f: 'College of Education', d: 'B.Ed', core: ['Core Mathematics:C4'], req: ['Elective Mathematics:C4'] },

  // ── College of Humanities ────────────────────────────────────────────────
  { n: 'Law', c: 7, f: 'School of Law', d: 'LLB' },
  { n: 'Administration', c: 9, ff: 12, f: 'Business School' },
  { n: 'Arts (General Arts background)', c: 16, ff: 20, f: 'College of Humanities', d: 'BA' },
  { n: 'Arts (Bouquets with Business subject)', c: 12, ff: 17, f: 'College of Humanities', d: 'BA' },
  { n: 'Arts (Business, Science or Vocational background)', c: 14, f: 'College of Humanities', d: 'BA' },
  { n: 'Fine Arts', c: 20, ff: 24, f: 'School of Performing Arts', d: 'BFA', note: 'Audition or interview required.' },
  { n: 'Music', c: 20, ff: 24, f: 'School of Performing Arts', d: 'BMus', note: 'Audition or interview required.' },

  // ── Distance Education ───────────────────────────────────────────────────
  { n: 'Arts', c: 30, f: 'School of Continuing and Distance Education', d: 'BA', track: 'distance' },
  { n: 'Administration', c: 30, f: 'School of Continuing and Distance Education', track: 'distance' },
  { n: 'Information Technology', c: 24, f: 'School of Continuing and Distance Education', track: 'distance' },
  { n: 'Education (Early Grade Specialism)', c: 30, f: 'School of Continuing and Distance Education', d: 'B.Ed', track: 'distance' },
  { n: 'Education (Upper Grade Specialism)', c: 30, f: 'School of Continuing and Distance Education', d: 'B.Ed', track: 'distance' },
  { n: 'Education (JHS Specialism)', c: 30, f: 'School of Continuing and Distance Education', d: 'B.Ed', track: 'distance' },

  // ── Accra City Campus / satellite campuses ───────────────────────────────
  { n: 'Arts', c: 24, f: 'Accra City Campus', d: 'BA', track: 'city-campus', campus: 'Accra City Campus' },
  { n: 'Administration', c: 24, f: 'Accra City Campus', track: 'city-campus', campus: 'Accra City Campus' },
  { n: 'Administration (Kumasi and Takoradi City Campuses)', c: 24, f: 'College of Education', track: 'city-campus', campus: 'Kumasi / Takoradi' },
]

export const ug: SourceFile = {
  universityId: 'ug',
  defaultCampus: 'Accra (Legon)',
  region: 'Greater Accra',
  scienceCore: true,
  provenance: {
    source: 'University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions',
    sourceUrl: 'https://admissions.ug.edu.gh/undergraduate/cut-off',
    year: 2025,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows,
}
