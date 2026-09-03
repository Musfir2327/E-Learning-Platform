type MetricCardProps = {
  label: string
  value: string | number
  detail: string
  tone?: 'green' | 'blue' | 'amber' | 'rose' | 'indigo' | 'purple'
}

const toneClasses = {
  indigo: 'border-indigo-200 bg-indigo-100/80 text-indigo-900 font-black',
  purple: 'border-purple-200 bg-purple-100/80 text-purple-900 font-black',
  green: 'border-emerald-200 bg-emerald-100/80 text-emerald-900 font-black',
  blue: 'border-sky-200 bg-sky-100/80 text-sky-900 font-black',
  amber: 'border-amber-200 bg-amber-100/80 text-amber-900 font-black',
  rose: 'border-rose-200 bg-rose-100/80 text-rose-900 font-black',
}

export function MetricCard({ label, value, detail, tone = 'indigo' }: MetricCardProps) {
  const toneKey = toneClasses[tone] ? tone : 'indigo'
  return (
    <article className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5">
      <div>
        <div className={`mb-3 inline-flex rounded-xl border px-3 py-1 text-[10px] uppercase tracking-wider ${toneClasses[toneKey]}`}>
          {label}
        </div>
        <p className="text-3xl font-black tracking-tight text-slate-900">{value}</p>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-700 leading-snug">{detail}</p>
    </article>
  )
}
