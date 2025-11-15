import React, { useReducer, useState } from 'react'

const initialState = []

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ]

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.id)

    default:
      return state
  }
}

export default function BatchingExample2() {
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [text, setText] = useState('')

  const addTodo = () => {
    if (!text.trim()) return
    dispatch({ type: 'ADD_TODO', text })
    setText('')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Todo App with useReducer</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={addTodo} style={{ marginLeft: 10 }}>
        Add
      </button>

      <ul style={{ marginTop: 20, listStyle: 'none' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10 }}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: 10,
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
