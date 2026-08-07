import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Profile" element={<Profile/>} />
    </Routes>
  )
}

export default App
