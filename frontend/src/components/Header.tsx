import type { Learner } from '../types'

type HeaderProps = {
  activeView: string
  onViewChange: (view: string) => void
  learner: Learner | null
  onLogout: () => void
}

const navItems = ['Home', 'Dashboard', 'Courses', 'Tutorials', 'Lessons', 'Quizzes', 'Certificates', 'Admin']

export function Header({ activeView, onViewChange, learner, onLogout }: HeaderProps) {
  const visibleNavItems = navItems.filter((item) => {
    if (!learner) {
      return ['Home', 'Courses', 'Tutorials'].includes(item)
    }
    if (item === 'Admin') {
      return learner.role === 'Admin'
    }
    return true
  })

  return (
    <header className="sticky top-0 z-30 glass-header">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <button
            className="flex w-fit items-center gap-2 text-left focus:outline-none"
            type="button"
            onClick={() => onViewChange('Home')}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 text-sm font-black text-white shadow-md shadow-emerald-500/25">
              L
            </span>
            <span>
              <span className="block text-base font-black tracking-tight text-white">
                Learn<span className="text-emerald-400">Hub</span>
              </span>
              <span className="block text-[10px] font-medium text-slate-400">Online learning platform</span>
            </span>
          </button>
          
          {!learner ? (
            <button
              type="button"
              onClick={() => onViewChange('Login')}
              className="lg:hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow shadow-emerald-500/25 btn-shimmer hover:brightness-110"
            >
              Sign In
            </button>
          ) : (
            <div className="lg:hidden flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-slate-900/50 px-2.5 py-1">
                <div className="grid h-7 w-7 place-items-center rounded bg-gradient-to-br from-sky-500 to-blue-600 text-[10px] font-black text-white shadow shadow-sky-500/20">
                  {learner.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-100 whitespace-nowrap">{learner.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 leading-none">{learner.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:text-rose-400 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <nav className="flex flex-wrap gap-1 justify-center lg:justify-start py-1 lg:py-0" aria-label="Main navigation">
          {visibleNavItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onViewChange(item)}
              className={`shrink-0 rounded-md px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                activeView === item
                  ? 'bg-emerald-600 text-white shadow shadow-emerald-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {!learner ? (
          <button
            type="button"
            onClick={() => onViewChange('Login')}
            className="hidden lg:block rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow shadow-emerald-500/25 btn-shimmer hover:brightness-110"
          >
            Sign In / Register
          </button>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-slate-900/50 px-2.5 py-1">
              <div className="grid h-7 w-7 place-items-center rounded bg-gradient-to-br from-sky-500 to-blue-600 text-[10px] font-black text-white shadow shadow-sky-500/20">
                {learner.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100 whitespace-nowrap">{learner.name}</p>
                <p className="text-[10px] font-semibold text-slate-400 leading-none">{learner.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-rose-400 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
