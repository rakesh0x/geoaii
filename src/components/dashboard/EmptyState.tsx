"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, title, body, children }: { icon: LucideIcon; title: string; body?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white px-8 py-16 text-center"
      data-testid="empty-state"
    >
      <div className="pointer-events-none absolute inset-0 geo-mesh opacity-50" />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)] border border-slate-100"
        >
          {Icon && <Icon className="h-7 w-7 text-indigo-500" strokeWidth={1.6} />}
        </motion.div>
        <h3 className="mt-6 font-heading text-2xl font-normal text-slate-900">{title}</h3>
        {body && <p className="mt-3 text-slate-500 leading-relaxed">{body}</p>}
        {children && <div className="mt-6 w-full">{children}</div>}
      </div>
    </motion.div>
  );
}
