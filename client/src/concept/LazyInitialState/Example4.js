import React, { useState, useEffect } from 'react'

function getRandomId() {
  console.log('Generating random ID lazily...')
  return Math.floor(Math.random() * 10) + 1 // 1-10
}

export default function Example4() {
  const [postId] = useState(() => getRandomId())
  const [post, setPost] = useState(null)

  useEffect(() => {
    console.log('Fetching post for ID:', postId)

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
  }, [postId])

  return (
    <div>
      <h1>Lazy Initialized Fetch</h1>
      <p>Generated ID: {postId}</p>
      {post ? <h3>{post.title}</h3> : <p>Loading...</p>}
    </div>
  )
}

{
  /* 
✔️ Why this is lazy?

postId is generated only once and not on re-render

That ID is used to fetch the correct item
*/
}
