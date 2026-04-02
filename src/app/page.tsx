import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Problem } from "@/components/landing/Problem";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <Hero />
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4">
          <Stats />
        </section>

        {/* Problem Section */}
        <section className="py-16 px-4 border-t border-slate-800">
          <Problem />
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 border-t border-slate-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Check Your Content?
            </h2>
            <p className="text-slate-400 mb-8">
              Get a clear recommendation in under 2 minutes
            </p>
            <a 
              href="/assess"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all"
            >
              Start Free Assessment
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-slate-800">
          <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
            <p>Built for marketers navigating AI transparency requirements</p>
            <p className="mt-2">
              Based on WFA 2026 research, EU AI Act, and global regulations
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
