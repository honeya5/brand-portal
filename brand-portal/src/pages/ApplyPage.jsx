import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { submitApplication } from '../firebase/applications'

export default function ApplyPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const nav = useNavigate()
  const [step, setStep]   = useState(1)
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [why, setWhy]     = useState('')
  const [experience, setExperience] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitApplication(id, user.uid, { name, email, why, experience })
      nav('/dashboard')
    } catch (e) { setLoading(false) }
  }

  const progress = step === 1 ? '50%' : '100%'

  return (
    <div className="page-sm">
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#5b4fcf' }}>Step {step} of 2</span>
          <span style={{ fontSize: 13, color: '#aaa' }}>{step === 1 ? 'Your info' : 'Your pitch'}</span>
        </div>
        <div style={{ height: 4, background: '#e8e6e0', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: progress, background: '#5b4fcf', borderRadius: 4, transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 6px' }}>
        {step === 1 ? 'Your information' : 'Why this brand?'}
      </h1>
      <p style={{ color: '#888', fontSize: 14, margin: '0 0 24px' }}>
        {step === 1 ? 'Tell us who you are' : 'Make your pitch count'}
      </p>

      <div className="card">
        {step === 1 ? (
          <>
            <div className="form-group">
              <label className="label">Full name</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@company.com" />
            </div>
            <button className="btn btn-primary" disabled={!name || !email} onClick={() => setStep(2)} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              Continue →
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="label">Why do you want to partner with this brand?</label>
              <textarea className="input" rows={4} value={why} onChange={e => setWhy(e.target.value)} placeholder="I'm interested because…" style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="label">Relevant experience</label>
              <textarea className="input" rows={3} value={experience} onChange={e => setExperience(e.target.value)} placeholder="I've worked with…" style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
              <button className="btn btn-primary" disabled={!why || loading} onClick={handleSubmit} style={{ flex: 2, justifyContent: 'center' }}>
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}