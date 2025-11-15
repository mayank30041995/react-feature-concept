import React, { useState } from 'react'

function generateLargeList() {
  console.log('Generating large list...')
  return Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
}

export default function Example3() {
  const [items] = useState(() => generateLargeList())

  return (
    <div>
      <h1>Large List (first 20 items)</h1>
      <ul>
        {items.slice(0, 20).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

{
  /*
✔️ Why this matters

Without lazy init: list regenerates every render

With lazy init: list generates only once, even if the component re-renders dozens of times

 */
}
