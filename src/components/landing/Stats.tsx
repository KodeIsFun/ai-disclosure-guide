"use client";

import { keyStats } from "@/lib/assessment";

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {keyStats.map((stat, index) => (
        <div 
          key={index} 
          className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700"
        >
          <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
