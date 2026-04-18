import { useAuth } from "../hooks/useAuth"  
import { Link } from "react-router-dom"

export default function Dashboard() {
  const { user, role } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <p className="mb-4">Welcome, {user?.displayName || user?.email}!</p>
      <p className="mb-8">Role: {role === "business" ? "Business Owner" : "Customer"}</p>
      
      {role === "business" ? (
        <div className="space-y-4">
          <Link to="/manage-brand" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Manage Your Brand</h2>
              <p className="text-gray-600">Set up your brand profile, logo, and description</p>
            </div>
          </Link>
          <Link to="/applications" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">View Applications</h2>
              <p className="text-gray-600">See who wants to partner with you</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Link to="/explore" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Explore Brands</h2>
              <p className="text-gray-600">Discover brands and apply for partnerships</p>
            </div>
          </Link>
          <Link to="/my-applications" className="block">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">My Applications</h2>
              <p className="text-gray-600">Track your application status</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}