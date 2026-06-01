"use client";

import { useApiData } from "@/hooks/useApiData";
import { PageIntro } from "@/components/dashboard/primitives";
import CompetitorCompare from "@/components/dashboard/CompetitorCompare";

export default function Competitors() {
  const { data } = useApiData<{ metrics: string[]; entities: { name: string; self: boolean; scores: Record<string, number> }[] }>("/dashboard/competitors");

  return (
    <div data-testid="page-competitors">
      <PageIntro
        eyebrow="Competitors"
        title="How you compare in the eyes of AI."
        subtitle="Not raw numbers — the signals that decide who AI trusts and recommends."
      />

      <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-10">
        <CompetitorCompare metrics={data?.metrics || []} entities={data?.entities || []} />
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 px-6 py-5 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">The takeaway:</span> your biggest unlock is{" "}
        <span className="text-indigo-700">authority and coverage</span>. Stronger evidence and broader
        topic presence are what move you into more answers.
      </div>
    </div>
  );
}
