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
  if (!brand) return <div className="page" style={{ textAlign: 'center', color: '#555' }}>Brand not found</div>

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      {/* Cover */}
      <div style={{
        height: 160,
        background: brand.coverColor || '#1a1a2e',
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: -48,
        position: 'relative',
        border: '1px solid #1e1e2e',
        overflow: 'hidden'
      }}>
        {/* subtle shimmer overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        {brand.logoUrl
          ? <img src={brand.logoUrl} alt="" style={{
              width: 88, height: 88, borderRadius: 16, objectFit: 'cover',
              border: '3px solid #0a0a12', position: 'absolute', bottom: -44, left: 32,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }} />
          : <div style={{
              width: 88, height: 88, borderRadius: 16,
              background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 700,
              border: '3px solid #0a0a12', position: 'absolute', bottom: -44, left: 32,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>{brand.name?.[0]}</div>
        }
      </div>

      <div style={{ paddingTop: 56, paddingLeft: 160 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#e8e8f0' }}>{brand.name}</h1>
        <p style={{ color: '#555', fontSize: 15, margin: '0 0 16px' }}>{brand.tagline}</p>

        {brand.category && (
          <span style={{
            fontSize: 12, fontWeight: 500, padding: '4px 12px',
            background: 'rgba(91,79,207,0.15)', color: '#9b8ef0',
            border: '1px solid rgba(91,79,207,0.25)',
            borderRadius: 20, marginBottom: 20, display: 'inline-block'
          }}>
            {brand.category}
          </span>
        )}
      </div>

      <div style={{
        background: '#0f0f1a', border: '1px solid #1e1e2e',
        borderRadius: 14, padding: '20px 24px',
        marginTop: 20, marginBottom: 20
      }}>
        <h3 style={{ fontWeight: 600, fontSize: 15, margin: '0 0 12px', color: '#e8e8f0' }}>About</h3>
        <p style={{ color: '#666', lineHeight: 1.7, margin: 0, fontSize: 14 }}>
          {brand.description || 'No description provided.'}
        </p>
      </div>

      {user && role === 'customer' && (
        <Link to={`/apply/${id}`} style={{
          textDecoration: 'none', fontSize: 15, padding: '13px 28px',
          background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
          color: 'white', borderRadius: 10, fontWeight: 600,
          display: 'inline-block',
          boxShadow: '0 4px 20px rgba(91,79,207,0.3)'
        }}>
          Apply for partnership →
        </Link>
      )}
      {!user && (
        <Link to="/register" style={{
          textDecoration: 'none', fontSize: 14, padding: '11px 22px',
          background: 'transparent', color: '#9b8ef0',
          border: '1px solid rgba(91,79,207,0.3)',
          borderRadius: 10, display: 'inline-block'
        }}>
          Sign up to apply
        </Link>
      )}
    </div>
  )
}