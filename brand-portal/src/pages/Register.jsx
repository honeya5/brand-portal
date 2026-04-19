import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../firebase/auth'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole]         = useState('customer')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await registerUser(email, password, role, name)
      setTimeout(() => nav('/dashboard'), 300)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: '#080810', border: '1px solid #1e1e2e',
    borderRadius: 10, color: '#e8e8f0', fontSize: 14,
    outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box', transition: 'border-color 0.15s'
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
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: '#e8e8f0' }}>Create account</h1>
        <p style={{ color: '#444', fontSize: 14, margin: 0 }}>Join as a business or customer</p>
      </div>

      <div style={{
        background: '#0f0f1a', border: '1px solid #1e1e2e',
        borderRadius: 16, padding: '28px'
      }}>
        {/* Role toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {['customer', 'business'].map(r => (
            <button key={r} type="button" onClick={() => setRole(r)} style={{
              padding: '12px', borderRadius: 10, cursor: 'pointer', fontWeight: 500,
              fontSize: 14, border: '1px solid',
              borderColor: role === r ? 'rgba(91,79,207,0.5)' : '#1e1e2e',
              background: role === r ? 'rgba(91,79,207,0.15)' : 'transparent',
              color: role === r ? '#9b8ef0' : '#444',
              transition: 'all 0.15s', fontFamily: 'inherit'
            }}>
              {r === 'customer' ? '👤 Customer' : '🏢 Business'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'FULL NAME', type: 'text', val: name, set: setName, ph: 'Jane Doe' },
            { label: 'EMAIL', type: 'email', val: email, set: setEmail, ph: 'you@email.com' },
            { label: 'PASSWORD', type: 'password', val: password, set: setPassword, ph: 'Min. 6 characters' }
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8, letterSpacing: '0.5px' }}>{f.label}</label>
              <input style={inputStyle} type={f.type} placeholder={f.ph}
                value={f.val} onChange={e => f.set(e.target.value)} required
                onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
            </div>
          ))}

          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 16
            }}>
              <p style={{ color: '#e05a4e', fontSize: 13, margin: 0 }}>⚠ {error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px', marginTop: 6,
            background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
            color: 'white', border: 'none', borderRadius: 10,
            fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
            fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 20px rgba(91,79,207,0.3)'
          }}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#444', marginTop: 20 }}>
        Have an account?{' '}
        <Link to="/login" style={{ color: '#9b8ef0', fontWeight: 500, textDecoration: 'none' }}>Log in</Link>
      </p>
    </div>
  )
}