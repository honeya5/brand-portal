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
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px' }}>Explore brands</h1>
        <p style={{ color: '#888', margin: '0 0 20px' }}>Find brands looking for partnerships</p>
        <input
          className="input"
          style={{ maxWidth: 360 }}
          placeholder="Search brands…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? <LoadingSpinner fullPage /> : (
        filtered.length === 0
          ? <div style={{ textAlign: 'center', paddingTop: 60, color: '#888' }}>No brands found</div>
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {filtered.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
      )}
    </div>
  )
}