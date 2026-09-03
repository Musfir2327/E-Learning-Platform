import { useState } from 'react'
import { jsPDF } from 'jspdf'
import type { Course, Learner } from '../types'
import { Download, CheckCircle2, AlertCircle, Award, ShieldCheck, BookOpen, Clock } from 'lucide-react'

type CertificatePanelProps = {
  courses: Course[]
  learner: Learner
  passedQuizCourseIds: string[]
}

export function CertificatePanel({ courses, learner, passedQuizCourseIds }: CertificatePanelProps) {
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

    // 1. Background fill (#F8FAFC)
    doc.setFillColor(248, 250, 252)
    doc.rect(0, 0, 297, 210, 'F')

    // 2. Outer Primary Purple border (#4F39F6)
    doc.setDrawColor(79, 57, 246)
    doc.setLineWidth(1.5)
    doc.rect(10, 10, 277, 190, 'D')

    // 3. Inner Gold border (#FE9A00)
    doc.setDrawColor(254, 154, 0)
    doc.setLineWidth(0.6)
    doc.rect(13, 13, 271, 184, 'D')

    // 4. Logo header
    doc.setTextColor(15, 23, 43)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(24)
    doc.text('LEARNHUB ACADEMY', 148.5, 36, { align: 'center' })

    doc.setTextColor(79, 57, 246)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('OFFICIAL CERTIFICATE OF COMPLETION', 148.5, 44, { align: 'center' })

    // 5. Honorable Award title
    doc.setTextColor(254, 154, 0)
    doc.setFont('times', 'italic')
    doc.setFontSize(26)
    doc.text('Certificate of Mastery & Achievement', 148.5, 66, { align: 'center' })

    // 6. Certification reason text
    doc.setTextColor(51, 65, 85)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    const reasonText = 'This certifies that the candidate named below has completed all required coursework, video lectures, and passed the 5-question final assessment for'
    const splitReason = doc.splitTextToSize(reasonText, 210)
    doc.text(splitReason, 148.5, 80, { align: 'center' })

    // 7. Student Name
    doc.setTextColor(15, 23, 43)
    doc.setFont('times', 'bold')
    doc.setFontSize(36)
    doc.text(learner.name, 148.5, 106, { align: 'center' })

    // Underline
    doc.setDrawColor(79, 57, 246)
    doc.setLineWidth(1)
    doc.line(70, 113, 227, 113)

    // 8. Course Title
    doc.setTextColor(79, 57, 246)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text(currentPreviewCourse.title, 148.5, 128, { align: 'center' })

    // 9. Details text
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const details = 'A professional online learning program verified by LearnHub Academy & Skill Evaluation System.'
    const splitDetails = doc.splitTextToSize(details, 210)
    doc.text(splitDetails, 148.5, 140, { align: 'center' })

    // 10. Footer signatures
    doc.setTextColor(15, 23, 43)
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.text(currentPreviewCourse.instructor, 55, 175, { align: 'center' })
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.5)
    doc.line(25, 178, 85, 178)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('COURSE INSTRUCTOR', 55, 183, { align: 'center' })

    doc.setTextColor(15, 23, 43)
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.text('Dr. Ayesha Fernando', 242, 175, { align: 'center' })
    doc.line(212, 178, 272, 178)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text('ACADEMY DIRECTOR', 242, 183, { align: 'center' })

    // Center Certificate ID
    doc.setTextColor(79, 57, 246)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const certId = `CERT-LH-${currentPreviewCourse.id.toUpperCase()}-2026`
    doc.text(certId, 148.5, 178, { align: 'center' })
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('VERIFIED DIGITAL CERTIFICATE', 148.5, 183, { align: 'center' })

    doc.save(`Certificate_${learner.name.replace(/\s+/g, '_')}_${currentPreviewCourse.id}.pdf`)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch py-2">
      {/* Left Column: Certificate Visual Card & CTA */}
      {currentPreviewCourse ? (
        <div className="brand-card p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between h-full">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="badge-purple text-xs font-black">Certificate Preview</span>
              <h2 className="text-xl font-black text-[#0F172B] tracking-tight">{currentPreviewCourse.title}</h2>
            </div>
            {isPreviewCourseEligible ? (
              <span className="badge-success text-xs font-black flex items-center gap-1.5 px-3 py-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Eligible</span>
              </span>
            ) : (
              <span className="badge-warning text-xs font-black flex items-center gap-1.5 px-3 py-1">
                <Clock className="h-4 w-4" />
                <span>Incomplete</span>
              </span>
            )}
          </div>

          {/* Luxury Official Certificate Visual Frame */}
          <div className={`relative rounded-3xl border-8 border-double p-8 sm:p-10 text-center transition-all duration-300 bg-gradient-to-br from-white via-[#EEF0FF]/30 to-purple-50/40 space-y-5 overflow-hidden ${
            isPreviewCourseEligible 
              ? 'border-[#4F39F6]/40 shadow-xl shadow-[#4F39F6]/10' 
              : 'border-[#E2E8F0] opacity-60'
          }`}>
            {/* Corner Ribbon / Verified Seal Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-[#4F39F6] text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-md">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              <span>Verified</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="inline-block rounded-full bg-[#FFFBEB] border border-[#FE9A00]/30 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-[#FE9A00] shadow-xs">
                Official Certificate of Completion
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172B] pt-2">
                {learner.name}
              </h2>
            </div>

            <p className="text-xs font-semibold text-[#334155] max-w-md mx-auto leading-relaxed">
              has successfully completed all required lessons, video modules, and passed the final 5-question evaluation quiz for
            </p>

            <div className="py-2 space-y-1">
              <p className="text-xl sm:text-2xl font-black text-[#4F39F6] tracking-tight">
                {currentPreviewCourse.title}
              </p>
              <p className="text-[11px] font-extrabold text-[#64748B]">
                Instructor: {currentPreviewCourse.instructor} • Category: {currentPreviewCourse.category}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">Certificate ID</p>
                <p className="text-xs font-mono font-black text-[#0F172B]">CERT-LH-{currentPreviewCourse.id.toUpperCase()}-2026</p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">Issuer</p>
                <p className="text-xs font-black text-[#4F39F6]">LearnHub Academy</p>
              </div>
            </div>
          </div>

          {/* Metadata Features Box */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEF0FF] text-[#4F39F6]">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#0F172B]">{currentPreviewCourse.lessons.length} Modules</p>
                <p className="text-[10px] font-bold text-[#64748B]">100% Course Content</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-50 text-purple-600">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#0F172B]">Verified Credential</p>
                <p className="text-[10px] font-bold text-[#64748B]">PDF Download</p>
              </div>
            </div>
          </div>
          
          {isPreviewCourseEligible ? (
            <button
              type="button"
              onClick={downloadPDF}
              className="btn-primary btn-shimmer w-full flex items-center justify-center gap-2.5 py-3.5 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-lg shadow-[#4F39F6]/20"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Certificate</span>
            </button>
          ) : (
            <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-4.5 text-xs font-bold leading-relaxed text-[#B45309] flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-[#F59E0B] shrink-0" />
              <span>Complete all lessons in this course and pass its 5-question quiz to unlock instant PDF certificate generation.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="brand-card p-8 text-center text-[#64748B] font-bold h-full">
          No courses available to preview.
        </div>
      )}

      {/* Right Column: Certificate Eligibility List */}
      <div className="brand-card p-6 sm:p-8 space-y-4 shadow-sm h-full">
        <div className="border-b border-[#E2E8F0] pb-3 space-y-1">
          <h2 className="text-xl font-black tracking-tight text-[#0F172B]">Certificate Eligibility</h2>
          <p className="text-xs text-[#334155] font-semibold">Select any course below to preview or download its official certificate.</p>
        </div>
        
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
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
                className={`w-full text-left flex flex-col gap-3 rounded-2xl border p-4.5 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 cursor-pointer ${
                  isCurrentSelection
                    ? 'border-[#4F39F6] bg-[#EEF0FF] shadow-xs'
                    : 'border-[#E2E8F0] bg-white hover:bg-[#EEF0FF]/40 hover:border-[#4F39F6]/30'
                }`}
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-[#0F172B]">{course.title}</h3>
                  <p className="text-xs text-[#64748B] font-semibold">
                    {!isCompleted
                      ? `Lessons remaining: ${100 - course.progress}%`
                      : !isQuizPassed
                      ? 'Lessons completed. 5-Question Quiz required.'
                      : 'Completed & Certified!'}
                  </p>
                </div>

                <span className={`w-fit rounded-xl px-3 py-1.5 text-xs font-black tracking-wide whitespace-nowrap ${
                  isEligible
                    ? 'bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/30'
                    : isCompleted
                    ? 'bg-[#FFFBEB] text-[#F59E0B] border border-[#F59E0B]/30'
                    : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
                }`}>
                  {isEligible ? '✓ Certified' : isCompleted ? 'Take Quiz' : 'In Progress'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
