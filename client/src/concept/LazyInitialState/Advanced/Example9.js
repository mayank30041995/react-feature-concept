import React, { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { ...state, todos: action.payload }

    case 'optimisticAdd':
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
        pending: [...state.pending, action.newTodo.id],
      }

    case 'confirmAdd':
      return {
        ...state,
        pending: state.pending.filter((id) => id !== action.id),
      }

    case 'rollback':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.tempId),
        pending: state.pending.filter((id) => id !== action.tempId),
      }

    default:
      return state
  }
}

// Lazy initializer — heavy list processing happens once
function init() {
  console.log('Lazy init: preparing todo list...')
  return {
    todos: [],
    pending: [], // optimistic updates waiting to confirm
  }
}

export default function Example9() {
  const [state, dispatch] = useReducer(reducer, null, init)

  function addTodo() {
    const tempId = Date.now()

    const newTodo = { id: tempId, title: 'New Todo (optimistic)' }

    // 1. Optimistic update
    dispatch({ type: 'optimisticAdd', newTodo })

    // 2. Fake server request
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        dispatch({ type: 'confirmAdd', id: tempId })
      })
      .catch(() => {
        dispatch({ type: 'rollback', tempId })
      })
  }

  return (
    <div>
      <h1>Advanced Optimistic UI + Lazy Init</h1>

      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {state.todos.map((t) => (
          <li
            key={t.id}
            style={{ opacity: state.pending.includes(t.id) ? 0.5 : 1 }}
          >
            {t.title}
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}

{
  /*

⚡ Advanced Example 2 — Lazy Init + useReducer for Optimistic UI Updates
✔️ Best Use Case

A real-world pattern for apps that:

update data immediately (optimistic update)

show rollback if the server fails

need a reliable state management system



✔️ Why this is advanced

Handles complex UI state transitions

Uses lazy initialization to set up expensive structures

Implements rollback on server failure, like real apps

Great for todo apps, feeds, messaging, collaboration tools
*/
}
