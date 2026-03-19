import { useFadeIn } from '../hooks/useFadeIn'

const REPOS = [
  {
    name: 'agentanycast-proto',
    description: 'gRPC interface definitions and A2A data models. Single source of truth for all language bindings.',
    lang: 'Protobuf',
    langColor: '#e5d559',
    url: 'https://github.com/AgentAnycast/agentanycast-proto',
  },
  {
    name: 'agentanycast-node',
    description: 'Core Go daemon — libp2p host, Noise_XX encryption, NAT traversal, A2A engine, HTTP bridge.',
    lang: 'Go',
    langColor: '#00ADD8',
    url: 'https://github.com/AgentAnycast/agentanycast-node',
  },
  {
    name: 'agentanycast-relay',
    description: 'Relay server — Circuit Relay v2, skill registry, AutoNAT signaling. Docker-deployable.',
    lang: 'Go',
    langColor: '#00ADD8',
    url: 'https://github.com/AgentAnycast/agentanycast-relay',
  },
  {
    name: 'agentanycast-python',
    description: 'Python SDK — pip install agentanycast. Async/await API, CLI, CrewAI & LangGraph adapters.',
    lang: 'Python',
    langColor: '#3572A5',
    url: 'https://github.com/AgentAnycast/agentanycast-python',
  },
  {
    name: 'agentanycast-ts',
    description: 'TypeScript SDK — npm install agentanycast. Node.js 18+, ES2022 modules, MCP support.',
    lang: 'TypeScript',
    langColor: '#3178C6',
    url: 'https://github.com/AgentAnycast/agentanycast-ts',
  },
]

export default function Repositories() {
  const ref = useFadeIn()

  return (
    <section className="py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Open Source Repositories
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Each component is an independent repo with its own CI, releases, and license.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-navy-700/50 bg-navy-900/30 hover:border-accent/30 hover:bg-navy-900/60 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="text-accent-light font-semibold text-sm group-hover:text-white transition-colors">
                  {repo.name}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                {repo.description}
              </p>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: repo.langColor }}
                />
                <span className="text-xs text-gray-500">{repo.lang}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
