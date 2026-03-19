import Logo from './Logo'

const LINKS = {
  Project: [
    { label: 'Getting Started', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/docs/getting-started.md' },
    { label: 'Architecture', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/docs/architecture.md' },
    { label: 'Deployment', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/docs/deployment.md' },
    { label: 'Protocol', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/docs/protocol.md' },
    { label: 'Examples', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/docs/examples.md' },
  ],
  Community: [
    { label: 'GitHub', href: 'https://github.com/AgentAnycast' },
    { label: 'Discussions', href: 'https://github.com/AgentAnycast/agentanycast/discussions' },
    { label: 'Issues', href: 'https://github.com/AgentAnycast/agentanycast/issues' },
    { label: 'Contributing', href: 'https://github.com/AgentAnycast/agentanycast/blob/main/CONTRIBUTING.md' },
  ],
  SDKs: [
    { label: 'Python SDK', href: 'https://github.com/AgentAnycast/agentanycast-python' },
    { label: 'TypeScript SDK', href: 'https://github.com/AgentAnycast/agentanycast-ts' },
    { label: 'Go Daemon', href: 'https://github.com/AgentAnycast/agentanycast-node' },
    { label: 'Proto', href: 'https://github.com/AgentAnycast/agentanycast-proto' },
  ],
}

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

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-navy-800/50 gap-4">
          <p className="text-xs text-gray-600">
            SDKs &amp; Proto: Apache-2.0 &middot; Daemon &amp; Relay: FSL-1.1-ALv2
          </p>
          <p className="text-xs text-gray-600">
            Built with libp2p
          </p>
        </div>
      </div>
    </footer>
  )
}
