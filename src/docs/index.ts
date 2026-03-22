import gettingStarted from '../../docs/getting-started.md?raw'
import architecture from '../../docs/architecture.md?raw'
import protocol from '../../docs/protocol.md?raw'
import deployment from '../../docs/deployment.md?raw'
import pythonSdk from '../../docs/python-sdk.md?raw'
import typescriptSdk from '../../docs/typescript-sdk.md?raw'
import examples from '../../docs/examples.md?raw'
import integrationsOverview from '../../docs/integrations/README.md?raw'
import mcpSetup from '../../docs/integrations/mcp-setup.md?raw'
import dify from '../../docs/integrations/dify.md?raw'
import langflow from '../../docs/integrations/langflow.md?raw'
import n8n from '../../docs/integrations/n8n.md?raw'
import glossary from '../../docs/glossary.md?raw'
import troubleshooting from '../../docs/troubleshooting.md?raw'
import observability from '../../docs/observability.md?raw'
import cliReference from '../../docs/cli-reference.md?raw'
import securityModel from '../../docs/security-model.md?raw'
import configuration from '../../docs/configuration.md?raw'

export interface DocEntry {
  slug: string
  title: string
  content: string
  group: string
}

export const DOC_GROUPS = [
  'Getting Started',
  'Core Concepts',
  'SDKs',
  'Guides',
  'Operations',
  'Reference',
  'Integrations',
] as const

export const docs: DocEntry[] = [
  { slug: 'getting-started', title: 'Installation & Quick Start', content: gettingStarted, group: 'Getting Started' },
  { slug: 'architecture', title: 'Architecture', content: architecture, group: 'Core Concepts' },
  { slug: 'protocol', title: 'Protocol Reference', content: protocol, group: 'Core Concepts' },
  { slug: 'python-sdk', title: 'Python SDK', content: pythonSdk, group: 'SDKs' },
  { slug: 'typescript-sdk', title: 'TypeScript SDK', content: typescriptSdk, group: 'SDKs' },
  { slug: 'deployment', title: 'Deployment Guide', content: deployment, group: 'Guides' },
  { slug: 'examples', title: 'Code Examples', content: examples, group: 'Guides' },
  { slug: 'configuration', title: 'Configuration', content: configuration, group: 'Operations' },
  { slug: 'observability', title: 'Observability & Monitoring', content: observability, group: 'Operations' },
  { slug: 'security-model', title: 'Security Model', content: securityModel, group: 'Operations' },
  { slug: 'troubleshooting', title: 'Troubleshooting', content: troubleshooting, group: 'Operations' },
  { slug: 'cli-reference', title: 'CLI Reference', content: cliReference, group: 'Reference' },
  { slug: 'glossary', title: 'Glossary', content: glossary, group: 'Reference' },
  { slug: 'integrations', title: 'Overview', content: integrationsOverview, group: 'Integrations' },
  { slug: 'integrations/mcp-setup', title: 'MCP Server', content: mcpSetup, group: 'Integrations' },
  { slug: 'integrations/dify', title: 'Dify', content: dify, group: 'Integrations' },
  { slug: 'integrations/langflow', title: 'Langflow', content: langflow, group: 'Integrations' },
  { slug: 'integrations/n8n', title: 'n8n', content: n8n, group: 'Integrations' },
]

export function getDoc(slug: string): DocEntry | undefined {
  return docs.find(d => d.slug === slug)
}
