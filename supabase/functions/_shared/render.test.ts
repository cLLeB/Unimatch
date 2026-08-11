import { describe, expect, it } from 'vitest'
import { renderReminder } from './render.ts'
import type { SelectedDeadline } from './selection.ts'

const UNSUBSCRIBE = 'https://p.supabase.co/functions/v1/unsubscribe?u=abc&t=xyz'

function deadline(overrides: Partial<SelectedDeadline> = {}): SelectedDeadline {
  return {
    id: 'ug-dated',
    universityName: 'UG',
    scope: 'Diploma to Degree',
    closesOn: '2026-08-21',
    daysLeft: 13,
    sourceUrl: 'https://admissions.ug.edu.gh/deadlines',
    ...overrides,
  }
}

describe('subject line', () => {
  it('names the university and the countdown when something closes within a week', () => {
    const { subject } = renderReminder('Ama', [deadline({ daysLeft: 5 })], UNSUBSCRIBE)
    expect(subject).toBe('UG closes in 5 days')
  })

  it('counts the deadlines when nothing is urgent', () => {
    const { subject } = renderReminder(
      'Ama',
      [deadline({ daysLeft: 13 }), deadline({ id: 'k', daysLeft: 23 })],
      UNSUBSCRIBE,
    )
    expect(subject).toBe('2 application deadlines coming up')
  })

  it('stays singular for one', () => {
    const { subject } = renderReminder('Ama', [deadline({ daysLeft: 13 })], UNSUBSCRIBE)
    expect(subject).toBe('1 application deadline coming up')
  })

  it('does not crash on an empty list, even though the job never sends one', () => {
    expect(renderReminder('Ama', [], UNSUBSCRIBE).subject).toBe('Your UniMatch deadline summary')
  })
})

describe('greeting', () => {
  it('uses the first name only', () => {
    const { text } = renderReminder('Ama Serwaa Boateng', [deadline()], UNSUBSCRIBE)
    expect(text.startsWith('Hi Ama,')).toBe(true)
  })

  it('falls back to a bare greeting when no name is stored', () => {
    expect(renderReminder('', [deadline()], UNSUBSCRIBE).text.startsWith('Hi,')).toBe(true)
  })

  it('treats a whitespace-only name as no name', () => {
    expect(renderReminder('   ', [deadline()], UNSUBSCRIBE).text.startsWith('Hi,')).toBe(true)
  })
})

describe('countdown wording', () => {
  it('says closes today at zero rather than "0 days left"', () => {
    const { text } = renderReminder('Ama', [deadline({ daysLeft: 0 })], UNSUBSCRIBE)
    expect(text).toContain('closes today')
  })

  it('is singular at one', () => {
    const { text } = renderReminder('Ama', [deadline({ daysLeft: 1 })], UNSUBSCRIBE)
    expect(text).toContain('1 day left')
    expect(text).not.toContain('1 days left')
  })

  it('is plural above one', () => {
    const { text } = renderReminder('Ama', [deadline({ daysLeft: 13 })], UNSUBSCRIBE)
    expect(text).toContain('13 days left')
  })
})

describe('content', () => {
  it('formats the date the way a Ghanaian student reads it', () => {
    const { html, text } = renderReminder('Ama', [deadline()], UNSUBSCRIBE)
    expect(text).toContain('21 August 2026')
    expect(html).toContain('21 August 2026')
  })

  it('links to the university portal, not to UniMatch', () => {
    const { html, text } = renderReminder('Ama', [deadline()], UNSUBSCRIBE)
    expect(html).toContain('https://admissions.ug.edu.gh/deadlines')
    expect(text).toContain('https://admissions.ug.edu.gh/deadlines')
  })

  it('tells the reader to confirm on the portal rather than trusting the mail', () => {
    const { html, text } = renderReminder('Ama', [deadline()], UNSUBSCRIBE)
    expect(html.toLowerCase()).toContain('confirm on the')
    expect(text.toLowerCase()).toContain('confirm on the portal')
  })

  it('carries the unsubscribe link in both the HTML and the text alternative', () => {
    const { html, text } = renderReminder('Ama', [deadline()], UNSUBSCRIBE)
    // HTML-escaped in the markup: & becomes &amp; inside href, which is
    // correct and which every mail client resolves back to the same URL.
    expect(html).toContain(UNSUBSCRIBE.replace(/&/g, '&amp;'))
    expect(text).toContain(UNSUBSCRIBE)
  })

  it('lists every deadline it was given', () => {
    const { text } = renderReminder(
      'Ama',
      [deadline(), deadline({ id: 'k', universityName: 'KNUST', scope: 'Undergraduate' })],
      UNSUBSCRIBE,
    )
    expect(text).toContain('UG')
    expect(text).toContain('KNUST')
    expect(text).toContain('Undergraduate')
  })
})

describe('escaping', () => {
  it('escapes a name so a stored value cannot inject markup into the mail', () => {
    const { html } = renderReminder('<script>alert(1)</script>', [deadline()], UNSUBSCRIBE)
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('escapes a scope coming from catalogue data', () => {
    const { html } = renderReminder(
      'Ama',
      [deadline({ scope: 'Arts & "Design" <b>' })],
      UNSUBSCRIBE,
    )
    expect(html).toContain('&amp;')
    expect(html).toContain('&quot;')
    expect(html).toContain('&lt;b&gt;')
  })

  it('escapes the university name', () => {
    const { html } = renderReminder('Ama', [deadline({ universityName: 'A<b>B' })], UNSUBSCRIBE)
    expect(html).not.toContain('A<b>B')
  })
})
