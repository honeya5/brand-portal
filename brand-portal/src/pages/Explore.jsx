import { useEffect, useState } from 'react'
import { getBrands } from '../firebase/brands'
import BrandCard from '../components/BrandCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Explore() {
  const [brands, setBrands]   = useState([])
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBrands().then(b => { setBrands(b); setLoading(false) })
  }, [])

  const filtered = brands.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.tagline?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px', color: '#e8e8f0' }}>Explore brands</h1>
        <p style={{ color: '#555', margin: '0 0 20px', fontSize: 14 }}>Find brands looking for partnerships</p>
        <div style={{ position: 'relative', maxWidth: 360 }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, color: '#444', pointerEvents: 'none'
          }}>🔍</span>
          <input
            style={{
              width: '100%', padding: '10px 14px 10px 38px',
              background: '#0f0f1a', border: '1px solid #1e1e2e',
              borderRadius: 10, color: '#e8e8f0', fontSize: 14,
              outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box', transition: 'border-color 0.15s'
            }}
            placeholder="Search brands…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#5b4fcf'}
            onBlur={e => e.target.style.borderColor = '#1e1e2e'}
          />
        </div>
      </div>

      {loading ? <LoadingSpinner fullPage /> : (
        filtered.length === 0
          ? <div style={{ textAlign: 'center', paddingTop: 60, color: '#555', fontSize: 14 }}>No brands found</div>
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {filtered.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
      )}
    </div>
  )
}