import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  User,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  Award,
  Target,
  FileCheck,
  BookOpen
} from 'lucide-react'
import type { StudentAssessmentData, OLGrade } from '../../types/career'
import {
  SRI_LANKA_DISTRICTS,
  INTEREST_FIELDS,
  RIASEC_CATEGORIES,
  EXTRACURRICULAR_CATEGORIES
} from '../../data/careerPathwaysData'

interface AssessmentFormProps {
  onSubmit: (data: StudentAssessmentData) => void
  onCancel: () => void
}

const INITIAL_DATA: StudentAssessmentData = {
  age: 16,
  gender: 'Prefer not to say',
  district: 'Colombo',
  school_type: 'Government National School',
  current_grade: 'Grade 11 (O/L)',
  al_status: 'Not started yet',
  academic: {
    mathematics_grade: 'A',
    science_grade: 'A',
    english_grade: 'B',
    religion_grade: 'A',
    mother_tongue_grade: 'A',
    history_grade: 'B',
    elective_1_grade: 'A',
    elective_2_grade: 'A',
    elective_3_grade: 'B',
    elective_1_name: 'Business & Accounting Studies',
    elective_2_name: 'Information & Communication Technology (ICT)',
    elective_3_name: 'English Literature'
  },
  interests: {
    mathematics: 4,
    science: 4,
    technology: 5,
    engineering: 4,
    business: 3,
    law: 2,
    medicine: 3,
    arts: 2,
    design: 3,
    computing: 5,
    communication: 3,
    social_sciences: 2
  },
  personality: {
    realistic: 4,
    investigative: 5,
    artistic: 3,
    social: 3,
    enterprising: 3,
    conventional: 4
  },
  activities: {
    sports: 3,
    clubs: 4,
    ict_activities: 5,
    leadership: 4,
    volunteering: 3,
    creative: 2,
    competitions: 4,
    debates: 3
  },
  aspirations: ['Software Engineer', 'Data Scientist']
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<StudentAssessmentData>(INITIAL_DATA)
  const [customAspiration, setCustomAspiration] = useState<string>('')

  const totalSteps = 7

  const updateAcademicGrade = (field: keyof StudentAssessmentData['academic'], value: OLGrade) => {
    setFormData((prev) => ({
      ...prev,
      academic: { ...prev.academic, [field]: value }
    }))
  }

  const updateInterestScore = (fieldId: string, score: number) => {
    setFormData((prev) => ({
      ...prev,
      interests: { ...prev.interests, [fieldId]: score }
    }))
  }

  const updatePersonalityScore = (fieldId: keyof StudentAssessmentData['personality'], score: number) => {
    setFormData((prev) => ({
      ...prev,
      personality: { ...prev.personality, [fieldId]: score }
    }))
  }

  const updateActivityScore = (fieldId: string, score: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: { ...prev.activities, [fieldId]: score }
    }))
  }

  const toggleAspiration = (asp: string) => {
    setFormData((prev) => {
      const exists = prev.aspirations.includes(asp)
      if (exists) {
        return { ...prev, aspirations: prev.aspirations.filter((a) => a !== asp) }
      } else {
        return { ...prev, aspirations: [...prev.aspirations, asp] }
      }
    })
  }

  const addCustomAspiration = () => {
    if (customAspiration.trim() && !formData.aspirations.includes(customAspiration.trim())) {
      setFormData((prev) => ({
        ...prev,
        aspirations: [...prev.aspirations, customAspiration.trim()]
      }))
      setCustomAspiration('')
    }
  }

  const stepTitles = [
    'Basic Info',
    'Academic Performance',
    'Subject Interests',
    'RIASEC Personality',
    'Extracurriculars',
    'Career Aspirations',
    'Review & Submit'
  ]

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-4">
      {/* Top Navigation & Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex items-center gap-2 py-2.5 px-4.5 text-xs font-extrabold cursor-pointer shadow-xs"
        >
          <ArrowLeft className="h-4 w-4 text-[#4F39F6]" />
          <span>Back to Career Pathway Home</span>
        </button>
      </div>

      {/* Top Stepper Card */}
      <div className="brand-card p-6 sm:p-8 space-y-5 bg-white border border-[#E2E8F0] shadow-sm rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Step {step} of {totalSteps}</span>
            <h2 className="text-2xl font-black text-[#0F172B]">{stepTitles[step - 1]}</h2>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#4F39F6]">{Math.round((step / totalSteps) * 100)}%</span>
            <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider">Completed</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2.5 w-full rounded-full bg-[#EEF0FF] overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-[#4F39F6] transition-all duration-500 shadow-sm"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Circles */}
        <div className="hidden sm:grid grid-cols-7 gap-2 pt-2">
          {stepTitles.map((t, idx) => {
            const stepNum = idx + 1
            const isActive = step === stepNum
            const isDone = step > stepNum
            return (
              <div key={t} className="flex flex-col items-center gap-1.5 text-center">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-black transition-all ${
                    isDone
                      ? 'bg-[#4F39F6] text-white shadow-sm'
                      : isActive
                      ? 'bg-[#4F39F6] text-white ring-4 ring-[#EEF0FF] shadow-md shadow-[#4F39F6]/20'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
                  }`}
                >
                  {isDone ? '✓' : stepNum}
                </div>
                <span className={`text-[10px] font-extrabold leading-tight ${isActive ? 'text-[#4F39F6]' : 'text-[#64748B]'}`}>
                  {t.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content Panel */}
      <form onSubmit={handleSubmit} className="brand-card p-6 sm:p-8 space-y-8">
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <User className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 1: Student Basic Information</h3>
                <p className="text-xs text-[#334155] font-semibold">Basic background details used to contextualize recommendations.</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">Age</label>
                <input
                  type="number"
                  min={14}
                  max={25}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full brand-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">Gender (Optional)</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full brand-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">District in Sri Lanka</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full brand-input"
                >
                  {SRI_LANKA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">School Type</label>
                <select
                  value={formData.school_type}
                  onChange={(e) => setFormData({ ...formData, school_type: e.target.value })}
                  className="w-full brand-input"
                >
                  <option value="Government National School">Government National School</option>
                  <option value="Government Provincial School">Government Provincial School</option>
                  <option value="Private / Semi-Government">Private / Semi-Government</option>
                  <option value="International School">International School</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">Current Grade Level</label>
                <select
                  value={formData.current_grade}
                  onChange={(e) => setFormData({ ...formData, current_grade: e.target.value })}
                  className="w-full brand-input"
                >
                  <option value="Grade 10 (O/L Preparation)">Grade 10 (O/L Preparation)</option>
                  <option value="Grade 11 (O/L)">Grade 11 (O/L)</option>
                  <option value="Grade 12 (A/L Beginning)">Grade 12 (A/L Beginning)</option>
                  <option value="Grade 13 (A/L Final)">Grade 13 (A/L Final)</option>
                  <option value="Completed A/L (Awaiting Results / University)">Completed A/L</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#334155]">Current A/L Status</label>
                <select
                  value={formData.al_status}
                  onChange={(e) => setFormData({ ...formData, al_status: e.target.value })}
                  className="w-full brand-input"
                >
                  <option value="Not started yet">Not started yet (Deciding Stream)</option>
                  <option value="Enrolled in Stream">Enrolled in Stream</option>
                  <option value="Considering Stream Change">Considering Stream Change</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Performance (9 Sri Lankan GCE O/L Subjects: 6 Core + 3 Electives) */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <GraduationCap className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 2: Sri Lankan GCE O/L Performance (9 Subjects)</h3>
                <p className="text-xs text-[#334155] font-semibold">Select your actual or target GCE O/L grades (6 Core Subjects + 3 Elective Category Subjects: A, B, C, S, W).</p>
              </div>
            </div>

            {/* Core Subjects Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#4F39F6]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">6 Compulsory Core Subjects</h4>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { key: 'mathematics_grade', label: '1. Mathematics' },
                  { key: 'science_grade', label: '2. Science' },
                  { key: 'english_grade', label: '3. English Language' },
                  { key: 'religion_grade', label: '4. Religion (Buddhism/Islam/Hinduism/Christianity)' },
                  { key: 'mother_tongue_grade', label: '5. Mother Tongue (Sinhala/Tamil)' },
                  { key: 'history_grade', label: '6. History' }
                ].map(({ key, label }) => (
                  <div key={key} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2">
                    <label className="text-xs font-bold text-[#0F172B]">{label}</label>
                    <div className="flex gap-2">
                      {(['A', 'B', 'C', 'S', 'W'] as OLGrade[]).map((g) => {
                        const isSelected = formData.academic[key as keyof typeof formData.academic] === g
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => updateAcademicGrade(key as keyof typeof formData.academic, g)}
                            className={`flex-1 rounded-xl py-2 text-xs font-extrabold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20'
                                : 'border border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#EEF0FF] hover:text-[#4F39F6]'
                            }`}
                          >
                            {g}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elective Subjects Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#4F39F6]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">
                  3 Elective Category Subjects (Choose Specific Subject & Grade)
                </h4>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    gradeKey: 'elective_1_grade' as const,
                    nameKey: 'elective_1_name' as const,
                    categoryTitle: '7. Elective Category I',
                    options: [
                      'Business & Accounting Studies',
                      'Geography',
                      'Civic Education',
                      'Entrepreneurship Studies',
                      'Second Language (Sinhala / Tamil)'
                    ]
                  },
                  {
                    gradeKey: 'elective_2_grade' as const,
                    nameKey: 'elective_2_name' as const,
                    categoryTitle: '8. Elective Category II',
                    options: [
                      'Information & Communication Technology (ICT)',
                      'Agriculture & Food Technology',
                      'Design & Technology / Technical Studies',
                      'Home Economics',
                      'Health & Physical Education'
                    ]
                  },
                  {
                    gradeKey: 'elective_3_grade' as const,
                    nameKey: 'elective_3_name' as const,
                    categoryTitle: '9. Elective Category III',
                    options: [
                      'Art',
                      'Music (Oriental / Western / Carnatic)',
                      'Dancing (Kandyan / Low Country / Bharatha)',
                      'Drama & Theatre',
                      'English Literature',
                      'Tamil Literature',
                      'Sinhala Literature'
                    ]
                  }
                ].map(({ gradeKey, nameKey, categoryTitle, options }) => (
                  <div key={categoryTitle} className="rounded-2xl border border-[#EEF0FF] bg-[#F8FAFC] p-4 space-y-3">
                    <label className="text-xs font-black text-[#0F172B]">{categoryTitle}</label>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#334155]">Select Subject</span>
                      <select
                        value={formData.academic[nameKey] || options[0]}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          academic: { ...prev.academic, [nameKey]: e.target.value }
                        }))}
                        className="w-full brand-input text-xs py-2 px-3 bg-white border-[#E2E8F0] focus:border-[#4F39F6]"
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#334155]">Select Grade</span>
                      <div className="flex gap-1.5">
                        {(['A', 'B', 'C', 'S', 'W'] as OLGrade[]).map((g) => {
                          const isSelected = formData.academic[gradeKey] === g
                          return (
                            <button
                              key={g}
                              type="button"
                              onClick={() => updateAcademicGrade(gradeKey, g)}
                              className={`flex-1 rounded-xl py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20'
                                  : 'border border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#EEF0FF] hover:text-[#4F39F6]'
                              }`}
                            >
                              {g}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Subject & Field Interests */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <Sparkles className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 3: Subject & Field Interests</h3>
                <p className="text-xs text-[#334155] font-semibold">Rate your level of interest across academic and professional fields (1 = Low, 5 = High).</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {INTEREST_FIELDS.map((field) => {
                const currentScore = formData.interests[field.id] || 3
                return (
                  <div key={field.id} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-[#0F172B]">{field.label}</span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => updateInterestScore(field.id, score)}
                          className={`h-7 w-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentScore === score
                              ? 'bg-[#4F39F6] text-white shadow-sm shadow-[#4F39F6]/20 scale-105'
                              : 'bg-white text-[#334155] border border-[#E2E8F0] hover:bg-[#EEF0FF]'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Holland RIASEC Personality */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <HeartHandshake className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 4: Personality Attributes (Holland RIASEC)</h3>
                <p className="text-xs text-[#334155] font-semibold">Rate how strongly each personality trait describes your working style (1 = Low, 5 = High).</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {RIASEC_CATEGORIES.map((cat) => {
                const traitKey = cat.id as keyof StudentAssessmentData['personality']
                const currentScore = formData.personality[traitKey] || 3
                return (
                  <div key={cat.id} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#EEF0FF] text-xs font-black text-[#4F39F6]">
                          {cat.code}
                        </span>
                        <span className="text-sm font-bold text-[#0F172B]">{cat.title}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#4F39F6]">{currentScore} / 5</span>
                    </div>
                    <p className="text-[11px] text-[#334155] leading-relaxed font-semibold">{cat.desc}</p>

                    <div className="flex gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => updatePersonalityScore(traitKey, score)}
                          className={`flex-1 rounded-xl py-1.5 text-xs font-extrabold transition-all cursor-pointer ${
                            currentScore === score
                              ? 'bg-[#4F39F6] text-white shadow-sm shadow-[#4F39F6]/20'
                              : 'bg-white text-[#334155] border border-[#E2E8F0] hover:bg-[#EEF0FF]'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Extracurricular Activities */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <Award className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 5: Extracurricular Activities</h3>
                <p className="text-xs text-[#334155] font-semibold">Indicate your level of involvement in school activities and leadership roles.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {EXTRACURRICULAR_CATEGORIES.map((act) => {
                const currentScore = formData.activities[act.id] || 3
                return (
                  <div key={act.id} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-[#0F172B]">{act.label}</span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => updateActivityScore(act.id, score)}
                          className={`h-7 w-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentScore === score
                              ? 'bg-[#4F39F6] text-white shadow-sm shadow-[#4F39F6]/20 scale-105'
                              : 'bg-white text-[#334155] border border-[#E2E8F0] hover:bg-[#EEF0FF]'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Career Aspirations */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <Target className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 6: Career Aspirations</h3>
                <p className="text-xs text-[#334155] font-semibold">What type of career job roles are you interested in exploring?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Software Engineer',
                  'Data Scientist',
                  'Cyber Security Specialist',
                  'Robotics Engineer',
                  'Medical Doctor',
                  'Biotechnologist',
                  'Financial Analyst',
                  'Corporate Attorney',
                  'UI/UX Product Designer',
                  'Digital Growth Strategist',
                  'Not sure yet'
                ].map((asp) => {
                  const isSelected = formData.aspirations.includes(asp)
                  return (
                    <button
                      key={asp}
                      type="button"
                      onClick={() => toggleAspiration(asp)}
                      className={`rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20 scale-105'
                          : 'border border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:bg-[#EEF0FF]'
                      }`}
                    >
                      {asp}
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Or type another career aspiration..."
                  value={customAspiration}
                  onChange={(e) => setCustomAspiration(e.target.value)}
                  className="flex-1 brand-input"
                />
                <button
                  type="button"
                  onClick={addCustomAspiration}
                  className="rounded-2xl bg-[#0F172B] px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Review & Confirm */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <FileCheck className="h-6 w-6 text-[#4F39F6]" />
              <div>
                <h3 className="text-xl font-black text-[#0F172B]">Step 7: Review Your Assessment Profile</h3>
                <p className="text-xs text-[#334155] font-semibold">Please review your entered details before submitting for AI recommendation analysis.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Student & Academic Summary</h4>
                <div className="space-y-1.5 text-xs">
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Age / District:</span> {formData.age} years | {formData.district}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Grade Level:</span> {formData.current_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Mathematics:</span> Grade {formData.academic.mathematics_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Science:</span> Grade {formData.academic.science_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">English:</span> Grade {formData.academic.english_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Elective I (Commerce/Geo):</span> Grade {formData.academic.elective_1_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Elective II (ICT/Tech):</span> Grade {formData.academic.elective_2_grade}</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Elective III (Arts/Lit):</span> Grade {formData.academic.elective_3_grade}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">RIASEC & Aspirations</h4>
                <div className="space-y-1.5 text-xs">
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Investigative (I):</span> {formData.personality.investigative}/5</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Realistic (R):</span> {formData.personality.realistic}/5</p>
                  <p className="text-[#0F172B] font-bold"><span className="text-[#64748B] font-medium">Selected Aspirations:</span> {formData.aspirations.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Form Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="btn-secondary flex items-center gap-2 py-2.5 px-5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary btn-shimmer flex items-center gap-2 py-2.5 px-6 text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary btn-shimmer flex items-center gap-2 py-3 px-8 text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Submit Assessment & Generate Top 5 Pathways</span>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
