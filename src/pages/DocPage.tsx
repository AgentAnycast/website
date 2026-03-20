import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getDoc } from '../docs'
// components
import Breadcrumbs from '../components/Breadcrumbs'
import DocNavigation from '../components/DocNavigation'
import TableOfContents from '../components/TableOfContents'
import SEOHead from '../components/SEOHead'
import CopyButton from '../components/CopyButton'

const GITHUB_BASE = 'https://github.com/AgentAnycast/agentanycast/edit/main/docs'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function DocPage() {
  const { '*': slug } = useParams()

  if (!slug) {
    return <Navigate to="/docs/getting-started" replace />
  }

  const doc = getDoc(slug)

  if (!doc) {
    return <Navigate to="/docs/getting-started" replace />
  }

  const editUrl = slug.startsWith('integrations/')
    ? `${GITHUB_BASE}/${slug}.md`
    : `${GITHUB_BASE}/${slug}.md`

  return (
    <>
      <SEOHead
        title={doc.title}
        description={`${doc.title} - AgentAnycast documentation`}
        path={`/docs/${slug}`}
      />
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumbs + Edit link */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumbs slug={slug} />
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit on GitHub
            </a>
          </div>

          {/* Doc content */}
          <div className="doc-content max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // Add IDs to headings for TOC linking
                h1({ children, ...props }) {
                  const text = String(children)
                  const id = slugify(text)
                  return <h1 id={id} {...props}>{children}</h1>
                },
                h2({ children, ...props }) {
                  const text = String(children)
                  const id = slugify(text)
                  return <h2 id={id} {...props}>{children}</h2>
                },
                h3({ children, ...props }) {
                  const text = String(children)
                  const id = slugify(text)
                  return <h3 id={id} {...props}>{children}</h3>
                },
                h4({ children, ...props }) {
                  const text = String(children)
                  const id = slugify(text)
                  return <h4 id={id} {...props}>{children}</h4>
                },
                pre({ children, ...props }) {
                  let codeText = ''
                  let lang = ''
                  try {
                    const codeEl = children as React.ReactElement
                    if (typeof codeEl === 'object' && codeEl !== null) {
                      const elProps = codeEl.props as Record<string, unknown>
                      if (elProps?.children) {
                        codeText = String(elProps.children).replace(/\n$/, '')
                      }
                      // Extract language from className
                      const className = String(elProps?.className || '')
                      const langMatch = className.match(/language-(\w+)/)
                      if (langMatch) lang = langMatch[1]
                    }
                  } catch {
                    // ignore
                  }

                  return (
                    <div className="relative group">
                      {lang && (
                        <div className="absolute top-0 left-0 px-3 py-1 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                          {lang}
                        </div>
                      )}
                      <pre {...props} className={`${lang ? 'pt-8' : ''}`}>{children}</pre>
                      {codeText && (
                        <CopyButton
                          text={codeText}
                          className="absolute top-2 right-2 p-1.5 text-gray-500 bg-navy-800/80 border border-navy-700 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-300"
                        />
                      )}
                    </div>
                  )
                },
                a({ href, children, ...props }) {
                  const isExternal = href?.startsWith('http')
                  return (
                    <a
                      href={href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      {...props}
                    >
                      {children}
                      {isExternal && (
                        <svg className="inline-block w-3.5 h-3.5 ml-0.5 -mt-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </a>
                  )
                },
                table({ children, ...props }) {
                  return (
                    <div className="overflow-x-auto">
                      <table {...props}>{children}</table>
                    </div>
                  )
                },
              }}
            >
              {doc.content}
            </ReactMarkdown>
          </div>

          {/* Prev / Next navigation */}
          <DocNavigation currentSlug={slug} />
        </div>

        {/* Right sidebar: Table of Contents */}
        <TableOfContents markdown={doc.content} />
      </div>
    </>
  )
}
