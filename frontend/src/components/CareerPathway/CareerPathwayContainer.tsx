import React, { useState } from 'react'
import { Brain, Loader2 } from 'lucide-react'
import type { StudentAssessmentData, RecommendationResponse, CareerPathwayItem } from '../../types/career'
import { submitCareerAssessment } from '../../services/careerPathwayService'

import { LandingSection } from './LandingSection'
import { AssessmentForm } from './AssessmentForm'
import { ResultsPage } from './ResultsPage'
import { CareerDetailView } from './CareerDetailView'
import { ShapExplanationModal } from './ShapExplanationModal'
import { ModelAnalyticsModal } from './ModelAnalyticsModal'

export const CareerPathwayContainer: React.FC = () => {
  const [viewState, setViewState] = useState<'landing' | 'assessment' | 'results'>('landing')
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<RecommendationResponse | null>(null)
  
  // Modals
  const [selectedPathway, setSelectedPathway] = useState<CareerPathwayItem | null>(null)
  const [showShapModal, setShowShapModal] = useState<boolean>(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<boolean>(false)

  const handleStartAssessment = () => {
    setViewState('assessment')
  }

  const handleFormSubmit = async (formData: StudentAssessmentData) => {
    setLoading(true)
    try {
      const data = await submitCareerAssessment(formData)
      setResults(data)
      setViewState('results')
    } catch (err) {
      console.error('Error generating recommendation:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHowItWorksClick = () => {
    const el = document.getElementById('how-it-works-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="brand-card bg-white border border-[#E2E8F0] p-8 text-center shadow-2xl space-y-4 max-w-md w-full rounded-3xl">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#EEF0FF] border border-[#4F39F6]/20 text-[#4F39F6] shadow-sm">
              <Brain className="h-8 w-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-[#0F172B]">AI Models Processing Profile</h3>
            <p className="text-xs text-[#334155] font-semibold leading-relaxed">
              Evaluating O/L academic grades, RIASEC personality scores, and subject interests through Random Forest & XGBoost classifiers...
            </p>
            <div className="flex justify-center pt-2">
              <Loader2 className="h-6 w-6 text-[#4F39F6] animate-spin" />
            </div>
          </div>
        </div>
      )}

      {/* Landing Section View */}
      {viewState === 'landing' && (
        <LandingSection
          onStartAssessment={handleStartAssessment}
          onHowItWorksClick={handleHowItWorksClick}
          onOpenModelAnalytics={() => setShowAnalyticsModal(true)}
        />
      )}

      {/* Multi-Step Student Assessment Form */}
      {viewState === 'assessment' && (
        <AssessmentForm
          onSubmit={handleFormSubmit}
          onCancel={() => setViewState('landing')}
        />
      )}

      {/* Top 5 Recommendation Results Page */}
      {viewState === 'results' && results && (
        <ResultsPage
          results={results}
          onViewDetails={(pathway) => setSelectedPathway(pathway)}
          onViewShap={() => setShowShapModal(true)}
          onRetakeAssessment={() => setViewState('assessment')}
        />
      )}

      {/* Career Details Roadmap Modal */}
      {selectedPathway && (
        <CareerDetailView
          pathway={selectedPathway}
          onClose={() => setSelectedPathway(null)}
          onOpenShap={() => {
            setSelectedPathway(null)
            setShowShapModal(true)
          }}
        />
      )}

      {/* SHAP Explainable AI Modal */}
      {showShapModal && results && (
        <ShapExplanationModal
          explanations={results.shap_explanations}
          modelName={results.model_used}
          predictedStream={results.predicted_stream}
          onClose={() => setShowShapModal(false)}
        />
      )}

      {/* Research Model Evaluation Analytics Modal */}
      {showAnalyticsModal && (
        <ModelAnalyticsModal onClose={() => setShowAnalyticsModal(false)} />
      )}
    </div>
  )
}
