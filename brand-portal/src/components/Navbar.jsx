import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { logoutUser } from '../firebase/auth'

export default function Navbar() {
  const { user, role } = useAuth()
  const nav = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    nav('/')
  }

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e8e6e0',
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
          background: '#5b4fcf',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7 L7 2 L12 7 L7 12 Z" fill="white"/>
          </svg>
        </div>
        <span style={{ fontWeight: 600, fontSize: 16, color: '#1a1a1a' }}>Brandr</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to="/explore" style={{ color: '#555', textDecoration: 'none', fontSize: 14, padding: '8px 12px', borderRadius: 8 }}
          onMouseEnter={e => e.target.style.background = '#f0eeea'}
          onMouseLeave={e => e.target.style.background = 'transparent'}>
          Explore
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 14px' }}>Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 14px' }}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 14px' }}>Log in</Link>
            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 13, padding: '8px 14px' }}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}