"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApiData } from "@/hooks/useApiData";
import OpportunityOrbit from "@/components/dashboard/OpportunityOrbit";
import DiscoveryHealth from "@/components/dashboard/DiscoveryHealth";
import InsightStack from "@/components/dashboard/InsightStack";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

export default function DashboardHome() {
  const { user } = useAuth();
  const { data: overview } = useApiData<any>("/dashboard/overview");
  const { data: health } = useApiData<any>("/dashboard/discovery-health");
  const { data: insightsData } = useApiData<any>("/dashboard/insights");

  const name = (user?.name || "").split(" ")[0];

  return (
    <div data-testid="dashboard-home">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">Executive briefing</span>
        <h1 className="geo-display mt-4 font-heading text-4xl sm:text-5xl font-light leading-[1.05] text-slate-900">
          {greeting()}{name ? `, ${name}` : ""}.
        </h1>
        <p className="mt-5 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-slate-500">
          GeoAI analyzed{" "}
          <span className="text-slate-900">{overview?.company || "your website"}</span>. You&rsquo;re currently
          discoverable in{" "}
          <span className="text-slate-900">{overview?.discoverable ?? "\u2014"} of {overview?.total_opportunities ?? "\u2014"}</span>{" "}
          high-value AI recommendation opportunities.
        </p>
      </motion.div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        <OpportunityOrbit
          discoverable={overview?.discoverable ?? 4}
          total={overview?.total_opportunities ?? 27}
          growth={overview?.growth_potential ?? "+218%"}
        />
        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-slate-400">Potential growth opportunity</div>
          <div className="geo-display mt-2 font-heading text-7xl font-light bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
            {overview?.growth_potential ?? "+218%"}
          </div>
          <p className="mt-4 max-w-md text-slate-500 leading-relaxed">
            If you act on GeoAI&rsquo;s recommendations, your presence inside AI answers
            could grow significantly across the platforms your customers use.
          </p>
          <Link
            href="/dashboard/recommendations"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            data-testid="home-recommendations-cta"
          >
            See what to improve
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="geo-hairline mt-16" />
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">AI Discovery Health</span>
            <h2 className="mt-3 font-heading text-2xl font-normal text-slate-900">Where AI stands on you today</h2>
          </div>
          <Link href="/dashboard/visibility" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Full visibility <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <DiscoveryHealth platforms={health?.platforms || []} compact />
        </div>
      </div>

      <div className="geo-hairline mt-16" />
      <div className="mt-12">
        <span className="text-xs font-medium tracking-[0.22em] uppercase text-indigo-600">Advisor</span>
        <h2 className="geo-display mt-3 font-heading text-3xl sm:text-4xl font-light leading-tight text-slate-900">
          Why you&rsquo;re not being <span className="italic">recommended.</span>
        </h2>
        <div className="mt-8">
          <InsightStack insights={(insightsData?.insights || []).slice(0, 3)} />
        </div>
        <Link
          href="/dashboard/recommendations"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Turn these into an action plan
          <span className="h-px w-6 bg-slate-300 transition-all group-hover:w-9 group-hover:bg-slate-500" />
        </Link>
      </div>
    </div>
  );
}
