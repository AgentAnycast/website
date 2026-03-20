import { Link } from 'react-router-dom'
import { docs } from '../docs'

interface Props {
  currentSlug: string
}

export default function DocNavigation({ currentSlug }: Props) {
  const currentIdx = docs.findIndex((d) => d.slug === currentSlug)
  if (currentIdx < 0) return null

  const prev = currentIdx > 0 ? docs[currentIdx - 1] : null
  const next = currentIdx < docs.length - 1 ? docs[currentIdx + 1] : null

  return (
    <div className="flex items-stretch gap-4 mt-12 pt-8 border-t border-navy-700/50">
      {prev ? (
        <Link
          to={`/docs/${prev.slug}`}
          className="flex-1 group p-4 rounded-lg border border-navy-700/50 hover:border-accent/30 transition-colors text-left"
        >
          <span className="text-xs text-gray-500 font-medium">Previous</span>
          <span className="block text-sm text-gray-300 group-hover:text-accent-light transition-colors mt-1 font-medium">
            &larr; {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={`/docs/${next.slug}`}
          className="flex-1 group p-4 rounded-lg border border-navy-700/50 hover:border-accent/30 transition-colors text-right"
        >
          <span className="text-xs text-gray-500 font-medium">Next</span>
          <span className="block text-sm text-gray-300 group-hover:text-accent-light transition-colors mt-1 font-medium">
            {next.title} &rarr;
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
