"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  assessmentQuestions, 
  AssessmentAnswers, 
  defaultAnswers,
  calculateRecommendation,
  generateLabels
} from "@/lib/assessment";

export function AssessmentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(defaultAnswers);

  const totalSteps = assessmentQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = assessmentQuestions[currentStep];

  const handleAnswer = (value: string | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate and save results
      const recommendation = calculateRecommendation(answers);
      const labels = generateLabels(answers, recommendation);
      
      // Store in localStorage for results page
      localStorage.setItem('disclosureAnswers', JSON.stringify(answers));
      localStorage.setItem('disclosureRecommendation', JSON.stringify(recommendation));
      localStorage.setItem('disclosureLabels', JSON.stringify(labels));
      
      router.push('/result');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id as keyof AssessmentAnswers];
    if (currentQuestion.type === 'boolean') {
      return answer !== null;
    }
    return answer !== '' && answer !== null;
  };

  const getCurrentAnswer = () => {
    return answers[currentQuestion.id as keyof AssessmentAnswers];
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2 bg-slate-700" />
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
          {currentQuestion.question}
        </h2>

        {currentQuestion.help && (
          <p className="text-slate-400 text-sm mb-6">
            {currentQuestion.help}
          </p>
        )}

        {/* Boolean Options */}
        {currentQuestion.type === 'boolean' && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className={`flex-1 py-4 px-6 rounded-lg border-2 transition-all ${
                getCurrentAnswer() === true
                  ? 'border-cyan-500 bg-cyan-500/10 text-white'
                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl block mb-1">✓</span>
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`flex-1 py-4 px-6 rounded-lg border-2 transition-all ${
                getCurrentAnswer() === false
                  ? 'border-cyan-500 bg-cyan-500/10 text-white'
                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl block mb-1">✗</span>
              No
            </button>
          </div>
        )}

        {/* Select Options */}
        {currentQuestion.type === 'select' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full py-3 px-4 rounded-lg border-2 text-left transition-all ${
                  getCurrentAnswer() === option.value
                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                    : 'border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-slate-600 text-slate-300"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
          >
            {currentStep === totalSteps - 1 ? 'Get Results' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
