import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import Header from '@/components/Header'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
        <Header>
          <App />
        </Header>
    </RouterProvider>
  </StrictMode>,
)
