import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from '../firebase/auth'
import toast from 'react-hot-toast'
import "../styles/auth.css"

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    const result = await signUp(email, password, name, role)
    if (result.success) {
      toast.success('Account created! Welcome aboard 🎉')
      navigate('/dashboard')
    } else {
      toast.error(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-glow" />

      <div className="auth-card auth-card--wide">
        {/* Logo */}
        <div className="auth-brand">
          <div className="auth-logo-mark">B</div>
          <span className="auth-logo-text">Brand<span>Portal</span></span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Free forever. No credit card required.</p>
        </div>

        {/* Role picker */}
        <div className="role-picker">
          <button
            type="button"
            className={`role-option ${role === 'customer' ? 'role-option--active' : ''}`}
            onClick={() => setRole('customer')}
          >
            <span className="role-option__icon">◎</span>
            <span className="role-option__label">Customer</span>
            <span className="role-option__desc">Apply for services &amp; partnerships</span>
          </button>
          <button
            type="button"
            className={`role-option ${role === 'business' ? 'role-option--active' : ''}`}
            onClick={() => setRole('business')}
          >
            <span className="role-option__icon">◈</span>
            <span className="role-option__label">Business</span>
            <span className="role-option__desc">Showcase brand &amp; receive applications</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label className="field__label">Full name</label>
            <div className="field__wrap">
              <svg className="field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <input
                type="text" required autoComplete="name"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="field__input"
              />
            </div>
          </div>

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
                type={showPw ? 'text' : 'password'} required minLength={6}
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="field__input"
              />
            </div>
            <div className="pw-strength">
              {[1,2,3,4].map(i => (
                <span key={i} className={`pw-bar ${password.length >= i * 2 ? (password.length >= 10 ? 'pw-bar--strong' : 'pw-bar--ok') : ''}`} />
              ))}
              <span className="pw-label">
                {!password ? '' : password.length < 6 ? 'Too short' : password.length < 10 ? 'Good' : 'Strong'}
              </span>
            </div>
          </div>

          <button type="submit" className={`auth-submit ${loading ? 'auth-submit--loading' : ''}`} disabled={loading}>
            {loading ? (
              <>
                <span className="auth-spinner" />
                Creating account…
              </>
            ) : `Create ${role === 'business' ? 'business' : 'customer'} account →`}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  )
}