import { useStudent } from '../state/StudentProvider'

/**
 * Colours for the Recharts figures.
 *
 * Charts are the one place the token approach cannot reach: Recharts takes
 * colour props, not class names, so `stroke="#E2E8F0"` stayed light after dark
 * and the comparison bars came out near-white on a dark card. These follow the
 * same values as the CSS tokens, chosen by the theme the student has set.
 *
 * Bars are graphical objects a student has to see to read the chart, so every
 * bar colour here clears 3:1 against its own card background (WCAG 1.4.11).
 * The earlier light `peer` was 1.4:1, a pale bar on a white card, effectively
 * invisible, which is what this palette was rebalanced to fix.
 */
export interface ChartPalette {
  grid: string
  axis: string
  /** The programme being viewed. */
  brand: string
  /** Everything it is being compared against. */
  peer: string
  /** The student's own aggregate, plotted against programme cut-offs. */
  accent: string
  /** Hover band behind the row under the pointer. Must be a faint veil. */
  cursor: string
  tooltipBackground: string
  tooltipBorder: string
  tooltipText: string
}

const LIGHT: ChartPalette = {
  grid: '#cbd5e1',
  axis: '#475569',
  brand: '#0f766e',
  peer: '#7d8fa9',
  accent: '#d97706',
  cursor: 'rgba(15, 23, 42, 0.06)',
  tooltipBackground: '#ffffff',
  tooltipBorder: '#e2e8f0',
  tooltipText: '#0f172a',
}

const DARK: ChartPalette = {
  grid: '#2f3d59',
  axis: '#93a4bd',
  brand: '#2dd4bf',
  peer: '#5d6f92',
  accent: '#fbbf24',
  cursor: 'rgba(226, 232, 240, 0.10)',
  tooltipBackground: '#131c2e',
  tooltipBorder: '#24314a',
  tooltipText: '#e8eef7',
}

export function useChartPalette(): ChartPalette {
  const { state } = useStudent()
  return state.theme === 'dark' ? DARK : LIGHT
}
