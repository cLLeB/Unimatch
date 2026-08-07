import type { RawProgramme, SourceFile } from './types'

/**
 * KNUST, 72 undergraduate programmes with published cut-off aggregates.
 *
 * Reported by a secondary aggregator rather than KNUST's own portal, so these
 * carry `researched` confidence and the UI badges them "Unconfirmed".
 * KNUST's general requirement is credit passes in three cores (English, Core
 * Maths, Integrated Science) plus three relevant electives, aggregate 24 or
 * better.
 */
const rows: RawProgramme[] = [
  // Faculty of Law / Arts / Social Sciences
  { n: 'Law', c: 9, f: 'Faculty of Law', d: 'LLB' },
  { n: 'Sociology', c: 15, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Social Work', c: 16, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'History', c: 19, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Political Studies', c: 16, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Geography and Rural Development', c: 16, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'English', c: 18, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Religious Studies', c: 20, f: 'Faculty of Arts', d: 'BA' },
  { n: 'French', c: 16, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Akan', c: 23, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Economics', c: 17, f: 'Faculty of Social Sciences', d: 'BA' },
  { n: 'Culture and Tourism', c: 17, f: 'Faculty of Arts', d: 'BA' },
  { n: 'Communication Design (Graphic Design)', c: 19, f: 'College of Art and Built Environment', d: 'BA' },
  { n: 'Industrial Art', c: 20, f: 'College of Art and Built Environment', d: 'BA' },
  { n: 'Integrated Rural Art and Industry', c: 21, f: 'College of Art and Built Environment', d: 'BA' },
  { n: 'Publishing Studies', c: 14, f: 'College of Art and Built Environment', d: 'BA' },
  { n: 'Painting and Sculpture', c: 22, f: 'College of Art and Built Environment', d: 'BFA' },

  // Business
  { n: 'Business Administration', c: 10, f: 'KNUST School of Business' },

  // Built and Natural Environment
  { n: 'Land Economy', c: 13, f: 'College of Art and Built Environment' },
  { n: 'Quantity Surveying and Construction Economics', c: 18, f: 'College of Art and Built Environment' },
  { n: 'Construction Technology and Management', c: 18, f: 'College of Art and Built Environment' },
  { n: 'Architecture', c: 13, f: 'College of Art and Built Environment', y: 4 },
  { n: 'Human Settlement Planning', c: 19, f: 'College of Art and Built Environment' },
  { n: 'Development Planning', c: 15, f: 'College of Art and Built Environment' },
  { n: 'Real Estate Management', c: 18, f: 'College of Art and Built Environment' },

  // Engineering
  { n: 'Aerospace Engineering', c: 10, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Biomedical Engineering', c: 8, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Chemical Engineering', c: 14, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Chemistry:C6'] },
  { n: 'Mechanical Engineering', c: 14, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Civil Engineering', c: 14, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Computer Engineering', c: 11, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Geological Engineering', c: 18, f: 'College of Engineering', req: ['Elective Mathematics:C6'] },
  { n: 'Electrical and Electronic Engineering', c: 9, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Materials Engineering', c: 17, f: 'College of Engineering', req: ['Elective Mathematics:C6'] },
  { n: 'Petroleum Engineering', c: 9, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Petrochemical Engineering', c: 11, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Chemistry:C6'] },
  { n: 'Telecommunication Engineering', c: 14, f: 'College of Engineering', req: ['Elective Mathematics:C6', 'Physics:C6'] },
  { n: 'Agricultural Engineering', c: 23, f: 'College of Engineering', req: ['Elective Mathematics:C6'] },
  { n: 'Geomatic (Geodetic) Engineering', c: 18, f: 'College of Engineering', req: ['Elective Mathematics:C6'] },
  { n: 'Metallurgical Engineering', c: 19, f: 'College of Engineering', req: ['Elective Mathematics:C6'] },

  // Science
  { n: 'Mathematics', c: 23, f: 'College of Science', req: ['Elective Mathematics:C6'] },
  { n: 'Statistics', c: 15, f: 'College of Science', req: ['Elective Mathematics:C6'] },
  { n: 'Biochemistry', c: 11, f: 'College of Science', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Environmental Science', c: 18, f: 'College of Science' },
  { n: 'Food Science and Technology', c: 15, f: 'College of Science', req: ['Chemistry:C6'] },
  { n: 'Optometry', c: 8, f: 'College of Science', d: 'OD', y: 6, req: ['Physics:C6', 'Biology:C6'] },
  { n: 'Computer Science', c: 15, f: 'College of Science', req: ['Elective Mathematics:C6'] },
  { n: 'Physics', c: 24, f: 'College of Science', req: ['Physics:C6', 'Elective Mathematics:C6'] },
  { n: 'Biological Science', c: 15, f: 'College of Science', req: ['Biology:C6'] },
  { n: 'Actuarial Science', c: 13, f: 'College of Science', req: ['Elective Mathematics:C6'] },
  { n: 'Chemistry', c: 20, f: 'College of Science', req: ['Chemistry:C6'] },
  { n: 'Meteorology and Climate Science', c: 21, f: 'College of Science', req: ['Physics:C6'] },

  // Health Sciences
  { n: 'Human Biology (Medicine)', c: 6, f: 'College of Health Sciences', d: 'MBChB', y: 6, req: ['Biology:C6', 'Chemistry:C6', 'Physics:C6'] },
  { n: 'Pharmacy', c: 8, f: 'College of Health Sciences', d: 'PharmD', y: 6, req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Medical Laboratory Technology', c: 9, f: 'College of Health Sciences', req: ['Chemistry:C6', 'Biology:C6'] },
  { n: 'Sports and Exercise Science', c: 21, f: 'College of Health Sciences' },
  { n: 'Nursing', c: 8, f: 'College of Health Sciences', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Herbal Medicine', c: 15, f: 'College of Health Sciences', y: 4, req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Veterinary Medicine', c: 13, f: 'College of Health Sciences', d: 'DVM', y: 6, req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Dental Surgery', c: 8, f: 'College of Health Sciences', d: 'BDS', y: 6, track: 'fee-paying', req: ['Biology:C6', 'Chemistry:C6'] },
  { n: 'Disability and Rehabilitation Studies', c: 17, f: 'College of Health Sciences' },
  { n: 'Midwifery', c: 12, f: 'College of Health Sciences', req: ['Biology:C6'] },
  { n: 'Sonography', c: 18, f: 'College of Health Sciences', track: 'fee-paying', req: ['Physics:C6', 'Biology:C6'] },

  // Agriculture and Natural Resources
  { n: 'Agriculture', c: 24, f: 'College of Agriculture and Natural Resources' },
  { n: 'Post Harvest Technology', c: 24, f: 'College of Agriculture and Natural Resources' },
  { n: 'Natural Resource Management', c: 24, f: 'College of Agriculture and Natural Resources' },
  { n: 'Forest Resources Technology', c: 23, f: 'College of Agriculture and Natural Resources' },
  { n: 'Landscape Design and Management', c: 24, f: 'College of Agriculture and Natural Resources' },
  { n: 'Agribusiness Management', c: 14, f: 'College of Agriculture and Natural Resources' },
  { n: 'Agricultural Biotechnology', c: 21, f: 'College of Agriculture and Natural Resources' },
  { n: 'Dairy and Meat Science and Technology', c: 23, f: 'College of Agriculture and Natural Resources' },
  { n: 'Aquaculture and Water Resource Management', c: 23, f: 'College of Agriculture and Natural Resources' },
]

export const knust: SourceFile = {
  universityId: 'knust',
  defaultCampus: 'Kumasi',
  region: 'Ashanti',
  scienceCore: true,
  provenance: {
    source: 'KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)',
    sourceUrl: 'https://o3schools.com/knust-cut-off-points/',
    year: 2026,
    lastVerified: '2026-08-07',
    confidence: 'researched',
  },
  rows,
}
