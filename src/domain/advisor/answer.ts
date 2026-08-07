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
      return '(estimated cut-off, not an official figure)'
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
    'This compares aggregates only, individual programmes also require specific subjects, which I check once you enter your grades.',
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
    ...requirements.coreSubjects.map((s) => `${s.subject} at ${s.minimumGrade}`), ...requirements.electiveSubjects.map((s) =>
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
    )}. Remember a higher aggregate is easier to reach, 24 is the general minimum for degree admission in Ghana.`,
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

  const describe = (p: Programme) => {
    const parts = [`a cut-off of ${p.requirements.minimumAggregate}`]
    if (p.durationYears) parts.push(`${p.durationYears} years`)
    if (p.annualFeesGhs !== undefined) {
      parts.push(`fees of GH₵${p.annualFeesGhs.toLocaleString('en-GH')}/yr`)
    }
    return `${label(ctx.catalogue, p)} has ${list(parts)}.`
  }

  const sentences = [describe(a), describe(b)]

  sentences.push(
    `${label(ctx.catalogue, moreCompetitive)} is the more competitive entry.`,
  )

  // Only claim a fee comparison when both sides actually publish one.
  if (a.annualFeesGhs !== undefined && b.annualFeesGhs !== undefined) {
    const cheaper = a.annualFeesGhs < b.annualFeesGhs ? a : b
    sentences.push(`${label(ctx.catalogue, cheaper)} is cheaper.`)
  } else {
    sentences.push('Neither university publishes comparable fees for these programmes.')
  }

  return {
    text: sentences.join(' '),
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
    for (const career of programme.careers ?? []) {
      frequency.set(career, (frequency.get(career) ?? 0) + 1)
    }
  }

  const top = [...frequency.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c]) => c)

  // Fall back to faculties when career data is not held for these programmes.
  const faculties = [...new Set(qualified.map((p) => p.faculty))].slice(0, 4)
  const areas = top.length > 0 ? top : faculties

  return {
    text: `You qualify for ${qualified.length} programme${qualified.length === 1 ? '' : 's'}, across ${list(areas)}. Open any of them to see its requirements and where its cut-off came from.`,
    programmeIds: qualified.slice(0, 5).map((p) => p.id),
    followUps: ['What are the cheapest programmes?', 'Which deadlines are closing soon?'],
  }
}

function answerSuperlative(
  ctx: AdvisorContext,
  kind: 'cheapest' | 'highest-salary' | 'shortest',
): Answer {
  const all = ctx.catalogue.programmes

  /** Only rank programmes that actually publish the figure being ranked. */
  const withField = <T>(get: (p: Programme) => T | undefined) =>
    all.filter((p) => get(p) !== undefined)

  let ranked: Programme[]
  let sentence: string
  let caveat =
    'Fee and salary figures, where shown, are indicative estimates rather than official publications.'

  switch (kind) {
    case 'cheapest': {
      ranked = withField((p) => p.annualFeesGhs).sort(
        (a, b) => a.annualFeesGhs! - b.annualFeesGhs!,
      )
      if (ranked.length === 0) {
        return {
          text: 'None of the programmes I hold publish their fees, so I cannot rank them by cost. University portals list fees per academic year.',
          programmeIds: [],
          followUps: DEFAULT_FOLLOW_UPS,
        }
      }
      sentence = `The lowest annual fees I hold are ${list(ranked.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at GH₵${p.annualFeesGhs!.toLocaleString('en-GH')}/yr`))}.`
      caveat = `Only ${ranked.length} of ${all.length} programmes publish a fee, so this ranks a small subset. ${caveat}`
      break
    }
    case 'highest-salary': {
      ranked = withField((p) => p.salary).sort(
        (a, b) => b.salary!.maxMonthly - a.salary!.maxMonthly,
      )
      if (ranked.length === 0) {
        return {
          text: 'I do not hold salary data for these programmes, so I would rather not guess at earnings.',
          programmeIds: [],
          followUps: DEFAULT_FOLLOW_UPS,
        }
      }
      sentence = `The highest earning ranges I hold are ${list(ranked.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at GH₵${p.salary!.minMonthly.toLocaleString('en-GH')}, ${p.salary!.maxMonthly.toLocaleString('en-GH')}/mo`))}.`
      break
    }
    case 'shortest': {
      ranked = [...all].sort((a, b) => a.durationYears - b.durationYears)
      sentence = `The shortest programmes are ${list(ranked.slice(0, 3).map((p) => `${label(ctx.catalogue, p)} at ${p.durationYears} years`))}.`
      caveat = 'Diplomas are shorter than degrees but are a different qualification.'
      break
    }
  }

  return {
    text: `${sentence} ${caveat}`,
    programmeIds: ranked.slice(0, 3).map((p) => p.id),
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
    text: `Closing soonest: ${list(soonest)}. These dates are indicative, always confirm on the university's own portal before relying on them.`,
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

