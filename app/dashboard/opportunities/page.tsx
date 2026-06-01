"use client";

import { useApiData } from "@/hooks/useApiData";
import { PageIntro } from "@/components/dashboard/primitives";
import OpportunityLandscape from "@/components/dashboard/OpportunityLandscape";

export default function Opportunities() {
  const { data } = useApiData<{ topics: { topic: string; status: string; visibility: number }[] }>("/dashboard/opportunities");
  const topics = data?.topics || [];
  const missed = topics.filter((t) => t.status === "missed").length;

  return (
    <div data-testid="page-opportunities">
      <PageIntro
        eyebrow="Discovery Opportunities"
        title="The landscape of where you could be found."
        subtitle="Each topic is a place customers ask AI for recommendations. Larger, glowing nodes are where you already show up — faded ones are waiting to be claimed."
      />

      {missed > 0 && (
        <p className="mb-6 text-sm text-slate-500">
          <span className="font-semibold text-slate-900">{missed} high-value topics</span> are completely missed today.
        </p>
      )}

      <OpportunityLandscape topics={topics} />
    </div>
  );
}
