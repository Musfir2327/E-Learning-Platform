import { useEffect, useRef, useState } from 'react'
import type { Course, Lesson } from '../types'

type LessonPlayerProps = {
  course: Course
  selectedLesson: Lesson
  completedLessonIds: string[]
  isCourseCompleted: boolean
  onLessonSelect: (lesson: Lesson) => void
  onCompleteLesson: (lessonId: string) => void
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
}: LessonPlayerProps) {
  const isSelectedLessonCompleted = completedLessonIds.includes(selectedLesson.id)
  const playerRef = useRef<any>(null)
  const [videoWatched, setVideoWatched] = useState(false)

  useEffect(() => {
    setVideoWatched(false)
    if (selectedLesson.type !== 'video' || !selectedLesson.youtubeId) {
      return
    }

    // Ensure YT API script is loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    let player: any
    let isMounted = true

    const createPlayer = () => {
      if (!isMounted) return
      try {
        player = new (window as any).YT.Player('youtube-player', {
          videoId: selectedLesson.youtubeId,
          playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onStateChange: (event: any) => {
              // YT.PlayerState.ENDED is 0
              if (event.data === 0) {
                setVideoWatched(true)
                // Automatically complete lesson once video ends
                onCompleteLesson(selectedLesson.id)
              }
            },
          },
        })
        playerRef.current = player
      } catch (err) {
        console.error('Error creating YouTube player:', err)
      }
    }

    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer()
    } else {
      // Poll until YT is loaded
      const checkYT = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          createPlayer()
          clearInterval(checkYT)
        }
      }, 200)
      return () => {
        clearInterval(checkYT)
        isMounted = false
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy()
          playerRef.current = null
        }
      }
    }

    return () => {
      isMounted = false
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [selectedLesson.id, selectedLesson.youtubeId, selectedLesson.type])

  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="glass-panel rounded-2xl overflow-hidden shadow-md flex flex-col justify-between bg-slate-900/20">
        
        {/* Media or Content Display Area */}
        <div className="flex-1">
          {selectedLesson.type === 'video' ? (
            selectedLesson.youtubeId ? (
              <div className="aspect-video bg-slate-950 border-b border-white/5 overflow-hidden relative">
                <div id="youtube-player" className="w-full h-full absolute inset-0" />
              </div>
            ) : (
              <div className="aspect-video bg-slate-950 p-6 text-white border-b border-white/5">
                <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-slate-900/40 p-6 shadow-inner">
                  <span className="w-fit rounded-lg bg-emerald-500/15 border border-emerald-500/20 px-3 py-1 text-xs font-bold tracking-wide text-emerald-400">
                    {lessonLabels[selectedLesson.type]}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{course.title}</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">{selectedLesson.title}</h2>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>{selectedLesson.duration}</span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      No Video Configured
                    </span>
                  </div>
                </div>
              </div>
            )
          ) : selectedLesson.type === 'reading' ? (
            <div className="bg-slate-950/70 p-6 text-white border-b border-white/5 min-h-[360px] flex flex-col justify-between">
              <div>
                <span className="w-fit rounded-lg bg-blue-500/15 border border-blue-500/20 px-3 py-1 text-xs font-bold tracking-wide text-blue-400">
                  {lessonLabels[selectedLesson.type]}
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">{course.title}</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-white">{selectedLesson.title}</h2>
                
                <div className="mt-5 text-sm leading-relaxed text-slate-300 font-medium whitespace-pre-wrap bg-slate-900/30 border border-white/5 p-5 rounded-xl">
                  {selectedLesson.content || "No reading material configured. Review this module and mark it complete below."}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{selectedLesson.duration}</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  Reading Tutorial
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/70 p-6 text-white border-b border-white/5 min-h-[360px] flex flex-col justify-between">
              <div>
                <span className="w-fit rounded-lg bg-amber-500/15 border border-amber-500/20 px-3 py-1 text-xs font-bold tracking-wide text-amber-400">
                  {lessonLabels[selectedLesson.type]}
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">{course.title}</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-white">{selectedLesson.title}</h2>
                
                <div className="mt-6 p-5 rounded-xl border border-amber-500/15 bg-amber-500/5 text-xs text-amber-400/90 leading-relaxed font-semibold">
                  🎓 This is a knowledge checkpoint lesson. Once all lessons are marked complete, the course quiz unlocks. Complete this item now to count towards course completion.
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{selectedLesson.duration}</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-505" />
                  Assessment Checkpoint
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Lesson Controller Panel */}
        <div className="p-5.5 bg-slate-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">Lesson overview</h3>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {selectedLesson.type === 'video' && selectedLesson.youtubeId && !isSelectedLessonCompleted
                  ? '📺 Watching the video fully will automatically mark this lesson as completed.'
                  : 'Complete every lesson in this course. Once all are done, the course quiz is unlocked.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedLesson.type === 'video' && videoWatched && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  ✓ Watched Fully
                </span>
              )}
              <button
                type="button"
                onClick={() => onCompleteLesson(selectedLesson.id)}
                disabled={isSelectedLessonCompleted}
                className={`w-fit rounded-xl px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  isSelectedLessonCompleted
                    ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110'
                }`}
              >
                {isSelectedLessonCompleted ? 'Lesson completed' : 'Mark lesson complete'}
              </button>
            </div>
          </div>

          {isCourseCompleted ? (
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 leading-relaxed shadow-sm shadow-emerald-950/20">
              🎉 Congratulations! All lessons completed. Go to the "Take quiz" section to unlock your completion certificate.
            </div>
          ) : null}
        </div>
      </div>

      <aside className="glass-panel rounded-2xl p-5 shadow-md flex flex-col h-fit">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black tracking-tight text-white">Course content</h3>
            <p className="text-xs font-semibold text-slate-400">{course.duration}</p>
          </div>
          <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-black tracking-wide text-emerald-400">
            {completedLessonIds.length}/{course.lessons.length}
          </span>
        </div>
        <div className="space-y-2.5">
          {course.lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id)

            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => onLessonSelect(lesson)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  selectedLesson.id === lesson.id
                    ? 'border-emerald-500/40 bg-emerald-500/10 shadow-sm'
                    : 'border-white/5 bg-slate-900/30 hover:border-slate-800 hover:bg-slate-900/60'
                }`}
              >
                <span>
                  <span className="block text-sm font-bold text-white transition-colors duration-200">{lesson.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-400">
                    {lessonLabels[lesson.type]} - {lesson.duration}
                  </span>
                </span>
                <span className={`h-3 w-3 rounded-full border transition-all duration-300 ${
                  isCompleted ? 'bg-emerald-400 border-emerald-500 shadow-md shadow-emerald-400/20' : 'bg-slate-850 border-slate-700'
                }`} />
              </button>
            )
          })}
        </div>
      </aside>
    </section>
  )
}
