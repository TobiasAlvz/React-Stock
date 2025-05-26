// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EstoqueProvider } from './contexts/EstoqueContext' // Caminho correto!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EstoqueProvider> 
      <App />
    </EstoqueProvider>
  </React.StrictMode>
)