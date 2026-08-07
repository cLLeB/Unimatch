import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  localStorage.clear()
})

// Recharts' ResponsiveContainer measures its parent, which jsdom reports as 0×0.
// Give it a deterministic box so charts render in component tests.
if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}

// jsdom defines these but throws "Not implemented" from both, so they are
// stubbed unconditionally rather than only when absent.
Element.prototype.scrollIntoView = () => {}
globalThis.scrollTo = (() => {}) as typeof globalThis.scrollTo
