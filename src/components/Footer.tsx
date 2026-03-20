import { Link } from 'react-router-dom'
import Logo from './Logo'

const DOC_LINKS = [
  { label: 'Getting Started', to: '/docs/getting-started' },
  { label: 'Architecture', to: '/docs/architecture' },
  { label: 'Deployment', to: '/docs/deployment' },
  { label: 'Protocol', to: '/docs/protocol' },
  { label: 'Examples', to: '/docs/examples' },
]

const COMMUNITY_LINKS = [
  { label: 'GitHub', href: 'https://github.com/AgentAnycast' },
  { label: 'Discussions', href: 'https://github.com/AgentAnycast/agentanycast/discussions' },
  { label: 'Issues', href: 'https://github.com/AgentAnycast/agentanycast/issues' },
  { label: 'Contributing', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/CONTRIBUTING.md' },
]

const SDK_LINKS = [
  { label: 'Python SDK', href: 'https://github.com/AgentAnycast/agentanycast-python' },
  { label: 'TypeScript SDK', href: 'https://github.com/AgentAnycast/agentanycast-ts' },
  { label: 'Go Daemon', href: 'https://github.com/AgentAnycast/agentanycast-node' },
  { label: 'Proto', href: 'https://github.com/AgentAnycast/agentanycast-proto' },
]

export default function Footer() {
  return (
    <footer className="border-t border-navy-700/50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={28} />
              <span className="text-lg font-bold text-white tracking-tight">
                Agent<span className="text-accent-light">Anycast</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Decentralized P2P runtime for the A2A protocol. Built on libp2p.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Documentation</h4>
            <ul className="space-y-2.5">
              {DOC_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">Community</h4>
            <ul className="space-y-2.5">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SDKs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4">SDKs</h4>
            <ul className="space-y-2.5">
              {SDK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-navy-800/50 gap-4">
          <p className="text-xs text-gray-600">
            SDKs &amp; Proto: Apache-2.0 &middot; Daemon &amp; Relay: FSL-1.1-ALv2
          </p>
          <p className="text-xs text-gray-600">
            Built with libp2p &middot; Powered by React
          </p>
        </div>
      </div>
    </footer>
  )
}
