// Assessment types and logic for AI Content Disclosure Guide

export interface AssessmentAnswers {
  contentType: 'image' | 'video' | 'text' | 'audio' | 'mixed' | '';
  hasHumanLikeness: boolean | null;
  isSyntheticVoice: boolean | null;
  isProductImagery: boolean | null;
  useCase: 'ads' | 'social' | 'email' | 'website' | 'packaging' | 'other' | '';
  aiToolCategory: 'image-gen' | 'video-gen' | 'text-gen' | 'voice-gen' | 'editing' | 'mixed' | '';
  humanEditingLevel: 'minimal' | 'moderate' | 'extensive' | '';
  makesClaims: boolean | null;
  isTestimonial: boolean | null;
}

export interface DisclosureRecommendation {
  needsDisclosure: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  details: string[];
  regulations: Regulation[];
  platformGuidance: PlatformGuidance[];
}

export interface Regulation {
  name: string;
  region: string;
  requirement: string;
  deadline?: string;
  url?: string;
}

export interface PlatformGuidance {
  platform: string;
  requirement: string;
  format: string;
}

export interface GeneratedLabel {
  type: 'badge' | 'text' | 'hashtag';
  content: string;
  html?: string;
  css?: string;
}

// Calculate disclosure recommendation based on answers
export function calculateRecommendation(answers: AssessmentAnswers): DisclosureRecommendation {
  const recommendations: string[] = [];
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
  const regulations: Regulation[] = [];
  const platformGuidance: PlatformGuidance[] = [];

  // Critical: Human likenesses / deepfakes
  if (answers.hasHumanLikeness) {
    riskLevel = 'critical';
    recommendations.push('AI-generated human likenesses MUST be disclosed under most regulations');
    regulations.push({
      name: 'EU AI Act',
      region: 'European Union',
      requirement: 'Mandatory labelling of "deep fakes" - AI-generated images, video, or audio of real persons',
      deadline: 'August 2026'
    });
    regulations.push({
      name: 'California AB 3210',
      region: 'California, USA',
      requirement: 'Disclosure required for synthetic media in political advertising'
    });
  }

  // High: Synthetic voice
  if (answers.isSyntheticVoice) {
    riskLevel = riskLevel === 'critical' ? 'critical' : 'high';
    recommendations.push('AI-generated or cloned voices require disclosure, especially in ads');
    regulations.push({
      name: 'FTC Guidelines',
      region: 'United States',
      requirement: 'Endorsements must reflect honest opinions - synthetic voices must be disclosed'
    });
  }

  // High: Product imagery with claims
  if (answers.isProductImagery && answers.makesClaims) {
    riskLevel = riskLevel === 'critical' ? 'critical' : 'high';
    recommendations.push('AI-generated product images making claims should be disclosed to avoid misleading consumers');
    regulations.push({
      name: 'FTC Act Section 5',
      region: 'United States',
      requirement: 'Prohibits deceptive practices - AI-enhanced product claims may be considered deceptive without disclosure'
    });
  }

  // Medium: Testimonials
  if (answers.isTestimonial) {
    riskLevel = ['critical', 'high'].includes(riskLevel) ? riskLevel : 'medium';
    recommendations.push('AI-generated testimonials must always be disclosed as synthetic');
    regulations.push({
      name: 'FTC Endorsement Guides',
      region: 'United States',
      requirement: 'Material connections and synthetic endorsements must be disclosed'
    });
  }

  // Medium: Advertising use case
  if (answers.useCase === 'ads') {
    if (!['critical', 'high'].includes(riskLevel)) {
      riskLevel = 'medium';
    }
    recommendations.push('Advertising content faces higher scrutiny - disclosure builds trust');
    platformGuidance.push({
      platform: 'Meta (Facebook/Instagram)',
      requirement: 'Recommended disclosure for AI-generated content in ads',
      format: '"Created with AI" label or hashtag #AIGenerated'
    });
    platformGuidance.push({
      platform: 'Google Ads',
      requirement: 'Disclosure required for synthetic content',
      format: 'In-ad disclosure or landing page notice'
    });
    platformGuidance.push({
      platform: 'TikTok',
      requirement: 'AI-generated label available for content',
      format: 'Use TikTok\'s AI-generated content label'
    });
  }

  // Low-Medium: Minimal editing
  if (answers.humanEditingLevel === 'minimal' && !answers.hasHumanLikeness && !answers.isSyntheticVoice) {
    recommendations.push('Consider disclosure even for minimal AI involvement - transparency builds consumer trust');
  }

  // Low: Extensive human editing
  if (answers.humanEditingLevel === 'extensive' && !answers.hasHumanLikeness && !answers.isSyntheticVoice && !answers.isProductImagery) {
    recommendations.push('With extensive human editing, disclosure is recommended but lower priority');
    if (riskLevel === 'low') {
      recommendations.push('Your content has been significantly transformed by human creativity');
    }
  }

  // Add general regulations
  regulations.push({
    name: 'China Deep Synthesis Regulation',
    region: 'China',
    requirement: 'Mandatory labelling of AI-generated content',
    deadline: 'In effect since January 2023'
  });

  // Default if no specific issues
  if (recommendations.length === 0) {
    recommendations.push('Based on your answers, disclosure is recommended but not strictly required');
    recommendations.push('Consumer trust research shows 82% of people value transparency about AI use');
  }

  // Determine if disclosure is needed
  const needsDisclosure: boolean = ['critical', 'high'].includes(riskLevel) || 
    answers.hasHumanLikeness === true || 
    answers.isSyntheticVoice === true || 
    answers.isTestimonial === true;

  return {
    needsDisclosure,
    riskLevel,
    summary: getRiskSummary(riskLevel, needsDisclosure),
    details: recommendations,
    regulations,
    platformGuidance
  };
}

