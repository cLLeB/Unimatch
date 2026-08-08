import { describe, expect, it } from 'vitest'
import master from '../../data/authoritative/universities-master.json'
import { getProgramme, programmes } from './catalogue'

/**
 * The supplied confirmed cut-offs actually reached the catalogue.
 *
 * These figures came from the university lists themselves and supersede
 * anything we researched. A silent failure here would leave a student planning
 * against a secondary source we had already been told was wrong: our KNUST
 * figures sat about five points high, which is the difference between applying
 * for a programme and not bothering.
 */

interface MasterRow {
  universityId: string
  name: string
  track: string
  aggregate: number | null
  matchesId: string | null
}

const rows = master.rows as MasterRow[]

describe('supplied confirmed cut-offs', () => {
  it('covers the five universities the file holds', () => {
    expect(new Set(rows.map((r) => r.universityId))).toEqual(
      new Set(['knust', 'ug', 'ucc', 'uhas', 'upsa']),
    )
  })

  it('every row that matched an existing programme now sets its aggregate', () => {
    const mismatches = rows
      .filter((row) => row.matchesId !== null && row.aggregate !== null)
      .map((row) => ({ row, programme: getProgramme(row.matchesId!) }))
      .filter(({ row, programme }) => programme?.requirements.minimumAggregate !== row.aggregate)

    expect(mismatches).toEqual([])
  })

  it('marks every superseded record as confirmed', () => {
    const notConfirmed = rows
      .filter((row) => row.matchesId !== null && row.aggregate !== null)
      .map((row) => getProgramme(row.matchesId!))
      .filter((programme) => programme?.provenance.confidence !== 'authoritative')

    expect(notConfirmed).toEqual([])
  })

  it('no longer calls a superseded figure a secondary report', () => {
    const stale = rows
      .filter((row) => row.matchesId !== null && row.aggregate !== null)
      .map((row) => getProgramme(row.matchesId!))
      .filter((programme) =>
        programme?.requirements.notes.some((note) => note.startsWith('Reported by a secondary')),
      )

    expect(stale).toEqual([])
  })

  it('adds the programmes we did not already hold', () => {
    // Every unmatched row must exist in the catalogue under its university.
    const missing = rows
      .filter((row) => row.matchesId === null)
      .filter(
        (row) =>
          !programmes.some(
            (p) =>
              p.universityId === row.universityId &&
              p.name.toLowerCase() === row.name.toLowerCase() &&
              p.admissionTrack === row.track,
          ),
      )

    expect(missing.map((r) => `${r.universityId}: ${r.name}`)).toEqual([])
  })

  it('corrects the KNUST figures a secondary listing had too high', () => {
    // The university's own 2026/2027 list. Ours said 15.
    const cs = getProgramme('knust-computer-science')
    expect(cs?.requirements.minimumAggregate).toBe(7)
    expect(cs?.provenance.confidence).toBe('authoritative')
    expect(cs?.provenance.source).toMatch(/KNUST published cut-off points/)
  })

  it('gives UHAS real cut-offs in place of the general entry minimum', () => {
    const pharmacy = getProgramme('uhas-pharmacy')
    expect(pharmacy?.requirements.minimumAggregate).toBe(8)
    expect(pharmacy?.requirements.aggregateBasis).toBe('published-cutoff')
  })

  it('leaves fees and careers alone, since the file carries neither', () => {
    const cs = getProgramme('knust-computer-science')
    expect(cs?.fees).toBeDefined()
    expect(cs?.careers?.length).toBeGreaterThan(0)
  })
})

describe('nothing is listed twice', () => {
  /**
   * Superseding means replacing. A confirmed cut-off that lands beside the
   * researched one it was meant to replace shows a student the same programme
   * twice at two different figures, which is worse than either figure alone.
   */
  function subjectKey(name: string): string {
    return name
      .toLowerCase()
      .replace(/\((?:bsc|ba|b\.?ed|bcom|llb|btech|dvm|bds|pharmd|mbchb)\)/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\bsciences\b/, 'science')
      .trim()
      .replace(/\s+education$/, '')
  }

  it('no university offers the same subject twice on one track at one degree', () => {
    const seen = new Map<string, string[]>()

    for (const programme of programmes) {
      const key = [
        programme.universityId,
        programme.admissionTrack,
        programme.degreeType,
        subjectKey(programme.name),
      ].join(' | ')
      seen.set(key, [...(seen.get(key) ?? []), programme.id])
    }

    const duplicated = [...seen.entries()].filter(([, ids]) => ids.length > 1)
    expect(duplicated).toEqual([])
  })

  it('keeps genuinely different routes to the same subject', () => {
    // Legon admits Computer Science at 7 on the regular track and 15
    // full-fee-paying. Those are two records on purpose.
    const regular = getProgramme('ug-computer-science')
    const feePaying = getProgramme('ug-computer-science-fee-paying')

    expect(regular?.requirements.minimumAggregate).toBe(7)
    expect(feePaying?.requirements.minimumAggregate).toBe(15)
    expect(feePaying?.admissionTrack).toBe('fee-paying')
  })
})
