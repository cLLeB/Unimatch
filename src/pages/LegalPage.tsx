import { useLocation } from 'react-router-dom'
import { catalogueStats } from '../data/catalogue'
import { isSupabaseConfigured } from '../lib/supabase'

function Privacy() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-ink">Privacy</h1>
      <p className="mb-8 text-sm text-ink-muted">How UniMatch Ghana handles your information.</p>

      <section className="space-y-6 text-sm leading-relaxed text-ink-muted">
        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">Your grades stay with you</h2>
          <p>
            When you enter your WASSCE grades, they are stored in your own browser and matching is
            computed on your device. Without an account, they are never sent to us or to anyone
            else.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">If you create an account</h2>
          <p>
            {isSupabaseConfigured
              ? 'Signing in stores your grades, shortlist and preferences against your account so they follow you between devices. Only you can read them, access is enforced at the database level, not just in the app. Deleting your account deletes that record.'
              : 'Accounts are not enabled on this deployment, so there is nothing stored on a server at all.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">What we do not do</h2>
          <p>
            We do not sell your data, share it with universities or agents, or use it for
            advertising. We do not ask for your index number, and you should never give it to a
            site that does.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">Clearing your data</h2>
          <p>
            Log Out on the Profile page erases everything UniMatch holds about you on this device,
            and your account record if you have one.
          </p>
        </div>
      </section>
    </>
  )
}

function Terms() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-ink">Terms of use</h1>
      <p className="mb-8 text-sm text-ink-muted">Please read this before relying on our figures.</p>

      <section className="space-y-6 text-sm leading-relaxed text-ink-muted">
        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">
            UniMatch is a guide, not an admissions decision
          </h2>
          <p>
            Only a university can admit you. We show what published cut-off points suggest, but
            admission depends on your competition in a given year, quotas, interviews and
            requirements that change. Always confirm on the university&apos;s own portal before you
            apply or pay a fee.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">Where our numbers come from</h2>
          <p>
            Every figure shows its source and the date it was last checked, and there are only two
            kinds. &ldquo;Confirmed&rdquo; means it comes from the university&apos;s own published
            list: {catalogueStats.authoritativeCount} of {catalogueStats.programmeCount} programmes.
            &ldquo;Published&rdquo; means it comes from an admissions source with a long track
            record, which we name. Anything we cannot place in one of those two is not shown at all
            rather than shown with a warning attached.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">
            Cut-offs and entry requirements
          </h2>
          <p>
            These are different numbers. A cut-off is the aggregate of the last student admitted in
            a cycle and moves year to year. An entry requirement is the aggregate that makes you
            eligible to apply at all. Universities that publish no per-programme cut-off list are
            labelled &ldquo;Entry requirement&rdquo;, never dressed up as a cut-off.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">Fees</h2>
          <p>
            Fees are shown as the band a university publishes for a college or category, for a
            stated academic year, because that is how they are published. Confirm the exact figure
            for your programme before you pay anything.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-ink">Coverage</h2>
          <p>
            We currently hold {catalogueStats.programmeCount} programmes across{' '}
            {catalogueStats.universityCount} institutions. That is not every programme at every
            Ghanaian university, and a programme missing from UniMatch does not mean it does not
            exist.
          </p>
        </div>
      </section>
    </>
  )
}

export default function LegalPage() {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {pathname === '/terms' ? <Terms /> : <Privacy />}
    </div>
  )
}
