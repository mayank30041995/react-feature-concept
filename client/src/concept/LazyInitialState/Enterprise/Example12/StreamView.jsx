// StreamView.jsx
import React, { useEffect, useReducer } from 'react'
import { streamReducer, init } from './streamReducer'

export default function StreamView({ resource }) {
  const { messages, done } = resource.read() // Suspense waits here

  const [state, dispatch] = useReducer(streamReducer, null, init)

  useEffect(() => {
    // Seed initial streamed chunks
    messages.forEach((m) => dispatch({ type: 'add_chunk', chunk: m }))

    // Subscribe to new chunks
    const unsubscribe = resource.subscribe((chunk) => {
      dispatch({ type: 'add_chunk', chunk })
    })

    return unsubscribe
  }, [])

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>🔴 Live Stream (React Suspense + Streaming)</h2>

      <ul>
        {state.chunks.map((m) => (
          <li key={m.id}>
            <strong>{m.text}</strong> — {m.timestamp}
          </li>
        ))}
      </ul>

      {done ? <p>✔️ Stream completed.</p> : <p>⏳ Receiving chunks…</p>}
    </div>
  )
}

{
  /* 
🔥 #2 — Lazy Initialization + Suspense + Streaming APIs (SSE / Streaming Fetch)

This is a real production pattern used in:

dashboards that get real-time updates

stock/crypto live prices

chat/message live streams

analytics event streams

AI token-streaming UIs

monitoring & telemetry systems

We will use:

React 18 Suspense

Streaming API (Server-Sent Events / SSE–like behavior)

useReducer with lazy initialization

Suspense boundary + streaming resource

Chunk-by-chunk UI updates

🧠 Architecture Overview
Lazy init (sets up empty stream state)
        ↓
Reducer handles streaming chunks
        ↓
Suspense boundary waits for first data
        ↓
EventSource / Streaming Fetch sends incremental updates
        ↓
UI updates in real-time

🚀 FULL WORKING EXAMPLE (Advanced Enterprise Pattern)

A complete simulation of a streaming API that pushes messages in chunks.

👉 This will work in any React 18+ environment (Vite, CRA, Next.js, etc.)

🔧 Step 1 — Streaming Resource (Suspense Compatible)

🔧 Step 2 — useReducer + Lazy Initialization for Stream State

🔧 Step 3 — Suspense Component That Reads Streaming Resource

🔧 Step 4 — Wrap Everything in a Suspense Boundary

🎉 Final Behavior

When the app loads:

Lazy init creates empty stream buffer once.

Suspense waits until the first chunk arrives from the streaming API.

Every new chunk is pushed incrementally using reducer:

add_chunk appends it

UI updates instantly

When stream ends, reducer sets done: true.

This is exactly how real streaming APIs work in:

AI model token streaming

Chat bots

Server analytics dashboards

Live logs / telemetry streams

Stock/crypto tickers

System monitoring UIs

🎯 Why This Pattern Is Enterprise-Level
✔️ Combine 3 advanced systems

Suspense (first-chunk blocking)

Streaming APIs (SSE-like behavior)

Lazy reducer init for heavy state

✔️ UI remains responsive

Rendering doesn’t block.

✔️ Lazy initialization saves heavy setup cost

Stream buffer is created only once.

✔️ Suspense handles “stream not ready yet”

Perfect for SSR, RSC, Next.js App Router.

✔️ Reducer handles unbounded data growth

Chunk-by-chunk updates scale to thousands of messages.


*/
}
