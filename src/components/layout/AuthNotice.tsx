import { AlertCircle, CheckCircle, X } from 'lucide-react'
import { useAuth } from '../../state/AuthProvider'

/**
 * Says out loud whether a sign-in link worked.
 *
 * Without this the only feedback was the navbar quietly swapping "Log in" for
 * a profile chip, which a student has no reason to be looking at. A failed
 * link said nothing at all.
 */
export default function AuthNotice() {
  const { notice, dismissNotice } = useAuth()
  if (!notice) return null

  const signedIn = notice.kind === 'signed-in'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 px-4 py-3 text-sm sm:px-6 ${
        signedIn ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
      }`}
    >
      {signedIn ? (
        <CheckCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}

      <p className="flex-1">
        {signedIn
          ? "You're signed in. Your grades and shortlist will now follow you to any device."
          : notice.message}
      </p>

      <button
        type="button"
        onClick={dismissNotice}
        aria-label="Dismiss"
        className="shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
