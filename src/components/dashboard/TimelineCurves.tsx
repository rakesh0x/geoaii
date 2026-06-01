"use client";

import { motion } from "framer-motion";

const COLORS: Record<string, string> = {
  ai_visibility: "#6366F1",
  coverage: "#FB923C",
  recommendations: "#F59E0B",
};

const W = 760;
const H = 300;
const PAD = { l: 36, r: 24, t: 24, b: 36 };

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

interface SeriesItem {
  key: string;
  label: string;
  values: number[];
}

export default function TimelineCurves({ months = [], series = [] }: { months?: string[]; series?: SeriesItem[] }) {
  const max = Math.max(1, ...series.flatMap((s) => s.values)) * 1.15;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const xAt = (i: number) => PAD.l + (i / Math.max(1, months.length - 1)) * innerW;
  const yAt = (v: number) => PAD.t + innerH - (v / max) * innerH;

  return (
    <div data-testid="timeline-curves">
      <div className="mb-5 flex flex-wrap gap-6">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[s.key] || "#94A3B8" }} />
            {s.label}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        <defs>
          <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={PAD.l} y1={PAD.t + innerH} x2={W - PAD.r} y2={PAD.t + innerH} stroke="#EEF1F6" strokeWidth="1" />

        {series.map((s, si) => {
          const pts = s.values.map((v, i) => ({ x: xAt(i), y: yAt(v) }));
          const path = smoothPath(pts);
          const color = COLORS[s.key] || "#94A3B8";
          return (
            <g key={s.key}>
              {si === 0 && (
                <path d={`${path} L ${xAt(pts.length - 1)} ${PAD.t + innerH} L ${PAD.l} ${PAD.t + innerH} Z`} fill="url(#tlFill)" />
              )}
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: si * 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
              {pts.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="3"
                  fill="#fff"
                  stroke={color}
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + si * 0.2 + i * 0.04 }}
                />
              ))}
            </g>
          );
        })}

        {months.map((m, i) => (
          <text key={m} x={xAt(i)} y={H - 10} textAnchor="middle" fontFamily="Figtree, sans-serif" fontSize="12" fill="#94A3B8">
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}
