import { useState, useEffect } from 'react'

export function useGitHubStars(org: string = 'AgentAnycast') {
  const cached = sessionStorage.getItem(`gh-stars-${org}`)
  const [stars, setStars] = useState<number | null>(
    cached ? JSON.parse(cached) : null,
  )

  useEffect(() => {
    if (stars !== null) return

    const repos = [
      'agentanycast',
      'agentanycast-python',
      'agentanycast-ts',
      'agentanycast-node',
      'agentanycast-relay',
      'agentanycast-proto',
    ]

    Promise.all(
      repos.map((repo) =>
        fetch(`https://api.github.com/repos/${org}/${repo}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ),
    ).then((results) => {
      const total = results.reduce((sum, r) => sum + (r?.stargazers_count || 0), 0)
      setStars(total)
      sessionStorage.setItem(`gh-stars-${org}`, JSON.stringify(total))
    })
  }, [org, stars])

  return stars
}
