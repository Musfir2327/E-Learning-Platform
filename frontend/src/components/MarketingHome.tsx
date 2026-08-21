import type { Course } from '../types'

type MarketingHomeProps = {
  courses: Course[]
  tracks: string[]
  partners: string[]
  onExploreCourses: () => void
  onOpenTutorials: () => void
}

export function MarketingHome({
  courses,
  tracks,
  onExploreCourses,
  onOpenTutorials,
}: MarketingHomeProps) {
  const topCourse = courses[0]

  if (!topCourse) {
    return (
      <div className="flex flex-col items-center justify-center py-24 glass-panel border border-white/5 bg-slate-900/40 rounded-2xl">
        <div className="flex items-center gap-3 text-slate-400 font-extrabold uppercase tracking-widest text-xs">
          <span>Loading Platform Catalog</span>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/45 shadow-xl glass-panel">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 space-y-5">

            <div>
              <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-black tracking-wider uppercase text-emerald-400">
                LearnHub Plus
              </span>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white tracking-tight">
                Learn job-ready skills with elite courses & interactive tutorials.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 font-medium">
                A Coursera-inspired course marketplace combined with W3Schools-style practical tutorials,
                built using React, TypeScript, and modern Tailwind CSS.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreCourses}
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 btn-shimmer hover:brightness-110"
              >
                Explore courses
              </button>
              <button
                type="button"
                onClick={onOpenTutorials}
                className="rounded-xl border border-white/10 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                Start tutorials
              </button>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              {[
                ['10,000+', 'lessons and tutorials'],
                ['40+', 'career learning tracks'],
                ['Unlimited', 'certificates & quizzes'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                  <p className="text-xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs text-slate-400 font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-950/40 p-6 sm:p-8 lg:p-10 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5">
            <div className="rounded-2xl bg-slate-900/60 border border-white/5 p-5 shadow-2xl w-full max-w-md">
              <img className="h-48 w-full rounded-xl object-cover" src={topCourse.image} alt="" />
              <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-emerald-400">Featured professional certificate</p>
              <h3 className="mt-1.5 text-xl font-black tracking-tight text-white">{topCourse.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 font-medium">{topCourse.summary}</p>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950/45 border border-white/5 p-3.5 text-xs">
                <span className="font-bold text-slate-300">{topCourse.students.toLocaleString()} learners</span>
                <span className="font-extrabold text-amber-400">★ {topCourse.rating.toFixed(1)} rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-2xl p-6 shadow-md space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Learning tracks</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight text-white">Browse by goal</h2>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {tracks.map((track) => (
              <button
                key={track}
                type="button"
                onClick={onExploreCourses}
                className="rounded-xl border border-white/5 bg-slate-900/40 p-4 text-left text-xs font-bold text-slate-200 transition duration-300 hover:border-emerald-500/30 hover:bg-slate-900/80 hover:text-white"
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-md space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-sky-400">How it works</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight text-white">Elite learning flow</h2>
          </div>
          <div className="grid gap-3.5 md:grid-cols-3">
            {[
              ['Choose a course', 'Filter and pick topics across levels & domains.'],
              ['Practice tutorials', 'Run interactive code and practice live concepts.'],
              ['Earn credentials', 'Complete lessons, clear quizzes, and download certificates.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl bg-slate-900/40 border border-white/5 p-4.5">
                <h3 className="text-xs font-black text-white uppercase tracking-wider">{title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400 font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
