"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-slate-900 py-32 sm:py-48" data-testid="vision">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(40% 50% at 18% 15%, rgba(99,102,241,0.40), transparent 70%), radial-gradient(45% 55% at 85% 20%, rgba(255,138,101,0.32), transparent 70%), radial-gradient(55% 65% at 50% 115%, rgba(255,213,79,0.18), transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative max-w-4xl mx-auto px-6 sm:px-8"
      >
        <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-300">
          Vision
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="geo-display mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] text-white"
        >
          Building for the next generation of <span className="italic">discovery.</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-10 max-w-2xl space-y-6 text-xl sm:text-2xl text-slate-300 leading-relaxed font-light">
          <p>The future internet will be navigated through conversations.</p>
          <p>
            The companies that thrive won&rsquo;t simply rank higher — they&rsquo;ll become
            trusted sources inside the systems people rely on every day.
          </p>
          <p className="text-white">GeoAI helps make that future accessible.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
