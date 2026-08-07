import { INITIAL_STATE, type StudentState } from './types'

/**
 * Persistence boundary.
 *
 * The app depends on this interface, never on localStorage or Supabase
 * directly, so moving from device-local storage to real accounts is a change
 * of implementation rather than a rewrite of the UI.
 */
export interface StudentRepository {
  load(): Promise<StudentState>
  save(state: StudentState): Promise<void>
  clear(): Promise<void>
}

const STORAGE_KEY = 'unimatch:student:v1'

/**
 * Merge a persisted blob into the current shape, so a state added in a later
 * release doesn't break a student whose stored data predates it.
 */
function reconcile(stored: unknown): StudentState {
  if (!stored || typeof stored !== 'object') {
    return { ...INITIAL_STATE, theme: prefersDarkScheme() ? 'dark' : 'light' }
  }
  const raw = stored as Partial<StudentState>

  return {
    profile: { ...INITIAL_STATE.profile, ...(raw.profile ?? {}) },
    results: raw.results ?? null,
    savedProgrammeIds: Array.isArray(raw.savedProgrammeIds) ? raw.savedProgrammeIds : [],
    comparedProgrammeIds: Array.isArray(raw.comparedProgrammeIds) ? raw.comparedProgrammeIds : [],
    checklist: typeof raw.checklist === 'object' && raw.checklist ? raw.checklist : {},
    searchHistory: Array.isArray(raw.searchHistory) ? raw.searchHistory : [],
    reminders: { ...INITIAL_STATE.reminders, ...(raw.reminders ?? {}) },
    // No stored preference: follow the device. The boot script in index.html
    // applies the same rule before first paint.
    theme: raw.theme ?? (prefersDarkScheme() ? 'dark' : 'light'),
  }
}

function prefersDarkScheme(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export class LocalStorageStudentRepository implements StudentRepository {
  constructor(private readonly key: string = STORAGE_KEY) {}

  async load(): Promise<StudentState> {
    try {
      const raw = localStorage.getItem(this.key)
      if (!raw) return reconcile(null)
      return reconcile(JSON.parse(raw))
    } catch {
      // Corrupt or unavailable storage must never break the app; the student
      // simply starts fresh.
      return INITIAL_STATE
    }
  }

  async save(state: StudentState): Promise<void> {
    try {
      localStorage.setItem(this.key, JSON.stringify(state))
    } catch {
      // Quota exceeded or private mode, the session still works in memory.
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.removeItem(this.key)
    } catch {
      /* ignore */
    }
  }
}

/** Used in tests and by server-rendered contexts with no storage. */
export class InMemoryStudentRepository implements StudentRepository {
  private state: StudentState = INITIAL_STATE

  async load(): Promise<StudentState> {
    return this.state
  }

  async save(state: StudentState): Promise<void> {
    this.state = state
  }

  async clear(): Promise<void> {
    this.state = INITIAL_STATE
  }
}
