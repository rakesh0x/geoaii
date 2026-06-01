"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const ERAS = [
  { era: "Search", created: "SEO", muted: true },
  { era: "Social", created: "Creators", muted: true },
  { era: "AI", created: "A new way to be found", muted: false },
];

export default function WhyNow() {
  return (
    <section id="why-now" className="relative bg-white py-28 sm:py-40" data-testid="why-now">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
            Why Now
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="geo-display mt-5 max-w-4xl font-heading text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.98] text-slate-900"
          >
            The biggest shift <span className="italic">since search.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-xl text-slate-500 leading-relaxed font-light">
            Every generation of the internet creates a new opportunity.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-slate-200/70 border-t border-slate-200/70"
        >
          {ERAS.map((e) => (
            <motion.div key={e.era} variants={fadeUp} className="py-8 sm:px-8 first:sm:pl-0">
              <div className="text-xs font-medium tracking-[0.22em] uppercase text-slate-400">{e.era} created</div>
              <div className={`mt-3 font-heading text-2xl sm:text-3xl font-normal leading-tight ${e.muted ? "text-slate-400" : "text-slate-900"}`}>
                {e.created}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 max-w-3xl"
        >
          <p className="geo-display font-heading text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] text-slate-900">
            &ldquo;How do businesses remain visible when{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
              answers replace links?
            </span>&rdquo;
          </p>
          <footer className="mt-6 text-lg text-slate-500 font-light">
            That&rsquo;s the question GeoAI was built to answer.
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
