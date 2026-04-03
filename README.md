# AI Content Disclosure Guide

> Help marketers navigate AI transparency regulations with confidence.

A Next.js application that guides marketers through the complex landscape of AI content disclosure requirements. Built to address the growing need for transparency in AI-generated marketing content.

## 🎯 The Problem

- **78% of brands** use AI-generated content
- **82% say transparency is essential** but **61% are confused by regulations**
- **EU AI Act** requires AI content labeling from August 2026
- No dominant solution exists in a fragmented market

## ✨ Features

### 🔍 Interactive Assessment
- Step-by-step questionnaire about your content
- Analyzes AI involvement level, content type, and target audience
- Determines disclosure requirements based on jurisdiction

### 📋 Smart Recommendations
- Clear guidance on when and how to label AI content
- Risk level assessment (low/medium/high)
- Platform-specific recommendations

### 🏷️ Label Generator
- Generate disclosure badges and copy for different platforms
- Ready-to-use disclosure statements
- Customizable templates

### 📚 Regulation Reference
- EU AI Act requirements
- California AI transparency laws
- China AI content regulations
- WFA (World Federation of Advertisers) guidance

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/KodeIsFun/ai-disclosure-guide.git

# Install dependencies
cd ai-disclosure-guide
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the app.

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Lucide Icons** - Clean iconography

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── assess/page.tsx   # Assessment questionnaire
│   ├── result/page.tsx   # Results & recommendations
│   └── guide/page.tsx    # Regulation reference
├── components/
│   ├── landing/          # Hero, Stats, Problem sections
│   ├── assessment/       # Assessment form components
│   ├── results/          # Label generator, recommendations
│   └── ui/               # shadcn/ui components
└── lib/
    └── assessment.ts     # Assessment logic & scoring
```

## 🎓 How It Works

1. **Describe Your Content** - Answer questions about AI involvement, content type, and distribution
2. **Get Analyzed** - The app assesses disclosure requirements based on regulations
3. **Receive Guidance** - Get clear recommendations and risk assessment
4. **Generate Labels** - Create compliant disclosure statements for your platforms

## 🌍 Supported Regulations

| Regulation | Status | Region |
|------------|--------|--------|
| EU AI Act | Enforced Aug 2026 | European Union |
| California AI Laws | Active | California, USA |
| China AI Content Rules | Active | China |
| WFA Guidance | April 2026 | Global |

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ to help marketers navigate the AI transparency landscape.
