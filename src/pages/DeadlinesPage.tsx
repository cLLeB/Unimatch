import { Calendar, Mail, MessageCircle, Phone } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Toggle from '../components/ui/Toggle'
import { deadlines, getUniversity } from '../data/catalogue'
import type { DeadlineStatus } from '../domain/catalogue/types'
import { formatDeadlineDate, resolveAll } from '../domain/deadlines/status'
import { useStudent } from '../state/StudentProvider'
import { canEmail } from '../state/types'

const STATUS_PRESENTATION: Record<
  DeadlineStatus,
  { label: string; variant: 'success' | 'warning' | 'danger'; bar: string; text: string }
> = {
  open: { label: 'Open', variant: 'success', bar: 'bg-success', text: 'text-success' },
  'closing-soon': { label: 'Closing Soon', variant: 'warning', bar: 'bg-accent', text: 'text-accent' },
  closed: { label: 'Closed', variant: 'danger', bar: 'bg-danger', text: 'text-danger' },
  'open-ended': { label: 'Open', variant: 'success', bar: 'bg-success', text: 'text-success' },
}

/** The legend describes the dated states; "open-ended" reuses the Open dot. */
const LEGEND_STATUSES: DeadlineStatus[] = ['open', 'closing-soon', 'closed']

/**
 * Email is connected: supabase/functions/send-deadline-reminders runs weekly on
 * pg_cron and sends through Resend. SMS and WhatsApp still need paid providers
 * (Africa's Talking / WhatsApp Business) and stay disabled until they exist. A
 * toggle that silently does nothing is worse than one that says so.
 *
 * Email is only offered once the profile carries an address, for the same
 * reason. Until then the row explains itself and points at the Profile page,
 * instead of accepting a switch nothing would act on.
 *
 * The email description says "universities you've saved" because that is what
 * the job actually does: a student who has shortlisted nothing is skipped
 * rather than sent a generic list. The copy has to match the behaviour.
 */
const CHANNELS = [
  {
    key: 'email' as const,
    label: 'Email Reminders',
    description: "Monday summary of deadlines at universities you've saved",
    icon: Mail,
    available: true,
  },
  {
    key: 'sms' as const,
    label: 'SMS Reminders',
    description: 'Texts 7 days and 1 day before each deadline',
    icon: Phone,
    available: false,
  },
  {
    key: 'whatsapp' as const,
    label: 'WhatsApp Reminders',
    description: 'Instant WhatsApp alerts for closing deadlines',
    icon: MessageCircle,
    available: false,
  },
]

export default function DeadlinesPage() {
  const { state, setReminders } = useStudent()
  const resolved = useMemo(() => resolveAll(deadlines), [])
  const emailReady = canEmail(state.profile)

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="mb-1 text-xl font-bold text-ink sm:text-2xl">Deadline Tracker</h1>
          <p className="text-sm text-ink-muted">
            Counting down live from today. Every date here is one a university has published, so the
            list is short by design. Always confirm on the university&apos;s own portal before you
            apply.
          </p>
        </div>

        <div className="mb-6 flex gap-4 text-sm">
          {LEGEND_STATUSES.map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className={`size-2.5 rounded-full ${STATUS_PRESENTATION[status].bar}`} />
              <span className="text-ink-muted">{STATUS_PRESENTATION[status].label}</span>
            </div>
          ))}
        </div>

        <div className="mb-8 space-y-3">
          {resolved.map((deadline) => {
            const presentation = STATUS_PRESENTATION[deadline.status]
            const university = getUniversity(deadline.universityId)

            return (
              <Card key={deadline.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-1 shrink-0 rounded-full ${presentation.bar}`} />

                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-ink">
                        {university?.shortName ?? deadline.universityId}
                      </span>
                      <Badge variant={presentation.variant}>{presentation.label}</Badge>
                    </div>
                    <div className="text-xs text-ink-muted">{deadline.scope}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                      <Calendar size={11} aria-hidden="true" />
                      {deadline.closesOn
                        ? `Deadline: ${formatDeadlineDate(deadline.closesOn)}`
                        : deadline.closesWhen}
                    </div>
                    {/*
                      * "Check the university portal" has to go to the
                      * university, so it is driven by the university's own
                      * verified admissions URL and never by the provenance
                      * link. Those are different things: this one is a place
                      * we are sending a student to act, and it previously
                      * pointed at a news article about KNUST rather than at
                      * KNUST. Where the citation is worth reading, it is
                      * offered separately and labelled as a source.
                      */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {university?.admissionsUrl && (
                        <a
                          href={university.admissionsUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-block text-xs font-medium text-brand hover:underline"
                        >
                          Check the {university.shortName} portal
                        </a>
                      )}
                      {deadline.provenance.sourceUrl && (
                        <a
                          href={deadline.provenance.sourceUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-block text-xs text-ink-muted hover:underline"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {deadline.status === 'open-ended' ? (
                      <div className="text-sm font-semibold text-success">Open</div>
                    ) : deadline.daysLeft >= 0 ? (
                      <>
                        <div className={`text-2xl font-bold ${presentation.text}`}>
                          {deadline.daysLeft}
                        </div>
                        <div className="text-xs text-ink-muted">
                          {deadline.daysLeft === 1 ? 'day left' : 'days left'}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm font-semibold text-danger">Expired</div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-5">
          <h2 className="mb-4 font-semibold text-ink">Reminder Settings</h2>
          <div className="space-y-4">
            {CHANNELS.map(({ key, label, description, icon: Icon, available }) => {
              // Built, but with no address to send to: a third state, and not
              // the same as "coming soon". This one the student can fix.
              const needsEmail = available && key === 'email' && !emailReady
              const usable = available && !needsEmail

              return (
                <div key={key} className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                        {label}
                        {!available && <Badge variant="neutral">Coming soon</Badge>}
                        {needsEmail && <Badge variant="warning">No email yet</Badge>}
                      </div>
                      <div className="text-xs text-ink-muted">{description}</div>
                      {needsEmail && (
                        <Link
                          to="/profile"
                          className="text-xs font-medium text-brand hover:underline"
                        >
                          Add your email address
                        </Link>
                      )}
                    </div>
                  </div>
                  <Toggle
                    label={label}
                    checked={usable && state.reminders[key]}
                    disabled={!usable}
                    onChange={(checked) => setReminders({ [key]: checked })}
                  />
                </div>
              )
            })}
          </div>

          <p className="mt-4 border-t border-line pt-4 text-xs text-ink-muted">
            Email reminders go to the address on your profile, and only cover universities you
            have saved a programme at. Every email has an unsubscribe link. A reminder is a
            convenience, not a guarantee, so check the university&apos;s own portal too.
          </p>
        </Card>
      </div>
    </div>
  )
}
