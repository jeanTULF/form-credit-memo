import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import Header from './components/Header'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Header />
      <App />
    </div>
  </StrictMode>,
)
