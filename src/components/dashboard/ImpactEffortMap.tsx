"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EFFORT_X: Record<string, number> = { Low: 0.2, Medium: 0.5, High: 0.8 };
const IMPACT_Y: Record<string, number> = { High: 0.18, Medium: 0.5, Low: 0.82 };
const COLOR: Record<string, string> = { High: "#6366F1", Medium: "#F59E0B", Low: "#94A3B8" };

interface Item {
  id: string;
  effort: string;
  impact: string;
  gain: number;
  title: string;
}

export default function ImpactEffortMap({ items = [] }: { items?: Item[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-8" data-testid="impact-effort-map">
      <div className="relative aspect-[4/3] w-full">
        <div className="absolute left-1/2 top-0 h-full w-px bg-slate-100" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-slate-100" />

        <span className="absolute left-3 top-3 text-[11px] font-medium uppercase tracking-wide text-indigo-500">Quick wins</span>
        <span className="absolute right-3 top-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">Big bets</span>
        <span className="absolute left-3 bottom-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">Easy extras</span>
        <span className="absolute right-3 bottom-3 text-[11px] font-medium uppercase tracking-wide text-slate-300">Deprioritize</span>

        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-xs text-slate-400">Effort &rarr;</span>
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90 text-xs text-slate-400">Impact &uarr;</span>

        {items.map((it, i) => {
          const x = (EFFORT_X[it.effort] ?? 0.5) * 100;
          const y = (IMPACT_Y[it.impact] ?? 0.5) * 100;
          const size = 30 + it.gain;
          const color = COLOR[it.impact] || COLOR.Low;
          return (
            <motion.button
              key={it.id || i}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, zIndex: 20 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-testid={`rec-node-${it.id || i}`}
            >
              <span
                className="flex items-center justify-center rounded-full font-heading text-sm font-medium text-white shadow-lg"
                style={{ width: size, height: size, background: color, boxShadow: `0 8px 28px ${color}40` }}
              >
                {i + 1}
              </span>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 top-full z-30 mt-2 w-48 -translate-x-1/2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-left shadow-xl"
                >
                  <div className="text-xs font-semibold text-slate-900">{it.title}</div>
                  <div className="mt-1 text-[11px] text-indigo-600">+{it.gain}% visibility</div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
