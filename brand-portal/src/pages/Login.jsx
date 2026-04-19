import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../firebase/auth'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await loginUser(email, password)
      setTimeout(() => nav('/dashboard'), 300)
    } catch {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: '#080810', border: '1px solid #1e1e2e',
    borderRadius: 10, color: '#e8e8f0', fontSize: 14,
    outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box', transition: 'border-color 0.15s', marginBottom: 0
  }

  return (
    <div className="page-sm">
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: 16, height: 16, background: 'white', transform: 'rotate(45deg)', borderRadius: 2 }} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: '#e8e8f0' }}>Welcome back</h1>
        <p style={{ color: '#444', fontSize: 14, margin: 0 }}>Log in to your account</p>
      </div>

      <div style={{
        background: '#0f0f1a', border: '1px solid #1e1e2e',
        borderRadius: 16, padding: '28px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8, letterSpacing: '0.5px' }}>EMAIL</label>
            <input style={inputStyle} type="email" placeholder="you@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8, letterSpacing: '0.5px' }}>PASSWORD</label>
            <input style={inputStyle} type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
          </div>
          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 16
            }}>
              <p style={{ color: '#e05a4e', fontSize: 13, margin: 0 }}>⚠ {error}</p>
            </div>
          )}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
            color: 'white', border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
            fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 20px rgba(91,79,207,0.3)'
          }}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#444', marginTop: 20 }}>
        No account?{' '}
        <Link to="/register" style={{ color: '#9b8ef0', fontWeight: 500, textDecoration: 'none' }}>Sign up</Link>
      </p>
    </div>
  )
}