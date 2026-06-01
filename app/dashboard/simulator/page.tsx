"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, ArrowRight, Loader2, Sparkles, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import { PageIntro } from "@/components/dashboard/primitives";
import EmptyState from "@/components/dashboard/EmptyState";

const SUGGESTIONS = [
  "best accounting software",
  "best AI startup tools",
  "best workflow automation platform",
];

const ProbBar = ({ label, value, tone }: { label: string; value: number; tone: string }) => (
  <div>
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`font-heading text-3xl font-light ${tone === "potential" ? "text-indigo-600" : "text-slate-900"}`}>{value}%</span>
    </div>
    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <motion.div
        className={`h-full rounded-full ${tone === "potential" ? "bg-gradient-to-r from-indigo-500 to-orange-400" : "bg-slate-400"}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </div>
);

export default function Simulator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; brands: string[]; current_probability: number; potential_probability: number } | null>(null);

  const run = async (q?: string) => {
    const text = (q ?? prompt).trim();
    if (!text) return;
    setPrompt(text);
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post("/simulator", { prompt: text });
      setResult(data);
    } catch {
      setResult({ answer: "We couldn't simulate that prompt right now. Please try again.", brands: [], current_probability: 0, potential_probability: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="page-simulator">
      <PageIntro
        eyebrow="AI Simulator"
        title="Ask AI what it would recommend."
        subtitle="Type a real buying question. We'll simulate how an AI assistant answers it today — and whether you're in the picture."
      />

      <form
        onSubmit={(e) => { e.preventDefault(); run(); }}
        className="flex flex-col gap-3 sm:flex-row"
        data-testid="simulator-form"
      >
        <div className="relative flex-1">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. best accounting software"
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-5 py-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            data-testid="simulator-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-sm font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-70"
          data-testid="simulator-run-button"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Simulate <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => run(s)}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
            data-testid="simulator-suggestion"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-3xl border border-slate-100 bg-white px-8 py-16 text-slate-500"
              data-testid="simulator-loading"
            >
              <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
              Simulating how AI answers &ldquo;{prompt}&rdquo;&hellip;
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
              data-testid="simulator-result"
            >
              <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-mono uppercase tracking-[0.18em]">Simulated AI answer</span>
                </div>
                <p className="mt-4 font-heading text-lg font-normal leading-relaxed text-slate-900">{result.answer}</p>

                {result.brands?.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Brands AI recommended</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.brands.map((b: string) => (
                        <span key={b} className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">{b}</span>
                      ))}
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-400">
                        <EyeOff className="h-3.5 w-3.5" /> Your company
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-orange-50/40 p-7 sm:p-9">
                <h3 className="font-heading text-xl font-normal text-slate-900">Your inclusion probability</h3>
                <p className="mt-1 text-sm text-slate-500">Chance AI names you for this prompt.</p>
                <div className="mt-7 space-y-6">
                  <ProbBar label="Today" value={result.current_probability} tone="current" />
                  <ProbBar label="After GeoAI improvements" value={result.potential_probability} tone="potential" />
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
                  +{Math.max(0, result.potential_probability - result.current_probability)} pts of upside
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyState
              key="empty"
              icon={Wand2}
              title="Run your first simulation"
              body="Pick a suggestion above or type a buying question to see how AI would answer — and where you stand."
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
