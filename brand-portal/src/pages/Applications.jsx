import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getBrandByOwner } from '../firebase/brands'
import { listenToApplications, updateApplicationStatus } from '../firebase/applications'
import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import MessageThread from '../components/MessageThread'

export default function Applications() {
  const { user } = useAuth()
  const [apps, setApps]       = useState([])
  const [, setBrand]          = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast]     = useState('')
  const [newIds, setNewIds]   = useState(new Set())

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  useEffect(() => {
    if (!user) return
    let unsub
    getBrandByOwner(user.uid).then(b => {
      setBrand(b)
      setLoading(false)
      if (!b) return
      let firstLoad = true
      unsub = listenToApplications(b.id, (incoming) => {
        if (!firstLoad) {
          const prev = apps.map(a => a.id)
          const added = incoming.filter(a => !prev.includes(a.id))
          if (added.length > 0) {
            setNewIds(ids => new Set([...ids, ...added.map(a => a.id)]))
            showToast(`New application from ${added[0].name}!`)
            setTimeout(() => setNewIds(ids => {
              const n = new Set(ids)
              added.forEach(a => n.delete(a.id))
              return n
            }), 3000)
          }
        }
        firstLoad = false
        setApps(incoming.sort((a, b) => b.createdAt - a.createdAt))
      })
    })
    return () => unsub?.()
  }, [user])

  const handleStatus = async (appId, status) => {
    await updateApplicationStatus(appId, status)
    showToast(`Application ${status}`)
  }

  if (loading) return <LoadingSpinner fullPage />

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px' }}>Applications</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a9e6e', animation: 'pulse 2s infinite' }} />
            <p style={{ color: '#888', margin: 0, fontSize: 13 }}>Live — updates in real-time</p>
          </div>
        </div>
        <span style={{
          background: '#ede9ff', color: '#5b4fcf', fontWeight: 600,
          fontSize: 14, padding: '6px 14px', borderRadius: 20
        }}>{apps.length} total</span>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {apps.length === 0
        ? <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>◎</p>
            <p style={{ fontSize: 14 }}>Waiting for applications…</p>
          </div>
        : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {apps.map(app => (
              <div key={app.id}>

                {/* Application card */}
                <div style={{
                  background: newIds.has(app.id) ? '#fdfcff' : '#fff',
                  border: newIds.has(app.id) ? '1.5px solid #5b4fcf' : '1px solid #e8e6e0',
                  borderRadius: app.status === 'approved' ? '14px 14px 0 0' : 14,
                  padding: '20px 24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  transition: 'border-color 0.5s'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: '#ede9ff', color: '#5b4fcf',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 600, fontSize: 14
                      }}>{app.name?.[0] || '?'}</div>
                      <div>
                        <p style={{ fontWeight: 600, margin: 0, fontSize: 15 }}>{app.name}</p>
                        <p style={{ color: '#aaa', fontSize: 12, margin: 0 }}>{app.email}</p>
                      </div>
                      <StatusBadge status={app.status} />
                      {newIds.has(app.id) && (
                        <span style={{ fontSize: 11, background: '#5b4fcf', color: 'white', padding: '2px 8px', borderRadius: 10 }}>New</span>
                      )}
                    </div>
                    {app.why && (
                      <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, margin: '8px 0 0', maxWidth: 480 }}>{app.why}</p>
                    )}
                    <p style={{ color: '#ccc', fontSize: 11, margin: '8px 0 0' }}>{new Date(app.createdAt).toLocaleString()}</p>
                  </div>

                  {app.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8, marginLeft: 16, flexShrink: 0 }}>
                      <button className="btn btn-ghost" onClick={() => handleStatus(app.id, 'rejected')}
                        style={{ fontSize: 12, padding: '7px 14px', color: '#c0392b', borderColor: '#f8d7d7' }}>
                        Reject
                      </button>
                      <button className="btn btn-primary" onClick={() => handleStatus(app.id, 'approved')}
                        style={{ fontSize: 12, padding: '7px 14px', background: '#1a9e6e' }}>
                        Approve
                      </button>
                    </div>
                  )}
                </div>

                {/* Message thread — only shows for approved applications */}
                {app.status === 'approved' && (
  <Link
    to={`/chat/${app.id}/${app.brandId || ''}/${encodeURIComponent(app.name)}`}
    className="btn btn-outline"
    style={{ textDecoration: 'none', fontSize: 12, padding: '7px 14px', marginLeft: 16, flexShrink: 0 }}>
    Open chat →
  </Link>
)}

              </div>
            ))}
          </div>
      }

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}