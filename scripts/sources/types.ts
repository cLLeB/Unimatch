import type { AdmissionTrack, AggregateBasis, Provenance } from '../../src/domain/catalogue/types'

/**
 * Compact source rows.
 *
 * Cut-off lists are transcribed in this shape rather than as full Programme
 * records so the transcription stays auditable against the published table,
 * and every derived field is produced by one code path.
 */
export interface RawProgramme {
  /** Programme name without the degree prefix, e.g. "Computer Science". */
  n: string
  /** Regular / first-choice cut-off aggregate. */
  c: number
  /** Full-fee-paying cut-off, expanded into a second record when present. */
  ff?: number
  /** Faculty, college or school. */
  f?: string
  /** Degree type; inferred from the name when omitted. */
  d?: string
  /** Duration in years; inferred from the degree type when omitted. */
  y?: number
  track?: AdmissionTrack
  campus?: string
  /** Elective requirements as "Subject:Grade". */
  req?: string[]
  /** Extra core requirements beyond the university default, as "Subject:Grade". */
  core?: string[]
  /** Separate male/female cut-offs where the university publishes them. */
  male?: number
  female?: number
  note?: string
}

export interface SourceFile {
  universityId: string
  defaultCampus: string
  region: string
  /**
   * True when the university's default third core is Integrated Science
   * (science-led institutions); false where Social Studies is as common.
   */
  scienceCore: boolean
  /**
   * Whether `c` on each row is a competitive cut-off or the institution's
   * minimum entry requirement. Defaults to a published cut-off.
   */
  aggregateBasis?: AggregateBasis
  provenance: Provenance
  rows: RawProgramme[]
}
