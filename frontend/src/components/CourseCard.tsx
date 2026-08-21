import type { Course } from '../types'

type CourseCardProps = {
  course: Course
  isSelected: boolean
  isLocked: boolean
  isCompleted: boolean
  onSelect: (courseId: string) => void
}

export function CourseCard({ course, isSelected, isLocked, isCompleted, onSelect }: CourseCardProps) {
  return (
    <article
      className={`premium-card group overflow-hidden rounded-2xl flex flex-col justify-between transition-all duration-300 ${
        isSelected ? 'ring-2 ring-emerald-500/40 border-emerald-500/40 bg-slate-900/60 shadow-lg shadow-emerald-950/20' : 'bg-slate-900/40 shadow-sm'
      }`}
    >
      <div className="relative overflow-hidden aspect-video w-full border-b border-white/5">
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.image} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>
      
      <div className="flex flex-col flex-1 p-5.5 space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
          <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-slate-300 border border-slate-700/50">{course.category}</span>
          <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-amber-400 border border-amber-500/20">{course.level}</span>
          {isCompleted ? (
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-400 border border-emerald-500/25">Completed</span>
          ) : null}
          {isLocked ? (
            <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-rose-400 border border-rose-500/25">Locked</span>
          ) : null}
        </div>
        
        <div className="space-y-1.5 flex-1">
          <h3 className="text-lg font-black tracking-tight text-white transition-colors duration-200 group-hover:text-emerald-400">{course.title}</h3>
          <p className="text-xs leading-relaxed text-slate-400 font-medium line-clamp-2">{course.summary}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>{course.instructor}</span>
          <span className="text-amber-400 flex items-center gap-1">★ {course.rating.toFixed(1)}</span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>Course Progress</span>
            <span className="text-emerald-400">{course.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 progress-bar-fill shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => {
            if (!isLocked) {
              onSelect(course.id)
            }
          }}
          disabled={isLocked}
          className={`w-full rounded-xl py-2.5.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
            isLocked
              ? 'cursor-not-allowed bg-slate-800/50 text-slate-500 border border-slate-800'
              : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/10 btn-shimmer hover:brightness-110'
          }`}
        >
          {isLocked ? 'Locked (Complete previous)' : 'Resume Course'}
        </button>
      </div>
    </article>
  )
}
