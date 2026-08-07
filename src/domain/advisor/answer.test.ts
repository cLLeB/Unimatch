import { describe, expect, it } from 'vitest'
import type { Catalogue } from '../catalogue/types'
import type { StudentResults } from '../wassce/types'
import { answerIntent, ask, type AdvisorContext } from './answer'
import { parseIntent } from './intent'

const provenance = {
  source: 'Test fixture',
  year: 2025,
  lastVerified: '2026-08-07',
  confidence: 'authoritative' as const,
}

function programme(
  id: string,
  name: string,
  minimumAggregate: number,
  overrides: Partial<Catalogue['programmes'][number]> = {},
): Catalogue['programmes'][number] {
  return {
    id,
    name,
    universityId: 'ug',
    faculty: 'Test Faculty',
    degreeType: 'BSc',
    durationYears: 4,
    campus: 'Accra',
    region: 'Greater Accra',
    overview: 'A test programme used to exercise the advisor answer engine end to end.',
    pros: ['Pro'],
    cons: ['Con'],
    careers: ['Engineer'],
    annualFeesGhs: 4000,
    employmentRatePct: 90,
    salary: { minMonthly: 3000, maxMonthly: 9000 },
    cutoffTrend: [{ year: 2025, aggregate: minimumAggregate }],
    requirements: { minimumAggregate, coreSubjects: [], electiveSubjects: [], notes: [] },
    provenance,
    ...overrides,
  }
}

const catalogue: Catalogue = {
  universities: [
    { id: 'ug', name: 'University of Ghana', shortName: 'UG', city: 'Accra', region: 'Greater Accra' },
    { id: 'uds', name: 'University for Development Studies', shortName: 'UDS', city: 'Tamale', region: 'Northern' },
  ],
  programmes: [
    programme('medicine', 'Medicine', 8),
    programme('law', 'Law', 10),
    programme('computer-science', 'Computer Science', 14, {
      annualFeesGhs: 6000,
      salary: { minMonthly: 5000, maxMonthly: 20000 },
    }),
    programme('nursing', 'Nursing', 20, {
      universityId: 'uds',
      annualFeesGhs: 2000,
      durationYears: 3,
      careers: ['Nurse'],
    }),
  ],
  deadlines: [
    {
      id: 'ug-all',
      universityId: 'ug',
      scope: 'All Programmes',
      closesOn: '2026-09-30',
      provenance,
    },
  ],
}

