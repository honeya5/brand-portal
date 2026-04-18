import { Link } from 'react-router-dom'
import './Home.css'

const FEATURES = [
  {
    icon: '◈',
    title: 'Brand Showcase',
    desc: 'Upload your logo, materials, and brand story. Your profile becomes a living portfolio that attracts the right partners.',
    tag: 'For Businesses',
  },
  {
    icon: '⬡',
    title: 'Smart Applications',
    desc: 'Customers discover and apply directly through the platform. Track every application from submission to decision.',
    tag: 'For Customers',
  },
  {
    icon: '◎',
    title: 'Real-time Updates',
    desc: 'Instant notifications when statuses change. No inbox digging — everything is tracked in your dashboard.',
    tag: 'Live',
  },
]

const STATS = [
  { value: '2,400+', label: 'Active Brands' },
  { value: '18K',    label: 'Applications' },
  { value: '94%',    label: 'Match Rate' },
  { value: '<24h',   label: 'Avg Response' },
]

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__container">
          <div className="hero__eyebrow">
            <span className="hero__dot" />
            Branding &amp; Application Platform
          </div>

          <h1 className="hero__title">
            Where Brands Meet<br />
            <em>Real Opportunity</em>
          </h1>

          <p className="hero__subtitle">
            A centralised portal for businesses to showcase their brand and for customers to discover,
            apply, and track partnerships — all in one place.
          </p>

          <div className="hero__cta">
            <Link to="/register" className="btn-primary">
              Start for free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/explore" className="btn-ghost">Explore brands</Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {STATS.map(s => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <div className="features__container">
          <div className="features__header">
            <span className="section-tag">Platform Features</span>
            <h2 className="features__title">Everything you need,<br />nothing you don't</h2>
          </div>

          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="feat-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feat-card__top">
                  <span className="feat-card__icon">{f.icon}</span>
                  <span className="feat-card__tag">{f.tag}</span>
                </div>
                <h3 className="feat-card__title">{f.title}</h3>
                <p className="feat-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how">
        <div className="how__container">
          <span className="section-tag">How it works</span>
          <h2 className="how__title">Up and running in minutes</h2>

          <div className="how__steps">
            {[
              { n: '01', title: 'Create your account', desc: 'Sign up as a business or customer. Takes under a minute.' },
              { n: '02', title: 'Build your profile', desc: 'Businesses set up their brand page. Customers browse the directory.' },
              { n: '03', title: 'Apply or review', desc: 'Customers apply to brands. Businesses manage applications from their dashboard.' },
              { n: '04', title: 'Partner up', desc: 'Approve or decline — all tracked, all in one place.' },
            ].map((s, i) => (
              <div key={s.n} className="how__step">
                <div className="how__step-num">{s.n}</div>
                <div className="how__step-body">
                  <h4 className="how__step-title">{s.title}</h4>
                  <p className="how__step-desc">{s.desc}</p>
                </div>
                {i < 3 && <div className="how__step-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="cta-banner__inner">
          <div className="cta-banner__glow" />
          <h2 className="cta-banner__title">Ready to grow your network?</h2>
          <p className="cta-banner__sub">Join thousands of brands and customers already on the platform.</p>
          <div className="cta-banner__actions">
            <Link to="/register" className="btn-primary">Create free account</Link>
            <Link to="/explore" className="btn-outline">Browse brands</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__brand">Brand<span>Portal</span></span>
          <span className="footer__copy">© 2024 BrandPortal. Hackathon 18.</span>
        </div>
      </footer>
    </div>
  )
}