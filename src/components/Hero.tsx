export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-bg" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/10 animate-pulse"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="text-sm text-accent-light font-medium">Open Source &middot; Apache 2.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Decentralized P2P Runtime{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-accent-light to-blue-300 bg-clip-text text-transparent">
            for AI Agents
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect AI agents across any network. End-to-end encrypted with Noise_XX.
          NAT traversal built in. Skill-based anycast routing. Zero configuration.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#get-started"
            className="px-8 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Get Started
          </a>
          <a
            href="https://github.com/AgentAnycast"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-navy-700 hover:border-navy-600 text-gray-300 hover:text-white font-semibold text-base transition-all bg-navy-800/50 hover:bg-navy-800"
          >
            View on GitHub
          </a>
        </div>

        {/* Install hint */}
        <div className="mt-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-navy-900/80 border border-navy-700/50 font-mono text-sm text-gray-400">
          <span className="text-green">$</span>
          <span>pip install agentanycast</span>
          <CopyButton text="pip install agentanycast" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  )
}

function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-gray-500 hover:text-gray-300 transition-colors ml-2"
      title="Copy to clipboard"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  )
}
