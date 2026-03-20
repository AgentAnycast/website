import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const GITHUB_URL = 'https://github.com/AgentAnycast'

interface Props {
  onMenuToggle?: () => void
  isDocsPage?: boolean
  onSearchOpen?: () => void
}

export default function Navbar({ onMenuToggle, isDocsPage, onSearchOpen }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isOnDocsPage = isDocsPage || location.pathname.startsWith('/docs')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const landingLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Architecture', href: '/#architecture' },
    { label: 'Get Started', href: '/#get-started' },
    { label: 'Ecosystem', href: '/#ecosystem' },
  ]

  const handleMenuClick = () => {
    if (isOnDocsPage && onMenuToggle) {
      onMenuToggle()
    } else {
      setMenuOpen(!menuOpen)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOnDocsPage
          ? 'bg-navy-950/80 backdrop-blur-xl border-b border-navy-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size={32} />
          <span className="text-lg font-bold text-white tracking-tight">
            Agent<span className="text-accent-light">Anycast</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {landingLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/docs"
            className={`text-sm transition-colors ${
              isOnDocsPage
                ? 'text-accent-light font-medium'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Docs
          </Link>

          {/* Search button */}
          {onSearchOpen && (
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-navy-800/50 border border-navy-700 rounded-lg hover:border-navy-600 hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline text-xs text-gray-600 bg-navy-900 px-1.5 py-0.5 rounded border border-navy-700">
                {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}K
              </kbd>
            </button>
          )}

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <GitHubIcon />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {onSearchOpen && (
            <button
              onClick={onSearchOpen}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
          <button
            className="text-gray-400 hover:text-white"
            onClick={handleMenuClick}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (landing page only) */}
      {!isOnDocsPage && menuOpen && (
        <div className="md:hidden bg-navy-950/95 backdrop-blur-xl border-b border-navy-700/50 px-6 py-4 space-y-3">
          {landingLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/docs"
            className="block text-sm text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
