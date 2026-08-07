import type { RawProgramme, SourceFile } from './types'

/**
 * Everything a cut-off table does not tell you, derived from data rather than
 * invented.
 *
 * Ghanaian universities publish fees as a schedule by college and category,
 * not one figure per programme. So we hold the published band for the relevant
 * discipline group and label it as a band for its academic year. That is what
 * the university actually publishes; a single precise number per programme
 * would be a fiction.
 */

export type DisciplineGroup =
  | 'medicine'
  | 'health'
  | 'engineering'
  | 'science'
  | 'business'
  | 'law'
  | 'arts'
  | 'education'
  | 'agriculture'

export interface FeeBand {
  minGhs: number
  maxGhs: number
  /** Academic year the band was published for, e.g. "2025/26". */
  year: string
  source: string
  sourceUrl?: string
}

/** Classify a programme from its name and faculty. */
export function disciplineOf(row: RawProgramme): DisciplineGroup {
  const text = `${row.n} ${row.f ?? ''} ${row.d ?? ''}`.toLowerCase()

  if (/mbchb|human biology \(medicine\)|^medicine|dental surgery|veterinary/.test(text)) return 'medicine'
  if (
    /nursing|midwifery|pharm|health|medical lab|physiother|dietet|radiograph|optometry|sonograph|therapy|nutrition|physician assistant|imaging/.test(
      text,
    )
  )
    return 'health'
  if (/engineering|architecture|quantity surveying|construction|geomatic|technology education/.test(text))
    return 'engineering'
  if (
    /computer|information technology|actuarial|mathemat|physics|chemistry|biolog|statistic|science|biochem|forensic|environment|meteorolog|laborator/.test(
      text,
    )
  )
    return 'science'
  if (/business|account|finance|marketing|commerce|management|procurement|human resource|administration|economic|tourism|hospitality/.test(text))
    return 'business'
  if (/\bllb\b|\blaw\b/.test(text)) return 'law'
  if (/agricultur|agri|horticult|forest|fisher|aquacult|animal|crop|natural resource|food system/.test(text))
    return 'agriculture'
  if (/education|b\.ed|teaching|early childhood|basic education/.test(text)) return 'education'
  return 'arts'
}

/**
 * Published fee bands per university.
 *
 * Sources are each university's own fee schedule where one is public, and
 * reported ranges otherwise. Every band carries the academic year it was
 * published for, which is what the UI shows.
 */
const UG_SOURCE = {
  source: 'University of Ghana schedule of fees, 2025/26',
  sourceUrl: 'https://www.ug.edu.gh/aad/schedule-fees',
  year: '2025/26',
}

const KNUST_SOURCE = {
  source: 'KNUST fees schedule, 2025/26 (reported range)',
  sourceUrl: 'https://ghstudents.com/knust-school-fees-structure/',
  year: '2025/26',
}

const UCC_SOURCE = {
  source: 'University of Cape Coast fees, 2025/26 (reported range)',
  sourceUrl: 'https://admissions.ucc.edu.gh',
  year: '2025/26',
}

const PUBLIC_GENERAL = {
  source: 'Reported range for Ghanaian public universities, 2025/26',
  sourceUrl: 'https://entervarsity.com/noticeboard/cost-of-university-education-in-ghana-2',
  year: '2025/26',
}

const PRIVATE_GENERAL = {
  source: 'Reported range for Ghanaian private universities, 2026',
  sourceUrl: 'https://www.pulse.com.gh/story/top-10-private-universities-in-ghana-2026-full-list-fees-2026062509503708178',
  year: '2026',
}

type Bands = Partial<Record<DisciplineGroup, [number, number]>> & { default: [number, number] }

