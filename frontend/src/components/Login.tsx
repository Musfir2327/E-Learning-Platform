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
      <div className="brand-card w-full max-w-md bg-white border border-[#E2E8F0] p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Header Logo & Title */}
        <div className="text-center space-y-3">
          <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-[#4F39F6] text-xl font-black text-white shadow-md shadow-[#4F39F6]/25">
            L
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172B]">
              {isSignUp ? 'Create Account' : 'Welcome back'}
            </h2>
            <p className="mt-1 text-xs font-semibold text-[#334155]">
              {isSignUp ? 'Register to start earning certificates' : 'Sign in to access your dashboard and courses'}
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-[#EF4444]/30 bg-[#FEF2F2] p-4 text-xs font-bold text-[#EF4444]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-[#334155]" htmlFor="fullname">
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
                className="w-full brand-input"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-[#334155]" htmlFor="email">
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
              className="w-full brand-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-[#334155]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full brand-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary btn-shimmer w-full py-3.5 text-xs font-extrabold uppercase tracking-wider mt-4 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Register & Start' : 'Sign In')}
          </button>
        </form>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-xs font-extrabold text-[#4F39F6] hover:text-[#4338CA] transition-colors cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0] text-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">
            Quick Connect (Testing Profiles)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePresetLogin('Admin')}
              disabled={isLoading}
              className="btn-secondary py-3 text-xs font-extrabold cursor-pointer disabled:opacity-50"
            >
              Demo Admin
            </button>
            <button
              type="button"
              onClick={() => handlePresetLogin('Student')}
              disabled={isLoading}
              className="btn-secondary py-3 text-xs font-extrabold cursor-pointer disabled:opacity-50"
            >
              Demo Student
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
