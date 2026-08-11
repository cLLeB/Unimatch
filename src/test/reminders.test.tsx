import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EMPTY_PROFILE } from '../state/types'
import { renderApp } from './renderApp'

/**
 * Email reminders cannot be switched on without an address.
 *
 * The weekly job sends to whatever is on the profile, so a switch turned on by
 * a student who has never typed an email is a promise the app cannot keep. It
 * has to hold in both directions: the switch is unavailable until there is an
 * address, and it goes back off if the address is later removed.
 */

const WITH_EMAIL = {
  profile: { ...EMPTY_PROFILE, name: 'Ama Mensah', email: 'ama@example.com' },
}

const LAZY = { timeout: 10_000 }

describe('email reminders', () => {
  it('cannot be switched on when the profile carries no address', async () => {
    renderApp('/deadlines')

    const toggle = await screen.findByRole('switch', { name: /email reminders/i }, LAZY)
    expect(toggle).toBeDisabled()
    expect(screen.getByRole('link', { name: /add your email address/i })).toBeInTheDocument()
  })

  it('can be switched on once there is an address', async () => {
    const { user, repository } = renderApp('/deadlines', { state: WITH_EMAIL })

    const toggle = await screen.findByRole('switch', { name: /email reminders/i }, LAZY)
    expect(toggle).toBeEnabled()
    expect(screen.queryByRole('link', { name: /add your email address/i })).not.toBeInTheDocument()

    await user.click(toggle)

    await waitFor(async () => {
      expect((await repository.load()).reminders.email).toBe(true)
    })
  })

  it('goes back off when the address is removed', async () => {
    const { user, repository } = renderApp('/profile', {
      state: { ...WITH_EMAIL, reminders: { sms: false, email: true, whatsapp: false } },
    })

    await user.click(await screen.findByRole('button', { name: /edit profile/i }, LAZY))
    await user.clear(screen.getByLabelText(/^email$/i))

    await waitFor(async () => {
      const saved = await repository.load()
      expect(saved.profile.email).toBe('')
      expect(saved.reminders.email).toBe(false)
    })
  })
})
