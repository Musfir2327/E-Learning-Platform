import { useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import type { Course } from '../types'
import { Award, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'

type QuizPanelProps = {
  course: Course
  isLocked: boolean
  hasPassed: boolean
  onPass: () => void
  onGoToCertificate?: () => void
}

export function triggerCelebrationConfetti() {
  const duration = 2.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
  }, 250)
}

export function QuizPanel({ course, isLocked, hasPassed, onPass, onGoToCertificate }: QuizPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const score = useMemo(() => {
    return course.quiz.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0)
  }, [answers, course.quiz])

  const answeredCount = Object.keys(answers).length
  const totalQuestions = course.quiz.length
  const isComplete = answeredCount === totalQuestions
  // Passing condition: at least 3 out of 5 correct (60%)
  const isPassed = isComplete && score >= Math.ceil(totalQuestions * 0.6)

  useEffect(() => {
    if (isPassed && !hasPassed) {
      onPass()
    }
  }, [hasPassed, isPassed, onPass])

  return (
    <section className="brand-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4F39F6]/20 bg-[#EEF0FF] px-3.5 py-1 text-xs font-bold text-[#4F39F6]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Course Assessment • 5 Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172B]">{course.title} Final Quiz</h2>
          <p className="text-xs text-[#334155] font-semibold">Answer all 5 questions correctly to earn your downloadable PDF course completion certificate.</p>
        </div>

        <div className="rounded-2xl border border-[#4F39F6]/20 bg-[#EEF0FF] px-5 py-3 text-center shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">Score</span>
          <p className="text-2xl font-black text-[#4F39F6]">{score} / {totalQuestions}</p>
        </div>
      </div>

      {isLocked ? (
        <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-5 text-[#B45309] flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Quiz Locked</h3>
            <p className="text-xs leading-relaxed font-semibold">
              Complete all lessons in this course first to unlock the 5-question final quiz and earn your certificate.
            </p>
          </div>
        </div>
      ) : null}

      {(hasPassed || isPassed) ? (
        <div className="rounded-2xl border border-[#10B981]/30 bg-[#ECFDF5] p-6 text-[#065F46] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#10B981] text-white shadow-sm shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-[#065F46]">Congratulations! Quiz Passed ({score}/{totalQuestions})</h3>
              <p className="text-xs font-bold text-[#047857]">Your official PDF completion certificate for "{course.title}" is generated and ready for instant download.</p>
            </div>
          </div>

          {onGoToCertificate && (
            <button
              type="button"
              onClick={onGoToCertificate}
              className="btn-primary btn-shimmer shrink-0 flex items-center gap-2 py-3 px-6 text-xs font-extrabold cursor-pointer shadow-lg shadow-[#4F39F6]/20"
            >
              <span>Download PDF Certificate</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : null}

      {/* 5 Questions Grid */}
      <div className={`space-y-6 ${isLocked ? 'pointer-events-none opacity-40' : ''}`}>
        {course.quiz.map((question, index) => (
          <fieldset key={question.id} className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 space-y-4">
            <legend className="px-2 text-sm font-black text-[#0F172B] tracking-tight">
              Question {index + 1} of {totalQuestions}: {question.question}
            </legend>
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              {question.choices.map((choice) => {
                const isSelected = answers[question.id] === choice
                const isCorrect = choice === question.answer
                const showResult = isComplete

                return (
                  <label
                    key={choice}
                    className={`cursor-pointer rounded-2xl border p-4 text-xs font-bold transition-all duration-200 flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#4F39F6] bg-[#EEF0FF] text-[#4F39F6] shadow-xs'
                        : 'border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#EEF0FF]/40 hover:border-[#4F39F6]/30'
                    } ${showResult && isCorrect ? 'ring-2 ring-[#10B981]' : ''}`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name={question.id}
                      value={choice}
                      disabled={isLocked}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice }))}
                    />
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-black ${
                      isSelected ? 'border-[#4F39F6] bg-[#4F39F6] text-white' : 'border-[#CBD5E1] bg-white text-transparent'
                    }`}>
                      ✓
                    </span>
                    <span className="flex-1">{choice}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  )
}

