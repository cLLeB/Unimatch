import type { Catalogue, Programme } from './types'

/**
 * Facts about a programme's place in the catalogue.
 *
 * The prototype's Pros and Cons were editorial opinions written per programme.
 * That does not scale to 448 records and is not something we can source, so
 * the detail page shows computed comparisons instead: where a cut-off sits
 * among its peers, which is both true and useful.
 */
export interface ProgrammeStats {
  /** 0 = most competitive in the country, 100 = most accessible. */
  nationalPercentile: number
  /** Same, within the programme's own university. */
  universityPercentile: number
  /** Rank among all programmes, 1 = most competitive. */
  nationalRank: number
  totalProgrammes: number
  universityRank: number
  universityTotal: number
  /** Programmes at other universities with the same or a very similar name. */
  alternatives: Programme[]
  /** Others in the same faculty, nearest cut-off first. */
  peers: Programme[]
  /** True when this is the most competitive entry at its university. */
  isMostCompetitiveAtUniversity: boolean
  /** True when nothing at this university is easier to enter. */
  isMostAccessibleAtUniversity: boolean
}

function normalise(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\b(education|studies|science|technology|management)\b/g, '')
    .replace(/[^a-z]+/g, ' ')
    .trim()
}

export function computeStats(catalogue: Catalogue, programme: Programme): ProgrammeStats {
  const all = catalogue.programmes
  const cutoff = programme.requirements.minimumAggregate

  const sorted = [...all].sort(
    (a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate,
  )
  const nationalRank = sorted.findIndex((p) => p.id === programme.id) + 1

  const atUniversity = all.filter((p) => p.universityId === programme.universityId)
  const uniSorted = [...atUniversity].sort(
    (a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate,
  )
  const universityRank = uniSorted.findIndex((p) => p.id === programme.id) + 1

  const key = normalise(programme.name)
  const alternatives = all
    .filter((p) => p.id !== programme.id && p.universityId !== programme.universityId)
    .filter((p) => normalise(p.name) === key)
    .sort((a, b) => a.requirements.minimumAggregate - b.requirements.minimumAggregate)
    .slice(0, 6)

  const peers = atUniversity
    .filter((p) => p.id !== programme.id && p.faculty === programme.faculty)
    .sort(
      (a, b) =>
        Math.abs(a.requirements.minimumAggregate - cutoff) -
        Math.abs(b.requirements.minimumAggregate - cutoff),
    )
    .slice(0, 6)

  const uniCutoffs = atUniversity.map((p) => p.requirements.minimumAggregate)

  return {
    nationalPercentile: Math.round((nationalRank / all.length) * 100),
    universityPercentile: Math.round((universityRank / Math.max(atUniversity.length, 1)) * 100),
    nationalRank,
    totalProgrammes: all.length,
    universityRank,
    universityTotal: atUniversity.length,
    alternatives,
    peers,
    isMostCompetitiveAtUniversity: uniCutoffs.length > 1 && cutoff === Math.min(...uniCutoffs),
    isMostAccessibleAtUniversity: uniCutoffs.length > 1 && cutoff === Math.max(...uniCutoffs),
  }
}

/** Plain-English summary of how competitive an entry is. */
export function describeCompetitiveness(stats: ProgrammeStats): string {
  const p = stats.nationalPercentile
  if (p <= 10) return 'Among the most competitive entries in the country'
  if (p <= 30) return 'More competitive than most programmes'
  if (p <= 60) return 'Mid-range competitiveness'
  if (p <= 85) return 'More accessible than most programmes'
  return 'Among the most accessible entries in the country'
}
