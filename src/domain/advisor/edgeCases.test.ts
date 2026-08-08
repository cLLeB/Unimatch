import { describe, expect, it } from 'vitest'
import type { Catalogue, Programme } from '../catalogue/types'
import { compareVerdicts, evaluate } from '../wassce/eligibility'
import type { StudentResults } from '../wassce/types'
import { answerIntent, ask, type AdvisorContext } from './answer'
import { parseIntent } from './intent'

/**
 * Fallback paths: empty catalogues, missing figures and unresolvable names.
 *
 * These are the branches a student hits when the data is thin, which is
 * exactly when a wrong or invented answer would do the most damage.
 */

const provenance = {
  source: 'Test fixture',
  year: 2025,
  lastVerified: '2026-08-07',
  confidence: 'authoritative' as const,
}

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

const ug = {
  id: 'ug',
  name: 'University of Ghana',
  shortName: 'UG',
  city: 'Accra',
  region: 'Greater Accra',
}

/** One programme, no fees, no salary, no deadlines. */
const bare: Catalogue = {
  universities: [ug],
  programmes: [programme({ id: 'only', name: 'Only Programme' })],
  deadlines: [],
}

const bareCtx: AdvisorContext = { catalogue: bare, results: null, now: new Date('2026-08-07') }

const results: StudentResults = {
  examYear: 2025,
  core: { english: 'B2', mathematics: 'B3', science: 'B3', social: 'C4' },
  electives: [
    { subject: 'Elective Mathematics', grade: 'B2' },
    { subject: 'Physics', grade: 'B3' },
    { subject: 'Chemistry', grade: 'C4' },
  ],
}

describe('intent parsing edge cases', () => {
  it.each(['thanks', 'thank you', 'ok', 'okay', 'cool', 'got it'])(
    '"%s" is an acknowledgement, not a question',
    (text) => {
      expect(parseIntent(text).kind).toBe('acknowledgement')
    },
  )

  it.each(['help', 'what can you do', 'how does this work'])('"%s" asks for help', (text) => {
    expect(parseIntent(text).kind).toBe('help')
  })

  it('reads "what can I study" with no number as a question about my own grades', () => {
    expect(parseIntent('what can I study').kind).toBe('my-aggregate')
  })

  it('reads a word-form aggregate', () => {
    expect(parseIntent('what can I study with aggregate fourteen')).toEqual({
      kind: 'study-with-aggregate',
      aggregate: 14,
    })
  })

  it('ignores a word that is not a number', () => {
    expect(parseIntent('what is my aggregate potential').kind).toBe('my-aggregate')
  })

  it('parses "X versus Y" as a comparison', () => {
    expect(parseIntent('Nursing versus Medicine')).toEqual({
      kind: 'compare',
      left: 'Nursing',
      right: 'Medicine',
    })
  })

  it('does not treat "cut-off for the" as a programme', () => {
    expect(parseIntent('cut off for the').kind).not.toBe('programme-detail')
  })

  it('falls back to the whole text when no extraction pattern matches', () => {
    const intent = parseIntent('what grades are needed')
    expect(intent.kind).toBe('grades-needed')
    if (intent.kind !== 'grades-needed') throw new Error('unreachable')
    expect(intent.programmeQuery.length).toBeGreaterThan(0)
  })

  describe('follow-ups resolve against the previous intent', () => {
    it('continues a grades-needed thread', () => {
      const intent = parseIntent('and Law?', { lastIntent: 'grades-needed' })
      expect(intent).toEqual({ kind: 'grades-needed', programmeQuery: 'Law' })
    })

    it('falls back to a programme lookup for any other prior intent', () => {
      const intent = parseIntent('what about Law?', { lastIntent: 'cheapest' })
      expect(intent).toEqual({ kind: 'programme-detail', programmeQuery: 'Law' })
    })

    it('is not a follow-up without prior context', () => {
      expect(parseIntent('and Law?').kind).not.toBe('programme-detail')
    })
  })

  it('rejects a question-word as a university name', () => {
    // "What are the cheapest programmes?" must not name a university "What".
    expect(parseIntent('What are the cheapest programmes?').kind).toBe('cheapest')
  })

  it('declines rather than inventing a university from a bare question', () => {
    // Reaches the university rule, but "what" is not an institution.
    expect(parseIntent('what programmes are there?').kind).toBe('unknown')
  })
})

