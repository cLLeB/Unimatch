import type { StudentResults } from '../domain/wassce/types'

export interface StudentProfile {
  name: string
  email: string
  school: string
  track: string
}

export interface ReminderPreferences {
  sms: boolean
  email: boolean
  whatsapp: boolean
}

export type ThemeMode = 'light' | 'dark'

/** Everything the app persists about one student. */
export interface StudentState {
  profile: StudentProfile
  results: StudentResults | null
  savedProgrammeIds: string[]
  comparedProgrammeIds: string[]
  /** Checklist item id → completed. Derived items are computed, not stored. */
  checklist: Record<string, boolean>
  searchHistory: string[]
  reminders: ReminderPreferences
  theme: ThemeMode
}

export const EMPTY_PROFILE: StudentProfile = {
  name: '',
  email: '',
  school: '',
  track: '',
}

export const DEFAULT_REMINDERS: ReminderPreferences = {
  sms: false,
  email: true,
  whatsapp: false,
}

export const INITIAL_STATE: StudentState = {
  profile: EMPTY_PROFILE,
  results: null,
  savedProgrammeIds: [],
  comparedProgrammeIds: [],
  checklist: {},
  searchHistory: [],
  reminders: DEFAULT_REMINDERS,
  theme: 'light',
}

/**
 * Whether a student has actually put anything into this state.
 *
 * Theme and reminder defaults do not count: they are set for every visitor
 * whether or not they have done a thing. This is what decides, on first
 * sign-in, whether the work done on this device is worth pushing up to the
 * account or whether the account's copy should win.
 */
export function hasContent(state: StudentState): boolean {
  return (
    state.results !== null ||
    state.savedProgrammeIds.length > 0 ||
    state.comparedProgrammeIds.length > 0 ||
    state.searchHistory.length > 0 ||
    Object.values(state.checklist).some(Boolean) ||
    Object.values(state.profile).some((value) => value.trim() !== '')
  )
}

/** Maximum programmes that can be compared side by side, per the design. */
export const MAX_COMPARE = 3

export const MAX_SEARCH_HISTORY = 8
