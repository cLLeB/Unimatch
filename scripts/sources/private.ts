import type { RawProgramme, SourceFile } from './types'

/**
 * Ghana's larger private universities.
 *
 * Private institutions generally admit against the national minimum for degree
 * admission (aggregate 24) rather than publishing a competitive cut-off per
 * programme, and several use holistic admission. Programme names are real;
 * the aggregates carry `estimated` confidence and say so on every card, so a
 * student never mistakes them for a published figure.
 */

const GENERAL = 24

function estimated(sourceUrl: string, name: string): SourceFile['provenance'] {
  return {
    source: `${name} programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.`,
    sourceUrl,
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'estimated',
  }
}

const ashesiRows: RawProgramme[] = [
  { n: 'Computer Science', c: 12, f: 'Faculty of Computing and Information Systems', req: ['Elective Mathematics:C6'] },
  { n: 'Management Information Systems', c: 14, f: 'Faculty of Computing and Information Systems' },
  { n: 'Business Administration', c: 14, f: 'Faculty of Business Administration' },
  { n: 'Economics', c: 14, f: 'Faculty of Business Administration', req: ['Economics:C6'] },
  { n: 'Computer Engineering', c: 12, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: 12, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Mechanical Engineering', c: 12, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Mechatronic Engineering', c: 12, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Law with Public Policy', c: 14, f: 'Faculty of Humanities and Social Sciences', d: 'LLB' },
]

export const ashesi: SourceFile = {
  universityId: 'ashesi',
  defaultCampus: 'Berekuso',
  region: 'Eastern',
  scienceCore: true,
  provenance: {
    source:
      'Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.',
    sourceUrl: 'https://www.ashesi.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'estimated',
  },
  rows: ashesiRows,
}

const centralRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'School of Business' },
  { n: 'Accounting', c: GENERAL, f: 'School of Business', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: GENERAL, f: 'School of Business' },
  { n: 'Human Resource Management', c: GENERAL, f: 'School of Business' },
  { n: 'Marketing', c: GENERAL, f: 'School of Business' },
  { n: 'Pharmacy', c: 16, f: 'School of Pharmacy', d: 'PharmD', y: 6, req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Nursing', c: 20, f: 'School of Medicine and Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Physician Assistantship', c: 20, f: 'School of Medicine and Health Sciences', req: ['Biology:C6'] },
  { n: 'Law', c: 18, f: 'Faculty of Law', d: 'LLB' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Applied Sciences' },
  { n: 'Communication Studies', c: GENERAL, f: 'Faculty of Arts and Social Sciences', d: 'BA' },
  { n: 'Theology', c: GENERAL, f: 'School of Theology, Mission and Leadership', d: 'BA' },
  { n: 'Business Administration', c: GENERAL, f: 'School of Business', track: 'distance' },
]

export const central: SourceFile = {
  universityId: 'central',
  defaultCampus: 'Miotso',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://central.edu.gh/admissions', 'Central University'),
  rows: centralRows,
}

const valleyViewRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'School of Business' },
  { n: 'Accounting', c: GENERAL, f: 'School of Business', req: ['Financial Accounting:C6'] },
  { n: 'Nursing', c: 20, f: 'School of Nursing and Midwifery', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'School of Computing' },
  { n: 'Computer Science', c: GENERAL, f: 'School of Computing', req: ['Elective Mathematics:C6'] },
  { n: 'Development Studies', c: GENERAL, f: 'Faculty of Arts and Social Sciences', d: 'BA' },
  { n: 'Theology', c: GENERAL, f: 'School of Theology and Missions', d: 'BA' },
  { n: 'Agriculture', c: GENERAL, f: 'School of Agriculture' },
  { n: 'Business Administration', c: GENERAL, f: 'School of Business', track: 'distance' },
]

export const valleyView: SourceFile = {
  universityId: 'valley-view',
  defaultCampus: 'Oyibi',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://vvu.edu.gh/admissions', 'Valley View University'),
  rows: valleyViewRows,
}

const pentecostRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Engineering and Technology' },
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Engineering and Technology', req: ['Elective Mathematics:C6'] },
  { n: 'Nursing', c: 20, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Law', c: 18, f: 'Faculty of Law', d: 'LLB' },
  { n: 'Theology', c: GENERAL, f: 'Faculty of Theology and Ministry', d: 'BA' },
]

export const pentecost: SourceFile = {
  universityId: 'pentecost',
  defaultCampus: 'Sowutuom, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://pentvars.edu.gh/admissions', 'Pentecost University'),
  rows: pentecostRows,
}

const gctuRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Computing and Information Systems', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Computing and Information Systems' },
  { n: 'Telecommunications Engineering', c: 20, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: 20, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business', req: ['Financial Accounting:C6'] },
  { n: 'Cybersecurity', c: GENERAL, f: 'Faculty of Computing and Information Systems' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Computing and Information Systems', track: 'distance' },
]

export const gctu: SourceFile = {
  universityId: 'gctu',
  defaultCampus: 'Tesano, Accra',
  region: 'Greater Accra',
  scienceCore: true,
  provenance: estimated('https://gctu.edu.gh/admissions', 'Ghana Communication Technology University'),
  rows: gctuRows,
}

const academicCityRows: RawProgramme[] = [
  { n: 'Computer Science', c: 18, f: 'School of Computing and Information Technology', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: 18, f: 'School of Computing and Information Technology' },
  { n: 'Mechanical Engineering', c: 18, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: 18, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Computer Engineering', c: 18, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Business Administration', c: 20, f: 'School of Business' },
  { n: 'Management and Entrepreneurship', c: 20, f: 'School of Business' },
]

export const academicCity: SourceFile = {
  universityId: 'academic-city',
  defaultCampus: 'Haatso, Accra',
  region: 'Greater Accra',
  scienceCore: true,
  provenance: estimated('https://acity.edu.gh/admissions', 'Academic City University'),
  rows: academicCityRows,
}

const methodistRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Human Resource Management', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Applied Sciences' },
  { n: 'Nursing', c: 20, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Economics', c: GENERAL, f: 'Faculty of Social Studies', d: 'BA', req: ['Economics:C6'] },
  { n: 'Sociology', c: GENERAL, f: 'Faculty of Social Studies', d: 'BA' },
]

export const methodist: SourceFile = {
  universityId: 'methodist',
  defaultCampus: 'Dansoman, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://mucg.edu.gh/admissions', 'Methodist University Ghana'),
  rows: methodistRows,
}

const regentRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'School of Informatics, Engineering and Technology' },
  { n: 'Accounting', c: GENERAL, f: 'School of Informatics, Engineering and Technology', req: ['Financial Accounting:C6'] },
  { n: 'Computer Science', c: GENERAL, f: 'School of Informatics, Engineering and Technology', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'School of Informatics, Engineering and Technology' },
  { n: 'Theology', c: GENERAL, f: 'School of Theology and Ministry', d: 'BA' },
]

export const regent: SourceFile = {
  universityId: 'regent',
  defaultCampus: 'McCarthy Hill, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://regent.edu.gh/admissions', 'Regent University College of Science and Technology'),
  rows: regentRows,
}

const allNationsRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6'] },
  { n: 'Biomedical Engineering', c: 20, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electronics and Communication Engineering', c: 20, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Nursing', c: 20, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Theology', c: GENERAL, f: 'Faculty of Theology', d: 'BA' },
]

export const allNations: SourceFile = {
  universityId: 'all-nations',
  defaultCampus: 'Koforidua',
  region: 'Eastern',
  scienceCore: true,
  provenance: estimated('https://allnationsuniversity.org/admissions', 'All Nations University'),
  rows: allNationsRows,
}

const catholicRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Economics and Business Administration' },
  { n: 'Economics', c: GENERAL, f: 'Faculty of Economics and Business Administration', d: 'BA', req: ['Economics:C6'] },
  { n: 'Nursing', c: 20, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Information Technology' },
  { n: 'Education', c: GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Religious Studies', c: GENERAL, f: 'Faculty of Religious Studies', d: 'BA' },
]

export const catholic: SourceFile = {
  universityId: 'catholic',
  defaultCampus: 'Fiapre, Sunyani',
  region: 'Bono',
  scienceCore: false,
  provenance: estimated('https://cug.edu.gh/admissions', 'Catholic University of Ghana'),
  rows: catholicRows,
}

const wisconsinRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Information Technology' },
  { n: 'Nursing', c: 20, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration', track: 'distance' },
]

export const wisconsin: SourceFile = {
  universityId: 'wisconsin',
  defaultCampus: 'North Legon, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  provenance: estimated('https://wiuc-ghana.edu.gh/admissions', 'Wisconsin International University College'),
  rows: wisconsinRows,
}

export const PRIVATE_SOURCES: SourceFile[] = [
  ashesi,
  central,
  valleyView,
  pentecost,
  gctu,
  academicCity,
  methodist,
  regent,
  allNations,
  catholic,
  wisconsin,
]
