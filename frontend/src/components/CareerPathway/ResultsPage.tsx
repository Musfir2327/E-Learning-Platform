import React from 'react'
import { Sparkles, Trophy, ArrowRight, HelpCircle, RefreshCw, BarChart2, CheckCircle, GraduationCap, Briefcase } from 'lucide-react'
import type { RecommendationResponse, CareerPathwayItem } from '../../types/career'

interface ResultsPageProps {
  results: RecommendationResponse
  onViewDetails: (pathway: CareerPathwayItem) => void
  onViewShap: () => void
  onRetakeAssessment: () => void
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  results,
  onViewDetails,
  onViewShap,
  onRetakeAssessment
}) => {
  const { top_pathways, predicted_stream, model_used } = results

  return (
    <div className="space-y-8 py-4">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 brand-card p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4F39F6]/20 bg-[#EEF0FF] px-3.5 py-1 text-xs font-bold text-[#4F39F6]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Recommendation Engine Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172B] tracking-tight">Your Recommended Career Pathways</h1>
          <p className="text-xs sm:text-sm text-[#334155] font-semibold">
            Primary ML Predicted Stream: <span className="text-[#4F39F6] font-black">{predicted_stream}</span> (Evaluated via {model_used} Model)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onViewShap}
            className="btn-primary btn-shimmer flex items-center gap-2 py-3 px-5 text-xs font-extrabold cursor-pointer"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Why Was This Recommended?</span>
          </button>

          <button
            type="button"
            onClick={onRetakeAssessment}
            className="btn-secondary flex items-center gap-2 py-3 px-4 text-xs font-bold cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-[#4F39F6]" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Top 5 Recommendation Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#0F172B] tracking-tight">Top 5 Ranked Career Recommendations</h2>
          <span className="text-xs font-semibold text-[#64748B]">Ranked by Personal Compatibility Score</span>
        </div>

        <div className="space-y-6">
          {top_pathways.map((pathway) => (
            <div
              key={pathway.id}
              className="group relative overflow-hidden brand-card p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#4F39F6] text-xs font-black text-white shadow-md shadow-[#4F39F6]/20">
                      #{pathway.rank}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-[#0F172B] group-hover:text-[#4F39F6] transition-colors">
                      {pathway.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-semibold">
                    {pathway.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3 pt-2">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#64748B]">
                        <GraduationCap className="h-3.5 w-3.5 text-[#4F39F6]" />
                        <span>A/L Stream</span>
                      </div>
                      <p className="text-xs font-black text-[#0F172B]">{pathway.stream}</p>
                    </div>

                    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#64748B]">
                        <Trophy className="h-3.5 w-3.5 text-purple-600" />
                        <span>Recommended Degree</span>
                      </div>
                      <p className="text-xs font-black text-[#0F172B]">{pathway.degree}</p>
                    </div>

                    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#64748B]">
                        <Briefcase className="h-3.5 w-3.5 text-sky-600" />
                        <span>Potential Career</span>
                      </div>
                      <p className="text-xs font-black text-[#0F172B]">{pathway.career}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  {pathway.matching_highlights && pathway.matching_highlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">Why this matches:</span>
                      <div className="flex flex-wrap gap-2">
                        {pathway.matching_highlights.map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-[#4F39F6]/20 bg-[#EEF0FF] px-3 py-1 text-[11px] font-bold text-[#4F39F6]"
                          >
                            <CheckCircle className="h-3 w-3 text-[#4F39F6]" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Score & Actions Panel */}
                <div className="flex flex-col items-center justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] pt-4 lg:pt-0 lg:pl-6 shrink-0 min-w-[200px]">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">Match Score</span>
                    <div className="text-4xl font-black text-[#4F39F6]">
                      {pathway.compatibility_score}%
                    </div>
                    <span className="badge-success text-[10px]">
                      Highly Compatible
                    </span>
                  </div>

                  <div className="w-full space-y-2">
                    <button
                      type="button"
                      onClick={() => onViewDetails(pathway)}
                      className="w-full btn-primary btn-shimmer flex items-center justify-center gap-2 py-3 text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onViewShap}
                      className="w-full btn-secondary flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold cursor-pointer"
                    >
                      <HelpCircle className="h-3.5 w-3.5 text-[#4F39F6]" />
                      <span>Why This Match?</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
