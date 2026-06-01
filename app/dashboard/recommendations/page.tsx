"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useApiData } from "@/hooks/useApiData";
import { PageIntro, IMPACT_TONES } from "@/components/dashboard/primitives";
import ImpactEffortMap from "@/components/dashboard/ImpactEffortMap";

interface Recommendation {
  id: string;
  title: string;
  reason: string;
  gain: number;
  impact: string;
  effort: string;
}

export default function Recommendations() {
  const { data } = useApiData<{ recommendations: Recommendation[] }>("/dashboard/recommendations");
  const items = data?.recommendations || [];
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <div data-testid="page-recommendations">
      <PageIntro
        eyebrow="Recommendations"
        title="Your plan to become the answer."
        subtitle="Prioritized by impact and effort — start top-left for the fastest wins."
      />

      <ImpactEffortMap items={items} />

      <div className="mt-12 border-t border-slate-100" data-testid="recommendation-list">
        {items.map((it, i) => {
          const isDone = done[it.id];
          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-5 border-b border-slate-100 py-6"
              data-testid={`recommendation-${it.id}`}
            >
              <button
                onClick={() => toggle(it.id)}
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isDone ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 text-transparent hover:border-indigo-300"
                }`}
                data-testid={`rec-toggle-${it.id}`}
              >
                <Check className="h-4 w-4" />
              </button>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-heading text-sm font-light text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`font-heading text-xl font-normal ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}>{it.title}</h3>
                </div>
                <p className="mt-2 max-w-xl text-sm text-slate-500 leading-relaxed">{it.reason}</p>
              </div>
              <div className="hidden sm:flex shrink-0 flex-col items-end gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">+{it.gain}% visibility</span>
                <div className="flex gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${IMPACT_TONES[it.impact] || IMPACT_TONES.Low}`}>{it.impact} impact</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{it.effort} effort</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
