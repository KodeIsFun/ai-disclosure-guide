"use client";

import { useEffect, useState } from "react";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";

export default function AssessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      {/* Header */}
      <header className="max-w-2xl mx-auto mb-8">
        <a href="/" className="text-slate-400 hover:text-slate-200 text-sm">
          ← Back to home
        </a>
        <h1 className="text-2xl font-bold text-white mt-4">
          Disclosure Assessment
        </h1>
        <p className="text-slate-400 mt-1">
          Answer a few questions to get your recommendation
        </p>
      </header>

      {/* Form */}
      <AssessmentForm />
    </main>
  );
}
