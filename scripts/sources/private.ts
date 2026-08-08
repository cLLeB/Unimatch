import type { RawProgramme, SourceFile } from './types'

/**
 * Ghana's larger private universities.
 *
 * These institutions publish no competitive per-programme cut-off list. They
 * publish the minimum aggregate that makes an applicant eligible, which is the
 * national floor for degree admission, and admit against it.
 *
 * So every row here carries that same floor and is marked `general-minimum`.
 * An earlier draft varied the figure by programme, guessing that nursing and
 * engineering must be tighter. That guess was not in any source and is gone:
 * a number a student plans around has to come from somewhere.
 */

/**
 * The national minimum for degree admission: credit passes (A1 to C6) in six
 * subjects, three core and three electives, giving aggregate 24 at worst.
 */
const GENERAL = 24

function generalMinimum(sourceUrl: string, name: string): SourceFile['provenance'] {
  return {
    source: `${name} published entry requirements. This institution does not publish a per-programme cut-off list; admission is against the national minimum for degree admission.`,
    sourceUrl,
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  }
}

const ashesiRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Computing and Information Systems', req: ['Elective Mathematics:C6'] },
  { n: 'Management Information Systems', c: GENERAL, f: 'Faculty of Computing and Information Systems' },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Economics', c: GENERAL, f: 'Faculty of Business Administration', req: ['Economics:C6'] },
  { n: 'Computer Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Mechanical Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Mechatronic Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Law with Public Policy', c: GENERAL, f: 'Faculty of Humanities and Social Sciences', d: 'LLB' },
]

export const ashesi: SourceFile = {
  universityId: 'ashesi',
  defaultCampus: 'Berekuso',
  region: 'Eastern',
  scienceCore: true,
  aggregateBasis: 'general-minimum',
  provenance: {
    source:
      'Ashesi University published entry requirements. Ashesi admits holistically: the essay, interview and leadership record weigh alongside WASSCE results, and no aggregate cut-off is published.',
    sourceUrl: 'https://www.ashesi.edu.gh/admissions',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'authoritative',
  },
  rows: ashesiRows,
}

const centralRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'School of Business' },
  { n: 'Accounting', c: GENERAL, f: 'School of Business', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: GENERAL, f: 'School of Business' },
  { n: 'Human Resource Management', c: GENERAL, f: 'School of Business' },
  { n: 'Marketing', c: GENERAL, f: 'School of Business' },
  { n: 'Pharmacy', c: GENERAL, f: 'School of Pharmacy', d: 'PharmD', y: 6, req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Nursing', c: GENERAL, f: 'School of Medicine and Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Physician Assistantship', c: GENERAL, f: 'School of Medicine and Health Sciences', req: ['Biology:C6'] },
  { n: 'Law', c: GENERAL, f: 'Faculty of Law', d: 'LLB' },
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
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://central.edu.gh/admissions', 'Central University'),
  rows: centralRows,
}

const valleyViewRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'School of Business' },
  { n: 'Accounting', c: GENERAL, f: 'School of Business', req: ['Financial Accounting:C6'] },
  { n: 'Nursing', c: GENERAL, f: 'School of Nursing and Midwifery', req: ['Biology:C6', 'Chemistry:C6'] },
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
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://vvu.edu.gh/admissions', 'Valley View University'),
  rows: valleyViewRows,
}

const pentecostRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Banking and Finance', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Engineering and Technology' },
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Engineering and Technology', req: ['Elective Mathematics:C6'] },
  { n: 'Nursing', c: GENERAL, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Law', c: GENERAL, f: 'Faculty of Law', d: 'LLB' },
  { n: 'Theology', c: GENERAL, f: 'Faculty of Theology and Ministry', d: 'BA' },
]

export const pentecost: SourceFile = {
  universityId: 'pentecost',
  defaultCampus: 'Sowutuom, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://pentvars.edu.gh/admissions', 'Pentecost University'),
  rows: pentecostRows,
}

const gctuRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Computing and Information Systems', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Computing and Information Systems' },
  { n: 'Telecommunications Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: GENERAL, f: 'Faculty of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
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
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://gctu.edu.gh/admissions', 'Ghana Communication Technology University'),
  rows: gctuRows,
}

const academicCityRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'School of Computing and Information Technology', req: ['Elective Mathematics:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'School of Computing and Information Technology' },
  { n: 'Mechanical Engineering', c: GENERAL, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: GENERAL, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Computer Engineering', c: GENERAL, f: 'School of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'School of Business' },
  { n: 'Management and Entrepreneurship', c: GENERAL, f: 'School of Business' },
]

export const academicCity: SourceFile = {
  universityId: 'academic-city',
  defaultCampus: 'Haatso, Accra',
  region: 'Greater Accra',
  scienceCore: true,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://acity.edu.gh/admissions', 'Academic City University'),
  rows: academicCityRows,
}

const methodistRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Human Resource Management', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Applied Sciences' },
  { n: 'Nursing', c: GENERAL, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Economics', c: GENERAL, f: 'Faculty of Social Studies', d: 'BA', req: ['Economics:C6'] },
  { n: 'Sociology', c: GENERAL, f: 'Faculty of Social Studies', d: 'BA' },
]

export const methodist: SourceFile = {
  universityId: 'methodist',
  defaultCampus: 'Dansoman, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://mucg.edu.gh/admissions', 'Methodist University Ghana'),
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
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://regent.edu.gh/admissions', 'Regent University College of Science and Technology'),
  rows: regentRows,
}

const allNationsRows: RawProgramme[] = [
  { n: 'Computer Science', c: GENERAL, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6'] },
  { n: 'Biomedical Engineering', c: GENERAL, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Electronics and Communication Engineering', c: GENERAL, f: 'Faculty of Engineering and Computer Science', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Nursing', c: GENERAL, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Theology', c: GENERAL, f: 'Faculty of Theology', d: 'BA' },
]

export const allNations: SourceFile = {
  universityId: 'all-nations',
  defaultCampus: 'Koforidua',
  region: 'Eastern',
  scienceCore: true,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://allnationsuniversity.org/admissions', 'All Nations University'),
  rows: allNationsRows,
}

const catholicRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Economics and Business Administration' },
  { n: 'Economics', c: GENERAL, f: 'Faculty of Economics and Business Administration', d: 'BA', req: ['Economics:C6'] },
  { n: 'Nursing', c: GENERAL, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Information Technology' },
  { n: 'Education', c: GENERAL, f: 'Faculty of Education', d: 'B.Ed' },
  { n: 'Religious Studies', c: GENERAL, f: 'Faculty of Religious Studies', d: 'BA' },
]

export const catholic: SourceFile = {
  universityId: 'catholic',
  defaultCampus: 'Fiapre, Sunyani',
  region: 'Bono',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://cug.edu.gh/admissions', 'Catholic University of Ghana'),
  rows: catholicRows,
}

const wisconsinRows: RawProgramme[] = [
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration' },
  { n: 'Accounting', c: GENERAL, f: 'Faculty of Business Administration', req: ['Financial Accounting:C6'] },
  { n: 'Information Technology', c: GENERAL, f: 'Faculty of Information Technology' },
  { n: 'Nursing', c: GENERAL, f: 'Faculty of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Business Administration', c: GENERAL, f: 'Faculty of Business Administration', track: 'distance' },
]

export const wisconsin: SourceFile = {
  universityId: 'wisconsin',
  defaultCampus: 'North Legon, Accra',
  region: 'Greater Accra',
  scienceCore: false,
  aggregateBasis: 'general-minimum',
  provenance: generalMinimum('https://wiuc-ghana.edu.gh/admissions', 'Wisconsin International University College'),
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
