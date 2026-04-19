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

  const [step, setStep]         = useState(saved.step || 1)
  const [name, setName]         = useState(saved.name || '')
  const [email, setEmail]       = useState(saved.email || '')
  const [why, setWhy]           = useState(saved.why || '')
  const [experience, setExperience] = useState(saved.experience || '')
  const [brand, setBrand]       = useState(null)
  const [loading, setLoading]   = useState(false)

  // Load brand name
  useEffect(() => {
    getBrandById(id).then(b => setBrand(b))
  }, [id])

  // Save to sessionStorage whenever anything changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY(id), JSON.stringify({ step, name, email, why, experience }))
  }, [step, name, email, why, experience, id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitApplication(id, user.uid, { name, email, why, experience })
      sessionStorage.removeItem(STORAGE_KEY(id)) // clear draft after submit
      nav('/dashboard')
    } catch  {
      setLoading(false)
    }
  }

  const progress = step === 1 ? '50%' : '100%'

  return (
    <div className="page-sm">

      {brand && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 24, padding: '10px 14px',
          background: '#fff', border: '1px solid #e8e6e0',
          borderRadius: 10
        }}>
          <img
            src={brand.logoUrl}
            alt=""
            style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }}
            onError={e => e.target.style.display = 'none'}
          />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{brand.name}</p>
            <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>Partnership application</p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#5b4fcf' }}>Step {step} of 2</span>
          <span style={{ fontSize: 13, color: '#aaa' }}>{step === 1 ? 'Your info' : 'Your pitch'}</span>
        </div>
        <div style={{ height: 4, background: '#e8e6e0', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: progress,
            background: '#5b4fcf', borderRadius: 4,
            transition: 'width 0.3s ease'
          }} />
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
              <input
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@company.com"
              />
            </div>
            <button
              className="btn btn-primary"
              disabled={!name || !email}
              onClick={() => setStep(2)}
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Continue →
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="label">Why do you want to partner with this brand?</label>
              <textarea
                className="input"
                rows={4}
                value={why}
                onChange={e => setWhy(e.target.value)}
                placeholder="I'm interested because…"
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className="form-group">
              <label className="label">Relevant experience</label>
              <textarea
                className="input"
                rows={3}
                value={experience}
                onChange={e => setExperience(e.target.value)}
                placeholder="I've worked with…"
                style={{ resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-ghost"
                onClick={() => setStep(1)}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!why || loading}
                onClick={handleSubmit}
                style={{ flex: 2, justifyContent: 'center' }}
              >
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#ccc', marginTop: 16 }}>
        Your progress is saved automatically
      </p>
    </div>
  )
}