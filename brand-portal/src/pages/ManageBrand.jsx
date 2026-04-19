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
        setBrandId(b.id); setName(b.name || ''); setTagline(b.tagline || '')
        setDescription(b.description || ''); setCategory(b.category || '')
        setCoverColor(b.coverColor || COLORS[0]); setLogoUrl(b.logoUrl || '')
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
      if (brandId) { await updateBrand(brandId, data) } else { await createBrand(user.uid, data) }
      showToast('Brand saved!')
      nav('/dashboard')
    } catch {
      showToast('Error saving. Try again.')
    } finally {
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
  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: '#555', marginBottom: 8, letterSpacing: '0.5px'
  }
  const cardStyle = {
    background: '#0f0f1a', border: '1px solid #1e1e2e',
    borderRadius: 16, padding: '24px', marginBottom: 16
  }

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#e8e8f0' }}>
          {brandId ? 'Edit brand' : 'Create brand'}
        </h1>
        <p style={{ color: '#444', margin: 0, fontSize: 14 }}>Your public brand page</p>
      </div>

      <form onSubmit={handleSave}>
        <div style={cardStyle}>
          <h3 style={{ fontWeight: 600, margin: '0 0 20px', color: '#e8e8f0', fontSize: 15 }}>Brand details</h3>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>BRAND NAME *</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} required
              placeholder="Acme Inc."
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>TAGLINE</label>
            <input style={inputStyle} value={tagline} onChange={e => setTagline(e.target.value)}
              placeholder="We build things people love"
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>CATEGORY</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={category} onChange={e => setCategory(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'}>
              <option value="">Select category</option>
              {['Technology','Fashion','Food & Beverage','Health','Finance','Education','Other'].map(c => (
                <option key={c} style={{ background: '#0f0f1a' }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>DESCRIPTION</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              rows={4} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Tell partners what you do and what you're looking for…"
              onFocus={e => e.target.style.borderColor = '#5b4fcf'}
              onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontWeight: 600, margin: '0 0 20px', color: '#e8e8f0', fontSize: 15 }}>Visual identity</h3>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>LOGO</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                border: '1px solid #1e1e2e', overflow: 'hidden',
                background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {logoUrl
                  ? <img src={logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  : <span style={{ fontSize: 11, color: '#333' }}>No logo</span>
                }
              </div>
              <div style={{ flex: 1 }}>
                <input style={inputStyle} placeholder="https://example.com/logo.png"
                  value={logoUrl} onChange={e => setLogoUrl(e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#5b4fcf'}
                  onBlur={e => e.target.style.borderColor = '#1e1e2e'} />
                <p style={{ fontSize: 12, color: '#333', margin: '6px 0 0' }}>
                  Paste any public image URL. Leave blank to auto-generate.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>COVER COLOR</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLORS.map(c => (
                <div key={c} onClick={() => setCoverColor(c)} style={{
                  width: 32, height: 32, borderRadius: 8, background: c, cursor: 'pointer',
                  border: coverColor === c ? '2.5px solid #5b4fcf' : '1.5px solid #1e1e2e',
                  transition: 'transform 0.1s, border-color 0.15s',
                  transform: coverColor === c ? 'scale(1.15)' : 'scale(1)'
                }} />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '14px',
          background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
          color: 'white', border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
          fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
          boxShadow: '0 4px 24px rgba(91,79,207,0.35)'
        }}>
          {loading ? 'Saving…' : (brandId ? 'Save changes' : 'Create brand')}
        </button>
      </form>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}