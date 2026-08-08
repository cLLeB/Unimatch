import { describe, expect, it } from 'vitest'
import {
  admissionDeadlineSchema,
  catalogueSchema,
  programmeSchema,
  provenanceSchema,
  salaryRangeSchema,
} from './schema'

/**
 * The schemas are the gate every committed figure passes through, in the
 * import script and again in CI. A hole here is a hole through which a wrong
 * cut-off reaches a student, so each rule is exercised from both sides.
 */

const provenance = {
  source: 'KNUST 2026/27 admissions list',
  sourceUrl: 'https://www.knust.edu.gh/admissions',
  year: 2026,
  lastVerified: '2026-08-07',
  confidence: 'authoritative' as const,
}

const university = {
  id: 'knust',
  name: 'Kwame Nkrumah University of Science and Technology',
  shortName: 'KNUST',
  city: 'Kumasi',
  region: 'Ashanti',
}

const programme = {
  id: 'knust-computer-science',
  name: 'Computer Science',
  universityId: 'knust',
  faculty: 'College of Science',
  degreeType: 'BSc',
  durationYears: 4,
  campus: 'Kumasi',
  region: 'Ashanti',
  admissionTrack: 'regular' as const,
  qualificationLevel: 'degree' as const,
  requirements: {
    minimumAggregate: 10,
    aggregateBasis: 'published-cutoff' as const,
    coreSubjects: [],
    electiveSubjects: [],
    notes: [],
  },
  provenance,
}

const deadline = {
  id: 'knust-undergraduate',
  universityId: 'knust',
  scope: 'Undergraduate admissions',
  closesOn: '2026-08-31',
  provenance,
}

const catalogue = {
  universities: [university],
  programmes: [programme],
  deadlines: [deadline],
}

function messages(result: { success: boolean; error?: { issues: { message: string }[] } }): string {
  return result.error?.issues.map((i) => i.message).join(' | ') ?? ''
}

describe('provenance', () => {
  it('accepts a fully cited figure', () => {
    expect(provenanceSchema.safeParse(provenance).success).toBe(true)
  })

  it('rejects an uncited figure', () => {
    const result = provenanceSchema.safeParse({ ...provenance, source: 'x' })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/Cite where this figure came from/)
  })

  it('rejects a confidence level we no longer recognise', () => {
    // "estimated" was removed: a figure we cannot confirm is not shown at all.
    expect(provenanceSchema.safeParse({ ...provenance, confidence: 'estimated' }).success).toBe(
      false,
    )
  })

  it.each(['2026-8-07', 'August 2026', ''])('rejects "%s" as a verification date', (value) => {
    expect(provenanceSchema.safeParse({ ...provenance, lastVerified: value }).success).toBe(false)
  })

  it('rejects a date that looks right but does not exist', () => {
    const result = provenanceSchema.safeParse({ ...provenance, lastVerified: '2026-13-45' })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/Not a real date/)
  })

  it('rejects a source url that is not a url', () => {
    expect(provenanceSchema.safeParse({ ...provenance, sourceUrl: 'knust.edu.gh' }).success).toBe(
      false,
    )
  })
})

describe('programme', () => {
  it('accepts a minimal sourced record', () => {
    expect(programmeSchema.safeParse(programme).success).toBe(true)
  })

  it('rejects an id that is not kebab-case', () => {
    const result = programmeSchema.safeParse({ ...programme, id: 'KNUST_CompSci' })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/kebab-case/)
  })

  it.each([0, 9])('rejects a %i-year degree', (durationYears) => {
    expect(programmeSchema.safeParse({ ...programme, durationYears }).success).toBe(false)
  })

  it('rejects an aggregate outside what WASSCE can produce', () => {
    expect(
      programmeSchema.safeParse({
        ...programme,
        requirements: { ...programme.requirements, minimumAggregate: 5 },
      }).success,
    ).toBe(false)
  })

  it('rejects an unknown admission track', () => {
    expect(programmeSchema.safeParse({ ...programme, admissionTrack: 'evening' }).success).toBe(
      false,
    )
  })

  it('rejects a fee band that runs backwards', () => {
    const result = programmeSchema.safeParse({
      ...programme,
      fees: { minGhs: 9000, maxGhs: 4000, year: '2026/27', source: 'Fee schedule' },
    })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/maxGhs must be at least minGhs/)
  })

  it('accepts a fee band that runs forwards', () => {
    expect(
      programmeSchema.safeParse({
        ...programme,
        fees: { minGhs: 4000, maxGhs: 9000, year: '2026/27', source: 'Fee schedule' },
      }).success,
    ).toBe(true)
  })

  it('rejects an empty cut-off trend, which would render a blank chart', () => {
    expect(programmeSchema.safeParse({ ...programme, cutoffTrend: [] }).success).toBe(false)
  })

  it('rejects an overview too short to say anything', () => {
    expect(programmeSchema.safeParse({ ...programme, overview: 'A good course.' }).success).toBe(
      false,
    )
  })

  it('rejects an employment rate above 100', () => {
    expect(programmeSchema.safeParse({ ...programme, employmentRatePct: 120 }).success).toBe(false)
  })
})

