import React, { useState, useMemo } from 'react'
import { CheckCircle2, Trash2, Search, AlertTriangle } from 'lucide-react'
import type { AdminStat, Course, CourseLevel, Lesson, QuizQuestion } from '../types'
import { MetricCard } from './MetricCard'

type AdminDashboardProps = {
  stats: AdminStat[]
  courses: Course[]
  onAddCourse: (course: Course) => void
  onEditCourse: (course: Course) => void
  onDeleteCourse: (courseId: string) => void
}

export function AdminDashboard({
  stats,
  courses,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}: AdminDashboardProps) {
  const tones = ['indigo', 'purple', 'amber', 'rose'] as const

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' } | null>(null)

  const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'lessons' | 'quiz'>('details')

  // Form states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState<CourseLevel>('Beginner')
  const [instructor, setInstructor] = useState('')
  const [duration, setDuration] = useState('')
  const [image, setImage] = useState('')
  const [summary, setSummary] = useState('')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

  // Dynamic published courses stat
  const dynamicStats = useMemo(() => {
    return stats.map((stat) => {
      if (stat.label === 'Published courses') {
        return {
          ...stat,
          value: courses.length.toString(),
          trend: 'Live catalog size',
        }
      }
      return stat
    })
  }, [stats, courses.length])

  // Open modal for new course
  const handleAddClick = () => {
    setEditingCourse(null)
    setTitle('')
    setCategory('Web Development')
    setLevel('Beginner')
    setInstructor('')
    setDuration('2h 00m')
    setImage('https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=900&q=80')
    setSummary('')
    setLessons([
      { id: 'l1', title: 'Introduction to course topics', duration: '10 min', type: 'video', isCompleted: false },
    ])
    setQuizQuestions([
      {
        id: 'q1',
        question: 'What is the primary topic of this course?',
        choices: ['Topic A', 'Topic B', 'Topic C', 'Topic D'],
        answer: 'Topic A',
      },
    ])
    setActiveTab('details')
    setIsModalOpen(true)
  }

  // Handle file upload and convert to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Open modal for editing course
  const handleEditClick = (course: Course) => {
    setEditingCourse(course)
    setTitle(course.title)
    setCategory(course.category)
    setLevel(course.level)
    setInstructor(course.instructor)
    setDuration(course.duration)
    setImage(course.image)
    setSummary(course.summary)
    setLessons(course.lessons || [])
    setQuizQuestions(course.quiz || [])
    setActiveTab('details')
    setIsModalOpen(true)
  }

  // Pre-load demo details for faster course creation
  const handleLoadDemo = () => {
    setTitle('TypeScript Advanced Masterclass')
    setCategory('Programming')
    setLevel('Advanced')
    setInstructor('Sarah Connor')
    setDuration('6h 45m')
    setImage('https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=900&q=80')
    setSummary(
      'Master advanced type annotations, utility types, decorators, and generic architectural patterns in TypeScript.',
    )
    setLessons([
      { id: 'ts1', title: 'Advanced Generics and Constraints', duration: '25 min', type: 'video', isCompleted: false, youtubeId: 'F2JCjVSZPRc', content: '' },
      { id: 'ts2', title: 'Conditional and Mapped Types', duration: '35 min', type: 'reading', isCompleted: false, youtubeId: '', content: 'Conditional types in TypeScript allow you to select types based on a relations check:\n\n`T extends U ? X : Y`\n\nThis acts like a ternary check for type structures!' },
      { id: 'ts3', title: 'Decorator Patterns in TypeScript', duration: '20 min', type: 'quiz', isCompleted: false, youtubeId: '', content: '' },
    ])
    setQuizQuestions([
      {
        id: 'tsq1',
        question: 'Which keyword is used to build conditional types in TypeScript?',
        choices: ['extends', 'implements', 'typeof', 'keyof'],
        answer: 'extends',
      },
      {
        id: 'tsq2',
        question: 'Which utility type constructs a type with all properties of T set to optional?',
        choices: ['Partial<T>', 'Required<T>', 'Readonly<T>', 'Omit<T>'],
        answer: 'Partial<T>',
      },
    ])
  }

  // Add lesson row
  const addLessonRow = () => {
    const nextId = `lesson-${Date.now()}-${lessons.length}`
    setLessons([
      ...lessons,
      { id: nextId, title: '', duration: '15 min', type: 'video', isCompleted: false, youtubeId: '', content: '' },
    ])
  }

  // Update lesson field
  const updateLessonField = (index: number, field: keyof Lesson, value: any) => {
    setLessons((prev) =>
      prev.map((l, idx) => (idx === index ? { ...l, [field]: value } : l)),
    )
  }

  // Remove lesson row
  const removeLessonRow = (index: number) => {
    setLessons((prev) => prev.filter((_, idx) => idx !== index))
  }

  // Add quiz question row
  const addQuizQuestionRow = () => {
    const nextId = `question-${Date.now()}-${quizQuestions.length}`
    setQuizQuestions([
      ...quizQuestions,
      { id: nextId, question: '', choices: ['', '', '', ''], answer: '' },
    ])
  }

  // Update quiz fields
  const updateQuizField = (index: number, field: keyof QuizQuestion, value: any, choiceIdx?: number) => {
    setQuizQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx === index) {
          if (choiceIdx !== undefined && field === 'choices') {
            const newChoices = [...q.choices]
            newChoices[choiceIdx] = value
            return { ...q, choices: newChoices }
          }
          return { ...q, [field]: value }
        }
        return q
      }),
    )
  }

  // Remove quiz question row
  const removeQuizQuestionRow = (index: number) => {
    setQuizQuestions((prev) => prev.filter((_, idx) => idx !== index))
  }

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Course title is required.')
      return
    }

    const courseId = editingCourse
      ? editingCourse.id
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `course-${Date.now()}`

    const finalCourse: Course = {
      id: courseId,
      title: title.trim(),
      category: category.trim(),
      level: level,
      instructor: instructor.trim() || 'Staff Instructor',
      rating: editingCourse ? editingCourse.rating : 5.0,
      students: editingCourse ? editingCourse.students : 0,
      progress: editingCourse ? editingCourse.progress : 0,
      duration: duration.trim() || '1h 30m',
      image: image.trim() || 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=900&q=80',
      summary: summary.trim(),
      lessons: lessons,
      quiz: quizQuestions,
    }

    if (editingCourse) {
      onEditCourse(finalCourse)
      showToast('Course updated successfully', 'success')
    } else {
      onAddCourse(finalCourse)
      showToast('Course added successfully', 'success')
    }

    setIsModalOpen(false)
  }

  return (
    <section className="space-y-6 relative">
      {/* Toast Notification Popup */}
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div className={`flex items-center gap-3.5 rounded-2xl p-4.5 shadow-2xl border backdrop-blur-md transition-all ${
            toast.type === 'danger'
              ? 'bg-[#FEF2F2] border-[#EF4444]/30 text-[#EF4444]'
              : 'bg-[#ECFDF5] border-[#10B981]/30 text-[#10B981]'
          }`}>
            {toast.type === 'danger' ? (
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EF4444] text-white shadow-sm">
                <Trash2 className="h-4.5 w-4.5" />
              </div>
            ) : (
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#10B981] text-white shadow-sm">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </div>
            )}
            <div>
              <p className="text-xs font-black uppercase tracking-wider">
                {toast.type === 'danger' ? 'Deleted' : 'Success'}
              </p>
              <p className="text-xs font-extrabold text-[#0F172B]">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-3 text-[#64748B] hover:text-[#0F172B] text-sm font-black cursor-pointer"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Metric counters */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dynamicStats.map((stat, index) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.trend}
            tone={tones[index % tones.length]}
          />
        ))}
      </div>

      <div className="space-y-6">
        {/* Published Courses list */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#4F39F6]">Course management</p>
              <h2 className="text-xl font-black tracking-tight text-[#0F172B]">Published courses</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-4 py-2 text-xs font-semibold text-[#0F172B] focus:border-[#4F39F6] focus:bg-white outline-none"
                />
              </div>

              <button
                onClick={handleAddClick}
                className="w-fit rounded-2xl bg-[#4F39F6] hover:bg-[#4338CA] px-5.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#4F39F6]/25 btn-shimmer cursor-pointer whitespace-nowrap"
                type="button"
              >
                + Add new course
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-[#E2E8F0] text-[10px] font-black uppercase tracking-wider text-[#334155]">
                <tr>
                  <th className="py-3 pr-4">Course</th>
                  <th className="py-3 pr-4">Instructor</th>
                  <th className="py-3 pr-4">Students</th>
                  <th className="py-3 pr-4">Category / Level</th>
                  <th className="py-3 pr-4">Lessons / Quiz</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {courses
                  .filter((c) =>
                    !searchQuery.trim() ||
                    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((course) => (
                  <tr key={course.id} className="hover:bg-[#EEF0FF]/40 transition-colors duration-200">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img className="h-10 w-14 rounded-lg object-cover border border-[#E2E8F0]" src={course.image} alt="" />
                        <div>
                          <p className="font-black text-[#0F172B] text-sm leading-snug">{course.title}</p>
                          <p className="text-[10px] font-bold text-[#64748B]">{course.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-[#334155] font-bold">{course.instructor}</td>
                    <td className="py-4 pr-4 text-[#334155] font-bold">{course.students.toLocaleString()}</td>
                    <td className="py-4 pr-4 text-[#334155] font-bold">
                      <span className="block font-black text-[#0F172B]">{course.category}</span>
                      <span className="text-[10px] font-extrabold text-[#4F39F6]">{course.level}</span>
                    </td>
                    <td className="py-4 pr-4 text-[#334155] font-bold">
                      <span className="block font-black text-[#4F39F6]">{course.lessons?.length || 0} Lessons</span>
                      <span className="text-[10px] text-[#64748B] font-semibold">{course.quiz?.length || 0} Qs Quiz</span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(course)}
                          className="rounded-xl border border-[#E2E8F0] hover:border-[#4F39F6] hover:bg-[#EEF0FF] px-3 py-1.5 text-xs font-bold text-[#334155] hover:text-[#4F39F6] transition-all duration-200 cursor-pointer"
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingCourse(course)}
                          className="rounded-xl border border-[#E2E8F0] hover:border-rose-300 hover:bg-rose-50 px-3 py-1.5 text-xs font-bold text-[#334155] hover:text-rose-600 transition-all duration-200 cursor-pointer"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sleek Light Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-extrabold text-lg cursor-pointer"
              type="button"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs font-black tracking-wider uppercase text-indigo-600">
                {editingCourse ? 'Modify Course' : 'Create Course'}
              </span>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-2xl font-black text-slate-900">
                  {editingCourse ? 'Edit Course Details' : 'Add New Course'}
                </h3>
                {!editingCourse && (
                  <button
                    onClick={handleLoadDemo}
                    className="rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 transition cursor-pointer"
                    type="button"
                  >
                    ⚡ Load Demo Preset
                  </button>
                )}
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 mb-6 gap-2">
              {[
                { id: 'details', label: '1. General Details' },
                { id: 'lessons', label: `2. Lessons (${lessons.length})` },
                { id: 'quiz', label: `3. Quiz Questions (${quizQuestions.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Tab 1: Course Details */}
              {activeTab === 'details' && (
                <div className="grid gap-4 sm:grid-cols-2 max-h-[50vh] overflow-y-auto pr-1">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Advanced TypeScript Patterns"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Instructor Name
                    </label>
                    <input
                      type="text"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Web Development"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as CourseLevel)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 5h 30m"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Banner Image
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      {image && (
                        <img 
                          src={image} 
                          alt="Banner Preview" 
                          className="h-12 w-20 rounded-lg object-cover border border-slate-200"
                        />
                      )}
                      <div className="flex-1 flex gap-3 w-full">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="Paste image URL or upload file..."
                          className="flex-1 min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                        />
                        <label className="shrink-0 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-700 hover:text-indigo-600 transition duration-200 cursor-pointer text-center whitespace-nowrap">
                          Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                      Short Summary *
                    </label>
                    <textarea
                      required
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Give a brief summary of the path objectives..."
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Lessons */}
              {activeTab === 'lessons' && (
                <div className="space-y-4">
                  <div className="max-h-[45vh] overflow-y-auto space-y-3.5 pr-1">
                    {lessons.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No lessons added. Click below to add one.</p>
                    ) : (
                      lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-3"
                        >
                          <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr_auto] items-end">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                required
                                value={lesson.title}
                                onChange={(e) => updateLessonField(index, 'title', e.target.value)}
                                placeholder="e.g. Type Casting basics"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Duration
                              </label>
                              <input
                                type="text"
                                required
                                value={lesson.duration}
                                onChange={(e) => updateLessonField(index, 'duration', e.target.value)}
                                placeholder="e.g. 15 min"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Type
                              </label>
                              <select
                                value={lesson.type}
                                onChange={(e) => updateLessonField(index, 'type', e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                              >
                                <option value="video">Video Lesson</option>
                                <option value="reading">Reading Resource</option>
                                <option value="quiz">Checkpoint Quiz</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeLessonRow(index)}
                              className="rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-2 text-xs font-bold transition cursor-pointer"
                              type="button"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Conditional Fields based on lesson type */}
                          {lesson.type === 'video' && (
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                YouTube Video ID *
                              </label>
                              <input
                                type="text"
                                value={lesson.youtubeId || ''}
                                onChange={(e) => updateLessonField(index, 'youtubeId', e.target.value)}
                                placeholder="e.g. Ke90Tje7VS0"
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                              />
                            </div>
                          )}

                          {lesson.type === 'reading' && (
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Reading Content
                              </label>
                              <textarea
                                value={lesson.content || ''}
                                onChange={(e) => updateLessonField(index, 'content', e.target.value)}
                                placeholder="Write lesson markdown/text content..."
                                rows={4}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600 resize-none"
                              />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={addLessonRow}
                    className="w-full rounded-2xl border border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 py-3 text-xs font-bold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                    type="button"
                  >
                    + Add Lesson Item
                  </button>
                </div>
              )}

              {/* Tab 3: Quiz Questions */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  <div className="max-h-[45vh] overflow-y-auto space-y-4 pr-1">
                    {quizQuestions.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No quiz questions added. Click below to add one.</p>
                    ) : (
                      quizQuestions.map((q, qIndex) => (
                        <div
                          key={q.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                              Question {qIndex + 1}
                            </span>
                            <button
                              onClick={() => removeQuizQuestionRow(qIndex)}
                              className="rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 px-2 py-1 text-[10px] font-bold transition cursor-pointer"
                              type="button"
                            >
                              Remove
                            </button>
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Question Text
                            </label>
                            <input
                              type="text"
                              required
                              value={q.question}
                              onChange={(e) => updateQuizField(qIndex, 'question', e.target.value)}
                              placeholder="e.g. What is React memo used for?"
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                            />
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            {q.choices.map((choice, choiceIdx) => (
                              <div key={choiceIdx}>
                                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                  Choice {choiceIdx + 1}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={choice}
                                  onChange={(e) => updateQuizField(qIndex, 'choices', e.target.value, choiceIdx)}
                                  placeholder={`Choice Option ${choiceIdx + 1}`}
                                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                                />
                              </div>
                            ))}
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Correct Answer
                            </label>
                            <select
                              value={q.answer}
                              onChange={(e) => updateQuizField(qIndex, 'answer', e.target.value)}
                              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-600"
                            >
                              <option value="">Select correct option answer</option>
                              {q.choices.map((choice, cIndex) => (
                                <option key={cIndex} value={choice}>
                                  {choice || `Option ${cIndex + 1}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={addQuizQuestionRow}
                    className="w-full rounded-2xl border border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 py-3 text-xs font-bold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                    type="button"
                  >
                    + Add Quiz Question
                  </button>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl border border-slate-200 px-5.5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-5.5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 btn-shimmer cursor-pointer"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deletingCourse && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0F172B]/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="brand-card bg-white border border-[#E2E8F0] p-6 sm:p-8 text-center shadow-2xl space-y-5 max-w-md w-full rounded-3xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#FEF2F2] border border-[#EF4444]/30 text-[#EF4444] shadow-sm">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-[#0F172B]">Delete Course</h3>
              <p className="text-xs text-[#334155] font-semibold leading-relaxed">
                Are you sure you want to delete <span className="font-extrabold text-[#0F172B]">"{deletingCourse.title}"</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCourse(null)}
                className="btn-secondary flex-1 py-3 text-xs font-extrabold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteCourse(deletingCourse.id)
                  showToast('Course deleted successfully', 'danger')
                  setDeletingCourse(null)
                }}
                className="flex-1 rounded-2xl bg-[#EF4444] hover:bg-rose-700 text-white py-3 text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-rose-500/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
