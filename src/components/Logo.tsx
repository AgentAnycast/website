import logoDark from '../assets/logo-dark.png'

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      src={logoDark}
      alt="AgentAnycast"
      width={size}
      height={size}
      style={{ display: 'block' }}
    />
  )
}
