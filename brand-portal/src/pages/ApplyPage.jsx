import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { submitApplication } from '../firebase/applications'
import { getBrandById } from '../firebase/brands'

const STORAGE_KEY = (id) => `apply_draft_${id}`

export default function ApplyPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const nav = useNavigate()

  const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY(id)) || '{}')

  const [step, setStep]             = useState(saved.step || 1)
  const [name, setName]             = useState(saved.name || '')
  const [email, setEmail]           = useState(saved.email || '')
  const [why, setWhy]               = useState(saved.why || '')
  const [experience, setExperience] = useState(saved.experience || '')
  const [brand, setBrand]           = useState(null)
  const [loading, setLoading]       = useState(false)

  useEffect(() => {
    getBrandById(id).then(b => setBrand(b))
  }, [id])

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY(id), JSON.stringify({ step, name, email, why, experience }))
  }, [step, name, email, why, experience, id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitApplication(id, user.uid, { name, email, why, experience })
      sessionStorage.removeItem(STORAGE_KEY(id))
      nav('/dashboard')
    } catch {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: '#080810', border: '1px solid #1e1e2e',
    borderRadius: 10, color: '#e8e8f0', fontSize: 14,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.15s', marginBottom: 0
  }

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: '#555', marginBottom: 8, letterSpacing: '0.3px'
  }

  return (
    <div className="page-sm">

      {brand && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 28, padding: '12px 16px',
          background: '#0f0f1a', border: '1px solid #1e1e2e',
          borderRadius: 12
        }}>
          {brand.logoUrl
            ? <img src={brand.logoUrl} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
                onError={e => e.target.style.display = 'none'} />
            : <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 14
              }}>{brand.name?.[0]}</div>
          }
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#e8e8f0' }}>{brand.name}</p>
            <p style={{ fontSize: 12, color: '#444', margin: 0 }}>Partnership application</p>
          </div>
        </div>
      )}

      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#9b8ef0' }}>Step {step} of 2</span>
          <span style={{ fontSize: 13, color: '#444' }}>{step === 1 ? 'Your info' : 'Your pitch'}</span>
        </div>
        <div style={{ height: 4, background: '#1a1a2e', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: step === 1 ? '50%' : '100%',
            background: 'linear-gradient(90deg, #5b4fcf, #7c6ee0)',
            borderRadius: 4, transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 6px', color: '#e8e8f0' }}>
        {step === 1 ? 'Your information' : 'Why this brand?'}
      </h1>
      <p style={{ color: '#444', fontSize: 14, margin: '0 0 24px' }}>
        {step === 1 ? 'Tell us who you are' : 'Make your pitch count'}
      </p>

      <div style={{
        background: '#0f0f1a', border: '1px solid #1e1e2e',
        borderRadius: 16, padding: '24px'
      }}>
        {step === 1 ? (
          <>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>FULL NAME</label>
              <input style={inputStyle} value={name} onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>EMAIL</label>
              <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="jane@company.com"
                onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
            </div>
            <button
              disabled={!name || !email}
              onClick={() => setStep(2)}
              style={{
                width: '100%', padding: '12px',
                background: name && email ? 'linear-gradient(135deg, #5b4fcf, #7c6ee0)' : '#1a1a2e',
                color: name && email ? 'white' : '#444',
                border: 'none', borderRadius: 10, fontSize: 15,
                fontWeight: 600, cursor: name && email ? 'pointer' : 'default',
                fontFamily: 'inherit', transition: 'all 0.2s',
                boxShadow: name && email ? '0 4px 20px rgba(91,79,207,0.3)' : 'none'
              }}>
              Continue →
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>WHY DO YOU WANT TO PARTNER?</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                rows={4} value={why} onChange={e => setWhy(e.target.value)}
                placeholder="I'm interested because…"
                onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>RELEVANT EXPERIENCE</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                rows={3} value={experience} onChange={e => setExperience(e.target.value)}
                placeholder="I've worked with…"
                onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: '12px', background: 'transparent',
                border: '1px solid #1e1e2e', borderRadius: 10,
                color: '#666', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit'
              }}>← Back</button>
              <button disabled={!why || loading} onClick={handleSubmit} style={{
                flex: 2, padding: '12px',
                background: why && !loading ? 'linear-gradient(135deg, #5b4fcf, #7c6ee0)' : '#1a1a2e',
                color: why && !loading ? 'white' : '#444',
                border: 'none', borderRadius: 10, fontSize: 14,
                fontWeight: 600, cursor: why && !loading ? 'pointer' : 'default',
                fontFamily: 'inherit',
                boxShadow: why && !loading ? '0 4px 20px rgba(91,79,207,0.3)' : 'none'
              }}>
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#333', marginTop: 16 }}>
        ✦ Your progress is saved automatically
      </p>
    </div>
  )
}