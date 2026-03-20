import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { docs } from '../docs'

interface SearchResult {
  slug: string
  title: string
  group: string
  snippet: string
  score: number
}

interface Props {
  open: boolean
  onClose: () => void
}

function searchDocs(query: string): SearchResult[] {
  if (!query.trim()) return []
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return docs
    .map((doc) => {
      const titleLower = doc.title.toLowerCase()
      const contentLower = doc.content.toLowerCase()
      let score = 0

      for (const term of terms) {
        if (titleLower.includes(term)) score += 10
        const contentMatches = contentLower.split(term).length - 1
        score += Math.min(contentMatches, 5)
      }

      // Find best snippet
      let snippet = ''
      if (score > 0) {
        const idx = contentLower.indexOf(terms[0])
        if (idx >= 0) {
          const start = Math.max(0, idx - 40)
          const end = Math.min(doc.content.length, idx + 120)
          snippet = (start > 0 ? '...' : '') + doc.content.slice(start, end).replace(/\n/g, ' ').trim() + (end < doc.content.length ? '...' : '')
        }
      }

      return { slug: doc.slug, title: doc.title, group: doc.group, snippet, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

export default function SearchModal({ open, onClose }: Props) {
  // Reset is handled by key prop from parent — fresh mount each time
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchDocs(query), [query])

  // Focus input when mounted
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [open])

  const goTo = useCallback(
    (slug: string) => {
      navigate(`/docs/${slug}`)
      onClose()
    },
    [navigate, onClose],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[activeIdx]) {
        goTo(results[activeIdx].slug)
      } else if (e.key === 'Escape') {
        onClose()
      }
    },
    [results, activeIdx, goTo, onClose],
  )

  // Global Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
        // Opening is handled by parent
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-navy-700/50">
          <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 py-4 bg-transparent text-white text-base outline-none placeholder:text-gray-500"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-navy-800 border border-navy-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 text-sm">
              No results found for "{query}"
            </div>
          )}
          {results.map((result, i) => (
            <button
              key={result.slug}
              onClick={() => goTo(result.slug)}
              onMouseEnter={() => setActiveIdx(i)}
              className={`w-full text-left px-4 py-3 flex flex-col gap-1 transition-colors ${
                i === activeIdx ? 'bg-accent/10' : 'hover:bg-navy-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{result.group}</span>
                <span className="text-gray-600">/</span>
                <span className={`text-sm font-medium ${i === activeIdx ? 'text-accent-light' : 'text-white'}`}>
                  {result.title}
                </span>
              </div>
              {result.snippet && (
                <p className="text-xs text-gray-500 line-clamp-1">{result.snippet}</p>
              )}
            </button>
          ))}
          {!query && (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              Start typing to search the documentation
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-navy-700/50 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-navy-800 border border-navy-700 rounded text-[10px]">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-navy-800 border border-navy-700 rounded text-[10px]">Enter</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-navy-800 border border-navy-700 rounded text-[10px]">Esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  )
}
