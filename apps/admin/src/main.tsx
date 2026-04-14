import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'antd/dist/reset.css'

import App from './App'
import { AppProviders } from './app/providers'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
