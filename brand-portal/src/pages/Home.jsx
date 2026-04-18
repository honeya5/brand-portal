import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Brand Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect businesses with customers. Showcase your brand or discover new opportunities.
        </p>
        <div className="space-x-4">
          <Link 
            to="/register" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link 
            to="/explore" 
            className="inline-block bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Explore Brands
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold mb-2">For Businesses</h3>
            <p className="text-gray-600">
              Showcase your brand, upload marketing materials, and receive partnership applications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">For Customers</h3>
            <p className="text-gray-600">
              Discover brands, apply for services, and track your applications in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Get instant updates when businesses respond to your applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}