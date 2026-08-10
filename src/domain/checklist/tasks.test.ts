import { describe, expect, it } from 'vitest'
import type { AdmissionDeadline, Programme } from '../catalogue/types'
import type { Verdict } from '../wassce/eligibility'
import { buildChecklist, type ChecklistInput } from './tasks'

const programme = (id: string, universityId: string, cutoff: number): Programme =>
  ({
    id,
    name: id,
    universityId,
    faculty: 'Faculty',
    degreeType: 'BSc',
    durationYears: 4,
    campus: 'Main',
    region: 'Ashanti',
    admissionTrack: 'regular',
    qualificationLevel: 'degree',
    requirements: {
      minimumAggregate: cutoff,
      coreSubjects: [],
      electiveSubjects: [],
      notes: [],
    },
    provenance: {
      source: 'test',
      year: 2026,
      lastVerified: '2026-08-10',
      confidence: 'authoritative',
    },
  }) as Programme

const QUALIFIED: Verdict = { status: 'qualified', aggregate: 10, margin: 2, shortfalls: [] }

const deadline = (id: string, universityId: string, closesOn?: string): AdmissionDeadline => ({
  id,
  universityId,
  scope: 'Undergraduate',
  ...(closesOn ? { closesOn } : { closesWhen: 'Open until WASSCE results are released' }),
  provenance: { source: 'test', year: 2026, lastVerified: '2026-08-10', confidence: 'authoritative' },
})

const base: ChecklistInput = {
  hasResults: false,
  qualifiedCount: 0,
  savedProgrammes: [],
  comparedCount: 0,
  remindersOn: false,
  manual: {},
  hasReviewed: false,
  deadlines: [],
  verdictOf: () => undefined,
  applyUrlOf: () => 'https://apps.knust.edu.gh/admissions',
  universityNameOf: () => 'KNUST',
  now: new Date('2026-08-10T00:00:00Z'),
}

