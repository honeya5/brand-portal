import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getBrandByOwner, getBrandById } from '../firebase/brands'
import { getMyApplications } from '../firebase/applications'
import StatusBadge from '../components/StatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Dashboard() {
  const { user, role } = useAuth()
  const [brand, setBrand]   = useState(null)
  const [apps, setApps]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const load = async () => {
      if (role === 'business') {
        const b = await getBrandByOwner(user.uid)
        setBrand(b)
      } else {
        const rawApps = await getMyApplications(user.uid)
        // For each application, fetch the brand name
        const appsWithNames = await Promise.all(
          rawApps.map(async (app) => {
            const brand = await getBrandById(app.brandId)
            return { ...app, brandName: brand?.name || 'Unknown Brand' }
          })
        )
        setApps(appsWithNames)
      }
      setLoading(false)
    }
    load()
  }, [user, role])

  if (loading) return <LoadingSpinner fullPage />

  return (
    <div className="page">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px' }}>Dashboard</h1>
        <p style={{ color: '#888', margin: 0, fontSize: 14 }}>
          {role === 'business' ? 'Manage your brand and applications' : 'Track your applications'}
        </p>
      </div>

      {role === 'business' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          <div className="card" style={{ borderLeft: '3px solid #5b4fcf' }}>
            <p style={{ fontSize: 13, color: '#888', margin: '0 0 8px' }}>Your brand</p>
            <p style={{ fontWeight: 600, fontSize: 18, margin: '0 0 16px' }}>{brand?.name || 'No brand yet'}</p>
            <Link to="/manage-brand" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 13 }}>
              {brand ? 'Edit brand' : 'Create brand'}
            </Link>
          </div>
          {brand && (
            <div className="card" style={{ borderLeft: '3px solid #1a9e6e' }}>
              <p style={{ fontSize: 13, color: '#888', margin: '0 0 8px' }}>Applications</p>
              <p style={{ fontWeight: 600, fontSize: 18, margin: '0 0 16px' }}>View incoming</p>
              <Link to="/applications" className="btn btn-outline" style={{ textDecoration: 'none', fontSize: 13 }}>
                Open live tracker →
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>My applications</h2>
            <Link to="/explore" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: 13 }}>Browse brands</Link>
          </div>

          {apps.length === 0
            ? <div style={{ textAlign: 'center', padding: '60px 0', color: '#888', fontSize: 14 }}>
                No applications yet. Explore brands to get started.
              </div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {apps.map(a => (
                  <div key={a.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
                    <div>
                      <p style={{ fontWeight: 500, margin: '0 0 4px', fontSize: 15 }}>{a.brandName}</p>
                      <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>{new Date(a.createdAt).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  )
}