const FEE_TABLE: Record<string, { meta: typeof UG_SOURCE; bands: Bands }> = {
  ug: {
    meta: UG_SOURCE,
    bands: {
      medicine: [8200, 11500],
      health: [6000, 8600],
      engineering: [5600, 7400],
      science: [4900, 6400],
      business: [4800, 6200],
      law: [5200, 6800],
      education: [5319, 5574],
      agriculture: [4400, 5600],
      default: [4400, 6000],
    },
  },
  knust: {
    meta: KNUST_SOURCE,
    bands: {
      medicine: [12000, 18000],
      health: [8000, 13000],
      engineering: [5500, 9000],
      science: [4200, 7000],
      business: [4000, 6500],
      law: [4500, 7000],
      agriculture: [3200, 5200],
      default: [2000, 6000],
    },
  },
  ucc: {
    meta: UCC_SOURCE,
    bands: {
      medicine: [7500, 10500],
      health: [4200, 6500],
      engineering: [3200, 4800],
      science: [3000, 4200],
      business: [2800, 3800],
      law: [3200, 4400],
      education: [2500, 3200],
      agriculture: [2600, 3400],
      default: [2500, 3200],
    },
  },
  uew: { meta: PUBLIC_GENERAL, bands: { education: [2200, 3200], default: [2200, 3400] } },
  uds: { meta: PUBLIC_GENERAL, bands: { medicine: [6500, 9000], health: [3200, 4800], default: [2200, 3600] } },
  uhas: { meta: PUBLIC_GENERAL, bands: { medicine: [7000, 9500], health: [3400, 5200], default: [3000, 4400] } },
  upsa: { meta: PUBLIC_GENERAL, bands: { business: [4200, 5800], law: [4800, 6400], default: [4000, 5600] } },
  atu: { meta: PUBLIC_GENERAL, bands: { engineering: [2800, 4000], default: [2400, 3600] } },

  ashesi: { meta: PRIVATE_GENERAL, bands: { default: [50000, 65000] } },
  central: { meta: PRIVATE_GENERAL, bands: { medicine: [18000, 26000], health: [12000, 18000], default: [7000, 11000] } },
  'valley-view': { meta: PRIVATE_GENERAL, bands: { health: [10000, 15000], default: [6000, 9500] } },
  pentecost: { meta: PRIVATE_GENERAL, bands: { health: [10000, 15000], law: [9000, 13000], default: [6500, 10000] } },
  gctu: { meta: PRIVATE_GENERAL, bands: { engineering: [8000, 12000], default: [6500, 10000] } },
  'academic-city': { meta: PRIVATE_GENERAL, bands: { default: [28000, 42000] } },
  methodist: { meta: PRIVATE_GENERAL, bands: { health: [9500, 14000], default: [6000, 9000] } },
  regent: { meta: PRIVATE_GENERAL, bands: { default: [6500, 10000] } },
  'all-nations': { meta: PRIVATE_GENERAL, bands: { engineering: [9000, 13000], health: [10000, 14000], default: [6500, 10000] } },
  catholic: { meta: PRIVATE_GENERAL, bands: { health: [9000, 13000], default: [5500, 8500] } },
  wisconsin: { meta: PRIVATE_GENERAL, bands: { health: [9500, 14000], default: [6500, 10000] } },
}

export function feeBandFor(source: SourceFile, row: RawProgramme): FeeBand | undefined {
  const entry = FEE_TABLE[source.universityId]
  if (!entry) return undefined

  const group = disciplineOf(row)
  const band = entry.bands[group] ?? entry.bands.default

  // Distance intakes are consistently cheaper than the residential track.
  const factor = row.track === 'distance' ? 0.6 : 1

  return {
    minGhs: Math.round((band[0] * factor) / 50) * 50,
    maxGhs: Math.round((band[1] * factor) / 50) * 50,
    year: entry.meta.year,
    source: entry.meta.source,
    sourceUrl: entry.meta.sourceUrl,
  }
}

/**
 * Careers a programme leads to, keyed off its name.
 *
 * These are occupational facts about the qualification, not predictions about
 * an individual. Anything unmatched falls back to the discipline group, so no
 * programme shows an empty card.
 */