describe('application checklist', () => {
  it('starts at zero for a student who has done nothing', () => {
    const checklist = buildChecklist(base)

    expect(checklist.done).toBe(0)
    expect(checklist.percent).toBe(0)
  })

  /**
   * The bug the redesign existed to fix: "Enter WASSCE grades" and "Review
   * eligible programmes" were both derived from `hasResults`, so one action
   * scored two ticks and the bar jumped to 33% before the student had looked
   * at anything.
   */
  it('does not tick "review" merely because grades were entered', () => {
    const checklist = buildChecklist({ ...base, hasResults: true })

    expect(checklist.steps.find((s) => s.id === 'enter-grades')?.done).toBe(true)
    expect(checklist.steps.find((s) => s.id === 'review')?.done).toBe(false)
    expect(checklist.done).toBe(1)
  })

  it('counts progress toward the shortlist rather than only its completion', () => {
    const saved = [programme('a', 'knust', 12), programme('b', 'knust', 14)]
    const checklist = buildChecklist({ ...base, savedProgrammes: saved })

    const step = checklist.steps.find((s) => s.id === 'save-top-5')
    expect(step?.detail).toBe('2 of 5 saved')
    expect(step?.done).toBe(false)
  })

  it('says how many more programmes a comparison needs', () => {
    expect(
      buildChecklist({ ...base, comparedCount: 1 }).steps.find((s) => s.id === 'compare')?.detail,
    ).toBe('1 more needed')
  })

  it('gives every step somewhere to go', () => {
    expect(buildChecklist(base).steps.filter((s) => !s.href)).toEqual([])
  })

  it('adds a block per saved programme, with that university’s deadline', () => {
    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
      deadlines: [deadline('knust-wassce', 'knust'), deadline('other', 'ucc', '2026-06-15')],
    })

    expect(checklist.applications).toHaveLength(1)
    const [plan] = checklist.applications
    expect(plan!.universityName).toBe('KNUST')
    expect(plan!.deadlineLabel).toBe('Open until WASSCE results are released')
  })

  /**
   * The regression the screenshot caught: KNUST's 31 August date is for
   * mature, top-up and international applicants, and showing it on a regular
   * programme puts a three-week countdown in front of a WASSCE student whose
   * application is not closing at all.
   */
  it('shows the deadline for the programme’s own track, not the soonest one', () => {
    const wassce = { ...deadline('knust-wassce', 'knust'), tracks: ['regular' as const] }
    const others = { ...deadline('knust-other', 'knust', '2026-08-31'), tracks: ['distance' as const] }

    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
      deadlines: [others, wassce],
    })

    expect(checklist.applications[0]!.deadlineLabel).toBe(
      'Open until WASSCE results are released',
    )
    expect(checklist.applications[0]!.deadlineStatus).toBe('open-ended')
  })

  /**
   * KNUST's 31 August date is for mature, top-up and international entry —
   * audiences no programme record carries a track for. It belongs on the
   * deadlines page, never on a regular applicant's programme.
   */
  it('never attaches an audience-only deadline to a programme', () => {
    const other = { ...deadline('knust-other', 'knust', '2026-08-31'), tracks: ['other' as const] }

    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
      deadlines: [other],
    })

    expect(checklist.applications[0]!.deadlineLabel).toBeUndefined()
  })

  it('falls back to a general deadline when none names the track', () => {
    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('ucc-it', 'ucc', 14)],
      deadlines: [deadline('ucc-general', 'ucc', '2026-09-30')],
    })

    expect(checklist.applications[0]!.deadlineLabel).toContain('30')
  })

  it('picks the soonest of a university’s several deadlines', () => {
    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
      deadlines: [
        deadline('knust-late', 'knust', '2026-12-01'),
        deadline('knust-soon', 'knust', '2026-08-31'),
      ],
    })

    expect(checklist.applications[0]!.deadlineLabel).toContain('31')
    expect(checklist.applications[0]!.deadlineStatus).toBe('closing-soon')
  })

  it('ticks the eligibility task from the verdict, not by hand', () => {
    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
      verdictOf: () => QUALIFIED,
    })

    const eligible = checklist.applications[0]!.tasks.find((t) => t.id.startsWith('eligible:'))
    expect(eligible?.done).toBe(true)
    expect(eligible?.manual).toBeUndefined()
  })

  /** Only the student knows whether she actually submitted. */
  it('leaves submitting to the student and remembers it per programme', () => {
    const input: ChecklistInput = {
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12), programme('ucc-it', 'ucc', 14)],
      manual: { 'submit:knust-cs': true },
    }
    const checklist = buildChecklist(input)

    const submitted = checklist.applications.map(
      (a) => a.tasks.find((t) => t.id.startsWith('submit:'))?.done,
    )
    expect(submitted).toEqual([true, false])
  })

  it('sends the submit task to the university portal', () => {
    const checklist = buildChecklist({
      ...base,
      savedProgrammes: [programme('knust-cs', 'knust', 12)],
    })

    const submit = checklist.applications[0]!.tasks.find((t) => t.id.startsWith('submit:'))
    expect(submit?.href).toBe('https://apps.knust.edu.gh/admissions')
    expect(submit?.external).toBe(true)
  })

  it('grows its total as programmes are saved, so the bar tracks real work', () => {
    const empty = buildChecklist(base)
    const withTwo = buildChecklist({
      ...base,
      savedProgrammes: [programme('a', 'knust', 12), programme('b', 'ucc', 14)],
    })

    expect(empty.total).toBe(5)
    expect(withTwo.total).toBe(9)
  })

  it('reaches 100% only when every task including each application is done', () => {
    const saved = [programme('a', 'knust', 12)]
    const checklist = buildChecklist({
      ...base,
      hasResults: true,
      hasReviewed: true,
      savedProgrammes: [...saved, ...Array.from({ length: 4 }, (_, i) => programme(`p${i}`, 'knust', 12))],
      comparedCount: 2,
      remindersOn: true,
      verdictOf: () => QUALIFIED,
      manual: Object.fromEntries(
        ['a', 'p0', 'p1', 'p2', 'p3'].map((id) => [`submit:${id}`, true]),
      ),
    })

    expect(checklist.percent).toBe(100)
  })
})
