import { useCallback, useMemo, useState, useEffect } from 'react'
import { AdminDashboard } from './components/AdminDashboard'
import { CertificatePanel } from './components/CertificatePanel'
import { CourseCard } from './components/CourseCard'
import { Header } from './components/Header'
import { LessonPlayer } from './components/LessonPlayer'
import { MarketingHome } from './components/MarketingHome'
import { MetricCard } from './components/MetricCard'
import { ProgressPanel } from './components/ProgressPanel'
import { QuizPanel } from './components/QuizPanel'
import { TutorialWorkspace } from './components/TutorialWorkspace'
import { Login } from './components/Login'
import { Chatbot } from './components/Chatbot'
import { adminStats, learningTracks, partnerLogos, tutorialTopics } from './data/platformData'
import type { Lesson, Learner, Course } from './types'

function App() {
  const [currentUser, setCurrentUser] = useState<Learner | null>(null)
  const [activeView, setActiveView] = useState('Home')
  const [coursesList, setCoursesList] = useState<Course[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([])
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([])
  const [passedQuizCourseIds, setPassedQuizCourseIds] = useState<string[]>([])
  const [celebrationCourse, setCelebrationCourse] = useState<string | null>(null)
  const [stats, setStats] = useState<any[]>(adminStats)

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/courses')
      if (res.ok) {
        const data = await res.json()
        setCoursesList(data)
        if (data.length > 0 && !selectedCourseId) {
          setSelectedCourseId(data[0].id)
        }
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err)
    }
  }

  // Fetch admin stats from backend
  const fetchAdminStats = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch('http://localhost:5001/api/courses/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error('Failed to fetch admin stats:', err)
    }
  }

  // Fetch profile details
  const fetchProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch('http://localhost:5001/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setCurrentUser({
          name: data.name,
          role: data.role,
          email: data.email,
          completedCourses: data.completedCourses,
          certificates: data.certificates,
          weeklyGoal: data.weeklyGoal
        })
        setCompletedLessonIds(data.completedLessonIds || [])
        setCompletedTopicIds(data.completedTopicIds || [])
        setPassedQuizCourseIds(data.passedQuizCourseIds || [])
      } else {
        // Token expired/invalid
        localStorage.removeItem('token')
        setCurrentUser(null)
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
    }
  }

  // Load initial application data
  useEffect(() => {
    fetchCourses()
  }, [])

  // Load user profile once courses are fetched
  useEffect(() => {
    if (coursesList.length > 0) {
      fetchProfile()
    }
  }, [coursesList])

  // Fetch admin stats when admin logs in or views Dashboard
  useEffect(() => {
    if (currentUser?.role === 'Admin' && activeView === 'Admin') {
      fetchAdminStats()
    }
  }, [currentUser, activeView])

  // Compute dynamic completed lessons object per course id
  const completedLessonsByCourse = useMemo(() => {
    const initial: Record<string, string[]> = {}
    coursesList.forEach((course) => {
      initial[course.id] = course.lessons
        .filter((l) => completedLessonIds.includes(l.id))
        .map((l) => l.id)
    })
    return initial
  }, [coursesList, completedLessonIds])

  // Compute dynamic courses array where progress field updates dynamically
  const dynamicCourses = useMemo(() => {
    return coursesList.map((course) => {
      const completedIds = completedLessonsByCourse[course.id] ?? []
      const totalLessons = course.lessons.length
      const progress = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0
      return {
        ...course,
        progress,
      }
    })
  }, [completedLessonsByCourse, coursesList])

  const selectedCourse = useMemo(
    () => dynamicCourses.find((course) => course.id === selectedCourseId) ?? dynamicCourses[0],
    [dynamicCourses, selectedCourseId],
  )

  const [selectedLessonState, setSelectedLessonState] = useState<Lesson | null>(null)

  const selectedLesson = useMemo(() => {
    if (selectedLessonState && selectedCourse?.lessons.some(l => l.id === selectedLessonState.id)) {
      return selectedLessonState
    }
    return selectedCourse?.lessons[0] || null
  }, [selectedCourse, selectedLessonState])

  const courseCompletion = useMemo(() => {
    return dynamicCourses.reduce<Record<string, boolean>>((status, course) => {
      status[course.id] = course.progress === 100
      return status
    }, {})
  }, [dynamicCourses])

  const quizLocked = selectedCourse ? selectedCourse.progress !== 100 : true

  const handleCourseSelect = (courseId: string) => {
    if (!currentUser) {
      setActiveView('Login')
      return
    }

    const nextCourse = dynamicCourses.find((course) => course.id === courseId) ?? dynamicCourses[0]
    setSelectedCourseId(courseId)
    setSelectedLessonState(nextCourse.lessons[0])
    setActiveView('Lessons')
  }

  const handleCompleteLesson = async (lessonId: string) => {
    const token = localStorage.getItem('token')
    if (!token || !selectedCourse) return

    try {
      const res = await fetch('http://localhost:5001/api/courses/users/lesson-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: selectedCourse.id, lessonId })
      })

      if (res.ok) {
        const data = await res.json()
        setCompletedLessonIds(data.completedLessonIds)
        setCompletedTopicIds(data.completedTopicIds)
        setPassedQuizCourseIds(data.passedQuizCourseIds)
        
        setCurrentUser(prev => prev ? {
          ...prev,
          completedCourses: data.completedCoursesCount,
          certificates: data.passedQuizCourseIds.length
        } : null)

        const wasCompleted = completedLessonsByCourse[selectedCourse.id]?.includes(lessonId)
        const isCompletedNow = selectedCourse.lessons.every((lesson) => 
          lesson.id === lessonId || completedLessonIds.includes(lesson.id)
        )

        if (!wasCompleted && isCompletedNow) {
          setCelebrationCourse(selectedCourse.title)
        }
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err)
    }
  }

  const handleCompleteTopic = async (topicId: string) => {
    if (!currentUser) {
      setActiveView('Login')
      return
    }
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch('http://localhost:5001/api/courses/users/topic-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ topicId })
      })

      if (res.ok) {
        const data = await res.json()
        setCompletedTopicIds(data.completedTopicIds)
      }
    } catch (err) {
      console.error('Failed to complete topic:', err)
    }
  }

  const handleQuizPass = useCallback(async (courseId: string) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch('http://localhost:5001/api/courses/users/quiz-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      })

      if (res.ok) {
        const data = await res.json()
        setPassedQuizCourseIds(data.passedQuizCourseIds)
        
        setCurrentUser(prev => prev ? {
          ...prev,
          certificates: data.passedQuizCourseIds.length
        } : null)
      }
    } catch (err) {
      console.error('Failed to record quiz pass:', err)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    setCompletedLessonIds([])
    setCompletedTopicIds([])
    setPassedQuizCourseIds([])
    setActiveView('Home')
  }

  const handleAddCourse = async (newCourse: Course) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch('http://localhost:5001/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCourse)
      })

      const data = await res.json()

      if (res.ok) {
        setCoursesList((prev) => [...prev, data])
        fetchAdminStats()
      } else {
        alert(data.message || 'Failed to add course')
      }
    } catch (err: any) {
      alert('Error creating course: ' + err.message)
    }
  }

  const handleEditCourse = async (updatedCourse: Course) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch(`http://localhost:5001/api/courses/${updatedCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedCourse)
      })

      const data = await res.json()

      if (res.ok) {
        setCoursesList((prev) => prev.map((c) => c.id === data.id ? data : c))
      } else {
        alert(data.message || 'Failed to update course')
      }
    } catch (err: any) {
      alert('Error updating course: ' + err.message)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch(`http://localhost:5001/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (res.ok) {
        setCoursesList((prev) => {
          const remaining = prev.filter((c) => c.id !== courseId)
          if (selectedCourseId === courseId && remaining.length > 0) {
            setSelectedCourseId(remaining[0].id)
            setSelectedLessonState(remaining[0].lessons[0])
          }
          return remaining
        })
        fetchAdminStats()
      } else {
        alert(data.message || 'Failed to delete course')
      }
    } catch (err: any) {
      alert('Error deleting course: ' + err.message)
    }
  }

  const handleLoginCallback = (user: any, _token: string) => {
    setCurrentUser({
      name: user.name,
      role: user.role,
      email: user.email,
      completedCourses: user.completedCourses,
      certificates: user.certificates,
      weeklyGoal: user.weeklyGoal
    })
    setCompletedLessonIds(user.completedLessonIds || [])
    setCompletedTopicIds(user.completedTopicIds || [])
    setPassedQuizCourseIds(user.passedQuizCourseIds || [])

    if (user.role === 'Admin') {
      setActiveView('Admin')
    } else {
      setActiveView('Home')
    }
  }

  const renderView = () => {
    const protectedViews = ['Dashboard', 'Lessons', 'Quizzes', 'Certificates', 'Admin']
    if (!currentUser && protectedViews.includes(activeView)) {
      return (
        <Login onLogin={handleLoginCallback} />
      )
    }

    if (activeView === 'Login') {
      return (
        <Login onLogin={handleLoginCallback} />
      )
    }

    if (activeView === 'Home') {
      return (
        <MarketingHome
          courses={dynamicCourses}
          tracks={learningTracks}
          partners={partnerLogos}
          onExploreCourses={() => setActiveView('Courses')}
          onOpenTutorials={() => setActiveView('Tutorials')}
        />
      )
    }

    if (activeView === 'Courses') {
      return (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dynamicCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              isSelected={selectedCourse && course.id === selectedCourse.id}
              isCompleted={courseCompletion[course.id] ?? false}
              isLocked={index > 0 && !courseCompletion[dynamicCourses[index - 1].id]}
              onSelect={handleCourseSelect}
            />
          ))}
        </section>
      )
    }

    if (activeView === 'Lessons') {
      if (!selectedCourse || !selectedLesson) {
        return <div className="text-slate-400 font-semibold">No lessons available. Enroll in a course to start.</div>
      }
      return (
        <LessonPlayer
          course={selectedCourse}
          selectedLesson={selectedLesson}
          completedLessonIds={completedLessonsByCourse[selectedCourse.id] ?? []}
          isCourseCompleted={courseCompletion[selectedCourse.id] ?? false}
          onLessonSelect={setSelectedLessonState}
          onCompleteLesson={handleCompleteLesson}
        />
      )
    }

    if (activeView === 'Tutorials') {
      return (
        <TutorialWorkspace
          topics={tutorialTopics}
          completedTopicIds={completedTopicIds}
          onCompleteTopic={handleCompleteTopic}
        />
      )
    }

    if (activeView === 'Quizzes') {
      if (!selectedCourse) return <div className="text-slate-400 font-semibold">Please select a course first.</div>
      const isLocked = selectedCourse.progress !== 100
      const hasPassed = passedQuizCourseIds.includes(selectedCourse.id)
      return (
        <QuizPanel
          course={selectedCourse}
          isLocked={isLocked}
          hasPassed={hasPassed}
          onPass={() => handleQuizPass(selectedCourse.id)}
        />
      )
    }

    if (activeView === 'Certificates') {
      return (
        <CertificatePanel
          courses={dynamicCourses}
          learner={currentUser!}
          passedQuizCourseIds={passedQuizCourseIds}
        />
      )
    }

    if (activeView === 'Admin') {
      return (
        <AdminDashboard
          stats={stats}
          courses={dynamicCourses}
          onAddCourse={handleAddCourse}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )
    }

    if (!selectedCourse) {
      return <div className="text-slate-400 font-semibold text-center py-10">No courses loaded yet.</div>
    }

    return (
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Enrolled courses" value={dynamicCourses.length} detail="Active learning paths" tone="green" />
          <MetricCard
            label="Completed"
            value={Object.values(courseCompletion).filter(Boolean).length}
            detail="Courses finished"
            tone="blue"
          />
          <MetricCard
            label="Tutorials"
            value={`${completedTopicIds.length}/${tutorialTopics.length}`}
            detail="Required before quiz"
            tone="amber"
          />
          <MetricCard
            label="Certificates"
            value={passedQuizCourseIds.length > 0 ? `${passedQuizCourseIds.length} Earned` : 'Locked'}
            detail="Pass course quiz to unlock"
            tone="rose"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 shadow-lg flex flex-col justify-between">
            <img className="h-64 w-full object-cover border-b border-white/5" src={selectedCourse.image} alt="" />
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Continue learning</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-white">{selectedCourse.title}</h1>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 font-medium">{selectedCourse.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveView('Lessons')}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5.5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110 cursor-pointer"
                >
                  Resume lesson
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('Quizzes')}
                  className={`rounded-xl border px-5.5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    quizLocked
                      ? 'border-amber-500/25 bg-amber-500/10 text-amber-400'
                      : 'border-white/10 text-slate-300 hover:bg-white/5 cursor-pointer'
                  }`}
                >
                  {quizLocked ? 'Quiz locked' : 'Take quiz'}
                </button>
              </div>
            </div>
          </div>

          <ProgressPanel courses={dynamicCourses} learner={currentUser!} />
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 pb-16">
      <Header activeView={activeView} onViewChange={setActiveView} learner={currentUser} onLogout={handleLogout} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeView !== 'Login' && (
          <div className="mb-6 flex flex-col gap-1.5 border-b border-white/5 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{activeView}</h1>
          </div>
        )}
        {renderView()}
      </main>

      {celebrationCourse ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 backdrop-blur-md p-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {Array.from({ length: 45 }).map((_, i) => {
              const left = Math.random() * 100
              const delay = Math.random() * 5
              const duration = 2.5 + Math.random() * 3
              const size = 6 + Math.random() * 8
              const color = ['bg-emerald-400', 'bg-teal-400', 'bg-amber-400', 'bg-rose-400', 'bg-sky-400', 'bg-indigo-400', 'bg-pink-400'][i % 7]
              const rotation = Math.random() * 360
              return (
                <div
                  key={i}
                  className={`absolute rounded-xs opacity-75 animate-confetti ${color}`}
                  style={{
                    left: `${left}%`,
                    top: `-20px`,
                    width: `${size}px`,
                    height: `${size * (0.6 + Math.random() * 0.8)}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                />
              )
            })}
          </div>

          <div className="celebration-pop relative w-full max-w-md rounded-2xl glass-panel bg-slate-900 border border-white/10 p-8 text-center shadow-2xl z-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-2xl text-emerald-400 shadow-md shadow-emerald-500/10">
              🎉
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-wider text-emerald-400">Congratulations</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white">Course Completed</h2>
            <p className="mt-2.5 text-xs font-semibold text-slate-400 leading-relaxed">
              You completed <span className="text-white font-extrabold">{celebrationCourse}</span>. The next course is unlocked now.
            </p>
            <button
              type="button"
              onClick={() => setCelebrationCourse(null)}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110 cursor-pointer"
            >
              Continue Learning
            </button>
          </div>
        </div>
      ) : null}

      <Chatbot />
    </div>
  )
}

export default App