describe('answers when the catalogue is thin', () => {
  it('declines to rank fees when none are published', () => {
    expect(ask(bareCtx, 'What are the cheapest programmes?').text).toContain('publish their fees')
  })

  it('declines to rank salaries when none are held', () => {
    expect(ask(bareCtx, 'Which has the highest salary?').text).toContain('do not hold salary data')
  })

  it('still ranks by duration, which is always known', () => {
    expect(ask(bareCtx, 'What is the shortest programme?').text).toContain('4 years')
  })

  it('says so when there are no deadlines at all', () => {
    expect(ask(bareCtx, 'Which deadlines are closing soon?').text).toContain('has passed')
  })

  it('reports an empty result for an aggregate nothing reaches', () => {
    const answer = ask(bareCtx, 'What can I study with aggregate 30?')
    expect(answer.text).toContain('No programme in the catalogue')
  })

  it('says when a university holds no programmes', () => {
    const empty: AdvisorContext = {
      ...bareCtx,
      catalogue: { ...bare, programmes: [] },
    }
    expect(ask(empty, 'What courses does UG offer?').text).toContain('do not hold any programmes')
  })

  it('says when a track has no intakes', () => {
    expect(ask(bareCtx, 'Is there distance learning?').text).toContain('do not hold any')
  })

  it('cannot find an unknown university', () => {
    expect(ask(bareCtx, 'What courses does Atlantis offer?').text).toContain('could not find')
  })

  it('cannot find an unknown programme to study anywhere', () => {
    expect(ask(bareCtx, 'Where can I study Wizardry?').text).toContain('could not find')
  })

  it('declines an unmatchable phrase without inventing an answer', () => {
    expect(ask(bareCtx, 'zzzz qqqq').text).toContain('rather say so than guess')
  })
})

describe('answers that depend on the student', () => {
  const withResults: AdvisorContext = { ...bareCtx, results }

  it('asks for grades before mapping careers', () => {
    expect(ask(bareCtx, 'What careers fit my grades?').text).toContain('I need your WASSCE grades')
  })

  it('asks for grades before reporting an aggregate', () => {
    expect(ask(bareCtx, 'what is my aggregate').text).toContain('I need your WASSCE grades')
  })

  it('reports the aggregate once grades exist', () => {
    expect(ask(withResults, 'what is my aggregate').text).toContain('Your aggregate is 17')
  })

  it('confirms a programme the student already meets', () => {
    expect(ask(withResults, 'Only Programme').text).toContain('currently meet its requirements')
  })

  it('gives a route when the student falls short', () => {
    const hard: AdvisorContext = {
      ...withResults,
      catalogue: {
        ...bare,
        programmes: [programme({ id: 'hard', name: 'Hard Programme', requirements: { minimumAggregate: 10, coreSubjects: [], electiveSubjects: [], notes: [] } })],
      },
    }
    expect(ask(hard, 'Hard Programme').text).toMatch(/Raise .+ and you unlock/)
  })

  it('says nothing qualifies when nothing does', () => {
    const hard: AdvisorContext = {
      ...withResults,
      catalogue: {
        ...bare,
        programmes: [programme({ id: 'hard', name: 'Hard', requirements: { minimumAggregate: 8, coreSubjects: [], electiveSubjects: [], notes: [] } })],
      },
    }
    expect(ask(hard, 'What careers fit my grades?').text).toContain('do not currently meet')
  })

  it('waits for missing subjects rather than judging', () => {
    const partial: AdvisorContext = {
      ...bareCtx,
      results: { examYear: 2025, core: { english: 'B2' }, electives: [] },
    }
    expect(ask(partial, 'what is my aggregate').text).toContain('I still need')
    expect(ask(partial, 'Do I qualify for Only Programme?').text).toContain('I still need')
  })
})

describe('the advisor says where a figure came from', () => {
  const askAbout = (overrides: Partial<Programme>) =>
    ask(
      {
        ...bareCtx,
        catalogue: {
          ...bare,
          programmes: [programme({ id: 'p', name: 'Some Programme', ...overrides })],
        },
      },
      'Some Programme',
    ).text

  it('names the source behind a secondary listing', () => {
    expect(askAbout({ provenance: { ...provenance, confidence: 'researched' } })).toContain(
      'published by Test fixture',
    )
  })

  it('names the university itself for a confirmed figure', () => {
    expect(askAbout({})).toContain('Test fixture')
  })

  it('says when the aggregate is an entry requirement rather than a cut-off', () => {
    const text = askAbout({
      requirements: {
        minimumAggregate: 24,
        aggregateBasis: 'general-minimum',
        coreSubjects: [],
        electiveSubjects: [],
        notes: [],
      },
    })
    expect(text).toContain('minimum entry requirement rather than a per-programme cut-off')
  })

  it('never reaches for hedging vocabulary', () => {
    const text = askAbout({ provenance: { ...provenance, confidence: 'researched' } })
    expect(text).not.toMatch(/indicative|estimated|unconfirmed|not published/i)
  })
})

describe('unreachable-by-design guards', () => {
  it('answerIntent handles every intent kind', () => {
    const kinds = [
      { kind: 'greeting' },
      { kind: 'acknowledgement' },
      { kind: 'help' },
      { kind: 'unknown', text: 'zzzz' },
    ] as const

    for (const intent of kinds) {
      expect(answerIntent(bareCtx, intent).text.length).toBeGreaterThan(10)
    }
  })

  it('sorts an incomplete verdict last', () => {
    const complete = evaluate(
      { minimumAggregate: 20, coreSubjects: [], electiveSubjects: [], notes: [] },
      results,
    )
    const incomplete = evaluate(
      { minimumAggregate: 20, coreSubjects: [], electiveSubjects: [], notes: [] },
      { examYear: 2025, core: {}, electives: [] },
    )

    expect([incomplete, complete].sort(compareVerdicts)[0]).toBe(complete)
    expect(compareVerdicts(incomplete, incomplete)).toBe(0)
  })
})
