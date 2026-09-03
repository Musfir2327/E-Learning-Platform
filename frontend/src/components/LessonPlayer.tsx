import { useEffect, useState } from 'react'
import type { Course, Lesson } from '../types'
import { ArrowRight, CheckCircle2, BookOpen, Play, Video } from 'lucide-react'

type LessonPlayerProps = {
  course: Course
  selectedLesson: Lesson
  completedLessonIds: string[]
  isCourseCompleted: boolean
  onLessonSelect: (lesson: Lesson) => void
  onCompleteLesson: (lessonId: string) => void
  onGoToQuiz?: () => void
}

const lessonLabels = {
  video: 'Video lesson',
  reading: 'Tutorial reading',
  quiz: 'Quiz checkpoint',
}

export function LessonPlayer({
  course,
  selectedLesson,
  completedLessonIds,
  isCourseCompleted,
  onLessonSelect,
  onCompleteLesson,
  onGoToQuiz,
}: LessonPlayerProps) {
  const isSelectedLessonCompleted = completedLessonIds.includes(selectedLesson.id)
  
  const defaultVid = selectedLesson.youtubeId || (selectedLesson.relatedVideos?.[0]?.id) || 'SqcY0GlETPk'
  const [activeVideoId, setActiveVideoId] = useState<string>(defaultVid)
  const [activeTab, setActiveTab] = useState<'video' | 'reading'>('video')

  useEffect(() => {
    const vid = selectedLesson.youtubeId || 'SqcY0GlETPk'
    setActiveVideoId(vid)
    if (selectedLesson.type === 'reading' && selectedLesson.content) {
      setActiveTab('reading')
    } else {
      setActiveTab('video')
    }
  }, [selectedLesson.id, selectedLesson.youtubeId, selectedLesson.type, selectedLesson.content])

  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Left Player Area */}
      <div className="brand-card overflow-hidden flex flex-col justify-between bg-white border border-[#E2E8F0] shadow-sm">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-black transition-all border-b-2 cursor-pointer ${
                activeTab === 'video'
                  ? 'border-[#4F39F6] text-[#4F39F6]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F172B]'
              }`}
            >
              <Video className="h-4 w-4 text-[#EF4444]" />
              <span>Video Lesson</span>
            </button>

            {selectedLesson.content && (
              <button
                type="button"
                onClick={() => setActiveTab('reading')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-black transition-all border-b-2 cursor-pointer ${
                  activeTab === 'reading'
                    ? 'border-[#4F39F6] text-[#4F39F6]'
                    : 'border-transparent text-[#64748B] hover:text-[#0F172B]'
                }`}
              >
                <BookOpen className="h-4 w-4 text-[#4F39F6]" />
                <span>Reading Material</span>
              </button>
            )}
          </div>

          <span className="badge-purple text-[10px] font-black uppercase tracking-wider mb-2">
            {lessonLabels[selectedLesson.type]}
          </span>
        </div>

        {/* Media or Content Display Area */}
        <div className="p-6 space-y-6">
          {activeTab === 'video' ? (
            <div className="space-y-4">
              {/* YouTube Video Player iFrame */}
              <div className="aspect-video bg-[#0F172B] rounded-2xl overflow-hidden relative shadow-lg border border-[#E2E8F0]">
                <iframe
                  key={activeVideoId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedLesson.title}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">{course.title}</p>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0F172B] tracking-tight">{selectedLesson.title}</h2>
                </div>
                <div className="flex items-center gap-2 bg-[#ECFDF5] border border-[#10B981]/30 text-[#10B981] px-3.5 py-1.5 rounded-xl text-xs font-black shrink-0 w-fit">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Now Playing</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#F8FAFC] p-6 text-[#0F172B] rounded-2xl border border-[#E2E8F0] space-y-4">
              <div>
                <span className="badge-purple w-fit text-xs font-black inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {lessonLabels[selectedLesson.type]}
                </span>
                <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-[#64748B]">{course.title}</p>
                <h2 className="mt-1 text-2xl font-black text-[#0F172B]">{selectedLesson.title}</h2>
                
                <div className="mt-4 text-sm leading-relaxed text-[#334155] font-semibold whitespace-pre-wrap bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs">
                  {selectedLesson.content}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Controller Panel */}
        <div className="p-6 bg-white border-t border-[#E2E8F0]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-black tracking-tight text-[#0F172B]">Lesson overview</h3>
              <p className="mt-1 text-xs font-semibold text-[#334155]">
                Complete every lesson in this course. Once all are done, the 5-question course quiz is unlocked.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onCompleteLesson(selectedLesson.id)}
                disabled={isSelectedLessonCompleted}
                className={`w-fit rounded-2xl px-6 py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelectedLessonCompleted
                    ? 'cursor-not-allowed bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/30 font-black'
                    : 'btn-primary btn-shimmer'
                }`}
              >
                {isSelectedLessonCompleted ? '✓ Lesson completed' : 'Mark lesson complete'}
              </button>
            </div>
          </div>

          {isCourseCompleted ? (
            <div className="mt-5 rounded-2xl border border-[#4F39F6]/30 bg-[#EEF0FF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <p className="text-sm font-black text-[#0F172B] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#4F39F6]" />
                  <span>All Lessons Completed!</span>
                </p>
                <p className="text-xs font-bold text-[#334155]">
                  Now take the 5-question quiz to earn and download your PDF completion certificate.
                </p>
              </div>

              {onGoToQuiz && (
                <button
                  type="button"
                  onClick={onGoToQuiz}
                  className="btn-primary btn-shimmer shrink-0 flex items-center gap-2 py-3 px-6 text-xs font-extrabold cursor-pointer"
                >
                  <span>Take 5-Question Quiz</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right Sidebar: Course Content */}
      <aside className="brand-card p-6 flex flex-col h-fit space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[#0F172B]">Course content</h3>
            <p className="text-xs font-bold text-[#64748B]">{course.duration}</p>
          </div>
          <span className="badge-purple text-xs font-black">
            {completedLessonIds.length}/{course.lessons.length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id)
            const isSelected = selectedLesson.id === lesson.id

            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => onLessonSelect(lesson)}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#4F39F6] bg-[#EEF0FF] shadow-xs'
                    : 'border-[#E2E8F0] bg-white hover:bg-[#EEF0FF]/50 hover:border-[#4F39F6]/40'
                }`}
              >
                <div className="space-y-1">
                  <span className={`block text-sm font-black transition-colors duration-200 ${
                    isSelected ? 'text-[#4F39F6]' : 'text-[#0F172B]'
                  }`}>
                    {lesson.title}
                  </span>
                  <span className="block text-xs font-bold text-[#64748B]">
                    {lessonLabels[lesson.type]} • {lesson.duration}
                  </span>
                </div>

                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'border border-[#CBD5E1] bg-[#F8FAFC] text-transparent'
                }`}>
                  ✓
                </span>
              </button>
            )
          })}
        </div>
      </aside>
    </section>
  )
}
