import React, { useReducer, useEffect } from 'react'

// Reducer
function postsReducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return { ...state, posts: action.payload, loading: false }
    default:
      return state
  }
}

// Lazy initializer
function init(initialArg) {
  console.log('Running lazy initializer...', initialArg)
  return {
    posts: [],
    loading: true,
    ...initialArg,
  }
}

export default function Example5() {
  const [state, dispatch] = useReducer(
    postsReducer,
    { loading: true }, // raw initial state
    init // lazy initializer
  )

  useEffect(() => {
    console.log('Fetching posts...')
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'loaded', payload: data }))
  }, [])

  return (
    <div>
      <h1>Lazy Init + useReducer + Fetch</h1>

      {state.loading && <p>Loading...</p>}

      <ul>
        {state.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

{
  /* 
⭐ 1. useReducer with Lazy Initialization (API preloaded lazily)

React lets useReducer accept a third argument — a lazy initializer.

✔️ We will:

pass an initial raw value

use a lazy initializer to transform it

fetch JSONPlaceholder data only once

✔️ Why this is lazy?

init() runs only once, not on every render

State shape is created lazily

API fetch is triggered only after mount

*/
}
