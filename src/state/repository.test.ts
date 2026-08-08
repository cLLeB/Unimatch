import { afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryStudentRepository, LocalStorageStudentRepository } from './repository'
import { INITIAL_STATE, type StudentState } from './types'

/**
 * The persistence boundary.
 *
 * Its whole job is to survive things outside its control: a browser in private
 * mode, a quota that is full, and a blob written by an older release. None of
 * those may lose a student's grades or throw on boot.
 */

const KEY = 'unimatch:test'

const populated: StudentState = {
  ...INITIAL_STATE,
  profile: { ...INITIAL_STATE.profile, name: 'Ama Mensah' },
  savedProgrammeIds: ['knust-computer-science'],
  theme: 'dark',
}

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('LocalStorageStudentRepository', () => {
  it('round-trips a state', async () => {
    const repository = new LocalStorageStudentRepository(KEY)
    await repository.save(populated)
    expect(await repository.load()).toEqual(populated)
  })

  it('returns a fresh state when nothing is stored', async () => {
    const repository = new LocalStorageStudentRepository(KEY)
    const state = await repository.load()
    expect(state.results).toBeNull()
    expect(state.savedProgrammeIds).toEqual([])
  })

  it('clears what it wrote', async () => {
    const repository = new LocalStorageStudentRepository(KEY)
    await repository.save(populated)
    await repository.clear()
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('uses its own key, so two repositories do not collide', async () => {
    await new LocalStorageStudentRepository('a').save(populated)
    expect(await new LocalStorageStudentRepository('b').load()).not.toEqual(populated)
  })

  describe('surviving bad input', () => {
    it('starts fresh on a corrupt blob rather than throwing', async () => {
      localStorage.setItem(KEY, '{ not json')
      const state = await new LocalStorageStudentRepository(KEY).load()
      expect(state).toEqual(INITIAL_STATE)
    })

    it('starts fresh when the blob is not an object', async () => {
      localStorage.setItem(KEY, '"a string"')
      const state = await new LocalStorageStudentRepository(KEY).load()
      expect(state.savedProgrammeIds).toEqual([])
    })

    it('swallows a read failure, e.g. storage disabled', async () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError')
      })
      expect(await new LocalStorageStudentRepository(KEY).load()).toEqual(INITIAL_STATE)
    })

    it('swallows a write failure, e.g. quota exceeded', async () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })
      await expect(new LocalStorageStudentRepository(KEY).save(populated)).resolves.toBeUndefined()
    })

    it('swallows a clear failure', async () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError')
      })
      await expect(new LocalStorageStudentRepository(KEY).clear()).resolves.toBeUndefined()
    })
  })

  describe('reconciling a blob from an older release', () => {
    const loadStored = async (stored: object) => {
      localStorage.setItem(KEY, JSON.stringify(stored))
      return new LocalStorageStudentRepository(KEY).load()
    }

    it('fills in fields the stored blob never had', async () => {
      const state = await loadStored({ profile: { name: 'Kofi' } })
      expect(state.profile.name).toBe('Kofi')
      expect(state.reminders).toEqual(INITIAL_STATE.reminders)
      expect(state.checklist).toEqual({})
    })

    it('replaces list fields that are the wrong shape', async () => {
      const state = await loadStored({
        savedProgrammeIds: 'knust-law',
        comparedProgrammeIds: null,
        searchHistory: 42,
      })
      expect(state.savedProgrammeIds).toEqual([])
      expect(state.comparedProgrammeIds).toEqual([])
      expect(state.searchHistory).toEqual([])
    })

    it('replaces a checklist that is not an object', async () => {
      expect((await loadStored({ checklist: null })).checklist).toEqual({})
    })

    it('keeps a stored theme', async () => {
      expect((await loadStored({ theme: 'dark' })).theme).toBe('dark')
    })

    it.each([
      ['dark', true],
      ['light', false],
    ])('follows the device, which prefers %s', async (theme, matches) => {
      vi.stubGlobal('matchMedia', () => ({ matches }))
      expect((await loadStored({ profile: {} })).theme).toBe(theme)
    })

    it('falls back to light when the device cannot be asked', async () => {
      // jsdom provides no matchMedia, and neither do some embedded browsers.
      expect(window.matchMedia).toBeUndefined()
      expect((await loadStored({ profile: {} })).theme).toBe('light')
    })

    it('falls back to light when there is nothing stored at all', async () => {
      expect((await new LocalStorageStudentRepository(KEY).load()).theme).toBe('light')
    })
  })
})

describe('InMemoryStudentRepository', () => {
  it('round-trips a state', async () => {
    const repository = new InMemoryStudentRepository()
    await repository.save(populated)
    expect(await repository.load()).toEqual(populated)
  })

  it('starts empty', async () => {
    expect(await new InMemoryStudentRepository().load()).toEqual(INITIAL_STATE)
  })

  it('clears back to the initial state', async () => {
    const repository = new InMemoryStudentRepository()
    await repository.save(populated)
    await repository.clear()
    expect(await repository.load()).toEqual(INITIAL_STATE)
  })

  it('does not share state between instances', async () => {
    await new InMemoryStudentRepository().save(populated)
    expect(await new InMemoryStudentRepository().load()).toEqual(INITIAL_STATE)
  })
})
