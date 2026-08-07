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
