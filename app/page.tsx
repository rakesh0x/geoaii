"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheShift from "@/components/TheShift";
import TheProblem from "@/components/TheProblem";
import HowItWorks from "@/components/HowItWorks";
import TheSolution from "@/components/TheSolution";
import ProductPreview from "@/components/ProductPreview";
import WhyNow from "@/components/WhyNow";
import Vision from "@/components/Vision";
import SocialProof from "@/components/SocialProof";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="App font-body text-slate-900 overflow-x-hidden" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <TheShift />
        <TheProblem />
        <HowItWorks />
        <TheSolution />
        <ProductPreview />
        <WhyNow />
        <Vision />
        <SocialProof />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