/** Aggregate 17. */
const results: StudentResults = {
  examYear: 2025,
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

const withResults: AdvisorContext = { catalogue, results, now: new Date('2026-08-07') }
const withoutResults: AdvisorContext = { catalogue, results: null, now: new Date('2026-08-07') }

describe('advisor answers', () => {
  describe('study-with-aggregate', () => {
    it('counts programmes reachable at that aggregate', () => {
      const answer = ask(withoutResults, 'What can I study with aggregate 14?')
      // Cut-offs 14 and 20 are reachable at aggregate 14.
      expect(answer.text).toContain('2 of 4 programmes')
      expect(answer.programmeIds).toContain('computer-science')
      expect(answer.programmeIds).toContain('nursing')
    })

    it('names close matches within the margin', () => {
      const answer = ask(withoutResults, 'What can I study with aggregate 12?')
      expect(answer.text).toContain('Within 3 points')
    })

    it('is honest that it has only compared aggregates', () => {
      expect(ask(withoutResults, 'What can I study with aggregate 14?').text).toContain(
        'compares aggregates only',
      )
    })

    it('handles an aggregate below every cut-off', () => {
      const answer = ask(withoutResults, 'What can I study with aggregate 6?')
      expect(answer.text).toContain('4 of 4 programmes')
    })
  })

  describe('do-i-qualify', () => {
    it('confirms a qualifying programme with the margin', () => {
      const answer = ask(withResults, 'Do I qualify for Nursing?')
      expect(answer.text).toMatch(/^Yes\./)
      expect(answer.text).toContain('3 points inside the cut-off')
    })

    it('explains a shortfall and the route to fixing it', () => {
      const answer = ask(withResults, 'Do I qualify for Medicine?')
      expect(answer.text).toMatch(/^Not yet\./)
      expect(answer.text).toContain('miss it by 9 points')
    })

    it('asks for grades when it has none', () => {
      expect(ask(withoutResults, 'Do I qualify for Law?').text).toContain('I need your WASSCE grades')
    })

    it('says so when it cannot find the programme', () => {
      expect(ask(withResults, 'Do I qualify for Astrophysics?').text).toContain('could not find')
    })
  })

  describe('grades-needed', () => {
    it('states the cut-off and cites its source', () => {
      const answer = ask(withResults, 'What grades do I need for Computer Science?')
      expect(answer.text).toContain('aggregate 14 or better')
      expect(answer.text).toContain('Test fixture')
    })

    it('gives an actionable improvement route', () => {
      expect(ask(withResults, 'What grades do I need for Law?').text).toMatch(/Raise .+ and you unlock/)
    })
  })

  describe('easiest-university', () => {
    it('ranks by average cut-off and explains the direction', () => {
      const answer = ask(withResults, 'Which university is easiest to enter?')
      expect(answer.text).toContain('UDS')
      expect(answer.text).toContain('higher aggregate is easier')
    })
  })

  describe('compare', () => {
    it('contrasts both programmes on cut-off, fees and employment', () => {
      const answer = ask(withResults, 'Compare Computer Science and Nursing')
      expect(answer.text).toContain('Computer Science')
      expect(answer.text).toContain('Nursing')
      expect(answer.text).toContain('more competitive entry')
      expect(answer.programmeIds).toEqual(['computer-science', 'nursing'])
    })

    it('reports which side it could not resolve', () => {
      expect(ask(withResults, 'Compare Medicine and Basket Weaving').text).toContain(
        'could not find',
      )
    })

    it('rejects comparing a programme with itself', () => {
      expect(ask(withResults, 'Compare Medicine and Medicine').text).toContain(
        'Name two different programmes',
      )
    })
  })

  describe('careers', () => {
    it('maps careers from qualifying programmes', () => {
      const answer = ask(withResults, 'What careers fit my grades?')
      expect(answer.text).toContain('Nurse')
    })

    it('does not pretend when nothing qualifies', () => {
      const weak: StudentResults = {
        examYear: 2025,
        core: { english: 'C6', mathematics: 'C6', science: 'C6', social: 'C6' },
        electives: [
          { subject: 'Physics', grade: 'C6' },
          { subject: 'Chemistry', grade: 'C6' },
          { subject: 'Biology', grade: 'C6' },
        ],
      }
      const answer = ask({ ...withResults, results: weak }, 'What careers fit my grades?')
      expect(answer.text).toContain('do not currently meet')
    })
  })

  describe('superlatives', () => {
    it('finds the cheapest', () => {
      expect(ask(withResults, 'What are the cheapest programmes?').text).toContain('Nursing')
    })

    it('finds the highest salary', () => {
      expect(ask(withResults, 'Which has the highest salary?').text).toContain('Computer Science')
    })

    it('finds the shortest', () => {
      expect(ask(withResults, 'What is the shortest programme?').text).toContain('3 years')
    })

    it('flags that fees and salaries are estimates', () => {
      expect(ask(withResults, 'What are the cheapest programmes?').text).toContain(
        'indicative estimates',
      )
    })
  })

  describe('deadlines', () => {
    it('lists the soonest and tells the student to verify', () => {
      const answer = ask(withResults, 'Which deadlines are closing soon?')
      expect(answer.text).toContain('UG All Programmes')
      expect(answer.text).toContain('confirm on the')
    })

    it('says so when everything has closed', () => {
      const past: AdvisorContext = { ...withResults, now: new Date('2027-01-01') }
      expect(ask(past, 'deadlines').text).toContain('has passed')
    })
  })

  describe('my-aggregate', () => {
    it('reports the aggregate and which subjects were counted', () => {
      const answer = ask(withResults, 'What is my aggregate?')
      expect(answer.text).toContain('Your aggregate is 17')
      expect(answer.text).toContain('English Language (B2)')
    })

    it('asks for the missing subjects when incomplete', () => {
      const partial: StudentResults = { examYear: 2025, core: { english: 'B2' }, electives: [] }
      expect(ask({ ...withResults, results: partial }, 'what is my aggregate').text).toContain(
        'I still need',
      )
    })
  })

  describe('unknown', () => {
    it('declines rather than guessing, and offers real questions', () => {
      const answer = ask(withResults, 'who will win the election')
      expect(answer.text).toContain('would rather not guess')
      expect(answer.followUps.length).toBeGreaterThan(0)
    })
  })

  it('routes every parsed intent to an answer', () => {
    const questions = [
      'What can I study with aggregate 12?',
      'Do I qualify for Law?',
      'What grades do I need for Medicine?',
      'Which university is easiest to enter?',
      'Compare Law and Nursing',
      'What careers fit my grades?',
      'cheapest programmes',
      'highest salary',
      'shortest programme',
      'deadlines',
      'what is my aggregate',
      'nonsense text here',
    ]

    for (const question of questions) {
      const answer = answerIntent(withResults, parseIntent(question))
      expect(answer.text.length).toBeGreaterThan(10)
      expect(Array.isArray(answer.programmeIds)).toBe(true)
      expect(answer.followUps.length).toBeGreaterThan(0)
    }
  })
})
