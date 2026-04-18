import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"  
import { logout } from "../firebase/auth"
import toast from "react-hot-toast"

export default function Navbar() {
  const { user, role } = useAuth()

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully!")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BrandPortal
        </Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/explore" className="text-gray-700 hover:text-blue-600">
            Explore
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                Logout
              </button>
              <span className="text-sm text-gray-500">
                {user.displayName || user.email} ({role})
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}