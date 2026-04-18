import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../firebase/auth'
import toast from 'react-hot-toast'
import './Navbar.css'

export default function Navbar() {
  const { user, role } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully!')
  }

  const isActive = (path) => location.pathname === path

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?'

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">B</span>
          Brand<span className="navbar__logo-accent">Portal</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar__links">
          <Link to="/explore" className={`navbar__link ${isActive('/explore') ? 'navbar__link--active' : ''}`}>
            Explore
          </Link>
          {user && (
            <Link to="/dashboard" className={`navbar__link ${isActive('/dashboard') ? 'navbar__link--active' : ''}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop actions */}
        <div className="navbar__actions">
          {user ? (
            <>
              <div className="navbar__user-info">
                <span className="navbar__user-role">{role === 'business' ? 'Business' : 'Customer'}</span>
                <span className="navbar__user-name">{user.displayName || user.email}</span>
              </div>
              <div className="navbar__avatar">{initials}</div>
              <button onClick={handleLogout} className="navbar__logout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">Login</Link>
              <Link to="/register" className="navbar__signup">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          <Link to="/explore" className="navbar__mobile-link">Explore</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="navbar__mobile-link">Dashboard</Link>
              <div className="navbar__mobile-divider" />
              <span className="navbar__mobile-user">{user.displayName || user.email} · {role}</span>
              <button onClick={handleLogout} className="navbar__mobile-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__mobile-link">Login</Link>
              <Link to="/register" className="navbar__mobile-cta">Get Started →</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}