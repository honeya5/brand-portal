import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(91,79,207,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(91,79,207,0.1)', border: '1px solid rgba(91,79,207,0.25)',
          color: '#a78bfa', fontSize: 12, fontWeight: 600,
          padding: '5px 14px', borderRadius: 20, marginBottom: 32
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6c5ce7' }} />
          Live applications · Real-time updates
        </div>

        <h1 style={{
          fontSize: 56, fontWeight: 800, lineHeight: 1.1,
          color: '#f0f0fa', margin: '0 0 20px',
          letterSpacing: '-2px'
        }}>
          Where brands find<br />
          <span style={{
            background: 'linear-gradient(135deg, #7c6ee0, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>their partners</span>
        </h1>

        <p style={{ fontSize: 18, color: '#4a4a5a', maxWidth: 460, margin: '0 auto 44px', lineHeight: 1.7 }}>
          Businesses list their brand. Customers apply for partnerships. Everything happens live.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/explore" style={{
            fontSize: 15, padding: '13px 28px', textDecoration: 'none',
            background: 'linear-gradient(135deg, #5b4fcf, #7c6ee0)',
            color: 'white', borderRadius: 10, fontWeight: 600,
            boxShadow: '0 4px 24px rgba(91,79,207,0.35)',
            border: 'none', display: 'inline-block'
          }}>
            Explore brands →
          </Link>
          {!user && (
            <Link to="/register" style={{
              fontSize: 15, padding: '13px 28px', textDecoration: 'none',
              background: 'transparent', color: '#666',
              borderRadius: 10, fontWeight: 500,
              border: '1px solid #1e1e2e', display: 'inline-block',
              transition: 'border-color 0.2s'
            }}>
              Create account
            </Link>
          )}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginTop: 80, textAlign: 'left'
        }}>
          {[
            { icon: '◆', title: 'Build your brand', desc: 'Upload logo, add tagline, describe your services.', color: 'rgba(91,79,207,0.15)', iconColor: '#7c6ee0' },
            { icon: '◈', title: 'Customers apply', desc: 'A clean 2-step form. No friction, just intent.', color: 'rgba(26,158,110,0.1)', iconColor: '#1a9e6e' },
            { icon: '◉', title: 'Live notifications', desc: 'See applications arrive in real-time. No refresh needed.', color: 'rgba(240,165,0,0.1)', iconColor: '#f0a500' }
          ].map(f => (
            <div key={f.title} style={{
              background: '#0f0f1a', border: '1px solid #1e1e2e',
              borderRadius: 14, padding: '22px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: f.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 14,
                fontSize: 16, color: f.iconColor
              }}>{f.icon}</div>
              <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 6px', color: '#e8e8f0' }}>{f.title}</p>
              <p style={{ fontSize: 13, color: '#444', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}