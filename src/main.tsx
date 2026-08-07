import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './state/AuthProvider'
import PersistenceGate from './state/PersistenceGate'
import './index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Missing #root element in index.html')
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PersistenceGate>
          <App />
        </PersistenceGate>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
