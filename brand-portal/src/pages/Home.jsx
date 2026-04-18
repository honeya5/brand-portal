import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div style={{ background: '#f8f7f4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>

        <div style={{
          display: 'inline-block',
          background: '#ede9ff', color: '#5b4fcf',
          fontSize: 13, fontWeight: 500,
          padding: '6px 16px', borderRadius: 20, marginBottom: 28
        }}>
          Live applications · Real-time updates
        </div>

        <h1 style={{
          fontSize: 52, fontWeight: 700, lineHeight: 1.15,
          color: '#1a1a1a', margin: '0 0 20px',
          letterSpacing: '-1px'
        }}>
          Where brands meet<br />
          <span style={{ color: '#5b4fcf' }}>their partners</span>
        </h1>

        <p style={{ fontSize: 18, color: '#666', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Businesses list their brand. Customers apply for partnerships. Everything happens live.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/explore" className="btn btn-primary" style={{ fontSize: 15, padding: '13px 28px', textDecoration: 'none' }}>
            Explore brands →
          </Link>
          {!user && (
            <Link to="/register" className="btn btn-ghost" style={{ fontSize: 15, padding: '13px 28px', textDecoration: 'none' }}>
              Create account
            </Link>
          )}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginTop: 80, textAlign: 'left'
        }}>
          {[
            { icon: '◆', title: 'Build your brand', desc: 'Upload logo, add tagline, describe your services.' },
            { icon: '◈', title: 'Customers apply', desc: 'A clean 2-step form. No friction, just intent.' },
            { icon: '◉', title: 'Live notifications', desc: 'See applications arrive in real-time. No refresh needed.' }
          ].map(f => (
            <div key={f.title} style={{
              background: '#fff', border: '1px solid #e8e6e0',
              borderRadius: 12, padding: '20px'
            }}>
              <div style={{ fontSize: 20, marginBottom: 10, color: '#5b4fcf' }}>{f.icon}</div>
              <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 6px', color: '#1a1a1a' }}>{f.title}</p>
              <p style={{ fontSize: 13, color: '#888', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}