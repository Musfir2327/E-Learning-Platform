import React, { useState, useEffect } from 'react'
import { X, BarChart3, Award, RefreshCw } from 'lucide-react'
import type { ModelComparisonResponse } from '../../types/career'
import { fetchModelMetrics } from '../../services/careerPathwayService'

interface ModelAnalyticsModalProps {
  onClose: () => void
}

export const ModelAnalyticsModal: React.FC<ModelAnalyticsModalProps> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<ModelComparisonResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchModelMetrics().then((data) => {
      setMetrics(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-2xl space-y-8 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4F39F6]/20 bg-[#EEF0FF] px-3.5 py-1 text-xs font-bold text-[#4F39F6]">
              <Award className="h-3.5 w-3.5" />
              <span>Research Project ML Evaluation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172B]">Machine Learning Model Performance & Metrics</h2>
            <p className="text-xs sm:text-sm text-[#334155] font-semibold">
              Empirical evaluation comparing Random Forest and XGBoost classifiers trained on GCE A/L student profile datasets.
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <RefreshCw className="h-8 w-8 text-[#4F39F6] animate-spin" />
            <p className="text-xs font-bold text-[#64748B]">Loading model evaluation metrics...</p>
          </div>
        ) : metrics ? (
          <div className="space-y-8">
            {/* Top Cards Comparison */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* XGBoost Card */}
              <div className="rounded-3xl border border-[#4F39F6]/20 bg-[#EEF0FF]/50 p-6 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Model 2 (Active Predictor)</span>
                  <span className="badge-purple text-[10px]">
                    Highest F1 Score
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0F172B]">XGBoost Classifier</h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Accuracy</span>
                    <p className="text-xl font-black text-[#4F39F6]">{(metrics.xgboost.accuracy * 100).toFixed(2)}%</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">F1 Score</span>
                    <p className="text-xl font-black text-purple-600">{metrics.xgboost.f1_score.toFixed(4)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Precision</span>
                    <p className="text-base font-black text-[#0F172B]">{(metrics.xgboost.precision * 100).toFixed(2)}%</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Recall</span>
                    <p className="text-base font-black text-[#0F172B]">{(metrics.xgboost.recall * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Random Forest Card */}
              <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#64748B]">Model 1 (Baseline)</span>
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-[#334155]">
                    Ensemble Trees
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0F172B]">Random Forest Classifier</h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Accuracy</span>
                    <p className="text-xl font-black text-sky-600">{(metrics.random_forest.accuracy * 100).toFixed(2)}%</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">F1 Score</span>
                    <p className="text-xl font-black text-[#0F172B]">{metrics.random_forest.f1_score.toFixed(4)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Precision</span>
                    <p className="text-base font-black text-[#334155]">{(metrics.random_forest.precision * 100).toFixed(2)}%</p>
                  </div>
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748B]">Recall</span>
                    <p className="text-base font-black text-[#334155]">{(metrics.random_forest.recall * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confusion Matrix Table */}
            <div className="space-y-4 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172B] flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#4F39F6]" />
                <span>XGBoost Confusion Matrix (Class Stream Predictions)</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B] font-extrabold">
                      <th className="py-2.5 px-3">Actual Stream \ Predicted</th>
                      {metrics.xgboost.classes.map((cls) => (
                        <th key={cls} className="py-2.5 px-3">{cls}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {metrics.xgboost.confusion_matrix.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white transition-colors">
                        <td className="py-2.5 px-3 font-bold text-[#4F39F6]">{metrics.xgboost.classes[rIdx]}</td>
                        {row.map((val, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-2.5 px-3 font-bold ${
                              rIdx === cIdx ? 'text-[#4F39F6] bg-[#EEF0FF]' : 'text-[#64748B]'
                            }`}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="flex justify-end border-t border-[#E2E8F0] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2.5 px-6 text-xs font-extrabold cursor-pointer"
          >
            Close Metrics
          </button>
        </div>
      </div>
    </div>
  )
}
