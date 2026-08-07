import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

/** Marketing shell: navbar + footer, no sidebar. */
export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

/** Signed-in shell: navbar + sidebar. */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
