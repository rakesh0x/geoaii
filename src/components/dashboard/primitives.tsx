"use client";

import { motion } from "framer-motion";

export const SectionHeading = ({ eyebrow, title, subtitle, className = "" }: { eyebrow?: string; title: string; subtitle?: string; className?: string }) => (
  <div className={className}>
    {eyebrow && (
      <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">{eyebrow}</span>
    )}
    <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-normal tracking-tight text-slate-900">{title}</h2>
    {subtitle && <p className="mt-2 max-w-2xl text-slate-500 leading-relaxed">{subtitle}</p>}
  </div>
);

export const STATUS_TONES: Record<string, { dot: string; text: string; bg: string; bar: string }> = {
  Strong: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", bar: "from-emerald-500 to-emerald-400" },
  Moderate: { dot: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50", bar: "from-indigo-500 to-indigo-400" },
  Weak: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", bar: "from-amber-500 to-amber-400" },
  Missing: { dot: "bg-slate-400", text: "text-slate-500", bg: "bg-slate-100", bar: "from-slate-300 to-slate-200" },
};

export const StatusBadge = ({ status }: { status: string }) => {
  const t = STATUS_TONES[status] || STATUS_TONES.Missing;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${t.bg} px-2.5 py-1 text-xs font-medium ${t.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
      {status}
    </span>
  );
};

export const IMPACT_TONES: Record<string, string> = {
  High: "bg-indigo-50 text-indigo-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-slate-100 text-slate-500",
};

export const PageIntro = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mb-10"
  >
    <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">{eyebrow}</span>
    <h1 className="geo-display mt-3 font-heading text-3xl sm:text-4xl font-light tracking-tight text-slate-900">{title}</h1>
    {subtitle && <p className="mt-3 max-w-2xl text-lg text-slate-500 font-light leading-relaxed">{subtitle}</p>}
  </motion.div>
);