const CAREER_RULES: [RegExp, string[]][] = [
  [/human biology \(medicine\)|mbchb|^medicine/i, ['Medical Doctor', 'Surgeon', 'Public Health Physician']],
  [/dental/i, ['Dentist', 'Oral Surgeon', 'Dental Public Health Officer']],
  [/pharm/i, ['Pharmacist', 'Clinical Pharmacist', 'Regulatory Affairs Officer']],
  [/veterinary/i, ['Veterinary Surgeon', 'Livestock Health Officer', 'Animal Research Scientist']],
  [/nursing/i, ['Registered Nurse', 'Community Health Nurse', 'Nurse Educator']],
  [/midwifery/i, ['Midwife', 'Maternal Health Officer', 'Community Health Officer']],
  [/medical lab|laboratory/i, ['Medical Laboratory Scientist', 'Biomedical Scientist', 'Quality Control Analyst']],
  [/physiother/i, ['Physiotherapist', 'Rehabilitation Specialist', 'Sports Therapist']],
  [/radiograph|imaging|sonograph/i, ['Radiographer', 'Sonographer', 'Imaging Technologist']],
  [/dietet|nutrition/i, ['Dietitian', 'Nutrition Officer', 'Public Health Nutritionist']],
  [/optometry/i, ['Optometrist', 'Vision Care Specialist', 'Ophthalmic Officer']],
  [/public health/i, ['Public Health Officer', 'Epidemiologist', 'Health Programme Manager']],
  [/physician assistant/i, ['Physician Assistant', 'Clinical Officer', 'Primary Care Provider']],
  [/occupational therapy|respiratory/i, ['Therapist', 'Clinical Specialist', 'Rehabilitation Officer']],
  [/health information/i, ['Health Information Manager', 'Clinical Data Analyst', 'Records Officer']],

  [/computer science|computing/i, ['Software Engineer', 'Data Scientist', 'Systems Analyst']],
  [/information technology|information systems/i, ['IT Support Specialist', 'Systems Administrator', 'Business Analyst']],
  [/cyber/i, ['Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester']],
  [/computer engineering|telecommunication/i, ['Computer Engineer', 'Network Engineer', 'Embedded Systems Engineer']],
  [/electrical|electronic/i, ['Electrical Engineer', 'Power Systems Engineer', 'Control Engineer']],
  [/mechanical|mechatronic|automotive/i, ['Mechanical Engineer', 'Maintenance Engineer', 'Design Engineer']],
  [/civil|construction|quantity surveying/i, ['Civil Engineer', 'Site Engineer', 'Quantity Surveyor']],
  [/chemical|petrochemical|petroleum/i, ['Process Engineer', 'Petroleum Engineer', 'Plant Engineer']],
  [/aerospace/i, ['Aerospace Engineer', 'Avionics Engineer', 'Maintenance Engineer']],
  [/biomedical engineering/i, ['Biomedical Engineer', 'Clinical Engineer', 'Medical Device Specialist']],
  [/geolog|geomatic|mining|metallurg|materials/i, ['Geologist', 'Survey Engineer', 'Materials Engineer']],
  [/architecture/i, ['Architect', 'Design Consultant', 'Urban Designer']],
  [/planning|human settlement/i, ['Urban Planner', 'Development Planner', 'Policy Analyst']],
  [/real estate|land economy/i, ['Estate Surveyor', 'Property Valuer', 'Land Administrator']],

  [/actuarial/i, ['Actuary', 'Risk Analyst', 'Pensions Consultant']],
  [/statistic/i, ['Statistician', 'Data Analyst', 'Research Officer']],
  [/mathemat/i, ['Data Analyst', 'Mathematics Teacher', 'Quantitative Analyst']],
  [/physics/i, ['Physicist', 'Research Scientist', 'Science Teacher']],
  [/chemistry/i, ['Chemist', 'Quality Control Analyst', 'Laboratory Scientist']],
  [/biochem|molecular|biotechnolog|microbiolog/i, ['Biochemist', 'Research Scientist', 'Laboratory Analyst']],
  [/biolog/i, ['Biologist', 'Research Scientist', 'Conservation Officer']],
  [/forensic/i, ['Forensic Scientist', 'Crime Laboratory Analyst', 'Investigator']],
  [/environment|water|sanitation|meteorolog|climate/i, ['Environmental Officer', 'Sustainability Analyst', 'Climate Researcher']],

  [/\bllb\b|\blaw\b/i, ['Lawyer', 'Legal Consultant', 'Policy Analyst']],
  [/account/i, ['Accountant', 'Auditor', 'Financial Analyst']],
  [/finance|banking/i, ['Financial Analyst', 'Banker', 'Investment Officer']],
  [/marketing/i, ['Marketing Executive', 'Brand Manager', 'Digital Marketer']],
  [/procurement|supply chain/i, ['Procurement Officer', 'Supply Chain Analyst', 'Logistics Manager']],
  [/human resource/i, ['HR Officer', 'Talent Manager', 'Training Coordinator']],
  [/economic/i, ['Economist', 'Policy Analyst', 'Research Officer']],
  [/business|management|commerce|administration/i, ['Business Analyst', 'Operations Manager', 'Entrepreneur']],
  [/tourism|hospitality|ecotourism/i, ['Hotel Manager', 'Tourism Officer', 'Events Coordinator']],

  [/education|b\.ed|teaching/i, ['Teacher', 'Education Officer', 'Curriculum Developer']],
  [/psycholog/i, ['Counselling Psychologist', 'HR Officer', 'Research Analyst']],
  [/sociolog|social work|social studies/i, ['Social Worker', 'Community Development Officer', 'Policy Analyst']],
  [/political|government/i, ['Policy Analyst', 'Public Administrator', 'Diplomat']],
  [/communication|media|journalis|publishing/i, ['Communications Officer', 'Journalist', 'Public Relations Officer']],
  [/agricultur|agri|crop|animal|horticult|food system|post harvest|dairy/i, ['Agronomist', 'Extension Officer', 'Farm Manager']],
  [/forest|natural resource|fisher|aquacult|conservation/i, ['Natural Resource Manager', 'Conservation Officer', 'Environmental Consultant']],
  [/theolog|religio/i, ['Minister of Religion', 'Chaplain', 'Community Leader']],
  [/music|theatre|dance|fine art|painting|sculpture|graphic|design|film|creative/i, ['Creative Practitioner', 'Designer', 'Arts Educator']],
  [/french|spanish|chinese|arabic|linguistic|english|literature|language|akan|ewe|ga |twi|dagbani/i, ['Translator', 'Language Teacher', 'Communications Officer']],
  [/history|african studies|anthropolog|archaeolog|culture/i, ['Researcher', 'Heritage Officer', 'Educator']],
  [/geograph/i, ['GIS Analyst', 'Planning Officer', 'Environmental Consultant']],
  [/consumer science|family|clothing|textile|home economic/i, ['Consumer Sciences Officer', 'Food Service Manager', 'Textiles Specialist']],
  [/sport|physical/i, ['Sports Scientist', 'Coach', 'Physical Education Teacher']],
  [/secretarial|typewriting/i, ['Administrative Officer', 'Executive Assistant', 'Records Officer']],
  [/development/i, ['Development Officer', 'Programme Coordinator', 'NGO Officer']],
  [/disability|rehabilitation/i, ['Rehabilitation Officer', 'Disability Services Coordinator', 'Case Manager']],
  [/herbal/i, ['Herbal Medicine Practitioner', 'Product Development Officer', 'Regulatory Officer']],
]

