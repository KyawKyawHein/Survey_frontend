import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { StateContextProvider } from './context/StateContext.jsx'
import router from "./router.jsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <RouterProvider router={router} />
      </StateContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
