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

/**
 * Every channel starts off. Email defaulted to true while no job existed to
 * send it, which opted every student in to a Monday summary that could never
 * arrive. Nothing is on here until something can act on it.
 */
export const DEFAULT_REMINDERS: ReminderPreferences = {
  sms: false,
  email: false,
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

/**
 * Whether there is an address the weekly reminder could actually reach.
 *
 * The job in supabase/functions/send-deadline-reminders sends to whatever is
 * on the profile, so without one an "on" switch is a promise the app cannot
 * keep. The pattern is the deliberately loose one: enough to catch a blank
 * field or a typed name, not enough to argue with a real address.
 */
export function canEmail(profile: StudentProfile): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())
}

/**
 * Maximum programmes that can be compared side by side.
 *
 * Four, not the three the prototype used, because the number a student needs
 * is set by the form they are filling in rather than by what fits a screen.
 * Legon asks for "up to four (4) subject bouquets ... in order of preference"
 * and refers to first, second and third choices throughout. At three you can
 * compare exactly the choices you would rank and never weigh a fourth
 * candidate against them, which is the thing a shortlist is for.
 *
 * Four is also where the grid stops being readable: a fifth column leaves each
 * one too narrow to hold a programme name on a phone.
 */
export const MAX_COMPARE = 4

export const MAX_SEARCH_HISTORY = 8
