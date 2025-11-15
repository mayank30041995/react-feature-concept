import React, { useReducer, useEffect } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'setPage':
      return { ...state, page: action.page }

    case 'cachePage': {
      const newCache = new Map(state.cache)
      newCache.set(action.page, action.data)
      return { ...state, cache: newCache, loading: false }
    }

    case 'loading':
      return { ...state, loading: true }

    default:
      return state
  }
}

// Lazy initializer — runs *once*
function init() {
  console.log('Lazy init: setting up pagination state...')
  return {
    page: 1,
    cache: new Map(), // large structure initialized lazily
    loading: true,
  }
}

export default function Example8() {
  const [state, dispatch] = useReducer(reducer, null, init)

  useEffect(() => {
    // If page already exists in cache, no fetch required
    if (state.cache.has(state.page)) return

    dispatch({ type: 'loading' })

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${state.page}`
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'cachePage', page: state.page, data }))
  }, [state.page])

  const posts = state.cache.get(state.page) || []

  return (
    <div>
      <h1>Advanced Lazy Init + Caching + Pagination</h1>

      {state.loading && <p>Loading...</p>}

      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <button
        onClick={() => dispatch({ type: 'setPage', page: state.page - 1 })}
        disabled={state.page === 1}
      >
        Previous
      </button>

      <button
        onClick={() => dispatch({ type: 'setPage', page: state.page + 1 })}
      >
        Next
      </button>

      <p>Page: {state.page}</p>
    </div>
  )
}

{
  /*  
⚡ Advanced Example 1 — useReducer Lazy Initialization + Pagination + Cached Server Data
✔️ Best use case

Apps that fetch paginated data

Want to cache results to avoid refetching

Want lazy init to prepare an efficient structure once

💡 Concepts used

useReducer lazy init

API calls

Cache system

Intelligent fetching


✔️ Why this is advanced and highly useful

Pagination state + cache created lazily (fast first render)

Server data is cached → no repeated API calls

Great for dashboards, admin panels, infinite scroll apps


*/
}
