import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * The last line of defence against a white screen.
 *
 * React unmounts the entire tree when a render or an effect throws, leaving an
 * empty `<div id="root">` and no clue what happened. That is precisely what a
 * student saw when the magic-link fragment reached `querySelector`: the app
 * simply vanished at the moment they signed in.
 *
 * A boundary cannot stop the bug, but it turns "the site is broken" into a
 * message, a way back, and an error in the console worth reporting.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled error', error, info.componentStack)
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
        <h1 className="text-xl font-bold text-ink">Something went wrong on our side</h1>
        <p className="max-w-md text-sm text-ink-muted">
          This is a fault in UniMatch, not in anything you did. Your saved grades and shortlist are
          untouched.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="rounded-xl bg-brand-fill px-4 py-2.5 text-sm font-semibold text-on-brand-fill transition-colors hover:opacity-90"
          >
            Back to home
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            Try again
          </button>
        </div>
        <p className="max-w-md text-xs text-ink-muted">{error.message}</p>
      </div>
    )
  }
}
