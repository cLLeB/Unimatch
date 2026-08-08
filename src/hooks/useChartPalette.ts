import { useStudent } from '../state/StudentProvider'

/**
 * Colours for the Recharts figures.
 *
 * Charts are the one place the token approach cannot reach: Recharts takes
 * colour props, not class names, so `stroke="#E2E8F0"` stayed light after dark
 * and the comparison bars came out near-white on a dark card. These follow the
 * same values as the CSS tokens, chosen by the theme the student has set.
 */
export interface ChartPalette {
  grid: string
  axis: string
  /** The programme being viewed. */
  brand: string
  /** Everything it is being compared against. */
  peer: string
  tooltipBackground: string
  tooltipBorder: string
  tooltipText: string
}

const LIGHT: ChartPalette = {
  grid: '#e2e8f0',
  axis: '#475569',
  brand: '#0f766e',
  peer: '#cbd5e1',
  tooltipBackground: '#ffffff',
  tooltipBorder: '#e2e8f0',
  tooltipText: '#0f172a',
}

const DARK: ChartPalette = {
  grid: '#24314a',
  axis: '#93a4bd',
  brand: '#2dd4bf',
  peer: '#3a4a68',
  tooltipBackground: '#131c2e',
  tooltipBorder: '#24314a',
  tooltipText: '#e8eef7',
}

export function useChartPalette(): ChartPalette {
  const { state } = useStudent()
  return state.theme === 'dark' ? DARK : LIGHT
}
