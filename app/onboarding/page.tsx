"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Globe, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const STEPS = [
  "Reading your website",
  "Mapping what AI understands",
  "Scanning 27 discovery opportunities",
  "Simulating AI answers",
  "Building your executive briefing",
];

const ONBOARDED_KEY = "geoai_onboarded";
const WEBSITE_KEY = "geoai_website";

export default function Onboarding() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [website, setWebsite] = useState("");
  const [phase, setPhase] = useState<"input" | "analyzing">("input");
  const [done, setDone] = useState(0);

  const alreadyOnboarded = user && user.onboarded;

  useEffect(() => {
    if (phase !== "analyzing") return;
    let i = 0;
    const id = setInterval(async () => {
      i += 1;
      setDone(i);
      if (i >= STEPS.length) {
        clearInterval(id);
        setTimeout(async () => {
          localStorage.setItem(ONBOARDED_KEY, "true");
          localStorage.setItem(WEBSITE_KEY, website.trim());
          refreshUser();
          router.replace("/dashboard");
        }, 800);
      }
    }, 720);
    return () => clearInterval(id);
  }, [phase, router, refreshUser, website]);

  if (alreadyOnboarded) {
    router.replace("/dashboard");
    return null;
  }

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website.trim()) return;
    setPhase("analyzing");
    try {
      await api.post("/onboarding", { website: website.trim() });
    } catch {
      /* proceed regardless for demo */
    }
  };

  return (
    <div className="relative min-h-screen grid place-items-center overflow-hidden bg-white font-body px-6">
      <div className="pointer-events-none absolute inset-0 geo-mesh opacity-60" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[820px] rounded-full bg-white/50 blur-3xl" />

      <div className="relative w-full max-w-xl">
        <AnimatePresence mode="wait">
          {phase === "input" ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
                Welcome to GeoAI
              </span>
              <h1 className="geo-display mt-5 font-heading text-4xl sm:text-5xl font-light leading-[1.05] text-slate-900">
                Let&rsquo;s see how AI sees <span className="italic">your company.</span>
              </h1>
              <p className="mt-5 text-lg text-slate-500 font-light">
                Enter your website and we&rsquo;ll analyze your AI discoverability.
              </p>

              <form onSubmit={start} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row" data-testid="onboarding-form">
                <div className="relative flex-1">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="yourcompany.com"
                    required
                    className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-5 py-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                    data-testid="onboarding-website-input"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                  data-testid="onboarding-submit-button"
                >
                  Analyze
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
              data-testid="onboarding-analyzing"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 shadow-lg shadow-indigo-500/20">
                <motion.span
                  className="absolute h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500/50 to-orange-400/40"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <Loader2 className="relative h-6 w-6 animate-spin text-white" />
              </div>
              <h2 className="mt-8 font-heading text-2xl font-normal text-slate-900">
                Analyzing {website.replace(/^https?:\/\//, "")}
              </h2>

              <div className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                {STEPS.map((s, i) => {
                  const isDone = i < done;
                  const isActive = i === done;
                  return (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: i <= done ? 1 : 0.4, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        isDone ? "bg-indigo-600 text-white" : isActive ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-transparent"
                      }`}>
                        {isDone ? <Check className="h-3.5 w-3.5" /> : isActive ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      </span>
                      <span className={`text-sm ${i <= done ? "text-slate-700" : "text-slate-400"}`}>{s}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
