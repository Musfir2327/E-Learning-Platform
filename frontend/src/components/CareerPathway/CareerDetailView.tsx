import React from 'react'
import { X, Trophy, GraduationCap, Briefcase, Wrench, Sparkles, HeartHandshake } from 'lucide-react'
import type { CareerPathwayItem } from '../../types/career'

interface CareerDetailViewProps {
  pathway: CareerPathwayItem
  onClose: () => void
  onOpenShap: () => void
}

export const CareerDetailView: React.FC<CareerDetailViewProps> = ({
  pathway,
  onClose,
  onOpenShap
}) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl space-y-8 my-8">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-[#4F39F6] text-xs font-black text-white shadow-sm">
                #{pathway.rank}
              </span>
              <span className="badge-purple text-xs">
                Compatibility: {pathway.compatibility_score}%
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172B]">{pathway.title}</h2>
            <p className="text-xs sm:text-sm text-[#334155] font-semibold leading-relaxed">{pathway.description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#EEF0FF] hover:text-[#4F39F6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Clean Timeline / Roadmap */}
        <div className="space-y-4 rounded-2xl border border-[#4F39F6]/20 bg-[#EEF0FF]/50 p-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#4F39F6] flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Career Pathway Execution Roadmap</span>
          </h3>

          <div className="grid gap-4 md:grid-cols-4 relative">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2 relative shadow-xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#4F39F6]">
                <GraduationCap className="h-4 w-4" />
                <span>1. A/L Stream</span>
              </div>
              <p className="text-xs font-bold text-[#0F172B]">{pathway.stream}</p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-purple-600">
                <Trophy className="h-4 w-4" />
                <span>2. Degree Program</span>
              </div>
              <p className="text-xs font-bold text-[#0F172B]">{pathway.degree}</p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-sky-600">
                <Wrench className="h-4 w-4" />
                <span>3. Key Skills</span>
              </div>
              <p className="text-xs font-bold text-[#0F172B]">{pathway.required_skills.slice(0, 3).join(', ')}</p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#10B981]">
                <Briefcase className="h-4 w-4" />
                <span>4. Job Role</span>
              </div>
              <p className="text-xs font-bold text-[#0F172B]">{pathway.career}</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Required Skills */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172B] flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#4F39F6]" />
              <span>Required Core Competencies & Skills</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {pathway.required_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-bold text-[#334155] shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Related Interests & Personality */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172B] flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-purple-600" />
              <span>Related Personality & Field Attributes</span>
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#0F172B] font-bold">
                <span className="text-[#64748B] font-medium">Field Interests:</span>{' '}
                {pathway.related_interests.map((i) => i.toUpperCase()).join(', ')}
              </p>
              <p className="text-[#0F172B] font-bold">
                <span className="text-[#64748B] font-medium">RIASEC Personality Traits:</span>{' '}
                {pathway.related_personality.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] pt-6">
          <button
            type="button"
            onClick={onOpenShap}
            className="btn-primary btn-shimmer flex items-center gap-2 py-3 px-5 text-xs font-extrabold cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Why Was This Recommended? (SHAP Analysis)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-3 px-6 text-xs font-extrabold cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
