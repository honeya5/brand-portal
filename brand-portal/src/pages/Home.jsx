import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#1a1a2e', border: '1px solid #2d2d4e',
          color: '#a78bfa', fontSize: 12, fontWeight: 600,
          padding: '5px 14px', borderRadius: 20, marginBottom: 32
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6c5ce7' }} />
          Live applications · Real-time updates
        </div>

        <h1 style={{
          fontSize: 56, fontWeight: 800, lineHeight: 1.1,
          color: '#fff', margin: '0 0 20px',
          letterSpacing: '-2px'
        }}>
          Where brands find<br />
          <span style={{ color: '#6c5ce7' }}>their partners</span>
        </h1>

        <p style={{ fontSize: 18, color: '#555', maxWidth: 460, margin: '0 auto 44px', lineHeight: 1.7 }}>
          Businesses list their brand. Customers apply for partnerships. Everything happens live.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
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
              background: '#111118', border: '1px solid #1e1e2e',
              borderRadius: 14, padding: '20px'
            }}>
              <div style={{ fontSize: 18, marginBottom: 10, color: '#6c5ce7' }}>{f.icon}</div>
              <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 6px', color: '#fff' }}>{f.title}</p>
              <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}