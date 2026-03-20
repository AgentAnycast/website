import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SEOHead from '../components/SEOHead'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <SEOHead title="Page Not Found" path="/404" />
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="text-8xl font-extrabold text-navy-800 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-sm transition-all"
          >
            Go Home
          </Link>
          <Link
            to="/docs/getting-started"
            className="px-6 py-2.5 rounded-lg border border-navy-700 hover:border-navy-600 text-gray-300 hover:text-white font-semibold text-sm transition-all"
          >
            Read Docs
          </Link>
        </div>
      </div>
    </div>
  )
}
