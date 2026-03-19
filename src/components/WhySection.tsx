import { useFadeIn } from '../hooks/useFadeIn'

const COMPARISON = [
  {
    feature: 'Zero config',
    agentanycast: true,
    httpA2A: false,
    ngrok: false,
    directTcp: false,
  },
  {
    feature: 'E2E encryption',
    agentanycast: 'Noise_XX',
    httpA2A: 'TLS only',
    ngrok: 'Partial',
    directTcp: false,
  },
  {
    feature: 'NAT traversal',
    agentanycast: true,
    httpA2A: false,
    ngrok: true,
    directTcp: false,
  },
  {
    feature: 'Decentralized',
    agentanycast: true,
    httpA2A: false,
    ngrok: false,
    directTcp: false,
  },
  {
    feature: 'A2A protocol',
    agentanycast: true,
    httpA2A: true,
    ngrok: false,
    directTcp: false,
  },
  {
    feature: 'Skill discovery',
    agentanycast: true,
    httpA2A: false,
    ngrok: false,
    directTcp: false,
  },
  {
    feature: 'MCP server',
    agentanycast: true,
    httpA2A: false,
    ngrok: false,
    directTcp: false,
  },
  {
    feature: 'Framework adapters',
    agentanycast: '4 built-in',
    httpA2A: 'Manual',
    ngrok: false,
    directTcp: false,
  },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <span className="text-green font-semibold">&#10003;</span>
  if (value === false) return <span className="text-gray-600">&mdash;</span>
  return <span className="text-yellow-400 text-xs">{value}</span>
}

export default function WhySection() {
  const ref = useFadeIn()

  return (
    <section className="py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why AgentAnycast?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            HTTP-based A2A requires public IPs, DNS, and TLS certificates. AgentAnycast
            eliminates all of that with peer-to-peer networking that just works.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Feature</th>
                <th className="py-3 px-4 text-accent-light font-semibold">AgentAnycast</th>
                <th className="py-3 px-4 text-gray-400 font-medium">HTTP A2A</th>
                <th className="py-3 px-4 text-gray-400 font-medium">ngrok / Tailscale</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Direct TCP</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-navy-800/50">
                  <td className="text-left py-3 px-4 text-gray-300">{row.feature}</td>
                  <td className="py-3 px-4 text-center"><Cell value={row.agentanycast} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.httpA2A} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.ngrok} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.directTcp} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
