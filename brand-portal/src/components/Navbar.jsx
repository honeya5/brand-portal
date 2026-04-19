import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { logoutUser } from '../firebase/auth'

export default function Navbar() {
  const { user } = useAuth()
  const nav = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    nav('/')
  }

  return (
    <nav style={{
      background: '#0d0d14',
      borderBottom: '1px solid #1e1e2e',
      padding: '0 24px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28,
          background: '#6c5ce7',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white"/>
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '-0.3px' }}>Brandr</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to="/explore" style={{
          color: '#888', textDecoration: 'none', fontSize: 14,
          padding: '8px 12px', borderRadius: 8, transition: 'color 0.15s'
        }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = '#888'}>
          Explore
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{
              color: '#888', textDecoration: 'none', fontSize: 14,
              padding: '8px 12px', borderRadius: 8,
              border: '1px solid #2a2a3e', transition: 'all 0.15s'
            }}
              onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = '#6c5ce7' }}
              onMouseLeave={e => { e.target.style.color = '#888'; e.target.style.borderColor = '#2a2a3e' }}>
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: '#888', textDecoration: 'none', fontSize: 14,
              padding: '8px 12px', borderRadius: 8
            }}>Log in</Link>
            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 16px' }}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}