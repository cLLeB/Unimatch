import type { Programme, NavUser, StudentProfile } from '../types/university';

export const currentUser: NavUser = {
  name: 'Kofi A.',
  initials: 'KA',
};

export const studentProfile: StudentProfile = {
  name: 'Kofi Asante',
  school: 'Kumasi Academy',
  track: 'General Science',
  examYear: 2024,
  aggregate: 14,
  qualifiedCount: 3,
  universitiesCount: 7,
};

/**
 * All programme data lives here as a flat array so both the Dashboard
 * (list/filter view) and the ViewDetails page (single-programme view)
 * read from the same reusable source. In a real app this would be the
 * response of a `GET /programmes` API call.
 */
export const programmes: Programme[] = [
  {
    id: 'knust-computer-science',
    name: 'Computer Science',
    university: 'KNUST',
    faculty: 'Computing & Information Science',
    degreeType: 'BSc',
    durationYears: 4,
    location: 'Kumasi, Ashanti',
    qualifies: true,
    overview:
      "The Computer Science programme at KNUST is one of Ghana's most competitive and sought-after degrees. Spanning 4 years, students gain deep theoretical knowledge and practical skills aligned with industry demands. Graduates are highly employable across both private and public sectors.",
    pros: ['High employment rate', 'Growing tech industry', 'Versatile degree'],
    cons: ['Highly competitive', 'Heavy coursework'],
    careerPaths: [
      { title: 'Software Engineer' },
      { title: 'Data Scientist' },
      { title: 'Cybersecurity Analyst' },
    ],
    stats: {
      cutoff: { label: 'Agg. 12', value: '12', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 4,200/yr', value: '4200', sublabel: 'Approximate' },
      employmentRate: { label: '94%', value: '94', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 4,500', value: '4500', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 9 },
      { year: 2021, aggregate: 11 },
      { year: 2022, aggregate: 12 },
      { year: 2023, aggregate: 12 },
      { year: 2024, aggregate: 12 },
    ],
    entryRequirements: {
      minimumAggregate: 12,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'B3' },
        { subject: 'Core Mathematics', minimumGrade: 'B2' },
        { subject: 'Integrated Science', minimumGrade: 'B3' },
      ],
      electiveSubjects: [
        { subject: 'Elective Mathematics', minimumGrade: 'B3' },
        { subject: 'Physics', minimumGrade: 'B3' },
        { subject: 'Chemistry', minimumGrade: 'C4' },
      ],
      notes: [
        'Applicants must sit for WASSCE or an equivalent qualification.',
        'Elective Mathematics is compulsory for this programme.',
        'Preference given to applicants with a background in ICT.',
      ],
    },
    deadlines: [
      { label: 'Early Application Window Opens', date: 'Jan 15, 2025', isPast: true },
      { label: 'Regular Application Deadline', date: 'Aug 30, 2025', isPast: false },
      { label: 'Late Application Deadline', date: 'Sep 20, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 4,200',
      total: 'GH₵ 16,800 (4 years, estimate)',
      breakdown: [
        { label: 'Academic Facility User Fee', amount: 'GH₵ 1,850' },
        { label: 'Tuition', amount: 'GH₵ 1,200' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 650' },
        { label: 'Student Services Fee', amount: 'GH₵ 500' },
      ],
    },
  },
  {
    id: 'uds-nursing',
    name: 'Nursing',
    university: 'UDS',
    faculty: 'School of Nursing & Midwifery',
    degreeType: 'BSc',
    durationYears: 4,
    location: 'Tamale, Northern',
    qualifies: true,
    overview:
      'The Nursing programme at UDS trains students to deliver safe, patient-centred care across community and clinical settings. The curriculum blends anatomy, pharmacology, and supervised clinical placements from year two onward.',
    pros: ['Strong job security', 'Clinical placements from year 2', 'Nationwide demand'],
    cons: ['Physically demanding rotations', 'Long practicum hours'],
    careerPaths: [
      { title: 'Registered Nurse' },
      { title: 'Community Health Officer' },
      { title: 'Midwife' },
    ],
    stats: {
      cutoff: { label: 'Agg. 20', value: '20', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 2,200/yr', value: '2200', sublabel: 'Approximate' },
      employmentRate: { label: '91%', value: '91', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 3,100', value: '3100', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 22 },
      { year: 2021, aggregate: 21 },
      { year: 2022, aggregate: 21 },
      { year: 2023, aggregate: 20 },
      { year: 2024, aggregate: 20 },
    ],
    entryRequirements: {
      minimumAggregate: 20,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'C6' },
        { subject: 'Core Mathematics', minimumGrade: 'C6' },
        { subject: 'Integrated Science', minimumGrade: 'C4' },
      ],
      electiveSubjects: [
        { subject: 'Biology', minimumGrade: 'C4' },
        { subject: 'Chemistry', minimumGrade: 'C6' },
        { subject: 'Physics or Elective Maths', minimumGrade: 'C6' },
      ],
      notes: [
        'A pass in Biology at the elective level is compulsory.',
        'Shortlisted applicants must attend an interview.',
        'Medical fitness certificate required before enrolment.',
      ],
    },
    deadlines: [
      { label: 'Regular Application Deadline', date: 'Jul 31, 2025', isPast: false },
      { label: 'Interview Period', date: 'Aug 18, 2025', isPast: false },
      { label: 'Late Application Deadline', date: 'Sep 5, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 2,200',
      total: 'GH₵ 8,800 (4 years, estimate)',
      breakdown: [
        { label: 'Tuition', amount: 'GH₵ 900' },
        { label: 'Clinical Practicum Fee', amount: 'GH₵ 700' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 350' },
        { label: 'Student Services Fee', amount: 'GH₵ 250' },
      ],
    },
  },
  {
    id: 'ucc-business-administration',
    name: 'Business Administration',
    university: 'University of Cape Coast',
    faculty: 'School of Business',
    degreeType: 'BBA',
    durationYears: 4,
    location: 'Cape Coast, Central',
    qualifies: true,
    overview:
      'The BBA at University of Cape Coast prepares students for leadership roles across finance, marketing, and operations. The programme combines core management theory with real-world case studies and an internship in the final year.',
    pros: ['Broad career flexibility', 'Strong alumni network', 'Internship placement support'],
    cons: ['Large lecture class sizes', 'Highly saturated job market'],
    careerPaths: [
      { title: 'Business Analyst' },
      { title: 'Marketing Manager' },
      { title: 'Entrepreneur' },
    ],
    stats: {
      cutoff: { label: 'Agg. 18', value: '18', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 2,800/yr', value: '2800', sublabel: 'Approximate' },
      employmentRate: { label: '87%', value: '87', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 3,400', value: '3400', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 16 },
      { year: 2021, aggregate: 17 },
      { year: 2022, aggregate: 17 },
      { year: 2023, aggregate: 18 },
      { year: 2024, aggregate: 18 },
    ],
    entryRequirements: {
      minimumAggregate: 18,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'C6' },
        { subject: 'Core Mathematics', minimumGrade: 'C6' },
        { subject: 'Integrated Science or Social Studies', minimumGrade: 'C6' },
      ],
      electiveSubjects: [
        { subject: 'Economics', minimumGrade: 'C6' },
        { subject: 'Business Management', minimumGrade: 'C6' },
        { subject: 'Financial Accounting', minimumGrade: 'C6' },
      ],
      notes: [
        'Applicants without Business electives may apply via the Access route.',
        'Mature applicants require 5 years of relevant work experience.',
      ],
    },
    deadlines: [
      { label: 'Regular Application Deadline', date: 'Aug 15, 2025', isPast: false },
      { label: 'Late Application Deadline', date: 'Sep 10, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 2,800',
      total: 'GH₵ 11,200 (4 years, estimate)',
      breakdown: [
        { label: 'Tuition', amount: 'GH₵ 1,300' },
        { label: 'Academic Facility Fee', amount: 'GH₵ 800' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 450' },
        { label: 'Student Services Fee', amount: 'GH₵ 250' },
      ],
    },
  },
  {
    id: 'ug-medicine',
    name: 'Medicine & Surgery',
    university: 'University of Ghana',
    faculty: 'School of Medicine & Dentistry',
    degreeType: 'MBChB',
    durationYears: 6,
    location: 'Accra, Greater Accra',
    qualifies: false,
    overview:
      'The MBChB programme at the University of Ghana Medical School is a rigorous 6-year path combining pre-clinical sciences with hospital-based clinical rotations across Korle-Bu Teaching Hospital and affiliated sites.',
    pros: ['Prestigious qualification', 'Guaranteed housemanship placement', 'High lifetime earning potential'],
    cons: ['Extremely competitive entry', 'Longest duration of any programme', 'High cost of study materials'],
    careerPaths: [{ title: 'Medical Doctor' }, { title: 'Surgeon' }, { title: 'Public Health Physician' }],
    stats: {
      cutoff: { label: 'Agg. 6', value: '6', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 6,500/yr', value: '6500', sublabel: 'Approximate' },
      employmentRate: { label: '99%', value: '99', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 5,800', value: '5800', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 7 },
      { year: 2021, aggregate: 7 },
      { year: 2022, aggregate: 6 },
      { year: 2023, aggregate: 6 },
      { year: 2024, aggregate: 6 },
    ],
    entryRequirements: {
      minimumAggregate: 6,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'A1' },
        { subject: 'Core Mathematics', minimumGrade: 'B2' },
        { subject: 'Integrated Science', minimumGrade: 'A1' },
      ],
      electiveSubjects: [
        { subject: 'Biology', minimumGrade: 'A1' },
        { subject: 'Chemistry', minimumGrade: 'A1' },
        { subject: 'Physics', minimumGrade: 'B2' },
      ],
      notes: [
        'Applicants must pass the Medical School Admission Test (MSAT).',
        'Shortlisted candidates are invited for a panel interview.',
      ],
    },
    deadlines: [
      { label: 'MSAT Registration Deadline', date: 'Jun 30, 2025', isPast: true },
      { label: 'Regular Application Deadline', date: 'Aug 1, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 6,500',
      total: 'GH₵ 39,000 (6 years, estimate)',
      breakdown: [
        { label: 'Tuition', amount: 'GH₵ 3,200' },
        { label: 'Clinical Training Fee', amount: 'GH₵ 1,800' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 900' },
        { label: 'Student Services Fee', amount: 'GH₵ 600' },
      ],
    },
  },
  {
    id: 'gimpa-law',
    name: 'Law (LLB)',
    university: 'GIMPA',
    faculty: 'Faculty of Law',
    degreeType: 'LLB',
    durationYears: 4,
    location: 'Accra, Greater Accra',
    qualifies: true,
    overview:
      'The LLB programme at GIMPA builds a strong foundation in Ghanaian and common law, with an emphasis on legal reasoning, mooting, and clinical legal education ahead of professional law school.',
    pros: ['Strong mooting culture', 'Direct pathway to Ghana School of Law', 'Small class sizes'],
    cons: ['Reading-intensive coursework', 'Bar exam pathway adds further years'],
    careerPaths: [{ title: 'Lawyer' }, { title: 'Legal Consultant' }, { title: 'Policy Analyst' }],
    stats: {
      cutoff: { label: 'Agg. 15', value: '15', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 5,400/yr', value: '5400', sublabel: 'Approximate' },
      employmentRate: { label: '89%', value: '89', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 4,000', value: '4000', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 13 },
      { year: 2021, aggregate: 14 },
      { year: 2022, aggregate: 14 },
      { year: 2023, aggregate: 15 },
      { year: 2024, aggregate: 15 },
    ],
    entryRequirements: {
      minimumAggregate: 15,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'B2' },
        { subject: 'Core Mathematics', minimumGrade: 'C6' },
        { subject: 'Social Studies', minimumGrade: 'B3' },
      ],
      electiveSubjects: [
        { subject: 'Government', minimumGrade: 'B3' },
        { subject: 'Literature in English', minimumGrade: 'B3' },
        { subject: 'History or Economics', minimumGrade: 'C4' },
      ],
      notes: [
        'A pass in the GIMPA Law Aptitude Test may be required.',
        'Preference given to applicants with Government or Literature electives.',
      ],
    },
    deadlines: [
      { label: 'Regular Application Deadline', date: 'Aug 20, 2025', isPast: false },
      { label: 'Late Application Deadline', date: 'Sep 15, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 5,400',
      total: 'GH₵ 21,600 (4 years, estimate)',
      breakdown: [
        { label: 'Tuition', amount: 'GH₵ 3,000' },
        { label: 'Academic Facility Fee', amount: 'GH₵ 1,200' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 700' },
        { label: 'Student Services Fee', amount: 'GH₵ 500' },
      ],
    },
  },
  {
    id: 'knust-civil-engineering',
    name: 'Civil Engineering',
    university: 'KNUST',
    faculty: 'College of Engineering',
    degreeType: 'BSc',
    durationYears: 4,
    location: 'Kumasi, Ashanti',
    qualifies: false,
    overview:
      'Civil Engineering at KNUST covers structural, geotechnical, and transportation engineering, with hands-on lab work and a mandatory industrial attachment before final year.',
    pros: ['Strong infrastructure job market', 'Professional accreditation on graduation', 'Hands-on lab work'],
    cons: ['Very high cut-off', 'Demanding maths & physics load'],
    careerPaths: [{ title: 'Structural Engineer' }, { title: 'Site Engineer' }, { title: 'Urban Planner' }],
    stats: {
      cutoff: { label: 'Agg. 10', value: '10', sublabel: '2024 admission' },
      annualFees: { label: 'GH₵ 4,600/yr', value: '4600', sublabel: 'Approximate' },
      employmentRate: { label: '92%', value: '92', sublabel: 'Within 1 year' },
      averageSalary: { label: 'GH₵ 4,300', value: '4300', sublabel: 'Starting salary' },
    },
    cutoffTrend: [
      { year: 2020, aggregate: 9 },
      { year: 2021, aggregate: 9 },
      { year: 2022, aggregate: 10 },
      { year: 2023, aggregate: 10 },
      { year: 2024, aggregate: 10 },
    ],
    entryRequirements: {
      minimumAggregate: 10,
      coreSubjects: [
        { subject: 'English Language', minimumGrade: 'B3' },
        { subject: 'Core Mathematics', minimumGrade: 'B2' },
        { subject: 'Integrated Science', minimumGrade: 'B2' },
      ],
      electiveSubjects: [
        { subject: 'Elective Mathematics', minimumGrade: 'B2' },
        { subject: 'Physics', minimumGrade: 'B2' },
        { subject: 'Chemistry', minimumGrade: 'B3' },
      ],
      notes: [
        'Elective Mathematics and Physics are both compulsory.',
        'A portfolio interview may be required for borderline applicants.',
      ],
    },
    deadlines: [
      { label: 'Regular Application Deadline', date: 'Aug 30, 2025', isPast: false },
      { label: 'Late Application Deadline', date: 'Sep 20, 2025', isPast: false },
    ],
    fees: {
      annual: 'GH₵ 4,600',
      total: 'GH₵ 18,400 (4 years, estimate)',
      breakdown: [
        { label: 'Tuition', amount: 'GH₵ 2,100' },
        { label: 'Lab & Workshop Fee', amount: 'GH₵ 1,300' },
        { label: 'Library & ICT Fee', amount: 'GH₵ 650' },
        { label: 'Student Services Fee', amount: 'GH₵ 550' },
      ],
    },
  },
];

export function getProgrammeById(id: string): Programme | undefined {
  return programmes.find((p) => p.id === id);
}
