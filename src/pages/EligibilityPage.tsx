import { AlertCircle, BookOpen, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Select from '../components/ui/Select'
import { regions } from '../data/catalogue'
import { computeAggregate } from '../domain/wassce/aggregate'
import {
  ALL_ELECTIVE_SUBJECTS,
  ELECTIVE_SUBJECT_GROUPS,
  recentExamYears,
} from '../domain/wassce/subjects'
import {
  CORE_SUBJECT_LABELS,
  GRADES,
  MAX_ELECTIVE_COUNT,
  REQUIRED_ELECTIVE_COUNT,
  type CoreSubjectKey,
  type Grade,
  type StudentResults,
} from '../domain/wassce/types'
import { useStudent } from '../state/StudentProvider'

const CORE_ORDER: CoreSubjectKey[] = ['english', 'mathematics', 'science', 'social']

const TOTAL_GRADE_SLOTS = CORE_ORDER.length + MAX_ELECTIVE_COUNT

interface ElectiveDraft {
  subject: string
  grade: string
}

const EMPTY_ELECTIVE: ElectiveDraft = { subject: '', grade: '' }

/** Grouped options so students can find their own track's subjects quickly. */
function electiveOptions(taken: string[], current: string) {
  return ALL_ELECTIVE_SUBJECTS.filter((s) => s === current || !taken.includes(s)).map((s) => ({
    value: s,
    label: s,
  }))
}

export default function EligibilityPage() {
  const navigate = useNavigate()
  const { state, setResults } = useStudent()

  const [examYear, setExamYear] = useState(
    String(state.results?.examYear ?? recentExamYears()[0]),
  )
  const [core, setCore] = useState<Record<CoreSubjectKey, string>>(() => ({
    english: state.results?.core.english ?? '',
    mathematics: state.results?.core.mathematics ?? '',
    science: state.results?.core.science ?? '',
    social: state.results?.core.social ?? '',
  }))
  const [electives, setElectives] = useState<ElectiveDraft[]>(() => {
    const existing = state.results?.electives ?? []
    return Array.from({ length: MAX_ELECTIVE_COUNT }, (_, index) => {
      const found = existing[index]
      return found ? { subject: found.subject, grade: found.grade } : { ...EMPTY_ELECTIVE }
    })
  })
  const [programmeInterest, setProgrammeInterest] = useState('')
  const [preferredRegion, setPreferredRegion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const takenSubjects = electives.map((e) => e.subject).filter(Boolean)

  const filledGrades =
    CORE_ORDER.filter((key) => core[key]).length + electives.filter((e) => e.grade).length
  const progress = Math.round((filledGrades / TOTAL_GRADE_SLOTS) * 100)

  const missingCores = CORE_ORDER.filter((key) => !core[key])
  const incompleteRequiredElectives = electives
    .slice(0, REQUIRED_ELECTIVE_COUNT)
    .map((elective, index) => ({ elective, index }))
    .filter(({ elective }) => !elective.subject || !elective.grade)

  const isValid = missingCores.length === 0 && incompleteRequiredElectives.length === 0

  const draftResults = useMemo<StudentResults>(
    () => ({
      examYear: Number(examYear),
      core: Object.fromEntries(
        CORE_ORDER.filter((key) => core[key]).map((key) => [key, core[key] as Grade]),
      ),
      electives: electives
        .filter((e) => e.subject && e.grade)
        .map((e) => ({ subject: e.subject, grade: e.grade as Grade })),
    }),
    [examYear, core, electives],
  )

  const preview = computeAggregate(draftResults)

  const updateElective = (index: number, patch: Partial<ElectiveDraft>) => {
    setElectives((current) =>
      current.map((elective, i) => (i === index ? { ...elective, ...patch } : elective)),
    )
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (!isValid) return

    // Matching is computed locally and instantly, there is nothing to wait
    // for, so we don't manufacture a loading delay.
    setResults(draftResults)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-canvas px-4 py-6 sm:py-12">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand">
            <BookOpen size={22} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-ink sm:text-3xl">Enter Your WASSCE Grades</h1>
          <p className="text-ink-muted">
            We&apos;ll match you against every programme we hold and show you exactly where you
            stand.
          </p>
        </div>

        <div className="mb-6">
          <div className="mb-1.5 flex justify-between text-xs text-ink-muted">
            <span>
              {filledGrades} of {TOTAL_GRADE_SLOTS} grades entered
            </span>
            <span>{progress}% complete</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Grade entry progress"
            className="h-1.5 overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="mb-4 p-4 sm:p-6">
          <div className="mb-6">
            <label
              htmlFor="exam-year"
              className="mb-2 block text-sm font-semibold text-ink"
            >
              Examination Year
            </label>
            <Select
              id="exam-year"
              value={examYear}
              onChange={setExamYear}
              options={recentExamYears().map(String)}
            />
          </div>

          <fieldset className="mb-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Core Subjects
            </legend>
            <div className="space-y-3">
              {CORE_ORDER.map((key) => {
                const missing = submitted && !core[key]
                return (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between">
                      <label htmlFor={`core-${key}`} className="text-sm font-medium text-ink">
                        {CORE_SUBJECT_LABELS[key]}
                      </label>
                      {missing && <span className="text-xs text-danger">Required</span>}
                    </div>
                    <Select
                      id={`core-${key}`}
                      value={core[key]}
                      onChange={(value) => setCore((c) => ({ ...c, [key]: value }))}
                      options={GRADES}
                      placeholder="Select grade"
                      invalid={missing}
                    />
                  </div>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Your aggregate uses English, Core Mathematics and whichever of Integrated Science or
              Social Studies is stronger.
            </p>
          </fieldset>

          <fieldset className="mb-6">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Elective Subjects
            </legend>
            <div className="space-y-4">
              {electives.map((elective, index) => {
                const required = index < REQUIRED_ELECTIVE_COUNT
                const missing =
                  submitted && required && (!elective.subject || !elective.grade)

                return (
                  <div key={index}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">
                        Elective Subject {index + 1}{' '}
                        {required && (
                          <span className="text-danger" aria-hidden="true">
                            *
                          </span>
                        )}
                      </span>
                      {missing && <span className="text-xs text-danger">Required</span>}
                    </div>
                    <div className="grid grid-cols-[1fr_7rem] gap-2">
                      <Select
                        ariaLabel={`Elective subject ${index + 1}`}
                        value={elective.subject}
                        onChange={(value) => updateElective(index, { subject: value })}
                        options={electiveOptions(takenSubjects, elective.subject)}
                        placeholder={required ? 'Select subject' : 'Optional'}
                        invalid={missing && !elective.subject}
                      />
                      <Select
                        ariaLabel={`Elective ${index + 1} grade`}
                        value={elective.grade}
                        onChange={(value) => updateElective(index, { grade: value })}
                        options={GRADES}
                        placeholder="Grade"
                        invalid={missing && !elective.grade}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Enter at least three. A fourth is optional, we count your best three, and naming them
              lets us check subject requirements like &ldquo;Biology at C6&rdquo;.
            </p>
          </fieldset>

          <div className="space-y-3 border-t border-line pt-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted">
              Optional Filters
            </div>
            <div>
              <label
                htmlFor="programme-interest"
                className="mb-1 block text-sm font-medium text-ink"
              >
                Programme Interest
              </label>
              <Select
                id="programme-interest"
                value={programmeInterest}
                onChange={setProgrammeInterest}
                options={ELECTIVE_SUBJECT_GROUPS.map((group) => group.track)}
                placeholder="Any programme"
              />
            </div>
            <div>
              <label htmlFor="preferred-region" className="mb-1 block text-sm font-medium text-ink">
                Preferred Region
              </label>
              <Select
                id="preferred-region"
                value={preferredRegion}
                onChange={setPreferredRegion}
                options={regions}
                placeholder="Any region"
              />
            </div>
          </div>
        </Card>

        {preview.complete && preview.aggregate !== null && (
          <Card className="mb-4 flex items-center justify-between p-4">
            <div>
              <div className="text-xs text-ink-muted">Your aggregate so far</div>
              <div className="text-3xl font-bold text-brand">{preview.aggregate}</div>
            </div>
            <p className="max-w-[60%] text-right text-xs text-ink-muted">
              Best six: {preview.counted.map((s) => `${s.subject} (${s.grade})`).join(', ')}
            </p>
          </Card>
        )}

        {submitted && !isValid && (
          <div
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle size={16} aria-hidden="true" />
            Enter all four core subjects and at least three named electives with grades.
          </div>
        )}

        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          icon={<Search size={18} aria-hidden="true" />}
        >
          Find Eligible Programmes
        </Button>

        <p className="mt-4 text-center text-xs text-ink-muted">
          Your grades stay on this device. We don&apos;t upload them anywhere.
        </p>
      </div>
    </div>
  )
}
