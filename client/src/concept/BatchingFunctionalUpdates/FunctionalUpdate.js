import { Button } from '@mui/material'
import React, { useState } from 'react'

export default function FunctionalUpdates() {
  const [items, setItems] = useState(0)

  const addTwice = () => {
    setItems(items + 1)
    setItems(items + 1)
  }

  // const addTwice = () => {
  //   setItems((prev) => prev + 1)
  //   setItems((prev) => prev + 1)
  // }

  return (
    <>
      <h2>Items: {items}</h2>
      <button onClick={addTwice} style={{ background: '#FFF', color: '#000' }}>
        Add Twice
      </button>
    </>
  )
}

{
  /*
✅ What is Batching in React?

React groups multiple state updates into a single render to improve performance.
So even if you call setState (or setCount) several times, React may merge them to avoid unnecessary re-renders.

❗ The Problem:

When you update state based on the previous state, React’s batching can cause incorrect values.

Example WRONG approach:

setCount(count + 1);
setCount(count + 1);


You expect count to increase by 2 — but it will increase only by 1, because both updates used the old count.

🎯 The Solution – Functional Updates

Functional updates let you safely access the latest state inside a queued/batched update.

setCount(prev => prev + 1);
setCount(prev => prev + 1);


Now count correctly increases by 2.

 */
}
