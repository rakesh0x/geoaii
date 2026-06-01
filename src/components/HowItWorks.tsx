"use client";

import { motion } from "framer-motion";
import {
  User, Search, Globe2, Bot, MessageSquareText,
  FileStack, BrainCircuit, BadgeCheck, UserCheck,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

const Connector = ({ accent = "#94A3B8", delay = 0 }) => (
  <div className="relative mx-1 hidden sm:block flex-1 self-center h-px min-w-[24px] bg-slate-200">
    <motion.span
      className="absolute top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full"
      style={{ background: accent }}
      animate={{ left: ["-2%", "102%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  </div>
);

const Node = ({ icon: Icon, label, tone = "default" }: { icon: LucideIcon; label: string; tone?: string }) => {
  const tones: Record<string, string> = {
    default: "border-slate-200 bg-white text-slate-700",
    muted: "border-slate-100 bg-slate-50 text-slate-400",
    ai: "border-slate-900 bg-slate-900 text-white",
    accent: "border-indigo-100 bg-white text-indigo-700 shadow-sm shadow-indigo-500/10",
    customer: "border-orange-100 bg-white text-orange-600",
  };
  return (
    <motion.div variants={fadeUp} className="flex shrink-0 flex-col items-center gap-2.5 text-center">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${tones[tone] || tones.default}`}>
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <span className="text-[13px] font-medium leading-tight text-slate-600 max-w-[7rem]">{label}</span>
    </motion.div>
  );
};

const GeoNode = () => (
  <motion.div variants={fadeUp} className="flex shrink-0 flex-col items-center gap-2.5 text-center">
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-indigo-500/20">
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/50 to-orange-400/40" />
      <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
      <span className="relative font-heading text-base font-medium text-white">Geo</span>
    </div>
    <span className="text-[13px] font-semibold leading-tight text-slate-900 max-w-[7rem]">GeoAI</span>
  </motion.div>
);

const Row = ({ index, era, title, children, highlight }: { index: string; era: string; title: string; children: React.ReactNode; highlight?: boolean }) => (
  <motion.div
    variants={staggerContainer(0.12)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
    className={`relative ${
      highlight
        ? "rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-orange-50/40 p-8 sm:p-12"
        : "px-1 py-2"
    }`}
  >
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      <motion.div variants={fadeUp} className="lg:w-56 shrink-0">
        <div className="flex items-baseline gap-3">
          <span className="font-heading text-2xl font-light text-slate-300">{index}</span>
          <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">{era}</span>
        </div>
        <h3 className={`mt-2 font-heading ${highlight ? "text-2xl sm:text-3xl text-slate-900" : "text-xl text-slate-700"} font-normal leading-tight`}>
          {title}
        </h3>
      </motion.div>

      <div className="flex flex-1 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        {children}
      </div>
    </div>
  </motion.div>
);

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-28 sm:py-40" data-testid="how-it-works">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl"
        >
          <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
            How GeoAI Works
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="geo-display mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.04] text-slate-900"
          >
            The path to discovery <span className="italic">changed.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed font-light">
            Discovery used to end on a webpage. Today it ends inside an answer.
            GeoAI makes sure your business is understood, trusted, and
            recommended along the way.
          </motion.p>
        </motion.div>

        <div className="mt-16 space-y-10 sm:space-y-12">
          <Row index="01" era="Yesterday" title="Traditional search">
            <Node icon={User} label="User" tone="muted" />
            <Connector delay={0} />
            <Node icon={Search} label="Search engine" tone="muted" />
            <Connector delay={0.4} />
            <Node icon={Globe2} label="Website" tone="muted" />
          </Row>

          <div className="geo-hairline" />

          <Row index="02" era="Today" title="AI discovery">
            <Node icon={User} label="User" />
            <Connector delay={0.1} />
            <Node icon={Bot} label="AI assistant" tone="ai" />
            <Connector delay={0.5} />
            <Node icon={MessageSquareText} label="AI answer" />
          </Row>

          <Row index="03" era="With GeoAI" title="Become the recommendation" highlight>
            <Node icon={FileStack} label="Your content" tone="accent" />
            <Connector accent="#6366F1" delay={0} />
            <GeoNode />
            <Connector accent="#6366F1" delay={0.3} />
            <Node icon={BrainCircuit} label="AI understanding" tone="accent" />
            <Connector accent="#FF8A65" delay={0.6} />
            <Node icon={BadgeCheck} label="AI recommendation" tone="accent" />
            <Connector accent="#FF8A65" delay={0.9} />
            <Node icon={UserCheck} label="New customer" tone="customer" />
          </Row>
        </div>
      </div>
    </section>
  );
}
