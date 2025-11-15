// App.jsx
import React, { Suspense } from 'react'
import StreamView from './StreamView'
import { createStreamResource } from './streamResource'

const resource = createStreamResource() // starts stream immediately

export default function Example12() {
  return (
    <Suspense fallback={<p>⏳ Waiting for first stream chunk…</p>}>
      <StreamView resource={resource} />
    </Suspense>
  )
}
