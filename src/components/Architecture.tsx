import { useFadeIn } from '../hooks/useFadeIn'
import architectureSvg from '../assets/architecture.svg'

export default function Architecture() {
  const ref = useFadeIn()

  return (
    <section id="architecture" className="py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sidecar Architecture
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A Go daemon handles P2P networking, encryption, and protocol logic.
            Thin SDK layers communicate over gRPC via Unix domain socket.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="rounded-xl border border-navy-700/50 overflow-hidden bg-navy-900/50">
          <img
            src={architectureSvg}
            alt="AgentAnycast sidecar architecture showing App → SDK → gRPC → Go daemon → libp2p → Remote Peer"
            className="w-full"
          />
        </div>

        {/* Three addressing modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          <div className="p-5 rounded-xl border border-navy-700/50 bg-navy-900/30">
            <div className="text-accent-light font-mono text-sm mb-2">Direct</div>
            <h4 className="text-white font-semibold mb-1">By Peer ID</h4>
            <p className="text-sm text-gray-400">Send to a known agent by its libp2p PeerID.</p>
          </div>
          <div className="p-5 rounded-xl border border-navy-700/50 bg-navy-900/30">
            <div className="text-green font-mono text-sm mb-2">Anycast</div>
            <h4 className="text-white font-semibold mb-1">By Skill</h4>
            <p className="text-sm text-gray-400">Discover and route by capability via DHT or relay registry.</p>
          </div>
          <div className="p-5 rounded-xl border border-navy-700/50 bg-navy-900/30">
            <div className="text-purple font-mono text-sm mb-2">HTTP Bridge</div>
            <h4 className="text-white font-semibold mb-1">By URL</h4>
            <p className="text-sm text-gray-400">Interop with standard HTTP-based A2A agents.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
