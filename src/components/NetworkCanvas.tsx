import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
}

interface Packet {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create nodes
    const nodeCount = 18
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 2 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }))

    // Packets traveling along edges
    const packets: Packet[] = []
    const maxPackets = 5

    const connectionDist = 180

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Move nodes
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Spawn packets
      if (packets.length < maxPackets && Math.random() < 0.02) {
        const fromIdx = Math.floor(Math.random() * nodes.length)
        let toIdx = Math.floor(Math.random() * nodes.length)
        if (toIdx === fromIdx) toIdx = (toIdx + 1) % nodes.length
        const dx = nodes[toIdx].x - nodes[fromIdx].x
        const dy = nodes[toIdx].y - nodes[fromIdx].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < connectionDist * 1.5) {
          packets.push({ fromIdx, toIdx, progress: 0, speed: 0.008 + Math.random() * 0.008 })
        }
      }

      // Draw and update packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.progress += p.speed
        if (p.progress > 1) {
          packets.splice(i, 1)
          continue
        }

        const from = nodes[p.fromIdx]
        const to = nodes[p.toIdx]
        const px = from.x + (to.x - from.x) * p.progress
        const py = from.y + (to.y - from.y) * p.progress
        const alpha = Math.sin(p.progress * Math.PI) * 0.8

        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.15})`
        ctx.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 0.001 + node.phase) * 0.3 + 0.7

        // Glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${0.04 * pulse})`
        ctx.fill()

        // Node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${0.4 * pulse})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
