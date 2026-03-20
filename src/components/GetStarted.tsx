import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'
import CopyButton from './CopyButton'

const PYTHON_SERVER = `from agentanycast import Node, AgentCard, Skill

card = AgentCard(
    name="EchoAgent",
    description="Echoes back any message",
    skills=[Skill(id="echo", description="Echo the input")],
)

async with Node(card=card) as node:
    @node.on_task
    async def handle(task):
        text = task.messages[-1].parts[0].text
        await task.complete(
            artifacts=[{"parts": [{"text": f"Echo: {text}"}]}]
        )

    await node.serve_forever()`

const PYTHON_CLIENT = `from agentanycast import Node, AgentCard

async with Node(card=AgentCard(name="Client")) as node:
    handle = await node.send_task(
        peer_id="12D3KooW...",
        message={"role": "user", "parts": [{"text": "Hello!"}]},
    )
    result = await handle.wait()
    print(result.artifacts[0].parts[0].text)`

const TS_SERVER = `import { Node } from "agentanycast";

const node = new Node({
  card: {
    name: "EchoAgent",
    skills: [{ id: "echo", description: "Echo the input" }],
  },
});

await node.start();

node.onTask(async (task) => {
  const text = task.messages.at(-1)?.parts[0]?.text ?? "";
  await task.complete([{ parts: [{ text: \`Echo: \${text}\` }] }]);
});

await node.serveForever();`

const TS_CLIENT = `import { Node } from "agentanycast";

const node = new Node({ card: { name: "Client", skills: [] } });
await node.start();

const handle = await node.sendTask(
  { role: "user", parts: [{ text: "Hello!" }] },
  { peerId: "12D3KooW..." },
);

const result = await handle.wait();
console.log(result.artifacts[0].parts[0].text);`

type Lang = 'python' | 'typescript'
type Tab = 'server' | 'client'

const CODE: Record<Lang, Record<Tab, string>> = {
  python: { server: PYTHON_SERVER, client: PYTHON_CLIENT },
  typescript: { server: TS_SERVER, client: TS_CLIENT },
}

const INSTALL: Record<Lang, string> = {
  python: 'pip install agentanycast',
  typescript: 'npm install agentanycast',
}

const LANG_LABEL: Record<Lang, string> = {
  python: 'Python',
  typescript: 'TypeScript',
}

export default function GetStarted() {
  const [lang, setLang] = useState<Lang>('python')
  const [tab, setTab] = useState<Tab>('server')
  const ref = useFadeIn()

  return (
    <section id="get-started" className="py-24 px-6">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Install the SDK, write a few lines of code, and your agent is live on the P2P network.
          </p>
        </div>

        {/* Install command */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-navy-900 border border-navy-700/50 font-mono text-sm">
            <span className="text-green">$</span>
            <span className="text-gray-300">{INSTALL[lang]}</span>
            <CopyButton text={INSTALL[lang]} className="text-gray-500 hover:text-gray-300 ml-2" />
          </div>
        </div>

        {/* Code block */}
        <div className="rounded-xl border border-navy-700/50 overflow-hidden bg-navy-900">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-navy-700/50 px-4">
            <div className="flex">
              {(Object.keys(CODE) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                    lang === l
                      ? 'text-accent-light border-accent'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  {LANG_LABEL[l]}
                </button>
              ))}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => setTab('server')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  tab === 'server'
                    ? 'bg-accent/20 text-accent-light'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Server
              </button>
              <button
                onClick={() => setTab('client')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                  tab === 'client'
                    ? 'bg-accent/20 text-accent-light'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                Client
              </button>
            </div>
          </div>

          {/* Code content */}
          <div className="relative">
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
              <code className="font-mono text-gray-300">{CODE[lang][tab]}</code>
            </pre>
            <CopyButton
              text={CODE[lang][tab]}
              className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-300 rounded-md hover:bg-navy-800"
            />
          </div>
        </div>

        {/* Docs link — internal now */}
        <div className="text-center mt-8">
          <Link
            to="/docs/getting-started"
            className="inline-flex items-center gap-2 text-accent-light hover:text-white transition-colors text-sm font-medium"
          >
            Read the full documentation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
