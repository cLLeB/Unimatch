import { useMemo, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'
import { LocalStorageStudentRepository } from './repository'
import { StudentProvider } from './StudentProvider'
import { SupabaseStudentRepository } from './supabaseRepository'

/**
 * Chooses where a student's data lives.
 *
 * Signed in with Supabase configured → their account, so a shortlist follows
 * them between phone and laptop. Otherwise → this device only. The UI is
 * identical either way; only the repository behind it changes.
 */
export default function PersistenceGate({ children }: { children: ReactNode }) {
  const { userId } = useAuth()

  const repository = useMemo(() => {
    if (supabase && userId) {
      return new SupabaseStudentRepository(supabase, userId)
    }
    return new LocalStorageStudentRepository()
  }, [userId])

  // Remounting on identity change prevents one student's state leaking into
  // the next session on a shared device.
  return (
    <StudentProvider key={userId ?? 'local'} repository={repository}>
      {children}
    </StudentProvider>
  )
}
