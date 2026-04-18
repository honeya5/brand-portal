import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { createBrand, updateBrand, getBrandByOwner } from '../firebase/brands'

const COLORS = ['#ede9ff','#d1fae5','#fef3c7','#fee2e2','#e0f2fe','#fce7f3']

export default function ManageBrand() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [brandId, setBrandId]         = useState(null)
  const [name, setName]               = useState('')
  const [tagline, setTagline]         = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]       = useState('')
  const [coverColor, setCoverColor]   = useState(COLORS[0])
  const [logoUrl, setLogoUrl]         = useState('')
  const [loading, setLoading]         = useState(false)
  const [toast, setToast]             = useState('')

  useEffect(() => {
    if (!user) return
    getBrandByOwner(user.uid).then(b => {
      if (b) {
        setBrandId(b.id)
        setName(b.name || '')
        setTagline(b.tagline || '')
        setDescription(b.description || '')
        setCategory(b.category || '')
        setCoverColor(b.coverColor || COLORS[0])
        setLogoUrl(b.logoUrl || '')
      }
    })
  }, [user])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const finalLogoUrl = logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5b4fcf&color=fff&size=200&bold=true`
      const data = { name, tagline, description, category, coverColor, logoUrl: finalLogoUrl }
      if (brandId) {
        await updateBrand(brandId, data)
      } else {
        await createBrand(user.uid, data)
      }
      showToast('Brand saved!')
      nav('/dashboard')
    } catch (err) {
      showToast('Error saving. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px' }}>
        {brandId ? 'Edit brand' : 'Create brand'}
      </h1>
      <p style={{ color: '#888', margin: '0 0 28px', fontSize: 14 }}>Your public brand page</p>

      <form onSubmit={handleSave}>

        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, margin: '0 0 16px' }}>Brand details</h3>

          <div className="form-group">
            <label className="label">Brand name *</label>
            <input
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Acme Inc."
            />
          </div>

          <div className="form-group">
            <label className="label">Tagline</label>
            <input
              className="input"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="We build things people love"
            />
          </div>

          <div className="form-group">
            <label className="label">Category</label>
            <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select category</option>
              {['Technology','Fashion','Food & Beverage','Health','Finance','Education','Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className="input"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Tell partners what you do and what you're looking for…"
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, margin: '0 0 16px' }}>Visual identity</h3>

          <div className="form-group">
            <label className="label">Logo</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                border: '1px solid #e8e6e0', overflow: 'hidden',
                background: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {logoUrl
                  ? <img
                      src={logoUrl}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  : <span style={{ fontSize: 11, color: '#ccc' }}>No logo</span>
                }
              </div>
              <div style={{ flex: 1 }}>
                <input
                  className="input"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={e => setLogoUrl(e.target.value)}
                />
                <p style={{ fontSize: 12, color: '#aaa', margin: '6px 0 0' }}>
                  Paste any public image URL. Leave blank to auto-generate from brand name.
                </p>
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label">Cover color</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLORS.map(c => (
                <div
                  key={c}
                  onClick={() => setCoverColor(c)}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: c, cursor: 'pointer',
                    border: coverColor === c ? '2.5px solid #5b4fcf' : '1.5px solid #e8e6e0',
                    transition: 'transform 0.1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}
        >
          {loading ? 'Saving…' : (brandId ? 'Save changes' : 'Create brand')}
        </button>
      </form>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}