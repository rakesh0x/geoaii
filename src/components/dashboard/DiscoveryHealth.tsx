"use client";

import { motion } from "framer-motion";
import { STATUS_TONES } from "@/components/dashboard/primitives";

interface Platform {
  name: string;
  status: string;
  score: number;
  note?: string;
}

export default function DiscoveryHealth({ platforms = [], compact = false }: { platforms?: Platform[]; compact?: boolean }) {
  return (
    <div className="space-y-5" data-testid="discovery-health">
      {platforms.map((p, i) => {
        const t = STATUS_TONES[p.status] || STATUS_TONES.Missing;
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5"
            data-testid={`platform-${p.name.toLowerCase()}`}
          >
            <div className="w-24 shrink-0">
              <div className="font-heading text-base font-normal text-slate-900">{p.name}</div>
            </div>
            <div className="flex-1">
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${t.bar}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              {!compact && p.note && <p className="mt-2 text-xs text-slate-400">{p.note}</p>}
            </div>
            <div className="w-24 shrink-0 text-right">
              <span className={`inline-flex items-center gap-1.5 rounded-full ${t.bg} px-2.5 py-1 text-xs font-medium ${t.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                {p.status}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
