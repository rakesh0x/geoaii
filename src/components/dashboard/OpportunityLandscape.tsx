"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const POS = [
  { l: 15, t: 24 }, { l: 40, t: 14 }, { l: 65, t: 22 }, { l: 85, t: 44 },
  { l: 73, t: 70 }, { l: 49, t: 80 }, { l: 25, t: 70 }, { l: 9, t: 50 },
  { l: 57, t: 48 }, { l: 33, t: 46 },
];

const STYLES: Record<string, { ring: string; glow: string; dot: string; label: string }> = {
  present: { ring: "border-indigo-200", glow: "shadow-[0_10px_40px_rgba(99,102,241,0.25)]", dot: "bg-indigo-500", label: "text-slate-900" },
  partial: { ring: "border-amber-200", glow: "shadow-[0_8px_30px_rgba(245,158,11,0.18)]", dot: "bg-amber-500", label: "text-slate-800" },
  missed: { ring: "border-dashed border-slate-300", glow: "", dot: "bg-slate-300", label: "text-slate-400" },
};

interface Topic {
  topic: string;
  status: string;
  visibility: number;
}

export default function OpportunityLandscape({ topics = [] }: { topics?: Topic[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-5 text-xs text-slate-500">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Present</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Partial</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border border-dashed border-slate-400" /> Missed opportunity</span>
      </div>

      <div className="relative h-[440px] sm:h-[520px] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white" data-testid="opportunity-landscape">
        <div className="pointer-events-none absolute inset-0 geo-mesh opacity-50" />
        {topics.map((t, i) => {
          const p = POS[i % POS.length];
          const size = 64 + Math.round(t.visibility * 86);
          const s = STYLES[t.status] || STYLES.missed;
          const isActive = active === i;
          return (
            <motion.button
              key={t.topic}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: `${p.l}%`, top: `${p.t}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [-6, 6, -6] }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.06 },
                scale: { duration: 0.5, delay: i * 0.06 },
                y: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
              }}
              whileHover={{ scale: 1.08, zIndex: 20 }}
              data-testid={`topic-node-${t.topic.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className={`flex flex-col items-center justify-center rounded-full border bg-white/90 backdrop-blur ${s.ring} ${s.glow} transition-shadow`}
                style={{ width: size, height: size }}
              >
                <span className={`px-2 text-center text-[11px] sm:text-xs font-medium leading-tight ${s.label}`}>{t.topic}</span>
                <span className="mt-1 text-[10px] text-slate-400">{Math.round(t.visibility * 100)}%</span>
              </div>
              {t.status === "missed" && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white opacity-80">
                  Missed
                </span>
              )}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 top-full z-30 mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-slate-100 bg-white px-3 py-2 text-left shadow-lg"
                >
                  <div className="text-xs font-semibold text-slate-900">{t.topic}</div>
                  <div className="text-[11px] text-slate-400 capitalize">{t.status} &middot; {Math.round(t.visibility * 100)}% visibility</div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
