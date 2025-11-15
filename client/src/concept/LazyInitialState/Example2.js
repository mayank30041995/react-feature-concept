import React, { useState } from 'react'

function getStoredTheme() {
  console.log('Loading theme from localStorage...')
  return localStorage.getItem('theme') || 'light'
}

export default function Example2() {
  const [theme, setTheme] = useState(() => getStoredTheme())

  return (
    <div>
      <h1>Theme: {theme}</h1>
      <button
        onClick={() => {
          const next = theme === 'light' ? 'dark' : 'light'
          setTheme(next)
          localStorage.setItem('theme', next)
        }}
      >
        Toggle Theme
      </button>
    </div>
  )
}
