export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/logo-dark.png"
      alt="AgentAnycast"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}
