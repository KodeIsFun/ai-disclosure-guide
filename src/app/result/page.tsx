"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { LabelGenerator } from "@/components/results/LabelGenerator";
import { RegulationReference } from "@/components/results/RegulationReference";
import { DisclosureRecommendation, GeneratedLabel, AssessmentAnswers } from "@/lib/assessment";

export default function ResultPage() {
  const [mounted, setMounted] = useState(false);
  const [recommendation, setRecommendation] = useState<DisclosureRecommendation | null>(null);
  const [labels, setLabels] = useState<GeneratedLabel[]>([]);
  const [answers, setAnswers] = useState<AssessmentAnswers | null>(null);

  useEffect(() => {
    const rec = localStorage.getItem('disclosureRecommendation');
    const lbl = localStorage.getItem('disclosureLabels');
    const ans = localStorage.getItem('disclosureAnswers');

    if (rec) setRecommendation(JSON.parse(rec));
    if (lbl) setLabels(JSON.parse(lbl));
    if (ans) setAnswers(JSON.parse(ans));
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No assessment found</p>
          <Link href="/assess">
            <Button>Start Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm">
          ← Back to home
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">
          Your Disclosure Recommendation
        </h1>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Recommendation */}
        <RecommendationCard recommendation={recommendation} />

        {/* Label Generator */}
        <LabelGenerator labels={labels} />

        {/* Regulations & Platform Guidance */}
        <RegulationReference 
          regulations={recommendation.regulations}
          platformGuidance={recommendation.platformGuidance}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link href="/assess" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-300"
            >
              Assess Another Content
            </Button>
          </Link>
          <Link href="/guide" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-300"
            >
              View Full Guidelines
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
