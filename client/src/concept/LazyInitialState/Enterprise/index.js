import React, { useReducer } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Example11 from './Example11'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ------------------------------
// QueryClient wrapper
// ------------------------------
const client = new QueryClient()

export default function Expertise() {
  return (
    <QueryClientProvider client={client}>
      <Example11 />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
