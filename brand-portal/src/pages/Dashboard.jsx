import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import { logout } from '../firebase/auth'
import toast from 'react-hot-toast'
import './Dashboard.css'

const BUSINESS_CARDS = [
  {
    to: '/manage-brand',
    icon: '◈',
    title: 'Manage Brand',
    desc: 'Update your brand profile, logo, and marketing materials',
    tag: 'Setup',
  },
  {
    to: '/applications',
    icon: '◎',
    title: 'Applications',
    desc: 'Review incoming partnership and service applications',
    tag: 'Action needed',
    highlight: true,
  },
  {
    to: '/upload-materials',
    icon: '⬡',
    title: 'Upload Materials',
    desc: 'Add brochures, images, and promotional content',
    tag: 'Media',
  },
  {
    to: '/analytics',
    icon: '◇',
    title: 'Analytics',
    desc: 'Track profile views, application rates, and engagement',
    tag: 'Insights',
  },
]

const CUSTOMER_CARDS = [
  {
    to: '/explore',
    icon: '⬡',
    title: 'Explore Brands',
    desc: 'Browse businesses and discover new partnership opportunities',
    tag: 'Discover',
    highlight: true,
  },
  {
    to: '/my-applications',
    icon: '◎',
    title: 'My Applications',
    desc: 'Track all your submitted applications and their statuses',
    tag: 'Tracking',
  },
  {
    to: '/saved',
    icon: '◇',
    title: 'Saved Brands',
    desc: 'Brands you\'ve bookmarked for later review',
    tag: 'Saved',
  },
  {
    to: '/profile',
    icon: '◈',
    title: 'My Profile',
    desc: 'Update your contact info and application preferences',
    tag: 'Settings',
  },
]

const STATS_BUSINESS = [
  { label: 'Profile Views', value: '—' },
  { label: 'Applications In', value: '—' },
  { label: 'Approved', value: '—' },
  { label: 'Pending', value: '—' },
]

const STATS_CUSTOMER = [
  { label: 'Applied To', value: '—' },
  { label: 'In Review', value: '—' },
  { label: 'Approved', value: '—' },
  { label: 'Saved Brands', value: '—' },
]

export default function Dashboard() {
  const { user, role } = useAuth()

  const isBusiness = role === 'business'
  const cards = isBusiness ? BUSINESS_CARDS : CUSTOMER_CARDS
  const stats = isBusiness ? STATS_BUSINESS : STATS_CUSTOMER

  const initials = user?.displayName
    ? user.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?'

  const firstName = user?.displayName?.split(' ')[0] || 'there'

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully!')
  }

  return (
    <div className="dash">
      <div className="dash__container">

        {/* ── Header ── */}
        <div className="dash__header">
          <div className="dash__welcome">
            <div className="dash__avatar">{initials}</div>
            <div>
              <p className="dash__greeting">Good day, {firstName} 👋</p>
              <p className="dash__role-badge">
                <span className={`role-pill role-pill--${role}`}>{isBusiness ? 'Business Account' : 'Customer Account'}</span>
              </p>
            </div>
          </div>
          <div className="dash__header-actions">
            <button onClick={handleLogout} className="dash__logout-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="dash__stats">
          {stats.map(s => (
            <div key={s.label} className="stat-tile">
              <span className="stat-tile__value">{s.value}</span>
              <span className="stat-tile__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Section heading ── */}
        <div className="dash__section-head">
          <h2 className="dash__section-title">
            {isBusiness ? 'Brand Management' : 'Your Workspace'}
          </h2>
          <span className="dash__section-sub">
            {isBusiness
              ? 'Everything you need to manage your brand presence'
              : 'Discover brands and track your partnership applications'}
          </span>
        </div>

        {/* ── Cards grid ── */}
        <div className="dash__grid">
          {cards.map((c, i) => (
            <Link key={c.to} to={c.to} className={`dash-card ${c.highlight ? 'dash-card--highlight' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="dash-card__top">
                <span className="dash-card__icon">{c.icon}</span>
                <span className={`dash-card__tag ${c.highlight ? 'dash-card__tag--accent' : ''}`}>{c.tag}</span>
              </div>
              <h3 className="dash-card__title">{c.title}</h3>
              <p className="dash-card__desc">{c.desc}</p>
              <div className="dash-card__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Quick info bar ── */}
        <div className="dash__info-bar">
          <span className="dash__info-icon">ℹ</span>
          <span className="dash__info-text">
            {isBusiness
              ? 'Complete your brand profile to start receiving applications from customers.'
              : 'Browse the Explore page to discover brands and submit your first application.'}
          </span>
          <Link to={isBusiness ? '/manage-brand' : '/explore'} className="dash__info-link">
            {isBusiness ? 'Set up brand →' : 'Explore now →'}
          </Link>
        </div>

      </div>
    </div>
  )
}