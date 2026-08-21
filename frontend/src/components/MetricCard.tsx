type MetricCardProps = {
  label: string
  value: string | number
  detail: string
  tone?: 'green' | 'blue' | 'amber' | 'rose'
}

const toneClasses = {
  green: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400',
  blue: 'border-sky-500/25 bg-sky-500/10 text-sky-400',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-400',
  rose: 'border-rose-500/25 bg-rose-500/10 text-rose-400',
}

export function MetricCard({ label, value, detail, tone = 'green' }: MetricCardProps) {
  return (
    <article className="glass-panel rounded-2xl p-5.5 shadow-md flex flex-col justify-between">
      <div>
        <div className={`mb-3 inline-flex rounded-lg border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${toneClasses[tone]}`}>
          {label}
        </div>
        <p className="text-3xl font-black tracking-tight text-white">{value}</p>
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-400 leading-snug">{detail}</p>
    </article>
  )
}
