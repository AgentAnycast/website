# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AgentAnycast, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email: **security@agentanycast.dev** (or open a private security advisory on GitHub).

We will respond within 48 hours and work with you to understand and address the issue.

## Security Design

AgentAnycast uses end-to-end encryption (Noise_XX protocol) for all P2P communication. The relay server cannot read message content. See the [Architecture documentation](https://github.com/AgentAnycast/agentanycast/blob/main/docs/architecture.md) for details.
