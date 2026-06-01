"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMPACT_TONES } from "@/components/dashboard/primitives";

interface Insight {
  impact: string;
  finding: string;
  recommendation: string;
}

export default function InsightStack({ insights = [] }: { insights?: Insight[] }) {
  return (
    <div className="border-t border-slate-100" data-testid="insight-stack">
      {insights.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group relative border-b border-slate-100 py-7 pl-6 transition-colors hover:bg-slate-50/60"
          data-testid={`insight-${i}`}
        >
          <span className="absolute left-0 top-7 h-[calc(100%-3.5rem)] w-[3px] rounded-full bg-gradient-to-b from-indigo-500 to-orange-400 opacity-60 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="font-heading text-sm font-light text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${IMPACT_TONES[it.impact] || IMPACT_TONES.Low}`}>
                  {it.impact} impact
                </span>
              </div>
              <h3 className="mt-3 font-heading text-xl sm:text-2xl font-normal leading-snug text-slate-900">
                {it.finding}
              </h3>
            </div>
            <div className="sm:w-80 sm:shrink-0 sm:text-right">
              <div className="text-xs font-medium tracking-wide uppercase text-slate-400">Recommendation</div>
              <p className="mt-2 flex items-start gap-2 text-sm text-slate-600 sm:justify-end">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400 sm:order-2" />
                <span className="sm:order-1">{it.recommendation}</span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
