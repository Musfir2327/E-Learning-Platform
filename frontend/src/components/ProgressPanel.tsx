import type { Course, Learner } from '../types'
import { MetricCard } from './MetricCard'

type ProgressPanelProps = {
  courses: Course[]
  learner: Learner
}

export function ProgressPanel({ courses, learner }: ProgressPanelProps) {
  const averageProgress = Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length)

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Weekly goal" value={`${learner.weeklyGoal}%`} detail="Learning target completed" tone="green" />
        <MetricCard label="Certificates" value={learner.certificates} detail="Verified achievements" tone="blue" />
        <MetricCard label="Average progress" value={`${averageProgress}%`} detail="Across enrolled courses" tone="amber" />
      </div>

      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-black tracking-tight text-white">Learning progress</h2>
        <div className="mt-5 space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="space-y-1.5">
              <div className="flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-bold text-slate-100">{course.title}</span>
                <span className="font-extrabold text-emerald-400">{course.progress}% completed</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 progress-bar-fill shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
