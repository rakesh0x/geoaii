"use client";

import { motion } from "framer-motion";
import { Sparkles, EyeOff } from "lucide-react";
import Reveal from "@/components/Reveal";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";

const RANKED = [
  { name: "Northstar Labs", w: "92%" },
  { name: "Brightpath", w: "78%" },
  { name: "Even & Co.", w: "64%" },
];

const POINTS = [
  { title: "Visibility", body: "Stay discoverable as AI becomes the primary interface to information." },
  { title: "Trust", body: "Help AI systems understand and trust your expertise." },
  { title: "Growth", body: "Reach future customers where discovery is actually happening." },
];

export default function TheProblem() {
  return (
    <section id="problem" className="relative bg-white py-28 sm:py-40" data-testid="the-problem">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal variants={fadeUp} amount={0.35} className="order-2 lg:order-1">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 geo-mesh opacity-50 blur-2xl" />
              <div className="relative rounded-[1.75rem] border border-slate-100 bg-white p-7 sm:p-9 shadow-[0_24px_70px_rgba(15,23,42,0.07)]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-mono uppercase tracking-[0.18em]">AI answer</span>
                </div>
                <p className="mt-4 font-heading text-xl font-normal text-slate-900 leading-snug">
                  &ldquo;What are the best tools for ambitious startups?&rdquo;
                </p>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Based on what I can see, the most trusted options are:
                </p>

                <div className="mt-5 space-y-3">
                  {RANKED.map((r, i) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-28 shrink-0 text-sm font-medium text-slate-700">{r.name}</span>
                      <span className="relative h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: r.w }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
                        />
                      </span>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-3 py-3"
                  >
                    <EyeOff className="h-4 w-4 text-slate-300" />
                    <span className="text-sm font-medium text-slate-400">Your business</span>
                    <span className="ml-auto text-xs font-medium text-slate-300">not mentioned</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="order-1 lg:order-2"
          >
            <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
              The Problem
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="geo-display mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.02] text-slate-900"
            >
              Great businesses are becoming <span className="italic">invisible.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-7 space-y-5 text-lg text-slate-500 leading-relaxed font-light max-w-lg">
              <p>Incredible products are being built every day.</p>
              <p>
                But as AI becomes the gateway to information, traditional SEO
                alone is no longer enough. If AI doesn&rsquo;t understand, trust, and
                surface you, customers may never know you exist.
              </p>
            </motion.div>

            <motion.dl variants={fadeUp} className="mt-10 divide-y divide-slate-100 border-t border-slate-100">
              {POINTS.map((p) => (
                <div key={p.title} className="flex gap-6 py-5">
                  <dt className="w-28 shrink-0 font-heading text-lg font-normal text-slate-900">{p.title}</dt>
                  <dd className="text-base text-slate-500 leading-relaxed">{p.body}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
