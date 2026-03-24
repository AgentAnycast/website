# Performance Benchmarks

Micro-benchmarks for the AgentAnycast core components. All measurements are taken on a single machine; real-world P2P latency depends on network conditions, NAT type, and whether a relay is involved.

## How to Run

```bash
# From agentanycast-node/
./benchmarks/run.sh          # All benchmarks, 3 iterations
./benchmarks/run.sh 5        # 5 iterations for statistical significance

# Individual packages
go test -bench=. -benchmem ./internal/a2a/...
go test -bench=. -benchmem ./internal/envelope/...
```

## A2A Engine (Task State Machine)

Measured on Apple M1 Pro, Go 1.25, macOS. These benchmarks exercise the in-process task engine (no network, no serialization).

| Benchmark | Ops/sec | Latency | Allocs/op |
|-----------|---------|---------|-----------|
| **TaskLifecycle** (create → working → completed) | ~540K | ~1.8 µs | 20 |
| **TaskCreate** (single creation) | ~1.2M | ~850 ns | 4 |
| **TaskTransition** (single state change) | ~1.5M | ~650 ns | 8 |
| **TaskLookup** (by ID) | ~57M | ~15 ns | 0 |
| **ConcurrentTaskLifecycle** (parallel goroutines) | ~370K | ~2.7 µs | 20 |

Key takeaways:

- **Task lookup is essentially free** (~15 ns) -- the engine uses a sync.Map internally.
- **Full lifecycle overhead is <2 µs** per task, meaning the engine is not a bottleneck even at high throughput.
- **Concurrent performance** degrades ~50% from single-threaded due to lock contention, which is expected for a mutex-protected state machine.

## What These Numbers Mean for Real-World Usage

The engine benchmarks above measure only the in-process state machine. In practice, end-to-end task latency is dominated by:

1. **Network round-trip** -- LAN (sub-millisecond), relay (5--50 ms depending on relay location), WAN hole-punched (varies)
2. **Serialization** -- Protobuf encoding/decoding adds ~1--5 µs per message
3. **Encryption** -- Noise_XX handshake (~1 ms first time, then negligible for subsequent messages)
4. **Your task handler** -- Whatever processing your agent does

The engine overhead (~2 µs) is 3--4 orders of magnitude smaller than typical network latency, so it will never be your bottleneck.

## Running Your Own Benchmarks

For end-to-end latency testing between two agents:

```python
import time
from agentanycast import Node, AgentCard, Skill

# Start two nodes, send 100 tasks, measure round-trip time
async with Node(card=receiver_card) as receiver:
    @receiver.on_task
    async def handle(task):
        await task.complete()

    async with Node(card=sender_card) as sender:
        start = time.monotonic()
        for _ in range(100):
            handle = await sender.send_task(peer_id=receiver.peer_id, message=msg)
            await handle.wait(timeout_ms=5000)
        elapsed = time.monotonic() - start
        print(f"100 tasks in {elapsed:.2f}s = {elapsed/100*1000:.1f}ms/task")
```
