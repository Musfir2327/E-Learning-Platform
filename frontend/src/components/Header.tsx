import { useState } from 'react'
import type { Learner } from '../types'
import { Menu, X, LogOut } from 'lucide-react'

type HeaderProps = {
  activeView: string
  onViewChange: (view: string) => void
  learner: { name: string; role: Learner['role'] } | null
  onLogout: () => void
}

export function Header({ activeView, onViewChange, learner, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const visibleNavItems = [
    'Home',
    'Courses',
    'Tutorials',
    'Career Pathway',
    'Quiz',
    ...(learner?.role === 'Admin' ? ['Admin Dashboard'] : []),
  ]

  const handleNavClick = (view: string) => {
    const targetView = view === 'Quiz' ? 'Quizzes' : view === 'Admin Dashboard' ? 'Admin' : view
    onViewChange(targetView)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          type="button"
          onClick={() => handleNavClick('Home')}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#4F39F6] text-lg font-black text-white shadow-md shadow-[#4F39F6]/25 group-hover:bg-[#4338CA] transition-colors">
            L
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-[#0F172B]">
              Learn<span className="text-[#4F39F6]">Hub</span>
            </span>
            <span className="block text-[10px] font-bold text-[#64748B] tracking-wider uppercase">Online learning platform</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
          {visibleNavItems.map((item) => {
            const isActive =
              activeView === item ||
              (item === 'Quiz' && activeView === 'Quizzes') ||
              (item === 'Admin Dashboard' && activeView === 'Admin')

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4F39F6] text-white shadow-md shadow-[#4F39F6]/20'
                    : 'text-[#334155] hover:bg-[#EEF0FF] hover:text-[#4F39F6]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </nav>

        {/* Desktop Auth / User Info */}
        <div className="hidden lg:flex items-center gap-3">
          {!learner ? (
            <button
              type="button"
              onClick={() => handleNavClick('Login')}
              className="rounded-xl bg-[#4F39F6] hover:bg-[#4338CA] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#4F39F6]/20 btn-shimmer transition-all cursor-pointer"
            >
              Sign In / Register
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#4F39F6] text-xs font-black text-white shadow-xs">
                  {learner.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-black text-[#0F172B] whitespace-nowrap">{learner.name}</p>
                  <p className="text-[10px] font-extrabold text-[#4F39F6] leading-none">{learner.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] hover:border-rose-200 hover:bg-rose-50 px-3.5 py-2 text-xs font-extrabold text-[#334155] hover:text-rose-600 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-[#E2E8F0] p-2 text-[#334155] hover:bg-[#EEF0FF] hover:text-[#4F39F6] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (320px - 768px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1.5">
            {visibleNavItems.map((item) => {
              const isActive =
                activeView === item ||
                (item === 'Quiz' && activeView === 'Quizzes') ||
                (item === 'Admin Dashboard' && activeView === 'Admin')

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#4F39F6] text-white shadow-sm'
                      : 'text-[#334155] hover:bg-[#EEF0FF] hover:text-[#4F39F6]'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-[#E2E8F0]">
            {!learner ? (
              <button
                type="button"
                onClick={() => handleNavClick('Login')}
                className="w-full rounded-xl bg-[#4F39F6] hover:bg-[#4338CA] py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#4F39F6]/20 btn-shimmer transition-all cursor-pointer"
              >
                Sign In / Register
              </button>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#4F39F6] text-xs font-black text-white">
                    {learner.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0F172B]">{learner.name}</p>
                    <p className="text-[10px] font-extrabold text-[#4F39F6]">{learner.role}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="rounded-xl border border-[#E2E8F0] hover:bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
