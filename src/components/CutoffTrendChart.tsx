import type { CutoffPoint } from '../types/university';

interface CutoffTrendChartProps {
  data: CutoffPoint[];
}

const CHART_WIDTH = 560;
const CHART_HEIGHT = 200;
const PADDING_LEFT = 32;
const PADDING_RIGHT = 8;
const PADDING_Y = 10;

// Design shows an inverted axis: 8 at top, 30 at bottom (lower aggregate = more competitive)
const Y_MIN = 8;
const Y_MAX = 30;

function yToPixel(value: number) {
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN);
  return PADDING_Y + ratio * (CHART_HEIGHT - PADDING_Y * 2);
}

function xToPixel(index: number, count: number) {
  const usableWidth = CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  return PADDING_LEFT + (index / (count - 1)) * usableWidth;
}

export default function CutoffTrendChart({ data }: CutoffTrendChartProps) {
  const points = data.map((d, i) => ({
    x: xToPixel(i, data.length),
    y: yToPixel(d.aggregate),
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const yTicks = [8, 16, 30];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Cut-off Trend (Last 5 Years)</h2>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Cut-off aggregate trend from 2020 to 2024"
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING_LEFT}
              x2={CHART_WIDTH - PADDING_RIGHT}
              y1={yToPixel(tick)}
              y2={yToPixel(tick)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text x={0} y={yToPixel(tick) + 4} fontSize="12" fill="#64748b">
              {tick}
            </text>
          </g>
        ))}

        <path d={pathD} fill="none" stroke="#0f766e" strokeWidth={2.5} />

        {points.map((p) => (
          <circle key={p.year} cx={p.x} cy={p.y} r={5} fill="#0f766e" />
        ))}

        {points.map((p) => (
          <text
            key={`label-${p.year}`}
            x={p.x}
            y={CHART_HEIGHT + 4}
            fontSize="12"
            fill="#64748b"
            textAnchor="middle"
          >
            {p.year}
          </text>
        ))}
      </svg>

      <p className="mt-4 text-xs text-slate-500">
        Lower aggregate = more competitive. Note: Aggregate is sum of best 6 grades.
      </p>
    </section>
  );
}
