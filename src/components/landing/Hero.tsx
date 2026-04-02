"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Updated for EU AI Act 2026
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Should You Disclose{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          AI Content?
        </span>
      </h1>

      <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
        Navigate AI content transparency with confidence. Get clear guidance on when and how to disclose AI-generated content in your marketing.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/assess">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 h-12"
          >
            Start Assessment
          </Button>
        </Link>
        <Link href="/guide">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 h-12"
          >
            View Guidelines
          </Button>
        </Link>
      </div>
    </div>
  );
}
