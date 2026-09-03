import React from 'react'
import { X, Sparkles, TrendingUp, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import type { FeatureContribution } from '../../types/career'

interface ShapExplanationModalProps {
  explanations: FeatureContribution[]
  modelName: string
  predictedStream: string
  onClose: () => void
}

export const ShapExplanationModal: React.FC<ShapExplanationModalProps> = ({
  explanations,
  modelName,
  predictedStream,
  onClose
}) => {
  const chartData = explanations.map((item) => ({
    name: item.feature_name_formatted,
    value: item.contribution,
    description: item.description
  }))

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl space-y-8 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4F39F6]/20 bg-[#EEF0FF] px-3.5 py-1 text-xs font-bold text-[#4F39F6]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Explainable AI (SHAP Framework)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172B]">Why Was This Recommended?</h2>
            <p className="text-xs sm:text-sm text-[#334155] font-semibold">
              These are the key student profile factors that influenced the <span className="text-[#4F39F6] font-black">{modelName}</span> prediction for <span className="text-[#4F39F6] font-black">{predictedStream}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#EEF0FF] hover:text-[#4F39F6] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Recharts Feature Contribution Chart */}
        <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172B] flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#4F39F6]" />
            <span>SHAP Feature Attribution Plot</span>
          </h3>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={(val) => `${val > 0 ? '+' : ''}${val.toFixed(2)}`} />
                <YAxis dataKey="name" type="category" stroke="#0F172B" fontSize={11} width={170} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xl space-y-1">
                          <p className="text-xs font-bold text-[#0F172B]">{data.name}</p>
                          <p className="text-xs font-black text-[#4F39F6]">
                            Contribution: {data.value > 0 ? '+' : ''}{data.value.toFixed(4)}
                          </p>
                          <p className="text-[11px] text-[#334155] font-semibold leading-tight">{data.description}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <ReferenceLine x={0} stroke="#CBD5E1" />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.value >= 0 ? '#4F39F6' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Narrative Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#64748B] flex items-center gap-2">
            <Info className="h-4 w-4 text-[#4F39F6]" />
            <span>Detailed Feature Impact Breakdown</span>
          </h4>

          <div className="space-y-2">
            {explanations.map((exp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#0F172B]">{exp.feature_name_formatted}</p>
                  <p className="text-[11px] text-[#64748B] font-semibold">{exp.description}</p>
                </div>

                <div
                  className={`rounded-xl px-3 py-1 text-xs font-extrabold shrink-0 ${
                    exp.contribution >= 0
                      ? 'bg-[#EEF0FF] text-[#4F39F6] border border-[#4F39F6]/20'
                      : 'bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20'
                  }`}
                >
                  {exp.contribution >= 0 ? '+' : ''}{exp.contribution.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#E2E8F0] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2.5 px-6 text-xs font-extrabold cursor-pointer"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  )
}
