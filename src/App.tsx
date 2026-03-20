import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SearchModal from './components/SearchModal'
import BackToTop from './components/BackToTop'

const DocsLayout = lazy(() => import('./pages/DocsLayout'))
const DocPage = lazy(() => import('./pages/DocPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchKey, setSearchKey] = useState(0)

  const openSearch = useCallback(() => { setSearchKey((k) => k + 1); setSearchOpen(true) }, [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage onSearchOpen={openSearch} />} />
          <Route path="/docs" element={<DocsLayout onSearchOpen={openSearch} />}>
            <Route index element={<Navigate to="/docs/getting-started" replace />} />
            <Route path="*" element={<DocPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <SearchModal key={searchKey} open={searchOpen} onClose={closeSearch} />
      <BackToTop />
    </>
  )
}
