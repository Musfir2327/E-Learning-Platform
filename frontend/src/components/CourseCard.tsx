import type { Course } from '../types'
import { Star } from 'lucide-react'

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
      className={`group overflow-hidden rounded-3xl flex flex-col justify-between transition-all duration-300 bg-white border border-[#E2E8F0] ${
        isSelected ? 'ring-2 ring-[#4F39F6] border-[#4F39F6] shadow-xl' : 'shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div className="relative overflow-hidden aspect-video w-full border-b border-[#E2E8F0]">
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.image} alt="" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 text-[10px] font-black uppercase tracking-wider">
          <span className="rounded-lg bg-[#4F39F6] px-2.5 py-1 text-white shadow-sm">{course.category}</span>
          <span className="rounded-lg bg-[#FFFBEB] text-[#F59E0B] border border-[#F59E0B]/20 px-2.5 py-1 font-bold">{course.level}</span>
          {isCompleted ? (
            <span className="rounded-lg bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/20 px-2.5 py-1 font-bold">Completed</span>
          ) : null}
          {isLocked ? (
            <span className="rounded-lg bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20 px-2.5 py-1 font-bold">Locked</span>
          ) : null}
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="space-y-1.5 flex-1">
          <h3 className="text-base font-black tracking-tight text-[#0F172B] transition-colors duration-200 group-hover:text-[#4F39F6]">{course.title}</h3>
          <p className="text-xs leading-relaxed text-[#334155] font-semibold line-clamp-2">{course.summary}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs font-bold text-[#334155] pt-2 border-t border-[#E2E8F0]">
          <span>By {course.instructor}</span>
          <span className="text-[#FE9A00] font-black flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            {course.rating.toFixed(1)}
          </span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-extrabold text-[#334155]">
            <span>Course Progress</span>
            <span className="text-[#4F39F6] font-black">{course.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#EEF0FF]">
            <div className="h-2 rounded-full bg-[#4F39F6] progress-bar-fill" style={{ width: `${course.progress}%` }} />
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
          className={`w-full rounded-2xl py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            isLocked
              ? 'cursor-not-allowed bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
              : 'bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20 btn-shimmer hover:bg-[#4338CA]'
          }`}
        >
          {isLocked ? 'Locked (Complete previous)' : 'Resume Course'}
        </button>
      </div>
    </article>
  )
}
