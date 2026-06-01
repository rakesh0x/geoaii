"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FlowField from "@/components/FlowField";
import { EASE } from "@/lib/motion";
import { useRouter } from "next/navigation";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const router = useRouter();
  const redirecttologin = () => {
    router.push("/login")
  }

  return (
    <section className="relative overflow-hidden" data-testid="hero">
      <div className="pointer-events-none absolute inset-0 geo-mesh opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[1100px] rounded-full bg-white/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-40 pb-16 sm:pt-48 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3"
          data-testid="hero-badge"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-slate-500">
            Built for the AI Era
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.05 }}
          className="geo-display mt-8 max-w-[16ch] font-heading text-6xl sm:text-7xl lg:text-[5.5rem] font-light leading-[0.98] text-slate-900"
          data-testid="hero-headline"
        >
          Be part of the{" "}
          <span className="italic font-normal bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
            answer.
          </span>
        </motion.h1>

        <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="max-w-xl text-xl sm:text-2xl text-slate-500 leading-relaxed font-light"
            data-testid="hero-subheadline"
          >
            People used to search for businesses. Now they ask AI. GeoAI is the
            visibility layer that keeps your company{" "}
            <span className="text-slate-900">discoverable, trusted, and cited</span>{" "}
            inside the answers AI gives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
            className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end"
          >
            <button
              onClick={() => { redirecttologin() }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-slate-900/15"
              data-testid="hero-primary-cta"
            >
              Try Geo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#how-it-works")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              data-testid="hero-secondary-cta"
            >
              See how it works
              <span className="h-px w-6 bg-slate-300 transition-all group-hover:w-9 group-hover:bg-slate-500" />
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        className="relative max-w-6xl mx-auto px-6 sm:px-8 pb-24 sm:pb-32"
        data-testid="hero-visual"
      >
        <div className="relative">
          <FlowField />
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400">
          <span className="h-px w-10 bg-slate-200" />
          GeoAI sits between your content and the answer
          <span className="h-px w-10 bg-slate-200" />
        </div>
      </motion.div>
    </section>
  );
}
