import { useFadeIn } from '../hooks/useFadeIn'

const INTEGRATIONS = [
  { name: 'A2A Protocol', desc: 'Native' },
  { name: 'MCP', desc: 'Tool mapping' },
  { name: 'CrewAI', desc: 'Adapter' },
  { name: 'LangGraph', desc: 'Adapter' },
  { name: 'Claude Desktop', desc: 'MCP Server' },
  { name: 'ChatGPT', desc: 'MCP Server' },
  { name: 'Cursor', desc: 'MCP Server' },
  { name: 'VS Code', desc: 'MCP Server' },
  { name: 'Gemini CLI', desc: 'MCP Server' },
]

export default function Ecosystem() {
  const ref = useFadeIn()

  return (
    <section id="ecosystem" className="py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Works With Your Stack
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Native integrations with the AI agent ecosystem. Bridge MCP tools to A2A skills automatically.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {INTEGRATIONS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 px-5 py-3 rounded-lg border border-navy-700/50 bg-navy-900/40 hover:border-navy-600 transition-colors"
            >
              <span className="text-white font-medium text-sm">{item.name}</span>
              <span className="text-xs text-gray-500 font-mono">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
