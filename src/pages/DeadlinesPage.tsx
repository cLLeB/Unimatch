import { Calendar, Mail, MessageCircle, Phone } from 'lucide-react'
import { useMemo } from 'react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Toggle from '../components/ui/Toggle'
import { deadlines, getUniversity } from '../data/catalogue'
import type { DeadlineStatus } from '../domain/catalogue/types'
import { formatDeadlineDate, resolveAll } from '../domain/deadlines/status'
import { useStudent } from '../state/StudentProvider'

const STATUS_PRESENTATION: Record<
  DeadlineStatus,
  { label: string; variant: 'success' | 'warning' | 'danger'; bar: string; text: string }
> = {
  open: { label: 'Open', variant: 'success', bar: 'bg-success', text: 'text-success' },
  'closing-soon': { label: 'Closing Soon', variant: 'warning', bar: 'bg-accent', text: 'text-accent' },
  closed: { label: 'Closed', variant: 'danger', bar: 'bg-danger', text: 'text-danger' },
}

/**
 * SMS and WhatsApp need paid providers (Africa's Talking / WhatsApp Business).
 * The controls are built and persist, but are disabled until credentials are
 * provisioned — a toggle that silently does nothing is worse than one that
 * says so.
 */
const CHANNELS = [
  {
    key: 'email' as const,
    label: 'Email Reminders',
    description: 'A deadline summary in your inbox every Monday',
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

  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-bold text-ink">Deadline Tracker</h1>
          <p className="text-sm text-ink-muted">
            Counting down live from today. Always confirm dates on the university&apos;s own portal.
          </p>
        </div>

        <div className="mb-6 flex gap-4 text-sm">
          {(Object.keys(STATUS_PRESENTATION) as DeadlineStatus[]).map((status) => (
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
                      Deadline: {formatDeadlineDate(deadline.closesOn)}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {deadline.daysLeft >= 0 ? (
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
            {CHANNELS.map(({ key, label, description, icon: Icon, available }) => (
              <div key={key} className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-ink">
                      {label}
                      {!available && <Badge variant="neutral">Coming soon</Badge>}
                    </div>
                    <div className="text-xs text-ink-muted">{description}</div>
                  </div>
                </div>
                <Toggle
                  label={label}
                  checked={available && state.reminders[key]}
                  disabled={!available}
                  onChange={(checked) => setReminders({ [key]: checked })}
                />
              </div>
            ))}
          </div>

          <p className="mt-4 border-t border-line pt-4 text-xs text-ink-muted">
            Email reminders need an address on your profile. SMS and WhatsApp require a Ghanaian
            messaging provider, which isn&apos;t connected yet.
          </p>
        </Card>
      </div>
    </div>
  )
}
