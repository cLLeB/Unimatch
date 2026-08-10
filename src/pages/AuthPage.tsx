import { CheckCircle, Mail, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button, { LinkButton } from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../state/AuthProvider'

/**
 * Accounts are optional and additive: they sync a shortlist between devices.
 * Everything works signed out, so this page never blocks the product.
 */
export default function AuthPage() {
  const { enabled, signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return

    setStatus('sending')
    setError(null)

    const { error: signInError } = await signInWithEmail(email.trim())
    if (signInError) {
      setError(signInError)
      setStatus('idle')
      return
    }
    setStatus('sent')
  }

  if (!enabled) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <Card className="p-8 text-center">
          <ShieldCheck size={32} className="mx-auto mb-4 text-brand" aria-hidden="true" />
          <h1 className="mb-2 text-2xl font-bold text-ink">No account needed</h1>
          <p className="mb-6 text-sm leading-relaxed text-ink-muted">
            This deployment stores everything on your own device, so there is nothing to sign in
            to. Your grades never leave this browser.
          </p>
          <LinkButton to="/eligibility" fullWidth>
            Check my eligibility
          </LinkButton>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-8">
        {status === 'sent' ? (
          <div className="text-center">
            <CheckCircle size={32} className="mx-auto mb-4 text-success" aria-hidden="true" />
            <h1 className="mb-2 text-2xl font-bold text-ink">Check your email</h1>
            <p className="text-sm leading-relaxed text-ink-muted">
              We sent a sign-in link to <span className="font-medium text-ink">{email}</span>. Open
              it on this device and you&apos;ll be signed in, no password to remember.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm text-brand underline underline-offset-2"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-fill">
                <Mail size={22} className="text-on-brand-fill" aria-hidden="true" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-ink">Save your shortlist</h1>
              <p className="text-sm leading-relaxed text-ink-muted">
                Sign in to keep your grades and saved programmes across devices. We&apos;ll email
                you a one-time link, there is no password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="auth-email" className="mb-1 block text-sm font-medium text-ink">
                  Email address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-danger">
                  {error}
                </p>
              )}

              <Button type="submit" fullWidth disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending link…' : 'Email me a sign-in link'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-ink-muted">
              You can keep using UniMatch without an account, {' '}
              <Link to="/eligibility" className="text-brand underline underline-offset-2">
                just enter your grades
              </Link>
              .
            </p>
          </>
        )}
      </Card>
    </div>
  )
}
