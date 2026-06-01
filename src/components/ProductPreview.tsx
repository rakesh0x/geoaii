"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, ShieldCheck, Compass, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";

const useCountUp = (target: number, active: boolean, duration = 1600) => {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
};

const FloatChip = ({ icon: Icon, label, value, className, delay }: { icon: LucideIcon; label: string; value: string; className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 backdrop-blur px-4 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
        <div className="text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </motion.div>
  </motion.div>
);

export default function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const score = useCountUp(87, active);
  const R = 88;
  const C = 2 * Math.PI * R;

  return (
    <section id="product" className="relative bg-white py-28 sm:py-40 overflow-hidden" data-testid="product-preview">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
            A Glimpse
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="geo-display mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.02] text-slate-900"
          >
            Your visibility, <span className="italic">made clear.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-7 max-w-md text-lg text-slate-500 leading-relaxed font-light">
            No dashboards to decode. Just one calm, intelligent view of how AI
            sees your business — and the next move to become part of more answers.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 text-sm text-slate-500">
            <span className="h-px w-8 bg-slate-300" />
            Quiet by design. Powerful underneath.
          </motion.div>
        </motion.div>

        <Reveal variants={fadeUp} amount={0.3}>
          <div ref={ref} className="relative mx-auto flex max-w-md items-center justify-center py-16">
            <div className="pointer-events-none absolute inset-0 geo-mesh opacity-70 blur-2xl rounded-full" />

            <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)] border border-slate-100">
              <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="110" cy="110" r={R} fill="none" stroke="#EEF2F7" strokeWidth="10" />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#FF8A65" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="110" cy="110" r={R} fill="none" stroke="url(#ringGrad)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C}
                  initial={{ strokeDashoffset: C }}
                  animate={active ? { strokeDashoffset: C * (1 - 0.87) } : {}}
                  transition={{ duration: 1.6, ease: EASE }}
                />
              </svg>
              <div className="text-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">Visibility Score</div>
                <div className="font-heading text-6xl font-light text-slate-900">{score}</div>
                <div className="mt-1 text-xs font-medium text-indigo-600">+12 this month</div>
              </div>
            </div>

            <FloatChip icon={ShieldCheck} label="AI Readiness" value="94%" className="-top-2 -left-4 sm:-left-10" delay={0.5} />
            <FloatChip icon={TrendingUp} label="Authority" value="Strengthening" className="top-8 -right-4 sm:-right-12" delay={0.7} />
            <FloatChip icon={Compass} label="Opportunities" value="24 ready" className="-bottom-2 left-2 sm:-left-8" delay={0.9} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