function getRiskSummary(riskLevel: string, needsDisclosure: boolean): string {
  if (riskLevel === 'critical') {
    return '⚠️ Disclosure Required - Your content contains elements that must be disclosed under current regulations';
  }
  if (riskLevel === 'high') {
    return '🔶 Strongly Recommended - Your content type faces regulatory scrutiny and consumer expectations for disclosure';
  }
  if (riskLevel === 'medium') {
    return '🟡 Recommended - Disclosure would build trust and align with emerging best practices';
  }
  return '✅ Lower Priority - Your content may not require disclosure, but transparency is always valued by consumers';
}

// Generate disclosure labels
export function generateLabels(answers: AssessmentAnswers, recommendation: DisclosureRecommendation): GeneratedLabel[] {
  const labels: GeneratedLabel[] = [];

  // Text labels
  if (answers.hasHumanLikeness) {
    labels.push({
      type: 'text',
      content: 'This image/video has been generated or modified using artificial intelligence.',
    });
    labels.push({
      type: 'text',
      content: 'AI-generated imagery used for illustrative purposes.',
    });
  }

  if (answers.isSyntheticVoice) {
    labels.push({
      type: 'text',
      content: 'Voice generated using AI technology.',
    });
  }

  if (answers.isProductImagery) {
    labels.push({
      type: 'text',
      content: 'Product imagery enhanced with AI.',
    });
  }

  // Generic disclosure
  labels.push({
    type: 'text',
    content: 'This content was created with the assistance of AI.',
  });

  // Hashtag options
  labels.push({
    type: 'hashtag',
    content: '#AIGenerated #AIContent #MadeWithAI',
  });

  // HTML badge
  labels.push({
    type: 'badge',
    content: 'AI-Generated',
    html: `<span style="background: linear-gradient(135deg, #06b6d4, #3b82f6); color: white; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;">AI-Generated Content</span>`,
    css: `.ai-badge {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  color: white;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}`
  });

  return labels;
}

// Key statistics for landing page
export const keyStats = [
  { value: '78%', label: 'of brands use AI in marketing content' },
  { value: '82%', label: 'say transparency is essential for trust' },
  { value: '61%', label: 'struggle with unclear regulations' },
  { value: '63%', label: 'trust AI ads less than human content' },
];

// Assessment questions
export const assessmentQuestions = [
  {
    id: 'contentType',
    question: 'What type of content are you creating?',
    type: 'select',
    options: [
      { value: 'image', label: '📷 Image / Graphic' },
      { value: 'video', label: '🎬 Video' },
      { value: 'text', label: '📝 Text / Copy' },
      { value: 'audio', label: '🎵 Audio / Voice' },
      { value: 'mixed', label: '🎨 Mixed Media' },
    ]
  },
  {
    id: 'hasHumanLikeness',
    question: 'Does the content include AI-generated human faces, bodies, or likenesses?',
    type: 'boolean',
    help: 'This includes deepfakes, AI-generated people, or synthetic modifications to real people\'s images'
  },
  {
    id: 'isSyntheticVoice',
    question: 'Does the content use AI-generated or cloned voices?',
    type: 'boolean',
    help: 'Text-to-speech, voice cloning, or AI voiceovers'
  },
  {
    id: 'isProductImagery',
    question: 'Is this product imagery or does it show your product?',
    type: 'boolean',
    help: 'AI-generated or AI-enhanced product photos, mockups, or demonstrations'
  },
  {
    id: 'useCase',
    question: 'Where will this content be used?',
    type: 'select',
    options: [
      { value: 'ads', label: '📺 Paid Advertising' },
      { value: 'social', label: '📱 Social Media (organic)' },
      { value: 'email', label: '📧 Email Marketing' },
      { value: 'website', label: '🌐 Website / Landing Page' },
      { value: 'packaging', label: '📦 Product Packaging' },
      { value: 'other', label: '📁 Other' },
    ]
  },
  {
    id: 'aiToolCategory',
    question: 'What type of AI tool was primarily used?',
    type: 'select',
    options: [
      { value: 'image-gen', label: '🖼️ Image Generation (Midjourney, DALL-E, etc.)' },
      { value: 'video-gen', label: '🎥 Video Generation (Runway, Sora, etc.)' },
      { value: 'text-gen', label: '✍️ Text Generation (ChatGPT, Claude, etc.)' },
      { value: 'voice-gen', label: '🗣️ Voice Generation (ElevenLabs, etc.)' },
      { value: 'editing', label: '✨ AI Editing/Enhancement (Photoshop AI, etc.)' },
      { value: 'mixed', label: '🔀 Multiple AI Tools' },
    ]
  },
  {
    id: 'humanEditingLevel',
    question: 'How much human editing/refinement was applied after AI generation?',
    type: 'select',
    options: [
      { value: 'minimal', label: 'Minimal - Used AI output mostly as-is' },
      { value: 'moderate', label: 'Moderate - Some editing and refinement' },
      { value: 'extensive', label: 'Extensive - Heavily modified by humans' },
    ]
  },
  {
    id: 'makesClaims',
    question: 'Does the content make claims about products, services, or results?',
    type: 'boolean',
    help: 'Performance claims, before/after, testimonials, etc.'
  },
  {
    id: 'isTestimonial',
    question: 'Is this a testimonial, review, or endorsement?',
    type: 'boolean',
    help: 'Customer quotes, reviews, influencer endorsements'
  },
];

// Default empty answers
export const defaultAnswers: AssessmentAnswers = {
  contentType: '',
  hasHumanLikeness: null,
  isSyntheticVoice: null,
  isProductImagery: null,
  useCase: '',
  aiToolCategory: '',
  humanEditingLevel: '',
  makesClaims: null,
  isTestimonial: null,
};
