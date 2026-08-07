import { Star } from 'lucide-react'
import { useMemo } from 'react'
import { LinkButton } from '../components/ui/Button'
import ProgrammeCard from '../components/programme/ProgrammeCard'
import { getProgramme } from '../data/catalogue'
import type { Programme } from '../domain/catalogue/types'
import { useEligibility } from '../hooks/useEligibility'
import { useStudent } from '../state/StudentProvider'

export default function SavedPage() {
  const { state } = useStudent()
  const { byId } = useEligibility()

  const saved = useMemo(
    () =>
      state.savedProgrammeIds
        .map(getProgramme)
        .filter((programme): programme is Programme => programme !== undefined),
    [state.savedProgrammeIds],
  )

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="mb-1 text-xl font-bold text-ink sm:text-2xl">Saved Programmes</h1>
          <p className="text-sm text-ink-muted">
            {saved.length === 0
              ? 'Your shortlist will appear here.'
              : `${saved.length} programme${saved.length === 1 ? '' : 's'} on your shortlist.`}
          </p>
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
            <Star size={32} className="text-ink-muted" aria-hidden="true" />
            <div>
              <p className="font-medium text-ink">Nothing saved yet</p>
              <p className="mt-1 text-sm text-ink-muted">
                Tap Save on any programme to build your shortlist.
              </p>
            </div>
            <LinkButton to="/dashboard">Browse programmes</LinkButton>
          </div>
        ) : (
          <div className="space-y-4">
            {saved.map((programme) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                verdict={byId.get(programme.id) ?? { status: 'incomplete', missing: [] }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
