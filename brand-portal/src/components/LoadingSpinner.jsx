export default function LoadingSpinner({ fullPage }) {
  if (fullPage) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="spinner" />
    </div>
  )
  return <div className="spinner" style={{ margin: '0 auto' }} />
}