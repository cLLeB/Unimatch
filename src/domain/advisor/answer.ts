import type { Catalogue, Programme } from '../catalogue/types'
import { resolveAll } from '../deadlines/status'
import { CLOSE_MATCH_MARGIN, describeShortfall, evaluate } from '../wassce/eligibility'
import { describePlan, improvementsToQualify } from '../wassce/inverse'
import { computeAggregate } from '../wassce/aggregate'
import type { StudentResults } from '../wassce/types'
import { parseIntent, type Intent } from './intent'

export interface Answer {
  text: string
  /** Programmes the UI can render as cards beneath the answer. */
  programmeIds: string[]
  /** Suggested next questions. */
  followUps: string[]
}

export interface AdvisorContext {
  catalogue: Catalogue
  results: StudentResults | null
  now?: Date
}

function universityName(catalogue: Catalogue, programme: Programme): string {
  return (
    catalogue.universities.find((u) => u.id === programme.universityId)?.shortName ??
    programme.universityId
  )
}

function label(catalogue: Catalogue, programme: Programme): string {
  return `${programme.name} at ${universityName(catalogue, programme)}`
}

/** Score a programme name against a free-text query. Higher is better. */
function matchScore(programme: Programme, query: string, catalogue: Catalogue): number {
  const q = query.toLowerCase().trim()
  if (!q) return 0

  const name = programme.name.toLowerCase()
  const uni = universityName(catalogue, programme).toLowerCase()
  const combined = `${name} ${uni}`.toLowerCase()

  if (name === q) return 100
  if (combined === q) return 95
  if (name.startsWith(q)) return 80
  if (name.includes(q)) return 70
  if (combined.includes(q)) return 60

  // Token overlap, so "comp science knust" still finds Computer Science.
  const tokens = q.split(/\s+/).filter((t) => t.length > 2)
  if (tokens.length === 0) return 0
  const hits = tokens.filter((t) => combined.includes(t)).length
  return hits === 0 ? 0 : (hits / tokens.length) * 50
}

