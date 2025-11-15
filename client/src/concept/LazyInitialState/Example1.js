import React, { useState } from 'react'

function expensiveCalculation() {
  console.log('Running expensive calculation...')
  let total = 0
  for (let i = 0; i < 50_000_000; i++) {
    total += i
  }
  return total
}

export default function Example1() {
  const [value, setValue] = useState(() => expensiveCalculation())

  return (
    <div>
      <h1>Lazy Initial State Example</h1>
      <p>Result: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  )
}

{
  /*

✅ What Is Lazy Initial State / Lazy Initialization?

Lazy initial state means you delay creating or computing a value until the moment it’s actually needed, rather than doing it immediately when the program starts.

It’s the opposite of eager initialization, where everything is created upfront.

💡 Why use lazy initialization?
✔️ Performance optimization

You avoid doing expensive calculations or data loading until they’re required.

✔️ Memory efficiency

You only allocate objects or state when they’re needed.

✔️ Avoid unnecessary work

If a value is never used, you never compute or allocate it.



❌ Without lazy state

This runs expensiveCalculation() every render, slowing your UI.

✅ With lazy state

Runs only once.

✔️ What you’ll see in console:

"Running expensive calculation…" logs only once, no matter how many times you click.


🚨 Important note

You cannot do this:

useState(() => fetch(...))

Because the lazy initializer must return a value, not a Promise.

Fetching (async) cannot happen inside the lazy initializer function of useState, because useState lazy init must return a value immediately.


*/
}
