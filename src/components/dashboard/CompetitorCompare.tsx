"use client";

import { motion } from "framer-motion";

interface Entity {
  name: string;
  self: boolean;
  scores: Record<string, number>;
}

export default function CompetitorCompare({ metrics = [], entities = [] }: { metrics?: string[]; entities?: Entity[] }) {
  const self = entities.find((e) => e.self);

  const insightFor = (mi: number) => {
    if (!self) return null;
    let leader: string | null = null;
    let leadVal = self.scores[mi];
    entities.forEach((e) => {
      if (!e.self && e.scores[mi] > leadVal) {
        leadVal = e.scores[mi];
        leader = e.name;
      }
    });
    if (!leader) return "You lead on this signal.";
    return `${leader} leads \u2014 close the gap of ${leadVal - self.scores[mi]} pts.`;
  };

  return (
    <div className="space-y-8" data-testid="competitor-compare">
      {metrics.map((metric, mi) => (
        <motion.div
          key={metric}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: mi * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-slate-100 pb-8 last:border-0"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-normal text-slate-900">{metric}</h3>
            <span className="text-xs text-slate-400">{insightFor(mi)}</span>
          </div>
          <div className="mt-4 space-y-2.5">
            {entities.map((e, ei) => (
              <div key={e.name} className="flex items-center gap-4">
                <span className={`w-32 shrink-0 text-sm ${e.self ? "font-semibold text-slate-900" : "text-slate-500"}`}>
                  {e.name}
                </span>
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      e.self ? "bg-gradient-to-r from-indigo-500 to-orange-400" : "bg-slate-300"
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${e.scores[mi]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 + ei * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className={`w-10 shrink-0 text-right text-sm tabular-nums ${e.self ? "font-semibold text-slate-900" : "text-slate-400"}`}>
                  {e.scores[mi]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
