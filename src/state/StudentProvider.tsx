import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { computeAggregate } from '../domain/wassce/aggregate'
import type { AggregateResult, StudentResults } from '../domain/wassce/types'
import { LocalStorageStudentRepository, type StudentRepository } from './repository'
import {
  canEmail,
  INITIAL_STATE,
  MAX_COMPARE,
  MAX_SEARCH_HISTORY,
  type ReminderPreferences,
  type StudentProfile,
  type StudentState,
  type ThemeMode,
} from './types'

interface StudentContextValue {
  state: StudentState
  /** True until the persisted state has been read. */
  loading: boolean
  aggregate: AggregateResult | null
  hasResults: boolean
  setResults: (results: StudentResults) => void
  clearResults: () => void
  updateProfile: (patch: Partial<StudentProfile>) => void
  toggleSaved: (programmeId: string) => void
  isSaved: (programmeId: string) => boolean
  toggleCompared: (programmeId: string) => void
  isCompared: (programmeId: string) => boolean
  clearCompared: () => void
  setChecklistItem: (id: string, done: boolean) => void
  recordSearch: (term: string) => void
  clearSearchHistory: () => void
  setReminders: (patch: Partial<ReminderPreferences>) => void
  setTheme: (theme: ThemeMode) => void
  signOut: () => void
}

const StudentContext = createContext<StudentContextValue | null>(null)

/**
 * A reminder with nowhere to arrive is switched off.
 *
 * The weekly job sends to the address on the profile, so email cannot be on
 * without one. This lives here rather than in the Deadlines page because the
 * rule has to survive the other direction too: a student who turns the
 * reminder on and later clears her address should not be left holding a
 * switch that quietly does nothing.
 *
 * The checklist follows from the reminders, so it is recomputed here as well
 * and never set from a value this function is about to overrule.
 */
function reconcileReminders(state: StudentState): StudentState {
  const reminders =
    state.reminders.email && !canEmail(state.profile)
      ? { ...state.reminders, email: false }
      : state.reminders
  const anyOn = reminders.sms || reminders.email || reminders.whatsapp

  return {
    ...state,
    reminders,
    checklist: { ...state.checklist, 'set-reminders': anyOn },
  }
}

interface StudentProviderProps {
  children: ReactNode
  /** Injected in tests; defaults to device-local storage. */
  repository?: StudentRepository
}

export function StudentProvider({ children, repository }: StudentProviderProps) {
  const repo = useMemo(() => repository ?? new LocalStorageStudentRepository(), [repository])
  const [state, setState] = useState<StudentState>(INITIAL_STATE)
  const [loading, setLoading] = useState(true)
  const hydrated = useRef(false)

  useEffect(() => {
    let cancelled = false

    /*
     * Cleared before the load starts, not after it finishes.
     *
     * When the repository is swapped underneath us, on sign-in, the save
     * effect below re-runs in the same commit. If this were still true from
     * the previous repository, it would write the state we are holding into
     * the new one and race the load, blanking an account with whatever the
     * screen happened to have.
     */
    hydrated.current = false
    setLoading(true)

    void repo.load().then((loaded) => {
      if (cancelled) return
      setState(loaded)
      setLoading(false)
      hydrated.current = true
    })
    return () => {
      cancelled = true
    }
  }, [repo])

  // Persist after hydration only, so the initial empty state never overwrites
  // a returning student's saved data.
  useEffect(() => {
    if (!hydrated.current) return
    void repo.save(state)
  }, [repo, state])

  // Reflect the theme on <html> so Tailwind's dark variant applies.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  const patch = useCallback((update: Partial<StudentState>) => {
    setState((current) => ({ ...current, ...update }))
  }, [])

  const setResults = useCallback(
    (results: StudentResults) => {
      setState((current) => ({
        ...current,
        results,
        checklist: { ...current.checklist, 'enter-grades': true },
      }))
    },
    [],
  )

  const clearResults = useCallback(() => patch({ results: null }), [patch])

  const updateProfile = useCallback(
    (update: Partial<StudentProfile>) =>
      setState((current) =>
        reconcileReminders({ ...current, profile: { ...current.profile, ...update } }),
      ),
    [],
  )

  const toggleSaved = useCallback((programmeId: string) => {
    setState((current) => {
      const saved = current.savedProgrammeIds.includes(programmeId)
        ? current.savedProgrammeIds.filter((id) => id !== programmeId)
        : [...current.savedProgrammeIds, programmeId]
      return {
        ...current,
        savedProgrammeIds: saved,
        checklist: { ...current.checklist, 'save-top-5': saved.length >= 5 },
      }
    })
  }, [])

  const toggleCompared = useCallback((programmeId: string) => {
    setState((current) => {
      const already = current.comparedProgrammeIds.includes(programmeId)
      if (!already && current.comparedProgrammeIds.length >= MAX_COMPARE) return current
      const compared = already
        ? current.comparedProgrammeIds.filter((id) => id !== programmeId)
        : [...current.comparedProgrammeIds, programmeId]
      return {
        ...current,
        comparedProgrammeIds: compared,
        checklist: { ...current.checklist, compare: compared.length >= 2 },
      }
    })
  }, [])

  const clearCompared = useCallback(() => patch({ comparedProgrammeIds: [] }), [patch])

  const setChecklistItem = useCallback((id: string, done: boolean) => {
    setState((current) => ({ ...current, checklist: { ...current.checklist, [id]: done } }))
  }, [])

  const recordSearch = useCallback((term: string) => {
    const trimmed = term.trim()
    if (!trimmed) return
    setState((current) => ({
      ...current,
      searchHistory: [trimmed, ...current.searchHistory.filter((t) => t !== trimmed)].slice(
        0,
        MAX_SEARCH_HISTORY,
      ),
    }))
  }, [])

  const clearSearchHistory = useCallback(() => patch({ searchHistory: [] }), [patch])

  const setReminders = useCallback((update: Partial<ReminderPreferences>) => {
    setState((current) =>
      reconcileReminders({ ...current, reminders: { ...current.reminders, ...update } }),
    )
  }, [])

  const setTheme = useCallback((theme: ThemeMode) => patch({ theme }), [patch])

  const signOut = useCallback(() => {
    void repo.clear()
    setState(INITIAL_STATE)
  }, [repo])

  const aggregate = useMemo(
    () => (state.results ? computeAggregate(state.results) : null),
    [state.results],
  )

  const value = useMemo<StudentContextValue>(
    () => ({
      state,
      loading,
      aggregate,
      hasResults: Boolean(aggregate?.complete),
      setResults,
      clearResults,
      updateProfile,
      toggleSaved,
      isSaved: (id) => state.savedProgrammeIds.includes(id),
      toggleCompared,
      isCompared: (id) => state.comparedProgrammeIds.includes(id),
      clearCompared,
      setChecklistItem,
      recordSearch,
      clearSearchHistory,
      setReminders,
      setTheme,
      signOut,
    }),
    [
      state,
      loading,
      aggregate,
      setResults,
      clearResults,
      updateProfile,
      toggleSaved,
      toggleCompared,
      clearCompared,
      setChecklistItem,
      recordSearch,
      clearSearchHistory,
      setReminders,
      setTheme,
      signOut,
    ],
  )

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

export function useStudent(): StudentContextValue {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudent must be used inside a <StudentProvider>')
  }
  return context
}
