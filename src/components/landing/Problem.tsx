"use client";

export function Problem() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        The Transparency Challenge
      </h2>

      <div className="space-y-4 text-slate-400">
        <p className="text-lg">
          In 2026, <span className="text-white font-semibold">78% of global brands</span> use AI-generated 
          content in their marketing. But regulations are catching up:
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex items-start gap-3">
            <span className="text-amber-400 mt-1">•</span>
            <span>
              <strong className="text-white">EU AI Act</strong> requires "deepfake" labelling from 
              <span className="text-amber-400"> August 2026</span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-400 mt-1">•</span>
            <span>
              <strong className="text-white">California</strong> and <strong className="text-white">China</strong> have 
              AI disclosure requirements in effect
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-400 mt-1">•</span>
            <span>
              <strong className="text-white">61% of marketers</strong> struggle with unclear regulatory guidance
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-amber-400 mt-1">•</span>
            <span>
              <strong className="text-white">63% of consumers</strong> trust AI ads less than human-created content
            </span>
          </li>
        </ul>

        <p className="text-lg mt-6">
          Our tool helps you navigate this complexity with a simple assessment that provides 
          <span className="text-cyan-400"> clear, actionable guidance</span>.
        </p>
      </div>
    </div>
  );
}
