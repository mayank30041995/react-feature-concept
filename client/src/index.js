import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import App1 from './App1'
import App2 from './App2'

function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>
}
const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/home',
    element: <App2 />,
  },
  {
    path: '/',
    element: <App />,
    // loader: <div>Loading...</div>,
    children: [
      {
        path: 'step2',
        element: <App />,
      },
      {
        path: 'step3',
        element: <App />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