describe('salary range', () => {
  it('accepts a range in order', () => {
    expect(salaryRangeSchema.safeParse({ minMonthly: 2000, maxMonthly: 6000 }).success).toBe(true)
  })

  it('rejects a range out of order', () => {
    const result = salaryRangeSchema.safeParse({ minMonthly: 6000, maxMonthly: 2000 })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/maxMonthly must be at least minMonthly/)
  })

  it('rejects a negative salary', () => {
    expect(salaryRangeSchema.safeParse({ minMonthly: -1, maxMonthly: 6000 }).success).toBe(false)
  })
})

describe('deadline', () => {
  it('accepts a dated deadline', () => {
    expect(admissionDeadlineSchema.safeParse(deadline).success).toBe(true)
  })

  it('accepts a condition where a university publishes no date', () => {
    const { closesOn: _closesOn, ...rest } = deadline
    expect(
      admissionDeadlineSchema.safeParse({
        ...rest,
        closesWhen: 'Open until WASSCE results are released',
      }).success,
    ).toBe(true)
  })

  it('rejects a deadline with neither, which could only be a countdown to nothing', () => {
    const { closesOn: _closesOn, ...rest } = deadline
    const result = admissionDeadlineSchema.safeParse(rest)
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/either a closing date or the published condition/)
  })
})

describe('catalogue cross-references', () => {
  it('accepts a consistent catalogue', () => {
    expect(catalogueSchema.safeParse(catalogue).success).toBe(true)
  })

  it('rejects a programme pointing at a university that does not exist', () => {
    const result = catalogueSchema.safeParse({
      ...catalogue,
      programmes: [{ ...programme, universityId: 'atlantis' }],
    })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/references unknown university "atlantis"/)
  })

  it('rejects a deadline pointing at a university that does not exist', () => {
    const result = catalogueSchema.safeParse({
      ...catalogue,
      deadlines: [{ ...deadline, universityId: 'atlantis' }],
    })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/Deadline "knust-undergraduate" references unknown/)
  })

  it('rejects duplicate university ids', () => {
    const result = catalogueSchema.safeParse({ ...catalogue, universities: [university, university] })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/Duplicate university id: knust/)
  })

  it('rejects duplicate programme ids', () => {
    const result = catalogueSchema.safeParse({ ...catalogue, programmes: [programme, programme] })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/Duplicate programme id: knust-computer-science/)
  })

  it('rejects a cut-off that contradicts its own trend chart', () => {
    const result = catalogueSchema.safeParse({
      ...catalogue,
      programmes: [
        {
          ...programme,
          cutoffTrend: [
            { year: 2024, aggregate: 12 },
            { year: 2026, aggregate: 14 },
          ],
        },
      ],
    })
    expect(result.success).toBe(false)
    expect(messages(result)).toMatch(/disagrees with its latest cut-off trend point \(14 in 2026\)/)
  })

  it('accepts a cut-off that agrees with the latest trend point', () => {
    expect(
      catalogueSchema.safeParse({
        ...catalogue,
        programmes: [
          {
            ...programme,
            cutoffTrend: [
              { year: 2026, aggregate: 10 },
              { year: 2024, aggregate: 12 },
            ],
          },
        ],
      }).success,
    ).toBe(true)
  })

  it('rejects an empty catalogue', () => {
    expect(
      catalogueSchema.safeParse({ universities: [], programmes: [], deadlines: [] }).success,
    ).toBe(false)
  })
})
