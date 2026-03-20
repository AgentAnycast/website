import { useEffect } from 'react'

interface Props {
  title?: string
  description?: string
  path?: string
}

const DEFAULT_TITLE = 'AgentAnycast - Decentralized P2P Runtime for AI Agents'
const DEFAULT_DESC = 'Connect AI agents across any network. End-to-end encrypted with Noise_XX, automatic NAT traversal, skill-based anycast routing.'

export default function SEOHead({ title, description, path = '/' }: Props) {
  const fullTitle = title ? `${title} | AgentAnycast` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESC
  const url = `https://agentanycast.io${path}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [fullTitle, desc, url])

  return null
}
