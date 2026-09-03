import React from 'react'
import { Sparkles, Brain, ArrowRight, CheckCircle2, Compass, BarChart3 } from 'lucide-react'

interface LandingSectionProps {
  onStartAssessment: () => void
  onHowItWorksClick: () => void
  onOpenModelAnalytics: () => void
}

export const LandingSection: React.FC<LandingSectionProps> = ({
  onStartAssessment,
  onHowItWorksClick,
  onOpenModelAnalytics
}) => {
  return (
    <div className="space-y-12 py-4">
      {/* Research Project Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#4F39F6]/20 bg-[#EEF0FF]/60 p-5 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">
                Final Year Research Project
              </span>
              <span className="badge-purple text-[10px]">
                AI / ML Powered
              </span>
            </div>
            <p className="text-xs text-[#334155] font-semibold">
              Smart Career Pathway Recommendation System for Advanced Level Students Using Machine Learning
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenModelAnalytics}
          className="btn-secondary flex items-center gap-2 py-2.5 px-4 text-xs font-extrabold cursor-pointer"
        >
          <BarChart3 className="h-4 w-4 text-[#4F39F6]" />
          <span>View Model Accuracy & Metrics</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12 lg:p-14 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4F39F6]/20 bg-[#EEF0FF] px-4 py-1.5 text-xs font-bold text-[#4F39F6]">
            <Sparkles className="h-4 w-4" />
            <span>Intelligent GCE A/L & Degree Guidance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172B] leading-tight">
            Discover Your Ideal <br />
            <span className="text-gradient-brand">
              Career Pathway
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[#334155] font-semibold">
            Make informed decisions about your A/L stream, degree program, and future career using intelligent data-driven recommendations tailored specifically for Sri Lankan Advanced Level students.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onStartAssessment}
              className="btn-primary btn-shimmer flex items-center gap-2.5 cursor-pointer"
            >
              <span>Start Career Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onHowItWorksClick}
              className="btn-secondary flex items-center gap-2 cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#4F39F6]" />
              <span>How It Works</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-[#64748B] border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#4F39F6]" />
              <span>Top 5 Ranked Pathways</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#4F39F6]" />
              <span>SHAP Explainable AI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#4F39F6]" />
              <span>Holland RIASEC Profiling</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works-section" className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Simple 4-Step Process</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172B] tracking-tight">How LearnHub Recommends Your Path</h2>
          <p className="text-xs text-[#64748B] font-semibold">
            Our multi-dimensional machine learning pipeline evaluates academic performance, personality traits, and personal aspirations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="brand-card p-6 space-y-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF0FF] text-[#4F39F6] text-lg font-black border border-[#4F39F6]/20">
              1
            </div>
            <h3 className="text-base font-black text-[#0F172B]">1. Tell Us About You</h3>
            <p className="text-xs text-[#334155] leading-relaxed font-semibold">
              Complete a guided assessment covering your 9 O/L subject grades, subject interests, RIASEC personality scores, and extracurricular activities.
            </p>
          </div>

          <div className="brand-card p-6 space-y-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 text-lg font-black border border-purple-200">
              2
            </div>
            <h3 className="text-base font-black text-[#0F172B]">2. AI Analyses Profile</h3>
            <p className="text-xs text-[#334155] leading-relaxed font-semibold">
              Random Forest and XGBoost classifiers process your multi-dimensional profile against Sri Lankan GCE A/L historical stream outcomes.
            </p>
          </div>

          <div className="brand-card p-6 space-y-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-600 text-lg font-black border border-sky-200">
              3
            </div>
            <h3 className="text-base font-black text-[#0F172B]">3. Get Pathways</h3>
            <p className="text-xs text-[#334155] leading-relaxed font-semibold">
              Receive your Top 5 ranked career pathways complete with recommended A/L Stream, Degree Program, Career Roles, and compatibility scores.
            </p>
          </div>

          <div className="brand-card p-6 space-y-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ECFDF5] text-[#10B981] text-lg font-black border border-[#10B981]/20">
              4
            </div>
            <h3 className="text-base font-black text-[#0F172B]">4. Explainable AI</h3>
            <p className="text-xs text-[#334155] leading-relaxed font-semibold">
              Explore SHAP (Explainable AI) charts showing exactly which academic grades, personality traits, and interests influenced your recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
