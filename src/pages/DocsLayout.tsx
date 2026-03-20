import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DocsSidebar from '../components/DocsSidebar'
import Footer from '../components/Footer'

interface Props {
  onSearchOpen: () => void
}

export default function DocsLayout({ onSearchOpen }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isDocsPage
        onSearchOpen={onSearchOpen}
      />
      <div className="flex">
        <DocsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="max-w-[1100px] mx-auto px-6 py-10">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
