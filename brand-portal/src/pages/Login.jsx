import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../firebase/auth'
import toast from 'react-hot-toast'
import "../styles/auth.css"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn(email, password)
    if (result.success) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-glow" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-brand">
          <div className="auth-logo-mark">B</div>
          <span className="auth-logo-text">Brand<span>Portal</span></span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label className="field__label">Email address</label>
            <div className="field__wrap">
              <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                type="email" required autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="field__input"
              />
            </div>
          </div>

          <div className="field">
            <div className="field__label-row">
              <label className="field__label">Password</label>
              <button type="button" className="field__toggle" onClick={() => setShowPw(p => !p)}>
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="field__wrap">
              <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type={showPw ? 'text' : 'password'} required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="field__input"
              />
            </div>
          </div>

          <button type="submit" className={`auth-submit ${loading ? 'auth-submit--loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <span className="auth-spinner" />
                Signing in…
              </>
            ) : 'Sign in →'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Create one free</Link>
        </p>
      </div>
    </div>
  )
}