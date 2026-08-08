import type { RawProgramme, SourceFile } from './types'

/**
 * UEW publishes separate male and female cut-offs. The stricter (lower) of the
 * two is used as the headline so the app never tells a student they qualify
 * when their own category's cut-off is tighter; both are shown on the detail
 * page.
 */
const uewRows: RawProgramme[] = [
  { n: 'Political Science Education', c: 17, male: 17, female: 18, f: 'Faculty of Social Sciences Education', d: 'BA' },
  { n: 'Accounting Education', c: 15, male: 15, female: 16, f: 'Faculty of Business Education', d: 'B.Sc', req: ['Financial Accounting:C6'] },
  { n: 'Social Studies Education', c: 22, male: 22, female: 22, f: 'Faculty of Social Sciences Education', d: 'BA' },
  { n: 'Health Administration and Education', c: 24, male: 24, female: 24, f: 'Faculty of Science Education', d: 'B.Sc' },
  { n: 'Arabic Education', c: 36, male: 36, female: 36, f: 'Faculty of Foreign Languages Education', d: 'BA' },
  { n: 'Secretarial Education', c: 36, male: 36, female: 36, f: 'Faculty of Business Education', d: 'B.Sc' },
  { n: 'Management Education', c: 36, male: 36, female: 36, f: 'Faculty of Business Education', d: 'B.Sc' },
  { n: 'Art Education', c: 36, male: 36, female: 36, f: 'Faculty of Creative Arts', d: 'BA' },
  { n: 'French Education', c: 36, male: 36, female: 36, f: 'Faculty of Foreign Languages Education', d: 'BA', req: ['French:C6'] },
  { n: 'Ga and Dangme Education', c: 36, male: 36, female: 36, f: 'Faculty of Ghanaian Languages Education', d: 'BA' },
  { n: 'Graphic Design', c: 36, male: 36, female: 36, f: 'Faculty of Creative Arts', d: 'BA' },
  { n: 'English Education', c: 36, male: 36, female: 36, f: 'Faculty of Languages Education', d: 'BA', req: ['Literature in English:C6'] },
  { n: 'Basic Education', c: 36, male: 36, female: 36, f: 'Faculty of Educational Studies', d: 'B.Ed' },
  { n: 'Ghanaian Languages Education (Dagaare, Dagbani, Gonja, Gurune, Kasem, Kusaal)', c: 36, male: 36, female: 36, f: 'Faculty of Ghanaian Languages Education', d: 'BA' },
  { n: 'Information and Communication Technology Education', c: 36, male: 36, female: 36, f: 'Faculty of Science Education', d: 'B.Sc' },
  { n: 'Ghanaian Languages Education (Fante, Nzema, Twi)', c: 36, male: 36, female: 36, f: 'Faculty of Ghanaian Languages Education', d: 'BA' },
  { n: 'Ewe Education', c: 36, male: 36, female: 36, f: 'Faculty of Ghanaian Languages Education', d: 'BA' },
  { n: 'Theatre Arts', c: 36, male: 36, female: 36, f: 'Faculty of Creative Arts', d: 'BA' },
  { n: 'Automotive Technology Education', c: 36, male: 36, female: 36, f: 'Faculty of Technical Education', d: 'B.Sc' },
]

export const uew: SourceFile = {
  universityId: 'uew',
  defaultCampus: 'Winneba',
  region: 'Central',
  scienceCore: false,
  provenance: {
    source: 'UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.',
    sourceUrl: 'https://o3schools.com/uew-cut-off-points/',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'researched',
  },
  rows: uewRows,
}

/**
 * UDS publishes its programme catalogue but not a per-programme cut-off list.
 * These carry the university's published minimum for degree admission, marked
 * `general-minimum`, so a student sees the programme exists and the aggregate
 * that makes them eligible without mistaking it for a competitive cut-off.
 */
const UDS_GENERAL = 24
const UDS_ALLIED_HEALTH = 18 // UDS publishes an 11-18 range for this school

