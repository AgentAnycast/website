import { useState } from 'react'
import { Link } from 'react-router-dom'
import CopyButton from './CopyButton'
import NetworkCanvas from './NetworkCanvas'
import { useGitHubStars } from '../hooks/useGitHubStars'

type PackageManager = 'pip' | 'npm' | 'docker'

const INSTALL_CMDS: Record<PackageManager, string> = {
  pip: 'pip install agentanycast',
  npm: 'npm install agentanycast',
  docker: 'docker compose up -d',
}

export default function Hero() {
  const [pm, setPm] = useState<PackageManager>('pip')
  const stars = useGitHubStars()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-bg" />

      {/* Animated P2P network */}
      <NetworkCanvas />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-sm text-accent-light font-medium">Open Source &middot; Apache 2.0</span>
          </div>
          {stars !== null && stars > 0 && (
            <a
              href="https://github.com/AgentAnycast"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-navy-700 bg-navy-800/50 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>{stars}</span>
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </a>
          )}
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
          <Link
            to="/docs/getting-started"
            className="px-8 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/AgentAnycast"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-navy-700 hover:border-navy-600 text-gray-300 hover:text-white font-semibold text-base transition-all bg-navy-800/50 hover:bg-navy-800"
          >
            View on GitHub
          </a>
        </div>

        {/* Install command with package manager tabs */}
        <div className="mt-12 inline-flex flex-col items-center">
          <div className="flex items-center gap-1 mb-2">
            {(Object.keys(INSTALL_CMDS) as PackageManager[]).map((key) => (
              <button
                key={key}
                onClick={() => setPm(key)}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  pm === key
                    ? 'bg-accent/20 text-accent-light'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-navy-900/80 border border-navy-700/50 font-mono text-sm text-gray-400">
            <span className="text-green">$</span>
            <span>{INSTALL_CMDS[pm]}</span>
            <CopyButton text={INSTALL_CMDS[pm]} className="text-gray-500 hover:text-gray-300 ml-2" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  )
}
