import { Link, useLocation } from 'react-router-dom'
import { docs, DOC_GROUPS } from '../docs'

interface Props {
  open: boolean
  onClose: () => void
}

export default function DocsSidebar({ open, onClose }: Props) {
  const location = useLocation()
  const currentSlug = location.pathname.replace('/docs/', '').replace('/docs', '')

  const grouped = DOC_GROUPS.map(group => ({
    group,
    items: docs.filter(d => d.group === group),
  }))

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-[280px] bg-navy-950 border-r border-navy-700/50
          overflow-y-auto z-50 transition-transform duration-200
          lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:shrink-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="p-5 space-y-6">
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {group}
              </h3>
              <ul className="space-y-0.5">
                {items.map(doc => {
                  const isActive = currentSlug === doc.slug
                  return (
                    <li key={doc.slug}>
                      <Link
                        to={`/docs/${doc.slug}`}
                        onClick={onClose}
                        className={`
                          block px-3 py-1.5 rounded-md text-sm transition-colors
                          ${isActive
                            ? 'bg-accent/10 text-accent-light font-medium'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-navy-800/50'
                          }
                        `}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
