"use client";

import { useAuth } from "@/context/AuthContext";
import { useApiData } from "@/hooks/useApiData";
import { PageIntro } from "@/components/dashboard/primitives";
import DiscoveryHealth from "@/components/dashboard/DiscoveryHealth";
import KnowledgeGraph from "@/components/dashboard/KnowledgeGraph";
import TimelineCurves from "@/components/dashboard/TimelineCurves";

export default function Visibility() {
  const { user } = useAuth();
  const { data: health } = useApiData<any>("/dashboard/discovery-health");
  const { data: kg } = useApiData<any>("/dashboard/knowledge-graph");
  const { data: timeline } = useApiData<any>("/dashboard/timeline");

  const company = user?.website
    ? user.website.replace(/^https?:\/\//, "").split("/")[0]
    : "your company";

  return (
    <div data-testid="page-visibility">
      <PageIntro
        eyebrow="Visibility"
        title="How visible are you to AI?"
        subtitle="A clear read on where AI systems place you — and how that's trending."
      />

      <section>
        <h2 className="font-heading text-2xl font-normal text-slate-900">AI Discovery Health</h2>
        <p className="mt-2 text-slate-500">Your standing across the assistants people actually ask.</p>
        <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
          <DiscoveryHealth platforms={health?.platforms || []} />
        </div>
      </section>

      <div className="geo-hairline my-14" />

      <section>
        <h2 className="font-heading text-2xl font-normal text-slate-900">What AI understands about you</h2>
        <p className="mt-2 max-w-2xl text-slate-500">
          GeoAI extracted the products, features, industries, problems, and use cases that AI
          associates with your brand.
        </p>
        <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-4 sm:p-6">
          <KnowledgeGraph company={company} categories={kg?.categories || []} children={kg?.children || {}} />
        </div>
      </section>

      <div className="geo-hairline my-14" />

      <section>
        <h2 className="font-heading text-2xl font-normal text-slate-900">Visibility over time</h2>
        <p className="mt-2 text-slate-500">Calm, directional — not a stock ticker.</p>
        <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
          <TimelineCurves months={timeline?.months || []} series={timeline?.series || []} />
        </div>
      </section>
    </div>
  );
}
