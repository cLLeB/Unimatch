import { describe, expect, it } from 'vitest'
import type { Catalogue, Programme, University } from '../catalogue/types'
import type { StudentResults } from '../wassce/types'
import { ask, type AdvisorContext } from './answer'

/**
 * The advisor's remaining branches: name matching, singular versus plural, and
 * every "we do not hold that" path.
 *
 * A student asks in their own words, so the matcher is the part most likely to
 * be wrong in a way nobody notices. Each scoring tier is pinned here.
 */

const provenance = {
  source: 'Test fixture',
  year: 2026,
  lastVerified: '2026-08-07',
  confidence: 'authoritative' as const,
}

const NOW = new Date('2026-08-07')

function programme(overrides: Partial<Programme> & { id: string; name: string }): Programme {
  return {
    universityId: 'ug',
    faculty: 'Test Faculty',
    degreeType: 'BSc',
    durationYears: 4,
    campus: 'Accra',
    region: 'Greater Accra',
    admissionTrack: 'regular',
    qualificationLevel: 'degree',
    requirements: { minimumAggregate: 20, coreSubjects: [], electiveSubjects: [], notes: [] },
    provenance,
    ...overrides,
  }
}

const ug: University = {
  id: 'ug',
  name: 'University of Ghana',
  shortName: 'UG',
  city: 'Accra',
  region: 'Greater Accra',
}

const knust: University = {
  id: 'knust',
  name: 'Kwame Nkrumah University of Science and Technology',
  shortName: 'KNUST',
  city: 'Kumasi',
  region: 'Ashanti',
}

/** A university that holds nothing, which the rankings must skip. */
const empty: University = {
  id: 'empty',
  name: 'Empty University',
  shortName: 'EU',
  city: 'Ho',
  region: 'Volta',
}

