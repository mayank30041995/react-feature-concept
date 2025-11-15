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
