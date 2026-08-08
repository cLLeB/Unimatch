import type { Session } from '@supabase/supabase-js'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { readAuthFragment, type AuthNotice } from './authFragment'

interface AuthContextValue {
  /** False when no Supabase credentials are set; the app runs device-local. */
  enabled: boolean
  session: Session | null
  userId: string | null
  loading: boolean
  /** What just happened on returning from a sign-in link, if anything. */
  notice: AuthNotice | null
  dismissNotice: () => void
  /** Sends a one-time sign-in link. No passwords to leak or reset. */
  signInWithEmail: (email: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  /*
   * Read the fragment once, before anything can strip it, so we can tell the
   * student whether their link worked. Supabase itself consumes the fragment
   * asynchronously, and leaving it in the address bar means a refresh or a
   * shared URL carries a live token.
   */
  const [notice, setNotice] = useState<AuthNotice | null>(() =>
    typeof window === 'undefined' ? null : readAuthFragment(window.location.hash),
  )

  useEffect(() => {
    if (!notice || typeof window === 'undefined') return
    const { pathname, search } = window.location
    window.history.replaceState(null, '', `${pathname}${search}`)
  }, [notice])

  const dismissNotice = useCallback(() => setNotice(null), [])

  useEffect(() => {
    if (!supabase) return

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  const signInWithEmail = useCallback(async (email: string) => {
    if (!supabase) return { error: 'Accounts are not enabled on this deployment.' }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      enabled: isSupabaseConfigured,
      session,
      userId: session?.user.id ?? null,
      loading,
      notice,
      dismissNotice,
      signInWithEmail,
      signOut,
    }),
    [session, loading, notice, dismissNotice, signInWithEmail, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>')
  }
  return context
}
