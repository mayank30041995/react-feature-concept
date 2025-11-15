// streamReducer.js
export function streamReducer(state, action) {
  switch (action.type) {
    case 'add_chunk':
      return {
        ...state,
        chunks: [...state.chunks, action.chunk],
      }

    case 'finish':
      return {
        ...state,
        done: true,
      }

    default:
      return state
  }
}

// Lazy initializer
export function init() {
  console.log('Lazy init: preparing empty stream buffer…')
  return {
    chunks: [],
    done: false,
  }
}
