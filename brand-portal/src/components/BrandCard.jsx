import { Link } from 'react-router-dom'

export default function BrandCard({ brand }) {
  return (
    <Link to={`/brand/${brand.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#111118',
        border: '1px solid #1e1e2e',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'border-color 0.15s, transform 0.15s',
        cursor: 'pointer'
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6c5ce7'; e.currentTarget.style.transform = 'translateY(-3px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e2e'; e.currentTarget.style.transform = 'none' }}>

        <div style={{
          height: 80,
          background: brand.coverColor || '#1a1a2e',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {brand.logoUrl
            ? <img src={brand.logoUrl} alt="" style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} />
            : <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: '#6c5ce7', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700
              }}>{brand.name?.[0]}</div>
          }
        </div>

        <div style={{ padding: '16px' }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.2px' }}>{brand.name}</p>
          <p style={{ fontSize: 13, color: '#555', margin: '0 0 10px', lineHeight: 1.5 }}>
            {brand.tagline?.length > 60 ? brand.tagline.slice(0, 60) + '…' : brand.tagline}
          </p>
          {brand.category && (
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 8px',
              background: '#1a1a2e', color: '#a78bfa', borderRadius: 6
            }}>{brand.category}</span>
          )}
        </div>
      </div>
    </Link>
  )
}