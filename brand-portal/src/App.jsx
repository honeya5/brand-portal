import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home          from './pages/Home'
import Explore       from './pages/Explore'
import BrandProfile  from './pages/BrandProfile'
import Login         from './pages/Login'
import Register      from './pages/Register'
import Dashboard     from './pages/Dashboard'
import ManageBrand   from './pages/ManageBrand'
import ApplyPage     from './pages/ApplyPage'
import Applications  from './pages/Applications'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/explore"   element={<Explore />} />
        <Route path="/brand/:id" element={<BrandProfile />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/manage-brand" element={<ProtectedRoute allowedRole="business"><ManageBrand /></ProtectedRoute>} />
        <Route path="/apply/:id"    element={<ProtectedRoute allowedRole="customer"><ApplyPage /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute allowedRole="business"><Applications /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}