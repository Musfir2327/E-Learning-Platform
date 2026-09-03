import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Play,
  Users,
  Award,
  Clock,
  Code,
  TrendingUp,
  Palette,
  Megaphone,
  BarChart2,
  CheckCircle,
  Star,
  BookOpen
} from 'lucide-react'
import type { Course } from '../types'

function CountUp({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easedProgress = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(easedProgress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

type MarketingHomeProps = {
  courses: Course[]
  tracks?: string[]
  partners?: string[]
  onExploreCourses: () => void
  onOpenTutorials: () => void
}

export function MarketingHome({
  courses,
  onExploreCourses,
  onOpenTutorials,
}: MarketingHomeProps) {
  const topCourse = courses[0]

  const categories = [
    { title: 'Development', count: '1,250+ Courses', icon: Code, badgeColor: 'bg-[#EEF0FF] text-[#4F39F6] border-[#4F39F6]/20' },
    { title: 'Business', count: '980+ Courses', icon: TrendingUp, badgeColor: 'bg-[#ECFDF5] text-[#10B981] border-[#10B981]/20' },
    { title: 'Design', count: '850+ Courses', icon: Palette, badgeColor: 'bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]/20' },
    { title: 'Marketing', count: '760+ Courses', icon: Megaphone, badgeColor: 'bg-[#FFFBEB] text-[#F59E0B] border-[#F59E0B]/20' },
    { title: 'Data Science', count: '680+ Courses', icon: BarChart2, badgeColor: 'bg-sky-50 text-sky-600 border-sky-200' },
    { title: 'Personal Growth', count: '590+ Courses', icon: Award, badgeColor: 'bg-purple-50 text-purple-600 border-purple-200' },
  ]

  if (!topCourse) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#E2E8F0] rounded-3xl">
        <div className="flex items-center gap-3 text-[#334155] font-extrabold uppercase tracking-widest text-xs">
          <span>Loading Platform Catalog</span>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#4F39F6] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#4F39F6] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#4F39F6] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-16 py-4">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 lg:p-14 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF0FF] border border-[#4F39F6]/20 px-4 py-1.5 text-xs font-bold text-[#4F39F6] shadow-xs">
              <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-[#4F39F6] text-[10px] font-black text-white">#</span>
              <span>Platform for Online Learning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172B] leading-[1.15]">
              Learn New Skills. <br />
              <span className="text-gradient-brand">
                Advance Your Future.
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#334155] font-semibold">
              Access 10,000+ online courses taught by industry experts. Learn at your pace. Anytime, anywhere.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreCourses}
                className="btn-primary btn-shimmer flex items-center gap-2.5 cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenTutorials}
                className="btn-secondary flex items-center gap-2.5 cursor-pointer"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF0FF] text-[#4F39F6]">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </div>
                <span>How It Works</span>
              </button>
            </div>

            {/* Social Trust Avatars & Rating */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[#FE9A00]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#334155]">Trusted by <span className="font-black text-[#0F172B]">50K+</span> learners worldwide</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Right with Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EEF0FF]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                alt="Student learning online"
                className="h-[440px] w-full object-cover"
              />

              {/* Floating Feature Cards */}
              <div className="absolute top-4 right-4 space-y-3 max-w-[220px]">
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-[#E2E8F0] animate-float-slow">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B] leading-tight">Expert Instructors</p>
                    <p className="text-[11px] text-[#334155] font-semibold">Learn from experts</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-[#E2E8F0] animate-float-delay">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B] leading-tight">Flexible Learning</p>
                    <p className="text-[11px] text-[#334155] font-semibold">Study on schedule</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-[#E2E8F0] animate-float-slow">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF0FF] text-[#4F39F6]">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B] leading-tight">Certificate</p>
                    <p className="text-[11px] text-[#334155] font-semibold">Boost your career</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur-md border border-[#E2E8F0] animate-float-delay">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B] leading-tight">Lifetime Access</p>
                    <p className="text-[11px] text-[#334155] font-semibold">Learn without limits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0F172B] tracking-tight">Popular Categories</h2>
          </div>
          <button
            type="button"
            onClick={onExploreCourses}
            className="flex items-center gap-1.5 text-xs font-extrabold text-[#4F39F6] hover:text-[#4338CA] transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.title}
                type="button"
                onClick={onExploreCourses}
                className="group brand-card flex flex-col items-center justify-center p-6 text-center cursor-pointer"
              >
                <div className={`grid h-14 w-14 place-items-center rounded-2xl border ${cat.badgeColor} group-hover:scale-110 transition-transform shadow-xs`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-black text-[#0F172B] group-hover:text-[#4F39F6] transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-1 text-[11px] font-bold text-[#64748B]">{cat.count}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section className="rounded-3xl bg-[#EEF0FF]/60 border border-[#4F39F6]/20 p-8 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#4F39F6] bg-[#EEF0FF] border border-[#4F39F6]/30 px-3 py-1 rounded-lg inline-block">Featured Courses</span>
            <h2 className="text-3xl font-black text-[#0F172B] tracking-tight">Most Popular Courses</h2>
            <p className="text-xs text-[#334155] font-semibold">Handpicked courses loved by learners around the world.</p>
          </div>
          <button
            type="button"
            onClick={onExploreCourses}
            className="flex items-center gap-1.5 text-xs font-extrabold text-[#4F39F6] hover:text-[#4338CA] transition-colors cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 4).map((course) => {
            return (
              <div
                key={course.id}
                className="group relative flex flex-col justify-between overflow-hidden brand-card"
              >
                <div className="relative">
                  <img className="h-44 w-full object-cover" src={course.image} alt={course.title} />
                  <span className="absolute top-3 left-3 rounded-lg bg-[#4F39F6] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {course.category}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-black text-[#0F172B] leading-snug group-hover:text-[#4F39F6] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#334155]">
                      By <span className="font-extrabold text-[#0F172B]">{course.instructor}</span>
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex items-center gap-0.5 text-[#FE9A00]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-black text-[#0F172B]">{course.rating.toFixed(1)}</span>
                      <span className="text-[11px] text-[#64748B] font-bold">({(course.students / 10).toFixed(1)}K)</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="badge-purple text-[10px] font-black">
                        {course.duration}
                      </span>
                      <button
                        type="button"
                        onClick={onExploreCourses}
                        className="rounded-xl bg-[#EEF0FF] hover:bg-[#4F39F6] text-[#4F39F6] hover:text-white px-4 py-2 text-xs font-extrabold transition-colors cursor-pointer border border-[#4F39F6]/20 hover:border-transparent"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* STATS BANNER - LIGHT BRAND SECTION WITH REACT COUNT UP */}
      <section className="brand-card bg-white border border-[#E2E8F0] p-8 sm:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.06)] relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10 text-center sm:text-left">
          <div className="space-y-1.5">
            <div className="mx-auto sm:mx-0 grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF0FF] text-[#4F39F6] mb-3 border border-[#4F39F6]/20 shadow-xs">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172B]">
              <CountUp end={10000} suffix="+" />
            </p>
            <p className="text-xs font-bold text-[#64748B]">Online Courses</p>
          </div>

          <div className="space-y-1.5">
            <div className="mx-auto sm:mx-0 grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 mb-3 border border-purple-200 shadow-xs">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172B]">
              <CountUp end={50000} suffix="+" />
            </p>
            <p className="text-xs font-bold text-[#64748B]">Happy Learners</p>
          </div>

          <div className="space-y-1.5">
            <div className="mx-auto sm:mx-0 grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-600 mb-3 border border-sky-200 shadow-xs">
              <Award className="h-6 w-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172B]">
              <CountUp end={200} suffix="+" />
            </p>
            <p className="text-xs font-bold text-[#64748B]">Expert Instructors</p>
          </div>

          <div className="space-y-1.5">
            <div className="mx-auto sm:mx-0 grid h-12 w-12 place-items-center rounded-2xl bg-[#ECFDF5] text-[#10B981] mb-3 border border-[#10B981]/20 shadow-xs">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172B]">
              <CountUp end={100} suffix="%" />
            </p>
            <p className="text-xs font-bold text-[#64748B]">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* LEARN ON YOUR TERMS SECTION */}
      <section className="rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 lg:p-14 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="rounded-full bg-[#EEF0FF] border border-[#4F39F6]/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#4F39F6]">
              LEARN ANYTIME, ANYWHERE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172B] tracking-tight">
              Learn on Your Terms
            </h2>
            <p className="text-sm leading-relaxed text-[#334155] font-semibold max-w-lg">
              Whether you're on your laptop, tablet, or phone, your learning journey goes where you go.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-black text-[#0F172B]">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF0FF] text-[#4F39F6]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span>Access on all devices</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black text-[#0F172B]">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF0FF] text-[#4F39F6]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span>Download lectures</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black text-[#0F172B]">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF0FF] text-[#4F39F6]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span>Learn offline</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreCourses}
                className="btn-primary btn-shimmer flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start Learning Today</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Learning Animation Video Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0F172B] group">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
                className="w-full h-[360px] sm:h-[400px] object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-student-studying-with-a-laptop-42934-large.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                Your browser does not support HTML5 video.
              </video>

              {/* Floating Overlay Badge & Video Control Pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-2xl px-4 py-2 flex items-center gap-2.5 shadow-xl animate-float-slow">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-xs font-black text-[#0F172B]">Live Interactive Video Learning</span>
              </div>

              {/* Center Glowing Play Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#4F39F6]/90 text-white shadow-2xl shadow-[#4F39F6]/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                  <Play className="h-7 w-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Video Progress Bar Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-2xl p-3.5 shadow-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF0FF] text-[#4F39F6] font-black text-xs">
                    HD
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B] leading-tight">Video Tutorial Preview</p>
                    <p className="text-[10px] text-[#64748B] font-bold">Interactive Learning Platform</p>
                  </div>
                </div>

                <div className="h-1.5 flex-1 max-w-[120px] rounded-full bg-[#EEF0FF] overflow-hidden">
                  <div className="h-1.5 rounded-full bg-[#4F39F6] w-3/4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS BANNER */}
      {/*  */}
    </div>
  )
}
