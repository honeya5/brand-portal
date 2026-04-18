import { Link } from 'react-router-dom'

export default function BrandCard({ brand }) {
  return (
    <Link to={`/brand/${brand.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff',
        border: '1px solid #e8e6e0',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'transform 0.15s, box-shadow 0.15s',
        cursor: 'pointer'
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>

        <div style={{
          height: 80,
          background: brand.coverColor || '#ede9ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {brand.logoUrl
            ? <img src={brand.logoUrl} alt="" style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', border: '2px solid white' }} />
            : <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: '#5b4fcf', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 600
              }}>{brand.name?.[0]}</div>
          }
        </div>

        <div style={{ padding: '16px' }}>
          <p style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a', margin: '0 0 4px' }}>{brand.name}</p>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 10px', lineHeight: 1.5 }}>
            {brand.tagline?.length > 60 ? brand.tagline.slice(0, 60) + '…' : brand.tagline}
          </p>
          {brand.category && (
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 8px',
              background: '#ede9ff', color: '#5b4fcf', borderRadius: 6
            }}>{brand.category}</span>
          )}
        </div>
      </div>
    </Link>
  )
}