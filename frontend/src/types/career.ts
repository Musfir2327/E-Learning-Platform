export type OLGrade = 'A' | 'B' | 'C' | 'S' | 'W'

export interface AcademicProfile {
  mathematics_grade: OLGrade
  science_grade: OLGrade
  english_grade: OLGrade
  religion_grade: OLGrade
  mother_tongue_grade: OLGrade
  history_grade: OLGrade
  elective_1_grade: OLGrade // Category 1: Business & Accounting / Geography / Civic / Commerce
  elective_2_grade: OLGrade // Category 2: ICT / Agriculture / Design & Technology
  elective_3_grade: OLGrade // Category 3: Arts / Music / Drama / Literature
  elective_1_name?: string
  elective_2_name?: string
  elective_3_name?: string
}

export interface RiasecPersonality {
  realistic: number // 1 - 5
  investigative: number // 1 - 5
  artistic: number // 1 - 5
  social: number // 1 - 5
  enterprising: number // 1 - 5
  conventional: number // 1 - 5
}

export interface StudentAssessmentData {
  age: number
  gender: string
  district: string
  school_type: string
  current_grade: string
  al_status: string
  academic: AcademicProfile
  interests: Record<string, number>
  personality: RiasecPersonality
  activities: Record<string, number>
  aspirations: string[]
}

export interface CareerPathwayItem {
  id: string
  rank: number
  title: string
  stream: string
  degree: string
  career: string
  description: string
  required_skills: string[]
  related_interests: string[]
  related_personality: string[]
  compatibility_score: number
  matching_highlights: string[]
}

export interface FeatureContribution {
  feature: string
  feature_name_formatted: string
  contribution: number
  description: string
}

export interface RecommendationResponse {
  recommendation_id: string
  student_id: string
  predicted_stream: string
  model_used: string
  stream_probabilities: Record<string, number>
  top_pathways: CareerPathwayItem[]
  shap_explanations: FeatureContribution[]
  created_at: string
}

export interface ModelEvaluationMetrics {
  accuracy: number
  precision: number
  recall: number
  f1_score: number
  confusion_matrix: number[][]
  classes: string[]
}

export interface ModelComparisonResponse {
  random_forest: ModelEvaluationMetrics
  xgboost: ModelEvaluationMetrics
  active_model: string
  dataset_sample_count: number
}
