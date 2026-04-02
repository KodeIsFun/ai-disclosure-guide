import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const regulations = [
  {
    name: "EU AI Act",
    region: "European Union",
    status: "In Force",
    deadline: "August 2026",
    requirements: [
      "Mandatory labelling of 'deep fakes' - AI-generated images, audio, or video depicting real persons",
      "Disclosure when AI systems generate or manipulate content that appears authentic",
      "Applies to all marketing content targeting EU consumers"
    ],
    penalties: "Up to €35 million or 7% of global annual turnover"
  },
  {
    name: "California AB 3210",
    region: "California, USA",
    status: "In Force",
    deadline: "January 2025",
    requirements: [
      "Disclosure required for synthetic media in political advertising",
      "Clear labeling of AI-generated content in consumer-facing materials"
    ],
    penalties: "Civil penalties and injunctions"
  },
  {
    name: "China Deep Synthesis Regulation",
    region: "China",
    status: "In Force",
    deadline: "January 2023",
    requirements: [
      "Mandatory labelling of all AI-generated content",
      "Special requirements for news media and social platforms",
      "Watermarking requirements for AI-generated images"
    ],
    penalties: "Fines and service suspension"
  },
  {
    name: "FTC Guidelines",
    region: "United States",
    status: "Updated 2024",
    deadline: "Ongoing",
    requirements: [
      "Endorsements must reflect honest opinions",
      "Synthetic endorsements must be disclosed",
      "Deceptive AI practices prohibited under Section 5"
    ],
    penalties: "Enforcement actions and fines"
  }
];

const platformPolicies = [
  {
    platform: "Meta (Facebook/Instagram)",
    icon: "📘",
    policy: "AI-generated content labels available. Recommended for ads with synthetic content.",
    format: "#AIGenerated or in-app label"
  },
  {
    platform: "Google Ads",
    icon: "🔍",
    policy: "Disclosure required for synthetic content in ads.",
    format: "In-ad disclosure or landing page notice"
  },
  {
    platform: "TikTok",
    icon: "🎵",
    policy: "AI-generated content label available for all posts.",
    format: "Use TikTok's AI-generated label"
  },
  {
    platform: "YouTube",
    icon: "📺",
    policy: "Disclosure required in video description for synthetic content.",
    format: "Video description + on-screen disclosure"
  },
  {
    platform: "Twitter/X",
    icon: "🐦",
    policy: "Community notes may flag undisclosed AI content.",
    format: "#AI or community label"
  }
];

const bestPractices = [
  {
    title: "Always Disclose Human Likenesses",
    description: "AI-generated people, deepfakes, and synthetic voices must always be disclosed. This is non-negotiable across all major regulations.",
    priority: "critical"
  },
  {
    title: "Be Proactive, Not Reactive",
    description: "Don't wait for regulations to force disclosure. Consumer trust is built through transparency, and 82% of people value it.",
    priority: "high"
  },
  {
    title: "Use Platform Labels When Available",
    description: "TikTok, Meta, and YouTube offer built-in AI content labels. Use them - they're more trusted than text disclosures.",
    priority: "high"
  },
  {
    title: "Document Your AI Usage",
    description: "Keep records of which AI tools were used and how content was modified. This helps with compliance and demonstrates good faith.",
    priority: "medium"
  },
  {
    title: "Consider the Context",
    description: "Higher scrutiny contexts (ads, health claims, financial products) require more careful disclosure than casual social posts.",
    priority: "medium"
  }
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <a href="/" className="text-slate-400 hover:text-slate-200 text-sm">
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold text-white mt-4">
            AI Content Disclosure Guide
          </h1>
          <p className="text-slate-400 mt-2">
            Everything you need to know about AI content transparency requirements
          </p>
        </header>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Best Practices</h2>
          <div className="space-y-4">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Badge 
                      variant={practice.priority === 'critical' ? 'destructive' : practice.priority === 'high' ? 'default' : 'secondary'}
                      className="mt-0.5"
                    >
                      {practice.priority}
                    </Badge>
                    <div>
                      <h3 className="font-medium text-white">{practice.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{practice.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regulations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Global Regulations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {regulations.map((reg, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{reg.name}</CardTitle>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {reg.region}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">Effective: {reg.deadline}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {reg.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-amber-400 mt-4">
                    Penalties: {reg.penalties}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Platform Policies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Platform Policies</h2>
          <div className="space-y-4">
            {platformPolicies.map((platform, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{platform.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{platform.platform}</h3>
                      <p className="text-sm text-slate-400 mt-1">{platform.policy}</p>
                      <p className="text-xs text-cyan-400 mt-2">
                        Format: {platform.format}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-slate-800">
          <p className="text-slate-400 mb-4">
            Ready to check your specific content?
          </p>
          <a 
            href="/assess"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all"
          >
            Start Assessment
          </a>
        </section>
      </div>
    </main>
  );
}
