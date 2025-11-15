import React, { useReducer, useEffect, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return action.payload
    case 'change':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

// Lazy initializer — heavy operation runs once
function init() {
  console.log('Lazy init: creating empty form...')
  return {
    name: '',
    email: '',
    phone: '',
  }
}

export default function Example7() {
  const [form, dispatch] = useReducer(reducer, null, init)
  const [id, setId] = useState(1)

  // Fetch existing user profile from JSONPlaceholder
  useEffect(() => {
    console.log('Fetching user profile...', id)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'load',
          payload: {
            name: data.name,
            email: data.email,
            phone: data.phone,
          },
        })
      )
  }, [id])

  function handleChange(e) {
    dispatch({ type: 'change', field: e.target.name, value: e.target.value })
  }

  return (
    <div>
      <h2>Lazy Initialized API Form ${id}</h2>

      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="phone" value={form.phone} onChange={handleChange} />
      <button onClick={() => setId((prev) => prev + 1)}>Change User</button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  )
}

{
  /*
⭐ 3. useReducer + Lazy Init + API-driven default form

This is amazing for real apps:

API returns a user’s profile

useReducer initializes lazily with empty values

API updates state only once

✔️ Why this is great?

The reducer state starts lazily

The API populates the form afterwards

Perfect pattern for edit-profile pages
 */
}
