import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/auth'

export default function Register() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole]       = useState('customer')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await registerUser(email, password, role, name)
      nav('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="page-sm">
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Create account</h1>
        <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Join as a business or customer</p>
      </div>

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {['customer', 'business'].map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              style={{
                padding: '12px', borderRadius: 10, cursor: 'pointer', fontWeight: 500,
                fontSize: 14, border: '1.5px solid',
                borderColor: role === r ? '#5b4fcf' : '#e8e6e0',
                background: role === r ? '#ede9ff' : 'transparent',
                color: role === r ? '#5b4fcf' : '#555',
                transition: 'all 0.15s'
              }}>
              {r === 'customer' ? '👤 Customer' : '🏢 Business'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Full name</label>
            <input className="input" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 14 }}>{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 20 }}>
        Have an account? <Link to="/login" style={{ color: '#5b4fcf', fontWeight: 500 }}>Log in</Link>
      </p>
    </div>
  )
}