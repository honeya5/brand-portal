import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth" 

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />
  }
  
  return children
}