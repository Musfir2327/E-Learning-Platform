import { useEffect, useMemo, useState } from 'react'
import type { Course } from '../types'

type QuizPanelProps = {
  course: Course
  isLocked: boolean
  hasPassed: boolean
  onPass: () => void
}

export function QuizPanel({ course, isLocked, hasPassed, onPass }: QuizPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const score = useMemo(() => {
    return course.quiz.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0)
  }, [answers, course.quiz])

  const answeredCount = Object.keys(answers).length
  const isComplete = answeredCount === course.quiz.length
  const isPassed = isComplete && score === course.quiz.length

  useEffect(() => {
    if (isPassed && !hasPassed) {
      onPass()
    }
  }, [hasPassed, isPassed, onPass])

  return (
    <section className="glass-panel rounded-2xl p-6 shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Assessment</p>
          <h2 className="text-2xl font-black tracking-tight text-white">{course.title} Quiz</h2>
        </div>
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 px-4.5 py-2.5 text-xs font-extrabold tracking-wider text-sky-400 uppercase">
          Score {score}/{course.quiz.length}
        </div>
      </div>

      {isLocked ? (
        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-amber-400">
          <h3 className="font-extrabold text-sm uppercase tracking-wider">Quiz locked</h3>
          <p className="mt-1.5 text-xs leading-relaxed font-medium">
            Complete all courses and all tutorial topics first. After that you can take the quiz and unlock certificate generation.
          </p>
        </div>
      ) : null}

      {hasPassed ? (
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-400 shadow-sm shadow-emerald-950/20">
          <h3 className="font-extrabold text-sm uppercase tracking-wider">Quiz passed</h3>
          <p className="mt-1.5 text-xs font-medium">Certificate generation is now unlocked.</p>
        </div>
      ) : null}

      <div className={`mt-6 space-y-5 ${isLocked ? 'pointer-events-none opacity-40' : ''}`}>
        {course.quiz.map((question, index) => (
          <fieldset key={question.id} className="rounded-xl border border-white/5 bg-slate-900/30 p-5">
            <legend className="px-2 text-sm font-extrabold tracking-tight text-slate-100">
              {index + 1}. {question.question}
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {question.choices.map((choice) => {
                const isSelected = answers[question.id] === choice
                const isCorrect = choice === question.answer
                const showResult = answeredCount === course.quiz.length
                return (
                  <label
                    key={choice}
                    className={`cursor-pointer rounded-xl border p-3.5 text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                        : 'border-white/5 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
                    } ${showResult && isCorrect ? 'ring-2 ring-emerald-500/50' : ''}`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name={question.id}
                      value={choice}
                      disabled={isLocked}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice }))}
                    />
                    {choice}
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
