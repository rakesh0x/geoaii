"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await axios.post(`${API}/waitlist`, { email });
      setStatus("success");
      toast.success(res.data.message || "You're on the list!");
    } catch {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="waitlist" className="relative bg-white py-28 sm:py-40" data-testid="waitlist">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-3xl mx-auto px-6 sm:px-8 text-center"
      >
        <motion.span variants={fadeUp} className="text-xs font-medium tracking-[0.25em] uppercase text-indigo-600">
          Early Access
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="geo-display mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.04] text-slate-900"
        >
          Prepare for the <span className="italic">AI-first internet.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed font-light">
          Join founders, operators, and modern companies building for the future
          of discovery.
        </motion.p>

        {status === "success" ? (
          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-6 py-4 text-emerald-700"
            data-testid="waitlist-success"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">You&rsquo;re on the list. Welcome to the future of discovery.</span>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            onSubmit={submit}
            className="mx-auto mt-12 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
            data-testid="waitlist-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              data-testid="waitlist-email-input"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-4 text-sm font-medium text-white hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0"
              data-testid="waitlist-submit-button"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        )}

        <motion.p variants={fadeUp} className="mt-6 text-xs text-slate-400">
          Be part of the answer. No spam, ever.
        </motion.p>
      </motion.div>
    </section>
  );
}
