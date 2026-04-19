import { Link } from 'react-router-dom'

export default function BrandCard({ brand }) {
  return (
    <Link to={`/brand/${brand.id}`} style={{ textDecoration: 'none' }}>
      <div className="brand-card-hover" style={{
        background: '#0f0f1a',
        border: '1px solid #2a2a3e',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
      }}>
        {/* Cover image area */}
        <div style={{
          height: 120,
          background: brand.coverColor || '#1a1a2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {brand.logoUrl
            ? <img
                src={brand.logoUrl}
                alt={brand.name}
                style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 12 }}
                onError={e => e.target.style.display = 'none'}
              />
            : <div style={{
                width: 72, height: 72, borderRadius: 12,
                background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 28, fontWeight: 700
              }}>{brand.name?.[0]}</div>
          }
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px' }}>
          <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 4px', color: '#e8e8f0' }}>{brand.name}</p>
          <p style={{ fontSize: 12, color: '#555', margin: '0 0 10px', lineHeight: 1.5 }}>{brand.tagline}</p>
          {brand.category && (
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px',
              background: 'rgba(91,79,207,0.15)', color: '#9b8ef0',
              border: '1px solid rgba(91,79,207,0.25)', borderRadius: 20,
              display: 'inline-block'
            }}>
              {brand.category}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}