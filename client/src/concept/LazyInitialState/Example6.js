import React, { useReducer } from 'react'

function formReducer(state, action) {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

// Lazy initializer for form defaults
function init() {
  console.log('Lazy loading form defaults...')
  const saved = JSON.parse(localStorage.getItem('profile'))
  return (
    saved || {
      name: '',
      email: '',
      city: '',
    }
  )
}

export default function Example6() {
  const [form, dispatch] = useReducer(formReducer, null, init)

  function handleChange(e) {
    dispatch({ type: 'change', field: e.target.name, value: e.target.value })
    localStorage.setItem(
      'profile',
      JSON.stringify({ ...form, [e.target.name]: e.target.value })
    )
  }

  return (
    <div>
      <h2>Lazy Initialized Form</h2>

      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="city"
        value={form.city}
        placeholder="City"
        onChange={handleChange}
      />

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  )
}
