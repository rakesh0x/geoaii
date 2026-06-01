"use client";

import { motion } from "framer-motion";

export default function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white" data-testid="app-loader">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-2xl bg-slate-900" />
          <motion.span
            className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/60 to-orange-400/50"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-sm font-medium tracking-wide text-slate-400">{label}&hellip;</span>
      </div>
    </div>
  );
}
