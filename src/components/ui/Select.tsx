import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { cn } from '../../lib/cn'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: readonly (string | SelectOption)[]
  placeholder?: string
  /** Accessible name when there is no visible <label>. */
  ariaLabel?: string
  id?: string
  invalid?: boolean
  className?: string
  disabled?: boolean
}

function normalise(option: string | SelectOption): SelectOption {
  return typeof option === 'string' ? { value: option, label: option } : option
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  id,
  invalid = false,
  className,
  disabled = false,
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className={cn('relative', className)}>
      <select
        id={selectId}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full appearance-none rounded-xl border bg-surface px-4 py-2.5 pr-9 text-sm text-ink transition-all',
          'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40',
          'disabled:cursor-not-allowed disabled:opacity-60',
          invalid ? 'border-danger' : 'border-line',
        )}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((option) => {
          const { value: optionValue, label } = normalise(option)
          return (
            <option key={optionValue} value={optionValue}>
              {label}
            </option>
          )
        })}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  )
}
