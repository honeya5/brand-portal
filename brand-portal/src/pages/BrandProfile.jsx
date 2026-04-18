import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBrandById } from '../firebase/brands'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BrandProfile() {
  const { id } = useParams()
  const { user, role } = useAuth()
  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBrandById(id).then(b => { setBrand(b); setLoading(false) })
  }, [id])

  if (loading) return <LoadingSpinner fullPage />
  if (!brand) return <div className="page" style={{ textAlign: 'center', color: '#888' }}>Brand not found</div>

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div style={{
        height: 140,
        background: brand.coverColor || 'linear-gradient(135deg, #ede9ff, #c7d2fe)',
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: -40,
        position: 'relative'
      }}>
        {brand.logoUrl
          ? <img src={brand.logoUrl} alt="" style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'cover', border: '3px solid white', position: 'absolute', bottom: -40, left: 32 }} />
          : <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: '#5b4fcf', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700,
              border: '3px solid white', position: 'absolute', bottom: -40, left: 32
            }}>{brand.name?.[0]}</div>
        }
      </div>

      <div style={{ paddingTop: 56, paddingLeft: 8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px' }}>{brand.name}</h1>
        <p style={{ color: '#888', fontSize: 15, margin: '0 0 20px' }}>{brand.tagline}</p>

        {brand.category && (
          <span style={{ fontSize: 12, fontWeight: 500, padding: '4px 10px', background: '#ede9ff', color: '#5b4fcf', borderRadius: 6, marginBottom: 20, display: 'inline-block' }}>
            {brand.category}
          </span>
        )}

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, margin: '0 0 12px' }}>About</h3>
          <p style={{ color: '#555', lineHeight: 1.7, margin: 0 }}>{brand.description || 'No description provided.'}</p>
        </div>

        {user && role === 'customer' && (
          <Link to={`/apply/${id}`} className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 15, padding: '13px 28px' }}>
            Apply for partnership →
          </Link>
        )}
        {!user && (
          <Link to="/register" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            Sign up to apply
          </Link>
        )}
      </div>
    </div>
  )
}