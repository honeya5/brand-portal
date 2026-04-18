import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../firebase/auth'

export default function Login() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await loginUser(email, password)
      nav('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-sm">
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Welcome back</h1>
        <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Log in to your account</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 14 }}>{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 20 }}>
        No account? <Link to="/register" style={{ color: '#5b4fcf', fontWeight: 500 }}>Sign up</Link>
      </p>
    </div>
  )
}