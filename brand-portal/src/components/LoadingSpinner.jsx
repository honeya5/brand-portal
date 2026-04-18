import './LoadingSpinner.css'

export default function LoadingSpinner({ fullScreen = false, text = '' }) {
  if (fullScreen) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-wrap">
          <div className="spinner-ring" />
          <div className="spinner-logo">B</div>
        </div>
        {text && <p className="spinner-text">{text}</p>}
      </div>
    )
  }

  return (
    <div className="spinner-inline">
      <div className="spinner-ring spinner-ring--sm" />
      {text && <span className="spinner-label">{text}</span>}
    </div>
  )
}