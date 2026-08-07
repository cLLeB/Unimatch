import { z } from 'zod'
import { CONFIDENCE_ORDER } from '../domain/catalogue/types'
import { GRADES } from '../domain/wassce/types'
import {
  BEST_POSSIBLE_AGGREGATE,
  WORST_POSSIBLE_AGGREGATE,
} from '../domain/wassce/types'

/**
 * Schemas for the committed data files. Every record is validated at import and
 * in CI, so a malformed cut-off can never reach a student.
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected an ISO date (YYYY-MM-DD)')
  .refine((v) => !Number.isNaN(new Date(v).getTime()), 'Not a real date')

export const gradeSchema = z.enum(GRADES)

export const provenanceSchema = z.object({
  source: z.string().min(3, 'Cite where this figure came from'),
  sourceUrl: z.url().optional(),
  year: z.int().min(2015).max(2100),
  lastVerified: isoDate,
  confidence: z.enum(CONFIDENCE_ORDER),
})

export const subjectRequirementSchema = z.object({
  subject: z.string().min(1),
  alternatives: z.array(z.string().min(1)).optional(),
  minimumGrade: gradeSchema,
})

export const entryRequirementsSchema = z.object({
  minimumAggregate: z.int().min(BEST_POSSIBLE_AGGREGATE).max(WORST_POSSIBLE_AGGREGATE),
  coreSubjects: z.array(subjectRequirementSchema),
  electiveSubjects: z.array(subjectRequirementSchema),
  notes: z.array(z.string()),
})

export const universitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Use a kebab-case id'),
  name: z.string().min(3),
  shortName: z.string().min(2),
  city: z.string().min(2),
  region: z.string().min(2),
  admissionsUrl: z.url().optional(),
})

export const cutoffPointSchema = z.object({
  year: z.int().min(2015).max(2100),
  aggregate: z.int().min(BEST_POSSIBLE_AGGREGATE).max(WORST_POSSIBLE_AGGREGATE),
})

export const salaryRangeSchema = z
  .object({
    minMonthly: z.int().positive(),
    maxMonthly: z.int().positive(),
  })
  .refine((s) => s.maxMonthly >= s.minMonthly, {
    message: 'maxMonthly must be at least minMonthly',
  })

export const programmeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Use a kebab-case id'),
  name: z.string().min(2),
  universityId: z.string().min(2),
  faculty: z.string().min(2),
  degreeType: z.string().min(2),
  durationYears: z.int().min(1).max(8),
  campus: z.string().min(2),
  region: z.string().min(2),
  overview: z.string().min(40, 'Write a real overview, not a placeholder'),
  pros: z.array(z.string()).min(1),
  cons: z.array(z.string()).min(1),
  careers: z.array(z.string()).min(1),
  annualFeesGhs: z.int().positive(),
  employmentRatePct: z.int().min(0).max(100),
  salary: salaryRangeSchema,
  cutoffTrend: z.array(cutoffPointSchema).min(1),
  requirements: entryRequirementsSchema,
  provenance: provenanceSchema,
})

export const admissionDeadlineSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  universityId: z.string().min(2),
  scope: z.string().min(2),
  closesOn: isoDate,
  provenance: provenanceSchema,
})

export const catalogueSchema = z
  .object({
    universities: z.array(universitySchema).min(1),
    programmes: z.array(programmeSchema).min(1),
    deadlines: z.array(admissionDeadlineSchema),
  })
  .superRefine((data, ctx) => {
    const universityIds = new Set(data.universities.map((u) => u.id))

    const seenUniversity = new Set<string>()
    for (const university of data.universities) {
      if (seenUniversity.has(university.id)) {
        ctx.addIssue({ code: 'custom', message: `Duplicate university id: ${university.id}` })
      }
      seenUniversity.add(university.id)
    }

    const seenProgramme = new Set<string>()
    for (const programme of data.programmes) {
      if (!universityIds.has(programme.universityId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Programme "${programme.id}" references unknown university "${programme.universityId}"`,
        })
      }
      if (seenProgramme.has(programme.id)) {
        ctx.addIssue({ code: 'custom', message: `Duplicate programme id: ${programme.id}` })
      }
      seenProgramme.add(programme.id)

      // The headline cut-off must agree with the most recent trend point,
      // otherwise the detail chart contradicts the card.
      const latest = [...programme.cutoffTrend].sort((a, b) => b.year - a.year)[0]
      if (latest && latest.aggregate !== programme.requirements.minimumAggregate) {
        ctx.addIssue({
          code: 'custom',
          message: `Programme "${programme.id}": minimumAggregate (${programme.requirements.minimumAggregate}) disagrees with its latest cut-off trend point (${latest.aggregate} in ${latest.year})`,
        })
      }
    }

    for (const deadline of data.deadlines) {
      if (!universityIds.has(deadline.universityId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Deadline "${deadline.id}" references unknown university "${deadline.universityId}"`,
        })
      }
    }
  })

export type ValidatedCatalogue = z.infer<typeof catalogueSchema>
