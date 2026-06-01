"use client";

import { motion } from "framer-motion";
import { ScanSearch, Sparkles, Activity, Sprout, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const STEPS: { n: string; icon: LucideIcon; title: string; body: string }[] = [
  { n: "01", icon: ScanSearch, title: "Understand", body: "See exactly how AI systems perceive, describe, and position your brand today." },
  { n: "02", icon: Sparkles, title: "Improve", body: "Strengthen the signals AI uses to evaluate, trust, and cite your content." },
  { n: "03", icon: Activity, title: "Measure", body: "Track your visibility across the AI ecosystem as the landscape shifts." },
  { n: "04", icon: Sprout, title: "Grow", body: "Become part of more answers — and reach customers as discovery evolves." },
];

export default function TheSolution() {
  return (
    <section id="solution" className="relative bg-slate-50/60 py-28 sm:py-40" data-testid="the-solution">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
              The Solution
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="geo-display mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.02] text-slate-900"
            >
              Built for modern <span className="italic">startups.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-7 max-w-md text-lg text-slate-500 leading-relaxed font-light">
              GeoAI helps you prepare for the next era of discovery — analyzing
              how AI reads your business and turning that into visibility you can
              feel.
            </motion.p>
          </motion.div>
        </div>

        <motion.ol
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-slate-200/70 border-t border-slate-200/70"
        >
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="group flex items-start gap-6 py-9 sm:py-11"
                data-testid={`solution-step-${s.title.toLowerCase()}`}
              >
                <span className="font-heading text-2xl font-light text-slate-300 w-12 shrink-0 group-hover:text-indigo-500 transition-colors">
                  {s.n}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-indigo-500" strokeWidth={1.6} />
                    <h3 className="font-heading text-2xl sm:text-3xl font-normal text-slate-900">{s.title}</h3>
                  </div>
                  <p className="mt-3 max-w-md text-base sm:text-lg text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
