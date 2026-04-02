"use client";

import { DisclosureRecommendation } from "@/lib/assessment";
import { Badge } from "@/components/ui/badge";

interface RecommendationCardProps {
  recommendation: DisclosureRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getRiskColor = () => {
    switch (recommendation.riskLevel) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-amber-500 bg-amber-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-green-500 bg-green-500/10';
    }
  };

  const getRiskBadge = () => {
    switch (recommendation.riskLevel) {
      case 'critical': return <Badge variant="destructive">Critical - Disclosure Required</Badge>;
      case 'high': return <Badge className="bg-amber-500">High Risk</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-black">Medium Risk</Badge>;
      default: return <Badge className="bg-green-500">Low Risk</Badge>;
    }
  };

  return (
    <div className={`rounded-xl border-2 p-6 ${getRiskColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Your Recommendation</h2>
        {getRiskBadge()}
      </div>

      <p className="text-lg text-slate-200 mb-6">
        {recommendation.summary}
      </p>

      <div className="space-y-3">
        <h3 className="font-medium text-slate-300">Key Points:</h3>
        <ul className="space-y-2">
          {recommendation.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 text-slate-400">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