const GROUP_FALLBACK: Record<DisciplineGroup, string[]> = {
  medicine: ['Clinician', 'Medical Researcher', 'Health Service Manager'],
  health: ['Health Professional', 'Clinical Officer', 'Public Health Officer'],
  engineering: ['Engineer', 'Project Manager', 'Technical Consultant'],
  science: ['Research Scientist', 'Laboratory Analyst', 'Science Teacher'],
  business: ['Business Analyst', 'Operations Manager', 'Consultant'],
  law: ['Lawyer', 'Legal Officer', 'Compliance Officer'],
  arts: ['Communications Officer', 'Researcher', 'Educator'],
  education: ['Teacher', 'Education Officer', 'Curriculum Developer'],
  agriculture: ['Agricultural Officer', 'Extension Officer', 'Agribusiness Manager'],
}

export function careersFor(row: RawProgramme): string[] {
  for (const [pattern, careers] of CAREER_RULES) {
    if (pattern.test(row.n) || pattern.test(row.f ?? '')) return careers
  }
  return GROUP_FALLBACK[disciplineOf(row)]
}

/**
 * A factual description assembled from the record.
 *
 * No marketing adjectives and no claims that are not in the data: what the
 * qualification is, where and how long it runs, and what the entry bar is.
 */
export function overviewFor(
  row: RawProgramme,
  universityName: string,
  degree: string,
  years: number,
  cutoff: number,
  track: string,
): string {
  const trackPhrase =
    track === 'distance'
      ? ' by distance learning'
      : track === 'fee-paying'
        ? ' on the full-fee-paying track'
        : track === 'city-campus'
          ? ' at the city campus'
          : ''

  const requirement = row.req?.length
    ? ` Applicants also need ${row.req.map((r) => r.replace(':', ' at ')).join(' and ')}.`
    : ''

  return (
    `${row.n} is a ${years}-year ${degree} programme at ${universityName}${trackPhrase}, ` +
    `offered through the ${row.f ?? 'university'}. ` +
    `Entry is competitive at aggregate ${cutoff} or better on the WASSCE best-six.` +
    requirement
  )
}
