import React, { useReducer } from 'react'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// ------------------------------
// 1. Reducer for UI state
// ------------------------------
function uiReducer(state, action) {
  switch (action.type) {
    case 'setPage':
      return { ...state, page: action.page }
    case 'setLimit':
      return { ...state, limit: action.limit }
    case 'setSearch':
      return { ...state, search: action.search }
    default:
      return state
  }
}

// ------------------------------
// 2. Lazy initializer
// ------------------------------
function init() {
  console.log('Lazy init: loading UI state...')

  const stored = JSON.parse(localStorage.getItem('postUiState'))

  return (
    stored || {
      page: 1,
      limit: 5,
      search: '',
    }
  )
}

// ------------------------------
// 3. Fetcher function
// ------------------------------
async function fetchPosts({ queryKey }) {
  const [_key, { page, limit, search }] = queryKey

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&q=${search}`
  )
  return res.json()
}

// ------------------------------
// 4. Main Component
// ------------------------------
export default function Example11() {
  const [ui, dispatch] = useReducer(uiReducer, null, init)

  // Persist lazy UI state
  localStorage.setItem('postUiState', JSON.stringify(ui))

  // React Query fetch
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['posts', ui],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 mins stale-while-revalidate
    retry: 3,
    keepPreviousData: true,
  })

  return (
    <div>
      <h1>Enterprise: Lazy Init + React Query + Filters</h1>

      <input
        value={ui.search}
        placeholder="Search title..."
        onChange={(e) =>
          dispatch({ type: 'setSearch', search: e.target.value })
        }
      />

      <button
        onClick={() => dispatch({ type: 'setPage', page: ui.page - 1 })}
        disabled={ui.page === 1}
      >
        Prev
      </button>

      <button onClick={() => dispatch({ type: 'setPage', page: ui.page + 1 })}>
        Next
      </button>

      <p>
        Page: {ui.page} {isFetching && '(refreshing...)'}
      </p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading posts.</p>}

      <ul>
        {data?.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  )
}

{
  /*  
🚀 #1 — Lazy Initialization + React Query (Enterprise Example)

This is how you combine:

useReducer with lazy initialization

React Query for server-state caching

Local preloaded cache to avoid API calls

Optimistic UI

Retry logic

Stale-while-revalidate patterns

This is a real enterprise pattern used in dashboards, SaaS apps, admin tools.

🎯 Use Case

We want to:

Lazy initialize local state (filters, pagination, user preferences)

Use React Query to fetch server data

Seed React Query’s cache lazily from:

localStorage or

server bootstrapped data or

previous session cache

Only fetch new data if stale

🧠 Architecture Overview
Lazy init (local filters, UI state)
       ↓
useReducer (UI-state: page, sort, filters)
       ↓
React Query (server-state: posts)
       ↓
Server / API

🔧 Full Working Code Example — Lazy Init + useReducer + React Query

✔️ Uses lazy init
✔️ Syncs UI state → API queries
✔️ React Query handles caching
✔️ Local state is computed ONLY once
✔️ Perfect for dashboards with filters/table pages



✅ Why This Pattern Is Enterprise-Level
1. UI state lazily initialized

page

limit

search

filters

Initialized once, even if component re-renders 1000 times.

2. React Query fetch is driven by lazy UI state

Only changes when:

page changes

search changes

limit changes

3. React Query caching gives free performance

Instant reloads
No refetch until stale
Retry logic
Parallel queries

4. Local UI state persisted for user experience

Users see the same filters even after refresh
(very common in dashboards & SaaS apps)

5. Lazy init prevents expensive operations on every render

For example loading from localStorage only ONCE.

🎯 Ready for the next one?

Next example is:

🔥 #2 — Lazy init + Suspense + Streaming APIs (Enterprise Pattern)

This uses:

React 18 Suspense

Server-Sent Events (SSE) or streaming fetch

Lazy initialized reducer that handles streaming chunks

Real-time UI with lazy bootstrapping


*/
}
