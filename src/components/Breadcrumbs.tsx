import { Link } from 'react-router-dom'
import { docs } from '../docs'

interface Props {
  slug: string
}

export default function Breadcrumbs({ slug }: Props) {
  const doc = docs.find((d) => d.slug === slug)
  if (!doc) return null

  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
      <Link to="/docs" className="hover:text-gray-300 transition-colors">
        Docs
      </Link>
      <span className="text-gray-600">/</span>
      <span className="text-gray-500">{doc.group}</span>
      <span className="text-gray-600">/</span>
      <span className="text-gray-400">{doc.title}</span>
    </nav>
  )
}