const udsRows: RawProgramme[] = [
  // Agriculture, Food and Consumer Sciences
  { n: 'Agricultural Science Education', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences', d: 'B.Ed' },
  { n: 'Family and Consumer Science Education', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences', d: 'B.Ed' },
  { n: 'Agriculture Technology (Agricultural Economics and Extension)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Agronomy)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Animal Science)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Biotechnology)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Horticulture)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Mechanization and Irrigation)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agriculture Technology (Soil Science)', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Family and Consumer Science', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Food Systems', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences' },
  { n: 'Agribusiness', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences', d: 'Diploma', y: 2 },
  { n: 'Agriculture Technology', c: UDS_GENERAL, f: 'Faculty of Agriculture, Food and Consumer Sciences', d: 'Diploma', y: 2 },

  // Bioscience
  { n: 'Aquaculture and Fisheries Science', c: UDS_GENERAL, f: 'Faculty of Bioscience', req: ['Biology:C6'] },
  { n: 'Biotechnology and Molecular Biology', c: UDS_GENERAL, f: 'Faculty of Bioscience', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Forensic Science', c: UDS_GENERAL, f: 'Faculty of Bioscience', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Microbiology', c: UDS_GENERAL, f: 'Faculty of Bioscience', req: ['Biology:C6', 'Chemistry:C6'] },

  // Communication, Education, Natural Resources
  { n: 'Social Change Communication', c: UDS_GENERAL, f: 'Faculty of Communication and Media Studies' },
  { n: 'Arabic Education', c: UDS_GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Basic Education', c: UDS_GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Business Studies Education', c: UDS_GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Early Childhood Care and Education', c: UDS_GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Social Science Education', c: UDS_GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Ecotourism and Hospitality Management', c: UDS_GENERAL, f: 'Faculty of Natural Resources and Environment' },
  { n: 'Environmental Management and Sustainability', c: UDS_GENERAL, f: 'Faculty of Natural Resources and Environment' },
  { n: 'Forest Resource Conservation and Management', c: UDS_GENERAL, f: 'Faculty of Natural Resources and Environment' },
  { n: 'Renewable Natural Resources', c: UDS_GENERAL, f: 'Faculty of Natural Resources and Environment' },

  // Physical Sciences
  { n: 'Chemical Science and Technology', c: UDS_GENERAL, f: 'Faculty of Physical Sciences', req: ['Chemistry:C6'] },
  { n: 'Computing Mathematics', c: UDS_GENERAL, f: 'Faculty of Physical Sciences', req: ['Elective Mathematics:C6'] },
  { n: 'Engineering Physics', c: UDS_GENERAL, f: 'Faculty of Physical Sciences', req: ['Physics:C6', 'Elective Mathematics:C6'] },
  { n: 'Development Education Studies', c: UDS_GENERAL, f: 'Faculty of Sustainable Development Studies', d: 'BA' },

  // Health
  { n: 'Medicine', c: 11, f: 'School of Medicine', d: 'MBChB', y: 6, req: ['Biology:C6', 'Chemistry:C6', 'Physics:C6'] },
  { n: 'Community Nutrition', c: UDS_ALLIED_HEALTH, f: 'School of Allied Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Medical Imaging Technology', c: UDS_ALLIED_HEALTH, f: 'School of Allied Health Sciences', req: ['Physics:C6'] },
  { n: 'Nurse Practitioner', c: UDS_ALLIED_HEALTH, f: 'School of Nursing and Midwifery', req: ['Biology:C6'] },
  { n: 'Paediatric Nursing', c: UDS_ALLIED_HEALTH, f: 'School of Nursing and Midwifery', req: ['Biology:C6'] },
  { n: 'Health Information Management', c: UDS_ALLIED_HEALTH, f: 'School of Public Health' },

  // Business
  { n: 'Accounting', c: UDS_GENERAL, f: 'School of Business', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Business Information Systems', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Finance and Economics', c: UDS_GENERAL, f: 'School of Business', req: ['Economics:C6'] },
  { n: 'Human Resource Management', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Marketing', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Procurement and Supply Chain Management', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Public Administration', c: UDS_GENERAL, f: 'School of Business' },
  { n: 'Business Administration', c: UDS_GENERAL, f: 'School of Business', d: 'Diploma', y: 2 },
]

export const uds: SourceFile = {
  universityId: 'uds',
  defaultCampus: 'Tamale',
  region: 'Northern',
  scienceCore: true,
  aggregateBasis: 'general-minimum',
  provenance: {
    source:
      'UDS published entry requirements. UDS does not publish a per-programme cut-off list, so these show the minimum aggregate for degree admission.',
    sourceUrl: 'https://uds.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows: udsRows,
}

/**
 * UHAS, UPSA and Accra Technical University publish no per-programme cut-off
 * list, so these rows carry the national minimum for the qualification.
 *
 * An earlier draft gave each programme its own aggregate, on the reasoning
 * that medicine must be tighter than public health. Nothing published said so.
 * Those numbers are gone rather than dressed in a caveat.
 */
/** Six credit passes (A1 to C6), three core and three electives. */
const DEGREE_MINIMUM = 24
/** Six passes (D7 or better) including English and Core Mathematics. */
const DIPLOMA_MINIMUM = 36
const uhasRows: RawProgramme[] = [
  { n: 'Medicine', c: DEGREE_MINIMUM, f: 'School of Medicine', d: 'MBChB', y: 6, req: ['Biology:C6', 'Chemistry:C6', 'Physics:C6'] },
  { n: 'Nursing', c: DEGREE_MINIMUM, f: 'School of Nursing and Midwifery', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Midwifery', c: DEGREE_MINIMUM, f: 'School of Nursing and Midwifery', req: ['Biology:C6'] },
  { n: 'Medical Laboratory Technology', c: DEGREE_MINIMUM, f: 'School of Allied Health Sciences', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Physiotherapy and Sports Science', c: DEGREE_MINIMUM, f: 'School of Allied Health Sciences', req: ['Biology:C6'] },
  { n: 'Dietetics', c: DEGREE_MINIMUM, f: 'School of Allied Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Public Health (Health Promotion)', c: DEGREE_MINIMUM, f: 'School of Public Health' },
  { n: 'Public Health (Disease Control)', c: DEGREE_MINIMUM, f: 'School of Public Health' },
  { n: 'Nutrition', c: DEGREE_MINIMUM, f: 'School of Allied Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Pharmacy', c: DEGREE_MINIMUM, f: 'School of Pharmacy', d: 'PharmD', y: 6, req: ['Chemistry:C6', 'Biology:C6'] },
]

export const uhas: SourceFile = {
  universityId: 'uhas',
  defaultCampus: 'Ho',
  region: 'Volta',
  scienceCore: true,
  aggregateBasis: 'general-minimum',
  provenance: {
    source:
      'UHAS published entry requirements. No per-programme cut-off list is published, so these show the minimum aggregate for admission to the qualification.',
    sourceUrl: 'https://uhas.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows: uhasRows,
}

const upsaRows: RawProgramme[] = [
  { n: 'Accounting', c: DEGREE_MINIMUM, f: 'Faculty of Accounting and Finance', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: DEGREE_MINIMUM, f: 'Faculty of Accounting and Finance' },
  { n: 'Marketing', c: DEGREE_MINIMUM, f: 'Faculty of Management Studies' },
  { n: 'Business Administration', c: DEGREE_MINIMUM, f: 'Faculty of Management Studies' },
  { n: 'Human Resource Management', c: DEGREE_MINIMUM, f: 'Faculty of Management Studies' },
  { n: 'Procurement and Supply Chain Management', c: DEGREE_MINIMUM, f: 'Faculty of Management Studies' },
  { n: 'Information Technology Management', c: DEGREE_MINIMUM, f: 'Faculty of Information Technology and Communication Studies' },
  { n: 'Business Information Systems', c: DEGREE_MINIMUM, f: 'Faculty of Information Technology and Communication Studies' },
  { n: 'Public Relations Management', c: DEGREE_MINIMUM, f: 'Faculty of Information Technology and Communication Studies' },
  { n: 'Law', c: DEGREE_MINIMUM, f: 'Faculty of Law', d: 'LLB' },
  { n: 'Accounting', c: DEGREE_MINIMUM, f: 'Faculty of Accounting and Finance', track: 'distance' },
  { n: 'Business Administration', c: DEGREE_MINIMUM, f: 'Faculty of Management Studies', track: 'distance' },
]

export const upsa: SourceFile = {
  universityId: 'upsa',
  defaultCampus: 'Accra',
  region: 'Greater Accra',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: {
    source:
      'UPSA published entry requirements. No per-programme cut-off list is published, so these show the minimum aggregate for admission to the qualification.',
    sourceUrl: 'https://upsa.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows: upsaRows,
}

const atuRows: RawProgramme[] = [
  { n: 'Hospitality Management', c: DEGREE_MINIMUM, f: 'Faculty of Applied Sciences', d: 'BTech' },
  { n: 'Accounting with Computing', c: DEGREE_MINIMUM, f: 'Faculty of Business', d: 'BTech' },
  { n: 'Marketing', c: DEGREE_MINIMUM, f: 'Faculty of Business', d: 'BTech' },
  { n: 'Civil Engineering', c: DEGREE_MINIMUM, f: 'Faculty of Engineering', d: 'BTech', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: DEGREE_MINIMUM, f: 'Faculty of Engineering', d: 'BTech', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Mechanical Engineering', c: DEGREE_MINIMUM, f: 'Faculty of Engineering', d: 'BTech', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Fashion Design and Textiles', c: DEGREE_MINIMUM, f: 'Faculty of Applied Arts', d: 'BTech' },
  { n: 'Computer Science', c: DEGREE_MINIMUM, f: 'Faculty of Applied Sciences', d: 'BTech' },
  { n: 'Statistics', c: DEGREE_MINIMUM, f: 'Faculty of Applied Sciences', d: 'BTech' },
  { n: 'Hospitality Management', c: DIPLOMA_MINIMUM, f: 'Faculty of Applied Sciences', d: 'Diploma', y: 2 },
]

export const atu: SourceFile = {
  universityId: 'atu',
  defaultCampus: 'Accra',
  region: 'Greater Accra',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: {
    source:
      'Accra Technical University published entry requirements. No per-programme cut-off list is published, so these show the minimum aggregate for admission to the qualification.',
    sourceUrl: 'https://atu.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows: atuRows,
}
