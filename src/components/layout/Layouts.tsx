import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

/**
 * Public shell: navbar + footer, no sidebar.
 *
 * The footer's internal links matter here, these are the pages a search
 * engine actually lands on. The bottom bar rides along so a student browsing
 * cut-offs on a phone isn't stranded without navigation; it hides itself on
 * the landing and single-purpose pages.
 */
export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

/**
 * Signed-in shell.
 *
 * Sidebar from `lg` up; a bottom tab bar below it. The trailing padding keeps
 * page content clear of that bar, without it, the last card on every screen
 * sits underneath the navigation on a phone.
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
