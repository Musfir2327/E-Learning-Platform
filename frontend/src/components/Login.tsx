import React, { useState } from 'react'

type LoginProps = {
  onLogin: (user: any, token: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp && !name.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const endpoint = isSignUp ? 'register' : 'login'
      const payload = isSignUp 
        ? { name: name.trim(), email: email.trim(), password } 
        : { email: email.trim(), password }

      const response = await fetch(`http://localhost:5001/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      localStorage.setItem('token', data.token)
      onLogin(data.user, data.token)
    } catch (err: any) {
      setError(err.message || 'Connection error. Please ensure the backend is running at http://localhost:5001.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePresetLogin = async (role: 'Admin' | 'Student') => {
    setIsLoading(true)
    setError('')
    const presetEmail = role === 'Admin' ? 'admin@learnhub.edu' : 'student@learnhub.edu'
    const presetPassword = role === 'Admin' ? 'adminpassword123' : 'studentpassword123'

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: presetEmail, password: presetPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Preset Login failed')
      }

      localStorage.setItem('token', data.token)
      onLogin(data.user, data.token)
    } catch (err: any) {
      setError(`Backend error: ${err.message || 'Please make sure backend server is running.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl glass-panel bg-slate-900/60 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-xl font-black text-white shadow-lg shadow-emerald-500/25">
            L
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
            {isSignUp ? 'Create Account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-xs font-semibold text-slate-400">
            {isSignUp ? 'Register to start earning certificates' : 'Sign in to access your dashboard and courses'}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4.5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="fullname">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="e.g. Jane Doe"
                className="w-full rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 text-xs font-semibold text-slate-200 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 placeholder:text-slate-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder={isSignUp ? 'e.g. jane@example.com' : 'e.g. admin@learnhub.edu or student@learnhub.edu'}
              className="w-full rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 text-xs font-semibold text-slate-200 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 text-xs font-semibold text-slate-200 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 placeholder:text-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110 mt-6 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Register & Start' : 'Sign In')}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-3.5">
            Quick Connect (Testing Profiles)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePresetLogin('Admin')}
              disabled={isLoading}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 px-4 py-3 text-xs font-bold text-emerald-400 transition duration-300 cursor-pointer disabled:opacity-50"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handlePresetLogin('Student')}
              disabled={isLoading}
              className="rounded-xl border border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 px-4 py-3 text-xs font-bold text-sky-400 transition duration-300 cursor-pointer disabled:opacity-50"
            >
              Demo Student
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

