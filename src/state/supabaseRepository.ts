import type { SupabaseClient } from '@supabase/supabase-js'
import type { StudentResults } from '../domain/wassce/types'
import type { StudentRepository } from './repository'
import { INITIAL_STATE, type ReminderPreferences, type StudentState, type ThemeMode } from './types'

interface StudentStateRow {
  user_id: string
  name: string
  email: string
  school: string
  track: string
  results: StudentResults | null
  saved_programme_ids: string[]
  compared_programme_ids: string[]
  checklist: Record<string, boolean>
  search_history: string[]
  reminders: ReminderPreferences
  theme: ThemeMode
}

function toState(row: StudentStateRow): StudentState {
  return {
    profile: {
      name: row.name ?? '',
      email: row.email ?? '',
      school: row.school ?? '',
      track: row.track ?? '',
    },
    results: row.results ?? null,
    savedProgrammeIds: row.saved_programme_ids ?? [],
    comparedProgrammeIds: row.compared_programme_ids ?? [],
    checklist: row.checklist ?? {},
    searchHistory: row.search_history ?? [],
    reminders: { ...INITIAL_STATE.reminders, ...(row.reminders ?? {}) },
    theme: row.theme === 'dark' ? 'dark' : 'light',
  }
}

function toRow(userId: string, state: StudentState): StudentStateRow {
  return {
    user_id: userId,
    name: state.profile.name,
    email: state.profile.email,
    school: state.profile.school,
    track: state.profile.track,
    results: state.results,
    saved_programme_ids: state.savedProgrammeIds,
    compared_programme_ids: state.comparedProgrammeIds,
    checklist: state.checklist,
    search_history: state.searchHistory,
    reminders: state.reminders,
    theme: state.theme,
  }
}

/**
 * Account-backed persistence.
 *
 * Same interface as the localStorage implementation, so switching from
 * device-local storage to real accounts changes no UI code — the provider is
 * handed a different repository and nothing else moves.
 */
export class SupabaseStudentRepository implements StudentRepository {
  constructor(
    private readonly client: SupabaseClient,
    private readonly userId: string,
    /** Merged in on first sync so a signed-out session isn't lost at login. */
    private readonly localState?: StudentState,
  ) {}

  async load(): Promise<StudentState> {
    const { data, error } = await this.client
      .from('student_state')
      .select('*')
      .eq('user_id', this.userId)
      .maybeSingle<StudentStateRow>()

    if (error) {
      // Never lose a student's session to a transient network failure; fall
      // back to whatever we already had in memory.
      console.error('Failed to load student state', error.message)
      return this.localState ?? INITIAL_STATE
    }

    if (!data) {
      // First sign-in: adopt whatever the student built while signed out.
      const seed = this.localState ?? INITIAL_STATE
      await this.save(seed)
      return seed
    }

    return toState(data)
  }

  async save(state: StudentState): Promise<void> {
    const { error } = await this.client
      .from('student_state')
      .upsert(toRow(this.userId, state), { onConflict: 'user_id' })

    if (error) {
      console.error('Failed to save student state', error.message)
    }
  }

  async clear(): Promise<void> {
    const { error } = await this.client
      .from('student_state')
      .delete()
      .eq('user_id', this.userId)

    if (error) {
      console.error('Failed to clear student state', error.message)
    }
  }
}
