"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";

const ASSISTANTS = ["ChatGPT", "Gemini", "Claude", "Perplexity"];

export default function TheShift() {
  return (
    <section id="the-shift" className="relative bg-slate-50/60 py-28 sm:py-40" data-testid="the-shift">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
              The Shift
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="geo-display mt-5 font-heading text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.98] text-slate-900"
            >
              Search is <span className="italic">changing.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8 space-y-5 text-lg text-slate-500 leading-relaxed font-light max-w-lg">
              <p>For decades, businesses fought for rankings.</p>
              <p>
                Today, millions of people ask AI instead of clicking through a
                page of blue links.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {ASSISTANTS.map((a) => (
                <span key={a} className="font-heading text-lg italic text-slate-400">{a}</span>
              ))}
            </motion.div>
          </motion.div>

          <Reveal variants={fadeUp} amount={0.4}>
            <div className="relative rounded-[2rem] border border-slate-100 bg-white p-9 sm:p-14 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-slate-400">
                The question used to be
              </span>
              <p className="mt-3 font-heading text-2xl sm:text-3xl font-light leading-snug text-slate-300 line-through decoration-1">
                &ldquo;Can customers find you?&rdquo;
              </p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="my-7 flex items-center gap-3 text-slate-300"
              >
                <span className="h-px flex-1 bg-slate-100" />
                <ArrowDown className="h-4 w-4" />
                <span className="h-px flex-1 bg-slate-100" />
              </motion.div>

              <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">
                Now it&rsquo;s
              </span>
              <p className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.05] text-slate-900">
                &ldquo;Will AI{" "}
                <span className="relative inline-block italic">
                  recommend
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-indigo-500 to-orange-400" />
                </span>{" "}
                you?&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
