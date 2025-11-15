// streamResource.js
export function createStreamResource() {
  let listeners = []
  let messages = []
  let done = false
  let firstChunkLoaded = false

  const promise = new Promise((resolve) => {
    // Simulate streaming chunks (like SSE/EventSource)
    let count = 0

    const interval = setInterval(() => {
      count++

      const chunk = {
        id: count,
        text: 'Message chunk ' + count,
        timestamp: new Date().toISOString(),
      }

      messages.push(chunk)
      listeners.forEach((fn) => fn(chunk))

      if (!firstChunkLoaded) {
        firstChunkLoaded = true
        resolve() // Suspense boundary releases UI
      }

      if (count >= 5) {
        clearInterval(interval)
        done = true
      }
    }, 1200)
  })

  return {
    read() {
      // Suspense waits until first chunk arrives
      if (!firstChunkLoaded) throw promise
      return { messages, done }
    },
    subscribe(fn) {
      listeners.push(fn)
    },
  }
}
