"use client";

import { Regulation, PlatformGuidance } from "@/lib/assessment";

interface RegulationReferenceProps {
  regulations: Regulation[];
  platformGuidance: PlatformGuidance[];
}

export function RegulationReference({ regulations, platformGuidance }: RegulationReferenceProps) {
  return (
    <div className="space-y-6">
      {/* Regulations */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Relevant Regulations
        </h2>
        <div className="space-y-4">
          {regulations.map((reg, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg border-l-4 border-cyan-500">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium text-white">{reg.name}</h3>
                <span className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-300">
                  {reg.region}
                </span>
              </div>
              <p className="text-sm text-slate-400">{reg.requirement}</p>
              {reg.deadline && (
                <p className="text-xs text-amber-400 mt-2">
                  ⏰ Effective: {reg.deadline}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform Guidance */}
      {platformGuidance.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Platform-Specific Guidance
          </h2>
          <div className="space-y-3">
            {platformGuidance.map((guide, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium text-cyan-400 mb-1">{guide.platform}</h3>
                <p className="text-sm text-slate-300 mb-1">{guide.requirement}</p>
                <p className="text-xs text-slate-500">Format: {guide.format}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
