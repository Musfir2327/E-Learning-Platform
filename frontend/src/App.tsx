import { useCallback, useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminDashboard } from './components/AdminDashboard'
import { CertificatePanel } from './components/CertificatePanel'
import { CourseCard } from './components/CourseCard'
import { Header } from './components/Header'
import { LessonPlayer } from './components/LessonPlayer'
import { MarketingHome } from './components/MarketingHome'
import { MetricCard } from './components/MetricCard'
import { ProgressPanel } from './components/ProgressPanel'
import { QuizPanel, triggerCelebrationConfetti } from './components/QuizPanel'
import { TutorialWorkspace } from './components/TutorialWorkspace'
import { Login } from './components/Login'
import { CareerPathwayContainer } from './components/CareerPathway/CareerPathwayContainer'
import { adminStats, learningTracks, partnerLogos, tutorialTopics } from './data/platformData'
import type { Lesson, Learner, Course } from './types'
import { ArrowRight, HelpCircle } from 'lucide-react'

function App() {
  const [currentUser, setCurrentUser] = useState<Learner | null>(null)
  const [activeView, setActiveView] = useState(() =>
    window.location.pathname === '/career-pathway' || window.location.hash.includes('career-pathway')
      ? 'Career Pathway'
      : 'Home'
  )
  const [coursesList, setCoursesList] = useState<Course[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([])
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([])
  const [passedQuizCourseIds, setPassedQuizCourseIds] = useState<string[]>([])
  const [celebrationCourse, setCelebrationCourse] = useState<string | null>(null)
  const [stats, setStats] = useState<any[]>(adminStats)

  useEffect(() => {
    if (celebrationCourse) {
      triggerCelebrationConfetti()
    }
  }, [celebrationCourse])

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
        localStorage.removeItem('token')
        setCurrentUser(null)
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    if (coursesList.length > 0) {
      fetchProfile()
    }
  }, [coursesList])

  useEffect(() => {
    if (currentUser?.role === 'Admin' && activeView === 'Admin') {
      fetchAdminStats()
    }
  }, [currentUser, activeView])

  const completedLessonsByCourse = useMemo(() => {
    const initial: Record<string, string[]> = {}
    coursesList.forEach((course) => {
      initial[course.id] = course.lessons
        .filter((l) => completedLessonIds.includes(l.id))
        .map((l) => l.id)
    })
    return initial
  }, [coursesList, completedLessonIds])

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
        return <div className="text-[#64748B] font-semibold">No lessons available. Enroll in a course to start.</div>
      }
      return (
        <LessonPlayer
          course={selectedCourse}
          selectedLesson={selectedLesson}
          completedLessonIds={completedLessonsByCourse[selectedCourse.id] ?? []}
          isCourseCompleted={courseCompletion[selectedCourse.id] ?? false}
          onLessonSelect={setSelectedLessonState}
          onCompleteLesson={handleCompleteLesson}
          onGoToQuiz={() => setActiveView('Quizzes')}
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

    if (activeView === 'Career Pathway' || activeView === 'CareerPathway') {
      return <CareerPathwayContainer />
    }

    if (activeView === 'Quizzes') {
      if (!selectedCourse) return <div className="text-[#64748B] font-semibold">Please select a course first.</div>
      const isLocked = selectedCourse.progress !== 100
      const hasPassed = passedQuizCourseIds.includes(selectedCourse.id)
      return (
        <QuizPanel
          course={selectedCourse}
          isLocked={isLocked}
          hasPassed={hasPassed}
          onPass={() => handleQuizPass(selectedCourse.id)}
          onGoToCertificate={() => setActiveView('Certificates')}
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
      return <div className="text-[#64748B] font-semibold text-center py-10">No courses loaded yet.</div>
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
          <div className="overflow-hidden brand-card shadow-sm flex flex-col justify-between">
            <img className="h-64 w-full object-cover border-b border-[#E2E8F0]" src={selectedCourse.image} alt="" />
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Continue learning</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-[#0F172B]">{selectedCourse.title}</h1>
                <p className="mt-2 text-xs leading-relaxed text-[#334155] font-semibold">{selectedCourse.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveView('Lessons')}
                  className="btn-primary btn-shimmer py-3 px-6 text-xs font-extrabold cursor-pointer"
                >
                  Resume lesson
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('Quizzes')}
                  className={`rounded-2xl border px-6 py-3 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    quizLocked
                      ? 'border-[#F59E0B]/30 bg-[#FFFBEB] text-[#B45309]'
                      : 'btn-secondary cursor-pointer'
                  }`}
                >
                  {quizLocked ? 'Quiz locked' : 'Take 5-Question Quiz'}
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172B] pb-16 font-sans">
      <Header activeView={activeView} onViewChange={setActiveView} learner={currentUser} onLogout={handleLogout} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeView !== 'Login' && (
          <div className="">
            {/* <h1 className="text-3xl font-black tracking-tight text-[#0F172B] sm:text-4xl">{activeView}</h1> */}
          </div>
        )}
        {renderView()}
      </main>

      {/* Course Completion Celebration Modal */}
      <AnimatePresence>
        {celebrationCourse ? (
          <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/60 backdrop-blur-md p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center shadow-2xl space-y-6 overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#10B981] via-amber-400 to-[#4F39F6]" />

              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#EEF0FF] text-3xl text-[#4F39F6] border border-[#4F39F6]/20 shadow-md"
              >
                🎉
              </motion.div>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#4F39F6]">CONGRATULATIONS</span>
                <h2 className="text-2xl font-black tracking-tight text-[#0F172B]">Course Lessons Completed!</h2>
                <p className="text-xs font-semibold text-[#334155] leading-relaxed pt-1">
                  You completed all lessons for <span className="text-[#0F172B] font-extrabold">{celebrationCourse}</span>. The 5-question final quiz is now unlocked!
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCelebrationCourse(null)
                    setActiveView('Quizzes')
                  }}
                  className="btn-primary btn-shimmer w-full flex items-center justify-center gap-2 py-3.5 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-lg shadow-[#4F39F6]/20"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Take 5-Question Quiz Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCelebrationCourse(null)}
                  className="btn-secondary w-full py-3 text-xs font-bold cursor-pointer"
                >
                  Close Modal
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Chatbot removed as per user request */}
    </div>
  )
}

export default App
