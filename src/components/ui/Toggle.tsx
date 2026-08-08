import { cn } from '../../lib/cn'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  /** Accessible name, required, since the control has no visible label. */
  label: string
  disabled?: boolean
}

export default function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-5 w-10 shrink-0 rounded-full transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        // The off track has to be visible on a white card, not just on a dark
        // one: slate-300 was 1.4:1 against the surface and read as nothing at
        // all in light mode. slate-500 clears 3:1 in both themes, and keeps the
        // white knob legible against the track it sits on.
        checked ? 'bg-brand' : 'bg-slate-500',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-4 rounded-full bg-white shadow transition-all',
          checked ? 'left-5' : 'left-0.5',
        )}
      />
    </button>
  )
}
