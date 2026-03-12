import { useState } from 'react'

// Mock credentials
const VALID_EMAIL = 'test@test.com'
const VALID_PASSWORD = '123456'

const EyeIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Basic empty field check
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    // Simulate a short async login
    setIsLoading(true)
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        onLogin()
      } else {
        setError('Invalid credentials. Try test@test.com / 123456')
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="page-container grid-bg flex items-center justify-center min-h-screen p-4">

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />
        {/* Diagonal stripes accent top-left */}
        <div className="absolute top-0 left-0 w-2 h-full stripe-accent opacity-30" />
        <div className="absolute top-0 right-0 w-2 h-full stripe-accent opacity-30" />
      </div>

      <div className="w-full max-w-md relative animate-fade-up">

        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500 mb-4 cut-corner mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-steel-950">
              <path d="M2 18h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
              <path d="M12 2a8 8 0 018 8H4a8 8 0 018-8z" />
            </svg>
          </div>
          <h1 className="font-display font-800 text-4xl tracking-widest uppercase text-white">
            Site<span className="text-amber-500">Sync</span>
          </h1>
          <p className="text-steel-400 text-sm mt-1 font-body tracking-wide">
            Construction Field Management
          </p>
        </div>

        {/* Login card */}
        <div className="bg-steel-900 border border-steel-700 cut-corner p-8">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-steel-700" />
            <span className="text-xs font-mono uppercase tracking-widest text-steel-500">
              Field Access
            </span>
            <div className="h-px flex-1 bg-steel-700" />
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 mb-5 text-sm animate-slide-in">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email field */}
            <div>
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field cut-corner-sm"
                autoComplete="email"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field cut-corner-sm pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-500 hover:text-amber-500 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary font-700 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Access Field Portal'
              )}
            </button>
          </form>

          {/* Hint */}
          <div className="mt-6 pt-5 border-t border-steel-700/50">
            <p className="text-center text-xs text-steel-600 font-mono">
              Demo: test@test.com / 123456
            </p>
          </div>
        </div>

        <p className="text-center text-steel-700 text-xs font-mono mt-6 tracking-wider">
          © 2025 SITESYNC — v1.0.0
        </p>
      </div>
    </div>
  )
}
