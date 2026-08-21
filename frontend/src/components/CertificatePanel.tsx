import { useState } from 'react'
import { jsPDF } from 'jspdf'
import type { Course, Learner } from '../types'

type CertificatePanelProps = {
  courses: Course[]
  learner: Learner
  passedQuizCourseIds: string[]
}

export function CertificatePanel({ courses, learner, passedQuizCourseIds }: CertificatePanelProps) {
  // Find first completed course with passed quiz, or default to the first course
  const completedAndPassed = courses.filter(
    (c) => c.progress === 100 && passedQuizCourseIds.includes(c.id)
  )
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    completedAndPassed.length > 0 ? completedAndPassed[0].id : courses[0]?.id ?? null
  )

  const currentPreviewCourse = courses.find((c) => c.id === selectedCourseId) ?? courses[0]
  const isPreviewCourseEligible = currentPreviewCourse
    ? currentPreviewCourse.progress === 100 && passedQuizCourseIds.includes(currentPreviewCourse.id)
    : false

  const downloadPDF = () => {
    if (!currentPreviewCourse) return

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    // 1. Dark Background fill (#0b0f19)
    doc.setFillColor(11, 15, 25)
    doc.rect(0, 0, 297, 210, 'F')

    // 2. Outer gold/amber border (#d97706)
    doc.setDrawColor(217, 119, 6)
    doc.setLineWidth(1.5)
    doc.rect(10, 10, 277, 190, 'D')

    // 3. Inner thin border
    doc.setLineWidth(0.5)
    doc.rect(13, 13, 271, 184, 'D')

    // 4. Logo header
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text('LEARNHUB ACADEMY', 148.5, 35, { align: 'center' })

    doc.setTextColor(148, 163, 184) // #94a3b8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('CERTIFICATE OF COMPLETION', 148.5, 43, { align: 'center' })

    // 5. Honorable Award title
    doc.setTextColor(245, 158, 11) // #f59e0b
    doc.setFont('times', 'italic')
    doc.setFontSize(26)
    doc.text('Honorable Award', 148.5, 65, { align: 'center' })

    // 6. Certification reason text
    doc.setTextColor(148, 163, 184)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    const reasonText = 'This is to certify that the student named below has successfully met all curriculum criteria and passed all required assessments for'
    const splitReason = doc.splitTextToSize(reasonText, 200)
    doc.text(splitReason, 148.5, 80, { align: 'center' })

    // 7. Student Name
    doc.setTextColor(255, 255, 255)
    doc.setFont('times', 'bold')
    doc.setFontSize(36)
    doc.text(learner.name, 148.5, 105, { align: 'center' })

    // Draw line under name
    doc.setDrawColor(51, 65, 85) // #334155
    doc.setLineWidth(1)
    doc.line(70, 112, 227, 112)

    // 8. Course Title
    doc.setTextColor(16, 185, 129) // #10b981
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(currentPreviewCourse.title, 148.5, 128, { align: 'center' })

    // 9. Details text
    doc.setTextColor(148, 163, 184)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const details = 'A professional certificate program of study with interactive workspaces, video lessons, reading checkpoints, and final exams.'
    const splitDetails = doc.splitTextToSize(details, 210)
    doc.text(splitDetails, 148.5, 140, { align: 'center' })

    // 10. Footer fields
    // Left: Instructor signature
    doc.setTextColor(226, 232, 240)
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.text(currentPreviewCourse.instructor, 55, 175, { align: 'center' })
    doc.setDrawColor(71, 85, 105) // #475569
    doc.setLineWidth(0.5)
    doc.line(25, 178, 85, 178)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('LEAD INSTRUCTOR', 55, 183, { align: 'center' })

    // Right: Dean signature
    doc.setTextColor(226, 232, 240)
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.text('Dr. A. Fernando', 242, 175, { align: 'center' })
    doc.line(212, 178, 272, 178)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('DEAN OF ACADEMY', 242, 183, { align: 'center' })

    // Center: Verification key
    doc.setTextColor(71, 85, 105)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    const certId = `LH-${currentPreviewCourse.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
    doc.text(certId, 148.5, 178, { align: 'center' })
    doc.text('VERIFIED SECURE BY LEARNHUB ACADEMY', 148.5, 183, { align: 'center' })

    // Save PDF
    doc.save(`Certificate_${learner.name.replace(/\s+/g, '_')}_${currentPreviewCourse.id}.pdf`)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {currentPreviewCourse ? (
        <div className="glass-panel rounded-2xl p-6 shadow-md">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Certificate preview</p>
          <div className={`mt-5 rounded-xl border-8 border-double p-8 text-center transition-all duration-300 bg-slate-950/40 ${
            isPreviewCourseEligible ? 'border-amber-500/30 shadow-lg shadow-amber-500/5' : 'border-slate-800 opacity-40'
          }`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Certificate of Completion</p>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white">{learner.name}</h2>
            <p className="mt-4 text-xs font-medium text-slate-400">has successfully and dynamically completed all course requirements for</p>
            <p className="mt-3 text-lg font-extrabold text-emerald-400">{currentPreviewCourse.title}</p>
            <p className="mt-8 text-[10px] font-bold text-slate-500">Issued by LearnHub Academy & Verification Services</p>
          </div>
          
          {isPreviewCourseEligible ? (
            <button
              type="button"
              onClick={downloadPDF}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110"
            >
              Download certificate
            </button>
          ) : (
            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs font-semibold leading-relaxed text-amber-400">
              Complete all lessons in this course and pass its quiz to unlock this certificate.
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-6 shadow-md text-center text-slate-400 py-10">
          No courses available to preview.
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-black tracking-tight text-white">Certificate eligibility</h2>
        <p className="mt-1 text-xs text-slate-400 font-medium">Click a course below to preview its certificate.</p>
        
        <div className="mt-5 space-y-3.5">
          {courses.map((course) => {
            const isCompleted = course.progress === 100
            const isQuizPassed = passedQuizCourseIds.includes(course.id)
            const isEligible = isCompleted && isQuizPassed
            const isCurrentSelection = course.id === selectedCourseId

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourseId(course.id)}
                className={`w-full text-left flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 cursor-pointer ${
                  isCurrentSelection
                    ? 'border-emerald-500/45 bg-emerald-500/10 shadow-sm'
                    : 'border-white/5 bg-slate-900/40 hover:border-slate-800 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <h3 className="text-sm font-bold text-white">{course.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {!isCompleted
                      ? `Lessons remaining: ${100 - course.progress}%`
                      : !isQuizPassed
                      ? 'Lessons completed. Quiz required.'
                      : 'Completed & Certified!'}
                  </p>
                </div>
                <span className={`w-fit rounded-lg px-3 py-1.5 text-xs font-extrabold tracking-wide whitespace-nowrap ${
                  isEligible
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    : isCompleted
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                }`}>
                  {isEligible ? 'Certified' : isCompleted ? 'Take Quiz' : 'In Progress'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