/** Best-matching university for a free-text name or abbreviation. */
function findUniversity(catalogue: Catalogue, query: string) {
  const q = query.toLowerCase().trim()
  if (!q) return undefined

  return catalogue.universities
    .map((university) => {
      const haystack = `${university.name} ${university.shortName} ${university.city}`.toLowerCase()
      let score = 0
      if (university.shortName.toLowerCase() === q) score = 100
      else if (university.name.toLowerCase() === q) score = 95
      else if (haystack.includes(q)) score = 70
      else {
        const tokens = q.split(/\s+/).filter((t) => t.length > 2)
        const hits = tokens.filter((t) => haystack.includes(t)).length
        score = tokens.length && hits ? (hits / tokens.length) * 50 : 0
      }
      return { university, score }
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.university
}

function answerUniversityProgrammes(ctx: AdvisorContext, query: string): Answer {
  const university = findUniversity(ctx.catalogue, query)
  if (!university) {
    return {
      text: `I could not find a university matching "${query}". I currently hold ${list(ctx.catalogue.universities.slice(0, 6).map((u) => u.shortName))} and others.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const owned = ctx.catalogue.programmes
    .filter((p) => p.universityId === university.id)
    .sort((a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate)

  if (owned.length === 0) {
    return {
      text: `I do not hold any programmes for ${university.shortName} yet.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const cutoffs = owned.map((p) => p.requirements.minimumAggregate)
  const tracks = [...new Set(owned.map((p) => p.admissionTrack))]
  const trackNote =
    tracks.length > 1
      ? ` That includes ${list(tracks.filter((t) => t !== 'regular').map((t) => `${t.replace('-', ' ')} intakes`))}.`
      : ''

  return {
    text:
      `${university.shortName} has ${owned.length} programme${owned.length === 1 ? '' : 's'} in the catalogue, with cut-offs from ${Math.min(...cutoffs)} to ${Math.max(...cutoffs)}.${trackNote} ` +
      `The most competitive are ${list(owned.slice(0, 5).map((p) => `${p.name} (${p.requirements.minimumAggregate})`))}.`,
    programmeIds: owned.slice(0, 6).map((p) => p.id),
    followUps: [
      `What is the easiest programme at ${university.shortName}?`,
      'Which university is easiest to enter?',
      'Which deadlines are closing soon?',
    ],
  }
}

function answerWhereToStudy(ctx: AdvisorContext, query: string): Answer {
  const matches = findProgrammes(ctx.catalogue, query, 40)

  if (matches.length === 0) {
    return {
      text: `I could not find a programme matching "${query}" at any university I hold.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const byUniversity = new Map<string, typeof matches>()
  for (const programme of matches) {
    const bucket = byUniversity.get(programme.universityId) ?? []
    bucket.push(programme)
    byUniversity.set(programme.universityId, bucket)
  }

  const ranked = [...byUniversity.entries()]
    .map(([id, list_]) => ({
      name: ctx.catalogue.universities.find((u) => u.id === id)?.shortName ?? id,
      best: Math.min(...list_.map((p) => p.requirements.minimumAggregate)),
    }))
    .sort((a, b) => a.best - b.best)

  return {
    text: `${matches.length} matching programme${matches.length === 1 ? '' : 's'} across ${ranked.length} institution${ranked.length === 1 ? '' : 's'}: ${list(ranked.slice(0, 6).map((r) => `${r.name} (from ${r.best})`))}. Lower is more competitive.`,
    programmeIds: matches.slice(0, 6).map((p) => p.id),
    followUps: [`Do I qualify for ${matches[0]!.name}?`, 'What are the cheapest programmes?'],
  }
}

function answerByTrack(ctx: AdvisorContext, track: 'distance' | 'fee-paying'): Answer {
  const owned = ctx.catalogue.programmes.filter((p) => p.admissionTrack === track)
  const wording = track === 'distance' ? 'distance-learning' : 'fee-paying'

  if (owned.length === 0) {
    return {
      text: `I do not hold any ${wording} intakes yet.`,
      programmeIds: [],
      followUps: DEFAULT_FOLLOW_UPS,
    }
  }

  const institutions = [
    ...new Set(
      owned.map(
        (p) => ctx.catalogue.universities.find((u) => u.id === p.universityId)?.shortName ?? p.universityId,
      ),
    ),
  ]
  const cutoffs = owned.map((p) => p.requirements.minimumAggregate)

  return {
    text: `There are ${owned.length} ${wording} intakes, at ${list(institutions)}, with cut-offs from ${Math.min(...cutoffs)} to ${Math.max(...cutoffs)}. ${track === 'distance' ? 'Distance intakes usually accept a higher aggregate than the regular track.' : 'Fee-paying places accept a higher aggregate than the regular track, at a higher cost.'}`,
    programmeIds: owned.slice(0, 6).map((p) => p.id),
    followUps: ['What can I study with aggregate 24?', 'Which university is easiest to enter?'],
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
    case 'university-programmes':
      return answerUniversityProgrammes(ctx, intent.universityQuery)
    case 'where-to-study':
      return answerWhereToStudy(ctx, intent.programmeQuery)
    case 'by-track':
      return answerByTrack(ctx, intent.track)
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
