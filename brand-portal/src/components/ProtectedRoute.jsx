import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth()

  if (loading) return <LoadingSpinner fullScreen text="Authenticating…" />
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) return <Navigate to="/dashboard" replace />

  return children
}