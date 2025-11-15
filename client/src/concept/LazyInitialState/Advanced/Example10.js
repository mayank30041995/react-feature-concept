import React, { useReducer, useEffect, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true }
    case 'loaded':
      return { loading: false, results: action.results }
    default:
      return state
  }
}

function init() {
  console.log('Lazy init for search state...')
  return {
    results: [],
    loading: false,
  }
}

export default function Example10() {
  const [query, setQuery] = useState('')
  const [state, dispatch] = useReducer(reducer, null, init)

  useEffect(() => {
    if (query.trim() === '') return

    const timeout = setTimeout(() => {
      dispatch({ type: 'loading' })

      fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: 'loaded', results: data }))
    }, 500) // debounce

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div>
      <h1>Advanced Debounced Search + Lazy Init</h1>

      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {state.loading && <p>Searching...</p>}

      <ul>
        {state.results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  )
}

{
  /*  
⚡ Advanced Example 3 — Lazy Initial State + Debounced API Search with useReducer
✔️ Best Use Case


✔️ Why this is advanced?

Debounced live search

Lazy initialization used for efficient state bootstrapping

Very common in dashboards, stores, admin panels, SaaS apps

*/
}
