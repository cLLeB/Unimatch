import { Route, Routes } from 'react-router-dom'
import { AppLayout, MarketingLayout } from './components/layout/Layouts'
import ScrollToTop from './components/layout/ScrollToTop'
import AdvisorPage from './pages/AdvisorPage'
import ComparePage from './pages/ComparePage'
import DashboardPage from './pages/DashboardPage'
import DeadlinesPage from './pages/DeadlinesPage'
import EligibilityPage from './pages/EligibilityPage'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import ProgrammeDetailPage from './pages/ProgrammeDetailPage'
import SavedPage from './pages/SavedPage'
import SimulatorPage from './pages/SimulatorPage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/programme/:programmeId" element={<ProgrammeDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/deadlines" element={<DeadlinesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* A real 404, rather than the prototype's silent redirect to /dashboard. */}
        <Route element={<MarketingLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
