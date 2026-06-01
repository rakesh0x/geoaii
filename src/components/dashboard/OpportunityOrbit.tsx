"use client";

import { motion } from "framer-motion";

const RINGS = [
  { count: 8, r: 78 },
  { count: 9, r: 128 },
  { count: 10, r: 178 },
];
const DISCOVERABLE = new Set([1, 10, 16, 24]);

function buildDots() {
  let idx = 0;
  const dots: { x: number; y: number; idx: number; discoverable: boolean }[] = [];
  RINGS.forEach((ring) => {
    for (let i = 0; i < ring.count; i += 1) {
      const a = (i / ring.count) * Math.PI * 2 - Math.PI / 2;
      dots.push({
        x: 240 + ring.r * Math.cos(a),
        y: 240 + ring.r * Math.sin(a),
        idx,
        discoverable: DISCOVERABLE.has(idx),
      });
      idx += 1;
    }
  });
  return dots;
}

export default function OpportunityOrbit({ discoverable = 4, total = 27, growth = "+218%" }: { discoverable?: number; total?: number; growth?: string }) {
  const dots = buildDots();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" data-testid="opportunity-orbit">
      <svg viewBox="0 0 480 480" className="h-full w-full">
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {RINGS.map((ring) => (
          <circle key={ring.r} cx="240" cy="240" r={ring.r} fill="none" stroke="#EEF1F6" strokeWidth="1" />
        ))}

        <motion.g
          style={{ transformOrigin: "240px 240px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        >
          {dots.map((d, i) =>
            d.discoverable ? (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="16" fill="url(#orbGlow)">
                  <animate attributeName="r" values="13;18;13" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={d.x} cy={d.y} r="6" fill="#6366F1" />
              </g>
            ) : (
              <motion.circle
                key={i}
                cx={d.x}
                cy={d.y}
                r="3.5"
                fill="#D8DEE9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
              />
            )
          )}
        </motion.g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-6xl font-light text-slate-900">{discoverable}</span>
          <span className="font-heading text-2xl font-light text-slate-300">/ {total}</span>
        </div>
        <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          AI opportunities won
        </div>
        <div className="mt-4 rounded-full bg-gradient-to-r from-indigo-50 to-orange-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
          {growth} potential
        </div>
      </div>
    </div>
  );
}
