import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'
import { LocalStorageStudentRepository } from './repository'
import { StudentProvider } from './StudentProvider'
import { SupabaseStudentRepository } from './supabaseRepository'
import type { StudentState } from './types'

/**
 * Chooses where a student's data lives.
 *
 * Signed in with Supabase configured → their account, so a shortlist follows
 * them between phone and laptop. Otherwise → this device only. The UI is
 * identical either way; only the repository behind it changes.
 */
export default function PersistenceGate({ children }: { children: ReactNode }) {
  const { userId, session } = useAuth()
  const accountEmail = session?.user.email ?? null

  /*
   * What this device already holds, read before we hand over to the account.
   *
   * The Supabase repository has always taken this so a first sign-in adopts
   * work done while signed out, but nothing ever passed it, so the parameter
   * was dead and the adoption never happened: signing in seeded an empty row
   * and a profile entered on a phone never reached the laptop.
   */
  const [localState, setLocalState] = useState<StudentState | null>(null)

  useEffect(() => {
    let cancelled = false
    void new LocalStorageStudentRepository().load().then((state) => {
      if (!cancelled) setLocalState(state)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const repository = useMemo(() => {
    if (supabase && userId) {
      return new SupabaseStudentRepository(supabase, userId, localState ?? undefined, accountEmail)
    }
    return new LocalStorageStudentRepository()
  }, [userId, localState, accountEmail])

  // Wait for the device's own copy before deciding, so the account is never
  // seeded from a blank state that a moment later turns out to have content.
  if (userId && localState === null) return null

  /*
   * Remounting on identity change prevents one student's state leaking into
   * the next session on a shared device. The key deliberately excludes
   * localState: it settles once, and remounting again on that would discard
   * whatever had been loaded from the account in between.
   */
  return (
    <StudentProvider key={userId ?? 'local'} repository={repository}>
      {children}
    </StudentProvider>
  )
}
