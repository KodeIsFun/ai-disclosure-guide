"use client";

import { useState } from "react";
import { GeneratedLabel } from "@/lib/assessment";

interface LabelGeneratorProps {
  labels: GeneratedLabel[];
}

export function LabelGenerator({ labels }: LabelGeneratorProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const textLabels = labels.filter(l => l.type === 'text');
  const hashtags = labels.filter(l => l.type === 'hashtag');
  const badges = labels.filter(l => l.type === 'badge');

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Ready-to-Use Disclosure Labels
      </h2>

      {/* Text Labels */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Text Disclosures</h3>
        <div className="space-y-2">
          {textLabels.map((label, index) => (
            <div 
              key={index}
              className="flex items-center justify-between gap-4 p-3 bg-slate-700/50 rounded-lg"
            >
              <span className="text-slate-200 text-sm">{label.content}</span>
              <button
                onClick={() => copyToClipboard(label.content, index)}
                className="text-xs px-3 py-1 rounded bg-slate-600 hover:bg-slate-500 text-slate-200 whitespace-nowrap"
              >
                {copiedIndex === index ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Hashtags for Social</h3>
        <div className="p-3 bg-slate-700/50 rounded-lg">
          {hashtags.map((label, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-cyan-400">{label.content}</span>
              <button
                onClick={() => copyToClipboard(label.content, textLabels.length + index)}
                className="text-xs px-3 py-1 rounded bg-slate-600 hover:bg-slate-500 text-slate-200"
              >
                {copiedIndex === textLabels.length + index ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HTML Badge */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3">Website Badge (HTML)</h3>
        {badges.map((badge, index) => (
          <div key={index} className="space-y-3">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-400 mb-3">Preview:</p>
              <div 
                className="inline-block"
                dangerouslySetInnerHTML={{ __html: badge.html || '' }}
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {badge.html}
              </pre>
            </div>
            <button
              onClick={() => copyToClipboard(badge.html || '', textLabels.length + hashtags.length + index)}
              className="w-full py-2 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm"
            >
              {copiedIndex === textLabels.length + hashtags.length + index ? '✓ Copied to Clipboard' : 'Copy HTML'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
