export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type LessonType = 'video' | 'reading' | 'quiz'

export type Lesson = {
  id: string
  title: string
  duration: string
  type: LessonType
  isCompleted: boolean
  youtubeId?: string
  content?: string
}

export type QuizQuestion = {
  id: string
  question: string
  choices: string[]
  answer: string
}

export type Course = {
  id: string
  title: string
  category: string
  level: CourseLevel
  instructor: string
  rating: number
  students: number
  progress: number
  duration: string
  image: string
  summary: string
  lessons: Lesson[]
  quiz: QuizQuestion[]
}

export type Learner = {
  name: string
  role: 'Student' | 'Admin'
  email: string
  completedCourses: number
  certificates: number
  weeklyGoal: number
}

export type AdminStat = {
  label: string
  value: string
  trend: string
}

export type TutorialTopic = {
  id: string
  title: string
  description: string
  category: string
  language: string
  difficulty: CourseLevel
  example: string
}