const results: StudentResults = {
  examYear: 2025,
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

function context(overrides: Partial<Catalogue> = {}, rest: Partial<AdvisorContext> = {}) {
  const catalogue: Catalogue = {
    universities: [ug, knust, empty],
    programmes: [
      programme({ id: 'ug-law', name: 'Law', degreeType: 'LLB' }),
      programme({
        id: 'knust-computer-science',
        name: 'Computer Science',
        universityId: 'knust',
        requirements: { minimumAggregate: 12, coreSubjects: [], electiveSubjects: [], notes: [] },
      }),
    ],
    deadlines: [],
    ...overrides,
  }
  return { catalogue, results: null, now: NOW, ...rest } satisfies AdvisorContext
}

describe('matching a programme by name', () => {
  const ctx = context()

  it.each([
    ['an exact name', 'Law'],
    ['a name plus its university', 'Law at UG'],
    ['a prefix', 'Comp'],
    ['a fragment inside the name', 'puter Science'],
    ['loose tokens in any order', 'science computer knust'],
  ])('finds a programme from %s', (_case, query) => {
    expect(ask(ctx, `Do I qualify for ${query}?`).text).not.toMatch(/could not find/)
  })

  it('declines when no token overlaps at all', () => {
    expect(ask(ctx, 'Do I qualify for Wizardry?').text).toMatch(/could not find/)
  })

  it('declines a grades question about a programme it does not hold', () => {
    expect(ask(ctx, 'What grades do I need for Wizardry?').text).toMatch(/could not find/)
  })

  it('declines a bare programme name it does not hold', () => {
    expect(ask(ctx, 'cut-off for Wizardry').text).toMatch(/could not find/)
  })

  it('declines an empty question rather than matching everything', () => {
    expect(ask(ctx, '   ').text).toMatch(/rather say so than guess/)
  })
})

describe('matching a university by name', () => {
  it('resolves a bare university name with no other signal', () => {
    expect(ask(context(), 'University of Ghana').text).toContain('UG has')
  })

  it('picks the better match when two universities both match a token', () => {
    // Both names contain "University", so the comparator has to run.
    expect(ask(context(), 'Kwame Nkrumah University').text).toContain('KNUST has')
  })

  it('counts a single programme in the singular', () => {
    const ctx = context({ programmes: [programme({ id: 'ug-law', name: 'Law' })] })
    expect(ask(ctx, 'What courses does UG offer?').text).toContain('1 programme in')
  })
})

describe('rankings skip what is not held', () => {
  it('leaves a university with no programmes out of the easiest ranking', () => {
    const text = ask(context(), 'Which university is easiest to enter?').text
    expect(text).not.toContain('Empty University')
    expect(text).not.toContain('EU')
  })
})

describe('comparing two programmes', () => {
  it('says so when neither publishes fees', () => {
    expect(ask(context(), 'Compare Law and Computer Science').text).toContain(
      'Neither university publishes comparable fees',
    )
  })

  it('names the cheaper one when both publish fees', () => {
    const ctx = context({
      programmes: [
        programme({ id: 'ug-law', name: 'Law', annualFeesGhs: 9000 }),
        programme({
          id: 'knust-computer-science',
          name: 'Computer Science',
          universityId: 'knust',
          annualFeesGhs: 4000,
        }),
      ],
    })
    expect(ask(ctx, 'Law vs Computer Science').text).toMatch(/Computer Science.*is cheaper/)
  })

  it('reports which side it could not find', () => {
    expect(ask(context(), 'Compare Law and Wizardry').text).toContain('could not find')
  })

  it('describes a one-year programme in the singular', () => {
    const ctx = context({
      programmes: [
        programme({ id: 'ug-cert', name: 'Certificate', durationYears: 1 }),
        programme({ id: 'knust-cs', name: 'Computer Science', universityId: 'knust' }),
      ],
    })
    expect(ask(ctx, 'Certificate vs Computer Science').text).toContain('1 years')
  })
})

describe('careers', () => {
  it('names the most common careers across qualifying programmes', () => {
    const ctx = context(
      {
        programmes: [
          programme({ id: 'ug-law', name: 'Law', careers: ['Barrister', 'Legal Counsel'] }),
          programme({ id: 'ug-nursing', name: 'Nursing', careers: ['Barrister', 'Nurse'] }),
        ],
      },
      { results },
    )
    expect(ask(ctx, 'What careers fit my grades?').text).toContain('Barrister')
  })

  it('falls back to faculty names when qualifying programmes list no careers', () => {
    const ctx = context({}, { results })
    expect(ask(ctx, 'What careers can I do?').text).toContain('Test Faculty')
  })
})

describe('requirements wording', () => {
  it('joins alternative electives with "or"', () => {
    const ctx = context({
      programmes: [
        programme({
          id: 'ug-law',
          name: 'Law',
          requirements: {
            minimumAggregate: 12,
            coreSubjects: [{ subject: 'English Language', minimumGrade: 'C6' }],
            electiveSubjects: [
              {
                subject: 'Physics',
                alternatives: ['Elective Mathematics'],
                minimumGrade: 'C6',
              },
            ],
            notes: [],
          },
        }),
      ],
    })
    expect(ask(ctx, 'What grades do I need for Law?').text).toContain(
      'Physics or Elective Mathematics at C6',
    )
  })
})

describe('eligibility wording', () => {
  const qualifying = (minimumAggregate: number) =>
    context(
      {
        programmes: [
          programme({
            id: 'ug-law',
            name: 'Law',
            requirements: { minimumAggregate, coreSubjects: [], electiveSubjects: [], notes: [] },
          }),
        ],
      },
      { results },
    )

  it('says "exactly on the cut-off" with no margin to spare', () => {
    // The student's aggregate is 17.
    expect(ask(qualifying(17), 'Do I qualify for Law?').text).toContain('exactly on the cut-off')
  })

  it('uses the singular for a one-point margin', () => {
    expect(ask(qualifying(18), 'Do I qualify for Law?').text).toContain('1 point inside')
  })

  it('uses the plural beyond one point', () => {
    expect(ask(qualifying(20), 'Do I qualify for Law?').text).toContain('3 points inside')
  })

  it('withholds judgement on a programme detail when grades are incomplete', () => {
    const ctx = context({}, { results: { examYear: 2025, core: { english: 'B2' }, electives: [] } })
    const text = ask(ctx, 'cut-off for Law').text
    expect(text).not.toMatch(/you currently meet|Raise /i)
  })
})

describe('deadlines', () => {
  const withDeadline = (closesOn: string) =>
    context({
      deadlines: [
        {
          id: 'ug-general',
          universityId: 'ug',
          scope: 'General',
          closesOn,
          provenance,
        },
      ],
    })

  it('uses the singular for a deadline one day away', () => {
    expect(ask(withDeadline('2026-08-08'), 'Which deadlines close soon?').text).toContain('1 day')
  })

  it('uses the plural beyond one day', () => {
    expect(ask(withDeadline('2026-08-17'), 'Which deadlines close soon?').text).toContain('10 days')
  })

  it('falls back to the raw id when the university is unknown', () => {
    const ctx = context({
      deadlines: [
        {
          id: 'ghost',
          universityId: 'atlantis',
          scope: 'General',
          closesOn: '2026-08-20',
          provenance,
        },
      ],
    })
    expect(ask(ctx, 'Which deadlines close soon?').text).toContain('atlantis')
  })
})

describe('where to study', () => {
  it('uses the singular for a single match at a single institution', () => {
    const ctx = context({ programmes: [programme({ id: 'ug-law', name: 'Law' })] })
    const text = ask(ctx, 'Where can I study Law?').text
    expect(text).toContain('1 matching programme')
    expect(text).toContain('1 institution')
  })

  it('uses the plural across several institutions', () => {
    const ctx = context({
      programmes: [
        programme({ id: 'ug-law', name: 'Law' }),
        programme({ id: 'knust-law', name: 'Law', universityId: 'knust' }),
      ],
    })
    const text = ask(ctx, 'Where can I study Law?').text
    expect(text).toContain('2 matching programmes')
    expect(text).toContain('2 institutions')
  })
})

describe('the last few paths', () => {
  it('falls back to the raw id when a programme names a university we do not hold', () => {
    const ctx = context({
      universities: [ug],
      programmes: [programme({ id: 'ghost-law', name: 'Law', universityId: 'atlantis' })],
    })
    expect(ask(ctx, 'Where can I study Law?').text).toContain('atlantis')
  })

  it('scores an exact "name university" phrase', () => {
    expect(ask(context(), 'Do I qualify for Law UG?').text).not.toMatch(/could not find/)
  })

  it('scores a fragment that spans the name and the university', () => {
    expect(ask(context(), 'Do I qualify for w UG?').text).not.toMatch(/could not find/)
  })

  it('declines a query of only very short tokens', () => {
    expect(ask(context(), 'cut-off for xy z').text).toMatch(/could not find/)
  })

  it('names the most accessible option when an aggregate reaches nothing', () => {
    // Two programmes, so the sort comparator actually runs.
    const text = ask(context(), 'What can I study with aggregate 30?').text
    expect(text).toContain('No programme in the catalogue')
    expect(text).toContain('Law at UG')
  })

  it('reports close matches when nothing is outright eligible', () => {
    const ctx = context({
      programmes: [programme({ id: 'ug-law', name: 'Law', requirements: { minimumAggregate: 18, coreSubjects: [], electiveSubjects: [], notes: [] } })],
    })
    const text = ask(ctx, 'What can I study with aggregate 20?').text
    expect(text).toContain('Within 3 points')
    expect(text).not.toContain('The most competitive you reach')
  })

  it('reports which side of a comparison is missing when it is the first', () => {
    expect(ask(context(), 'Compare Wizardry and Law').text).toContain('"Wizardry"')
  })

  it('names the cheaper side when it is the first', () => {
    const ctx = context({
      programmes: [
        programme({ id: 'ug-law', name: 'Law', annualFeesGhs: 4000 }),
        programme({
          id: 'knust-cs',
          name: 'Computer Science',
          universityId: 'knust',
          annualFeesGhs: 9000,
        }),
      ],
    })
    expect(ask(ctx, 'Law vs Computer Science').text).toMatch(/Law at UG is cheaper/)
  })

  it('uses the current clock when the caller supplies none', () => {
    const ctx: AdvisorContext = {
      catalogue: {
        ...context().catalogue,
        deadlines: [
          {
            id: 'far-future',
            universityId: 'ug',
            scope: 'General',
            closesOn: '2099-01-01',
            provenance,
          },
        ],
      },
      results: null,
    }
    expect(ask(ctx, 'Which deadlines close soon?').text).toContain('UG General')
  })

  it('counts a single qualifying programme in the singular', () => {
    const ctx = context(
      {
        programmes: [
          programme({ id: 'ug-law', name: 'Law' }),
          programme({
            id: 'knust-cs',
            name: 'Computer Science',
            universityId: 'knust',
            requirements: { minimumAggregate: 8, coreSubjects: [], electiveSubjects: [], notes: [] },
          }),
        ],
      },
      { results },
    )
    expect(ask(ctx, 'what is my aggregate').text).toContain('1 programme,')
  })

  it('does not let an acknowledgement overwrite what the thread was about', () => {
    const ctx = context()
    const first = ask(ctx, 'What courses does UG offer?')
    const second = ask({ ...ctx, memory: first.memory }, 'thanks')
    expect(second.memory?.lastIntent).toBe('university-programmes')
  })
})

describe('plural forms in the aggregate summary', () => {
  it('counts several qualifying programmes in the plural', () => {
    // The student's aggregate is 17, so both of these are within reach.
    const ctx = context(
      {
        programmes: [
          programme({ id: 'ug-law', name: 'Law' }),
          programme({ id: 'knust-cs', name: 'Computer Science', universityId: 'knust' }),
        ],
      },
      { results },
    )
    expect(ask(ctx, 'what is my aggregate').text).toMatch(/2 programmes,/)
  })

  it('falls back to the raw id when listing institutions for a university query', () => {
    const ctx = context({
      universities: [ug],
      programmes: [
        programme({ id: 'ghost-law', name: 'Law', universityId: 'atlantis' }),
        programme({ id: 'ug-law', name: 'Law' }),
      ],
    })
    expect(ask(ctx, 'Where can I study Law?').text).toContain('atlantis')
  })
})
