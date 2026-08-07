import type { RawProgramme, SourceFile } from './types'

/**
 * University of Cape Coast, published cut-off aggregates.
 *
 * "(CoDE)" marks College of Distance Education intakes, which UCC runs with
 * their own, generally higher, cut-offs. Those are expanded onto the
 * `distance` track so a student comparing routes sees both.
 */
const rows: RawProgramme[] = [
  // Health Sciences and Medicine
  { n: 'Medicine', c: 8, f: 'School of Medical Sciences', d: 'MBChB', y: 6, req: ['Biology:C6', 'Chemistry:C6', 'Physics:C6'] },
  { n: 'Pharmacy', c: 9, f: 'School of Pharmacy', d: 'PharmD', y: 6, req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Physician Assistant Studies', c: 11, f: 'School of Allied Health Sciences', req: ['Biology:C6'] },
  { n: 'Medical Laboratory Science', c: 12, f: 'School of Allied Health Sciences', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Midwifery', c: 12, f: 'School of Nursing and Midwifery', req: ['Biology:C6'] },
  { n: 'Nursing', c: 12, f: 'School of Nursing and Midwifery', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Optometry', c: 12, f: 'School of Allied Health Sciences', d: 'OD', y: 6, req: ['Physics:C6', 'Biology:C6'] },
  { n: 'Physiotherapy', c: 12, f: 'School of Allied Health Sciences', req: ['Biology:C6'] },
  { n: 'Diagnostic Imaging Technology', c: 14, f: 'School of Allied Health Sciences', req: ['Physics:C6'] },
  { n: 'Diagnostic Medical Sonography', c: 14, f: 'School of Allied Health Sciences', req: ['Physics:C6'] },
  { n: 'Dietetics', c: 14, f: 'School of Allied Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Nutrition', c: 15, f: 'School of Allied Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Community Health Nursing', c: 18, f: 'School of Nursing and Midwifery', req: ['Biology:C6'] },
  { n: 'Health Information Management', c: 18, f: 'School of Allied Health Sciences' },
  { n: 'Sport and Exercise Science', c: 22, f: 'School of Allied Health Sciences' },

  // Law
  { n: 'Law', c: 12, f: 'Faculty of Law', d: 'LLB' },

  // Business and Commerce
  { n: 'Accounting', c: 15, f: 'School of Business', d: 'BBA', req: ['Financial Accounting:C6'] },
  { n: 'Finance', c: 16, f: 'School of Business', d: 'BCom' },
  { n: 'Human Resource Management', c: 17, f: 'School of Business', d: 'BBA' },
  { n: 'Economics with Finance', c: 17, f: 'School of Economics', req: ['Economics:C6'] },
  { n: 'Commerce', c: 18, f: 'School of Business', d: 'BBA' },
  { n: 'Management', c: 18, f: 'School of Business', d: 'BBA' },
  { n: 'Marketing', c: 20, f: 'School of Business', d: 'BCom' },
  { n: 'Procurement and Supply Chain Management', c: 20, f: 'School of Business', d: 'BCom' },
  { n: 'Hospitality Management', c: 20, f: 'School of Business' },
  { n: 'Tourism Management', c: 22, f: 'School of Business' },
  { n: 'Accounting', c: 24, f: 'College of Distance Education', track: 'distance' },
  { n: 'Commerce', c: 26, f: 'College of Distance Education', d: 'BCom', track: 'distance' },
  { n: 'Management Studies', c: 26, f: 'College of Distance Education', track: 'distance' },
  { n: 'Business Administration', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Commerce', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Labour Policy Studies', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },

  // Education
  { n: 'Arts Education', c: 16, f: 'Faculty of Humanities and Social Sciences Education', d: 'B.Ed' },
  { n: 'Communication Design Education', c: 17, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Home Economics Education', c: 18, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Mathematics Education', c: 18, f: 'Faculty of Science and Technology Education', d: 'B.Ed', req: ['Elective Mathematics:C6'] },
  { n: 'Education', c: 20, f: 'Faculty of Educational Foundations', d: 'BA' },
  { n: 'Computer Science Education', c: 20, f: 'Faculty of Science and Technology Education', d: 'B.Ed', req: ['Elective Mathematics:C6'] },
  { n: 'Early Childhood Education', c: 20, f: 'Faculty of Educational Foundations', d: 'B.Ed' },
  { n: 'Primary Education', c: 21, f: 'Faculty of Educational Foundations', d: 'B.Ed' },
  { n: 'Basic Education', c: 22, f: 'Faculty of Educational Foundations', d: 'B.Ed' },
  { n: 'Health Sciences Education', c: 22, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Information Technology Education', c: 22, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Junior High School Education', c: 22, f: 'Faculty of Educational Foundations', d: 'B.Ed' },
  { n: 'Science Education', c: 22, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Health, Physical Education and Recreation', c: 23, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Construction Technology Education', c: 24, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Fine Art Education', c: 24, f: 'Faculty of Science and Technology Education', d: 'B.Ed' },
  { n: 'Basic Education', c: 28, f: 'College of Distance Education', d: 'B.Ed', track: 'distance' },
  { n: 'Early Childhood Education', c: 28, f: 'College of Distance Education', d: 'B.Ed', track: 'distance' },
  { n: 'Early Childhood Education', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Junior High School Education', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Basic Education', c: 32, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Education', c: 32, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },
  { n: 'Mathematics Education', c: 36, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },

  // Science and Computing
  { n: 'Computer Science', c: 15, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: 15, f: 'School of Physical Sciences' },
  { n: 'Actuarial Science', c: 16, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Biochemistry', c: 16, f: 'School of Biological Sciences', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Biomedical Sciences', c: 16, f: 'School of Biological Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Forensic Science', c: 17, f: 'School of Biological Sciences', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Mathematics and Statistics', c: 17, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Mathematics with Economics', c: 17, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Chemistry', c: 18, f: 'School of Physical Sciences', req: ['Chemistry:C6'] },
  { n: 'Engineering Physics', c: 18, f: 'School of Physical Sciences', req: ['Physics:C6', 'Elective Mathematics:C6'] },
  { n: 'Laboratory Technology', c: 18, f: 'School of Physical Sciences' },
  { n: 'Environmental Science', c: 19, f: 'School of Biological Sciences' },
  { n: 'Meteorology and Atmospheric Physics', c: 19, f: 'School of Physical Sciences', req: ['Physics:C6'] },
  { n: 'Fisheries and Aquatic Sciences', c: 20, f: 'School of Biological Sciences', req: ['Biology:C6'] },
  { n: 'Mathematics', c: 20, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Molecular Biology and Biotechnology', c: 20, f: 'School of Biological Sciences', req: ['Biology:C6'] },
  { n: 'Water and Sanitation', c: 20, f: 'School of Biological Sciences' },
  { n: 'Industrial Chemistry', c: 21, f: 'School of Physical Sciences', req: ['Chemistry:C6'] },
  { n: 'Mathematics with Business', c: 22, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Physics', c: 22, f: 'School of Physical Sciences', req: ['Physics:C6'] },
  { n: 'Conservation Biology and Entomology', c: 25, f: 'School of Biological Sciences', req: ['Biology:C6'] },
  { n: 'Statistics', c: 25, f: 'School of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: 32, f: 'College of Distance Education', track: 'distance' },
  { n: 'Information Technology', c: 30, f: 'College of Distance Education', d: 'Diploma', y: 2, track: 'distance' },

  // Agriculture
  { n: 'Agriculture', c: 18, f: 'School of Agriculture' },
  { n: 'Agri-Business', c: 20, f: 'School of Agriculture' },
  { n: 'Agro-Processing', c: 20, f: 'School of Agriculture' },
  { n: 'Horticulture', c: 20, f: 'School of Agriculture' },
  { n: 'Agricultural Extension and Community Development', c: 21, f: 'School of Agriculture' },

  // Social Sciences
  { n: 'Economics', c: 16, f: 'School of Economics', d: 'BA', req: ['Economics:C6'] },
  { n: 'Geography and Regional Planning', c: 17, f: 'Faculty of Social Sciences' },
  { n: 'Political Science', c: 18, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Sociology', c: 18, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Applied Economics', c: 18, f: 'School of Economics' },
  { n: 'Population and Health', c: 20, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Social Sciences', c: 20, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Development Economics', c: 20, f: 'School of Economics' },
  { n: 'Psychology', c: 20, f: 'Faculty of Social Sciences' },
  { n: 'Social Behaviour and Conflict Management', c: 22, f: 'Faculty of Social Sciences', d: 'BA' },

  // Arts
  { n: 'Communication Studies', c: 17, f: 'Faculty of Arts', d: 'BA' },
  { n: 'African Studies', c: 19, f: 'Faculty of Arts', d: 'BA' },
  { n: 'English', c: 20, f: 'Faculty of Arts', d: 'BA', req: ['Literature in English:C6'] },
  { n: 'Geography', c: 20, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Linguistics', c: 20, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Music', c: 21, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Anthropology', c: 22, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Arts', c: 22, f: 'Faculty of Arts', d: 'BA' },
  { n: 'French', c: 22, f: 'Faculty of Arts', d: 'BA', req: ['French:C6'] },
  { n: 'Theatre Studies', c: 23, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Dance', c: 24, f: 'Faculty of Arts', d: 'BA' },
  { n: 'History', c: 24, f: 'Faculty of Arts', d: 'BA', req: ['History:C6'] },
  { n: 'Religious Studies', c: 24, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Chinese', c: 25, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Film Studies', c: 25, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Arts', c: 30, f: 'College of Distance Education', d: 'BA', track: 'distance' },
  { n: 'Psychology', c: 32, f: 'College of Distance Education', d: 'BA', track: 'distance' },
]

export const ucc: SourceFile = {
  universityId: 'ucc',
  defaultCampus: 'Cape Coast',
  region: 'Central',
  scienceCore: false,
  provenance: {
    source: 'University of Cape Coast cut-off points, 2026 admissions listing',
    sourceUrl: 'https://ghanaunichecker.com/ucc-cut-off-points-2026',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'researched',
  },
  rows,
}
