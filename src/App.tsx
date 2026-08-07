import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout, MarketingLayout } from './components/layout/Layouts'
import ScrollToTop from './components/layout/ScrollToTop'
import AdvisorPage from './pages/AdvisorPage'
import AuthPage from './pages/AuthPage'
import ComparePage from './pages/ComparePage'
import DashboardPage from './pages/DashboardPage'
import DeadlinesPage from './pages/DeadlinesPage'
import EligibilityPage from './pages/EligibilityPage'
import LandingPage from './pages/LandingPage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import SavedPage from './pages/SavedPage'
import UniversityPage, { UniversitiesPage } from './pages/UniversityPage'

/**
 * Both of these pull in Recharts, the single largest dependency. Splitting
 * them keeps it out of the initial bundle, so the landing page and grade form
 *, the entry point for every new student, usually on a phone over a Ghanaian
 * mobile connection, load without it.
 */
const ProgrammeDetailPage = lazy(() => import('./pages/ProgrammeDetailPage'))
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-6 animate-spin rounded-full border-2 border-line border-t-brand" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Public and crawlable. */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            {/* Cut-offs merged into Matches; the URL is kept for anyone who
                has it bookmarked or arrives from search. */}
            <Route path="/cut-off-points" element={<Navigate to="/dashboard" replace />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/university/:universityId" element={<UniversityPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
          </Route>

          {/* Signed-in app shell. */}
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

          {/* A real 404, rather than the prototype's silent redirect. */}
          <Route element={<MarketingLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