function findProgrammes(catalogue: Catalogue, query: string, limit = 3): Programme[] {
  return catalogue.programmes
    .map((programme) => ({ programme, score: matchScore(programme, query, catalogue) }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((m) => m.programme)
}

function provenanceNote(programme: Programme): string {
  switch (programme.provenance.confidence) {
    case 'authoritative':
      return `(${programme.provenance.year} cut-off, ${programme.provenance.source})`
    case 'researched':
      return '(cut-off researched but not confirmed with the university)'
    case 'estimated':
      return '(estimated cut-off — not an official figure)'
  }
}

const NO_RESULTS_PROMPT =
  'I need your WASSCE grades first. Enter them on the Check Eligibility page and I can answer precisely.'

const DEFAULT_FOLLOW_UPS = [
  'What can I study with aggregate 12?',
  'Which university is easiest to enter?',
  'What are the cheapest programmes?',
  'Which deadlines are closing soon?',
]

function list(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]!
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function answerStudyWithAggregate(ctx: AdvisorContext, aggregate: number): Answer {
  const eligible = ctx.catalogue.programmes
    .filter((p) => p.requirements.minimumAggregate >= aggregate)
    .sort((a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate)

  const close = ctx.catalogue.programmes
    .filter(
      (p) =>
        p.requirements.minimumAggregate < aggregate &&
        p.requirements.minimumAggregate >= aggregate - CLOSE_MATCH_MARGIN,
    )
    .sort((a, b) => b.requirements.minimumAggregate - a.requirements.minimumAggregate)

  if (eligible.length === 0 && close.length === 0) {
    return {
      text: `No programme in the catalogue has a cut-off of ${aggregate} or higher. The most accessible is ${label(ctx.catalogue, [...ctx.catalogue.programmes].sort((a, b) => b.requirements.minimumAggregate - a.requirements.minimumAggregate)[0]!)}.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const lines = [
    `With aggregate ${aggregate} you meet the cut-off for ${eligible.length} of ${ctx.catalogue.programmes.length} programmes.`,
  ]

  if (eligible.length > 0) {
    const top = eligible.slice(0, 5)
    lines.push(
      `The most competitive you reach: ${list(top.map((p) => `${label(ctx.catalogue, p)} (cut-off ${p.requirements.minimumAggregate})`))}.`,
    )
  }

  if (close.length > 0) {
    lines.push(
      `Within ${CLOSE_MATCH_MARGIN} points: ${list(close.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} (${p.requirements.minimumAggregate})`))}.`,
    )
  }

  lines.push(
    'This compares aggregates only — individual programmes also require specific subjects, which I check once you enter your grades.',
  )

  return {
    text: lines.join(' '),
    programmeIds: [...eligible.slice(0, 5), ...close.slice(0, 3)].map((p) => p.id),
    followUps: [
      'What grades do I need for Medicine?',
      'Which university is easiest to enter?',
      'What are the cheapest programmes?',
    ],
  }
}

function answerDoIQualify(ctx: AdvisorContext, query: string): Answer {
  const matches = findProgrammes(ctx.catalogue, query)
  if (matches.length === 0) {
    return {
      text: `I could not find a programme matching "${query}". Try the full name, e.g. "Computer Science" or "Medicine".`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const programme = matches[0]!

  if (!ctx.results) {
    return {
      text: `${label(ctx.catalogue, programme)} has a cut-off of ${programme.requirements.minimumAggregate} ${provenanceNote(programme)}. ${NO_RESULTS_PROMPT}`,
      programmeIds: [programme.id],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const verdict = evaluate(programme.requirements, ctx.results)

  if (verdict.status === 'incomplete') {
    return {
      text: `I still need ${list(verdict.missing)} before I can check ${label(ctx.catalogue, programme)}.`,
      programmeIds: [programme.id],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  if (verdict.status === 'qualified') {
    const margin =
      verdict.margin === 0
        ? 'exactly on the cut-off'
        : `${verdict.margin} point${verdict.margin === 1 ? '' : 's'} inside the cut-off`
    return {
      text: `Yes. Your aggregate of ${verdict.aggregate} puts you ${margin} for ${label(ctx.catalogue, programme)} (cut-off ${programme.requirements.minimumAggregate}), and you meet its subject requirements. ${provenanceNote(programme)}`,
      programmeIds: [programme.id],
      followUps: [`What grades do I need for ${matches[1]?.name ?? 'Medicine'}?`, 'What are the cheapest programmes?'],
    }
  }

  const reasons = verdict.shortfalls.map(describeShortfall)
  const plan = improvementsToQualify(programme.requirements, ctx.results)

  return {
    text: `Not yet. ${reasons.join(' ')} ${describePlan(plan, label(ctx.catalogue, programme))}`,
    programmeIds: [programme.id],
    followUps: ['What can I study with my current grades?', 'Which university is easiest to enter?'],
  }
}

function answerGradesNeeded(ctx: AdvisorContext, query: string): Answer {
  const matches = findProgrammes(ctx.catalogue, query)
  if (matches.length === 0) {
    return {
      text: `I could not find a programme matching "${query}". Try the full name, e.g. "Law" or "Nursing".`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const programme = matches[0]!
  const { requirements } = programme

  const subjectLines = [
    ...requirements.coreSubjects.map((s) => `${s.subject} at ${s.minimumGrade}`),
    ...requirements.electiveSubjects.map((s) =>
      s.alternatives?.length
        ? `${[s.subject, ...s.alternatives].join(' or ')} at ${s.minimumGrade}`
        : `${s.subject} at ${s.minimumGrade}`,
    ),
  ]

  const base = `${label(ctx.catalogue, programme)} needs aggregate ${requirements.minimumAggregate} or better${subjectLines.length ? `, with ${list(subjectLines)}` : ''}. ${provenanceNote(programme)}`

  if (!ctx.results) {
    return { text: `${base} ${NO_RESULTS_PROMPT}`, programmeIds: [programme.id], followUps: DEFAULT_FOLLOW_UPS }
  }

  const plan = improvementsToQualify(requirements, ctx.results)
  return {
    text: `${base} ${describePlan(plan, label(ctx.catalogue, programme))}`,
    programmeIds: [programme.id],
    followUps: ['What can I study with my current grades?', 'Which deadlines are closing soon?'],
  }
}

function answerEasiestUniversity(ctx: AdvisorContext): Answer {
  const byUniversity = ctx.catalogue.universities
    .map((university) => {
      const owned = ctx.catalogue.programmes.filter((p) => p.universityId === university.id)
      if (owned.length === 0) return null
      const cutoffs = owned.map((p) => p.requirements.minimumAggregate)
      return {
        university,
        count: owned.length,
        mostAccessible: Math.max(...cutoffs),
        average: cutoffs.reduce((a, b) => a + b, 0) / cutoffs.length,
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.average - a.average)

  const easiest = byUniversity.slice(0, 3)

  return {
    text: `By average cut-off across the programmes I hold, the most accessible are ${list(
      easiest.map(
        (e) =>
          `${e.university.shortName} (average ${e.average.toFixed(1)} across ${e.count} programme${e.count === 1 ? '' : 's'})`,
      ),
    )}. Remember a higher aggregate is easier to reach — 24 is the general minimum for degree admission in Ghana.`,
    programmeIds: ctx.catalogue.programmes
      .filter((p) => p.universityId === easiest[0]?.university.id)
      .sort((a, b) => b.requirements.minimumAggregate - a.requirements.minimumAggregate)
      .slice(0, 3)
      .map((p) => p.id),
    followUps: ['What are the cheapest programmes?', 'What can I study with aggregate 20?'],
  }
}

function answerCompare(ctx: AdvisorContext, left: string, right: string): Answer {
  const a = findProgrammes(ctx.catalogue, left, 1)[0]
  const b = findProgrammes(ctx.catalogue, right, 1)[0]

  if (!a || !b) {
    const missing = !a ? left : right
    return {
      text: `I could not find a programme matching "${missing}".`,
      programmeIds: [a?.id, b?.id].filter((id): id is string => Boolean(id)),
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  if (a.id === b.id) {
    return {
      text: `Those both resolve to ${label(ctx.catalogue, a)}. Name two different programmes to compare.`,
      programmeIds: [a.id],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const moreCompetitive = a.requirements.minimumAggregate < b.requirements.minimumAggregate ? a : b
  const cheaper = a.annualFeesGhs < b.annualFeesGhs ? a : b
  const betterEmployment = a.employmentRatePct > b.employmentRatePct ? a : b

  return {
    text:
      `${label(ctx.catalogue, a)} has a cut-off of ${a.requirements.minimumAggregate}, fees of GH₵${a.annualFeesGhs.toLocaleString('en-GH')}/yr and ${a.employmentRatePct}% employment. ` +
      `${label(ctx.catalogue, b)} has a cut-off of ${b.requirements.minimumAggregate}, fees of GH₵${b.annualFeesGhs.toLocaleString('en-GH')}/yr and ${b.employmentRatePct}% employment. ` +
      `${label(ctx.catalogue, moreCompetitive)} is the more competitive entry, ${label(ctx.catalogue, cheaper)} is cheaper, and ${label(ctx.catalogue, betterEmployment)} reports better employment.`,
    programmeIds: [a.id, b.id],
    followUps: [`Do I qualify for ${a.name}?`, `What grades do I need for ${b.name}?`],
  }
}

function answerCareers(ctx: AdvisorContext): Answer {
  if (!ctx.results) {
    return { text: NO_RESULTS_PROMPT, programmeIds: [], followUps: DEFAULT_FOLLOW_UPS }
  }

  const qualified = ctx.catalogue.programmes.filter(
    (p) => evaluate(p.requirements, ctx.results!).status === 'qualified',
  )

  if (qualified.length === 0) {
    return {
      text: 'You do not currently meet the requirements for any programme in the catalogue, so I cannot map careers yet. Ask me what grades you need for a specific programme and I will show you the shortest route.',
      programmeIds: [],
      followUps: ['What grades do I need for Nursing?', 'Which university is easiest to enter?'],
    }
  }

  const frequency = new Map<string, number>()
  for (const programme of qualified) {
    for (const career of programme.careers) {
      frequency.set(career, (frequency.get(career) ?? 0) + 1)
    }
  }

  const top = [...frequency.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c]) => c)
  const best = [...qualified].sort((a, b) => b.employmentRatePct - a.employmentRatePct)[0]!

  return {
    text: `You qualify for ${qualified.length} programme${qualified.length === 1 ? '' : 's'}, opening careers in ${list(top)}. The strongest reported employment among them is ${label(ctx.catalogue, best)} at ${best.employmentRatePct}%.`,
    programmeIds: qualified.slice(0, 5).map((p) => p.id),
    followUps: ['What are the cheapest programmes?', 'Which deadlines are closing soon?'],
  }
}

function answerSuperlative(
  ctx: AdvisorContext,
  kind: 'cheapest' | 'highest-salary' | 'shortest',
): Answer {
  const sorted = [...ctx.catalogue.programmes]
  let sentence: string

  switch (kind) {
    case 'cheapest':
      sorted.sort((a, b) => a.annualFeesGhs - b.annualFeesGhs)
      sentence = `The lowest annual fees are ${list(sorted.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at GH₵${p.annualFeesGhs.toLocaleString('en-GH')}/yr`))}.`
      break
    case 'highest-salary':
      sorted.sort((a, b) => b.salary.maxMonthly - a.salary.maxMonthly)
      sentence = `The highest reported earning ranges are ${list(sorted.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at GH₵${p.salary.minMonthly.toLocaleString('en-GH')}–${p.salary.maxMonthly.toLocaleString('en-GH')}/mo`))}.`
      break
    case 'shortest':
      sorted.sort((a, b) => a.durationYears - b.durationYears)
      sentence = `The shortest programmes are ${list(sorted.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at ${p.durationYears} years`))}.`
      break
  }

  return {
    text: `${sentence} Fee and salary figures are indicative estimates, not official university publications.`,
    programmeIds: sorted.slice(0, 3).map((p) => p.id),
    followUps: DEFAULT_FOLLOW_UPS,
  }
}

function answerDeadlines(ctx: AdvisorContext): Answer {
  const resolved = resolveAll(ctx.catalogue.deadlines, ctx.now ?? new Date())
  const open = resolved.filter((d) => d.status !== 'closed')

  if (open.length === 0) {
    return {
      text: 'Every deadline I hold has passed. Check the university portals directly for the next admissions cycle.',
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const soonest = open.slice(0, 4).map((d) => {
    const university =
      ctx.catalogue.universities.find((u) => u.id === d.universityId)?.shortName ?? d.universityId
    return `${university} ${d.scope} in ${d.daysLeft} day${d.daysLeft === 1 ? '' : 's'}`
  })

  return {
    text: `Closing soonest: ${list(soonest)}. These dates are indicative — always confirm on the university's own portal before relying on them.`,
    programmeIds: [],
    followUps: DEFAULT_FOLLOW_UPS,
  }
}

function answerMyAggregate(ctx: AdvisorContext): Answer {
  if (!ctx.results) {
    return { text: NO_RESULTS_PROMPT, programmeIds: [], followUps: DEFAULT_FOLLOW_UPS }
  }

  const agg = computeAggregate(ctx.results)
  if (!agg.complete || agg.aggregate === null) {
    return {
      text: `I still need ${list(agg.missing)} to work out your aggregate.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const counted = agg.counted.map((s) => `${s.subject} (${s.grade})`)
  const verdicts = ctx.catalogue.programmes.map((p) => ({
    programme: p,
    verdict: evaluate(p.requirements, ctx.results!, agg),
  }))
  const qualified = verdicts.filter((v) => v.verdict.status === 'qualified')
  const close = verdicts.filter((v) => v.verdict.status === 'close-match')

  return {
    text: `Your aggregate is ${agg.aggregate}, from your best six: ${list(counted)}. That qualifies you for ${qualified.length} programme${qualified.length === 1 ? '' : 's'}, with ${close.length} more within reach.`,
    programmeIds: qualified.slice(0, 5).map((v) => v.programme.id),
    followUps: ['What careers fit my grades?', 'What grades do I need for Medicine?'],
  }
}

/** Answer a parsed intent. Exported for direct testing. */
export function answerIntent(ctx: AdvisorContext, intent: Intent): Answer {
  switch (intent.kind) {
    case 'study-with-aggregate':
      return answerStudyWithAggregate(ctx, intent.aggregate)
    case 'do-i-qualify':
      return answerDoIQualify(ctx, intent.programmeQuery)
    case 'grades-needed':
      return answerGradesNeeded(ctx, intent.programmeQuery)
    case 'easiest-university':
      return answerEasiestUniversity(ctx)
    case 'compare':
      return answerCompare(ctx, intent.left, intent.right)
    case 'careers':
      return answerCareers(ctx)
    case 'cheapest':
    case 'highest-salary':
    case 'shortest':
      return answerSuperlative(ctx, intent.kind)
    case 'deadlines':
      return answerDeadlines(ctx)
    case 'my-aggregate':
      return answerMyAggregate(ctx)
    case 'unknown':
      return {
        text: `I can only answer from the ${ctx.catalogue.programmes.length} programmes I hold, so I would rather not guess at that. Try one of these:`,
        programmeIds: [],
        followUps: DEFAULT_FOLLOW_UPS,
      }
  }
}

/** Parse and answer in one step. */
export function ask(ctx: AdvisorContext, question: string): Answer {
  return answerIntent(ctx, parseIntent(question))
}
